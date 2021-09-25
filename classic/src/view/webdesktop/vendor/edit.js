Ext.define('Admin.view.webdesktop.vendor.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-vendor-edit',
    controller: 'vendor',
    
    layout: 'fit',
    border: false,
    
    width: 500,
    height: 550,

    items: [{
        xtype: 'vendor-edit'
    }]
});