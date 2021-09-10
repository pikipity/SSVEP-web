class ConnectBreakScene extends eui.Component{
    private returnbutton_comp: eui.Button
    
    private gameState = -1;

    public constructor(){
        super();
        this.skinName = "resource/eui_skins/ConnectBreak.exml";

        this.returnbutton_comp.touchEnabled = true;
        this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginState, this)
        
    }

    public checkState(){
        return this.gameState
    }

    private beginState(){
        this.gameState = 0;
    }
}