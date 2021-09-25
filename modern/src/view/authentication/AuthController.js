Ext.define('Admin.view.authentication.AuthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.auth',

    onLoginButton: function(button) {
        
        var me = this;
        var form = me.lookup('loginform');

        form.submit({
            url: 'server/public/login',
            success: function(form, action) {
                //untuk versi mobile parameter action sudah dalam format JSON
                localStorage.setItem('m_user', JSON.stringify(action['data']));
                localStorage.setItem('m_menu', JSON.stringify(action['menu']));
                
                me.redirectTo('dashboard');
            },
            failure: function(form, action) {
                var json = Ext.JSON.decode(action.responseText);
                Ext.Msg.alert('Error', json['message']);
            }
        })
        
    }

});
