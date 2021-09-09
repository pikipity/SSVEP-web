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
var flashButton = (function (_super) {
    __extends(flashButton, _super);
    function flashButton(flasgID, stopImage, flashImagePos, flashImageNeg, flashFreq, dispTimeStep) {
        var _this = _super.call(this) || this;
        _this.ID = flasgID;
        _this.imageStop = stopImage;
        _this.imagePos = flashImagePos;
        _this.imageNeg = flashImageNeg;
        _this.freq = flashFreq;
        _this.currentCount = 0;
        _this.currentFlag = 1;
        _this.dispFlag = dispTimeStep;
        _this.texture = RES.getRes(_this.imageStop);
        _this.timeStore = [];
        return _this;
    }
    flashButton.prototype.setDispFlag = function (dispFlag) {
        this.dispFlag = dispFlag;
    };
    flashButton.prototype.getFreq = function () {
        return this.freq;
    };
    flashButton.prototype.flashFun = function (timeStamp) {
        this.currentCount += 1;
        if (this.currentCount >= this.freq) {
            // disp time step
            if (this.dispFlag) {
                console.log(this.currentCount + ': ' + this.currentFlag);
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
            if (this.currentFlag > 0) {
                this.texture = RES.getRes(this.imagePos);
            }
            else {
                this.texture = RES.getRes(this.imageNeg);
            }
            this.currentFlag *= -1;
            return true;
        }
        else {
            return false;
        }
    };
    flashButton.prototype.flashInit = function () {
        this.currentFlag = 1;
        this.currentCount = 0;
        this.timeStore = [];
        if (this.dispFlag) {
            var now = egret.getTimer();
            this.timeStore.push(now);
        }
    };
    return flashButton;
}(egret.Bitmap));
__reflect(flashButton.prototype, "flashButton");
