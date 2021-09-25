Ext.define('Admin.store.SaldoNormal', {
    extend: 'Ext.data.Store',
    alias: 'store.saldonormal',

    fields: [
    {
        type: 'string',
        name: 'id'
    }],

    data: [
        {id: 'D'}, 
        {id: 'K'}
    ]
});