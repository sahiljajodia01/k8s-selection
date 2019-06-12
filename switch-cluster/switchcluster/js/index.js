(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "base/js/dialog", "base/js/namespace", "base/js/events"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("base/js/dialog"), require("base/js/namespace"), require("base/js/events")) : factory(root["jquery"], root["base/js/dialog"], root["base/js/namespace"], root["base/js/events"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

var _user = __webpack_require__(5);

var _user2 = _interopRequireDefault(_user);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './js/materialize.min.js'

function SwitchCluster() {

    this.comm = null;

    _events2.default.on('kernel_connected.Kernel', _jquery2.default.proxy(this.start_comm, this));
};

SwitchCluster.prototype.add_toolbar_button = function () {
    var action = {
        help: 'Spark clusters connection',
        icon: 'fa-external-link',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: _jquery2.default.proxy(this.open_modal, this)
    };

    var prefix = 'SwitchCluster';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = _namespace2.default.actions.register(action, action_name, prefix);
    this.toolbar_button = _namespace2.default.toolbar.add_buttons_group([full_action_name]).find('.btn');
    // this.toolbar_button.addClass('fa-external-link');
    this.enabled = true;
};

SwitchCluster.prototype.open_modal = function () {

    if (this.enabled && !(this.modal && this.modal.data('bs.modal') && this.modal.data('bs.modal').isShown)) {
        var that = this;

        this.modal = _dialog2.default.modal({
            show: false,
            draggable: false,
            notebook: _namespace2.default.notebook,
            keyboard_manager: _namespace2.default.keyboard_manager,
            title: 'Spark cluster setting'
        });

        this.modal.click(function (e) {
            // Close modal on click outside of connector area when in not "hide_close" state
            if ((0, _jquery2.default)(e.target).is("div") && !(0, _jquery2.default)(e.target).closest('.modal-dialog').length) {
                that.modal.modal('hide');
            }
        });

        this.modal.on('show.bs.modal', function () {
            console.log("Inside 2nd open model");
            that.get_html_select_cluster();
        }).modal('show');
        this.modal.find(".modal-header").unbind("mousedown");

        this.modal.on('hide.bs.modal', function () {
            return true;
        });
    }
};

SwitchCluster.prototype.send = function (msg) {
    this.comm.send(msg);
};

SwitchCluster.prototype.get_html_select_cluster = function () {
    this.send({ 'action': 'Refresh' });
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    // $('<link type="text/css" rel="stylesheet" href="css/materialize.min.css" />').appendTo(header);
    var clusters = this.clusters;
    var current_cluster = this.current_cluster;
    var template = _user2.default;
    html.append(template);
    // var list = [0, 1, 2, 3, 4, 5, 6];
    var that = this;
    var select = html.find("#select_cluster_options");
    for (var i = 0; i < clusters.length; i++) {
        if (clusters[i] == current_cluster) {
            (0, _jquery2.default)('<option>' + clusters[i] + '</option>').attr('value', clusters[i]).attr('selected', 'selected').appendTo(select).change(function () {});
        } else {
            (0, _jquery2.default)('<option>' + clusters[i] + '</option>').attr('value', clusters[i]).appendTo(select);
        }
    }

    var main_div = html.find('#user_html_inputs');

    (0, _jquery2.default)('<br>').appendTo(main_div);

    (0, _jquery2.default)('<label for="namespace_text">Namespace</label><br>').appendTo(main_div);

    var namespace_input = (0, _jquery2.default)('<input/>').attr('name', 'namespace_text').attr('type', 'text').attr('id', 'namespace_text').attr('placeholder', 'Namespace').addClass('form__field').appendTo(main_div).focus().change(function () {
        that.selected_namespace = namespace_input.val();
    });

    (0, _jquery2.default)('<br><br>').appendTo(main_div);

    (0, _jquery2.default)('<label for="svcaccount_text">ServiceAccount</label><br>').appendTo(main_div);

    var svcaccount_input = (0, _jquery2.default)('<input/>').attr('name', 'svcaccount_text').attr('type', 'text').attr('id', 'svcaccount_text').attr('placeholder', 'ServiceAccount').addClass('form__field').appendTo(main_div).focus().change(function () {
        that.selected_svcaccount = svcaccount_input.val();
    });

    select.change(function () {
        that.current_cluster = (0, _jquery2.default)(this).children("option:selected").val();
    });
    (0, _jquery2.default)('<button>').addClass('btn-blue').attr('data-dismiss', 'modal').text("Select Cluster").appendTo(footer).on('click', _jquery2.default.proxy(this.change_cluster, this));
};

SwitchCluster.prototype.change_cluster = function () {
    console.log("Sending msg to kernel to change KUBECONFIG");
    // if(this.modified_cluster == null) {
    //     this.modified_cluster = this.current_cluster;
    // }

    // this.current_cluster = this.modified_cluster;
    console.log("Modified cluster: " + this.current_cluster);
    console.log("Selected namespace: " + this.selected_namespace);
    console.log("Selected serviceaccount: " + this.selected_svcaccount);
    // var that = this;
    this.send({
        'action': 'change-current-context',
        'context': this.current_cluster
    });
};

SwitchCluster.prototype.redirect = function () {
    window.location.href = "http://spark.apache.org/";
};

SwitchCluster.prototype.on_comm_msg = function (msg) {
    if (msg.content.data.msgtype == 'cluster-select') {
        console.log("Got message from frontend: " + msg.content.data.current_cluster);
        this.current_cluster = msg.content.data.current_cluster;
        this.clusters = msg.content.data.clusters;
    }
};

SwitchCluster.prototype.start_comm = function () {

    if (this.comm) {
        this.comm.close();
    }

    console.log('SwitchCluster: Starting Comm with kernel');

    var that = this;

    if (_namespace2.default.notebook.kernel) {
        console.log("Inside if statement!!");
        this.comm = _namespace2.default.notebook.kernel.comm_manager.new_comm('SwitchCluster', { 'msgtype': 'switchcluster-conn-open' });
        this.comm.on_msg(_jquery2.default.proxy(that.on_comm_msg, that));
        this.comm.on_close(_jquery2.default.proxy(that.on_comm_close, that));
    } else {
        console.log("SwitchCluster: No communication established, kernel null");
    }
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

module.exports = "<div class=select id=user_html_inputs> <select id=select_cluster_options class=select-text> </select> <span class=select-highlight></span> <span class=select-bar></span> <label class=select-label>Select Spark K8s cluster</label> </div>";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(9)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(false);
// imports


// module
exports.push([module.i, ".btn-blue {\n    position: relative;\n  \n    display: block;\n    margin: auto;\n    padding: 10px;\n\n    overflow: hidden;\n  \n    border-width: 0;\n    outline: none;\n    border-radius: 2px;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\n    \n    background-color: #03A9F4;\n    color: #ecf0f1;\n    \n    transition: background-color .3s;\n}\n\n.modal-title {\n    margin: 0;\n    line-height: 1.42857143;\n    font-size: 20px;\n}\n\n\n.wrap {\n    position: absolute;\n    right: 0;\n    top: 40%;\n    width: 350px;\n    left: 0;\n    margin: 25px auto;\n  }\n  \n  /* select starting stylings ------------------------------*/\n  .select {\n    font-family:\n      'Roboto','Helvetica','Arial',sans-serif;\n      position: relative;\n      width: 350px;\n      margin-top: 15px;\n  }\n  \n  .select-text {\n      position: relative;\n      font-family: inherit;\n      background-color: transparent;\n      width: 350px;\n      padding: 10px 10px 10px 0;\n      font-size: 18px;\n      border-radius: 0;\n      border: none;\n      border-bottom: 1px solid rgba(0,0,0, 0.12);\n  }\n  \n  /* Remove focus */\n  .select-text:focus {\n      outline: none;\n      border-bottom: 1px solid rgba(0,0,0, 0);\n  }\n  \n      /* Use custom arrow */\n  .select .select-text {\n      appearance: none;\n      -webkit-appearance:none\n  }\n  \n  .select:after {\n      position: absolute;\n      top: 18px;\n      right: 10px;\n      /* Styling the down arrow */\n      width: 0;\n      height: 0;\n      padding: 0;\n      content: '';\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 6px solid rgba(0, 0, 0, 0.12);\n      pointer-events: none;\n  }\n  \n  \n  /* LABEL ======================================= */\n  .select-label {\n      color: rgba(0,0,0, 0.26);\n      font-size: 18px;\n      font-weight: normal;\n      position: absolute;\n      pointer-events: none;\n      left: 0;\n      top: 10px;\n      transition: 0.2s ease all;\n  }\n  \n  /* active state */\n  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {\n      color: rgb(0, 0, 0);\n      top: -20px;\n      transition: 0.2s ease all;\n      font-size: 14px;\n  }\n  \n  /* BOTTOM BARS ================================= */\n  .select-bar {\n      position: relative;\n      display: block;\n      width: 350px;\n  }\n  \n  .select-bar:before, .select-bar:after {\n      content: '';\n      height: 2px;\n      width: 0;\n      bottom: 1px;\n      position: absolute;\n      background: #2F80ED;\n      transition: 0.2s ease all;\n  }\n  \n  .select-bar:before {\n      left: 50%;\n  }\n  \n  .select-bar:after {\n      right: 50%;\n  }\n  \n  /* active state */\n  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {\n      width: 50%;\n  }\n  \n  /* HIGHLIGHTER ================================== */\n  .select-highlight {\n      position: absolute;\n      height: 60%;\n      width: 100px;\n      top: 25%;\n      left: 0;\n      pointer-events: none;\n      opacity: 0.5;\n  }\n\n\n\n.form__field {\n    font-family: inherit;\n    width: 50%;\n    border: 0;\n    border-bottom: 1px solid #d2d2d2;\n    outline: 0;\n    font-size: 16px;\n    color: #212121;\n    padding: 7px 0;\n    background: transparent;\n    transition: border-color 0.2s;\n}\n  \n.form__field::placeholder {\n    color: transparent;\n}\n\n/* label,\n.form__field:placeholder-shown ~ .form__label {\n    font-size: 16px;\n    cursor: text;\n    top: 20px;\n}\n\n.form__field:focus ~ .form__label {\n  position: absolute;\n  top: 0;\n  display: block;\n  transition: 0.2s;\n  font-size: 12px;\n  color: #9b9b9b;\n}\n\n.form__field:focus ~ .form__label {\n  color: #212121;\n} */\n\n.form__field:focus {\n  padding-bottom: 6px;\n  border-bottom: 2px solid #212121;\n}", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(10);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ })
/******/ ]);
});