class WaitForControllerScene extends eui.Component{
    private room_text: eui.Label
    private returnbutton_comp: eui.Button
    
    private gameState = -1;

    public constructor(idStr,roomStr){
        super();
        this.skinName = "resource/eui_skins/WaitForController.exml";

        this.room_text.$setText('ID: '+idStr+'\n'+
                                'Room: '+roomStr+'\n\n'+
                                'Waiting for controller')

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