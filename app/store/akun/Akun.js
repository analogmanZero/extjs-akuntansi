Ext.define('Admin.store.akun.Akun', {
    extend: 'Ext.data.Store',
    alias: 'store.akun',

    model: 'Admin.model.akun.Akun',

    proxy: {
        type: 'ajax',
        url: './server/public/listakun/all',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
