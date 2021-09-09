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
var downClock = (function (_super) {
    __extends(downClock, _super);
    function downClock() {
        var _this = _super.call(this) || this;
        _this.current_time = 0;
        //init timer
        _this.timer = new egret.Timer(0.01 * 1000, 0);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this.timer.stop();
        return _this;
    }
    downClock.prototype.init_clock = function (total_time) {
        this.current_disp = total_time;
        this.current_time = 0;
        this.start_time = -100;
    };
    downClock.prototype.start_clock = function () {
        this.timer.reset();
        this.timer.start();
    };
    downClock.prototype.stop_clock = function () {
        this.timer.stop();
        this.timer.reset();
    };
    downClock.prototype.get_current_time = function () {
        return this.current_disp + (1 - this.current_time / 1000);
    };
    downClock.prototype.timerFunc = function () {
        if (this.start_time < 0) {
            this.start_time = egret.getTimer();
        }
        this.current_time = egret.getTimer() - this.start_time;
        if (this.current_time > 1000) {
            this.current_time = 0;
            this.start_time = egret.getTimer();
            this.current_disp -= 1;
        }
        if (this.current_disp < 0) {
            this.timer.stop();
        }
    };
    return downClock;
}(eui.Component));
__reflect(downClock.prototype, "downClock");
