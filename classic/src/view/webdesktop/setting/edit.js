Ext.define('Admin.view.webdesktop.setting.edit', {
    extend: 'Ext.window.Window',
    xtype: 'webdesktop-setting-edit',
    controller: 'setting',
    
    modal: true,
    layout: 'fit',
    border: false,
    
    width: 500,
    height: 500,

    items: [{
        xtype: 'setting-umum'
    }]
});