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
var flashButton_sine = (function (_super) {
    __extends(flashButton_sine, _super);
    function flashButton_sine(flasgID, stopImage, flashImagePos, flashImageNeg, flashFreq, flashTheta) {
        var _this = _super.call(this) || this;
        _this.ID = flasgID;
        _this.imageStop = stopImage;
        _this.imagePos = flashImagePos;
        _this.imageNeg = flashImageNeg;
        _this.freq = 2 * Math.PI * flashFreq / 1000.0;
        _this.theta = flashTheta;
        _this.start_time = -100;
        _this.texture = RES.getRes(_this.imageStop);
        _this.flash_flag = false;
        return _this;
    }
    flashButton_sine.prototype.getID = function () {
        return this.ID;
    };
    flashButton_sine.prototype.getFreq = function () {
        return this.freq;
    };
    flashButton_sine.prototype.getNeg = function () {
        return this.imageNeg;
    };
    flashButton_sine.prototype.getFlashFlag = function () {
        return this.flash_flag;
    };
    flashButton_sine.prototype.flashInit = function () {
        this.texture = RES.getRes(this.imagePos);
        this.alpha = 0.5 + 0.5 * Math.sin(this.freq * 0 + this.theta);
        this.start_time = -100;
        this.flash_flag = true;
    };
    flashButton_sine.prototype.flashFun = function () {
        if (this.flash_flag) {
            if (this.start_time < 0) {
                this.start_time = egret.getTimer();
            }
            this.alpha = 0.5 + 0.5 * Math.sin(this.freq * (egret.getTimer() - this.start_time) + this.theta);
        }
    };
    flashButton_sine.prototype.flashStop = function () {
        this.texture = RES.getRes(this.imageStop);
        this.alpha = 1;
        this.flash_flag = false;
    };
    flashButton_sine.prototype.positiveFlash = function () {
        this.texture = RES.getRes(this.imagePos);
        this.alpha = 1;
        this.flash_flag = false;
    };
    return flashButton_sine;
}(egret.Bitmap));
__reflect(flashButton_sine.prototype, "flashButton_sine");
