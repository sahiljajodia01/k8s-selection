import $ from 'jquery';
import dialog from 'base/js/dialog';
import Jupyter from 'base/js/namespace';
import events from 'base/js/events';

import user_html from './templates/user.html'
import create_context_html from './templates/create_context.html'
import './css/style.css'
// import './js/materialize.min.js'

function SwitchCluster() {

    this.states = {
        select: {
            get_html: $.proxy(this.get_html_select_cluster, this),
            buttons: {
                'Select Context': {
                    class: 'btn-success size-100 auth-button',
                    click: $.proxy(this.select_context, this)
                }
            }
        },
        create: {
            get_html: $.proxy(this.get_html_create_context, this),
            buttons: {
                'Create Context': {
                    class: 'btn-success size-100',
                    click: $.proxy(this.create_context, this)
                }
            }
        },
        view: {
            get_html: $.proxy(this.get_html_view_context, this),
            hide_close: true,
            buttons: {
                'Select Context': {
                    class: 'btn-danger size-100',
                    click: $.proxy(this.select_context, this)
                }
            }
        }
    }

    this.comm = null;

    events.on('kernel_connected.Kernel', $.proxy(this.start_comm, this));
};


SwitchCluster.prototype.add_toolbar_button = function() {
    var action = {
        help: 'Spark clusters settings',
        help_index: 'zz', // Sorting Order in keyboard shortcut dialog
        handler: $.proxy(this.open_modal, this)
    };



    var prefix = 'SwitchCluster';
    var action_name = 'show-sparkcluster-conf';

    var full_action_name = Jupyter.actions.register(action, action_name, prefix);
    this.toolbar_button = Jupyter.toolbar.add_buttons_group([full_action_name]).find('.btn');
    this.toolbar_button.text('Not Connected');
    // this.toolbar_button.addClass("kubernetes-icon");
    this.toolbar_button.attr("style", "width: 150px; text-overflow: ellipsis; overflow: hidden;");
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
            if ($(e.target).is("div") && !$(e.target).closest('.modal-dialog').length && !that.hide_close) {
                that.modal.modal('hide');
            }
        });

        this.modal.on('show.bs.modal', function () {
            console.log("Inside 2nd open model");
            // that.switch_state(that.states.select);
            // that.get_html_select_cluster();

            that.refresh_modal();
            
        }).modal('show');
        this.modal.find(".modal-header").unbind("mousedown");

        this.modal.on('hide.bs.modal', function () {
            return true;
        });
    }
}

SwitchCluster.prototype.refresh_modal = function() {
    this.send({'action': 'Refresh'});
}


SwitchCluster.prototype.send = function (msg) {
    this.comm.send(msg);
}


SwitchCluster.prototype.get_html_select_cluster = function() {
    // this.send({'action': 'Refresh'});
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    var header = this.modal.find('.modal-header');

    $('<h4 class="modal-title">Spark cluster setting</h4>').appendTo(header);
    // $('<link type="text/css" rel="stylesheet" href="css/materialize.min.css" />').appendTo(header);
    var contexts = this.contexts;
    // var current_cluster = this.current_cluster;
    var template = user_html;
    this.hide_close = true;
    html.append(template);
    var delete_list = this.delete_list;
    console.log("DELETE LIST: " + delete_list);
    // var list = [0, 1, 2, 3, 4, 5, 6];

    var that = this;
    var list_div = html.find("#user_html_inputs");

    for(var i = 0; i < contexts.length; i++) {
        if(delete_list[i] == "True") {
            $('<div class="cluster-list-div"><button class="list-item-delete pure-material-button-text" id="delete-' + contexts[i] + '">X</button><div class="list-item-text">' + contexts[i] + '</div><button style="visibility: hidden;" class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
        }
        else {
            $('<div class="cluster-list-div"><button style="visibility: hidden;" class="list-item-delete pure-material-button-text" id="delete-' + contexts[i] + '">X</button><div class="list-item-text">' + contexts[i] + '</div><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
        }

        // $('<div class="cluster-list-div"><div class="list-item-text">' + contexts[i] + '</div><button class="list-item-select pure-material-button-text" id="select.' + contexts[i] + '">Select</button></div><hr>').appendTo(list_div);
    }
    
    list_div.find(".list-item-select").on('click', function() {
        var button_id = $(this).attr('id');
        var current_context = button_id.split('.')[1];
        console.log("Selected cluster: " + current_context);
        
        that.send({
            'action': 'change-current-context',
            'context': current_context,
        });
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
    
    $('<br><br><br><br>').appendTo(list_div);

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
    $('<div class="fab-button" id="select-button"><i class="fa fa-plus"></i></div><br><br><br>')
        .appendTo(html)
        .on('click', $.proxy(this.switch_state, this, this.states.create));


    // $('<button>')
    //     .addClass('btn-blue')
    //     .attr('id', 'select-button')
    //     .text("Select Settings")
    //     .appendTo(footer)
    //     .on('click', $.proxy(this.change_cluster, this));
}



SwitchCluster.prototype.get_html_view_context = function() {
    console.log("Inside view modal!!");
    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');
    $('<h4 class="modal-title">Context: ' + this.current_context + '</h4>').appendTo(header);

    $("<button>")
        .addClass("back-button")
        .attr("type", "button")
        .text("<-")
        .appendTo(header)
        .on("click", $.proxy(this.refresh_modal, this));

    html.append('<div id="view_context"></div>');
    var div = html.find("#view_context")
    $('<h4 id="cluster_name">Cluster name: ' + this.view_cluster_name + '</h4><br>').appendTo(div);

    $('<h4 id="namespace">Namespace: ' + this.view_namespace + '</h4><br>').appendTo(div);
    
    $('<h4 id="svcaccount">Service Account: ' + this.view_svcaccount + '</h4><br>').appendTo(div);

    $('<div class="content"><h4 id="token" style="word-wrap: break-word;">Token: ' + this.view_token + '</h4><br>').appendTo(div);

}


SwitchCluster.prototype.select_context = function() {
    var button_id = $(this).attr('id');
    var current_context = button_id.split('.')[1];
    console.log("Selected cluster: " + current_context);

    this.send({
        'action': 'change-current-context',
        'context': current_context,
    });
}



SwitchCluster.prototype.change_cluster = function() {
    console.log("Sending msg to kernel to change KUBECONFIG")
    console.log("Modified cluster: " + this.current_context);
    this.send({
        'action': 'get-context-settings',
        'context': this.current_context,
    })
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
    
}


SwitchCluster.prototype.get_html_create_context = function() {
    console.log("Changed state")

    var html = this.modal.find('.modal-body');
    var header = this.modal.find('.modal-header');
    $('<h4 class="modal-title">Add new cluster & context</h4>').appendTo(header);

    $("<button>")
    .addClass("back-button")
    .attr("type", "button")
    .text("<-")
    .appendTo(header)
    .on("click", $.proxy(this.refresh_modal, this));

    html.append(create_context_html);

    var tabs = html.find("#material-tabs");

    var active = tabs.find(".active");

    var that = this;

    console.log(active.html());

    var clusters = this.clusters;

    this.selected_tab = active.html();
    tabs.click(function() {
        that.selected_tab = $(".active").html();
    })

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
    checkbox.change(function() {
        if($(this).is(":checked")) {
            that.checkbox_status = "checked";
            tab1.find("#br1").remove();
            tab1.find("#br2").remove();
            tab1.find("#br3").remove();
            tab1.find("#catoken_text_label").remove();
            tab1.find("#catoken_text").remove();

        }
        else {
            that.checkbox_status = "unchecked";
            $('<br id="br1"><br id="br2">').appendTo(tab1);

            $('<label for="catoken_text" id="catoken_text_label">CA Token (Base64)</label><br id="br3">').appendTo(tab1);
            
            if(that.local_selected_catoken) {
                var catoken_input = $('<input/>')
                    .attr('name', 'catoken_text')
                    .attr('type', 'text')
                    .attr("required", "required")
                    .attr('id', 'catoken_text')
                    .attr('value', that.local_selected_catoken)
                    .attr('placeholder', 'CA Token (Base64)')
                    .addClass('form__field')
                    .appendTo(tab1)
                    .change(function() {
                        that.local_selected_catoken = catoken_input.val();
                    });
            }
            else {
                var catoken_input = $('<input/>')
                    .attr('name', 'catoken_text')
                    .attr('type', 'text')
                    .attr("required", "required")
                    .attr('id', 'catoken_text')
                    .attr('placeholder', 'CA Token (Base64)')
                    .addClass('form__field')
                    .appendTo(tab1)
                    .change(function() {
                        that.local_selected_catoken = catoken_input.val();
                    });
            }
        }
    })



    $('<label for="clustername_text" id="clustername_text_label">Cluster name</label><br>').appendTo(tab1);
    
    if(this.local_selected_clustername) {
        var clustername_input = $('<input required/>')
            .attr('name', 'clustername_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'clustername_text')
            .attr('value', this.local_selected_clustername)
            .attr('placeholder', 'Cluster name')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_clustername = clustername_input.val();
            });
    }
    else {
        var clustername_input = $('<input required/>')
            .attr('name', 'clustername_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'clustername_text')
            .attr('placeholder', 'Cluster name')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_clustername = clustername_input.val();
            });
    }

    $('<br><br>').appendTo(tab1);

    $('<label for="ip_text" id="ip_text_label">Server IP</label><br>').appendTo(tab1);
    
    if(this.local_selected_ip) {
        var ip_input = $('<input/>')
            .attr('name', 'ip_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'ip_text')
            .attr('value', this.local_selected_ip)
            .attr('placeholder', 'Server IP')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_ip = ip_input.val();
            });
    }
    else {
        var ip_input = $('<input/>')
            .attr('name', 'ip_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'ip_text')
            .attr('placeholder', 'Server IP')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_ip = ip_input.val();
            });
    }
    

    $('<br><br>').appendTo(tab1);

    $('<label for="token_text" id="token_text_label">Token</label><br>').appendTo(tab1);
    
    if(this.local_selected_token) {
        var token_input = $('<input/>')
            .attr('name', 'token_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'token_text')
            .attr('value', this.local_selected_token)
            .attr('placeholder', 'Token')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_token = token_input.val();
            });
    }
    else {
        var token_input = $('<input/>')
            .attr('name', 'token_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'token_text')
            .attr('placeholder', 'Token')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_token = token_input.val();
            });
    }



    $('<br id="br1"><br id="br2">').appendTo(tab1);

    $('<label for="catoken_text" id="catoken_text_label">CA Token (Base64)</label><br id="br3">').appendTo(tab1);
    
    if(this.local_selected_catoken) {
        var catoken_input = $('<input/>')
            .attr('name', 'catoken_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'catoken_text')
            .attr('value', this.local_selected_catoken)
            .attr('placeholder', 'CA Token (Base64)')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_catoken = catoken_input.val();
            });
    }
    else {
        var catoken_input = $('<input/>')
            .attr('name', 'catoken_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'catoken_text')
            .attr('placeholder', 'CA Token (Base64)')
            .addClass('form__field')
            .appendTo(tab1)
            .change(function() {
                that.local_selected_catoken = catoken_input.val();
            });
    }




    $('<label for="openstack_clustername_text" id="openstack_clustername_text_label">Cluster name</label><br>').appendTo(tab2);
    
    if(this.openstack_selected_clustername) {
        var openstack_clustername_input = $('<input required/>')
            .attr('name', 'openstack_clustername_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_clustername_text')
            .attr('value', this.openstack_selected_clustername)
            .attr('placeholder', 'Cluster name')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_clustername = openstack_clustername_input.val();
            });
    }
    else {
        var openstack_clustername_input = $('<input required/>')
            .attr('name', 'openstack_clustername_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_clustername_text')
            .attr('placeholder', 'Cluster name')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_clustername = openstack_clustername_input.val();
            });
    }

    $('<br><br>').appendTo(tab2);

    $('<label for="openstack_ip_text" id="openstack_ip_text_label">Server IP</label><br>').appendTo(tab2);
    
    if(this.openstack_selected_ip) {
        var openstack_ip_input = $('<input/>')
            .attr('name', 'openstack_ip_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_ip_text')
            .attr('value', this.openstack_selected_ip)
            .attr('placeholder', 'Server IP')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_ip = openstack_ip_input.val();
            });
    }
    else {
        var openstack_ip_input = $('<input/>')
            .attr('name', 'openstack_ip_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_ip_text')
            .attr('placeholder', 'Server IP')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_ip = openstack_ip_input.val();
            });
    }
    

    $('<br><br>').appendTo(tab2);

    $('<label for="openstack_ostoken_text" id="openstack_ostoken_text_label">OS Token</label><br>').appendTo(tab2);
    
    if(this.openstack_selected_ostoken) {
        var openstack_ostoken_input = $('<input/>')
            .attr('name', 'openstack_ostoken_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_ostoken_text')
            .attr('value', this.openstack_selected_ostoken)
            .attr('placeholder', 'OS Token')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_ostoken = openstack_ostoken_input.val();
            });
    }
    else {
        var openstack_ostoken_input = $('<input/>')
            .attr('name', 'openstack_ostoken_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_ostoken_text')
            .attr('placeholder', 'OS Token')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_ostoken = openstack_ostoken_input.val();
            });
    }


    $('<br><br>').appendTo(tab2);

    $('<label for="openstack_catoken_text" id="openstack_catoken_text_label">CA Token (Base64)</label><br>').appendTo(tab2);
    
    if(this.openstack_selected_catoken) {
        var openstack_catoken_input = $('<input/>')
            .attr('name', 'openstack_catoken_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_catoken_text')
            .attr('value', this.openstack_selected_catoken)
            .attr('placeholder', 'CA Token (Base64)')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_catoken = openstack_catoken_input.val();
            });
    }
    else {
        var openstack_catoken_input = $('<input/>')
            .attr('name', 'openstack_catoken_text')
            .attr('type', 'text')
            .attr("required", "required")
            .attr('id', 'openstack_catoken_text')
            .attr('placeholder', 'CA Token (Base64)')
            .addClass('form__field')
            .appendTo(tab2)
            .change(function() {
                that.openstack_selected_catoken = openstack_catoken_input.val();
            });
    }



    // select1.change(function() {
    //     that.current_cluster = $(this).children("option:selected").val();
    // });
}

SwitchCluster.prototype.create_context = function() {
    var header = this.modal.find('.modal-header');
    var html = this.modal.find('.modal-body');
    var footer = this.modal.find('.modal-footer');
    var error_div = html.find('#setting-error');
    error_div.remove();

    if(this.selected_tab == "local") {
        if(this.checkbox_status == "unchecked") {
            if(!this.local_selected_clustername || !this.local_selected_ip || !this.local_selected_token || !this.local_selected_catoken) {
                this.send({
                    'action': 'show-error',
                })
                return;
            }
        }
        else {
            if(!this.local_selected_clustername || !this.local_selected_ip || !this.local_selected_token) {
                this.send({
                    'action': 'show-error',
                })
                return;
            }
        }
    }
    else if(this.selected_tab == "openstack") {
        if(!this.openstack_selected_catoken || !this.openstack_selected_clustername || !this.openstack_selected_ip || !this.openstack_selected_ostoken) {
            this.send({
                'action': 'show-error',
            })
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

    if(this.selected_tab == "local") {
        if(this.checkbox_status == "unchecked") {
            this.send({
                'action': 'add-context-cluster',
                'token': this.local_selected_token,
                'tab': this.selected_tab,
                'catoken': this.local_selected_catoken,
                'cluster_name': this.local_selected_clustername,
                'ip': this.local_selected_ip,
                'insecure_server': "false"
            });
        }
        else {
            this.send({
                'action': 'add-context-cluster',
                'token': this.local_selected_token,
                'tab': this.selected_tab,
                'cluster_name': this.local_selected_clustername,
                'ip': this.local_selected_ip,
                'insecure_server': "true"
            });
        }
    }
    else if(this.selected_tab == "openstack") {
        this.send({
            'action': 'add-context-cluster',
            'ostoken': this.openstack_selected_ostoken,
            'tab': this.selected_tab,
            'catoken': this.openstack_selected_catoken,
            'cluster_name': this.openstack_selected_clustername,
            'ip': this.openstack_selected_ip
        });
    }
}


SwitchCluster.prototype.redirect = function() {
    window.location.href = "http://spark.apache.org/";
};


SwitchCluster.prototype.on_comm_msg = function (msg) {
    if(msg.content.data.msgtype == 'context-select') {
        console.log("Got message from frontend: " + msg.content.data.active_context);
        this.current_context = msg.content.data.active_context;
        this.contexts = msg.content.data.contexts;
        this.current_cluster = msg.content.data.current_cluster;
        this.clusters = msg.content.data.clusters;
        this.delete_list = msg.content.data.delete_list;
        this.switch_state(this.states.select);
        this.send({
            'action': 'get-connection-detail',
        });
        // this.switch_state(this.states.select);
    }
    else if(msg.content.data.msgtype == 'authentication-successfull') {
        console.log("Authentication successfull");
        this.hide_close = false;
        this.modal.modal('hide');
        this.send({
            'action': 'get-connection-detail',
        });
        console.log("Authentication successfull");
    }
    else if(msg.content.data.msgtype == 'authentication-unsuccessfull') {
        console.log("Authentication unsuccessfull");
        this.hide_close = false;
        // this.open_modal();
        var html = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');
        $('<div id="setting-error"><br><h4 style="color: red;">You cannot use these settings. Please contact your admin</h4></div>').appendTo(html);

        console.log("Authentication unsuccessfull");

        footer.find('#select-button').attr('disabled', false);
        header.find('.close').show();
    }
    else if(msg.content.data.msgtype == 'context-info') {
        this.view_cluster_name = msg.content.data.cluster_name;
        this.view_svcaccount = msg.content.data.svcaccount;
        this.view_namespace = msg.content.data.namespace;
        this.view_token = msg.content.data.token;

        this.switch_state(this.states.view);
    }
    else if(msg.content.data.msgtype == 'added-context-successfully') {

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
            'action': 'get-connection-detail',
        });
        console.log("Added context successfull");
    }
    else if(msg.content.data.msgtype == 'added-context-unsuccessfully') {
        console.log("Added context unsuccessfull");
        this.hide_close = false;
        var html = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');
        var header = this.modal.find('.modal-header');
        var error = msg.content.data.error;
        $('<div id="setting-error"><br><h4 style="color: red;">' + error + '</h4></div>').appendTo(html);

        console.log("Added context unsuccessfull");

        footer.find('#select-button').attr('disabled', false);
        header.find('.close').show();
    }
    else if(msg.content.data.msgtype == 'changed-current-context') {
        this.hide_close = false;
        this.modal.modal('hide');
        this.send({
            'action': 'get-connection-detail',
        });
    }
    else if(msg.content.data.msgtype == 'connection-details') {
        var context = msg.content.data.context;
        this.toolbar_button.text("Connected: " + context);
    }
    else if(msg.content.data.msgtype == 'connection-details-error') {
        this.toolbar_button.text("Not connected");
    }
}



SwitchCluster.prototype.switch_state = function (new_state) {
    this.state = new_state;

    if (this.modal) {
        Jupyter.keyboard_manager.disable()
        var header = this.modal.find('.modal-header');
        var body = this.modal.find('.modal-body');
        var footer = this.modal.find('.modal-footer');

        header.html('');
        body.html('');
        footer.html('');
        // $('<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">').appendTo(header);

        $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>').appendTo(header);

        new_state.get_html();

        $.each(new_state.buttons, function (name, options) {
            $('<button>')
                .addClass('btn-blue')
                .attr('id', 'select-button')
                .on('click', options.click)
                .text(name)
                .appendTo(footer);
        });

        // if (new_state.hide_close) {
        //     header.find('.close').hide();
        // } else {
        //     header.find('.close').show();
        // }
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
    // conn.send({
    //     'action': 'get-connection-detail',
    // });
}

export {load_ipython_extension}