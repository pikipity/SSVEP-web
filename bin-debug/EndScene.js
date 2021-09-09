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
var EndScene = (function (_super) {
    __extends(EndScene, _super);
    function EndScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/EndScene.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        return _this;
    }
    EndScene.prototype.checkState = function () {
        return this.gameState;
    };
    EndScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return EndScene;
}(eui.Component));
__reflect(EndScene.prototype, "EndScene");
