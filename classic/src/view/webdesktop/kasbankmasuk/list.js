Ext.define('Admin.view.webdesktop.kasbankmasuk.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-kasbankmasuk-list',
    controller: 'kasbankmasuk',
    
    layout: 'fit',
    border: false,

    width: 950,
    height: 500,

    items: [{
        xtype: 'kasbankmasuk-list'
    }]
});
