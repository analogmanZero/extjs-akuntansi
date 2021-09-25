Ext.define('Admin.view.webdesktop.area.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-area-edit',
    controller: 'area',
    
    layout: 'fit',
    border: false,
    
    width: 400,
    height: 300,

    items: [{
        xtype: 'area-edit'
    }]
});