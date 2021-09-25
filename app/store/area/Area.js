Ext.define('Admin.store.area.Area', {
    extend: 'Ext.data.Store',
    alias: 'store.area',

    model: 'Admin.model.area.Area',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/area',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
