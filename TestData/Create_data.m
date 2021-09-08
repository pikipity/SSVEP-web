clear;
fs=256;
trial_num=12;
block_num=[3 9];
L=floor(6*fs);
sub_num=2;

data=[];% data{sub_no,block_num,trial_num}
% fileList=dir('./');
for sub_no=2:sub_num
%     if length(fileList(file_i).name)<4
%         continue
%     end
%     
%     if ~strcmp(fileList(file_i).name(1:3),'sub')
%         continue
%     end
%     
%     sub_num=str2num(fileList(file_i).name(4:end));
    
%     if sub_no==1
%         block_num=3;
%     elseif sub_no==2
%         block_num=6;
%     end
    
    folder_name=['./sub' num2str(sub_no) '_test_normal_stim_web'];
    
    for block_i=1:block_num(sub_no)
        if exist(fullfile(folder_name,['block' num2str(block_i) '.mat']),'file')
            y=load(fullfile(folder_name,['block' num2str(block_i) '.mat']));
            if sub_no==1
                y=y.y;
                if block_i==1
                    y=y(:,20:26000);
                elseif block_i==3
                    y=y(:,20:end);
                end
                label_y=find(diff(y(end,:))>200)+1;
                label_y=label_y(1:2:end);
                start_label=label_y(2:3:end);
            elseif sub_no==2
                y=y.data;
                label_y=find(diff(y(end,:))>0.5)+1;
                label_y=label_y(1:1:36);
                start_label=label_y(2:3:end);
            end
            
%             end_label=label_y(3:3:end);
            for trial_i=1:trial_num
                data(sub_no-1,block_i,trial_i,:,:)=y(2:(2+9-1),start_label(trial_i)+1:start_label(trial_i)+L);
            end
        else
            for trial_i=1:trial_num
                data(sub_no-1,block_i,trial_i,1:9,1:L)=nan;
            end
        end
    end
end

save('data.mat','data');