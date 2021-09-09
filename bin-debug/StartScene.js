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
var StartScene = (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/startScene.exml";
        _this.startbutton_comp.touchEnabled = true;
        _this.startbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        return _this;
    }
    StartScene.prototype.beginState = function () {
        this.gameState = 1;
    };
    StartScene.prototype.checkState = function () {
        return this.gameState;
    };
    return StartScene;
}(eui.Component));
__reflect(StartScene.prototype, "StartScene");
