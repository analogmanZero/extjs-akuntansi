Ext.define('Admin.view.webdesktop.pembelian.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-pembelian-edit',
    controller: 'pembelian',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 650,

    items: [{
        xtype: 'pembelian-edit'
    }]
});