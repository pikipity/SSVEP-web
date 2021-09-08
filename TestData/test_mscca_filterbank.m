clear;clc;
load('data.mat','subj_data');

fs=256;
start_t=0.14;%1/fs;%0.5+0.14;
channel_select=1:9;
block_num=[3 6];
freqs=reshape([8 8.4 8.8; 9 9.4 9.9; 10 10.4 10.8; 11 11.4 11.8],1,12);
[~,sort_freqs_I]=sort(freqs);
phases=reshape([0 1 0; 1 0 1; 0 1 0; 1 0 1]./2.*pi,1,12);
trial_num=length(freqs);


num_of_subbands=5;
FB_coef=[1:num_of_subbands].^(-1.25)+0.25;
b2=[];
a2=[];
num_of_subbands=5;
for k=1:num_of_subbands
    bandpass1(1)=8*k;
    bandpass1(2)=90;
    [b2(k,:),a2(k,:)] = cheby1(4,1,[bandpass1(1)/(fs/2) bandpass1(2)/(fs/2)],'bandpass');
end

test_block=(1:max(block_num))';
train_block=zeros(size(test_block,1),max(block_num)-size(test_block,2));
for test_run=1:size(test_block,1)
    train_block(test_run,:)=setdiff(1:max(block_num),test_block(test_run,:));
end

sine_ref={};
for i=1:length(freqs)
    sine_ref{i}=gen_ref_sin(freqs(i),fs,fs*10,5,phases(i));
end

possible_T=0.2:0.2:5;

num_of_signal_templates=3;



% if ~exist('subj_data','var')
%     load('data.mat','data');
%     subj_data={};
%     subject_no=size(data,1);
%     for sub_no=1:subject_no
%         for k=1:num_of_subbands
%             subj_data{sub_no,k}=[];
%             for block=1:block_num
%                 for trial=1:trial_num
%                     y=squeeze(data(sub_no,block,trial,channel_select,:));
%                     for ch_i=1:size(y,1)
%                         tmp=detrend(y(ch_i,:));
%                         tmp=filtfilt(b2(k,:),a2(k,:),tmp);
%                         subj_data{sub_no,k}(ch_i,:,trial,block)=tmp;
%                     end
%                 end
%             end
%         end
%     end
%     save('data.mat','data','subj_data');
%     clear data
% end

subject_no=size(subj_data,1);

r_store=cell(num_of_subbands,length(possible_T),size(test_block,1),subject_no,trial_num,size(test_block,2));
% r_store{k,T_i,test_run,sub_no,trial,block}
res_store=zeros(length(possible_T),size(test_block,1),subject_no,trial_num,size(test_block,2));

load('ecca_filterbank_results.mat','average_template')

% if exist('ecca_filterbank_results.mat','file')
%     load('ecca_filterbank_results.mat','average_template')
% else
%     average_template=cell(num_of_subbands,size(test_block,1),subject_no,trial_num);
%     for test_run=1:size(train_block,1)
%         for sub_no=1:subject_no
%             for trial=1:trial_num
%                 for k=1:num_of_subbands
%                     y=subj_data{sub_no,k};
%                     x=squeeze(y(channel_select,:,trial,train_block(test_run,:)));
%                     average_template{k,test_run,sub_no,trial}=mean(x,3);
%                 end
%             end
%         end
%     end
% end

u_store=cell(num_of_subbands,length(possible_T),size(test_block,1),subject_no,trial_num);
v_store=cell(num_of_subbands,length(possible_T),size(test_block,1),subject_no,trial_num);
for T_i=1:length(possible_T)
    T=possible_T(T_i);
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            sub=['S' num2str(sub_no)];
            disp(['Train mscca  ->  Sig Len: ' num2str(T) ', Run ' num2str(test_run) ', ' sub])
            for k=1:num_of_subbands
                y=subj_data{sub_no,k};
                for trial=1:trial_num
                     half_num_of_signal_templates=floor(num_of_signal_templates/2);
                     d=find(sort_freqs_I==trial);
                     if d<=half_num_of_signal_templates
                         select_freqs_I=sort_freqs_I(1:num_of_signal_templates);
                     elseif d>=length(freqs)-half_num_of_signal_templates+1
                         select_freqs_I=sort_freqs_I(length(freqs)-num_of_signal_templates+1:length(freqs));
                     else
                         select_freqs_I=sort_freqs_I((d-half_num_of_signal_templates):(d+(num_of_signal_templates-half_num_of_signal_templates-1)));
                     end
%                      disp(freqs(select_freqs_I))
                     mscca_template=[];
                     mscca_ref=[];
                     for d=1:length(select_freqs_I)
                         template_tmp=average_template{k,test_run,sub_no,select_freqs_I(d)}(channel_select,floor(start_t*fs):floor((start_t+T)*fs-1));
%                          template_tmp=template_tmp-repmat(mean(template_tmp,2),1,size(template_tmp,2));
%                          template_tmp=template_tmp./repmat(std(template_tmp.').',1,size(template_tmp,2));
                         ref_tmp=sine_ref{select_freqs_I(d)}(:,1:size(template_tmp,2));
                         mscca_template=[mscca_template template_tmp];
                         mscca_ref=[mscca_ref ref_tmp];
                     end
                     [U,V,r]=canoncorr(mscca_template.',mscca_ref.');
                     u_store{k,T_i,test_run,sub_no,trial}=U;
                     v_store{k,T_i,test_run,sub_no,trial}=V;
                end
            end
        end
    end
end



for T_i=1:length(possible_T)
    T=possible_T(T_i);
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            sub=['S' num2str(sub_no)];
            disp(['mscca Test -> Sig Len: ' num2str(T) ', ' sub ', run: ' num2str(test_run)])
            for trial=1:trial_num
                for block=1:length(test_block(test_run,:))
                    if test_block(test_run,block)<=block_num(sub_no)
                        for k=1:num_of_subbands
                            y=subj_data{sub_no,k};
                            x=squeeze(y(channel_select,floor(start_t*fs):floor((start_t+T)*fs-1),trial,test_block(test_run,block)));

                            R=[];
                            r=[];
                            for i=1:length(freqs)
                                average_template_tmp=average_template{k,test_run,sub_no,i}(:,floor(start_t*fs):floor((start_t+T)*fs-1));
                                ref_tmp=sine_ref{i}(:,1:size(x,2));

                                r_tmp=corrcoef(x.'*u_store{k,T_i,test_run,sub_no,i}(:,1),ref_tmp.'*v_store{k,T_i,test_run,sub_no,i}(:,1));
                                r(i,1)=r_tmp(2);
                                r_tmp=corrcoef(x.'*u_store{k,T_i,test_run,sub_no,i}(:,1),average_template_tmp.'*u_store{k,T_i,test_run,sub_no,i}(:,1));
                                r(i,2)=r_tmp(2);

    %                             [u1,v1,~]=canoncorr(x.',sine_ref{i}(:,1:size(x,2)).');
    %                             [u2,v2,~]=canoncorr(x.',average_template_tmp.');
    %                             
    %                             r_tmp=corrcoef(x.'*u1(:,1),sine_ref{i}(:,1:size(x,2)).'*v1(:,1));
    %                             r(i,3)=r_tmp(2);
    %                             r_tmp=corrcoef(x.'*u2(:,1),average_template_tmp.'*v2(:,1));
    %                             r(i,4)=r_tmp(2);
    %                             r_tmp=corrcoef(x.'*u1(:,1),average_template_tmp.'*u1(:,1));
    %                             r(i,5)=r_tmp(2);

                                R(1,i)=sum(sign(r(i,:)).*r(i,:).^2);
    %                              R(1,i)=sum(r(i,:).^2);
                            end
                            r_store{k,T_i,test_run,sub_no,trial,block}=R;
                        end
                        R_tmp=[];
                        for k=1:num_of_subbands
                            R_tmp(k,:)=FB_coef(k).*r_store{k,T_i,test_run,sub_no,trial,block}(1,:);
                        end
                        R_tmp_sum=sum(R_tmp,1);
                        [~,I_R]=max(R_tmp_sum);
                        if I_R==trial
                            res_store(T_i,test_run,sub_no,trial,block)=1;
                        else
                            res_store(T_i,test_run,sub_no,trial,block)=0;
                        end
                    else
                        res_store(T_i,test_run,sub_no,trial,block)=nan;
                    end
                end
            end
        end
    end
end

acc=zeros(subject_no,length(possible_T),size(test_block,1));
for T_i=1:length(possible_T)
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            tmp=squeeze(res_store(T_i,test_run,sub_no,:,:));
            acc(sub_no,T_i,test_run)=sum(tmp,'all')/numel(tmp);
        end
    end
end

% figure;plot(possible_T,mean(nanmean(acc,3),1),'x-')
% yaxis([0 1])

save('mscca_filterbank_results.mat',...
    'r_store','res_store','acc','u_store','v_store','num_of_signal_templates')