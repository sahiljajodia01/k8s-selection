// define([
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


import $ from 'jquery';
import dialog from 'base/js/dialog';
import Jupyter from 'base/js/namespace';
import events from 'base/js/events';
import keyboard from 'base/js/keyboard';
import utils from 'base/js/utils';
import configmod from 'services/config';



function SwitchCluster() {

    this.comm = null;

    events.on('kernel_connected.Kernel', $.proxy(this.start_comm, this));
};


SwitchCluster.prototype.add_toolbar_button = function() {
    var action = {
        help: 'Spark clusters connection',
        icon: 'fa-external-link',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: $.proxy(this.redirect, this)
    };

    var prefix = 'SwitchCluster';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = Jupyter.actions.register(action, action_name, prefix);
    this.toolbar_button = Jupyter.toolbar.add_buttons_group([full_action_name]).find('.btn');
    // this.toolbar_button.addClass('fa-external-link');
    // this.enabled = true;
};

SwitchCluster.prototype.redirect = function() {
    window.location.href = "http://spark.apache.org/";
};


SwitchCluster.prototype.start_comm = function () {

    if (this.comm) {
        this.comm.close()
    }

    console.log('SwitchCluster: Starting Comm with kernel')

    var that = this;

    if (Jupyter.notebook.kernel) {
        console.log("Inside if statement!!")
        this.comm = Jupyter.notebook.kernel.comm_manager.new_comm('SwitchCluster',
            {'msgtype': 'switchcluster-conn-open'});
        this.comm.on_msg($.proxy(that.on_comm_msg, that));
        this.comm.on_close($.proxy(that.on_comm_close, that));
    } else {
        console.log("SwitchCluster: No communication established, kernel null");
    }
}

function load_ipython_extension() {

    var conn = new SwitchCluster();
    conn.add_toolbar_button();
}

export {load_ipython_extension}