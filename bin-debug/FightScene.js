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
var FightScene = (function (_super) {
    __extends(FightScene, _super);
    //state:
    //      1 -> cue
    //      2 -> flash
    //      3 -> rest
    function FightScene(state, trail, feedback_str) {
        var _this = _super.call(this) || this;
        _this.clock = new downClock();
        _this.freqList = [8, 9, 10, 11,
            8.4, 9.4, 10.4, 11.4,
            8.8, 9.8, 10.8, 11.8]; //[10,6,7.5,5,15]
        _this.phaseList = [0, Math.PI / 2, 0, Math.PI / 2,
            Math.PI / 2, 0, Math.PI / 2, 0,
            0, Math.PI / 2, 0, Math.PI / 2];
        _this.keyList = ["A", "B", "C", "D",
            "E", "F", "G", "H",
            "I", "J", "K", "L",
            "M", "N", "P", "Q"];
        _this.dispTrigger = -1;
        _this.gameState = -1;
        _this.currentGameState = state;
        _this.currentTrail = trail;
        _this.triggerFrameCount = 0;
        _this.skinName = "resource/eui_skins/fightScene.exml";
        _this.flashList = [];
        _this.flashAreaList = [_this.flashButton1_area,
            _this.flashButton4_area,
            _this.flashButton7_area,
            _this.flashButton10_area,
            _this.flashButton2_area,
            _this.flashButton5_area,
            _this.flashButton8_area,
            _this.flashButton11_area,
            _this.flashButton3_area,
            _this.flashButton6_area,
            _this.flashButton9_area,
            _this.flashButton12_area];
        _this.cueList = [_this.cue_1,
            _this.cue_4,
            _this.cue_7,
            _this.cue_10,
            _this.cue_2,
            _this.cue_5,
            _this.cue_8,
            _this.cue_11,
            _this.cue_3,
            _this.cue_6,
            _this.cue_9,
            _this.cue_12];
        _this.backbutton_comp.touchEnabled = true;
        _this.backbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        // add feedback text
        if (feedback_str.length > 60) {
            feedback_str = feedback_str.slice(-60);
        }
        _this.feedback_text_67.$setText(feedback_str);
        // add clock
        _this.clock.width = _this.clock_area.width;
        _this.clock.height = _this.clock_area.height;
        _this.clock_area.addChild(_this.clock);
        //init clock
        if (state == 1 || state == 3) {
            _this.clock.init_clock(0);
        }
        else {
            _this.clock.init_clock(5);
        }
        // add flash button
        for (var i = 0; i < _this.flashAreaList.length; i++) {
            var newFlashButton = new flashButton_sine(i, "black_color_jpg", "white_color_jpg", "black_color_jpg", _this.freqList[i], _this.phaseList[i]);
            newFlashButton.width = _this.flashAreaList[i].width;
            newFlashButton.height = _this.flashAreaList[i].height;
            _this.flashList.push(newFlashButton);
        }
        // init flash
        _this.initFlash();
        if (state == 1) {
            for (var i = 0; i < _this.flashList.length; i++) {
                if (i == (trail - 1)) {
                    _this.flashList[trail - 1].positiveFlash();
                }
                else {
                    _this.flashList[i].flashStop();
                }
            }
        }
        else if (state == 3) {
            for (var i = 0; i < _this.flashList.length; i++) {
                _this.flashList[i].flashStop();
            }
        }
        // add trigger
        _this.triggerDisp = new flashButton_sine(100, "black_color_jpg", "white_color_jpg", "black_color_jpg", 0, 0);
        _this.triggerDisp.width = _this.trigger_area.width;
        _this.triggerDisp.height = _this.trigger_area.height;
        _this.trigger_area.addChild(_this.triggerDisp);
        _this.triggerDisp.flashStop();
        //init cue
        if (state == 1) {
            for (var i = 0; i < _this.cueList.length; i++) {
                _this.cueList[i].textColor = 0xFF0000;
                if (i == (trail - 1)) {
                    _this.cueList[i].$setText('+');
                }
                else {
                    _this.cueList[i].$setText('');
                }
            }
        }
        else if (state == 2) {
            for (var i = 0; i < _this.cueList.length; i++) {
                _this.cueList[i].textColor = 0xFFFFFF;
                _this.cueList[i].$setText(_this.keyList[i]);
            }
        }
        else {
            for (var i = 0; i < _this.cueList.length; i++) {
                _this.cueList[i].$setText('');
            }
        }
        // start flash
        if (state == 2) {
            _this.startFlash();
        }
        else {
            _this.startCount();
        }
        return _this;
    }
    FightScene.prototype.initFlash = function () {
        // disp flash freq
        var dispActualFreq = 'Actrual Freq: ';
        for (var i = 0; i < this.flashList.length; i++) {
            dispActualFreq += this.flashList[i].getFreq() * 1000.0 / (2 * Math.PI) + ', '; //2*Math.PI*flashFreq/1000.0
        }
        console.log(dispActualFreq);
        // add stimuli to area
        for (var i = 0; i < this.flashList.length; i++) {
            // add positive image
            this.flashAreaList[i].addChildAt(this.flashList[i], 0);
            this.flashList[i].flashInit();
            // add negative image
            var backgroundImag = new egret.Bitmap();
            backgroundImag.texture = RES.getRes(this.flashList[i].getNeg());
            backgroundImag.width = this.flashAreaList[i].width;
            backgroundImag.height = this.flashAreaList[i].height;
            this.flashAreaList[i].addChildAt(backgroundImag, 0);
        }
    };
    FightScene.prototype.startFlash = function () {
        this.dispTrigger = 1;
        //start flash event
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this, false, 999);
        //start clock
        this.clock.start_clock();
    };
    FightScene.prototype.startCount = function () {
        this.dispTrigger = 1;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameCount, this, false, 999);
        this.clock.start_clock();
    };
    FightScene.prototype.stopFlash = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        for (var i = 0; i < this.flashList.length; i++) {
            this.flashList[i].flashStop();
        }
    };
    FightScene.prototype.onEnterFrameCount = function (e) {
        if (this.dispTrigger >= 0) {
            if (this.dispTrigger > 0) {
                this.triggerDisp.positiveFlash();
                if (this.triggerFrameCount < 6) {
                    this.triggerFrameCount++;
                }
                else {
                    this.dispTrigger = 0;
                    this.triggerFrameCount = 0;
                }
            }
            else if (this.dispTrigger == 0) {
                this.triggerDisp.flashStop();
                this.dispTrigger = -1;
            }
        }
        // check clock
        if (this.clock.get_current_time() <= 0) {
            this.clock.stop_clock();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameCount, this);
            for (var i = 0; i < this.flashList.length; i++) {
                this.flashList[i].flashStop();
            }
            if (this.currentGameState == 1) {
                this.gameState = 2; // -> flash
            }
            else if (this.currentGameState == 3) {
                if (this.currentTrail < this.flashList.length) {
                    this.gameState = 1; // -> cue
                }
                else {
                    this.gameState = 4; // -> end
                }
            }
            else {
                this.gameState = 99; // -> error
            }
        }
    };
    FightScene.prototype.onEnterFrame = function (e) {
        if (this.dispTrigger >= 0) {
            if (this.dispTrigger > 0) {
                this.triggerDisp.positiveFlash();
                if (this.triggerFrameCount < 6) {
                    this.triggerFrameCount++;
                }
                else {
                    this.dispTrigger = 0;
                    this.triggerFrameCount = 0;
                }
            }
            else if (this.dispTrigger == 0) {
                this.triggerDisp.flashStop();
                this.dispTrigger = -1;
            }
        }
        // change alpha of positive image
        for (var i = 0; i < this.flashList.length; i++) {
            this.flashList[i].flashFun();
        }
        // check clock
        if (this.clock.get_current_time() <= 0) {
            this.clock.stop_clock();
            this.stopFlash();
            this.gameState = 3; // -> rest
            //this.clock.init_clock(5);
            //this.clock.start_clock();
        }
    };
    FightScene.prototype.checkState = function () {
        return this.gameState;
    };
    FightScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return FightScene;
}(eui.Component));
__reflect(FightScene.prototype, "FightScene");
