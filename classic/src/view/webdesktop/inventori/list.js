Ext.define('Admin.view.webdesktop.inventori.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-inventori-list',
    controller: 'inventori',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'inventori-list'
    }]

});
