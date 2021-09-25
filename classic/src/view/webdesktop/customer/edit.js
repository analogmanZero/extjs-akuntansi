Ext.define('Admin.view.webdesktop.customer.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-customer-edit',
    controller: 'customer',
    
    layout: 'fit',
    border: false,
    
    width: 500,
    height: 550,

    items: [{
        xtype: 'customer-edit'
    }]
});