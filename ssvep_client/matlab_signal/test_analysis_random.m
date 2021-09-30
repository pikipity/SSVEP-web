function response=test_analysis_random(f_stim,phase_stim,label_stim,fs,data_store)
    label_sig=data_store(end,:);
    start_ind=find(label_sig==1);
    if isempty(start_ind)
        response='';
    else
        start_ind=start_ind(end);
        data=data_store(:,start_ind:end);
        if size(data,2)>2*fs
%             disp(size(data,2))
            label_order=[0 1:length(label_stim)];
            select_ind=label_order(randi(length(label_order)));
            if select_ind==0
                response='';
            else
                response=label_stim{select_ind};
            end
        else
            response='';
        end
    end
end