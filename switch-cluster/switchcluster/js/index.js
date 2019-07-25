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

var _create_context = __webpack_require__(6);

var _create_context2 = _interopRequireDefault(_create_context);

var _user_create = __webpack_require__(7);

var _user_create2 = _interopRequireDefault(_user_create);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './js/materialize.min.js'

function SwitchCluster() {

    this.states = {
        select: {
            get_html: _jquery2.default.proxy(this.get_html_select_cluster, this)
        },
        create: {
            get_html: _jquery2.default.proxy(this.get_html_create_context, this),
            buttons: {
                'Create Context': {
                    class: 'btn-success size-100',
                    click: _jquery2.default.proxy(this.create_context, this)
                }
            }
        },
        view: {
            get_html: _jquery2.default.proxy(this.get_html_view_context, this),
            hide_close: true,
            buttons: {
                'Select Context': {
                    class: 'btn-danger size-100',
                    click: _jquery2.default.proxy(this.select_context, this)
                }
            }
        },
        create_users: {
            get_html: _jquery2.default.proxy(this.get_html_create_users, this),
            buttons: {
                'Create User': {
                    class: 'btn-success size-100',
                    click: _jquery2.default.proxy(this.create_users, this)
                }
            }
        },
        loading: {
            get_html: _jquery2.default.proxy(this.get_html_loading, this),
            hide_close: true
        }
    };

    this.comm = null;

    _events2.default.on('kernel_connected.Kernel', _jquery2.default.proxy(this.start_comm, this));
};

SwitchCluster.prototype.add_toolbar_button = function () {
    var action = {
        help: 'Spark clusters settings',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: _jquery2.default.proxy(this.open_modal, this)
    };

    var prefix = 'SwitchCluster';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = _namespace2.default.actions.register(action, action_name, prefix);
    this.toolbar_button = _namespace2.default.toolbar.add_buttons_group([full_action_name]).find('.btn');
    this.toolbar_button.text('Not Connected');
    // this.toolbar_button.addClass("kubernetes-icon");
    this.toolbar_button.attr("style", "width: 150px; text-overflow: ellipsis; overflow: hidden;");
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
            if ((0, _jquery2.default)(e.target).is("div") && !(0, _jquery2.default)(e.target).closest('.modal-dialog').length && !that.hide_close) {
                that.modal.modal('hide');
            }
        });

        this.modal.on('show.bs.modal', function () {
            console.log("Inside 2nd open model");
            // that.switch_state(that.states.select);
            // that.get_html_select_cluster();
            that.switch_state(that.states.loading);
            that.refresh_modal();
        }).modal('show');
        this.modal.find(".modal-header").unbind("mousedown");

        this.modal.on('hide.bs.modal', function () {
            return true;
        });
    }
};

SwitchCluster.prototype.refresh_modal = function () {
    this.switch_state(this.states.loading);
    this.send({ 'action': 'Refresh' });
};

SwitchCluster.prototype.send = function (msg) {
    this.comm.send(msg);
};

SwitchCluster.prototype.get_html_select_cluster = function () {
    // this.send({'action': 'Refresh'});
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    var header = this.modal.find('.modal-header');

    (0, _jquery2.default)('<h4 class="modal-title">Spark cluster setting</h4>').appendTo(header);
    // $('<link type="text/css" rel="stylesheet" href="css/materialize.min.css" />').appendTo(header);
    var contexts = this.contexts;
    var current_cluster = this.current_cluster;
    var current_context = this.current_context;
    var template = _user2.default;
    this.hide_close = true;
    html.append(template);
    var delete_list = this.delete_list;
    var admin_list = this.admin_list;
    console.log("DELETE LIST: " + delete_list);
    // var list = [0, 1, 2, 3, 4, 5, 6];

    var that = this;
    var list_div = html.find("#user_html_inputs");

    for (var i = 0; i < contexts.length; i++) {
        if (delete_list[i] == "True") {
            (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol" style="visibility: hidden;"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text" style="color: #C0C0C0;">' + contexts[i] + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button disabled class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
        } else {
            if (admin_list[i] == "True") {
                if (contexts[i] == current_context) {
                    (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol"><i class="fa fa-circle" aria-hidden="true"></i></div></icon><div class="list-item-text">' + contexts[i] + '</div><button disabled class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
                } else {
                    (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol" style="visibility: hidden;"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text">' + contexts[i] + '</div><button disabled class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
                }
            } else {
                if (contexts[i] == current_context) {
                    (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text">' + contexts[i] + '</div><button disabled class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
                } else {
                    (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol" style="visibility: hidden;"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text">' + contexts[i] + '</div><button disabled class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
                }
            }
        }
        // $('<div class="cluster-list-div"><div class="list-item-text">' + contexts[i] + '</div><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
    }

    list_div.find(".list-item-select").on('click', function () {
        var button_id = (0, _jquery2.default)(this).attr('id');
        var current_context = button_id.split('.')[1];
        console.log("Selected cluster: " + current_context);
        that.switch_state(that.states.loading);
        that.send({
            'action': 'change-current-context',
            'context': current_context
        });
    });

    list_div.find(".list-item-delete").on('click', function () {
        var button_id = (0, _jquery2.default)(this).attr('id');
        var current_context = button_id.split('.')[1];
        console.log("ID: " + button_id);
        console.log("Selected cluster: " + current_context);
        that.switch_state(that.states.loading);
        that.send({
            'action': 'delete-current-context',
            'context': current_context
        });
    });

    list_div.find(".list-item-share").on('click', function () {
        var button_id = (0, _jquery2.default)(this).attr('id');
        var current_context = button_id.split('.')[1];
        that.user_create_context_name = current_context;
        that.switch_state(that.states.create_users);
    });
    // for(var i = 0; i < contexts.length; i++) {
    //     if(contexts[i] == this.current_context) {
    //         $('<option>' + contexts[i] + '</option>').attr('value', contexts[i]).attr("selected", "selected").appendTo(select);
    //     }
    //     else {
    //         $('<option>' + contexts[i] + '</option>').attr('value', contexts[i]).appendTo(select);
    //     }

    // }

    // var main_div = html.find('#user_html_inputs');

    (0, _jquery2.default)('<br><br><br><br>').appendTo(list_div);

    // $('<label for="namespace_text">Namespace</label><br>').appendTo(main_div);

    // if(this.selected_namespace) {
    //     var namespace_input = $('<input/>')
    //         .attr('name', 'namespace_text')
    //         .attr('type', 'text')
    //         .attr('id', 'namespace_text')
    //         .attr('value', this.selected_namespace)
    //         .attr('placeholder', 'Namespace')
    //         .addClass('form__field')
    //         .appendTo(main_div)
    //         .focus()
    //         .change(function() {
    //             that.selected_namespace = namespace_input.val();
    //         });
    // }
    // else {
    //     var namespace_input = $('<input/>')
    //         .attr('name', 'namespace_text')
    //         .attr('type', 'text')
    //         .attr('id', 'namespace_text')
    //         .attr('placeholder', 'Namespace')
    //         .addClass('form__field')
    //         .appendTo(main_div)
    //         .focus()
    //         .change(function() {
    //             that.selected_namespace = namespace_input.val();
    //         });
    // }


    // $('<br><br>').appendTo(main_div);

    // $('<label for="svcaccount_text">ServiceAccount</label><br>').appendTo(main_div);

    // if(this.selected_svcaccount) {
    //     var svcaccount_input = $('<input/>')
    //         .attr('name', 'svcaccount_text')
    //         .attr('type', 'text')
    //         .attr('id', 'svcaccount_text')
    //         .attr('value', this.selected_svcaccount)
    //         .attr('placeholder', 'ServiceAccount')
    //         .addClass('form__field')
    //         .appendTo(main_div)
    //         .focus()
    //         .change(function() {
    //             that.selected_svcaccount = svcaccount_input.val();
    //         });
    // }
    // else {
    //     var svcaccount_input = $('<input/>')
    //         .attr('name', 'svcaccount_text')
    //         .attr('type', 'text')
    //         .attr('id', 'svcaccount_text')
    //         .attr('placeholder', 'ServiceAccount')
    //         .addClass('form__field')
    //         .appendTo(main_div)
    //         .focus()
    //         .change(function() {
    //             that.selected_svcaccount = svcaccount_input.val();
    //         });
    // }    

    // select.change(function() {
    //     that.current_context = $(this).children("option:selected").val();
    // });


    // var view_btn = html.find("#view-context-btn");
    // view_btn.on('click', $.proxy(this.change_cluster, this));

    // $('<button>')
    //     .addClass('btn-blue')
    //     .attr('id', 'select-button')
    //     .text("Add Context")
    //     .appendTo(html)
    //     .on('click', $.proxy(this.switch_state, this, this.states.create));
    // $('<label for="select-button" style="position: relative; float: right;">Add new context</label><br><br>').appendTo(html);
    (0, _jquery2.default)('<div class="fab-button" id="select-button"><i class="fa fa-plus"></i></div><br><br><br>').appendTo(html).on('click', _jquery2.default.proxy(this.switch_state, this, this.states.create));

    // $('<button>')
    //     .addClass('btn-blue')
    //     .attr('id', 'select-button')
    //     .text("Select Settings")
    //     .appendTo(footer)
    //     .on('click', $.proxy(this.change_cluster, this));
};

SwitchCluster.prototype.get_html_view_context = function () {
    console.log("Inside view modal!!");
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');
    (0, _jquery2.default)('<h4 class="modal-title">Context: ' + this.current_context + '</h4>').appendTo(header);

    (0, _jquery2.default)("<button>").addClass("back-button").attr("type", "button").text("<-").appendTo(header).on("click", _jquery2.default.proxy(this.refresh_modal, this));

    html.append('<div id="view_context"></div>');
    var div = html.find("#view_context");
    (0, _jquery2.default)('<h4 id="cluster_name">Cluster name: ' + this.view_cluster_name + '</h4><br>').appendTo(div);

    (0, _jquery2.default)('<h4 id="namespace">Namespace: ' + this.view_namespace + '</h4><br>').appendTo(div);

    (0, _jquery2.default)('<h4 id="svcaccount">Service Account: ' + this.view_svcaccount + '</h4><br>').appendTo(div);

    (0, _jquery2.default)('<div class="content"><h4 id="token" style="word-wrap: break-word;">Token: ' + this.view_token + '</h4><br>').appendTo(div);
};

SwitchCluster.prototype.select_context = function () {
    var button_id = (0, _jquery2.default)(this).attr('id');
    var current_context = button_id.split('.')[1];
    console.log("Selected cluster: " + current_context);
    this.switch_state(this.states.loading);
    this.send({
        'action': 'change-current-context',
        'context': current_context
    });
};

SwitchCluster.prototype.change_cluster = function () {
    console.log("Sending msg to kernel to change KUBECONFIG");
    console.log("Modified cluster: " + this.current_context);
    this.switch_state(this.states.loading);
    this.send({
        'action': 'get-context-settings',
        'context': this.current_context
    });
    // var header = this.modal.find('.modal-header');
    // var html = this.modal.find('.modal-body');
    // var footer = this.modal.find('.modal-footer');
    // var error_div = html.find('#setting-error');
    // error_div.remove();

    // footer.find('#select-button').attr('disabled', true);
    // header.find('.close').hide();

    // console.log("Selected namespace: " + this.selected_namespace);
    // console.log("Selected serviceaccount: " + this.selected_svcaccount);
    // this.send({
    //     'action': 'check-current-settings',
    //     'cluster': this.current_cluster,
    //     'namespace': this.selected_namespace,
    //     'svcaccount': this.selected_svcaccount
    // })
};

SwitchCluster.prototype.get_html_create_context = function () {
    console.log("Changed state");

    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');

    (0, _jquery2.default)("<button>").attr("type", "button").addClass("back-button").html("<i class='fa fa-arrow-left' aria-hidden='true'></i>").appendTo(header).on("click", _jquery2.default.proxy(this.refresh_modal, this));

    (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Add new cluster & context</span></h4>').appendTo(header);

    html.append(_create_context2.default);

    var tabs = html.find("#material-tabs");

    var active = tabs.find(".active");

    var that = this;

    console.log(active.html());

    var clusters = this.clusters;

    this.selected_tab = active.html();
    tabs.click(function () {
        that.selected_tab = (0, _jquery2.default)(".active").html();
    });

    var tab1 = html.find("#tab1");
    var tab1 = tab1.find("#other-settings");

    var tab2 = html.find("#tab2");
    // var select1 = html.find(".select-text");
    // for(var i = 0; i < clusters.length; i++) {
    //     if(clusters[i] == this.current_cluster) {
    //         $('<option>' + clusters[i] + '</option>').attr('value', clusters[i]).attr("selected", "selected").appendTo(select1);
    //     }
    //     else {
    //         $('<option>' + clusters[i] + '</option>').attr('value', clusters[i]).appendTo(select1);
    //     }
    // }

    var checkbox = html.find("#cluster-mode");
    this.checkbox_status = "unchecked";
    checkbox.change(function () {
        if ((0, _jquery2.default)(this).is(":checked")) {
            that.checkbox_status = "checked";
            tab1.find("#br1").remove();
            tab1.find("#br2").remove();
            tab1.find("#br3").remove();
            tab1.find("#catoken_text_label").remove();
            tab1.find("#catoken_text").remove();
        } else {
            that.checkbox_status = "unchecked";
            (0, _jquery2.default)('<br id="br1"><br id="br2">').appendTo(tab1);

            (0, _jquery2.default)('<label for="catoken_text" id="catoken_text_label">CA Token (Base64)</label><br id="br3">').appendTo(tab1);

            if (that.local_selected_catoken) {
                var catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'catoken_text').attr('value', that.local_selected_catoken).attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab1).change(function () {
                    that.local_selected_catoken = catoken_input.val();
                });
            } else {
                var catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'catoken_text').attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab1).change(function () {
                    that.local_selected_catoken = catoken_input.val();
                });
            }
        }
    });

    (0, _jquery2.default)('<label for="clustername_text" id="clustername_text_label">Cluster name</label><br>').appendTo(tab1);

    if (this.local_selected_clustername) {
        var clustername_input = (0, _jquery2.default)('<input required/>').attr('name', 'clustername_text').attr('type', 'text').attr("required", "required").attr('id', 'clustername_text').attr('value', this.local_selected_clustername).attr('placeholder', 'Cluster name').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_clustername = clustername_input.val();
        });
    } else {
        var clustername_input = (0, _jquery2.default)('<input required/>').attr('name', 'clustername_text').attr('type', 'text').attr("required", "required").attr('id', 'clustername_text').attr('placeholder', 'Cluster name').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_clustername = clustername_input.val();
        });
    }

    (0, _jquery2.default)('<br><br>').appendTo(tab1);

    (0, _jquery2.default)('<label for="ip_text" id="ip_text_label">Server IP</label><br>').appendTo(tab1);

    if (this.local_selected_ip) {
        var ip_input = (0, _jquery2.default)('<input/>').attr('name', 'ip_text').attr('type', 'text').attr("required", "required").attr('id', 'ip_text').attr('value', this.local_selected_ip).attr('placeholder', 'Server IP').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_ip = ip_input.val();
        });
    } else {
        var ip_input = (0, _jquery2.default)('<input/>').attr('name', 'ip_text').attr('type', 'text').attr("required", "required").attr('id', 'ip_text').attr('placeholder', 'Server IP').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_ip = ip_input.val();
        });
    }

    (0, _jquery2.default)('<br><br>').appendTo(tab1);

    (0, _jquery2.default)('<label for="token_text" id="token_text_label">Token</label><br>').appendTo(tab1);

    if (this.local_selected_token) {
        var token_input = (0, _jquery2.default)('<input/>').attr('name', 'token_text').attr('type', 'text').attr("required", "required").attr('id', 'token_text').attr('value', this.local_selected_token).attr('placeholder', 'Token').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_token = token_input.val();
        });
    } else {
        var token_input = (0, _jquery2.default)('<input/>').attr('name', 'token_text').attr('type', 'text').attr("required", "required").attr('id', 'token_text').attr('placeholder', 'Token').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_token = token_input.val();
        });
    }

    (0, _jquery2.default)('<br id="br1"><br id="br2">').appendTo(tab1);

    (0, _jquery2.default)('<label for="catoken_text" id="catoken_text_label">CA Token (Base64)</label><br id="br3">').appendTo(tab1);

    if (this.local_selected_catoken) {
        var catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'catoken_text').attr('value', this.local_selected_catoken).attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_catoken = catoken_input.val();
        });
    } else {
        var catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'catoken_text').attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab1).change(function () {
            that.local_selected_catoken = catoken_input.val();
        });
    }

    (0, _jquery2.default)('<label for="openstack_clustername_text" id="openstack_clustername_text_label">Cluster name</label><br>').appendTo(tab2);

    if (this.openstack_selected_clustername) {
        var openstack_clustername_input = (0, _jquery2.default)('<input required/>').attr('name', 'openstack_clustername_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_clustername_text').attr('value', this.openstack_selected_clustername).attr('placeholder', 'Cluster name').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_clustername = openstack_clustername_input.val();
        });
    } else {
        var openstack_clustername_input = (0, _jquery2.default)('<input required/>').attr('name', 'openstack_clustername_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_clustername_text').attr('placeholder', 'Cluster name').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_clustername = openstack_clustername_input.val();
        });
    }

    (0, _jquery2.default)('<br><br>').appendTo(tab2);

    (0, _jquery2.default)('<label for="openstack_ip_text" id="openstack_ip_text_label">Server IP</label><br>').appendTo(tab2);

    if (this.openstack_selected_ip) {
        var openstack_ip_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_ip_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_ip_text').attr('value', this.openstack_selected_ip).attr('placeholder', 'Server IP').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_ip = openstack_ip_input.val();
        });
    } else {
        var openstack_ip_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_ip_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_ip_text').attr('placeholder', 'Server IP').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_ip = openstack_ip_input.val();
        });
    }

    (0, _jquery2.default)('<br><br>').appendTo(tab2);

    (0, _jquery2.default)('<label for="openstack_ostoken_text" id="openstack_ostoken_text_label">OS Token</label><br>').appendTo(tab2);

    if (this.openstack_selected_ostoken) {
        var openstack_ostoken_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_ostoken_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_ostoken_text').attr('value', this.openstack_selected_ostoken).attr('placeholder', 'OS Token').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_ostoken = openstack_ostoken_input.val();
        });
    } else {
        var openstack_ostoken_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_ostoken_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_ostoken_text').attr('placeholder', 'OS Token').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_ostoken = openstack_ostoken_input.val();
        });
    }

    (0, _jquery2.default)('<br><br>').appendTo(tab2);

    (0, _jquery2.default)('<label for="openstack_catoken_text" id="openstack_catoken_text_label">CA Token (Base64)</label><br>').appendTo(tab2);

    if (this.openstack_selected_catoken) {
        var openstack_catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_catoken_text').attr('value', this.openstack_selected_catoken).attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_catoken = openstack_catoken_input.val();
        });
    } else {
        var openstack_catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_catoken_text').attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab2).change(function () {
            that.openstack_selected_catoken = openstack_catoken_input.val();
        });
    }

    // select1.change(function() {
    //     that.current_cluster = $(this).children("option:selected").val();
    // });
};

SwitchCluster.prototype.create_context = function () {
    var header = this.modal.find('.modal-header');
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    var error_div = html.find('#setting-error');
    error_div.remove();
    // this.switch_state(this.states.loading);
    if (this.selected_tab == "local") {
        if (this.checkbox_status == "unchecked") {
            if (!this.local_selected_clustername || !this.local_selected_ip || !this.local_selected_token || !this.local_selected_catoken) {
                this.send({
                    'action': 'show-error'
                });
                return;
            }
        } else {
            if (!this.local_selected_clustername || !this.local_selected_ip || !this.local_selected_token) {
                this.send({
                    'action': 'show-error'
                });
                return;
            }
        }
    } else if (this.selected_tab == "openstack") {
        if (!this.openstack_selected_catoken || !this.openstack_selected_clustername || !this.openstack_selected_ip) {
            this.send({
                'action': 'show-error'
            });
            return;
        }
    }
    // var form = html.find("#local-form");
    // form.submit();

    footer.find('#select-button').attr('disabled', true);
    header.find('.close').hide();

    // this.local_selected_namespace = "sahil";
    // this.local_selected_svcaccount = "sahil";
    // this.local_selected_contextname = this.local_selected_clustername + "-" + this.local_selected_namespace + "-" + this.local_selected_svcaccount + "-context";

    // console.log("Selected namespace: " + this.local_selected_namespace);
    // console.log("Selected serviceaccount: " + this.local_selected_svcaccount);
    console.log("Selected token: " + this.local_selected_token);
    console.log("Selected catoken: " + this.local_selected_catoken);
    // console.log("Selected context name: " + this.local_selected_contextname);
    console.log("Selected tab: " + this.selected_tab);
    // console.log("Selected cluster: " + this.current_cluster);
    console.log("Insecure server: ", this.checkbox_status);
    // console.log("Insecure server: ", this.insecure_server);

    console.log("Selected openstack os token: ", this.openstack_selected_ostoken);
    console.log("Selected openstack cluster: ", this.openstack_selected_clustername);
    console.log("Selected openstack server ip: ", this.openstack_selected_ip);
    console.log("Selected openstack ca token: ", this.openstack_selected_catoken);

    // this.switch_state(this.states.loading);
    if (this.selected_tab == "local") {
        if (this.checkbox_status == "unchecked") {
            this.send({
                'action': 'add-context-cluster',
                'token': this.local_selected_token,
                'tab': this.selected_tab,
                'catoken': this.local_selected_catoken,
                'cluster_name': this.local_selected_clustername,
                'ip': this.local_selected_ip,
                'insecure_server': "false"
            });
        } else {
            this.send({
                'action': 'add-context-cluster',
                'token': this.local_selected_token,
                'tab': this.selected_tab,
                'cluster_name': this.local_selected_clustername,
                'ip': this.local_selected_ip,
                'insecure_server': "true"
            });
        }
    } else if (this.selected_tab == "openstack") {
        this.send({
            'action': 'add-context-cluster',
            'ostoken': this.openstack_selected_ostoken,
            'tab': this.selected_tab,
            'catoken': this.openstack_selected_catoken,
            'cluster_name': this.openstack_selected_clustername,
            'ip': this.openstack_selected_ip
        });
    }
};

SwitchCluster.prototype.get_html_create_users = function () {
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');

    var that = this;

    html.append(_user_create2.default);

    (0, _jquery2.default)("<button>").attr("type", "button").addClass("back-button").html("<i class='fa fa-arrow-left' aria-hidden='true'></i>").appendTo(header).on("click", _jquery2.default.proxy(this.refresh_modal, this));

    (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Grant access</span></h4>').appendTo(header);

    var user_create_div = html.find("#user_create_div");
    (0, _jquery2.default)('<br><label for="user_create_input" id="user_create_input_label">Username</label><br>').appendTo(user_create_div);

    var user_create_input = (0, _jquery2.default)('<input/>').attr('name', 'user_create_input').attr('type', 'text').attr("required", "required").attr('id', 'user_create_input').attr('placeholder', 'Username').addClass('form__field').appendTo(user_create_div).change(function () {
        that.user_create_input = user_create_input.val();
    });

    (0, _jquery2.default)('<br><br>').appendTo(user_create_div);

    (0, _jquery2.default)('<label for="user_email_create_input" id="user_email_create_input_label">Email</label><br>').appendTo(user_create_div);

    var user_email_create_input = (0, _jquery2.default)('<input/>').attr('name', 'user_email_create_input').attr('type', 'text').attr("required", "required").attr('id', 'user_email_create_input').attr('placeholder', 'Email').addClass('form__field').appendTo(user_create_div).change(function () {
        that.user_email_create_input = user_email_create_input.val();
    });
};

SwitchCluster.prototype.create_users = function () {

    if (!this.user_create_input || !this.user_email_create_input) {
        this.send({
            'action': 'show-error'
        });
        return;
    }

    console.log("Username: " + this.user_create_input);
    console.log("Email: " + this.user_email_create_input);
    console.log("Selected context: " + this.user_create_context_name);

    var header = this.modal.find('.modal-header');
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    var error_div = html.find('#setting-error');
    error_div.remove();

    this.switch_state(this.states.loading);
    this.send({
        'action': 'create-user',
        'username': this.user_create_input,
        'email': this.user_email_create_input,
        'context': this.user_create_context_name
    });
};

SwitchCluster.prototype.get_html_loading = function () {
    var html = this.modal.find('.modal-body');

    var flexbox = (0, _jquery2.default)('<div>').addClass('loading-flexbox').appendTo(html);

    var loading = (0, _jquery2.default)('<div>').addClass('loading-div').appendTo(flexbox);

    (0, _jquery2.default)('<div>').addClass('nb-spinner').appendTo(loading);

    // $('<div>')
    //     .addClass('dbl-spinner--2')
    //     .appendTo(loading);
};

SwitchCluster.prototype.redirect = function () {
    window.location.href = "http://spark.apache.org/";
};

SwitchCluster.prototype.on_comm_msg = function (msg) {
    if (msg.content.data.msgtype == 'context-select') {
        console.log("Got message from frontend: " + msg.content.data.active_context);
        this.current_context = msg.content.data.active_context;
        this.contexts = msg.content.data.contexts;
        this.current_cluster = msg.content.data.current_cluster;
        this.clusters = msg.content.data.clusters;
        this.delete_list = msg.content.data.delete_list;
        this.admin_list = msg.content.data.admin_list;
        this.switch_state(this.states.select);
        this.send({
            'action': 'get-connection-detail'
        });
        // this.switch_state(this.states.select);
    } else if (msg.content.data.msgtype == 'authentication-successfull') {
        console.log("Authentication successfull");
        this.hide_close = false;
        this.modal.modal('hide');
        this.send({
            'action': 'get-connection-detail'
        });
        console.log("Authentication successfull");
    } else if (msg.content.data.msgtype == 'authentication-unsuccessfull') {
        console.log("Authentication unsuccessfull");
        this.hide_close = false;
        // this.open_modal();
        var html = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');
        (0, _jquery2.default)('<div id="setting-error"><br><h4 style="color: red;">You cannot use these settings. Please contact your admin</h4></div>').appendTo(html);

        console.log("Authentication unsuccessfull");

        footer.find('#select-button').attr('disabled', false);
        header.find('.close').show();
    } else if (msg.content.data.msgtype == 'context-info') {
        this.view_cluster_name = msg.content.data.cluster_name;
        this.view_svcaccount = msg.content.data.svcaccount;
        this.view_namespace = msg.content.data.namespace;
        this.view_token = msg.content.data.token;

        this.switch_state(this.states.view);
    } else if (msg.content.data.msgtype == 'added-context-successfully') {

        this.local_selected_namespace = undefined;
        this.local_selected_svcaccount = undefined;
        this.local_selected_token = undefined;
        this.local_selected_catoken = undefined;
        this.local_selected_contextname = undefined;
        this.selected_tab = undefined;
        this.checkbox_status = undefined;
        this.insecure_server = undefined;
        this.local_selected_clustername = undefined;
        this.local_selected_ip = undefined;
        console.log("Added context successfull");
        this.hide_close = false;
        this.refresh_modal();
        this.send({
            'action': 'get-connection-detail'
        });
        console.log("Added context successfull");
    } else if (msg.content.data.msgtype == 'added-context-unsuccessfully') {
        console.log("Added context unsuccessfull");
        // this.switch_state(this.states.create);
        this.hide_close = false;
        var html = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');

        var that = this;
        // var tab = msg.content.data.tab;

        // if(tab == 'local')
        //     var tab_html = html.find("#tab1");
        // else if(tab == 'openstack')
        //     var tab_html = html.find("#tab2");
        // else if(tab == 'gcloud')
        //     var tab_html = html.find("#tab3");
        // else
        //     var tab_html = html.find("#tab4");

        this.modal.find(".modal-content").attr("style", "opacity: 0;");

        this.modal2 = _dialog2.default.modal({
            notebook: _namespace2.default.notebook,
            keyboard_manager: _namespace2.default.keyboard_manager,
            title: 'Error',
            body: msg.content.data.error
        });

        this.modal2.on('hide.bs.modal', function () {
            that.modal.find(".modal-content").attr("style", "opacity: 1;");
        });

        // var error = msg.content.data.error;
        // $('<div id="setting-error"><br><h4 style="color: red;">' + error + '</h4></div>').appendTo(tab_html);

        console.log("Added context unsuccessfull");

        footer.find('#select-button').attr('disabled', false);
        header.find('.close').show();
    } else if (msg.content.data.msgtype == 'changed-current-context') {
        this.hide_close = false;
        this.modal.modal('hide');
        this.send({
            'action': 'get-connection-detail'
        });
    } else if (msg.content.data.msgtype == 'connection-details') {
        var context = msg.content.data.context;
        this.toolbar_button.text("Connected: " + context);
    } else if (msg.content.data.msgtype == 'connection-details-error') {
        this.toolbar_button.text("Not connected");
    } else if (msg.content.data.msgtype == 'deleted-context-successfully') {
        this.modal.modal('hide');
        this.switch_state(this.states.create);
        this.send({
            'action': 'get-connection-detail'
        });
    } else if (msg.content.data.msgtype == 'added-user-unsuccessfully') {
        // this.switch_state(this.states.create_users);
        var html = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');
        var that = this;

        this.modal.find(".modal-content").attr("style", "opacity: 0;");

        this.modal2 = _dialog2.default.modal({
            notebook: _namespace2.default.notebook,
            keyboard_manager: _namespace2.default.keyboard_manager,
            title: 'Error',
            body: msg.content.data.error
        });

        this.modal2.on('hide.bs.modal', function () {
            that.modal.find(".modal-content").attr("style", "opacity: 1;");
        });
        // var error = msg.content.data.error;
        // $('<div id="setting-error"><br><h4 style="color: red;">' + error + '</h4></div>').appendTo(html);
    } else if (msg.content.data.msgtype == 'added-user-successfully') {
        this.user_create_input = undefined;
        this.user_email_create_input = undefined;
        this.user_create_context_name = undefined;
        this.switch_state(this.states.create_users);
    }
};

SwitchCluster.prototype.switch_state = function (new_state) {
    this.state = new_state;

    if (this.modal) {
        _namespace2.default.keyboard_manager.disable();
        var header = this.modal.find('.modal-header');
        var body = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');

        header.html('');
        body.html('');
        footer.html('');
        // $('<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">').appendTo(header);

        (0, _jquery2.default)('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>').appendTo(header);

        new_state.get_html();

        _jquery2.default.each(new_state.buttons, function (name, options) {
            (0, _jquery2.default)('<button>').addClass('btn-blue').attr('id', 'select-button').on('click', options.click).text(name).appendTo(footer);
        });

        // if (new_state.hide_close) {
        //     header.find('.close').hide();
        // } else {
        //     header.find('.close').show();
        // }
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
    // conn.send({
    //     'action': 'get-connection-detail',
    // });
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

module.exports = "<br> <div id=user_html_inputs> </div>";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = " <header> <div id=material-tabs> <a id=tab1-tab href=#tab1 class=active value=local>local</a> <a id=tab2-tab href=#tab2 value=openstack>openstack</a> <a id=tab3-tab href=#tab3 value=gcloud>gcloud</a> <a id=tab4-tab href=#tab4 value=aws>aws</a> <span class=yellow-bar></span> </div> </header> <div class=tab-content> <div id=tab1> <div id=cluster-settings> <label class=pure-material-checkbox> <input type=checkbox id=cluster-mode> <span>Disable TLS support</span> </label> </div> <br> <hr> <br> <div id=other-settings> </div> </div> <div id=tab2> </div> <div id=tab3> <p>Third tab content.</p> </div> <div id=tab4> <p>Third tab content.</p> </div> </div> <script src=https://code.jquery.com/jquery-3.4.1.min.js integrity=\"sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=\" crossorigin=anonymous></script> <script>$(document).ready(function(){$(\"#material-tabs\").each(function(){var t,i,a=$(this).find(\"a\");(t=$(a[0])).addClass(\"active\"),i=$(t[0].hash),a.not(t).each(function(){$(this.hash).hide()}),$(this).on(\"click\",\"a\",function(a){t.removeClass(\"active\"),i.hide(),t=$(this),i=$(this.hash),t.addClass(\"active\"),i.show(),a.preventDefault()})})})</script> ";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div id=user_create_div style=\"margin:0 auto\"> </div>";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(11)(content, options);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(10)(false);
// imports


// module
exports.push([module.i, ".btn-blue {\n    position: relative;\n  \n    display: block;\n    margin: auto;\n    padding: 10px;\n\n    overflow: hidden;\n  \n    border-width: 0;\n    outline: none;\n    border-radius: 2px;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\n    \n    background-color: #03A9F4;\n    color: #ecf0f1;\n    \n    transition: background-color .3s;\n}\n\n.modal-title {\n    margin: 0;\n    line-height: 1.42857143;\n    font-size: 20px;\n}\n\n\n.wrap {\n    position: absolute;\n    right: 0;\n    top: 40%;\n    width: 350px;\n    left: 0;\n    margin: 25px auto;\n  }\n  \n  /* select starting stylings ------------------------------*/\n  .select {\n    font-family:\n      'Roboto','Helvetica','Arial',sans-serif;\n      position: relative;\n      width: 410px;\n      margin-top: 15px;\n      margin: auto;\n  }\n  \n  .select-text {\n      position: flex;\n      font-family: inherit;\n      background-color: transparent;\n      width: 350px;\n      padding: 10px 10px 10px 0;\n      font-size: 18px;\n      border-radius: 0;\n      border: none;\n      border-bottom: 1px solid rgba(0,0,0, 0.12);\n  }\n  \n  /* Remove focus */\n  .select-text:focus {\n      outline: none;\n      border-bottom: 1px solid rgba(0,0,0, 0);\n  }\n  \n      /* Use custom arrow */\n  .select .select-text {\n      appearance: none;\n      -webkit-appearance:none\n  }\n  \n  .select:after {\n      position: absolute;\n      top: 45px;\n      right: 75px;\n      /* Styling the down arrow */\n      width: 0;\n      height: 0;\n      padding: 0;\n      content: '';\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 6px solid rgba(0, 0, 0, 0.12);\n      pointer-events: none;\n  }\n  \n  \n  /* LABEL ======================================= */\n  .select-label {\n      color: rgba(0,0,0, 0.26);\n      font-size: 18px;\n      font-weight: normal;\n      position: absolute;\n      pointer-events: none;\n      left: 0;\n      top: 10px;\n      transition: 0.2s ease all;\n  }\n  \n  /* active state */\n  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {\n      color: rgb(0, 0, 0);\n      top: -20px;\n      transition: 0.2s ease all;\n      font-size: 14px;\n  }\n  \n  /* BOTTOM BARS ================================= */\n  .select-bar {\n      position: relative;\n      display: block;\n      width: 350px;\n  }\n  \n  .select-bar:before, .select-bar:after {\n      content: '';\n      height: 2px;\n      width: 0;\n      bottom: 1px;\n      position: absolute;\n      background: #2F80ED;\n      transition: 0.2s ease all;\n  }\n  \n  .select-bar:before {\n      left: 50%;\n  }\n  \n  .select-bar:after {\n      right: 50%;\n  }\n  \n  /* active state */\n  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {\n      width: 50%;\n  }\n  \n  /* HIGHLIGHTER ================================== */\n  .select-highlight {\n      position: absolute;\n      height: 60%;\n      width: 100px;\n      top: 25%;\n      left: 0;\n      pointer-events: none;\n      opacity: 0.5;\n  }\n\n\n\n.form__field {\n    font-family: inherit;\n    width: 50%;\n    border: 0;\n    border-bottom: 1px solid #d2d2d2;\n    outline: 0;\n    font-size: 16px;\n    color: #212121;\n    padding: 7px 0;\n    background: transparent;\n    transition: border-color 0.2s;\n}\n  \n.form__field::placeholder {\n    color: transparent;\n}\n\n/* label,\n.form__field:placeholder-shown ~ .form__label {\n    font-size: 16px;\n    cursor: text;\n    top: 20px;\n}\n\n.form__field:focus ~ .form__label {\n  position: absolute;\n  top: 0;\n  display: block;\n  transition: 0.2s;\n  font-size: 12px;\n  color: #9b9b9b;\n}\n\n.form__field:focus ~ .form__label {\n  color: #212121;\n} */\n\n.form__field:focus {\n  padding-bottom: 6px;\n  border-bottom: 2px solid #212121;\n}\n\n\n\n.container-tabs{\n\theight:500px;\n\twidth:100%;\n\tpadding:0;\n\tmargin:10px;\n\tborder-radius:5px;\n\tbox-shadow: 0 2px 3px rgba(0,0,0,.3)\n\t\n}\n\nheader {\n\t\tposition: relative;\n\t  text-align: center;\n}\n\n.hide {\n\t\tdisplay: none;\n}\n\n.tab-content {\n\t\tpadding:25px;\n}\n\n#material-tabs {\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t  /* padding:0; */\n        border-bottom: 1px solid #e0e0e0;\n        /* margin: 0 auto; */\n}\n\n#material-tabs>a {\n\t\tposition: relative;\n\t display:inline-block;\n\t\ttext-decoration: none;\n\t\tpadding: 22px;\n\t\ttext-transform: uppercase;\n\t\tfont-size: 14px;\n\t\tfont-weight: 600;\n\t\tcolor: #424f5a;\n\t\ttext-align: center;\n\t\t/*outline:;*/\n}\n\n#material-tabs>a.active {\n\t\tfont-weight: 700;\n\t\toutline:none;\n}\n\n#material-tabs>a:not(.active):hover {\n\t\tbackground-color: inherit;\n\t\tcolor: #7c848a;\n}\n\n@media only screen and (max-width: 520px) {\n\t\t.nav-tabs#material-tabs>li>a {\n\t\t\t\tfont-size: 11px;\n\t\t}\n}\n\n.yellow-bar {\n\t\tposition: absolute;\n\t\tz-index: 10;\n\t\tbottom: 0;\n\t\theight: 3px;\n\t\tbackground: #458CFF;\n\t\tdisplay: block;\n\t\tleft: 0;\n\t\ttransition: left .2s ease;\n\t\t-webkit-transition: left .2s ease;\n\t\ttransition: width .2s ease;\n\t\t-webkit-transition: width .2s ease;\n}\n\n#tab1-tab.active ~ span.yellow-bar {\n\t\tleft: 0;\n\t\twidth: 90px;\n}\n\n#tab2-tab.active ~ span.yellow-bar {\n\t\tleft:95px;\n\t\twidth: 130px;\n}\n\n#tab3-tab.active ~ span.yellow-bar {\n\t\tleft: 230px;\n\t\twidth: 105px;\n}\n\n#tab4-tab.active ~ span.yellow-bar {\n\t\tleft:340px;\n\t\twidth: 80px;\n}\n\n.back-button {\n    float: left;\n    font-size: 16px;\n    font-weight: bold;\n    line-height: 1;\n    color: black;\n    text-shadow: 0 1px 0 #fff;\n    /*filter: alpha(opacity=20);*/\n    opacity: 0.7;\n    margin-top: 5px;\n}\n\nbutton.back-button {\n    padding: 0;\n    cursor: pointer;\n    background: transparent;\n    border: 0;\n    -webkit-appearance: none;\n    appearance: none;\n}\n\n\n\n\n.pure-material-checkbox {\n    z-index: 0;\n    position: relative;\n    display: inline-block;\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);\n    font-family: var(--pure-material-font, \"Roboto\", \"Segoe UI\", BlinkMacSystemFont, system-ui, -apple-system);\n    font-size: 16px;\n    line-height: 1.5;\n}\n\n/* Input */\n.pure-material-checkbox > input {\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    z-index: -1;\n    position: absolute;\n    left: -10px;\n    top: -8px;\n    display: block;\n    margin: 0;\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);\n    box-shadow: none;\n    outline: none;\n    opacity: 0;\n    transform: scale(1);\n    pointer-events: none;\n    transition: opacity 0.3s, transform 0.2s;\n}\n\n/* Span */\n.pure-material-checkbox > span {\n    display: inline-block;\n    width: 100%;\n    cursor: pointer;\n}\n\n/* Box */\n.pure-material-checkbox > span::before {\n    content: \"\";\n    display: inline-block;\n    box-sizing: border-box;\n    margin: 3px 11px 3px 1px;\n    border: solid 2px; /* Safari */\n    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);\n    border-radius: 2px;\n    width: 18px;\n    height: 18px;\n    vertical-align: top;\n    transition: border-color 0.2s, background-color 0.2s;\n}\n\n/* Checkmark */\n.pure-material-checkbox > span::after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: 3px;\n    left: 1px;\n    width: 10px;\n    height: 5px;\n    border: solid 2px transparent;\n    border-right: none;\n    border-top: none;\n    transform: translate(3px, 4px) rotate(-45deg);\n}\n\n/* Checked, Indeterminate */\n.pure-material-checkbox > input:checked,\n.pure-material-checkbox > input:indeterminate {\n    background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n}\n\n.pure-material-checkbox > input:checked + span::before,\n.pure-material-checkbox > input:indeterminate + span::before {\n    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n    background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n}\n\n.pure-material-checkbox > input:checked + span::after,\n.pure-material-checkbox > input:indeterminate + span::after {\n    border-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n}\n\n.pure-material-checkbox > input:indeterminate + span::after {\n    border-left: none;\n    transform: translate(4px, 3px);\n}\n\n/* Hover, Focus */\n.pure-material-checkbox:hover > input {\n    opacity: 0.04;\n}\n\n.pure-material-checkbox > input:focus {\n    opacity: 0.12;\n}\n\n.pure-material-checkbox:hover > input:focus {\n    opacity: 0.16;\n}\n\n/* Active */\n.pure-material-checkbox > input:active {\n    opacity: 1;\n    transform: scale(0);\n    transition: transform 0s, opacity 0s;\n}\n\n.pure-material-checkbox > input:active + span::before {\n    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n}\n\n.pure-material-checkbox > input:checked:active + span::before {\n    border-color: transparent;\n    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);\n}\n\n/* Disabled */\n.pure-material-checkbox > input:disabled {\n    opacity: 0;\n}\n\n.pure-material-checkbox > input:disabled + span {\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n    cursor: initial;\n}\n\n.pure-material-checkbox > input:disabled + span::before {\n    border-color: currentColor;\n}\n\n.pure-material-checkbox > input:checked:disabled + span::before,\n.pure-material-checkbox > input:indeterminate:disabled + span::before {\n    border-color: transparent;\n    background-color: currentColor;\n}\n\n\n\n.fab-button {\n    position: relative;\n    float: right;\n    color: #fff;\n    padding: 15px 20px;\n    border-radius: 50%;\n    background-color: #03A9F4;\n    cursor: pointer;\n    box-shadow:0px 3px 3px #BDBDBD;\n  }\n\n/* .kubernetes-icon {\n    background-image: url('../images/2e23992c9d.png');\n    background-size: 100%;\n} */\n\n.cluster-list-div {\n    display: flex;\n    flex-direction: row;\n    /* border: 1px solid black; */\n\n}\n\n.cluster-list-div > .list-item-delete {\n    width: 5px;\n}\n\n.cluster-list-div > .list-item-text {\n    flex: auto;\n    font-size: 17px;\n    margin-top: 6px;\n}\n\n.cluster-list-div > .list-item-share {\n    margin-top: 2px;\n    width: 5px;\n}\n\n.cluster-list-div > .list-item-select {\n    margin-top: 2px;\n    width: 7rem;\n}\n\n.cluster-list-div > .connect-symbol {\n    margin-top: 10px;\n    width: 3rem;\n    color: #008017;\n}\n\n\n\n.pure-material-button-text {\n    position: relative;\n    display: inline-block;\n    box-sizing: border-box;\n    border: none;\n    border-radius: 4px;\n    padding: 0 8px;\n    min-width: 64px;\n    height: 36px;\n    vertical-align: middle;\n    text-align: center;\n    text-overflow: ellipsis;\n    text-transform: uppercase;\n    color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n    background-color: transparent;\n    font-family: var(--pure-material-font, \"Roboto\", \"Segoe UI\", BlinkMacSystemFont, system-ui, -apple-system);\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 36px;\n    overflow: hidden;\n    outline: none;\n    cursor: pointer;\n}\n\n.pure-material-button-text::-moz-focus-inner {\n    border: none;\n}\n\n/* Overlay */\n.pure-material-button-text::before {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: currentColor;\n    opacity: 0;\n    transition: opacity 0.2s;\n}\n\n/* Ripple */\n.pure-material-button-text::after {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    border-radius: 50%;\n    padding: 50%;\n    width: 32px;\n    height: 32px;\n    background-color: currentColor;\n    opacity: 0;\n    transform: translate(-50%, -50%) scale(1) ;\n    transition: opacity 1s, transform 0.5s;\n}\n\n/* Hover, Focus */\n.pure-material-button-text:hover::before {\n    opacity: 0.04;\n}\n\n.pure-material-button-text:focus::before {\n    opacity: 0.12;\n}\n\n.pure-material-button-text:hover:focus::before {\n    opacity: 0.16;\n}\n\n/* Active */\n.pure-material-button-text:active::after {\n    opacity: 0.16;\n    transform: translate(-50%, -50%) scale(0);\n    transition: transform 0s;\n}\n\n/* Disabled */\n.pure-material-button-text:disabled {\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n    background-color: transparent;\n    cursor: initial;\n}\n\n.pure-material-button-text:disabled::before {\n    opacity: 0;\n}\n\n.pure-material-button-text:disabled::after {\n    opacity: 0;\n}\n\n\n#user_html_inputs {\n    max-height: 350px;\n    overflow-y: auto;\n}\n\n\n.nb-spinner {\n    width: 75px;\n    height: 75px;\n    background: transparent;\n    border-top: 4px solid #009688;\n    border-right: 4px solid transparent;\n    border-radius: 50%;\n    -webkit-animation: 1s spin linear infinite;\n    animation: 1s spin linear infinite;\n}\n\n\n.loading-flexbox {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n}\n\n.loading-flexbox > .loading-div {\n    width: 300px;\n    height: 300px;\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    margin: 0;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    overflow: hidden;\n}\n\n-webkit-@keyframes spin {\n  -webkit-from {\n    -webkit-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  -webkit-to {\n    -webkit-transform: rotate(360deg);\n    -ms-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 10 */
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
/* 11 */
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

var	fixUrls = __webpack_require__(12);

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
/* 12 */
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