(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"), require("base/js/keyboard"), require("base/js/utils"), require("services/config"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "base/js/dialog", "base/js/namespace", "base/js/events", "base/js/keyboard", "base/js/utils", "services/config"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"), require("base/js/keyboard"), require("base/js/utils"), require("services/config")) : factory(root["jquery"], root["base/js/dialog"], root["base/js/namespace"], root["base/js/events"], root["base/js/keyboard"], root["base/js/utils"], root["services/config"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

var _jquery = __webpack_require__(1);

var _jquery2 = _interopRequireDefault(_jquery);

var _dialog = __webpack_require__(2);

var _dialog2 = _interopRequireDefault(_dialog);

var _namespace = __webpack_require__(3);

var _namespace2 = _interopRequireDefault(_namespace);

var _events = __webpack_require__(4);

var _events2 = _interopRequireDefault(_events);

var _keyboard = __webpack_require__(5);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _utils = __webpack_require__(6);

var _utils2 = _interopRequireDefault(_utils);

var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SwitchCluster() {

    this.comm = null;
} // define([
//     'base/js/namespace'
//     ], function(Jupyter) {

//         var redirect = function() {
//             window.location.href = "http://spark.apache.org/";
//       };

//       var defaultButton = function () {
//           Jupyter.toolbar.add_buttons_group([
//               Jupyter.keyboard_manager.actions.register ({
//                   'help': 'Redirect to http://spark.apache.org/',
//                   'icon' : 'fa-external-link',
//                   'handler': redirect
//               }, 'redirect-page', 'Swan Action')
//           ])
//       }

//     function load_ipython_extension() {
//         defaultButton();
//     }
//     return {
//         load_ipython_extension: load_ipython_extension
//     };
// });


;

SwitchCluster.prototype.add_toolbar_button = function () {
    var action = {
        help: 'Spark clusters connection',
        icon: 'fa-external-link',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: _jquery2.default.proxy(this.redirect, this)
    };

    var prefix = 'SparkConnector';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = _namespace2.default.actions.register(action, action_name, prefix);
    this.toolbar_button = _namespace2.default.toolbar.add_buttons_group([full_action_name]).find('.btn');
    // this.toolbar_button.addClass('fa-external-link');
    // this.enabled = true;
};

SwitchCluster.prototype.redirect = function () {
    window.location.href = "http://spark.apache.org/";
};

function load_ipython_extension() {

    var conn = new SwitchCluster();
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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ })
/******/ ]);
});