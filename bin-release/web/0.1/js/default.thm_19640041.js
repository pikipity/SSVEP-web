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
                generateEUI.skins = {"eui.fightScene":"resource/eui_skins/fightScene.exml","eui.downClock":"resource/eui_skins/downClock.exml","eui.errorScene":"resource/eui_skins/errorScene.exml","eui.startScene":"resource/eui_skins/startScene.exml","eui.startButton":"resource/eui_skins/startButton.exml","eui.EndScene":"resource/eui_skins/EndScene.exml"};generateEUI.paths['resource/eui_skins/downClock.exml'] = window.skins.downClock = (function (_super) {
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
})(eui.Skin);generateEUI.paths['resource/eui_skins/EndScene.exml'] = window.skins.EndScene = (function (_super) {
	__extends(EndScene, _super);
	function EndScene() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
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
		t.size = 50;
		t.text = "Rest";
		t.verticalCenter = 0;
		return t;
	};
	return EndScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/errorScene.exml'] = window.skins.errorScene = (function (_super) {
	__extends(errorScene, _super);
	function errorScene() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this._Label1_i()];
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
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 50;
		t.text = "Error";
		t.textColor = 0xFF0000;
		t.verticalCenter = 0;
		return t;
	};
	return errorScene;
})(eui.Skin);generateEUI.paths['resource/eui_skins/fightScene.exml'] = window.skins.fightScene = (function (_super) {
	__extends(fightScene, _super);
	function fightScene() {
		_super.call(this);
		this.skinParts = ["cue_12","flashButton12_area","cue_11","flashButton11_area","cue_10","flashButton10_area","cue_9","flashButton9_area","cue_8","flashButton8_area","cue_5","flashButton5_area","cue_6","flashButton6_area","cue_7","flashButton7_area","cue_1","flashButton1_area","cue_2","flashButton2_area","cue_3","flashButton3_area","cue_4","flashButton4_area","clock_area","trigger_area"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.flashButton12_area_i(),this.flashButton11_area_i(),this.flashButton10_area_i(),this.flashButton9_area_i(),this.flashButton8_area_i(),this.flashButton5_area_i(),this.flashButton6_area_i(),this.flashButton7_area_i(),this.flashButton1_area_i(),this.flashButton2_area_i(),this.flashButton3_area_i(),this.flashButton4_area_i(),this.clock_area_i(),this.trigger_area_i()];
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
		t.y = 760;
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
		t.y = 440;
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
		t.y = 120;
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
		t.y = 760;
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
		t.y = 440;
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
		t.y = 440;
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
		t.y = 760;
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
		t.y = 120;
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
		t.y = 120;
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
		t.y = 440;
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
		t.y = 760;
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
		t.y = 120;
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
		t.width = 100;
		t.x = 2.754;
		t.y = 3.558;
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
		t.text = "Start";
		t.verticalCenter = 0;
		return t;
	};
	return startButton;
})(eui.Skin);generateEUI.paths['resource/eui_skins/startScene.exml'] = window.skins.startScene = (function (_super) {
	__extends(startScene, _super);
	function startScene() {
		_super.call(this);
		this.skinParts = ["startbutton_comp"];
		
		this.height = 1080;
		this.width = 1920;
		this.elementsContent = [this._Rect1_i(),this.startbutton_comp_i()];
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
		t.bottom = 125;
		t.height = 100;
		t.horizontalCenter = 0;
		t.label = "Button";
		t.skinName = "skins.startButton";
		t.width = 200;
		return t;
	};
	return startScene;
})(eui.Skin);