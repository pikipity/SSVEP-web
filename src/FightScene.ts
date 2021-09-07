class FightScene extends eui.Component{
    private  flashButton1_area: eui.Group;
    private  cue_1: eui.Label;
    private  flashButton2_area: eui.Group;
    private  cue_2: eui.Label;
    private  flashButton3_area: eui.Group;
    private  cue_3: eui.Label;
    private  flashButton4_area: eui.Group;
    private  cue_4: eui.Label;
    private  flashButton5_area: eui.Group;
    private  cue_5: eui.Label;
    private  flashButton6_area: eui.Group;
    private  cue_6: eui.Label;
    private  flashButton7_area: eui.Group;
    private  cue_7: eui.Label;
    private  flashButton8_area: eui.Group;
    private  cue_8: eui.Label;
    private  flashButton9_area: eui.Group;
    private  cue_9: eui.Label;
    private  flashButton10_area: eui.Group;
    private  cue_10: eui.Label;
    private  flashButton11_area: eui.Group;
    private  cue_11: eui.Label;
    private  flashButton12_area: eui.Group;
    private  cue_12: eui.Label;
    private  cueList;
    private  flashList;
    private  flashAreaList;
    private  trigger_area: eui.Group;
    private  triggerDisp;

    private clock_area: eui.Group;
    private clock = new downClock();

    private freqList = [8  ,9  ,10  ,11  ,
                        8.4,9.4,10.4,11.4,
                        8.8,9.8,10.8,11.8]; //[10,6,7.5,5,15]
    private phaseList= [0        ,Math.PI/2,0        ,Math.PI/2,
                        Math.PI/2,0        ,Math.PI/2,0        ,
                        0        ,Math.PI/2,0        ,Math.PI/2];

    private dispTrigger = -1;

    private gameState = -1;

    private currentGameState;
    private currentTrail;

    private triggerFrameCount;

    //state:
    //      1 -> cue
    //      2 -> flash
    //      3 -> rest

    public constructor(state: number, trail: number){
        super();
        this.currentGameState = state;
        this.currentTrail = trail;
        this.triggerFrameCount = 0;
        this.skinName = "resource/eui_skins/fightScene.exml";
        this.flashList = [];
        this.flashAreaList = [this.flashButton1_area,
                              this.flashButton4_area,
                              this.flashButton7_area,
                              this.flashButton10_area,
                              this.flashButton2_area,
                              this.flashButton5_area,
                              this.flashButton8_area,
                              this.flashButton11_area,
                              this.flashButton3_area,
                              this.flashButton6_area,
                              this.flashButton9_area,
                              this.flashButton12_area];
        this.cueList = [this.cue_1,
                        this.cue_4,
                        this.cue_7,
                        this.cue_10,
                        this.cue_2,
                        this.cue_5,
                        this.cue_8,
                        this.cue_11,
                        this.cue_3,
                        this.cue_6,
                        this.cue_9,
                        this.cue_12];
        // add clock
        this.clock.width = this.clock_area.width;
        this.clock.height = this.clock_area.height;
        this.clock_area.addChild(this.clock);
        //init clock
        if(state==1 || state==3){
            this.clock.init_clock(0);
        }else{
            this.clock.init_clock(5);
        }
        // add flash button
        for(let i=0;i<this.flashAreaList.length;i++){
            let newFlashButton = new flashButton_sine(
                i,"black_color_jpg","white_color_jpg","black_color_jpg",
                this.freqList[i],this.phaseList[i]
            );
            newFlashButton.width = this.flashAreaList[i].width;
            newFlashButton.height = this.flashAreaList[i].height;
            this.flashList.push(newFlashButton);
        }
        // init flash
        this.initFlash();
        if(state==1){
            for(let i=0;i<this.flashList.length;i++){
                if(i==(trail-1)){
                    this.flashList[trail-1].positiveFlash();
                }else{
                    this.flashList[i].flashStop();
                }
            }
        }else if(state==3){
            for(let i=0;i<this.flashList.length;i++){
                this.flashList[i].flashStop();
            }
        }
        // add trigger
        this.triggerDisp = new flashButton_sine(
            100,"black_color_jpg","white_color_jpg","black_color_jpg",
            0,0
        );
        this.triggerDisp.width = this.trigger_area.width;
        this.triggerDisp.height = this.trigger_area.height;
        this.trigger_area.addChild(this.triggerDisp);
        this.triggerDisp.flashStop();
        //init cue
        if(state==1){
            for(let i=0;i<this.cueList.length;i++){
                if(i==(trail-1)){
                    this.cueList[i].$setText('+');
                }else{
                    this.cueList[i].$setText('');
                }
            }
        }else{
            for(let i=0;i<this.cueList.length;i++){
                this.cueList[i].$setText('');
            }
        }
        // start flash
        if(state==2){
            this.startFlash();
        }else{
            this.startCount();
        }
    }

    private initFlash(){
        // disp flash freq
        let dispActualFreq = 'Actrual Freq: ';
        for(let i=0;i<this.flashList.length;i++){
            dispActualFreq += this.flashList[i].getFreq()*1000.0/(2*Math.PI)+', '; //2*Math.PI*flashFreq/1000.0
        }
        console.log(dispActualFreq)
        // add stimuli to area
        for(let i=0;i<this.flashList.length;i++){
            // add positive image
            this.flashAreaList[i].addChildAt(this.flashList[i],0);
            this.flashList[i].flashInit();
            // add negative image
            let backgroundImag = new egret.Bitmap();
            backgroundImag.texture = RES.getRes(this.flashList[i].getNeg());
            backgroundImag.width = this.flashAreaList[i].width;
            backgroundImag.height = this.flashAreaList[i].height;
            this.flashAreaList[i].addChildAt(backgroundImag,0);
        }
    }

    private startFlash(){
        this.dispTrigger = 1;
        //start flash event
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this, false, 999);
        //start clock
        this.clock.start_clock();
    }

    private startCount(){
        this.dispTrigger = 1;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameCount, this, false, 999);
        this.clock.start_clock();
    }

    private stopFlash(){
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        for(let i=0;i<this.flashList.length;i++){
            this.flashList[i].flashStop();
        }
    }

    private onEnterFrameCount(e: egret.Event){
        if(this.dispTrigger>=0){
            if(this.dispTrigger>0){
                this.triggerDisp.positiveFlash();
                if(this.triggerFrameCount<6){
                    this.triggerFrameCount++
                }else{
                    this.dispTrigger=0;
                    this.triggerFrameCount=0;
                }
            }else if(this.dispTrigger==0){
                this.triggerDisp.flashStop();
                this.dispTrigger=-1;
            }
        }
        // check clock
        if(this.clock.get_current_time()<=0){
            this.clock.stop_clock();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameCount, this);
            for(let i=0;i<this.flashList.length;i++){
                this.flashList[i].flashStop();
            }
            if(this.currentGameState==1){
                this.gameState=2; // -> flash
            }else if(this.currentGameState==3){
                if(this.currentTrail<this.flashList.length){
                    this.gameState=1; // -> cue
                }else{
                    this.gameState=4; // -> cue
                }
            }else{
                this.gameState=99; // -> cue
            }
        }
    }

    private onEnterFrame(e: egret.Event){
        if(this.dispTrigger>=0){
            if(this.dispTrigger>0){
                this.triggerDisp.positiveFlash();
                if(this.triggerFrameCount<6){
                    this.triggerFrameCount++
                }else{
                    this.dispTrigger=0;
                    this.triggerFrameCount=0;
                }
            }else if(this.dispTrigger==0){
                this.triggerDisp.flashStop();
                this.dispTrigger=-1;
            }
        }
        // change alpha of positive image
        for(let i=0;i<this.flashList.length;i++){
            this.flashList[i].flashFun();
        }
        // check clock
        if(this.clock.get_current_time()<=0){
            this.clock.stop_clock();
            this.stopFlash();
            this.gameState=3; // -> rest
            //this.clock.init_clock(5);
            //this.clock.start_clock();
        }
    }

    public checkState(){
        return this.gameState
    }

    // public constructor(){
    //     super();
    //     this.skinName = "resource/eui_skins/fightScene.exml";
    //     this.flashList = [];
    //     this.flashAreaList = [this.flashButton1_area,
    //                           this.flashButton2_area,
    //                           this.flashButton3_area,
    //                           this.flashButton4_area];
    //     // add flash button
    //     for(let i=0;i<this.flashAreaList.length;i++){
    //         let newFlashButton = new flashButton(
    //             i,"black_color_jpg","black_color_jpg","white_color_jpg",
    //             this.freqConvertFrame(this.freqList[i]),false
    //         );
    //         if(i==4){
    //             newFlashButton.setDispFlag(true)
    //         }
    //         newFlashButton.width = this.flashAreaList[i].width;
    //         newFlashButton.height = this.flashAreaList[i].height;
    //         this.flashAreaList[i].addChild(newFlashButton);
    //         this.flashList.push(newFlashButton);
    //     }
    //     // init flash
    //     this.initFlash();
    //     // start flash
    //     this.startFlash();
    // }

    // private initFlash(){
    //     let dispActualFreq = 'Actrual Freq: ';
    //     let dispActualHalfPeriod = 'Actrual Half Period: ';
    //     for(let i=0;i<this.flashList.length;i++){
    //         this.flashList[i].flashInit();
    //         dispActualFreq += this.frameConvertFreq(this.flashList[i].getFreq())+', ';
    //         dispActualHalfPeriod += 1000*0.5/this.frameConvertFreq(this.flashList[i].getFreq())+', ';
    //     }
    //     console.log(dispActualFreq)
    //     console.log(dispActualHalfPeriod)
    // }

    // private startFlash(){
    //     //egret.startTick(this.onEnterFrame, this);
    //     this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    // }

    // private onEnterFrame(timeStamp: number): boolean  {
    //     // let redraw = false;
    //     for(let i=0;i<this.flashList.length;i++){
    //         // redraw = redraw || this.flashList[i].flashFun(timeStamp);
    //         this.flashList[i].flashFun(timeStamp);
    //     }
    //     // return redraw
    //     return true
    // }

    // private freqConvertFrame(freq:number){
    //     return Math.round((0.5/freq)/(1/60));
    // }

    // private frameConvertFreq(frame:number){
    //     return 1/(2/60*frame);
    // }
}