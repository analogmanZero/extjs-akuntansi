Ext.define('Admin.view.webdesktop.akun.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-akun-edit',
    controller: 'akun',
    
    layout: 'fit',
    border: false,
    
    width: 500,
    height: 620,

    items: [{
        xtype: 'akun-edit'
    }]
});