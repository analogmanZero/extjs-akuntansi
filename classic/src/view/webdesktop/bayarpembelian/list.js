Ext.define('Admin.view.webdesktop.bayarpembelian.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-bayarpembelian-list',
    controller: 'bayarpembelian',
    
    layout: 'fit',
    border: false,

    width: 950,
    height: 500,

    items: [{
        xtype: 'bayarpembelian-list'
    }]
});
