(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"), require("base/js/keyboard"), require("base/js/utils"), require("services/config"));
	else if(typeof define === 'function' && define.amd)
		define(["base/js/dialog", "base/js/namespace", "base/js/events", "base/js/keyboard", "base/js/utils", "services/config"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"), require("base/js/keyboard"), require("base/js/utils"), require("services/config")) : factory(root["base/js/dialog"], root["base/js/namespace"], root["base/js/events"], root["base/js/keyboard"], root["base/js/utils"], root["services/config"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load_ipython_extension = undefined;

var _dialog = __webpack_require__(1);

var _dialog2 = _interopRequireDefault(_dialog);

var _namespace = __webpack_require__(2);

var _namespace2 = _interopRequireDefault(_namespace);

var _events = __webpack_require__(3);

var _events2 = _interopRequireDefault(_events);

var _keyboard = __webpack_require__(4);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _utils = __webpack_require__(5);

var _utils2 = _interopRequireDefault(_utils);

var _config = __webpack_require__(6);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var $ = jquery;

// import jquery from 'jquery';
function Switchcluster() {
    // this.states = {
    //     basic: $.proxy(this.get_basic, this),
    //     buttons: {
    //         'Select Cluster': {
    //             class: 'btn-success size-100',
    //             click: $.proxy(this.select_cluster, this)
    //         }
    //     }
    // };

    console.log('Switch Cluster start!!!!');

    this.comm = null;

    // this.options = this.get_notebook_metadata();

    // this.add_toolbar_button();
}

Switchcluster.prototype.add_toolbar_button = function () {
    var action = {
        help: 'Switch Spark K8s cluster',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: $.proxy(this.open_modal, this)
    };

    var prefix = 'SwitchCluster';
    var action_name = 'show-cluster-dropdown';

    var full_action_name = _namespace2.default.actions.register(action, action_name, prefix);
    this.toolbar_button = _namespace2.default.toolbar.add_buttons_group([full_action_name]).find('.btn');
    this.toolbar_button.addClass('spark-icon');
    this.enabled = true;
};

Switchcluster.prototype.open_modal = function () {

    if (this.enabled && !(this.modal && this.modal.data('bs.modal') && this.modal.data('bs.modal').isShown)) {
        var that = this;

        this.modal = _dialog2.default.modal({
            show: false,
            draggable: false,
            notebook: _namespace2.default.notebook,
            keyboard_manager: _namespace2.default.keyboard_manager,
            title: 'Spark clusters connection'
        }).attr('id', 'sparkclusters-modal').addClass('right');

        this.modal.click(function (e) {
            // Close modal on click outside of connector area when in not "hide_close" state
            if ($(e.target).is("div") && !$(e.target).closest('.modal-dialog').length && !that.state.hide_close) {
                that.modal.modal('hide');
            }
        });

        this.modal.on('shown.bs.modal', function () {
            that.modal.find("input").first().focus();
        });

        this.modal.on('show.bs.modal', function () {

            that.switch_state(that.state, that.state_config, that.state_error);
        }).modal('show');
        this.modal.find(".modal-header").unbind("mousedown");

        this.modal.on('hide.bs.modal', function () {
            that.close();
        });
    }
};

function load_ipython_extension() {

    var conn = new Switchcluster();
    conn.add_toolbar_button();
}

exports.load_ipython_extension = load_ipython_extension;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});