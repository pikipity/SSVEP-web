class ErrorScene extends eui.Component{
    private returnbutton_comp: eui.Button
    private error_label: eui.Label

    private gameState = -1;

    public constructor(errorStr){
        super();
        this.skinName = "resource/eui_skins/errorScene.exml";

        this.returnbutton_comp.touchEnabled = true;
        this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginState, this)

        this.error_label.$setText(errorStr)
        
    }

    public checkState(){
        return this.gameState
    }

    private beginState(){
        this.gameState = 0;
    }
}