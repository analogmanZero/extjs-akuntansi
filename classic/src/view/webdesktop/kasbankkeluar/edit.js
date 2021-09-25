Ext.define('Admin.view.webdesktop.kasbankkeluar.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-kasbankkeluar-edit',
    controller: 'kasbankkeluar',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 600,

    items: [{
        xtype: 'kasbankkeluar-edit'
    }]
});