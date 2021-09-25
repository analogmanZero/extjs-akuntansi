Ext.define('Admin.store.voucher.Voucher', {
    extend: 'Ext.data.Store',
    alias: 'store.voucher',

    model: 'Admin.model.voucher.Voucher',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/voucher',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
