Ext.define('Admin.view.webdesktop.menu.winMenuBeli', {
    extend: 'Ext.window.Window',
    alias : 'widget.winMenuBeli',

    title : 'Pembelian',
    modulId :'menuBeli',

    width: 250,
    height: 200,

    layout :'fit',
    border: false,
    disabledMaximize: true,

    constructor: function(c) {
        var me     = this;
        Ext.apply(c, {
            items: [{
                xtype: 'wallpaper',
                wallpaper: 'resources/images/webdesktop/deko.png',
                stretch: true
            }, {
                xtype: 'viewIconMenu',
                store: Ext.create('Admin.store.stores', {
                    fields: ['name','id','url','x','y','css','modul', {name: 'params', type: 'auto'}],
                    url: 'api/store/menu/beli/dataStore.php',
                    autoLoad: true
                })
            }]
        });


        me.callParent(arguments);
    }
});