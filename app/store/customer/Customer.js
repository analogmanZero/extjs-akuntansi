Ext.define('Admin.store.customer.Customer', {
    extend: 'Ext.data.Store',
    alias: 'store.customer',

    model: 'Admin.model.customer.Customer',

    pageSize: 25,
    
    proxy: {
        type: 'ajax',
        url: './server/public/customer',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
});
