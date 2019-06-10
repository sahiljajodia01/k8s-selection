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

import user_html from './templates/user.html'



function SwitchCluster() {

    this.comm = null;

    events.on('kernel_connected.Kernel', $.proxy(this.start_comm, this));
};


SwitchCluster.prototype.add_toolbar_button = function() {
    var action = {
        help: 'Spark clusters connection',
        icon: 'fa-external-link',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: $.proxy(this.open_modal, this)
    };

    var prefix = 'SwitchCluster';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = Jupyter.actions.register(action, action_name, prefix);
    this.toolbar_button = Jupyter.toolbar.add_buttons_group([full_action_name]).find('.btn');
    // this.toolbar_button.addClass('fa-external-link');
    this.enabled = true;
};


SwitchCluster.prototype.open_modal = function () {

    if (this.enabled && !(this.modal && this.modal.data('bs.modal') && this.modal.data('bs.modal').isShown)) {
        var that = this;
        this.modal = dialog.modal({
            show: false,
            draggable: false,
            notebook: Jupyter.notebook,
            keyboard_manager: Jupyter.keyboard_manager,
            title: 'Spark cluster setting',
        });


        this.modal.click(function(e) {
            // Close modal on click outside of connector area when in not "hide_close" state
            if ($(e.target).is("div") && !$(e.target).closest('.modal-dialog').length) {
                that.modal.modal('hide');
            }
        });

        // this.modal.on('shown.bs.modal', function () {
        //     console.log("Inside 1st open model");
        //     that.modal.find("input").first().focus();
        // });

        this.modal.on('show.bs.modal', function () {
            console.log("Inside 2nd open model");
            // that.switch_state(that.state, that.state_config, that.state_error);
            var html = that.modal.find('.modal-body');

            var template = user_html;
            html.append(template);
            var list = [0, 1, 2, 3, 4, 5, 6];

            for(var i = 0; i < list.length; i++) {
                var select = html.find("#select_cluster_options");
                $('<option>' + list[i] + '</option>').appendTo(select);
            }

            // html.html(template);

        }).modal('show');
        // this.modal.find(".modal-header").unbind("mousedown");

        this.modal.on('hide.bs.modal', function () {
            return true;
        });
    }
}


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