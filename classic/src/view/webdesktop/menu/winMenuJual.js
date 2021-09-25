Ext.define('Admin.view.webdesktop.menu.winMenuJual', {
    extend: 'Ext.window.Window',
    alias : 'widget.winMenuJual',

    title : 'Penjualan', 
    modulId :'menuJual',   
    
    width: 370,
    height: 450,
    
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
                    url: 'api/store/menu/jual/dataStore.php',
                    autoLoad: true
                })
            }]
        });


        me.callParent(arguments);
    }
});

