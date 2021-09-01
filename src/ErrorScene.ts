class ErrorScene extends eui.Component{

    private gameState = -1;

    public constructor(){
        super();
        this.skinName = "resource/eui_skins/errorScene.exml";
        
    }

    public checkState(){
        return this.gameState
    }
}