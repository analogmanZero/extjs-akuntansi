Ext.define('Admin.view.webdesktop.penjualan.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-penjualan-list',
    controller: 'penjualan',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'penjualan-list'
    }]

});
