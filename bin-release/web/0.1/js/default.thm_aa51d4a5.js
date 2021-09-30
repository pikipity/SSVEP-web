window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.fightScene":"resource/eui_skins/fightScene.exml","eui.downClock":"resource/eui_skins/downClock.exml","eui.errorScene":"resource/eui_skins/errorScene.exml","eui.startScene":"resource/eui_skins/startScene.exml","eui.startButton":"resource/eui_skins/startButton.exml","eui.returnButton":"resource/eui_skins/returnButton.exml","eui.EndScene":"resource/eui_skins/EndScene.exml","eui.backButton":"resource/eui_skins/backButton.exml"};generateEUI.paths['resource/eui_skins/AutoCreateRoomButton.exml'] = window.skins.AutoCreateRoomButton = (function (_super) {
	__extends(AutoCreateRoomButton, _super);
	function AutoCreateRoomButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 200;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
	}
	var _proto = AutoCreateRoomButton.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFF0000;
		t.height = 100;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Auto Create New Room";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 126;
		return t;
	};
	return AutoCreateRoomButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/backButton.exml'] = window.skins.backButton = (function (_super) {
	__extends(backButton, _super);
	function backButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 50;
		this.width = 50;
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = backButton.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 50;
		t.source = "return_bound_png";
		t.width = 50;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return backButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ConnectBreak.exml'] = window.skins.ConnectBreak = (function (_super) {
	__extends(ConnectBreak, _super);
	function ConnectBreak() {
		_super.call(this);
		this.skinParts = ["returnbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Label1_i(),this.returnbutton_comp_i()];
	}
	var _proto = ConnectBreak.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Connection Break";
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.label = "Button";
		t.right = 0;
		t.skinName = "skins.backButton";
		t.top = 0;
		return t;
	};
	return ConnectBreak;
})(eui.Skin);generateEUI.paths['resource/eui_skins/Connecting.exml'] = window.skins.Connecting = (function (_super) {
	__extends(Connecting, _super);
	function Connecting() {
		_super.call(this);
		this.skinParts = ["returnbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Label1_i(),this.returnbutton_comp_i()];
	}
	var _proto = Connecting.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Connecting";
		t.verticalCenter = 0;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.height = 50;
		t.label = "Button";
		t.right = 0;
		t.skinName = "skins.backButton";
		t.top = 0;
		t.width = 50;
		return t;
	};
	return Connecting;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ConnectServerButton.exml'] = window.skins.ConnectServerButton = (function (_super) {
	__extends(ConnectServerButton, _super);
	function ConnectServerButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 200;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
	}
	var _proto = ConnectServerButton.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFF0000;
		t.height = 100;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Connect to Server";
		t.verticalCenter = 0;
		return t;
	};
	return ConnectServerButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/downClock.exml'] = window.skins.downClock = (function (_super) {
	__extends(downClock, _super);
	function downClock() {
		_super.call(this);
		this.skinParts = ["clock_text"];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this.clock_text_i()];
	}
	var _proto = downClock.prototype;

	_proto.clock_text_i = function () {
		var t = new eui.Label();
		this.clock_text = t;
		t.bold = true;
		t.height = 100;
		t.size = 15;
		t.text = "Your Turn";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return downClock;
})(eui.Skin);generateEUI.paths['resource/eui_skins/returnButton.exml'] = window.skins.returnButton = (function (_super) {
	__extends(returnButton, _super);
	function returnButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 200;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
	}
	var _proto = returnButton.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFF0000;
		t.height = 100;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.text = "Next Block";
		t.verticalCenter = 0;
		return t;
	};
	return returnButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/EndScene.exml'] = window.skins.EndScene = (function (_super) {
	__extends(EndScene, _super);
	function EndScene() {
		_super.call(this);
		this.skinParts = ["returnbutton_comp","returnbutton_comp2"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Label1_i(),this.returnbutton_comp_i(),this.returnbutton_comp2_i()];
	}
	var _proto = EndScene.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Rest";
		t.textAlign = "center";
		t.verticalCenter = 0;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.bottom = 125;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.skinName = "skins.returnButton";
		return t;
	};
	_proto.returnbutton_comp2_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp2 = t;
		t.label = "Button";
		t.right = 1;
		t.skinName = "skins.backButton";
		t.top = 1;
		return t;
	};
	return EndScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/UseEnterRoomNumButton.exml'] = window.skins.UseEnterRoomNumButton = (function (_super) {
	__extends(UseEnterRoomNumButton, _super);
	function UseEnterRoomNumButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 200;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
	}
	var _proto = UseEnterRoomNumButton.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFF0000;
		t.height = 100;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Use Enter Room";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 184;
		return t;
	};
	return UseEnterRoomNumButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/enterRoomNumber.exml'] = window.skins.enterRoomNumber = (function (_super) {
	__extends(enterRoomNumber, _super);
	function enterRoomNumber() {
		_super.call(this);
		this.skinParts = ["roomNum_entry","autoCreateButton","useEnterButton","returnbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Label1_i(),this._Rect2_i(),this.roomNum_entry_i(),this.autoCreateButton_i(),this.useEnterButton_i(),this.returnbutton_comp_i()];
	}
	var _proto = enterRoomNumber.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Enter Room Number";
		t.textAlign = "center";
		t.y = 261.099;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFFFFFF;
		t.height = 83;
		t.horizontalCenter = 0;
		t.width = 811;
		t.y = 391.956;
		return t;
	};
	_proto.roomNum_entry_i = function () {
		var t = new eui.EditableText();
		this.roomNum_entry = t;
		t.height = 83;
		t.horizontalCenter = "0";
		t.size = 60;
		t.textAlign = "left";
		t.textColor = 0x000000;
		t.verticalAlign = "middle";
		t.width = 811;
		t.y = 391.956;
		return t;
	};
	_proto.autoCreateButton_i = function () {
		var t = new eui.Button();
		this.autoCreateButton = t;
		t.label = "Button";
		t.skinName = "skins.AutoCreateRoomButton";
		t.x = 671.238;
		t.y = 565;
		return t;
	};
	_proto.useEnterButton_i = function () {
		var t = new eui.Button();
		this.useEnterButton = t;
		t.label = "Button";
		t.skinName = "skins.UseEnterRoomNumButton";
		t.x = 1017.302;
		t.y = 565;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.label = "Button";
		t.right = 1;
		t.skinName = "skins.backButton";
		t.top = 1;
		return t;
	};
	return enterRoomNumber;
})(eui.Skin);generateEUI.paths['resource/eui_skins/errorScene.exml'] = window.skins.errorScene = (function (_super) {
	__extends(errorScene, _super);
	function errorScene() {
		_super.call(this);
		this.skinParts = ["error_label","returnbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.error_label_i(),this.returnbutton_comp_i()];
	}
	var _proto = errorScene.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.error_label_i = function () {
		var t = new eui.Label();
		this.error_label = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Error Game State";
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.label = "Button";
		t.right = 1;
		t.skinName = "skins.backButton";
		t.top = 1;
		return t;
	};
	return errorScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/fightScene.exml'] = window.skins.fightScene = (function (_super) {
	__extends(fightScene, _super);
	function fightScene() {
		_super.call(this);
		this.skinParts = ["cue_12","flashButton12_area","cue_11","flashButton11_area","cue_10","flashButton10_area","cue_9","flashButton9_area","cue_8","flashButton8_area","cue_5","flashButton5_area","cue_6","flashButton6_area","cue_7","flashButton7_area","cue_1","flashButton1_area","cue_2","flashButton2_area","cue_3","flashButton3_area","cue_4","flashButton4_area","clock_area","trigger_area","feedback_text_67","backbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.flashButton12_area_i(),this.flashButton11_area_i(),this.flashButton10_area_i(),this.flashButton9_area_i(),this.flashButton8_area_i(),this.flashButton5_area_i(),this.flashButton6_area_i(),this.flashButton7_area_i(),this.flashButton1_area_i(),this.flashButton2_area_i(),this.flashButton3_area_i(),this.flashButton4_area_i(),this.clock_area_i(),this.trigger_area_i(),this._Rect2_i(),this.feedback_text_67_i(),this.backbutton_comp_i()];
	}
	var _proto = fightScene.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.flashButton12_area_i = function () {
		var t = new eui.Group();
		this.flashButton12_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 1480;
		t.y = 798.126;
		t.elementsContent = [this.cue_12_i()];
		return t;
	};
	_proto.cue_12_i = function () {
		var t = new eui.Label();
		this.cue_12 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton11_area_i = function () {
		var t = new eui.Group();
		this.flashButton11_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 1480;
		t.y = 478.126;
		t.elementsContent = [this.cue_11_i()];
		return t;
	};
	_proto.cue_11_i = function () {
		var t = new eui.Label();
		this.cue_11 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton10_area_i = function () {
		var t = new eui.Group();
		this.flashButton10_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 1480;
		t.y = 158.126;
		t.elementsContent = [this.cue_10_i()];
		return t;
	};
	_proto.cue_10_i = function () {
		var t = new eui.Label();
		this.cue_10 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton9_area_i = function () {
		var t = new eui.Group();
		this.flashButton9_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 1060;
		t.y = 798.126;
		t.elementsContent = [this.cue_9_i()];
		return t;
	};
	_proto.cue_9_i = function () {
		var t = new eui.Label();
		this.cue_9 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton8_area_i = function () {
		var t = new eui.Group();
		this.flashButton8_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 1060;
		t.y = 478.126;
		t.elementsContent = [this.cue_8_i()];
		return t;
	};
	_proto.cue_8_i = function () {
		var t = new eui.Label();
		this.cue_8 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton5_area_i = function () {
		var t = new eui.Group();
		this.flashButton5_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 640;
		t.y = 478.126;
		t.elementsContent = [this.cue_5_i()];
		return t;
	};
	_proto.cue_5_i = function () {
		var t = new eui.Label();
		this.cue_5 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton6_area_i = function () {
		var t = new eui.Group();
		this.flashButton6_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 640;
		t.y = 798.126;
		t.elementsContent = [this.cue_6_i()];
		return t;
	};
	_proto.cue_6_i = function () {
		var t = new eui.Label();
		this.cue_6 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton7_area_i = function () {
		var t = new eui.Group();
		this.flashButton7_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 1060;
		t.y = 158.126;
		t.elementsContent = [this.cue_7_i()];
		return t;
	};
	_proto.cue_7_i = function () {
		var t = new eui.Label();
		this.cue_7 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton1_area_i = function () {
		var t = new eui.Group();
		this.flashButton1_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 220;
		t.y = 158.126;
		t.elementsContent = [this.cue_1_i()];
		return t;
	};
	_proto.cue_1_i = function () {
		var t = new eui.Label();
		this.cue_1 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton2_area_i = function () {
		var t = new eui.Group();
		this.flashButton2_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 220;
		t.y = 478.126;
		t.elementsContent = [this.cue_2_i()];
		return t;
	};
	_proto.cue_2_i = function () {
		var t = new eui.Label();
		this.cue_2 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton3_area_i = function () {
		var t = new eui.Group();
		this.flashButton3_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 220;
		t.y = 798.126;
		t.elementsContent = [this.cue_3_i()];
		return t;
	};
	_proto.cue_3_i = function () {
		var t = new eui.Label();
		this.cue_3 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.flashButton4_area_i = function () {
		var t = new eui.Group();
		this.flashButton4_area = t;
		t.height = 200;
		t.width = 200;
		t.x = 640;
		t.y = 158.126;
		t.elementsContent = [this.cue_4_i()];
		return t;
	};
	_proto.cue_4_i = function () {
		var t = new eui.Label();
		this.cue_4 = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	_proto.clock_area_i = function () {
		var t = new eui.Group();
		this.clock_area = t;
		t.height = 100;
		t.left = 0;
		t.top = 0;
		t.width = 100;
		return t;
	};
	_proto.trigger_area_i = function () {
		var t = new eui.Group();
		this.trigger_area = t;
		t.bottom = 1;
		t.height = 100;
		t.left = 1;
		t.width = 100;
		return t;
	};
	_proto._Rect2_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFFFFFF;
		t.height = 50;
		t.horizontalCenter = 0;
		t.top = 30;
		t.width = 1460;
		return t;
	};
	_proto.feedback_text_67_i = function () {
		var t = new eui.Label();
		this.feedback_text_67 = t;
		t.height = 50;
		t.horizontalCenter = 0;
		t.textAlign = "left";
		t.textColor = 0x000000;
		t.top = 30;
		t.verticalAlign = "middle";
		t.width = 1460;
		return t;
	};
	_proto.backbutton_comp_i = function () {
		var t = new eui.Button();
		this.backbutton_comp = t;
		t.height = 50;
		t.label = "Button";
		t.right = 1;
		t.skinName = "skins.backButton";
		t.top = 1;
		t.width = 50;
		return t;
	};
	return fightScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/startButton.exml'] = window.skins.startButton = (function (_super) {
	__extends(startButton, _super);
	function startButton() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 100;
		this.width = 200;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
	}
	var _proto = startButton.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xFF0000;
		t.height = 100;
		t.width = 200;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Start offline session";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 184;
		return t;
	};
	return startButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/startScene.exml'] = window.skins.startScene = (function (_super) {
	__extends(startScene, _super);
	function startScene() {
		_super.call(this);
		this.skinParts = ["startbutton_comp","ConnectServerButton"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.startbutton_comp_i(),this._Label1_i(),this.ConnectServerButton_i()];
	}
	var _proto = startScene.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.startbutton_comp_i = function () {
		var t = new eui.Button();
		this.startbutton_comp = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.skinName = "skins.startButton";
		t.width = 200;
		t.y = 855;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0.5;
		t.size = 60;
		t.text = "SSVEP";
		t.textAlign = "center";
		t.verticalCenter = -168;
		return t;
	};
	_proto.ConnectServerButton_i = function () {
		var t = new eui.Button();
		this.ConnectServerButton = t;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.skinName = "skins.ConnectServerButton";
		t.y = 701.48;
		return t;
	};
	return startScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/WaitForController.exml'] = window.skins.WaitForController = (function (_super) {
	__extends(WaitForController, _super);
	function WaitForController() {
		_super.call(this);
		this.skinParts = ["room_text","returnbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.room_text_i(),this.returnbutton_comp_i()];
	}
	var _proto = WaitForController.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.room_text_i = function () {
		var t = new eui.Label();
		this.room_text = t;
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "Room: ";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.width = 769.363;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.label = "Button";
		t.right = 0;
		t.skinName = "skins.backButton";
		t.top = 0;
		return t;
	};
	return WaitForController;
})(eui.Skin);generateEUI.paths['resource/eui_skins/WaitForStart.exml'] = window.skins.WaitForStart = (function (_super) {
	__extends(WaitForStart, _super);
	function WaitForStart() {
		_super.call(this);
		this.skinParts = ["returnbutton_comp","wait_start_text"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.returnbutton_comp_i(),this.wait_start_text_i()];
	}
	var _proto = WaitForStart.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.height = 1080;
		t.width = 1920;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.returnbutton_comp_i = function () {
		var t = new eui.Button();
		this.returnbutton_comp = t;
		t.label = "Button";
		t.right = 0;
		t.skinName = "skins.backButton";
		t.top = 0;
		return t;
	};
	_proto.wait_start_text_i = function () {
		var t = new eui.Label();
		this.wait_start_text = t;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Waiting for Start";
		t.verticalCenter = 0;
		return t;
	};
	return WaitForStart;
})(eui.Skin);