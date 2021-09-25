Ext.define('Admin.view.webdesktop.login.Window',{
    extend 	: 'Ext.Window',
    xtype: 'webdesktop-login',

    controller: 'webdesktop-login',

    width: 400,
    height: 280,

    closable: false,
    draggable: false,
    resizable: false,
    border: false,

    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    items:[{
        xtype: 'panel',
        
        layout: 'fit',
        bodyPadding: 10,
        items: [{
            xtype: 'panel',
            border: true,
            bodyCls: 'login-header'
        }],
        height: 130
    },
    {
        xtype: 'webdesktop-login-form',
        margin: '0 0 5 0',
        flex: 1
    }]

});