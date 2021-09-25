Ext.define('Admin.view.webdesktop.kasbankkeluar.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-kasbankkeluar-list',
    controller: 'kasbankkeluar',
    
    layout: 'fit',
    border: false,

    width: 950,
    height: 500,

    items: [{
        xtype: 'kasbankkeluar-list'
    }]
});
