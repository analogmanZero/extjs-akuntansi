Ext.define('Admin.view.webdesktop.menu.winMenuInventori', {

    extend: 'Ext.window.Window',
    alias : 'widget.winMenuInventori',

    title : 'Inventori',
    modulId :'menuInventori',
    
    width: 370,
    height: 450,
    
    layout :'fit',
    border: false,
    disabledMaximize: true,
    constructor: function(c) {

        var me = this;

        me.items = [{
            xtype: 'wallpaper',
            wallpaper: 'resources/images/webdesktop/deko.png',
            stretch: true
        }, {
            xtype: 'viewIconMenu',
            store: Ext.create('Admin.store.stores', {
                fields: ['name','id','url','x','y','css','modul', {name: 'params', type: 'auto'}],
                url: 'api/store/menu/inventori/dataStore.php',
                autoLoad: true
            })
        }];

        this.callParent(arguments);
    }
});