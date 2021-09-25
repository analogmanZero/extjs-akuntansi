Ext.define('Admin.view.informasi.InformasiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.informasi',

    onShow: function ( form, container, index, eOpts ) {
        var me = this,
            view = me.getView();

        view.removeAll();
        view.add({
            xtype: 'informasi-list',
            flex: 1
        });
    },

    onLoadList: function ( panel, container, index, eOpts ) {
        var dataview = this.getView().down('dataview'),
            store    = dataview.getStore();

        store.loadPage(1);
    },
    
    onLoadView: function ( panel, container, index, eOpts ) {
        var dataview = panel.down('dataview');
        var store = dataview.getStore();
        store.loadRecords(panel.datarec);
    },

    

    onSelect: function (dataview, record) {
        var me = this,
            view = me.getView();
            
        view.removeAll();
        view.add({
            xtype: 'informasi-view',
            datarec: record,
            flex: 1
        });
    }
});
