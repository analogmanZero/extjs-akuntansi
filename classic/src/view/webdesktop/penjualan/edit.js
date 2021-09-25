Ext.define('Admin.view.webdesktop.penjualan.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-penjualan-edit',
    controller: 'penjualan',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 650,

    items: [{
        xtype: 'penjualan-edit'
    }]
});