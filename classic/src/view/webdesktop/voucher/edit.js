Ext.define('Admin.view.webdesktop.voucher.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-voucher-edit',
    controller: 'voucher',
    
    layout: 'fit',
    border: false,
    
    width: 500,
    height: 450,

    items: [{
        xtype: 'voucher-edit'
    }]
});