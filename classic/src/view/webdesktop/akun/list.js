Ext.define('Admin.view.webdesktop.akun.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-akun-list',
    controller: 'akun',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'akun-list'
    }]

});
