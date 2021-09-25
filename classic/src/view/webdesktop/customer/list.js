Ext.define('Admin.view.webdesktop.customer.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-customer-list',
    controller: 'customer',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'customer-list'
    }]

});
