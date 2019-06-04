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

    
};


SwitchCluster.prototype.add_toolbar_button = function() {
    var action = {
        help: 'Spark clusters connection',
        icon: 'fa-external-link',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: $.proxy(this.redirect, this)
    };

    var prefix = 'SparkConnector';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = Jupyter.actions.register(action, action_name, prefix);
    this.toolbar_button = Jupyter.toolbar.add_buttons_group([full_action_name]).find('.btn');
    // this.toolbar_button.addClass('fa-external-link');
    // this.enabled = true;
};

SwitchCluster.prototype.redirect = function() {
    window.location.href = "http://spark.apache.org/";
};

function load_ipython_extension() {

    var conn = new SwitchCluster();
    conn.add_toolbar_button();
}

export {load_ipython_extension}