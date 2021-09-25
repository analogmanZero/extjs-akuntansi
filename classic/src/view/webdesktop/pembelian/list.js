Ext.define('Admin.view.webdesktop.pembelian.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-pembelian-list',
    controller: 'pembelian',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'pembelian-list'
    }]

});
