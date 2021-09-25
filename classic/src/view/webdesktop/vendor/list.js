Ext.define('Admin.view.webdesktop.vendor.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-vendor-list',
    controller: 'vendor',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'vendor-list'
    }]

});
