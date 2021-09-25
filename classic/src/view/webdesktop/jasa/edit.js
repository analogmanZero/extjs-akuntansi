Ext.define('Admin.view.webdesktop.jasa.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-jasa-edit',
    controller: 'jasa',
    
    layout: 'fit',
    border: false,
    
    width: 450,
    height: 520,

    items: [{
        xtype: 'jasa-edit'
    }]
});