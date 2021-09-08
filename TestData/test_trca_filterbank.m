clear;clc;
load('data.mat','subj_data');

fs=256;
start_t=0.14;%1/fs;%0.5+0.14;
channel_select=1:9;
block_num=[9];
freqs=reshape([8 8.4 8.8; 9 9.4 9.8; 10 10.4 10.8; 11 11.4 11.8],1,12);
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

Fo=50;
Q=35;
BW=(Fo/(fs/2))/Q;
[b1,a1]=iircomb(floor(fs/Fo),BW,'notch');

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

u_store=cell(num_of_subbands,length(possible_T),size(test_block,1),subject_no,trial_num);
for T_i=1:length(possible_T)
    T=possible_T(T_i);
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            sub=['S' num2str(sub_no)];
            disp(['Train TRCA  ->  Sig Len: ' num2str(T) ', Run ' num2str(test_run) ', ' sub])
            for k=1:num_of_subbands
                y=subj_data{sub_no,k};
                for trial=1:trial_num
                     x=squeeze(y(channel_select,floor(start_t*fs):floor((start_t+T)*fs-1),trial,train_block(test_run,train_block(test_run,:)<=block_num(sub_no))));
%                      remove_block=[];
%                      for x_i=1:size(x,3)
%                          if isnan(squeeze(x(:,:,x_i)))
%                              remove_block=[remove_block x_i];
%                          end
%                      end
%                      x(:,:,remove_block)=[];
                     [V,~,~,~] = fun_TRCA_Matrix(x);
                     u_store{k,T_i,test_run,sub_no,trial}=V;
                end
            end
        end
    end
end

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

for T_i=1:length(possible_T)
    T=possible_T(T_i);
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            sub=['S' num2str(sub_no)];
            disp(['etrca Test -> Sig Len: ' num2str(T) ', ' sub ', run: ' num2str(test_run)])
            for trial=1:trial_num
                for block=1:length(test_block(test_run,:))
                    if test_block(test_run,block)<=block_num(sub_no)
                        for k=1:num_of_subbands
                            y=subj_data{sub_no,k};
                            x=squeeze(y(channel_select,floor(start_t*fs):floor((start_t+T)*fs-1),trial,test_block(test_run,block)));


                            total_j=length(freqs);
                            w_trca=[];
                            for j=1:total_j
                                w_trca(:,j)=u_store{k,T_i,test_run,sub_no,j}(:,1);
                            end

                            R=[];
                            r_period_tmp=[];
                            for i=1:length(freqs)
                                r_tmp=corrcoef(x.'*w_trca,average_template{k,test_run,sub_no,i}(:,floor(start_t*fs):floor((start_t+T)*fs-1)).'*w_trca);




    %                             R(1,i)=r_tmp(1,2).^2; % stim phase (0~2\pi)
                                R(1,i)=r_tmp(1,2);
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

acc=[];%zeros(subject_no,length(possible_T),size(test_block,1));
for T_i=1:length(possible_T)
    for sub_no=1:subject_no
        if sub_no==1
            select_block=[1 2 6 7 8 9];
        else
            select_block=1:size(test_block,1);
        end
        for test_run_i=1:length(select_block)
            tmp=squeeze(res_store(T_i,select_block(test_run_i),sub_no,:,:));
            acc(sub_no,T_i,test_run_i)=sum(tmp,'all')/numel(tmp);
        end
    end
end

% figure;plot(possible_T,mean(nanmean(acc,3),1),'x-')
% yaxis([0 1])

save('etrca_filterbank_results.mat','r_store','res_store','acc','u_store')