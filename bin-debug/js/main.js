

var extendStatics = Object.setPrototypeOf ||
({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

var __extends = function (d, b) {
extendStatics(d, b);
function __() { this.constructor = d; }
d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var __assign = Object.assign || function (t) {
for (var s, i = 1, n = arguments.length; i < n; i++) {
    s = arguments[i];
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
}
return t;
};

var __rest = function (s, e) {
var t = {};
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
            t[p[i]] = s[p[i]];
    }
return t;
};

var __decorate = function (decorators, target, key, desc) {
var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = function (paramIndex, decorator) {
return function (target, key) { decorator(target, key, paramIndex); }
};

var __metadata = function (metadataKey, metadataValue) {
if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
};

var __awaiter = function (thisArg, _arguments, P, generator) {
function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
    function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
    function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
});
};

var __generator = function (thisArg, body) {
var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
function verb(n) { return function (v) { return step([n, v]); }; }
function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
            case 0: case 1: t = op; break;
            case 4: _.label++; return { value: op[1], done: false };
            case 5: _.label++; y = op[1]; op = [0]; continue;
            case 7: op = _.ops.pop(); _.trys.pop(); continue;
            default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                if (t[2]) _.ops.pop();
                _.trys.pop(); continue;
        }
        op = body.call(thisArg, _);
    } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
}
};

var __exportStar = function(m, exports) {
for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};

var __createBinding = Object.create ? (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
if (k2 === undefined) k2 = k;
o[k2] = m[k];
});

var __values = function (o) {
var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
if (m) return m.call(o);
if (o && typeof o.length === "number") return {
    next: function () {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
    }
};
throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};

var __read = function (o, n) {
var m = typeof Symbol === "function" && o[Symbol.iterator];
if (!m) return o;
var i = m.call(o), r, ar = [], e;
try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
}
catch (error) { e = { error: error }; }
finally {
    try {
        if (r && !r.done && (m = i["return"])) m.call(i);
    }
    finally { if (e) throw e.error; }
}
return ar;
};

var __spread = function () {
for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
return ar;
};

var __spreadArrays = function () {
for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
return r;
};

var __await = function (v) {
return this instanceof __await ? (this.v = v, this) : new __await(v);
};

var __asyncGenerator = function (thisArg, _arguments, generator) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var g = generator.apply(thisArg, _arguments || []), i, q = [];
return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
function fulfill(value) { resume("next", value); }
function reject(value) { resume("throw", value); }
function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};

var __asyncDelegator = function (o) {
var i, p;
return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};

var __asyncValues = function (o) {
if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
var m = o[Symbol.asyncIterator], i;
return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};

var __makeTemplateObject = function (cooked, raw) {
if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
o["default"] = v;
};

var __importStar = function (mod) {
if (mod && mod.__esModule) return mod;
var result = {};
if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
__setModuleDefault(result, mod);
return result;
};

var __importDefault = function (mod) {
return (mod && mod.__esModule) ? mod : { "default": mod };
};

var __classPrivateFieldGet = function (receiver, privateMap) {
if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
}
return privateMap.get(receiver);
};

var __classPrivateFieldSet = function (receiver, privateMap, value) {
if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
}
privateMap.set(receiver, value);
return value;
};

var __reflect = function(p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AssetAdapter.ts":
/***/ (function(module, exports) {

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = /** @class */ (function () {
    function AssetAdapter() {
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例：callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
window["AssetAdapter"] = AssetAdapter;
__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]); 


/***/ }),

/***/ "./src/ConnectBreakScene.ts":
/***/ (function(module, exports) {

var ConnectBreakScene = /** @class */ (function (_super) {
    __extends(ConnectBreakScene, _super);
    function ConnectBreakScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/ConnectBreak.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        return _this;
    }
    ConnectBreakScene.prototype.checkState = function () {
        return this.gameState;
    };
    ConnectBreakScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return ConnectBreakScene;
}(eui.Component));
window["ConnectBreakScene"] = ConnectBreakScene;
__reflect(ConnectBreakScene.prototype,"ConnectBreakScene",[]); 


/***/ }),

/***/ "./src/ConnectingScene.ts":
/***/ (function(module, exports) {

var ConnectingScene = /** @class */ (function (_super) {
    __extends(ConnectingScene, _super);
    function ConnectingScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/Connecting.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        return _this;
    }
    ConnectingScene.prototype.checkState = function () {
        return this.gameState;
    };
    ConnectingScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return ConnectingScene;
}(eui.Component));
window["ConnectingScene"] = ConnectingScene;
__reflect(ConnectingScene.prototype,"ConnectingScene",[]); 


/***/ }),

/***/ "./src/EndScene.ts":
/***/ (function(module, exports) {

var EndScene = /** @class */ (function (_super) {
    __extends(EndScene, _super);
    function EndScene(connect_flag) {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.connect_flag = connect_flag;
        _this.skinName = "resource/eui_skins/EndScene.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        _this.returnbutton_comp2.touchEnabled = true;
        _this.returnbutton_comp2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.zeroState, _this);
        return _this;
    }
    EndScene.prototype.checkState = function () {
        return this.gameState;
    };
    EndScene.prototype.beginState = function () {
        //this.gameState = 0;
        if (this.connect_flag) {
            this.gameState = 100;
        }
        else {
            this.gameState = 0;
        }
    };
    EndScene.prototype.zeroState = function () {
        this.gameState = 0;
    };
    return EndScene;
}(eui.Component));
window["EndScene"] = EndScene;
__reflect(EndScene.prototype,"EndScene",[]); 


/***/ }),

/***/ "./src/ErrorScene.ts":
/***/ (function(module, exports) {

var ErrorScene = /** @class */ (function (_super) {
    __extends(ErrorScene, _super);
    function ErrorScene(errorStr) {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/errorScene.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        _this.error_label.$setText(errorStr);
        return _this;
    }
    ErrorScene.prototype.checkState = function () {
        return this.gameState;
    };
    ErrorScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return ErrorScene;
}(eui.Component));
window["ErrorScene"] = ErrorScene;
__reflect(ErrorScene.prototype,"ErrorScene",[]); 


/***/ }),

/***/ "./src/FightScene.ts":
/***/ (function(module, exports) {

var FightScene = /** @class */ (function (_super) {
    __extends(FightScene, _super);
    //state:
    //      1 -> cue
    //      2 -> flash
    //      3 -> rest
    function FightScene(state, trail, feedback_str, connect_flag) {
        var _this = _super.call(this) || this;
        _this.clock = new downClock();
        _this.freqList = [8, 9, 10, 11,
            8.4, 9.4, 10.4, 11.4,
            8.8, 9.8, 10.8, 11.8]; //[10,6,7.5,5,15]
        _this.phaseList = [0, Math.PI / 2, 0, Math.PI / 2,
            Math.PI / 2, 0, Math.PI / 2, 0,
            0, Math.PI / 2, 0, Math.PI / 2];
        _this.keyList = ["A", "B", "C", "D",
            "E", "F", "G", "H",
            "I", "J", "K", "L",
            "M", "N", "P", "Q"];
        _this.dispTrigger = -1;
        _this.gameState = -1;
        _this.connect_flag = connect_flag;
        _this.currentGameState = state;
        _this.currentTrail = trail;
        _this.triggerFrameCount = 0;
        _this.skinName = "resource/eui_skins/fightScene.exml";
        _this.flashList = [];
        _this.flashAreaList = [_this.flashButton1_area,
            _this.flashButton4_area,
            _this.flashButton7_area,
            _this.flashButton10_area,
            _this.flashButton2_area,
            _this.flashButton5_area,
            _this.flashButton8_area,
            _this.flashButton11_area,
            _this.flashButton3_area,
            _this.flashButton6_area,
            _this.flashButton9_area,
            _this.flashButton12_area];
        _this.cueList = [_this.cue_1,
            _this.cue_4,
            _this.cue_7,
            _this.cue_10,
            _this.cue_2,
            _this.cue_5,
            _this.cue_8,
            _this.cue_11,
            _this.cue_3,
            _this.cue_6,
            _this.cue_9,
            _this.cue_12];
        _this.backbutton_comp.touchEnabled = true;
        _this.backbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        // add feedback text
        if (feedback_str.length > 60) {
            feedback_str = feedback_str.slice(-60);
        }
        _this.feedback_text_67.$setText(feedback_str);
        // add clock
        _this.clock.width = _this.clock_area.width;
        _this.clock.height = _this.clock_area.height;
        _this.clock_area.addChild(_this.clock);
        //init clock
        if (state == 1 || state == 3) {
            _this.clock.init_clock(0);
        }
        else {
            _this.clock.init_clock(5);
        }
        // add flash button
        for (var i = 0; i < _this.flashAreaList.length; i++) {
            var newFlashButton = new flashButton_sine(i, "black_color_jpg", "white_color_jpg", "black_color_jpg", _this.freqList[i], _this.phaseList[i]);
            newFlashButton.width = _this.flashAreaList[i].width;
            newFlashButton.height = _this.flashAreaList[i].height;
            _this.flashList.push(newFlashButton);
        }
        // init flash
        _this.initFlash();
        if (state == 1) {
            for (var i = 0; i < _this.flashList.length; i++) {
                if (i == (trail - 1)) {
                    _this.flashList[trail - 1].positiveFlash();
                }
                else {
                    _this.flashList[i].flashStop();
                }
            }
        }
        else if (state == 3) {
            for (var i = 0; i < _this.flashList.length; i++) {
                _this.flashList[i].flashStop();
            }
        }
        // add trigger
        _this.triggerDisp = new flashButton_sine(100, "black_color_jpg", "white_color_jpg", "black_color_jpg", 0, 0);
        _this.triggerDisp.width = _this.trigger_area.width;
        _this.triggerDisp.height = _this.trigger_area.height;
        _this.trigger_area.addChild(_this.triggerDisp);
        _this.triggerDisp.flashStop();
        //init cue
        if (state == 1) {
            for (var i = 0; i < _this.cueList.length; i++) {
                _this.cueList[i].textColor = 0xFF0000;
                if (i == (trail - 1)) {
                    _this.cueList[i].$setText('+');
                }
                else {
                    _this.cueList[i].$setText('');
                }
            }
        }
        else if (state == 2 || state == 3) {
            for (var i = 0; i < _this.cueList.length; i++) {
                _this.cueList[i].textColor = 0xFFFFFF;
                _this.cueList[i].$setText(_this.keyList[i]);
            }
        }
        else {
            for (var i = 0; i < _this.cueList.length; i++) {
                _this.cueList[i].$setText('');
            }
        }
        // start flash
        if (state == 2) {
            _this.startFlash();
        }
        else {
            _this.startCount();
        }
        // start clock
        if (!_this.connect_flag) {
            _this.clock.start_clock();
        }
        return _this;
    }
    FightScene.prototype.initFlash = function () {
        // disp flash freq
        var dispActualFreq = 'Actrual Freq: ';
        for (var i = 0; i < this.flashList.length; i++) {
            dispActualFreq += this.flashList[i].getFreq() * 1000.0 / (2 * Math.PI) + ', '; //2*Math.PI*flashFreq/1000.0
        }
        if (this.currentGameState == 2) {
            console.log(dispActualFreq);
        }
        // add stimuli to area
        for (var i = 0; i < this.flashList.length; i++) {
            // add positive image
            this.flashAreaList[i].addChildAt(this.flashList[i], 0);
            this.flashList[i].flashInit();
            // add negative image
            var backgroundImag = new egret.Bitmap();
            backgroundImag.texture = RES.getRes(this.flashList[i].getNeg());
            backgroundImag.width = this.flashAreaList[i].width;
            backgroundImag.height = this.flashAreaList[i].height;
            this.flashAreaList[i].addChildAt(backgroundImag, 0);
        }
    };
    FightScene.prototype.startFlash = function () {
        this.dispTrigger = 1;
        //start flash event
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this, false, 999);
    };
    FightScene.prototype.startCount = function () {
        this.dispTrigger = 1;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameCount, this, false, 999);
    };
    FightScene.prototype.stopFlash = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        for (var i = 0; i < this.flashList.length; i++) {
            this.flashList[i].flashStop();
        }
    };
    FightScene.prototype.onEnterFrameCount = function (e) {
        if (this.dispTrigger >= 0) {
            if (this.dispTrigger > 0) {
                this.triggerDisp.positiveFlash();
                if (this.triggerFrameCount < 6) {
                    this.triggerFrameCount++;
                }
                else {
                    this.dispTrigger = 0;
                    this.triggerFrameCount = 0;
                }
            }
            else if (this.dispTrigger == 0) {
                this.triggerDisp.flashStop();
                this.dispTrigger = -1;
            }
        }
        // check clock
        if (this.clock.get_current_time() <= 0) {
            this.clock.stop_clock();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameCount, this);
            for (var i = 0; i < this.flashList.length; i++) {
                this.flashList[i].flashStop();
            }
            if (this.currentGameState == 1) {
                this.gameState = 2; // -> flash
            }
            else if (this.currentGameState == 3) {
                if (this.currentTrail < this.flashList.length) {
                    this.gameState = 1; // -> cue
                }
                else {
                    this.gameState = 4; // -> end
                }
            }
            else {
                this.gameState = 99; // -> error
            }
        }
    };
    FightScene.prototype.onEnterFrame = function (e) {
        if (this.dispTrigger >= 0) {
            if (this.dispTrigger > 0) {
                this.triggerDisp.positiveFlash();
                if (this.triggerFrameCount < 6) {
                    this.triggerFrameCount++;
                }
                else {
                    this.dispTrigger = 0;
                    this.triggerFrameCount = 0;
                }
            }
            else if (this.dispTrigger == 0) {
                this.triggerDisp.flashStop();
                this.dispTrigger = -1;
            }
        }
        // change alpha of positive image
        for (var i = 0; i < this.flashList.length; i++) {
            this.flashList[i].flashFun();
        }
        // check clock
        if (this.clock.get_current_time() <= 0) {
            this.clock.stop_clock();
            this.stopFlash();
            this.gameState = 3; // -> rest
            //this.clock.init_clock(5);
            //this.clock.start_clock();
        }
    };
    FightScene.prototype.checkState = function () {
        return this.gameState;
    };
    FightScene.prototype.beginState = function () {
        this.gameState = 0;
        // if(this.connect_flag){
        //     this.gameState = 100;
        // }else{
        //     this.gameState = 0;
        // }
    };
    return FightScene;
}(eui.Component));
window["FightScene"] = FightScene;
__reflect(FightScene.prototype,"FightScene",[]); 


/***/ }),

/***/ "./src/LoadingUI.ts":
/***/ (function(module, exports) {

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var LoadingUI = /** @class */ (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createView();
        return _this;
    }
    LoadingUI.prototype.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    LoadingUI.prototype.onProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
window["LoadingUI"] = LoadingUI;
__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]); 


/***/ }),

/***/ "./src/Main.ts":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("./src/AssetAdapter.ts");
__webpack_require__("./src/ConnectBreakScene.ts");
__webpack_require__("./src/ConnectingScene.ts");
__webpack_require__("./src/EndScene.ts");
__webpack_require__("./src/ErrorScene.ts");
__webpack_require__("./src/FightScene.ts");
__webpack_require__("./src/LoadingUI.ts");
__webpack_require__("./src/Main.ts");
__webpack_require__("./src/Platform.ts");
__webpack_require__("./src/StartScene.ts");
__webpack_require__("./src/ThemeAdapter.ts");
__webpack_require__("./src/WaitForControllerScene.ts");
__webpack_require__("./src/WaitForStartScene.ts");
__webpack_require__("./src/downClock.ts");
__webpack_require__("./src/enterRoomNumberScene.ts");
__webpack_require__("./src/flashButton.ts");
__webpack_require__("./src/flashButton_sine.ts");
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.connect_flag = false;
        _this.server_path = 'http://zewang.site:82/'; //'http://8.133.168.160:82/'//'http://127.0.0.1:5001/'
        // private onScoketReconnectionFail(){
        //     try{
        //         this.socket.disconnect();
        //     }catch(error){
        //         console.log(error)
        //     }
        // }
        // private onSocketConnectError(){
        //     this.socket.disconnect()
        // }
        _this.dispFPS = true;
        _this.dispFPSNum = 30;
        _this.dispFPScurrentNum = -1;
        _this.PreTime = 0;
        _this.sumFPS = 0;
        _this.sumNum = 0;
        _this.FPSlabel = new egret.TextField();
        _this.foceChangeState = false;
        _this.feedbackStr = '';
        _this.idStr = '';
        _this.roomStr = '';
        _this.errorStr = '';
        _this.enterRoomFlag = false;
        _this.currentGameState = -1;
        _this.nextGameState = 0;
        _this.trial = 1;
        return _this;
        //protected createGameScene(): void {
        //    let gameScene = new FightScene();
        //    this.addChild(gameScene);    
        //}
        // private textfield: egret.TextField;
        // /**
        //  * 创建场景界面
        //  * Create scene interface
        //  */
        // protected createGameScene(): void {
        //     let sky = this.createBitmapByName("bg_jpg");
        //     this.addChild(sky);
        //     let stageW = this.stage.stageWidth;
        //     let stageH = this.stage.stageHeight;
        //     sky.width = stageW;
        //     sky.height = stageH;
        //     let topMask = new egret.Shape();
        //     topMask.graphics.beginFill(0x000000, 0.5);
        //     topMask.graphics.drawRect(0, 0, stageW, 172);
        //     topMask.graphics.endFill();
        //     topMask.y = 33;
        //     this.addChild(topMask);
        //     let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        //     this.addChild(icon);
        //     icon.x = 26;
        //     icon.y = 33;
        //     let line = new egret.Shape();
        //     line.graphics.lineStyle(2, 0xffffff);
        //     line.graphics.moveTo(0, 0);
        //     line.graphics.lineTo(0, 117);
        //     line.graphics.endFill();
        //     line.x = 172;
        //     line.y = 61;
        //     this.addChild(line);
        //     let colorLabel = new egret.TextField();
        //     colorLabel.textColor = 0xffffff;
        //     colorLabel.width = stageW - 172;
        //     colorLabel.textAlign = "center";
        //     colorLabel.text = "Hello Egret";
        //     colorLabel.size = 24;
        //     colorLabel.x = 172;
        //     colorLabel.y = 80;
        //     this.addChild(colorLabel);
        //     let textfield = new egret.TextField();
        //     this.addChild(textfield);
        //     textfield.alpha = 0;
        //     textfield.width = stageW - 172;
        //     textfield.textAlign = egret.HorizontalAlign.CENTER;
        //     textfield.size = 24;
        //     textfield.textColor = 0xffffff;
        //     textfield.x = 172;
        //     textfield.y = 135;
        //     this.textfield = textfield;
        //     let button = new eui.Button();
        //     button.label = "Click!";
        //     button.horizontalCenter = 0;
        //     button.verticalCenter = 0;
        //     this.addChild(button);
        //     button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        // }
        // /**
        //  * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
        //  * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
        //  */
        // private createBitmapByName(name: string): egret.Bitmap {
        //     let result = new egret.Bitmap();
        //     let texture: egret.Texture = RES.getRes(name);
        //     result.texture = texture;
        //     return result;
        // }
        // /**
        //  * 描述文件加载成功，开始播放动画
        //  * Description file loading is successful, start to play the animation
        //  */
        // private startAnimation(result: Array<any>): void {
        //     let parser = new egret.HtmlTextParser();
        //     let textflowArr = result.map(text => parser.parse(text));
        //     let textfield = this.textfield;
        //     let count = -1;
        //     let change = () => {
        //         count++;
        //         if (count >= textflowArr.length) {
        //             count = 0;
        //         }
        //         let textFlow = textflowArr[count];
        //         // 切换描述内容
        //         // Switch to described content
        //         textfield.textFlow = textFlow;
        //         let tw = egret.Tween.get(textfield);
        //         tw.to({ "alpha": 1 }, 200);
        //         tw.wait(2000);
        //         tw.to({ "alpha": 0 }, 200);
        //         tw.call(change, this);
        //     };
        //     change();
        // }
        // /**
        //  * 点击按钮
        //  * Click the button
        //  */
        // private onButtonClick(e: egret.TouchEvent) {
        //     let panel = new eui.Panel();
        //     panel.title = "Title";
        //     panel.horizontalCenter = 0;
        //     panel.verticalCenter = 0;
        //     this.addChild(panel);
        // }
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            //egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            //egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()
                        //this.createGameScene();
                    ];
                    case 1:
                        _a.sent();
                        //this.createGameScene();
                        this.addEventListener(egret.Event.ENTER_FRAME, this.Game, this, false, 0);
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    Main.prototype.onSocketOpen = function () {
        console.log('Connect');
    };
    Main.prototype.onSocketClose = function () {
        this.connect_flag = false;
        this.roomStr = 'None';
        this.idStr = 'None';
        console.log('Disconnect');
        if (this.currentGameState > 0 && this.currentGameState < 999) {
            this.nextGameState = 104;
        }
    };
    Main.prototype.onReceiveMessage = function (data) {
        console.log(data);
    };
    Main.prototype.onSocketError = function (data) {
        console.log(data);
        this.errorStr = data;
        this.nextGameState = 999;
    };
    Main.prototype.CreateNewSSVEPStim = function (data) {
        var datasplit = data.split(",");
        console.log(datasplit);
        this.idStr = datasplit[0];
        this.roomStr = datasplit[1];
        this.connect_flag = true;
    };
    Main.prototype.onSocketSSVEPResponse = function (data) {
        console.log('Response: ' + data);
        this.feedbackStr = this.feedbackStr + data;
    };
    Main.prototype.onSocketChangeGameState = function (data) {
        console.log('Change state to ' + data);
        this.nextGameState = parseInt(data);
        if (this.currentGameState == this.nextGameState) {
            this.foceChangeState = true;
            //console.log('Do not need change')
            //this.socket.emit('changeGameStateRes',this.currentGameState.toString())
        }
    };
    Main.prototype.onSocketChangeGameStateRes = function (data) {
        console.log('Change state to ' + data + ' OK!!');
    };
    Main.prototype.onSocketChangeTrial = function (data) {
        console.log('Change trial to ' + data);
        this.trial = parseInt(data);
    };
    Main.prototype.Game = function () {
        if (this.dispFPS) {
            if (this.dispFPScurrentNum < 0) {
                //Init dsp display
                this.PreTime = egret.getTimer();
                this.FPSlabel.text = 'None';
                this.roomStr = 'None';
                this.idStr = 'None';
                this.FPSlabel.size = 20;
                this.dispFPScurrentNum = 0;
            }
            else {
                // Update fps and time
                var currentTime = egret.getTimer();
                this.sumFPS += 1000 / (currentTime - this.PreTime);
                this.sumNum++;
                this.PreTime = currentTime;
                // Update fps display
                this.dispFPScurrentNum++;
                if (this.dispFPScurrentNum > this.dispFPSNum) {
                    this.dispFPScurrentNum = 0;
                    this.FPSlabel.text = 'FPS: ' + Math.floor(this.sumFPS / this.sumNum * 100) / 100 + '\n' +
                        'Connect: ' + this.connect_flag.toString() + '\n' +
                        '' + //'ID: ' + this.idStr + '\n' +
                        'Room: ' + this.roomStr;
                    this.sumFPS = 0;
                    this.sumNum = 0;
                }
            }
        }
        if (this.nextGameState != this.currentGameState || this.foceChangeState) {
            // remove old scene
            if (this.currentGameState != -1) {
                for (var i = 0; i < this.numChildren; i++) {
                    this.removeChildAt(i);
                }
            }
            // build new scene
            this.currentGameState = this.nextGameState;
            this.foceChangeState = false;
            if (this.connect_flag) {
                this.socket.emit('changeGameStateRes', this.currentGameState.toString());
            }
            switch (this.currentGameState) {
                case 0: {
                    console.log('Start Scene');
                    this.feedbackStr = '';
                    this.errorStr = '';
                    this.trial = 1;
                    try {
                        this.socket.disconnect();
                    }
                    catch (error) {
                        console.log(error);
                    }
                    finally {
                        this.currentGameScene = new StartScene();
                        break;
                    }
                }
                case 1: {
                    console.log('Cue');
                    this.currentGameScene = new FightScene(1, this.trial, this.feedbackStr, this.connect_flag);
                    break;
                }
                case 2: {
                    console.log('Flash');
                    this.currentGameScene = new FightScene(2, this.trial, this.feedbackStr, this.connect_flag);
                    break;
                }
                case 3: {
                    console.log('Rest');
                    this.currentGameScene = new FightScene(3, this.trial, this.feedbackStr, this.connect_flag);
                    this.trial++;
                    break;
                }
                case 4: {
                    console.log('End');
                    this.currentGameScene = new EndScene(this.connect_flag);
                    break;
                }
                case 5: {
                    console.log('Enter room number');
                    this.currentGameScene = new enterRoomNumberScene();
                    break;
                }
                case 100: {
                    this.feedbackStr = '';
                    this.trial = 1;
                    this.currentGameScene = new ConnectingScene();
                    if (this.connect_flag) {
                        console.log('Has been connected to server');
                    }
                    else {
                        console.log('Connect to Server');
                        //
                        var self = this;
                        this.socket = io.connect(this.server_path);
                        this.socket.on('connect', function () {
                            self.onSocketOpen();
                        });
                        this.socket.on('disconnect', function () {
                            self.onSocketClose();
                        });
                        this.socket.on('news', function (data) {
                            self.onReceiveMessage(data);
                        });
                        this.socket.on('CreateNewSSVEPStim', function (data) {
                            self.CreateNewSSVEPStim(data);
                        });
                        this.socket.on('Error', function (data) {
                            self.onSocketError(data);
                        });
                        this.socket.on('changeGameStateRes', function (data) {
                            self.onSocketChangeGameStateRes(data);
                        });
                        this.socket.on('changeTrial', function (data) {
                            self.onSocketChangeTrial(data);
                        });
                        // this.socket.on('error',function(){
                        //     self.onSocketConnectError()
                        // })
                        // this.socket.on('reconnect_failed',function(){
                        //     self.onScoketReconnectionFail()
                        // })
                        this.socket.on('ssvepResponse', function (data) {
                            self.onSocketSSVEPResponse(data);
                        });
                        this.socket.on('changeGameState', function (data) {
                            self.onSocketChangeGameState(data);
                        });
                        if (this.enterRoomFlag) {
                            this.socket.emit('addNewSSVEPStim', 'web_stimuli_12,' + this.roomStr);
                        }
                        else {
                            this.socket.emit('addNewSSVEPStim', 'web_stimuli_12');
                        }
                        //
                    }
                    break;
                }
                case 101: {
                    console.log('Wait for controller');
                    this.currentGameScene = new WaitForControllerScene(this.idStr, this.roomStr);
                    break;
                }
                case 102: {
                    console.log('Wait for start');
                    this.currentGameScene = new WaitForStartScene();
                    break;
                }
                case 103: {
                    console.log('Wait for start');
                    this.currentGameScene = new WaitForStartScene();
                    break;
                }
                case 104: {
                    console.log('Connection Break');
                    try {
                        this.socket.disconnect();
                    }
                    catch (error) {
                        console.log(error);
                    }
                    finally {
                        this.currentGameScene = new ConnectBreakScene();
                        break;
                    }
                }
                case 999: {
                    try {
                        this.socket.disconnect();
                    }
                    catch (error) {
                        console.log(error);
                    }
                    finally {
                        console.log(this.errorStr);
                        this.currentGameScene = new ErrorScene(this.errorStr);
                        break;
                    }
                }
                default: {
                    this.errorStr = 'Error Build Game State !!';
                    this.nextGameState = 999;
                    //console.log('Error Build Game State !!');
                    //this.currentGameScene = new ErrorScene();
                    break;
                }
            }
            this.addChild(this.currentGameScene);
            this.addChild(this.FPSlabel);
        }
        else {
            if (this.currentGameState == 100 && this.connect_flag) {
                this.nextGameState = 101;
            }
            // check state
            if (this.currentGameScene.checkState() >= 0) {
                this.nextGameState = this.currentGameScene.checkState();
                if (this.currentGameState == 5) {
                    this.enterRoomFlag = this.currentGameScene.getRoomFlag();
                    this.roomStr = this.currentGameScene.getRoom();
                }
                if (this.currentGameState == 101 && this.nextGameState == 100) {
                    this.nextGameState = 101;
                }
            }
            // check whether needs re-connection
            // if(!this.connect_flag && this.nextGameState>100){
            //     this.nextGameState = 104
            // }
        }
    };
    return Main;
}(eui.UILayer));
window["Main"] = Main;
__reflect(Main.prototype,"Main",[]); 


/***/ }),

/***/ "./src/Platform.ts":
/***/ (function(module, exports) {

var DebugPlatform = /** @class */ (function () {
    function DebugPlatform() {
    }
    DebugPlatform.prototype.getUserInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, { nickName: "username" }];
            });
        });
    };
    DebugPlatform.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DebugPlatform;
}());
window["DebugPlatform"] = DebugPlatform;
__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]); 
if (!window.platform) {
    window.platform = new DebugPlatform();
}


/***/ }),

/***/ "./src/StartScene.ts":
/***/ (function(module, exports) {

var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/startScene.exml";
        _this.startbutton_comp.touchEnabled = true;
        _this.startbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        _this.ConnectServerButton.touchEnabled = true;
        _this.ConnectServerButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.connectServerFun, _this);
        return _this;
    }
    StartScene.prototype.beginState = function () {
        this.gameState = 1;
    };
    StartScene.prototype.checkState = function () {
        return this.gameState;
    };
    StartScene.prototype.connectServerFun = function () {
        this.gameState = 5; //100;
    };
    return StartScene;
}(eui.Component));
window["StartScene"] = StartScene;
__reflect(StartScene.prototype,"StartScene",[]); 


/***/ }),

/***/ "./src/ThemeAdapter.ts":
/***/ (function(module, exports) {

//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = /** @class */ (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param onSuccess 解析完成回调函数，示例：compFunc(e:egret.Event):void;
     * @param onError 解析失败回调函数，示例：errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, onSuccess, onError, thisObject) {
        var _this = this;
        function onResGet(e) {
            onSuccess.call(thisObject, e);
        }
        function onResError(e) {
            if (e.resItem.url == url) {
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
                onError.call(thisObject);
            }
        }
        if (typeof generateEUI !== 'undefined') {
            egret.callLater(function () {
                onSuccess.call(thisObject, generateEUI);
            }, this);
        }
        else if (typeof generateEUI2 !== 'undefined') {
            RES.getResByUrl("resource/gameEui.json", function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateEUI2);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
        }
        else if (typeof generateJSON !== 'undefined') {
            if (url.indexOf(".exml") > -1) {
                var dirPath = url.replace(".exml", "_EUI.json");
                if (!generateJSON.paths[url]) {
                    RES.getResByUrl(dirPath, function (data) {
                        window["JSONParseClass"]["setData"](data);
                        egret.callLater(function () {
                            onSuccess.call(thisObject, generateJSON.paths[url]);
                        }, _this);
                    }, this, RES.ResourceItem.TYPE_JSON);
                }
                else {
                    egret.callLater(function () {
                        onSuccess.call(thisObject, generateJSON.paths[url]);
                    }, this);
                }
            }
            else {
                egret.callLater(function () {
                    onSuccess.call(thisObject, generateJSON);
                }, this);
            }
        }
        else {
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null);
            RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
        }
    };
    return ThemeAdapter;
}());
window["ThemeAdapter"] = ThemeAdapter;
__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]); 


/***/ }),

/***/ "./src/WaitForControllerScene.ts":
/***/ (function(module, exports) {

var WaitForControllerScene = /** @class */ (function (_super) {
    __extends(WaitForControllerScene, _super);
    function WaitForControllerScene(idStr, roomStr) {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/WaitForController.exml";
        _this.room_text.$setText('ID: ' + idStr + '\n' +
            'Room: ' + roomStr + '\n\n' +
            'Waiting for controller');
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        return _this;
    }
    WaitForControllerScene.prototype.checkState = function () {
        return this.gameState;
    };
    WaitForControllerScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return WaitForControllerScene;
}(eui.Component));
window["WaitForControllerScene"] = WaitForControllerScene;
__reflect(WaitForControllerScene.prototype,"WaitForControllerScene",[]); 


/***/ }),

/***/ "./src/WaitForStartScene.ts":
/***/ (function(module, exports) {

var WaitForStartScene = /** @class */ (function (_super) {
    __extends(WaitForStartScene, _super);
    function WaitForStartScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.skinName = "resource/eui_skins/WaitForStart.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        return _this;
    }
    WaitForStartScene.prototype.checkState = function () {
        return this.gameState;
    };
    WaitForStartScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    return WaitForStartScene;
}(eui.Component));
window["WaitForStartScene"] = WaitForStartScene;
__reflect(WaitForStartScene.prototype,"WaitForStartScene",[]); 


/***/ }),

/***/ "./src/downClock.ts":
/***/ (function(module, exports) {

var downClock = /** @class */ (function (_super) {
    __extends(downClock, _super);
    function downClock() {
        var _this = _super.call(this) || this;
        _this.current_time = 0;
        //init timer
        _this.timer = new egret.Timer(0.01 * 1000, 0);
        _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.timerFunc, _this);
        _this.timer.stop();
        return _this;
    }
    downClock.prototype.init_clock = function (total_time) {
        this.current_disp = total_time;
        this.current_time = 0;
        this.start_time = -100;
    };
    downClock.prototype.start_clock = function () {
        this.timer.reset();
        this.timer.start();
    };
    downClock.prototype.stop_clock = function () {
        this.timer.stop();
        this.timer.reset();
    };
    downClock.prototype.get_current_time = function () {
        return this.current_disp + (1 - this.current_time / 1000);
    };
    downClock.prototype.timerFunc = function () {
        if (this.start_time < 0) {
            this.start_time = egret.getTimer();
        }
        this.current_time = egret.getTimer() - this.start_time;
        if (this.current_time > 1000) {
            this.current_time = 0;
            this.start_time = egret.getTimer();
            this.current_disp -= 1;
        }
        if (this.current_disp < 0) {
            this.timer.stop();
        }
    };
    return downClock;
}(eui.Component));
window["downClock"] = downClock;
__reflect(downClock.prototype,"downClock",[]); 


/***/ }),

/***/ "./src/enterRoomNumberScene.ts":
/***/ (function(module, exports) {

var enterRoomNumberScene = /** @class */ (function (_super) {
    __extends(enterRoomNumberScene, _super);
    function enterRoomNumberScene() {
        var _this = _super.call(this) || this;
        _this.gameState = -1;
        _this.roomStr = '';
        _this.enterRoomFlag = false;
        _this.skinName = "resource/eui_skins/enterRoomNumber.exml";
        _this.returnbutton_comp.touchEnabled = true;
        _this.returnbutton_comp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.beginState, _this);
        _this.autoCreateButton.touchEnabled = true;
        _this.autoCreateButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.autoCreateFun, _this);
        _this.useEnterButton.touchEnabled = true;
        _this.useEnterButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.useEnterRoom, _this);
        return _this;
    }
    enterRoomNumberScene.prototype.checkState = function () {
        return this.gameState;
    };
    enterRoomNumberScene.prototype.beginState = function () {
        this.gameState = 0;
    };
    enterRoomNumberScene.prototype.autoCreateFun = function () {
        console.log('auto create room');
        this.gameState = 100;
    };
    enterRoomNumberScene.prototype.useEnterRoom = function () {
        console.log('Enter room: ' + this.roomNum_entry.text);
        this.roomStr = this.roomNum_entry.text;
        this.enterRoomFlag = true;
        this.gameState = 100;
    };
    enterRoomNumberScene.prototype.getRoom = function () {
        return this.roomStr;
    };
    enterRoomNumberScene.prototype.getRoomFlag = function () {
        return this.enterRoomFlag;
    };
    return enterRoomNumberScene;
}(eui.Component));
window["enterRoomNumberScene"] = enterRoomNumberScene;
__reflect(enterRoomNumberScene.prototype,"enterRoomNumberScene",[]); 


/***/ }),

/***/ "./src/flashButton.ts":
/***/ (function(module, exports) {

var flashButton = /** @class */ (function (_super) {
    __extends(flashButton, _super);
    function flashButton(flasgID, stopImage, flashImagePos, flashImageNeg, flashFreq, dispTimeStep) {
        var _this = _super.call(this) || this;
        _this.ID = flasgID;
        _this.imageStop = stopImage;
        _this.imagePos = flashImagePos;
        _this.imageNeg = flashImageNeg;
        _this.freq = flashFreq;
        _this.currentCount = 0;
        _this.currentFlag = 1;
        _this.dispFlag = dispTimeStep;
        _this.texture = RES.getRes(_this.imageStop);
        _this.timeStore = [];
        return _this;
    }
    flashButton.prototype.setDispFlag = function (dispFlag) {
        this.dispFlag = dispFlag;
    };
    flashButton.prototype.getFreq = function () {
        return this.freq;
    };
    flashButton.prototype.flashFun = function (timeStamp) {
        this.currentCount += 1;
        if (this.currentCount >= this.freq) {
            // disp time step
            if (this.dispFlag) {
                console.log(this.currentCount + ': ' + this.currentFlag);
                // let now = timeStamp;
                // this.timeStore.push(now);
                // if(this.timeStore.length>10){
                //     this.timeStore = this.timeStore.slice(this.timeStore.length-10,this.timeStore.length);
                // }
                // let logStr = this.ID + " flash: "
                // for(let i=1;i<this.timeStore.length;i++){
                //     logStr += this.timeStore[i]-this.timeStore[i-1]+", ";
                // }
                // console.log(logStr)
            }
            //reset counter
            this.currentCount = 0;
            // reverse 
            if (this.currentFlag > 0) {
                this.texture = RES.getRes(this.imagePos);
            }
            else {
                this.texture = RES.getRes(this.imageNeg);
            }
            this.currentFlag *= -1;
            return true;
        }
        else {
            return false;
        }
    };
    flashButton.prototype.flashInit = function () {
        this.currentFlag = 1;
        this.currentCount = 0;
        this.timeStore = [];
        if (this.dispFlag) {
            var now = egret.getTimer();
            this.timeStore.push(now);
        }
    };
    return flashButton;
}(egret.Bitmap));
window["flashButton"] = flashButton;
__reflect(flashButton.prototype,"flashButton",[]); 


/***/ }),

/***/ "./src/flashButton_sine.ts":
/***/ (function(module, exports) {

var flashButton_sine = /** @class */ (function (_super) {
    __extends(flashButton_sine, _super);
    function flashButton_sine(flasgID, stopImage, flashImagePos, flashImageNeg, flashFreq, flashTheta) {
        var _this = _super.call(this) || this;
        _this.ID = flasgID;
        _this.imageStop = stopImage;
        _this.imagePos = flashImagePos;
        _this.imageNeg = flashImageNeg;
        _this.freq = 2 * Math.PI * flashFreq / 1000.0;
        _this.theta = flashTheta;
        _this.start_time = -100;
        _this.texture = RES.getRes(_this.imageStop);
        _this.flash_flag = false;
        return _this;
    }
    flashButton_sine.prototype.getID = function () {
        return this.ID;
    };
    flashButton_sine.prototype.getFreq = function () {
        return this.freq;
    };
    flashButton_sine.prototype.getNeg = function () {
        return this.imageNeg;
    };
    flashButton_sine.prototype.getFlashFlag = function () {
        return this.flash_flag;
    };
    flashButton_sine.prototype.flashInit = function () {
        this.texture = RES.getRes(this.imagePos);
        this.alpha = 0.5 + 0.5 * Math.sin(this.freq * 0 + this.theta);
        this.start_time = -100;
        this.flash_flag = true;
    };
    flashButton_sine.prototype.flashFun = function () {
        if (this.flash_flag) {
            if (this.start_time < 0) {
                this.start_time = egret.getTimer();
            }
            this.alpha = 0.5 + 0.5 * Math.sin(this.freq * (egret.getTimer() - this.start_time) + this.theta);
        }
    };
    flashButton_sine.prototype.flashStop = function () {
        this.texture = RES.getRes(this.imageStop);
        this.alpha = 1;
        this.flash_flag = false;
    };
    flashButton_sine.prototype.positiveFlash = function () {
        this.texture = RES.getRes(this.imagePos);
        this.alpha = 1;
        this.flash_flag = false;
    };
    return flashButton_sine;
}(egret.Bitmap));
window["flashButton_sine"] = flashButton_sine;
__reflect(flashButton_sine.prototype,"flashButton_sine",[]); 


/***/ })

/******/ });