Ext.define('Admin.view.webdesktop.bayarpenjualan.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-bayarpenjualan-list',
    controller: 'bayarpenjualan',
    
    layout: 'fit',
    border: false,

    width: 950,
    height: 500,

    items: [{
        xtype: 'bayarpenjualan-list'
    }]
});
