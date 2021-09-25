Ext.define('Admin.view.webdesktop.inventori.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-inventori-edit',
    controller: 'inventori',
    
    layout: 'fit',
    border: false,
    
    width: 500,
    height: 550,

    items: [{
        xtype: 'inventori-edit'
    }]
});