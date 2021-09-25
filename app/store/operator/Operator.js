Ext.define('Admin.store.operator.Operator', {
    extend: 'Ext.data.Store',

    alias: 'store.operator',

    model: 'Admin.model.operator.Operator',

    pageSize: 25,

    proxy: {
        type: 'ajax',
        url: './server/public/operator',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: true
    
});
