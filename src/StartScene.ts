class StartScene extends eui.Component{
    private startbutton_comp: eui.Button
    private ConnectServerButton: eui.Button

    private gameState = -1;

    public constructor(){
        super();
        this.skinName = "resource/eui_skins/startScene.exml";

        this.startbutton_comp.touchEnabled = true;
        this.startbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginState, this)

        this.ConnectServerButton.touchEnabled = true;
        this.ConnectServerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.connectServerFun, this)
        
    }

    private beginState(){
        this.gameState = 1;
    }

    public checkState(){
        return this.gameState
    }

    private connectServerFun(){
        this.gameState = 5;//100;
    }
}