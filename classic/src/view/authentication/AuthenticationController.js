Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    onLoginButton: function(button) {
        
        var me = this;
        var login = button.up('login');
        var form = login.down('authdialog');

        form.submit({
            url: 'server/public/login',
            success: function(form, action) {
                var json = Ext.JSON.decode(action.response.responseText);
                
                localStorage.setItem('user', JSON.stringify(json['data']));
                localStorage.setItem('menu', JSON.stringify(json['menu']));        
                me.redirectTo('dashboard', true);
            },
            failure: function(form, action) {
                var json = Ext.JSON.decode(action.response.responseText);

                Ext.MessageBox.alert('Error', json['message']);
            }
        })
        
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    }
});