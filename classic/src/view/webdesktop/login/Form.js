Ext.define('Admin.view.webdesktop.login.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'webdesktop-login-form',

    layout: 'anchor',
    border: false,
    
    fieldDefaults: {
        msgTarget: 'side',
        labelWidth: 80,
        allowBlank: false,
        anchor: '100%',
        labelStyle: 'font-weight: bold;'
    },
    
    bodyPadding: 10,

    items: [{
        xtype       : 'textfield',
        fieldLabel  : 'Id User',
        name        : 'username'
    }, {
        xtype       : 'textfield',
        inputType   : 'password',
        fieldLabel  : 'Password',
        name        : 'password'
    }],

    bbar: [ '->', 
    {
        icon: 'resources/images/webdesktop/login_button.png',
        text: '<B>Login</B>',
        handler: 'onLogin'
    }]
    
});