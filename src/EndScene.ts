class EndScene extends eui.Component{
    private returnbutton_comp: eui.Button
    private returnbutton_comp2: eui.Button

    private connect_flag;
    
    private gameState = -1;

    public constructor(connect_flag: boolean){
        super();
        this.connect_flag = connect_flag;
        this.skinName = "resource/eui_skins/EndScene.exml";

        this.returnbutton_comp.touchEnabled = true;
        this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginState, this)

        this.returnbutton_comp2.touchEnabled = true;
        this.returnbutton_comp2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.zeroState, this)
        
    }

    public checkState(){
        return this.gameState
    }

    private beginState(){
        //this.gameState = 0;
        if(this.connect_flag){
            this.gameState = 100;
        }else{
            this.gameState = 0;
        }
    }

    private zeroState(){
        this.gameState = 0;
    }
}