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
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dispFPS = true;
        _this.dispFPSNum = 30;
        _this.dispFPScurrentNum = -1;
        _this.PreTime = 0;
        _this.sumFPS = 0;
        _this.sumNum = 0;
        _this.FPSlabel = new egret.TextField();
        _this.feedbackStr = '';
        _this.idStr = '';
        _this.roomStr = '';
        _this.socket = io.connect('http://127.0.0.1:5000/');
        // private socket = new egret.WebSocket();
        // private connectFlag = false;
        // private onSocketOpen(){
        //     console.log('Connect OK');
        //     this.connectFlag=true;
        //     // const cmd = '{"name":"SSVEP_stim"}';
        //     // this.socket.writeUTF(cmd);
        // }
        // private onReceiveMessage(e:egret.Event){
        //     const msg = this.socket.readUTF();
        //     console.log('Receive '+msg);
        // }
        // private onSocketClose(){
        //     this.roomStr = 'None';
        //     this.idStr = 'None';
        //     this.connectFlag=false;
        //     console.log('Close');
        // }
        // private onSocketError(){
        //     console.log('Error');
        // }
        _this.currentGameState = -1;
        _this.nextGameState = 0;
        _this.trial = 1;
        return _this;
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
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()
                        //this.createGameScene();
                    ];
                    case 1:
                        _a.sent();
                        //this.createGameScene();
                        this.addEventListener(egret.Event.ENTER_FRAME, this.Game, this, false, 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        //
                        // this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
                        // this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
                        // this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
                        // this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
                        //this.socket.connect('127.0.0.1',5000)
                        //
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.Game = function () {
        if (this.dispFPS) {
            if (this.dispFPScurrentNum < 0) {
                //Init dsp display
                this.PreTime = egret.getTimer();
                this.FPSlabel.text = 'None';
                this.roomStr = 'None';
                this.idStr = 'None';
                this.FPSlabel.size = 20;
                this.dispFPScurrentNum = 0;
            }
            else {
                // Update fps and time
                var currentTime = egret.getTimer();
                this.sumFPS += 1000 / (currentTime - this.PreTime);
                this.sumNum++;
                this.PreTime = currentTime;
                // Update fps display
                this.dispFPScurrentNum++;
                if (this.dispFPScurrentNum > this.dispFPSNum) {
                    this.dispFPScurrentNum = 0;
                    this.FPSlabel.text = 'FPS: ' + Math.floor(this.sumFPS / this.sumNum * 100) / 100 + '\n' +
                        'ID: ' + this.idStr + '\n' +
                        'Room: ' + this.roomStr;
                    this.sumFPS = 0;
                    this.sumNum = 0;
                }
            }
        }
        if (this.nextGameState != this.currentGameState) {
            // remove old scene
            if (this.currentGameState != -1) {
                for (var i = 0; i < this.numChildren; i++) {
                    this.removeChildAt(i);
                }
            }
            // build new scene
            this.currentGameState = this.nextGameState;
            switch (this.currentGameState) {
                case 0: {
                    console.log('Start Scene');
                    this.feedbackStr = '';
                    this.trial = 1;
                    this.currentGameScene = new StartScene();
                    break;
                }
                case 1: {
                    console.log('Cue');
                    this.currentGameScene = new FightScene(1, this.trial, this.feedbackStr);
                    break;
                }
                case 2: {
                    console.log('Flash');
                    this.currentGameScene = new FightScene(2, this.trial, this.feedbackStr);
                    break;
                }
                case 3: {
                    console.log('Rest');
                    this.currentGameScene = new FightScene(3, this.trial, this.feedbackStr);
                    this.trial++;
                    break;
                }
                case 4: {
                    console.log('End');
                    this.currentGameScene = new EndScene();
                    break;
                }
                default: {
                    console.log('Error Build Game State !!');
                    this.currentGameScene = new ErrorScene();
                    break;
                }
            }
            this.addChild(this.currentGameScene);
            this.addChild(this.FPSlabel);
        }
        else {
            // check state
            if (this.currentGameScene.checkState() >= 0) {
                this.nextGameState = this.currentGameScene.checkState();
            }
        }
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
