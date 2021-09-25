Ext.define('Admin.store.inventori.Inventori', {
    extend: 'Ext.data.Store',
    alias: 'store.inventori',

    model: 'Admin.model.inventori.Inventori',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/inventori',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
