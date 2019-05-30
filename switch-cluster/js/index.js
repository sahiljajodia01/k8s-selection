// import jquery from 'jquery';
import dialog from 'base/js/dialog';
import Jupyter from 'base/js/namespace';
import events from 'base/js/events';
import keyboard from 'base/js/keyboard';
import utils from 'base/js/utils';
import configmod from 'services/config';

// var $ = jquery;

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
    let action = {
        help: 'Switch Spark K8s cluster',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: $.proxy(this.open_modal, this)
    };

    var prefix = 'SwitchCluster';
    var action_name = 'show-cluster-dropdown';

    let full_action_name = Jupyter.actions.register(action, action_name, prefix);
    this.toolbar_button = Jupyter.toolbar.add_buttons_group([full_action_name]).find('.btn');
    this.toolbar_button.addClass('spark-icon');
    this.enabled = true;

};


Switchcluster.prototype.open_modal = function () {

    if (this.enabled && !(this.modal && this.modal.data('bs.modal') && this.modal.data('bs.modal').isShown)) {
        var that = this;

        this.modal = dialog.modal({
            show: false,
            draggable: false,
            notebook: Jupyter.notebook,
            keyboard_manager: Jupyter.keyboard_manager,
            title: 'Spark clusters connection',
        }).attr('id', 'sparkclusters-modal').addClass('right');


        this.modal.click(function(e) {
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
}



function load_ipython_extension() {

    var conn = new Switchcluster();
    conn.add_toolbar_button();
}

export {load_ipython_extension}