Ext.define('Admin.store.akun.AkunHutang', {
    extend: 'Ext.data.Store',
    alias: 'store.akunhutang',

    model: 'Admin.model.akun.Akun',

    proxy: {
        type: 'ajax',
        url: './server/public/listakun/hutang',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
