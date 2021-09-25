Ext.define('Admin.view.kasbankkeluar.KasBankKeluar', {
    extend: 'Ext.container.Container',
    xtype: 'kasbankkeluar',
    controller: 'kasbankkeluar',
    
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    margin: '20 0 0 20',

    items: [
        {
            xtype: 'container',
            itemId: 'contentPanel',
            margin: '0 20 20 0',
            flex: 1,
            layout: {
                type : 'anchor',
                anchor : '100%'
            }
        }
    ]
});
