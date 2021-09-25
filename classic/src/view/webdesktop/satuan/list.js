Ext.define('Admin.view.webdesktop.satuan.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-satuan-list',
    controller: 'satuan',
    
    layout: 'fit',
    border: false,

    width: 500,
    height: 350,

    items: [{
        xtype: 'satuan-list'
    }]

});
