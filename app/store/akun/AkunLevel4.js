Ext.define('Admin.store.akun.AkunLevel4', {
    extend: 'Ext.data.Store',
    alias: 'store.akun-level-4',

    model: 'Admin.model.akun.Akun',

    proxy: {
        type: 'ajax',
        url: './server/public/listakun/akunlevel4',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
