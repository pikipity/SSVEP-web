class EndScene extends eui.Component{

    private gameState = -1;

    public constructor(){
        super();
        this.skinName = "resource/eui_skins/EndScene.exml";
        
    }

    public checkState(){
        return this.gameState
    }
}