Ext.define('Admin.view.webdesktop.area.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-area-list',
    controller: 'area',
    
    layout: 'fit',
    border: false,

    width: 600,
    height: 400,

    items: [{
        xtype: 'area-list'
    }]

});
