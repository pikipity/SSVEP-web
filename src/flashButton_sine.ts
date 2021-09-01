class flashButton_sine extends egret.Bitmap{
    private ID;
    private imageStop;
    private imagePos;
    private imageNeg;
    private freq;
    private theta;
    private start_time;

    private flash_flag;

    public constructor(flasgID:number, stopImage:string, flashImagePos:string, flashImageNeg:string, flashFreq:number, flashTheta:number){
        super();
        this.ID = flasgID;
        this.imageStop = stopImage;
        this.imagePos = flashImagePos;
        this.imageNeg = flashImageNeg;
        this.freq = 2*Math.PI*flashFreq/1000.0;
        this.theta = flashTheta;
        this.start_time = -100;
        this.texture = RES.getRes(this.imageStop);
        this.flash_flag = false;
    }

    public getID(){
        return this.ID;
    }

    public getFreq(){
        return this.freq;
    }

    public getNeg(){
        return this.imageNeg;
    }

    public getFlashFlag(){
        return this.flash_flag;
    }

    public flashInit(){
        this.texture = RES.getRes(this.imagePos);
        this.alpha = 0.5 + 0.5 * Math.sin(this.freq*0 + this.theta);
        this.start_time = -100;
        this.flash_flag = true;
    }

    public flashFun(){
        if(this.flash_flag){
            if(this.start_time<0){
                this.start_time = egret.getTimer();
            }
            this.alpha = 0.5 + 0.5 * Math.sin(this.freq*(egret.getTimer() - this.start_time) + this.theta);
        }
    }

    public flashStop(){
        this.texture = RES.getRes(this.imageStop);
        this.alpha = 1;
        this.flash_flag = false;
    }

    public positiveFlash(){
        this.texture = RES.getRes(this.imagePos);
        this.alpha = 1;
        this.flash_flag = false;
    }
}