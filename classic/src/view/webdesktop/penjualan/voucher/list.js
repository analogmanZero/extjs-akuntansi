Ext.define('Admin.view.webdesktop.penjualan.voucher.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-penjualan-voucher-list',
    controller: 'penjualan-voucher',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'penjualan-voucher-list'
    }]

});
