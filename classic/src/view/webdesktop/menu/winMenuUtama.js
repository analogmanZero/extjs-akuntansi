Ext.define('Admin.view.webdesktop.menu.winMenuUtama', {

    extend: 'Ext.window.Window',
    alias : 'widget.winMenuUtama',
    modulId :'menuUtama',
    
    title : 'Inisialisasi',

    width: 370,
    height: 350,
    
    layout: 'fit',
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
                fields: ['name', 'id', 'url','x','y','css', 'modul'],
                url: 'api/store/menu/utama/dataStore.php',
                autoLoad: true
            })
        }];
        
        this.callParent(arguments);
    }
});
