Ext.define('Admin.store.jasa.Jasa', {
    extend: 'Ext.data.Store',
    alias: 'store.jasa',

    model: 'Admin.model.jasa.Jasa',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/jasa',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
