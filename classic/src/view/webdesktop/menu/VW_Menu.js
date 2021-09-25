Ext.define('Admin.view.webdesktop.menu.VW_Menu', {
    extend: 'Ext.container.Viewport',
    xtype: 'usermenu',

    windows: new Ext.util.MixedCollection(),
    cls: 'utama',
    autoShow: true,
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'xdataview',
        flex: 1
    },
    {
        xtype: 'xtaskbar'
    }]

});
