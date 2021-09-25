Ext.define('Admin.store.vendor.Vendor', {
    extend: 'Ext.data.Store',
    alias: 'store.vendor',

    model: 'Admin.model.vendor.Vendor',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/vendor',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
