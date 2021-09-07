%�뵼��Ҫת����hdf5�ļ���ʹ��ʱ��ѡ����Ҫת����hdf5�ļ�
start_file_name='RecordSession_';
file_list=dir('./');
for file_i=1:length(file_list)
    filename=file_list(file_i).name;
    if length(filename)>length(start_file_name)
        if strcmp(filename(1:length(start_file_name)),start_file_name)
            %filename = 'ssvep_100target\cmw_mfsc1_2021.08.05_16.57.22.hdf5';
            find_pos = strfind(filename,'.hdf5');
            if find_pos>0
                save_name=[filename(1:find_pos-1) '.mat'];
            else
                save_name=[filename '.mat'];
                filename=[filename '.hdf5'];    
            end
            %���ö�ȡ����
            datastruct = ghdf5read(filename);
            %��ȡ�ɼ�����
            data_raw = datastruct.RawData.Samples;
            %��ȡ����
            marker = datastruct.AsynchronData.Time;
            %��ȡ������
            fs = datastruct.RawData.AcquisitionTaskDescription.SamplingFrequency;
            %��ȡdata������п�
            h = length(data_raw);
            %��ȡmarker������п�
            l = length(marker);
            %����һ��data_channel����
            data_channel = zeros(1,h);
            %ѭ�������д��data����
             for i = 1:l
                %��ȡmarker�����ÿһ������Ϣ
                 marker_data = marker(1:i);
                data_channel(1,marker_data) = 1; 
             end
            %�������
            data = [data_raw;data_channel];
            %��������
            save(save_name,'data');
        end
    end
end



%��ȡ�û���
% user_profile = getenv('USERPROFILE'); 
%·����Ϣ
% dirname = sprintf('%s\\Documents\\gRecorder', user_profile);
%�����ļ������֣�ʹ��ʱ���ֶ���������
% filename = sprintf('%s\\HBGD_EEG2020.06.10_10.23.44.mat', dirname);
%markerfile = sprintf('%s\\marker.mat', dirname);
%ת��Ϊdouble����
% data_saved = double(data_raw);
% save(filename, 'data');%����+1��marker
%����marker��Ϣ
%save(markerfile, 'marker');
