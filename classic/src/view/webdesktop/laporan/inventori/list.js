Ext.define('Admin.view.webdesktop.laporan.inventori.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporaninventorilist',

    title : 'Laporan Inventori',
    border: false,

    layout: 'fit',
    modulId: 'LI',

    width: 1290,
    height: 560,

    constructor: function(c) {
        var me = this;
        this.items = [{
            xtype: 'tabpanel',
            items: [
                Ext.create('Admin.view.webdesktop.laporan.inventori.stoklistpaperroll', {
                    title: 'Stock List '+(c.grup=='OWN'?'(Persediaan)':'(Titipan)'),
                    grup: c.grup,
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.inventori.stoklistpaperrollsold', {
                    title: 'Stock List '+(c.grup=='OWN'?'(Persediaan)':'(Titipan)')+' Out',
                    grup: c.grup,
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.inventori.stoklistpapersheet', {
                    title: 'Paper Sheet (PK)',
                    grup: c.grup,
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.inventori.stoklistpaperwasted', {
                    title: 'Paper Waste (PK)',
                    grup: c.grup,
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.inventori.stoklistpapercore', {
                    title: 'Paper Core (PK)',
                    grup: c.grup,
                    aksesStore: c.aksesStore
                }),
                Ext.create('Admin.view.webdesktop.laporan.inventori.stoklistpaperreject', {
                    title: 'Paper Reject (PK)',
                    grup: c.grup,
                    aksesStore: c.aksesStore
                })
            ]
        }];

        this.callParent(arguments);
    },

    loadData: function() {
        var me = this;

        me.down('laporaninventoripersediaan').loadData();
        me.down('laporaninventoristoklistpaperroll').loadData();
        me.down('laporaninventoristoklistpapersheet').loadData();
        me.down('laporaninventoristoklistpaperwasted').loadData();
//        me.down('laporaninventoristockexpired').loadData();
//        me.down('laporaninventorilplpo').loadData();
//        me.down('laporaninventorikartustock').loadData();
//        me.down('laporaninventoristocksekarang').loadData();

    }
});