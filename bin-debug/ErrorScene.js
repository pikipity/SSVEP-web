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
var ErrorScene = (function (_super) {
    __extends(ErrorScene, _super);
    function ErrorScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/errorScene.exml";
        return _this;
    }
    ErrorScene.prototype.checkState = function () {
        return this.gameState;
    };
    return ErrorScene;
}(eui.Component));
__reflect(ErrorScene.prototype, "ErrorScene");
