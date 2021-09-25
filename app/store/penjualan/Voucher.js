Ext.define('Admin.store.penjualan.Voucher', {
    extend: 'Ext.data.Store',
    alias: 'store.penjualan-voucher',

    model: 'Admin.model.penjualan.Penjualan',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/penjualan/voucher',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
