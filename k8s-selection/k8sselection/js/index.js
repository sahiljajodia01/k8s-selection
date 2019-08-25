(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"), require("require"), require("base/js/keyboard"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "base/js/dialog", "base/js/namespace", "base/js/events", "require", "base/js/keyboard"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("base/js/dialog"), require("base/js/namespace"), require("base/js/events"), require("require"), require("base/js/keyboard")) : factory(root["jquery"], root["base/js/dialog"], root["base/js/namespace"], root["base/js/events"], root["require"], root["base/js/keyboard"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/k8s.png";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.load_ipython_extension = undefined;

var _jquery = __webpack_require__(2);

var _jquery2 = _interopRequireDefault(_jquery);

var _dialog = __webpack_require__(3);

var _dialog2 = _interopRequireDefault(_dialog);

var _namespace = __webpack_require__(4);

var _namespace2 = _interopRequireDefault(_namespace);

var _events = __webpack_require__(5);

var _events2 = _interopRequireDefault(_events);

var _require = __webpack_require__(6);

var _require2 = _interopRequireDefault(_require);

var _keyboard = __webpack_require__(7);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _user = __webpack_require__(8);

var _user2 = _interopRequireDefault(_user);

var _create_context = __webpack_require__(9);

var _create_context2 = _interopRequireDefault(_create_context);

var _user_create = __webpack_require__(10);

var _user_create2 = _interopRequireDefault(_user_create);

__webpack_require__(11);

var _k8s = __webpack_require__(0);

var _k8s2 = _interopRequireDefault(_k8s);

var _k8s_blue = __webpack_require__(17);

var _k8s_blue2 = _interopRequireDefault(_k8s_blue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc K8sSelection object constructor
 * @constructor
 */
function K8sSelection() {

    /**
     * @desc States that are visible to the user
     */
    this.states = {
        select: {
            get_html: _jquery2.default.proxy(this.get_html_select_cluster, this)
        },
        auth: {
            get_html: _jquery2.default.proxy(this.get_html_auth, this),
            buttons: {
                'Authenticate': {
                    class: 'btn-blue size-100 auth-button',
                    click: _jquery2.default.proxy(this.authenticate, this)
                }
            }
        },
        create: {
            get_html: _jquery2.default.proxy(this.get_html_create_clusters, this),
            buttons: {
                'AddCluster': {
                    class: 'btn-blue size-100',
                    click: _jquery2.default.proxy(this.create_context, this)
                }
            }
        },
        create_users: {
            get_html: _jquery2.default.proxy(this.get_html_create_users, this),
            buttons: {
                'CreateUser': {
                    class: 'btn-blue size-100',
                    click: _jquery2.default.proxy(this.create_users, this)
                }
            }
        },
        loading: {
            get_html: _jquery2.default.proxy(this.get_html_loading, this),
            hide_close: true
        },
        error: {
            get_html: _jquery2.default.proxy(this.get_html_error, this)
        },
        cluster_details: {
            get_html: _jquery2.default.proxy(this.get_cluster_detials_view_html, this)
        }
    };

    this.comm = null;
    this.get_auth = false;
    this.is_reachable = false;
    this.is_admin = false;
    this.initial_select = true;
    this.stateConfigMap = {};
    this.openstack_tab = 'openstack';
    this.token_tab = 'sa-token';

    // Starts the communication with backend when the kernel is connected
    _events2.default.on('kernel_connected.Kernel', _jquery2.default.proxy(this.start_comm, this));
}

/**
 * @desc adds custom extension button to the Jupyter notebook.
 */
K8sSelection.prototype.add_toolbar_button = function () {
    var action = {
        help: 'Spark clusters settings',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: _jquery2.default.proxy(this.open_modal, this)
    };

    var prefix = 'K8sSelection';
    var action_name = 'show-sparkcluster-conf';
    var full_action_name = _namespace2.default.actions.register(action, action_name, prefix);
    this.toolbar_button = _namespace2.default.toolbar.add_buttons_group([full_action_name]).find('.btn');
    this.toolbar_button.html('<div id="extension_icon"></div>');
    this.toolbar_button.find("#extension_icon").css('background-image', 'url("' + _require2.default.toUrl('./' + _k8s2.default) + '")');
    this.toolbar_button.find("#extension_icon").css('width', '16px');
    this.toolbar_button.find("#extension_icon").css('height', '16px');
    this.toolbar_button.find("#extension_icon").css('margin-left', '5px');
    this.enabled = false;
};

/**
 * @desc function to handle dialog box modal of the extension
 */
K8sSelection.prototype.open_modal = function () {

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

        // Call this function when the modal shows after clicking the extension button
        this.modal.on('show.bs.modal', function () {
            that.switch_state(that.states.loading);
            console.log("Get auth: " + that.get_auth);
            that.refresh_modal();
        }).modal('show');

        // Prevents moving the dialog box when clicked on the header
        this.modal.find(".modal-header").unbind("mousedown");

        // Close the dialog box
        this.modal.on('hide.bs.modal', function () {
            return true;
        });
    }
};

/**
 * @desc refreshes the context select state
 */
K8sSelection.prototype.refresh_modal = function () {
    this.switch_state(this.states.loading);
    this.send({ 'action': 'Refresh' });
};

/**
 * @desc handler to send message to the frontend
 * @param msg - The message that we have to send to the error
 */
K8sSelection.prototype.send = function (msg) {
    this.comm.send(msg);
};

/**
 * @desc display the frontend of the select state. This is the main state and the user will interact with
 * this state the most.
 */
K8sSelection.prototype.get_html_select_cluster = function () {
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    var header = this.modal.find('.modal-header');

    (0, _jquery2.default)('<h4 class="modal-title">Spark cluster setting</h4>').appendTo(header);
    var contexts = this.contexts;
    var current_context = this.current_context;
    var template = _user2.default;
    this.hide_close = true;
    html.append(template);
    var that = this;
    var list_div = html.find("#user_html_inputs");

    if (current_context != '') {
        if (this.initial_select == true) {
            (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol" style="visibility: hidden;"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text" style="color: #C0C0C0;">' + current_context + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + current_context + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + current_context + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + current_context + '">Select</button><hr></div>').appendTo(list_div);
        } else {
            if (this.is_reachable == false) {
                (0, _jquery2.default)('<div class="cluster-list-div"><div class="not-connected-symbol"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text">' + current_context + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + current_context + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + current_context + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + current_context + '">Select</button><hr></div>').appendTo(list_div);
            } else {
                if (this.is_admin == true && this.current_cluster_auth_type == this.openstack_tab) {
                    (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text">' + current_context + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + current_context + '">X</button><button class="list-item-share pure-material-button-text" id="share.' + current_context + '"><i class="fa fa-share-alt"></i></button><button disabled class="list-item-select pure-material-button-text" id="select.' + current_context + '">Select</button><hr></div>').appendTo(list_div);
                } else {
                    (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text">' + current_context + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + current_context + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + current_context + '"><i class="fa fa-share-alt"></i></button><button disabled class="list-item-select pure-material-button-text" id="select.' + current_context + '">Select</button><hr></div>').appendTo(list_div);
                }
            }
        }
    }

    for (var i = 0; i < contexts.length; i++) {
        if (contexts[i] != current_context) {
            if (this.cluster_auth_type[i] == 'none') {
                (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol" style="visibility: hidden;"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text" style="color: #C0C0C0;">' + contexts[i] + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button disabled class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button><hr></div>').appendTo(list_div);
            } else {
                (0, _jquery2.default)('<div class="cluster-list-div"><div class="connect-symbol" style="visibility: hidden;"><i class="fa fa-circle" aria-hidden="true"></i></div><div class="list-item-text" style="color: #C0C0C0;">' + contexts[i] + '</div><button class="list-item-delete pure-material-button-text" id="delete.' + contexts[i] + '">X</button><button disabled class="list-item-share pure-material-button-text" id="share.' + contexts[i] + '"><i class="fa fa-share-alt"></i></button><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button><hr></div>').appendTo(list_div);
            }
        }
    }

    /**
     * Load more button functionality
     */
    var size_list = list_div.find(".cluster-list-div").length;
    var x = 5;
    html.find('.cluster-list-div:lt(' + size_list + ')').hide();

    if (size_list > 5) {
        html.find('.cluster-list-div:lt(' + x + ')').show();
        (0, _jquery2.default)("<div><button style=\"position: absolute; left: 45%;\" class=\"list-item-load pure-material-button-text\" id=\"load_more_button\">Load More</button></div>").appendTo(html);
    } else {
        html.find('.cluster-list-div:lt(' + size_list + ')').show();
    }

    html.find("#load_more_button").click(function () {
        x = x + 5;
        if (x < size_list) {
            html.find('.cluster-list-div:lt(' + x + 5 + ')').show();
        } else {
            html.find('.cluster-list-div:lt(' + size_list + ')').show();
            html.find("#load_more_button").hide();
        }
    });

    /**
     * Handler to get the current context and send it to the backend to change the current context in KUBECONFIG
     */
    list_div.find(".list-item-select").on('click', function () {
        that.initial_select = false;
        var button_id = (0, _jquery2.default)(this).attr('id');
        var current_context = button_id.split('.')[1];
        that.currently_selected_context = current_context;
        console.log("Selected cluster: " + current_context);

        for (var i = 0; i < that.contexts.length; i++) {
            if (that.contexts[i] == that.currently_selected_context) {
                that.currently_selected_auth_type = that.cluster_auth_type[i];
            }
        }

        if (that.currently_selected_auth_type == that.token_tab) {
            that.switch_state(that.states.loading);
            that.send({
                'action': 'change-current-context',
                'context': that.currently_selected_context,
                'tab': that.currently_selected_auth_type
            });
        } else {
            that.switch_state(that.states.loading);
            that.send({
                'action': 'check-auth-required',
                'context': that.currently_selected_context
            });
        }
    });

    /**
     * Handler to delete cluster from the list and send to the backend to delete cluster and context from KUBECONFIG
     */
    list_div.find(".list-item-delete").on('click', function () {
        var button_id = (0, _jquery2.default)(this).attr('id');
        var current_context = button_id.split('.')[1];
        that.currently_selected_context = current_context;
        console.log("ID: " + button_id);
        console.log("Selected cluster: " + current_context);
        that.close();
    });

    /**
     * Handler to change the current state to "create_users"
     */
    list_div.find(".list-item-share").on('click', function () {
        var button_id = (0, _jquery2.default)(this).attr('id');
        var current_context = button_id.split('.')[1];
        that.stateConfigMap['user_create_context_name'] = current_context;
        that.switch_state(that.states.create_users);
    });

    (0, _jquery2.default)('<br>').appendTo(list_div);

    // Adds + (Add cluster) state button
    (0, _jquery2.default)('<div class="fab-button" id="select-button"><i class="fa fa-plus"></i></div><br><br><br>').appendTo(html).on('click', _jquery2.default.proxy(this.switch_state, this, this.states.create));
};

K8sSelection.prototype.close = function () {
    console.log("Inside close function");
    _dialog2.default.modal({
        notebook: _namespace2.default.notebook,
        keyboard_manager: _namespace2.default.keyboard_manager,
        title: 'Delete Cluster',
        body: 'Are you sure you want to delete this cluster from the KUBECONFIG file?',
        buttons: {
            'Yes': {
                class: 'btn-blue size-100',
                click: _jquery2.default.proxy(this.delete_cluster, this)
            }
        }
    });
};

K8sSelection.prototype.delete_cluster = function () {
    console.log("Deleting context: " + this.currently_selected_context);
    this.switch_state(this.states.loading);
    this.send({
        'action': 'delete-current-context',
        'context': this.currently_selected_context
    });
};

/**
 * @desc display the create cluster and context frontend to the user
 */
K8sSelection.prototype.get_html_create_clusters = function () {
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');

    (0, _jquery2.default)("<button>").attr("type", "button").addClass("back-button").html("<i class='fa fa-arrow-left' aria-hidden='true'></i>").appendTo(header).on("click", _jquery2.default.proxy(this.refresh_modal, this));

    (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Add new cluster & context</span></h4>').appendTo(header);

    html.append(_create_context2.default);

    var tabs = html.find("#material-tabs");
    var active = tabs.find(".active");
    var that = this;

    console.log("Currently active state: " + active.attr('id'));

    this.selected_tab = active.attr('id');

    tabs.each(function () {

        var $active,
            $content,
            $links = (0, _jquery2.default)(this).find('a');

        $active = (0, _jquery2.default)($links[0]);
        $active.addClass('active');

        $content = (0, _jquery2.default)($active[0].hash);

        $links.not($active).each(function () {
            (0, _jquery2.default)(this.hash).hide();
        });
        // var that = that;
        (0, _jquery2.default)(this).on('click', 'a', function (e) {

            $active.removeClass('active');
            $content.hide();

            $active = (0, _jquery2.default)(this);
            $content = (0, _jquery2.default)(this.hash);

            $active.addClass('active');
            $content.show();
            that.selected_tab = $active.attr('id');
            console.log("Currently selected tab: " + that.selected_tab);

            e.preventDefault();
        });
    });

    var tab2 = html.find("#tab2");
    var tab2 = tab2.find("#other-settings");

    var tab1 = html.find("#tab1");

    // "Insecure cluster" checkbox logic for the local tab.
    var checkbox = html.find("#cluster-mode");
    this.checkbox_status = "unchecked";
    checkbox.change(function () {
        if ((0, _jquery2.default)(this).is(":checked")) {
            that.checkbox_status = "checked";
            tab2.find("#br1").remove();
            tab2.find("#br2").remove();
            tab2.find("#br3").remove();
            tab2.find("#catoken_text_label").remove();
            tab2.find("#catoken_text").remove();
        } else {
            that.checkbox_status = "unchecked";
            (0, _jquery2.default)('<br id="br1"><br id="br2">').appendTo(tab2);

            (0, _jquery2.default)('<label for="catoken_text" id="catoken_text_label">CA Token (Base64)</label><br id="br3">').appendTo(tab2);

            var catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'catoken_text').attr('value', that.stateConfigMap['local_selected_catoken']).attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab2).keypress(function (e) {
                var keycode = e.keyCode ? e.keyCode : e.which;
                if (keycode == _keyboard2.default.keycodes.enter) {
                    that.states.create.buttons.AddCluster.click();
                }
            });
        }
    });

    // Adds Cluster name input to the local tab
    (0, _jquery2.default)('<label for="clustername_text" id="clustername_text_label">Cluster name</label><br>').appendTo(tab2);

    var clustername_input = (0, _jquery2.default)('<input required/>').attr('name', 'clustername_text').attr('type', 'text').attr("required", "required").attr('id', 'clustername_text').attr('value', this.stateConfigMap['local_selected_clustername']).attr('placeholder', 'Cluster name').addClass('form__field').appendTo(tab2).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });

    // Adds Server IP input to the local tab
    (0, _jquery2.default)('<br><br>').appendTo(tab2);

    (0, _jquery2.default)('<label for="ip_text" id="ip_text_label">Server IP</label><br>').appendTo(tab2);

    var ip_input = (0, _jquery2.default)('<input/>').attr('name', 'ip_text').attr('type', 'text').attr("required", "required").attr('id', 'ip_text').attr('value', this.stateConfigMap['local_selected_ip']).attr('placeholder', 'Server IP').addClass('form__field').appendTo(tab2).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });

    // Adds Service Account Token input to the local tab
    (0, _jquery2.default)('<br><br>').appendTo(tab2);

    (0, _jquery2.default)('<label for="token_text" id="token_text_label">Service Account Token</label><br>').appendTo(tab2);

    var token_input = (0, _jquery2.default)('<input/>').attr('name', 'token_text').attr('type', 'text').attr("required", "required").attr('id', 'token_text').attr('value', this.stateConfigMap['local_selected_token']).attr('placeholder', 'Service Account Token').addClass('form__field').appendTo(tab2).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });

    // Adds CA Token input to the local tab is insecure checkbox is unchecked
    (0, _jquery2.default)('<br id="br1"><br id="br2">').appendTo(tab2);

    (0, _jquery2.default)('<label for="catoken_text" id="catoken_text_label">CA Token (Base64)</label><br id="br3">').appendTo(tab2);

    var catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'catoken_text').attr('value', this.stateConfigMap['local_selected_catoken']).attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab2).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });

    // Adds Cluster name input to the openstack tab
    (0, _jquery2.default)('<label for="openstack_clustername_text" id="openstack_clustername_text_label">Cluster name</label><br>').appendTo(tab1);

    var openstack_clustername_input = (0, _jquery2.default)('<input required/>').attr('name', 'openstack_clustername_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_clustername_text').attr('value', this.stateConfigMap['openstack_selected_clustername']).attr('placeholder', 'Cluster name').addClass('form__field').appendTo(tab1).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });

    // Adds Server IP input to the openstack tab
    (0, _jquery2.default)('<br><br>').appendTo(tab1);

    (0, _jquery2.default)('<label for="openstack_ip_text" id="openstack_ip_text_label">Server IP</label><br>').appendTo(tab1);

    var openstack_ip_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_ip_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_ip_text').attr('value', this.stateConfigMap['openstack_selected_ip']).attr('placeholder', 'Server IP').addClass('form__field').appendTo(tab1).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });

    // Adds CA Token input to the openstack tab
    (0, _jquery2.default)('<br><br>').appendTo(tab1);

    (0, _jquery2.default)('<label for="openstack_catoken_text" id="openstack_catoken_text_label">CA Token (Base64)</label><br>').appendTo(tab1);

    var openstack_catoken_input = (0, _jquery2.default)('<input/>').attr('name', 'openstack_catoken_text').attr('type', 'text').attr("required", "required").attr('id', 'openstack_catoken_text').attr('value', this.stateConfigMap['openstack_selected_catoken']).attr('placeholder', 'CA Token (Base64)').addClass('form__field').appendTo(tab1).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create.buttons.AddCluster.click();
        }
    });
};

/**
 * @desc Handler for getting all the inputs from the frontend and sending it to the backend for creating context
 * and cluster
 */
K8sSelection.prototype.create_context = function () {
    var header = this.modal.find('.modal-header');
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');

    if (this.selected_tab == this.token_tab) {
        this.stateConfigMap['local_selected_catoken'] = this.modal.find('input[name="catoken_text"]').val();
        this.stateConfigMap['local_selected_clustername'] = this.modal.find('input[name="clustername_text"]').val();
        this.stateConfigMap['local_selected_ip'] = this.modal.find('input[name="ip_text"]').val();
        this.stateConfigMap['local_selected_token'] = this.modal.find('input[name="token_text"]').val();
    } else if (this.selected_tab == this.openstack_tab) {
        this.stateConfigMap['openstack_selected_clustername'] = this.modal.find('input[name="openstack_clustername_text"]').val();
        this.stateConfigMap['openstack_selected_catoken'] = this.modal.find('input[name="openstack_catoken_text"]').val();
        this.stateConfigMap['openstack_selected_ip'] = this.modal.find('input[name="openstack_ip_text"]').val();
    }

    // Checks whether any input is empty before sending it to backend
    if (this.selected_tab == this.token_tab) {
        // Logging all the input from frontend just for debugging purposes.
        console.log("Selected clustername: " + this.stateConfigMap['local_selected_clustername']);
        console.log("Selected ip: " + this.stateConfigMap['local_selected_ip']);
        console.log("Selected token: " + this.stateConfigMap['local_selected_token']);
        console.log("Selected catoken: " + this.stateConfigMap['local_selected_catoken']);

        if (this.checkbox_status == "unchecked") {
            if (!this.stateConfigMap['local_selected_clustername'] || !this.stateConfigMap['local_selected_ip'] || !this.stateConfigMap['local_selected_token'] || !this.stateConfigMap['local_selected_catoken']) {
                this.get_html_error("Please fill all the required fields.", this.states.create);
                return;
            }
        } else {
            if (!this.stateConfigMap['local_selected_clustername'] || !this.stateConfigMap['local_selected_ip'] || !this.stateConfigMap['local_selected_token']) {
                this.get_html_error("Please fill all the required fields.", this.states.create);
                return;
            }
        }
    } else if (this.selected_tab == this.openstack_tab) {
        console.log("Openstack cluster name: " + this.stateConfigMap['openstack_selected_clustername']);
        console.log("Openstack ca token: " + this.stateConfigMap['openstack_selected_catoken']);
        console.log("Openstack ip: " + this.stateConfigMap['openstack_selected_ip']);

        if (!this.stateConfigMap['openstack_selected_catoken'] || !this.stateConfigMap['openstack_selected_clustername'] || !this.stateConfigMap['openstack_selected_ip']) {
            this.get_html_error("Please fill all the required fields.", this.states.create);
            return;
        }
    }

    footer.find('#select-button').attr('disabled', true);
    header.find('.close').hide();

    // Sending the data to the backend according to the tab selected currently
    if (this.selected_tab == this.token_tab) {
        if (this.checkbox_status == "unchecked") {
            this.send({
                'action': 'add-context-cluster',
                'token': this.stateConfigMap['local_selected_token'],
                'tab': this.selected_tab,
                'catoken': this.stateConfigMap['local_selected_catoken'],
                'cluster_name': this.stateConfigMap['local_selected_clustername'],
                'ip': this.stateConfigMap['local_selected_ip'],
                'insecure_server': "false"
            });
        } else {
            this.send({
                'action': 'add-context-cluster',
                'token': this.stateConfigMap['local_selected_token'],
                'tab': this.selected_tab,
                'cluster_name': this.stateConfigMap['local_selected_clustername'],
                'ip': this.stateConfigMap['local_selected_ip'],
                'insecure_server': "true"
            });
        }
    } else if (this.selected_tab == this.openstack_tab) {
        this.send({
            'action': 'add-context-cluster',
            'tab': this.selected_tab,
            'catoken': this.stateConfigMap['openstack_selected_catoken'],
            'cluster_name': this.stateConfigMap['openstack_selected_clustername'],
            'ip': this.stateConfigMap['openstack_selected_ip']
        });
    }
};

/**
 * @desc shows the create_user state to the user
 */
K8sSelection.prototype.get_html_create_users = function () {
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');

    var that = this;

    html.append(_user_create2.default);

    (0, _jquery2.default)("<button>").attr("type", "button").addClass("back-button").html("<i class='fa fa-arrow-left' aria-hidden='true'></i>").appendTo(header).on("click", _jquery2.default.proxy(this.refresh_modal, this));

    (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Grant access</span></h4>').appendTo(header);

    var user_create_div = html.find("#user_create_div");

    // Adds username field to create_user state frontend
    (0, _jquery2.default)('<br><label for="user_create_input" id="user_create_input_label">Username</label><br>').appendTo(user_create_div);

    var user_create_input = (0, _jquery2.default)('<input/>').attr('name', 'user_create_input').attr('type', 'text').attr("required", "required").attr('id', 'user_create_input').attr('placeholder', 'Username').addClass('form__field').appendTo(user_create_div).change(function () {
        that.stateConfigMap['user_create_input'] = user_create_input.val();
        user_email_create_input.val(user_create_input.val() + "@cern.ch");
        that.user_email_create_input = user_email_create_input.val();
    }).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create_users.buttons.CreateUser.click();
        }
    });

    // Adds user email field to create_user state frontend. Currently I have kept this input for testing. We can delete
    // it however when deployed to production.
    (0, _jquery2.default)('<br><br>').appendTo(user_create_div);

    (0, _jquery2.default)('<label for="user_email_create_input" id="user_email_create_input_label">Email</label><br>').appendTo(user_create_div);

    var user_email_create_input = (0, _jquery2.default)('<input/>').attr('name', 'user_email_create_input').attr('type', 'text').attr("required", "required").attr('id', 'user_email_create_input').attr('placeholder', 'Email').addClass('form__field').appendTo(user_create_div).change(function () {
        that.user_email_create_input = user_email_create_input.val();
    }).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.create_users.buttons.CreateUser.click();
        }
    });
};

/**
 * Handler to get user inputs from the create_user state and send it to the backend to create a user
 */
K8sSelection.prototype.create_users = function () {

    this.stateConfigMap['user_create_input'] = this.modal.find('input[name="user_create_input"]').val();
    this.stateConfigMap['user_email_create_input'] = this.modal.find('input[name="user_email_create_input"]').val();

    // Logging the inputs just for testing purposes
    console.log("Username: " + this.stateConfigMap['user_create_input']);
    console.log("Email: " + this.stateConfigMap['user_email_create_input']);
    console.log("Selected context: " + this.stateConfigMap['user_create_context_name']);

    // Check whether the inputs are not empty.
    // Note: I have not validated the email field right now because it is going to be removed, right?
    this.stateConfigMap['user_email_id'] = this.stateConfigMap['user_email_create_input'];
    if (!this.stateConfigMap['user_create_input'] || !this.stateConfigMap['user_email_create_input']) {
        this.get_html_error("Please fill all the required fields.", this.states.create_users);
        return;
    }

    // Send the inputs to the backend to add users to a cluster
    this.switch_state(this.states.loading);
    this.send({
        'action': 'create-user',
        'username': this.stateConfigMap['user_create_input'],
        'email': this.stateConfigMap['user_email_create_input'],
        'context': this.stateConfigMap['user_create_context_name']
    });
};

K8sSelection.prototype.get_cluster_detials_view_html = function () {
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');

    var that = this;

    (0, _jquery2.default)("<button>").attr("type", "button").addClass("back-button").html("<i class='fa fa-arrow-left' aria-hidden='true'></i>").appendTo(header).on("click", _jquery2.default.proxy(this.switch_state, this, this.states.create_users));

    (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Connection details for cluster: ' + this.stateConfigMap['user_create_context_name'] + '</span></h4>').appendTo(header);

    (0, _jquery2.default)('<h4 id="detail_div">Please send the connection details via email to: <a href="mailto:' + this.stateConfigMap['user_email_id'] + '">' + this.stateConfigMap['user_email_id'] + '</a></h4><br>').appendTo(html);

    (0, _jquery2.default)('<div style="display: flex;"><h4 id="cluster_name">K8s Cluster Name:</h4>&nbsp;<p style="font-size: 15px; margin-top: 5px;">' + this.cluster_name_view + '</p><br></div>').appendTo(html);

    (0, _jquery2.default)('<div style="display: flex;"><h4 id="server_ip">K8s master:</h4>&nbsp;<p style="font-size: 15px; margin-top: 5px;">' + this.server_ip_view + '</p><br></div>').appendTo(html);

    (0, _jquery2.default)('<div style="display: flex;"><div class="content"><h4 id="ca_token">CA Token:</h4><p style="font-size: 15px; margin-top: 5px; word-break: break-word;">' + this.ca_cert_view + '</p><br></div>').appendTo(html);
};

K8sSelection.prototype.get_html_auth = function () {

    console.log("Inside html auth");
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');

    var that = this;

    (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Authentication</span></h4>').appendTo(header);

    // Adds username field to create_user state frontend
    (0, _jquery2.default)('<br><label for="user_auth_pass" id="user_auth_pass_label">Password</label><br>').appendTo(html);

    var user_create_input = (0, _jquery2.default)('<input/>').attr('name', 'user_auth_pass').attr('type', 'password').attr("required", "required").attr('id', 'user_auth_pass').attr('placeholder', 'Password').addClass('form__field').appendTo(html).keypress(function (e) {
        var keycode = e.keyCode ? e.keyCode : e.which;
        if (keycode == _keyboard2.default.keycodes.enter) {
            that.states.auth.buttons.Authenticate.click();
        }
    });
};

K8sSelection.prototype.authenticate = function () {
    console.log("Authenticating");

    var password_field = this.modal.find('.auth-button');
    password_field.attr('disabled', '');

    var password_field = this.modal.find('input[name="user_auth_pass"]');
    password_field.attr('disabled', '');

    this.switch_state(this.states.loading);
    this.send({
        action: 'kerberos-auth',
        password: password_field.val()
    });
};

/**
 * @desc displays the frontend for loading state
 */
K8sSelection.prototype.get_html_loading = function () {
    var html = this.modal.find('.modal-body');

    var flexbox = (0, _jquery2.default)('<div>').addClass('loading-flexbox').appendTo(html);

    var loading = (0, _jquery2.default)('<div>').addClass('loading-div').appendTo(flexbox);

    (0, _jquery2.default)('<div>').addClass('nb-spinner').appendTo(loading);
};

/**
 * @desc frontend for the error state.
 * @param error
 * @param prev_state
 */
K8sSelection.prototype.get_html_error = function (error, prev_state) {
    if (this.modal) {
        _namespace2.default.keyboard_manager.disable();
        var header = this.modal.find('.modal-header');
        var body = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');

        header.html('');
        body.html('');
        footer.html('');

        (0, _jquery2.default)('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>').appendTo(header);

        // Here the back button allows to go back to the previous state
        (0, _jquery2.default)("<button>").attr("type", "button").addClass("back-button").html("<i class='fa fa-arrow-left' aria-hidden='true'></i>").appendTo(header).on("click", _jquery2.default.proxy(this.switch_state, this, prev_state));

        (0, _jquery2.default)('<h4 class="modal-title">&nbsp;&nbsp;<span>Error</span></h4>').appendTo(header);

        (0, _jquery2.default)('<div id="setting-error"><br><h4 style="color: red;">' + error + '</h4></div>').appendTo(body);
    }
};

/**
 * @desc Handler to process messages recieved from the backend
 * @param msg
 */
K8sSelection.prototype.on_comm_msg = function (msg) {
    if (msg.content.data.msgtype == 'context-select') {
        // The initial message recieved from the backend which provides the information about all the contexts
        console.log("Got message from frontend: " + msg.content.data.active_context);
        this.enabled = true;
        this.current_context = msg.content.data.active_context;
        this.contexts = msg.content.data.contexts;
        this.current_cluster = msg.content.data.current_cluster;
        this.clusters = msg.content.data.clusters;
        this.cluster_auth_type = msg.content.data.cluster_auth_type;
        this.current_cluster_auth_type = msg.content.data.current_cluster_auth_type;
        console.log("Kerberos auth from backend: " + msg.content.data.kerberos_auth);
        this.switch_state(this.states.select);
    } else if (msg.content.data.msgtype == 'added-context-successfully') {
        // The message received when cluster and context are added successfully

        this.stateConfigMap['local_selected_token'] = undefined;
        this.stateConfigMap['local_selected_catoken'] = undefined;
        this.selected_tab = undefined;
        this.checkbox_status = undefined;
        this.stateConfigMap['local_selected_clustername'] = undefined;
        this.stateConfigMap['local_selected_ip'] = undefined;
        this.stateConfigMap['openstack_selected_catoken'] = undefined;
        this.stateConfigMap['openstack_selected_clustername'] = undefined;
        this.stateConfigMap['openstack_selected_ip'] = undefined;

        this.hide_close = false;
        this.refresh_modal();
    } else if (msg.content.data.msgtype == 'added-context-unsuccessfully') {
        // The message received when cluster and context are not added successfully
        console.log("Added context unsuccessfull");
        this.hide_close = false;
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');

        footer.find('#select-button').attr('disabled', false);
        header.find('.close').show();

        this.get_html_error(msg.content.data.error, this.states.create);

        console.log("Added context unsuccessfull");
    } else if (msg.content.data.msgtype == 'changed-current-context') {
        // The message received when successfully changed current context in the backend
        this.is_reachable = msg.content.data.is_reachable;
        this.is_admin = msg.content.data.is_admin;
        this.hide_close = false;
        this.toolbar_button.html('<div id="extension_icon"></div>');
        this.toolbar_button.find("#extension_icon").css('background-image', 'url("' + _require2.default.toUrl('./' + _k8s_blue2.default) + '")');
        this.toolbar_button.find("#extension_icon").css('width', '16px');
        this.toolbar_button.find("#extension_icon").css('height', '16px');
        this.toolbar_button.find("#extension_icon").css('margin-left', '5px');
        this.toolbar_button.removeAttr('disabled');
        this.enabled = true;
        this.refresh_modal();
    } else if (msg.content.data.msgtype == 'changed-current-context-unsuccessfully') {
        this.is_reachable = msg.content.data.is_reachable;
        this.is_admin = msg.content.data.is_admin;
        this.hide_close = false;
        this.toolbar_button.html('<div id="extension_icon"></div>');
        this.toolbar_button.find("#extension_icon").css('background-image', 'url("' + _require2.default.toUrl('./' + _k8s2.default) + '")');
        this.toolbar_button.find("#extension_icon").css('width', '16px');
        this.toolbar_button.find("#extension_icon").css('height', '16px');
        this.toolbar_button.find("#extension_icon").css('margin-left', '5px');
        this.toolbar_button.removeAttr('disabled');
        this.enabled = true;
        this.refresh_modal();
    } else if (msg.content.data.msgtype == 'deleted-context-successfully') {
        // Message received from backend when the context and cluster are deleted successfully from backend
        // this.modal.modal('hide');
        this.current_context = msg.content.data.current_context;
        var current_context_deleted = msg.content.data.current_context_deleted;
        if (current_context_deleted == true) {
            this.toolbar_button.html('<div id="extension_icon"></div>');
            this.toolbar_button.find("#extension_icon").css('background-image', 'url("' + _require2.default.toUrl('./' + _k8s2.default) + '")');
            this.toolbar_button.find("#extension_icon").css('width', '16px');
            this.toolbar_button.find("#extension_icon").css('height', '16px');
            this.toolbar_button.find("#extension_icon").css('margin-left', '5px');
            this.toolbar_button.removeAttr('disabled');
            this.enabled = true;
        }
        this.refresh_modal();
    } else if (msg.content.data.msgtype == 'added-user-unsuccessfully') {
        // Message recieved when the user is not added to a cluster successfully
        var html = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');
        var that = this;

        this.get_html_error(msg.content.data.error, this.states.create_users);
    } else if (msg.content.data.msgtype == 'added-user-successfully') {
        // Message recieved when the user is added to a cluster successfully
        this.stateConfigMap['user_create_input'] = undefined;
        this.user_email_create_input = undefined;
        this.cluster_name_view = msg.content.data.cluster_name;
        this.server_ip_view = msg.content.data.server_ip;
        this.ca_cert_view = msg.content.data.ca_cert;
        this.switch_state(this.states.cluster_details);
    } else if (msg.content.data.msgtype == 'auth-required') {
        console.log("Auth required!");
        this.switch_state(this.states.auth);
    } else if (msg.content.data.msgtype == 'auth-not-required' || msg.content.data.msgtype == 'auth-successfull') {
        this.switch_state(this.states.loading);
        this.send({
            'action': 'change-current-context',
            'context': this.currently_selected_context,
            'tab': this.currently_selected_auth_type
        });
    } else if (msg.content.data.msgtype == 'auth-unsuccessfull') {
        this.get_html_error(msg.content.data.error, this.states.auth);
    } else if (msg.content.data.msgtype == 'get-clusters-unsuccessfull') {
        this.get_html_error(msg.content.data.error, this.states.select);
    }
};

/**
 * @desc A Helper function to switch from one state to another
 * @param new_state
 */
K8sSelection.prototype.switch_state = function (new_state) {
    this.state = new_state;

    if (this.modal) {
        _namespace2.default.keyboard_manager.disable();
        var header = this.modal.find('.modal-header');
        var body = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');

        header.html('');
        body.html('');
        footer.html('');

        (0, _jquery2.default)('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>').appendTo(header);

        new_state.get_html();

        // Looping for each button that a state has and adding it to the footer
        _jquery2.default.each(new_state.buttons, function (name, options) {
            (0, _jquery2.default)('<button>').addClass('btn-blue').attr('id', 'select-button').on('click', options.click).text(name).appendTo(footer);
        });
    }
};

/**
 * @desc Function to start communication with the backend
 */
K8sSelection.prototype.start_comm = function () {

    // Check whether it is already instantiated and close it.
    if (this.comm) {
        this.comm.close();
    }

    if (this.toolbar_button) {
        this.toolbar_button.html('<div id="extension_icon"></div>');
        this.toolbar_button.find("#extension_icon").css('background-image', 'url("' + _require2.default.toUrl('./' + _k8s2.default) + '")');
        this.toolbar_button.find("#extension_icon").css('width', '16px');
        this.toolbar_button.find("#extension_icon").css('height', '16px');
        this.toolbar_button.find("#extension_icon").css('margin-left', '5px');
    }

    console.log('K8sSelection: Starting Comm with kernel');

    var that = this;

    // Create a new communication with the backend and send a message to the backend when communication starts
    if (_namespace2.default.notebook.kernel) {
        console.log("Inside if statement!!");
        this.comm = _namespace2.default.notebook.kernel.comm_manager.new_comm('K8sSelection', { 'msgtype': 'K8sSelection-conn-open' });
        this.comm.on_msg(_jquery2.default.proxy(that.on_comm_msg, that));
        this.comm.on_close(_jquery2.default.proxy(that.on_comm_close, that));
    } else {
        console.log("K8sSelection: No communication established, kernel null");
    }
};

function load_ipython_extension() {

    var conn = new K8sSelection();
    conn.add_toolbar_button();
}

exports.load_ipython_extension = load_ipython_extension;

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

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "<br> <div id=user_html_inputs> </div> ";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div style=position:relative;text-align:center> <div id=material-tabs> <a id=openstack href=#tab1 class=active>openstack<br>(Recommended)</a> <a id=sa-token href=#tab2>token</a> <a id=gcloud href=#tab3>gcloud</a> <span class=yellow-bar></span> </div> </div> <div class=tab-content> <div id=tab1> <p>Please ensure that the prerequities are satisfied before adding the cluster</p> <a href=https://gitlab.cern.ch/swan/jupyter/blob/gsoc2019/K8sSelection/README.md target=_blank>https://gitlab.cern.ch/swan/jupyter/blob/gsoc2019/K8sSelection/README.md</a> <br><br> </div> <div id=tab2> <p>Please ensure that the prerequities are satisfied before adding the cluster</p> <a href=https://gitlab.cern.ch/swan/jupyter/blob/gsoc2019/K8sSelection/README.md target=_blank>https://gitlab.cern.ch/swan/jupyter/blob/gsoc2019/K8sSelection/README.md</a> <br><br> <div id=cluster-settings> <label class=pure-material-checkbox> <input type=checkbox id=cluster-mode> <span>Disable TLS support</span> </label> </div> <br> <hr> <br> <div id=other-settings> </div> </div> <div id=tab3> <p>This is currently not implemented.</p> </div> </div> <script src=https://code.jquery.com/jquery-3.4.1.min.js integrity=\"sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=\" crossorigin=anonymous></script>";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<div id=user_create_div style=\"margin:0 auto\"> </div>";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(15)(content, options);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(13);
exports = module.exports = __webpack_require__(14)(false);
// imports


// module
exports.push([module.i, ".btn-blue {\n    position: relative;\n\n    display: block;\n    margin: auto;\n    padding: 10px;\n\n    overflow: hidden;\n\n    border-width: 0;\n    outline: none;\n    border-radius: 2px;\n    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);\n\n    background-color: #03A9F4;\n    color: #ecf0f1;\n\n    transition: background-color .3s;\n}\n\n.modal-title {\n    margin: 0;\n    line-height: 1.42857143;\n    font-size: 20px;\n}\n\n\n.wrap {\n    position: absolute;\n    right: 0;\n    top: 40%;\n    width: 350px;\n    left: 0;\n    margin: 25px auto;\n  }\n\n  /* select starting stylings ------------------------------*/\n  .select {\n    font-family:\n      'Roboto','Helvetica','Arial',sans-serif;\n      position: relative;\n      width: 410px;\n      margin-top: 15px;\n      margin: auto;\n  }\n\n  .select-text {\n      position: flex;\n      font-family: inherit;\n      background-color: transparent;\n      width: 350px;\n      padding: 10px 10px 10px 0;\n      font-size: 18px;\n      border-radius: 0;\n      border: none;\n      border-bottom: 1px solid rgba(0,0,0, 0.12);\n  }\n\n  /* Remove focus */\n  .select-text:focus {\n      outline: none;\n      border-bottom: 1px solid rgba(0,0,0, 0);\n  }\n\n      /* Use custom arrow */\n  .select .select-text {\n      appearance: none;\n      -webkit-appearance:none\n  }\n\n  .select:after {\n      position: absolute;\n      top: 45px;\n      right: 75px;\n      /* Styling the down arrow */\n      width: 0;\n      height: 0;\n      padding: 0;\n      content: '';\n      border-left: 6px solid transparent;\n      border-right: 6px solid transparent;\n      border-top: 6px solid rgba(0, 0, 0, 0.12);\n      pointer-events: none;\n  }\n\n\n  /* LABEL ======================================= */\n  .select-label {\n      color: rgba(0,0,0, 0.26);\n      font-size: 18px;\n      font-weight: normal;\n      position: absolute;\n      pointer-events: none;\n      left: 0;\n      top: 10px;\n      transition: 0.2s ease all;\n  }\n\n  /* active state */\n  .select-text:focus ~ .select-label, .select-text:valid ~ .select-label {\n      color: rgb(0, 0, 0);\n      top: -20px;\n      transition: 0.2s ease all;\n      font-size: 14px;\n  }\n\n  /* BOTTOM BARS ================================= */\n  .select-bar {\n      position: relative;\n      display: block;\n      width: 350px;\n  }\n\n  .select-bar:before, .select-bar:after {\n      content: '';\n      height: 2px;\n      width: 0;\n      bottom: 1px;\n      position: absolute;\n      background: #2F80ED;\n      transition: 0.2s ease all;\n  }\n\n  .select-bar:before {\n      left: 50%;\n  }\n\n  .select-bar:after {\n      right: 50%;\n  }\n\n  /* active state */\n  .select-text:focus ~ .select-bar:before, .select-text:focus ~ .select-bar:after {\n      width: 50%;\n  }\n\n  /* HIGHLIGHTER ================================== */\n  .select-highlight {\n      position: absolute;\n      height: 60%;\n      width: 100px;\n      top: 25%;\n      left: 0;\n      pointer-events: none;\n      opacity: 0.5;\n  }\n\n\n\n.form__field {\n    font-family: inherit;\n    width: 50%;\n    border: 0;\n    border-bottom: 1px solid #d2d2d2;\n    outline: 0;\n    font-size: 16px;\n    color: #212121;\n    padding: 7px 0;\n    background: transparent;\n    transition: border-color 0.2s;\n}\n\n.form__field::placeholder {\n    color: transparent;\n}\n\n/* label,\n.form__field:placeholder-shown ~ .form__label {\n    font-size: 16px;\n    cursor: text;\n    top: 20px;\n}\n\n.form__field:focus ~ .form__label {\n  position: absolute;\n  top: 0;\n  display: block;\n  transition: 0.2s;\n  font-size: 12px;\n  color: #9b9b9b;\n}\n\n.form__field:focus ~ .form__label {\n  color: #212121;\n} */\n\n.form__field:focus {\n  padding-bottom: 6px;\n  border-bottom: 2px solid #212121;\n}\n\n\n\n.container-tabs{\n\theight:500px;\n\twidth:100%;\n\tpadding:0;\n\tmargin:10px;\n\tborder-radius:5px;\n\tbox-shadow: 0 2px 3px rgba(0,0,0,.3)\n\n}\n\n.hide {\n\t\tdisplay: none;\n}\n\n.tab-content {\n\t\tpadding:25px;\n}\n\n#material-tabs {\n\t\tposition: relative;\n\t\tdisplay: inline-block;\n\t  /* padding:0; */\n        border-bottom: 1px solid #e0e0e0;\n        /* margin: 0 auto; */\n}\n\n#material-tabs>a {\n\t\tposition: relative;\n\t display:inline-block;\n\t\ttext-decoration: none;\n\t\tpadding: 22px;\n\t\ttext-transform: uppercase;\n\t\tfont-size: 14px;\n\t\tfont-weight: 600;\n\t\tcolor: #424f5a;\n\t\ttext-align: center;\n\t\t/*outline:;*/\n}\n\n#material-tabs>a.active {\n\t\tfont-weight: 700;\n\t\toutline:none;\n}\n\n#material-tabs>a:not(.active):hover {\n\t\tbackground-color: inherit;\n\t\tcolor: #7c848a;\n}\n\n@media only screen and (max-width: 520px) {\n\t\t.nav-tabs#material-tabs>li>a {\n\t\t\t\tfont-size: 11px;\n\t\t}\n}\n\n.yellow-bar {\n\t\tposition: absolute;\n\t\tz-index: 10;\n\t\tbottom: 0;\n\t\theight: 3px;\n\t\tbackground: #458CFF;\n\t\tdisplay: block;\n\t\tleft: 0;\n\t\ttransition: left .2s ease;\n\t\t-webkit-transition: left .2s ease;\n\t\ttransition: width .2s ease;\n\t\t-webkit-transition: width .2s ease;\n}\n\n#openstack.active ~ span.yellow-bar {\n    left: 0;\n    width: 165px;\n}\n\n#sa-token.active ~ span.yellow-bar {\n    left:170px;\n    width: 90px;\n}\n\n#gcloud.active ~ span.yellow-bar {\n    left: 265px;\n    width: 105px;\n}\n\n.back-button {\n    float: left;\n    font-size: 16px;\n    font-weight: bold;\n    line-height: 1;\n    color: black;\n    text-shadow: 0 1px 0 #fff;\n    /*filter: alpha(opacity=20);*/\n    opacity: 0.7;\n    margin-top: 5px;\n}\n\nbutton.back-button {\n    padding: 0;\n    cursor: pointer;\n    background: transparent;\n    border: 0;\n    -webkit-appearance: none;\n    appearance: none;\n}\n\n\n\n\n.pure-material-checkbox {\n    z-index: 0;\n    position: relative;\n    display: inline-block;\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);\n    font-family: var(--pure-material-font, \"Roboto\", \"Segoe UI\", BlinkMacSystemFont, system-ui, -apple-system);\n    font-size: 16px;\n    line-height: 1.5;\n}\n\n/* Input */\n.pure-material-checkbox > input {\n    appearance: none;\n    -moz-appearance: none;\n    -webkit-appearance: none;\n    z-index: -1;\n    position: absolute;\n    left: -10px;\n    top: -8px;\n    display: block;\n    margin: 0;\n    border-radius: 50%;\n    width: 40px;\n    height: 40px;\n    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);\n    box-shadow: none;\n    outline: none;\n    opacity: 0;\n    transform: scale(1);\n    pointer-events: none;\n    transition: opacity 0.3s, transform 0.2s;\n}\n\n/* Span */\n.pure-material-checkbox > span {\n    display: inline-block;\n    width: 100%;\n    cursor: pointer;\n}\n\n/* Box */\n.pure-material-checkbox > span::before {\n    content: \"\";\n    display: inline-block;\n    box-sizing: border-box;\n    margin: 3px 11px 3px 1px;\n    border: solid 2px; /* Safari */\n    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);\n    border-radius: 2px;\n    width: 18px;\n    height: 18px;\n    vertical-align: top;\n    transition: border-color 0.2s, background-color 0.2s;\n}\n\n/* Checkmark */\n.pure-material-checkbox > span::after {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: 3px;\n    left: 1px;\n    width: 10px;\n    height: 5px;\n    border: solid 2px transparent;\n    border-right: none;\n    border-top: none;\n    transform: translate(3px, 4px) rotate(-45deg);\n}\n\n/* Checked, Indeterminate */\n.pure-material-checkbox > input:checked,\n.pure-material-checkbox > input:indeterminate {\n    background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n}\n\n.pure-material-checkbox > input:checked + span::before,\n.pure-material-checkbox > input:indeterminate + span::before {\n    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n    background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n}\n\n.pure-material-checkbox > input:checked + span::after,\n.pure-material-checkbox > input:indeterminate + span::after {\n    border-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));\n}\n\n.pure-material-checkbox > input:indeterminate + span::after {\n    border-left: none;\n    transform: translate(4px, 3px);\n}\n\n/* Hover, Focus */\n.pure-material-checkbox:hover > input {\n    opacity: 0.04;\n}\n\n.pure-material-checkbox > input:focus {\n    opacity: 0.12;\n}\n\n.pure-material-checkbox:hover > input:focus {\n    opacity: 0.16;\n}\n\n/* Active */\n.pure-material-checkbox > input:active {\n    opacity: 1;\n    transform: scale(0);\n    transition: transform 0s, opacity 0s;\n}\n\n.pure-material-checkbox > input:active + span::before {\n    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n}\n\n.pure-material-checkbox > input:checked:active + span::before {\n    border-color: transparent;\n    background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);\n}\n\n/* Disabled */\n.pure-material-checkbox > input:disabled {\n    opacity: 0;\n}\n\n.pure-material-checkbox > input:disabled + span {\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n    cursor: initial;\n}\n\n.pure-material-checkbox > input:disabled + span::before {\n    border-color: currentColor;\n}\n\n.pure-material-checkbox > input:checked:disabled + span::before,\n.pure-material-checkbox > input:indeterminate:disabled + span::before {\n    border-color: transparent;\n    background-color: currentColor;\n}\n\n\n\n.fab-button {\n    position: relative;\n    float: right;\n    color: #fff;\n    padding: 15px 20px;\n    border-radius: 50%;\n    background-color: #03A9F4;\n    cursor: pointer;\n    box-shadow:0px 3px 3px #BDBDBD;\n  }\n\n.kubernetes-icon {\n    background-image: url(" + escape(__webpack_require__(0)) + ");\n    width: 16px;\n    height: 16px;\n}\n\n.cluster-list-div {\n    display: flex;\n    flex-direction: row;\n    border-bottom: 0.3px solid rgba(85, 87, 86, 0.62);\n    margin-bottom:10px;\n    margin-top: 10px;\n    /* border: 1px solid black; */\n\n}\n\n.cluster-list-div > .list-item-delete {\n    width: 5px;\n}\n\n.cluster-list-div > .list-item-text {\n    flex: auto;\n    font-size: 17px;\n    margin-top: 6px;\n}\n\n.cluster-list-div > .list-item-share {\n    margin-top: 2px;\n    width: 5px;\n}\n\n.cluster-list-div > .list-item-select {\n    margin-top: 2px;\n    width: 7rem;\n}\n\n.cluster-list-div > .connect-symbol {\n    margin-top: 10px;\n    width: 3rem;\n    color: #008017;\n}\n\n.cluster-list-div > .not-connected-symbol {\n    margin-top: 10px;\n    width: 3rem;\n    color: #FF0000;\n}\n\n.cluster-list-div > .list-item-load {\n    align-items: center;\n    text-align: center;\n}\n\n\n\n.pure-material-button-text {\n    position: relative;\n    display: inline-block;\n    box-sizing: border-box;\n    border: none;\n    border-radius: 4px;\n    padding: 0 8px;\n    min-width: 64px;\n    height: 36px;\n    vertical-align: middle;\n    text-align: center;\n    text-overflow: ellipsis;\n    text-transform: uppercase;\n    color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));\n    background-color: transparent;\n    font-family: var(--pure-material-font, \"Roboto\", \"Segoe UI\", BlinkMacSystemFont, system-ui, -apple-system);\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 36px;\n    overflow: hidden;\n    outline: none;\n    cursor: pointer;\n}\n\n.pure-material-button-text::-moz-focus-inner {\n    border: none;\n}\n\n/* Overlay */\n.pure-material-button-text::before {\n    content: \"\";\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    background-color: currentColor;\n    opacity: 0;\n    transition: opacity 0.2s;\n}\n\n/* Ripple */\n.pure-material-button-text::after {\n    content: \"\";\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    border-radius: 50%;\n    padding: 50%;\n    width: 32px;\n    height: 32px;\n    background-color: currentColor;\n    opacity: 0;\n    transform: translate(-50%, -50%) scale(1) ;\n    transition: opacity 1s, transform 0.5s;\n}\n\n/* Hover, Focus */\n.pure-material-button-text:hover::before {\n    opacity: 0.04;\n}\n\n.pure-material-button-text:focus::before {\n    opacity: 0.12;\n}\n\n.pure-material-button-text:hover:focus::before {\n    opacity: 0.16;\n}\n\n/* Active */\n.pure-material-button-text:active::after {\n    opacity: 0.16;\n    transform: translate(-50%, -50%) scale(0);\n    transition: transform 0s;\n}\n\n/* Disabled */\n.pure-material-button-text:disabled {\n    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);\n    background-color: transparent;\n    cursor: initial;\n}\n\n.pure-material-button-text:disabled::before {\n    opacity: 0;\n}\n\n.pure-material-button-text:disabled::after {\n    opacity: 0;\n}\n\n\n#user_html_inputs {\n    max-height: 280px;\n    overflow-y: auto;\n}\n\n\n.nb-spinner {\n    width: 75px;\n    height: 75px;\n    background: transparent;\n    border-top: 4px solid #009688;\n    border-right: 4px solid transparent;\n    border-radius: 50%;\n    -webkit-animation: 1s spin linear infinite;\n    animation: 1s spin linear infinite;\n}\n\n\n.loading-flexbox {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n}\n\n.loading-flexbox > .loading-div {\n    width: 300px;\n    height: 300px;\n    -webkit-box-flex: 0;\n    -ms-flex: 0 0 100%;\n    flex: 0 0 100%;\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    margin: 0;\n    position: relative;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -ms-flex-pack: center;\n    justify-content: center;\n    -webkit-box-align: center;\n    -ms-flex-align: center;\n    align-items: center;\n    overflow: hidden;\n}\n\n-webkit-@keyframes spin {\n  -webkit-from {\n    -webkit-transform: rotate(0deg);\n    -ms-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  -webkit-to {\n    -webkit-transform: rotate(360deg);\n    -ms-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@-webkit-keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  from {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  to {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url;
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
    }

    return url;
};

/***/ }),
/* 14 */
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
/* 15 */
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

var	fixUrls = __webpack_require__(16);

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
/* 16 */
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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/k8s_blue.png";

/***/ })
/******/ ]);
});