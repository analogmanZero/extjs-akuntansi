Ext.define('Admin.view.webdesktop.satuan.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-satuan-edit',
    controller: 'satuan',
    
    layout: 'fit',
    border: false,
    
    width: 350,
    height: 250,

    items: [{
        xtype: 'satuan-edit'
    }]
});