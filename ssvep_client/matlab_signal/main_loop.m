function main_loop(test_flag,fs,f_stim,phase_stim,label_stim,method)
    % main_loop(test_flag,fs,f_stim,phase_stim,label_stim,method)
    % test_flag: 1 -> data_sender_test.m to receive data
    %            0 -> defined file to receive data
    % fs: sampling rate
    % f_stim: stimulus frequencies, 1*n matrix
    % phase_stim: stimulus phases, 1*n matrix
    % label_stim: stimulus label, 1*n cell
    % method: method name, string
    %
    % Example: main_loop(1,250,[],[],{'A','B','C'},'cca')
    
    marker_string={'start_trial',...
                   'end_trial',...
                   'end_all',...
                   'start_all'};
    
    lib = lsl_loadlib();
    %result = lsl_resolve_byprop(lib,'type','Markers');
    marker_info = lsl_streaminfo(lib,'MarkerStream', 'Markers',...
                                      1, 0, 'cf_string', ['id_MarkerStream']);
    response_info = lsl_streaminfo(lib,'ResponseStream', 'Responses',...
                                      1, 0, 'cf_string', ['id_ResponseStream']);
    marker_receiver = lsl_inlet(marker_info);% [mrks,ts] = inlet.pull_sample(0);
    response_sender = lsl_outlet(response_info);% outlet.push_sample({mrk});
    %
    disp_len=5;
    figure
    subplot(2,1,1)
    plot_t=linspace(0,disp_len,fs*disp_len);
    plot_v=zeros(1,length(plot_t));
    ln=plot(plot_t,plot_v);
    set(gca,'Xtick',0:1:disp_len)
    axis([0 disp_len 0 5])
    title('Trigger')
    subplot(2,1,2)
    plot_t=linspace(0,disp_len,fs*disp_len);
    plot_v=zeros(1,length(plot_t));
    ln_eeg=plot(plot_t,plot_v);
    set(gca,'Xtick',0:1:disp_len)
    axis([0 disp_len -100 100])
    title('EEG')
    %
    for n=1:3
        disp(['wait ' num2str(n)])
        pause(1);
    end
    response_sender.push_sample({'OK'});
    data_store=[];
    if test_flag
        data_sender = data_sender_test(fs);
        start_ind=-100;
        start_time=0;
        analysis_flag=0;
        while 1
            % receive marker
            [mrks,ts] = marker_receiver.pull_sample(0);
            markervalue=0;
            break_flag=0;
            if ~isempty(mrks)
                mrks=mrks{1};
                switch mrks
                    case marker_string{1}
                        start_ind=-1;
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
                disp([mrks ': ' num2str(analysis_flag)])
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
%                     marker_line=zeros(1,size(data,2));
%                     marker_line(1)=markervalue;
%                     data=[data;
%                           marker_line];
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
            %
            tmp_ln=min(fs*disp_len,size(data_store,2));
            plot_v=data_store(end,:);
            ln.XData=plot_t((end-tmp_ln+1):end);
            ln.YData=plot_v((end-tmp_ln+1):end);
            plot_v=data_store(2,:);
            ln_eeg.XData=plot_t((end-tmp_ln+1):end);
            ln_eeg.YData=plot_v((end-tmp_ln+1):end);
            %
            % analysis
            if analysis_flag
                switch method
                    case 'None'
                        response='';
                    otherwise
                        label_sig=data_store(end,:);
                        start_ind_tmp=find(label_sig==1);
                        if isempty(start_ind_tmp)
                            response='';
                        else
                            start_ind_tmp=start_ind_tmp(end);
                            data_analysis=data_store(:,start_ind_tmp:end);
                            response=test_analysis_random(f_stim,phase_stim,label_stim,fs,data_analysis,1);
                        end
                end
                if ~isempty(response)
                    response_sender.push_sample({response});
                    disp({response})
                    analysis_flag=0;
                end
            end
        end
    end
    % delete
    marker_info.delete();
    marker_receiver.delete();
    response_info.delete();
    response_sender.delete();
    %
    close all;
    %
    answer = questdlg('Save Data?', ...
                    'SAVE DATA', ...
                    'Yes','No','No');
    switch answer
        case 'Yes'
            save(['SaveData_' datestr(now,'yyyy-mm-dd_HH-MM-SS') '.mat'],'data_store','-v7.3')
    end
end