Ext.define('Admin.store.JenisRekening', {
    extend: 'Ext.data.Store',
    alias: 'store.jenisrek',

    fields: [{
        type: 'int',
        name: 'id'
    },
    {
        type: 'string',
        name: 'jenis'
    }],

    data: [
        {id: 1, jenis: 'A'}, 
        {id: 2, jenis: 'P'}, 
        {id: 3, jenis: 'R'}, 
        {id: 4, jenis: 'R2'}
    ]
});