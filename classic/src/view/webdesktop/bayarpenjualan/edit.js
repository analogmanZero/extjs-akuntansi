Ext.define('Admin.view.webdesktop.bayarpenjualan.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-bayarpenjualan-edit',
    controller: 'bayarpenjualan',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 600,

    items: [{
        xtype: 'bayarpenjualan-edit'
    }]
});