Ext.define('Admin.store.akun.AkunPiutang', {
    extend: 'Ext.data.Store',
    alias: 'store.akunpiutang',

    model: 'Admin.model.akun.Akun',


    proxy: {
        type: 'ajax',
        url: './server/public/listakun/piutang',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
