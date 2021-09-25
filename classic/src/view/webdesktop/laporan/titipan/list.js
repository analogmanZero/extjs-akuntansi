Ext.define('Admin.view.webdesktop.laporan.titipan.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporantitipanlist',

    title : 'Laporan Inventori Titipan',
    border: false,

    layout: 'fit',
    modulId: 'LIT',

    width: 1290,
    height: 560,

    constructor: function(c) {
        var me = this;
        this.items = [{
            xtype: 'tabpanel',
            items: [
                Ext.create('Admin.view.webdesktop.laporan.titipan.stoklistpaperroll', {
                    title: 'Stock List Papar Roll (Titipan)',
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.titipan.stoklistpaperrollsold', {
                    title: 'Stock List Papar Roll (Titipan Out)',
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.titipan.stoklistpapersheet', {
                    title: 'Paper Sheet (PK)',
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.titipan.stoklistpaperwasted', {
                    title: 'Paper Waste (PK)',
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.titipan.stoklistpapercore', {
                    title: 'Paper Core (PK)',
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.titipan.stoklistpaperreject', {
                    title: 'Paper Reject (PK)',
                    aksesStore: c.aksesStore
                })
            ]
        }];

        this.callParent(arguments);
    },

    loadData: function() {
        var me = this;

        me.down('laporantitipanpersediaan').loadData();
        me.down('laporantitipanstoklistpaperroll').loadData();
        me.down('laporantitipanstoklistpapersheet').loadData();
        me.down('laporantitipanstoklistpaperwasted').loadData();
//        me.down('laporantitipanstockexpired').loadData();
//        me.down('laporantitipanlplpo').loadData();
//        me.down('laporantitipankartustock').loadData();
//        me.down('laporantitipanstocksekarang').loadData();

    }
});