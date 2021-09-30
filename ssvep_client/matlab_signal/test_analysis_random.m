function response=test_analysis_random(f_stim,phase_stim,label_stim,fs,data,require_len)
    if size(data,2)>require_len*fs
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