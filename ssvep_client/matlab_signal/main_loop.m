function main_loop(test_flag,fs,f_stim,phase_stim,label_stim,method)
    % main_loop(f_stim,phase_stim,label_stim,method)
    % test_flag: 1 -> data_sender_test.m to receive data
    %            0 -> defined file to receive data
    % fs: sampling rate
    % f_stim: stimulus frequencies, 1*n matrix
    % phase_stim: stimulus phases, 1*n matrix
    % label_stim: stimulus label, 1*n cell
    % method: method name, string
    
    marker_string={'start_trial',...
                   'end_trial',...
                   'end_all',...
                   'start_all'};
    
    lib = lsl_loadlib();
    marker_info = lsl_streaminfo(lib,'MarkerStream', 'Markers',...
                                      1, 0, 'cf_string', ['id_MarkerStream']);
    response_info = lsl_streaminfo(lib,'ResponseStream', 'Responses',...
                                      1, 0, 'cf_string', ['id_ResponseStream']);
    marker_receiver = lsl_inlet(marker_info);% [mrks,ts] = inlet.pull_sample(0);
    response_sender = lsl_outlet(response_info);% outlet.push_sample({mrk});
    data_store=[];
    if test_flag
        data_sender = data_sender_test(fs);
        start_ind=-100;
        start_time=0;
        analysis_flag=0;
        while 1
            % receive marker
            [mrks,ts] = marker_receiver.pull_sample(0);
            mrks=mrks{1};
            markervalue=0;
            break_flag=0;
            switch mrks
                case marker_string{1}
                    markervalue=1;
                    analysis_flag=1;
                case marker_string{2}
                    markervalue=2;
                    analysis_flag=0;
                case marker_string{3}
                    break_flag=1;
                case marker_string{4}
                    % "clean all stored data" and receive new data -> synchronization
                    data_sender.clean();
                    start_ind=-1;
                    markervalue=100;
                otherwise
                    markervalue=0;
            end
            if break_flag
                break
            end
            % receive data
            data=data_sender.get_data();
            if start_ind<-1
                data=[data;
                      zeros(1,size(data,2))];
            elseif start_ind==-1
                start_ind=data(1,1);
                start_time=ts;
                data=[data;
                      [markervalue zeros(1,size(data,2)-1)]];
            else
                if markervalue>0
                    time_step=(data(1,:)-start_ind)*(1/fs)+start_time;
                    [min_time,min_ind]=min(abs(time_step-ts));
                    marker_line=zeros(1,size(data,2));
                    marker_line(min_ind)=markervalue;
                    data=[data;
                          marker_line];
                else
                    data=[data;
                          zeros(1,size(data,2))];
                end
            end
            data_store=[data_store data];
            % analysis
            if analysis_flag
                switch method
                    case 'None'
                        response='';
                    otherwise
                        response=test_analysis_random(f_stim,phase_stim,label_stim);
                end
                if ~isempty(response)
                    response_sender.push_sample({response});
                end
            end
        end
    end
end