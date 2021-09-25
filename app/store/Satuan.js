Ext.define('Admin.store.Satuan', {
    extend: 'Ext.data.Store',

    alias: 'store.satuan',
    model: 'Admin.model.satuan.Satuan',

    proxy: {
        type: 'ajax',
        url: './server/public/satuan',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true

});
