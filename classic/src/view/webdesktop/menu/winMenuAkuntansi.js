Ext.define('Admin.view.webdesktop.menu.winMenuAkuntansi', {

    extend: 'Ext.window.Window',
    alias : 'widget.winMenuAkutansi',

    modulId :'menuAkuntansi',
    title : 'Akuntansi',
    
    width: 370,
    height: 205,

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
                url: 'api/store/menu/accounting/dataStore.php',
                autoLoad: true
            })
        }];
             
        this.callParent(arguments);
    }
});


