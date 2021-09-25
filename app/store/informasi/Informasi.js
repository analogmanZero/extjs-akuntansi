Ext.define('Admin.store.informasi.Informasi', {
    extend: 'Ext.data.Store',

    alias: 'store.informasi',

    model: 'Admin.model.informasi.Informasi',

    proxy: {
        type: 'ajax',
        url: './server/public/informasi',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true

});
