Ext.define('Admin.view.webdesktop.penjualan.voucher.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-penjualan-voucher-edit',
    controller: 'penjualan-voucher',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 650,

    items: [{
        xtype: 'penjualan-voucher-edit'
    }]
});