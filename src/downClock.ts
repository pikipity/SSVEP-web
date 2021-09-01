class downClock extends eui.Component{
    private timer: egret.Timer;

    private current_disp: number;
    private current_time: number = 0;
    private start_time: number;

    public constructor(){
        super();
        //init timer
        this.timer = new egret.Timer(0.01*1000, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this)
        this.timer.stop()
    }

    public init_clock(total_time:number){
        this.current_disp = total_time;
        this.current_time = 0;
        this.start_time = -100;
    }

    public start_clock(){
        this.timer.reset();
        this.timer.start();
    }

    public stop_clock(){
        this.timer.stop();
        this.timer.reset();
    }

    public get_current_time(){
        return this.current_disp + (1-this.current_time/1000);
    }

    private timerFunc(){
        if(this.start_time<0){
            this.start_time = egret.getTimer();
        }
        this.current_time = egret.getTimer() - this.start_time;
        if(this.current_time>1000){
            this.current_time = 0;
            this.start_time = egret.getTimer();
            this.current_disp -= 1; 
        }
        if(this.current_disp<0){
            this.timer.stop()
        }
    }

}