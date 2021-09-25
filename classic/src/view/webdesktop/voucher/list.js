Ext.define('Admin.view.webdesktop.voucher.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-voucher-list',
    controller: 'voucher',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'voucher-list'
    }]

});
