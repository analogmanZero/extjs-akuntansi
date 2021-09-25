Ext.define('Admin.store.penjualan.Penjualan', {
    extend: 'Ext.data.Store',
    alias: 'store.penjualan',

    model: 'Admin.model.penjualan.Penjualan',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/penjualan',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
