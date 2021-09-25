Ext.define('Admin.view.webdesktop.login.loginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.webdesktop-login',
    
    onLogin: function(btn) {
        var view = this.getView();
        var form = view.down('webdesktop-login-form');

        if(form.getForm().isValid()) {
            form.getForm().waitMsgTarget = view.getEl();
            form.getForm().submit({
                params: {task: 'login'},
                url: './server/public/login',
                waitMsg: 'Login...',
                success:function(frm, action) {
                    view.close();
                    view.usermenu.fireEvent('afterrender', view.usermenu);
                },
                failure:function(frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn: function() {
                            form.down('textfield[name=username]').focus(true, 10);
                        }
                    })
                }
            });
        }
    }

});