Ext.define('Admin.model.inventori.Inventori', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'kode'
        },
        {
            type: 'string',
            name: 'nama'
        },
        {
            type: 'string',
            name: 'satuan'
        },
        {
            type: 'bool',
            name: 'pajak_jual'
        },  
        {
            type: 'bool',
            name: 'pajak_beli'
        },
        {
            type: 'int',
            name: 'harga_jual'
        },
        {
            type: 'int',
            name: 'harga_beli'
        },
        {
            type: 'string',
            name: 'keterangan'
        }
    ]
});