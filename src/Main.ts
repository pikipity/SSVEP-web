//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        //this.createGameScene();
        this.addEventListener(egret.Event.ENTER_FRAME, this.Game, this, false, 0);
    }

    

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private socket;
    private connect_flag = false;
    private server_path = 'http://127.0.0.1:5000/'

    private onSocketOpen(){
        console.log('Connect')
    }

    private onSocketClose(){
        this.connect_flag = false;
        this.roomStr = 'None';
        this.idStr = 'None';
        console.log('Disconnect')
        if(this.currentGameState>0){
            this.nextGameState = 104
        }
    }

    private onReceiveMessage(data){
        console.log(data)
    }

    private onSocketError(data){
        console.log(data)
    }

    private CreateNewSSVEPStim(data){
        let datasplit=data.split(",")
        console.log(datasplit)
        this.idStr = datasplit[0]
        this.roomStr = datasplit[1]
        this.connect_flag = true
    }

    private onSocketSSVEPResponse(data){
        console.log('Response: '+data)
    }

    private onSocketChangeGameState(data){
        console.log('Change state to '+data)
        this.nextGameState = parseInt(data)
    }

    // private onScoketReconnectionFail(){
    //     try{
    //         this.socket.disconnect();
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    // private onSocketConnectError(){
    //     this.socket.disconnect()
    // }

    private dispFPS = true;
    private dispFPSNum = 30;
    private dispFPScurrentNum = -1;
    private PreTime = 0;
    private sumFPS = 0;
    private sumNum = 0;
    private FPSlabel: egret.TextField = new egret.TextField();

    private feedbackStr = '';
    private idStr = '';
    private roomStr = '';

    private currentGameState = -1;
    private nextGameState = 0;
    // state:
    //      0 -> start
    //      1 -> cue
    //      2 -> flash
    //      3 -> rest
    //      4 -> End
    //    100 -> connect to server (display "connecting")
    //    101 -> wait for controller (display "Room ID and wait")
    //    102, 103 -> wait for start
    //    104 -> connect break
    private currentGameScene;
    private trial=1;

    protected Game(): void {
        if(this.dispFPS){
            if(this.dispFPScurrentNum<0){
                //Init dsp display
                this.PreTime = egret.getTimer();
                this.FPSlabel.text = 'None';
                this.roomStr = 'None';
                this.idStr = 'None';
                this.FPSlabel.size = 20;
                this.dispFPScurrentNum=0;
            }else{
                // Update fps and time
                let currentTime=egret.getTimer();
                this.sumFPS+=1000/(currentTime-this.PreTime);
                this.sumNum++;
                this.PreTime = currentTime;
                // Update fps display
                this.dispFPScurrentNum++;
                if(this.dispFPScurrentNum>this.dispFPSNum){
                    this.dispFPScurrentNum=0;
                    this.FPSlabel.text = 'FPS: ' + Math.floor(this.sumFPS/this.sumNum*100)/100 + '\n' +
                                         'Connect: '+this.connect_flag.toString() + '\n' +
                                         ''+//'ID: ' + this.idStr + '\n' +
                                         'Room: ' + this.roomStr;
                    this.sumFPS = 0;
                    this.sumNum = 0;
                }
            }
        }
        if(this.nextGameState!=this.currentGameState){
            // remove old scene
            if(this.currentGameState!=-1){
                for(let i=0;i<this.numChildren;i++){
                    this.removeChildAt(i)
                }
            }
            // build new scene
            this.currentGameState = this.nextGameState;
            if(this.connect_flag){
                this.socket.emit('changeGameState',this.currentGameState.toString())
            }
            switch(this.currentGameState){
                case 0:{
                    console.log('Start Scene');
                    this.feedbackStr = '';
                    this.trial=1;
                    try{
                        this.socket.disconnect();
                    }catch(error){
                        console.log(error)
                    }finally{
                        this.currentGameScene = new StartScene();
                        break;
                    }
                }
                case 1:{
                    console.log('Cue')
                    this.currentGameScene = new FightScene(1,this.trial,this.feedbackStr,this.connect_flag);
                    break;
                }
                case 2:{
                    console.log('Flash')
                    this.currentGameScene = new FightScene(2,this.trial,this.feedbackStr,this.connect_flag);
                    break;
                }
                case 3:{
                    console.log('Rest')
                    this.currentGameScene = new FightScene(3,this.trial,this.feedbackStr,this.connect_flag);
                    this.trial++;
                    break;
                }
                case 4:{
                    console.log('End')
                    this.currentGameScene = new EndScene(this.connect_flag);
                    break;
                }
                case 100:{
                    this.feedbackStr = '';
                    this.trial=1;
                    this.currentGameScene = new ConnectingScene();
                    if(this.connect_flag){
                        console.log('Has been connected to server')    
                    }else{
                        console.log('Connect to Server')
                        //
                        var self = this
                        this.socket = io.connect(this.server_path);
                        this.socket.on('connect',function(){
                            self.onSocketOpen()
                        })
                        this.socket.on('disconnect',function(){
                            self.onSocketClose()
                        })
                        this.socket.on('news',function(data){
                            self.onReceiveMessage(data)
                        })
                        this.socket.on('CreateNewSSVEPStim',function(data){
                            self.CreateNewSSVEPStim(data)
                        })
                        this.socket.on('Error',function(data){
                            self.onSocketError(data)
                        })
                        // this.socket.on('error',function(){
                        //     self.onSocketConnectError()
                        // })
                        // this.socket.on('reconnect_failed',function(){
                        //     self.onScoketReconnectionFail()
                        // })
                        this.socket.on('ssvepResponse',function(data){
                            self.onSocketSSVEPResponse(data)
                        })
                        this.socket.on('changeGameState',function(data){
                            self.onSocketChangeGameState(data)
                        })
                        this.socket.emit('addNewSSVEPStim','web_stimuli_12')
                        //
                    }   
                    break;
                }
                case 101:{
                    console.log('Wait for controller')
                    this.currentGameScene = new WaitForControllerScene(this.idStr,this.roomStr);
                    break;
                }
                case 102:{
                    console.log('Wait for start')
                    this.currentGameScene = new WaitForStartScene();
                    break;
                }
                case 103:{
                    console.log('Wait for start')
                    this.currentGameScene = new WaitForStartScene();
                    break;
                }
                case 104:{
                    console.log('Connection Break')
                    try{
                        this.socket.disconnect();
                    }catch(error){
                        console.log(error)
                    }finally{
                        this.currentGameScene = new ConnectBreakScene();
                        break;
                    }
                }
                default:{
                    console.log('Error Build Game State !!');
                    this.currentGameScene = new ErrorScene();
                    break;
                }
            }
            this.addChild(this.currentGameScene);
            this.addChild(this.FPSlabel)
        }else{
            if(this.currentGameState==100 && this.connect_flag){
                this.nextGameState = 101
            }
            // check state
            if(this.currentGameScene.checkState()>=0){
                this.nextGameState = this.currentGameScene.checkState();
            }
            // check whether needs re-connection
            // if(!this.connect_flag && this.nextGameState>100){
            //     this.nextGameState = 104
            // }
        }
    }
    
    //protected createGameScene(): void {
    //    let gameScene = new FightScene();
    //    this.addChild(gameScene);    
    //}

    // private textfield: egret.TextField;
    // /**
    //  * 创建场景界面
    //  * Create scene interface
    //  */
    // protected createGameScene(): void {
    //     let sky = this.createBitmapByName("bg_jpg");
    //     this.addChild(sky);
    //     let stageW = this.stage.stageWidth;
    //     let stageH = this.stage.stageHeight;
    //     sky.width = stageW;
    //     sky.height = stageH;

    //     let topMask = new egret.Shape();
    //     topMask.graphics.beginFill(0x000000, 0.5);
    //     topMask.graphics.drawRect(0, 0, stageW, 172);
    //     topMask.graphics.endFill();
    //     topMask.y = 33;
    //     this.addChild(topMask);

    //     let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
    //     this.addChild(icon);
    //     icon.x = 26;
    //     icon.y = 33;

    //     let line = new egret.Shape();
    //     line.graphics.lineStyle(2, 0xffffff);
    //     line.graphics.moveTo(0, 0);
    //     line.graphics.lineTo(0, 117);
    //     line.graphics.endFill();
    //     line.x = 172;
    //     line.y = 61;
    //     this.addChild(line);


    //     let colorLabel = new egret.TextField();
    //     colorLabel.textColor = 0xffffff;
    //     colorLabel.width = stageW - 172;
    //     colorLabel.textAlign = "center";
    //     colorLabel.text = "Hello Egret";
    //     colorLabel.size = 24;
    //     colorLabel.x = 172;
    //     colorLabel.y = 80;
    //     this.addChild(colorLabel);

    //     let textfield = new egret.TextField();
    //     this.addChild(textfield);
    //     textfield.alpha = 0;
    //     textfield.width = stageW - 172;
    //     textfield.textAlign = egret.HorizontalAlign.CENTER;
    //     textfield.size = 24;
    //     textfield.textColor = 0xffffff;
    //     textfield.x = 172;
    //     textfield.y = 135;
    //     this.textfield = textfield;

    //     let button = new eui.Button();
    //     button.label = "Click!";
    //     button.horizontalCenter = 0;
    //     button.verticalCenter = 0;
    //     this.addChild(button);
    //     button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    // }
    // /**
    //  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    //  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    //  */
    // private createBitmapByName(name: string): egret.Bitmap {
    //     let result = new egret.Bitmap();
    //     let texture: egret.Texture = RES.getRes(name);
    //     result.texture = texture;
    //     return result;
    // }
    // /**
    //  * 描述文件加载成功，开始播放动画
    //  * Description file loading is successful, start to play the animation
    //  */
    // private startAnimation(result: Array<any>): void {
    //     let parser = new egret.HtmlTextParser();

    //     let textflowArr = result.map(text => parser.parse(text));
    //     let textfield = this.textfield;
    //     let count = -1;
    //     let change = () => {
    //         count++;
    //         if (count >= textflowArr.length) {
    //             count = 0;
    //         }
    //         let textFlow = textflowArr[count];

    //         // 切换描述内容
    //         // Switch to described content
    //         textfield.textFlow = textFlow;
    //         let tw = egret.Tween.get(textfield);
    //         tw.to({ "alpha": 1 }, 200);
    //         tw.wait(2000);
    //         tw.to({ "alpha": 0 }, 200);
    //         tw.call(change, this);
    //     };

    //     change();
    // }

    // /**
    //  * 点击按钮
    //  * Click the button
    //  */
    // private onButtonClick(e: egret.TouchEvent) {
    //     let panel = new eui.Panel();
    //     panel.title = "Title";
    //     panel.horizontalCenter = 0;
    //     panel.verticalCenter = 0;
    //     this.addChild(panel);
    // }
}
