class enterRoomNumberScene extends eui.Component{
    private returnbutton_comp: eui.Button
    private autoCreateButton: eui.Button
    private useEnterButton: eui.Button
    private roomNum_entry: eui.EditableText
    
    private gameState = -1;

    private roomStr = ''

    private enterRoomFlag = false

    public constructor(){
        super();
        this.skinName = "resource/eui_skins/enterRoomNumber.exml";

        this.returnbutton_comp.touchEnabled = true
        this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.beginState, this)
        
        this.autoCreateButton.touchEnabled = true
        this.autoCreateButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoCreateFun, this)

        this.useEnterButton.touchEnabled = true
        this.useEnterButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.useEnterRoom, this)
    }

    public checkState(){
        return this.gameState
    }

    private beginState(){
        this.gameState=0
    }

    private autoCreateFun(){
        console.log('auto create room')
        this.gameState=100
    }

    private useEnterRoom(){
        console.log('Enter room: '+this.roomNum_entry.text)
        this.roomStr = this.roomNum_entry.text
        this.enterRoomFlag = true
        this.gameState=100
    }

    public getRoom(){
        return this.roomStr
    }

    public getRoomFlag(){
        return this.enterRoomFlag
    }
}