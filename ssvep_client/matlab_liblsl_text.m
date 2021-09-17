clear;clc;
lib = lsl_loadlib();

% resolve a stream...
disp('Resolving a Markers stream...');
% result = {};
% while isempty(result)
%     result = lsl_resolve_byprop(lib,'type','Markers'); end

result={lsl_streaminfo(lib,'MyMarkerStream', 'Markers', 1, 0, 'cf_string', 'myuidw43536')};

% create a new inlet
disp('Opening an inlet...');
inlet = lsl_inlet(result{1});

disp('Now receiving data...');
while true
    % get data from the inlet
    [mrks,ts] = inlet.pull_sample(0);
    % and display it
    if ~isempty(mrks)
        disp(mrks);
    end
end