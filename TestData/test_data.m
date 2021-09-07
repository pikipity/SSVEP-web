clear;
folder_path='./test_matlab_recorder';

fs=256;
block_num=1;
trial_num=12;
L=floor(6*fs);
ch_num=9;
sub_num=1;

data=[];

for block_i=1:block_num
    y=load(fullfile(folder_path,['block' num2str(block_i) '.mat']));
%     y=y.data;
    y=y.y;
    y=y(2:end,:);
    y(end,:)=1-y(end,:);
    % need change-------------------------------------------------
%     if block_i==1
%         y=y(:,20:26000);
%     elseif block_i==3
%         y=y(:,20:end);
%     end
    %-------------------------------------------------------------
    label_y=find(diff(y(end,:))>0.5)+1;
    % need change-----------------------------------------------------
    label_y=label_y(1:1:36);
    %----------------------------------------------------------------------
    start_label=label_y(2:3:36);
%     end_label=label_y(3:3:end);
    for trial_i=1:trial_num
        data(sub_num,block_i,trial_i,:,:)=y(2:(2+ch_num-1),start_label(trial_i)+1:start_label(trial_i)+L);
    end
end

% CCA
start_t=0.14;%1/fs;%0.5+0.14;
channel_select=1:ch_num;
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

test_block=(1:block_num)';
train_block=zeros(size(test_block,1),block_num-size(test_block,2));
for test_run=1:size(test_block,1)
    train_block(test_run,:)=setdiff(1:block_num,test_block(test_run,:));
end

sine_ref={};
for i=1:length(freqs)
    sine_ref{i}=gen_ref_sin(freqs(i),fs,fs*10,5,phases(i));
end

possible_T=0.2:0.2:3;

subj_data={};
subject_no=size(data,1);
for sub_no=1:subject_no
    for k=1:num_of_subbands
        subj_data{sub_no,k}=[];
        for block=1:block_num
            for trial=1:trial_num
                y=squeeze(data(sub_no,block,trial,channel_select,:));
                for ch_i=1:size(y,1)
                    tmp=detrend(y(ch_i,:));
                    tmp=filtfilt(b2(k,:),a2(k,:),tmp);
                    subj_data{sub_no,k}(ch_i,:,trial,block)=tmp;
                end
            end
        end
    end
end

subject_no=size(subj_data,1);

r_store=cell(num_of_subbands,length(possible_T),size(test_block,1),subject_no,trial_num,size(test_block,2));
% r_store{k,T_i,test_run,sub_no,trial,block}
res_store=zeros(length(possible_T),size(test_block,1),subject_no,trial_num,size(test_block,2));

for T_i=1:length(possible_T)
    T=possible_T(T_i);
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            sub=['S' num2str(sub_no)];
            disp(['CCA Test -> Sig Len: ' num2str(T) ', ' sub ', run: ' num2str(test_run)])
            for trial=1:trial_num
                for block=1:length(test_block(test_run,:))
                    for k=1:num_of_subbands
                        y=subj_data{sub_no,k};
                        x=squeeze(y(channel_select,floor(start_t*fs):floor((start_t+T)*fs-1),trial,test_block(test_run,block)));
                        
                        R=[];
                        for i=1:length(freqs)
                            [u,v,r]=canoncorr(x.',sine_ref{i}(:,1:size(x,2)).');
                            R(1,i)=r(1);
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

figure;
plot(possible_T,mean(mean(acc,3),1),'x-')

% eCCA
average_template=cell(num_of_subbands,size(test_block,1),subject_no,trial_num);
for test_run=1:size(train_block,1)
    for sub_no=1:subject_no
        for trial=1:trial_num
            for k=1:num_of_subbands
                y=subj_data{sub_no,k};
                x=squeeze(y(channel_select,:,trial,train_block(test_run,:)));
                for dd=2:size(x,3)
                    tmp1=squeeze(x(:,:,1));
                    tmp2=squeeze(x(:,:,dd));
                    [~,~,dd_r]=canoncorr(tmp1.',tmp2.');
                    if dd_r(1)<0
                        error('Negative');
                    end
                end
                average_template{k,test_run,sub_no,trial}=mean(x,3);
            end
        end
    end
end

r_store=cell(num_of_subbands,length(possible_T),size(test_block,1),subject_no,trial_num,size(test_block,2));
% r_store{k,T_i,test_run,sub_no,trial,block}
res_store=zeros(length(possible_T),size(test_block,1),subject_no,trial_num,size(test_block,2));

for T_i=1:length(possible_T)
    T=possible_T(T_i);
    for test_run=1:size(test_block,1)
        for sub_no=1:subject_no
            sub=['S' num2str(sub_no)];
            disp(['eCCA Test -> Sig Len: ' num2str(T) ', ' sub ', run: ' num2str(test_run)])
            for trial=1:trial_num
                for block=1:length(test_block(test_run,:))
                    for k=1:num_of_subbands
                        y=subj_data{sub_no,k};
                        x=squeeze(y(channel_select,floor(start_t*fs):floor((start_t+T)*fs-1),trial,test_block(test_run,block)));
                        
                        R=[];
                        r=[];
                        for i=1:length(freqs)
                            average_template_tmp=average_template{k,test_run,sub_no,i}(:,floor(start_t*fs):floor((start_t+T)*fs-1));
                            
                            [u1,v1,~]=canoncorr(x.',sine_ref{i}(:,1:size(x,2)).');
                            [u2,v2,~]=canoncorr(x.',average_template_tmp.');
                            [u3,v3,~]=canoncorr(average_template_tmp.',sine_ref{i}(:,1:size(x,2)).');
                            
                            r_tmp=corrcoef(x.'*u1(:,1),sine_ref{i}(:,1:size(x,2)).'*v1(:,1));
                            r(i,1)=r_tmp(2);
                            r_tmp=corrcoef(x.'*u2(:,1),average_template_tmp.'*v2(:,1));
                            r(i,2)=r_tmp(2);
                            r_tmp=corrcoef(x.'*u1(:,1),average_template_tmp.'*u1(:,1));
                            r(i,3)=r_tmp(2);
                            r_tmp=corrcoef(x.'*u3(:,1),average_template_tmp.'*u3(:,1));
                            r(i,4)=r_tmp(2);
                            
                            R(1,i)=sign(r(i,1))*r(i,1)^2+sign(r(i,2))*r(i,2)^2+sign(r(i,3))*r(i,3)^2+sign(r(i,4))*r(i,4)^2;
%                             R(1,i)=r(i,1)^2+r(i,2)^2+r(i,3)^2+r(i,4)^2;
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

hold on
plot(possible_T,mean(mean(acc,3),1),'x-')

grid on
legend({'CCA','eCCA'})