Ext.define('Admin.view.webdesktop.bayarpembelian.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-bayarpembelian-edit',
    controller: 'bayarpembelian',
    
    layout: 'fit',
    border: false,
    
    width: 900,
    height: 600,

    items: [{
        xtype: 'bayarpembelian-edit'
    }]
});