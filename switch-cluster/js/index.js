import $ from 'jquery';
import dialog from 'base/js/dialog';
import Jupyter from 'base/js/namespace';
import events from 'base/js/events';

import user_html from './templates/user.html'
import './css/style.css'
// import './js/materialize.min.js'

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

        this.modal.on('show.bs.modal', function () {
            console.log("Inside 2nd open model");
            that.get_html_select_cluster();
            
        }).modal('show');
        this.modal.find(".modal-header").unbind("mousedown");

        this.modal.on('hide.bs.modal', function () {
            return true;
        });
    }
}


SwitchCluster.prototype.send = function (msg) {
    this.comm.send(msg);
}


SwitchCluster.prototype.get_html_select_cluster = function() {
    this.send({'action': 'Refresh'});
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    // $('<link type="text/css" rel="stylesheet" href="css/materialize.min.css" />').appendTo(header);
    var clusters = this.clusters;
    var current_cluster = this.current_cluster;
    var template = user_html;
    html.append(template);
    // var list = [0, 1, 2, 3, 4, 5, 6];
    var that = this;
    var select = html.find("#select_cluster_options");
    for(var i = 0; i < clusters.length; i++) {
        if(clusters[i] == current_cluster) {
            $('<option>' + clusters[i] + '</option>').attr('value', clusters[i]).attr('selected', 'selected').appendTo(select).change(function() {

            });
        }
        else {
            $('<option>' + clusters[i] + '</option>').attr('value', clusters[i]).appendTo(select);
        }

    }

    var main_div = html.find('#user_html_inputs');
    
    $('<br>').appendTo(main_div);

    $('<label for="namespace_text">Namespace</label><br>').appendTo(main_div);

    if(this.selected_namespace) {
        var namespace_input = $('<input/>')
            .attr('name', 'namespace_text')
            .attr('type', 'text')
            .attr('id', 'namespace_text')
            .attr('value', this.selected_namespace)
            .attr('placeholder', 'Namespace')
            .addClass('form__field')
            .appendTo(main_div)
            .focus()
            .change(function() {
                that.selected_namespace = namespace_input.val();
            });
    }
    else {
        var namespace_input = $('<input/>')
            .attr('name', 'namespace_text')
            .attr('type', 'text')
            .attr('id', 'namespace_text')
            .attr('placeholder', 'Namespace')
            .addClass('form__field')
            .appendTo(main_div)
            .focus()
            .change(function() {
                that.selected_namespace = namespace_input.val();
            });
    }
    
        
    $('<br><br>').appendTo(main_div);

    $('<label for="svcaccount_text">ServiceAccount</label><br>').appendTo(main_div);
    
    if(this.selected_svcaccount) {
        var svcaccount_input = $('<input/>')
            .attr('name', 'svcaccount_text')
            .attr('type', 'text')
            .attr('id', 'svcaccount_text')
            .attr('value', this.selected_svcaccount)
            .attr('placeholder', 'ServiceAccount')
            .addClass('form__field')
            .appendTo(main_div)
            .focus()
            .change(function() {
                that.selected_svcaccount = svcaccount_input.val();
            });
    }
    else {
        var svcaccount_input = $('<input/>')
            .attr('name', 'svcaccount_text')
            .attr('type', 'text')
            .attr('id', 'svcaccount_text')
            .attr('placeholder', 'ServiceAccount')
            .addClass('form__field')
            .appendTo(main_div)
            .focus()
            .change(function() {
                that.selected_svcaccount = svcaccount_input.val();
            });
    }    

    select.change(function() {
        that.current_cluster = $(this).children("option:selected").val();
    });
    $('<button>')
        .addClass('btn-blue')
        .text("Select Cluster")
        .appendTo(footer)
        .on('click', $.proxy(this.change_cluster, this));
}

SwitchCluster.prototype.change_cluster = function() {
    var html = this.modal.find('.modal-body');

    var error_div = html.find('#setting-error');
    error_div.remove();

    console.log("Sending msg to kernel to change KUBECONFIG")
    console.log("Modified cluster: " + this.current_cluster);
    console.log("Selected namespace: " + this.selected_namespace);
    console.log("Selected serviceaccount: " + this.selected_svcaccount);
    this.send({
        'action': 'check-current-settings',
        'cluster': this.current_cluster,
        'namespace': this.selected_namespace,
        'svcaccount': this.selected_svcaccount
    })
}


SwitchCluster.prototype.redirect = function() {
    window.location.href = "http://spark.apache.org/";
};


SwitchCluster.prototype.on_comm_msg = function (msg) {
    if(msg.content.data.msgtype == 'cluster-select') {
        console.log("Got message from frontend: " + msg.content.data.current_cluster);
        this.current_cluster = msg.content.data.current_cluster;
        this.clusters = msg.content.data.clusters;
    }
    else if(msg.content.data.msgtype == 'authentication-successfull') {
        console.log("Authentication successfull");
        this.modal.modal('hide');
        console.log("Authentication successfull");
    }
    else if(msg.content.data.msgtype == 'authentication-unsuccessfull') {
        console.log("Authentication unsuccessfull");
        // this.open_modal();
        var html = this.modal.find('.modal-body');

        $('<div id="setting-error"><br><h4 style="color: red;">You cannot use these settings. Please contact your admin</h4></div>').appendTo(html);

        console.log("Authentication unsuccessfull");
    }
}



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