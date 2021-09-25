Ext.define('Admin.view.webdesktop.kasbankmasuk.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-kasbankmasuk-edit',
    controller: 'kasbankmasuk',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 600,

    items: [{
        xtype: 'kasbankmasuk-edit'
    }]
});