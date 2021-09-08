clear;

block_num=[9];

res=[];
method_name={};
res_store_all={};

% cca
load('cca_filterbank_results.mat','res_store')
res_store_all{1}=res_store;
method_name{1}='CCA';

% ecca
load('ecca_filterbank_results.mat','res_store')
res_store_all{2}=res_store;
method_name{2}='eCCA';

% etrca
load('etrca_filterbank_results.mat','res_store')
res_store_all{3}=res_store;
method_name{3}='eTRCA';

% mscca
load('mscca_filterbank_results.mat','res_store')
res_store_all{4}=res_store;
method_name{4}='msCCA';

possible_T=0.2:0.2:5;
trial_no=12;
for method_i=1:length(res_store_all)
    for T_i=1:length(possible_T)
        for sub_no=1:size(res_store_all{method_i},3)
            if sub_no==1
                select_block=[1 2 6 7 8 9];
            else
                select_block=1:block_num(sub_no);
            end
            tmp=squeeze(res_store_all{method_i}(T_i,select_block,sub_no,:));
            tmp=tmp(~isnan(tmp));
            my_acc=sum(tmp)/numel(tmp);
            real_tw=possible_T(T_i);
            my_tw=real_tw+0.5+0.14+0.2;
            if my_acc==1
                itr=60/my_tw*(log2(trial_no)+my_acc*log2(trial_no));
            elseif my_acc<1/trial_no
                itr=0;
            else
                itr=60/my_tw*(log2(trial_no)+my_acc*log2(trial_no)+(1-my_acc)*log2((1-my_acc)/(trial_no-1)));
            end
            res(1,sub_no,method_i,T_i)=my_acc;
            res(2,sub_no,method_i,T_i)=itr;
        end
    end
end

%
figure('name','all')
tmp=squeeze(mean(res(1,:,:,:),2));
plot(possible_T.',tmp.','x-')
grid on
legend(method_name)

figure('name','individual')
for sub_no=1:size(res,2)
    subplot(size(res,2),1,sub_no)
    tmp=squeeze(res(1,sub_no,:,:));
    plot(possible_T.',tmp.','x-')
    grid on
    legend(method_name)
end