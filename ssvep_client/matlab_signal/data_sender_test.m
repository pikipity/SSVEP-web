classdef data_sender_test
    properties (Hidden)
        store_data=[];
        sampling_rate=250;
        preTime=-1;
        sample_num=8
    end
    
    methods
        function self = data_sender_test(fs)
            self.store_data=load('test_data.mat','y').y;
            self.sampling_rate=fs;
        end
        function result=get_data(self)
            currentTime=cputime;
            if self.preTime~=-1 && (currentTime-self.preTime)<(self.sample_num*self.sampling_rate)
                pause(self.sample_num*self.sampling_rate-(currentTime-self.preTime))
            end
            self.preTime=currentTime;
            result=self.store_data(:,1:self.sample_num);
            self.update_store_data()
        end
        
        function self = update_store_data(self)
            self.store_data=[self.store_data(:,(self.sample_num+1):end) self.store_data(:,1:self.sample_num)];
        end
        
        function self = clean(self)
            self.store_data=load('test_data.mat','y').y;
            self.preTime=-1;
        end
    end
end