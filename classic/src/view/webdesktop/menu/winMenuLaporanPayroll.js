Ext.define('Admin.view.webdesktop.menu.winMenuLaporanPayroll', {

    extend: 'Ext.window.Window',
    alias : 'widget.winMenuLaporanPayroll',

    modulId :'menuLaporanPayroll',
    title : 'Laporan Payroll',
    
    width: 370,
    height: 500,

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
                url: 'api/store/menu/payroll/dataStore.php',
                autoLoad: true
            })
        }];
             
        this.callParent(arguments);
    }
});


