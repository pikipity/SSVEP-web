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

if ~exist('subj_data','var')
    load('data.mat','data');
    subj_data={};
    subject_no=size(data,1);
    for sub_no=1:subject_no
        for k=1:num_of_subbands
            subj_data{sub_no,k}=[];
            for block=1:block_num(sub_no)
                for trial=1:trial_num
                    y=squeeze(data(sub_no,block,trial,channel_select,:));
                    for ch_i=1:size(y,1)
                        tmp=y(ch_i,:);
                        tmp=filtfilt(b1,a1,tmp);
                        tmp=filtfilt(b2(k,:),a2(k,:),tmp);
                        tmp=detrend(tmp);
                        tmp=tmp-mean(tmp);
                        tmp=tmp./std(tmp);
%                         tmp=detrend(y(ch_i,:));
%                         tmp=filtfilt(b2(k,:),a2(k,:),tmp);
                        subj_data{sub_no,k}(ch_i,:,trial,block)=tmp;
                    end
                end
            end
        end
    end
    save('data.mat','data','subj_data');
    clear data
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
                    if test_block(test_run,block)<=block_num(sub_no)
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

save('cca_filterbank_results.mat','r_store','res_store','acc')