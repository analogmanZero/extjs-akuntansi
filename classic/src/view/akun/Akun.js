Ext.define('Admin.view.akun.Akun', {
    extend: 'Ext.container.Container',
    xtype: 'akun',
    controller: 'akun',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    margin: '20 0 0 20',

    items: [{
        xtype: 'container',
        itemId: 'contentPanel',
        margin: '0 20 20 0',
        flex: 1,
        layout: {
            type : 'anchor',
            anchor : '100%'
        }
    }]
});
