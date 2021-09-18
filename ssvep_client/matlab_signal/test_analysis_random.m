function response=test_analysis_random(f_stim,phase_stim,label_stim)
    label_order=[0 1:length(label_stim)];
    response=label_stim{label_order(randi(length(label_order)))};
end