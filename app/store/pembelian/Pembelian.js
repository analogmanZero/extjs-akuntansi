Ext.define('Admin.store.pembelian.Pembelian', {
    extend: 'Ext.data.Store',
    alias: 'store.pembelian',

    model: 'Admin.model.pembelian.Pembelian',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/pembelian',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
