%请导入要转换的hdf5文件，使用时请选择需要转换的hdf5文件
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
            %调用读取方法
            datastruct = ghdf5read(filename);
            %获取采集数组
            data_raw = datastruct.RawData.Samples;
            %获取打标点
            marker = datastruct.AsynchronData.Time;
            %获取采样率
            fs = datastruct.RawData.AcquisitionTaskDescription.SamplingFrequency;
            %获取data数组的列宽
            h = length(data_raw);
            %获取marker数组的列宽
            l = length(marker);
            %创建一个data_channel数组
            data_channel = zeros(1,h);
            %循环将标点写入data数组
             for i = 1:l
                %获取marker数组的每一个标信息
                 marker_data = marker(1:i);
                data_channel(1,marker_data) = 1; 
             end
            %耦合数组
            data = [data_raw;data_channel];
            %保存数据
            save(save_name,'data');
        end
    end
end



%获取用户名
% user_profile = getenv('USERPROFILE'); 
%路径信息
% dirname = sprintf('%s\\Documents\\gRecorder', user_profile);
%保存文件夹名字，使用时需手动更改名字
% filename = sprintf('%s\\HBGD_EEG2020.06.10_10.23.44.mat', dirname);
%markerfile = sprintf('%s\\marker.mat', dirname);
%转换为double类型
% data_saved = double(data_raw);
% save(filename, 'data');%数据+1行marker
%保存marker信息
%save(markerfile, 'marker');
