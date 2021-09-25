Ext.define('Admin.store.akun.AkunKasBank', {
    extend: 'Ext.data.Store',
    alias: 'store.akunkasbank',

    model: 'Admin.model.akun.Akun',


    proxy: {
        type: 'ajax',
        url: './server/public/listakun/kasbank',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
