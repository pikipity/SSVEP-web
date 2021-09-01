class flashButton extends egret.Bitmap{
    private ID;
    private imageStop;
    private imagePos;
    private imageNeg;
    private freq;
    private currentFlag;
    private timeStore;
    private currentCount;
    private dispFlag
    public constructor(flasgID:number, stopImage:string, flashImagePos:string, flashImageNeg:string, flashFreq:number, dispTimeStep:boolean){
        super();
        this.ID = flasgID;
        this.imageStop = stopImage;
        this.imagePos = flashImagePos;
        this.imageNeg = flashImageNeg;
        this.freq = flashFreq;
        this.currentCount = 0;
        this.currentFlag = 1;
        this.dispFlag = dispTimeStep;
        this.texture = RES.getRes(this.imageStop);
        this.timeStore = [];
    }
    public setDispFlag(dispFlag:boolean){
        this.dispFlag = dispFlag;
    }
    public getFreq(){
        return this.freq;
    }
    public flashFun(timeStamp:number){
        this.currentCount += 1;
        if(this.currentCount>=this.freq){
            // disp time step
            if(this.dispFlag){
                console.log(this.currentCount+': '+this.currentFlag)
                // let now = timeStamp;
                // this.timeStore.push(now);
                // if(this.timeStore.length>10){
                //     this.timeStore = this.timeStore.slice(this.timeStore.length-10,this.timeStore.length);
                // }
                // let logStr = this.ID + " flash: "
                // for(let i=1;i<this.timeStore.length;i++){
                //     logStr += this.timeStore[i]-this.timeStore[i-1]+", ";
                // }
                // console.log(logStr)
            }
            //reset counter
            this.currentCount = 0;
            // reverse 
            if(this.currentFlag>0){
                this.texture = RES.getRes(this.imagePos);
            }else{
                this.texture = RES.getRes(this.imageNeg);
            }
            this.currentFlag *= -1;
            return true;
        }else{
            return false;
        }
    }
    public flashInit(){
        this.currentFlag = 1;
        this.currentCount = 0;
        this.timeStore = [];
        if(this.dispFlag){
            let now = egret.getTimer();
            this.timeStore.push(now);
        }
    }
}