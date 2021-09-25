Ext.define('Admin.view.webdesktop.jasa.list', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-jasa-list',
    controller: 'jasa',
    
    layout: 'fit',
    border: false,

    width: 900,
    height: 500,

    items: [{
        xtype: 'jasa-list'
    }]

});
