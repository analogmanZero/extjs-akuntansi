Ext.define('Admin.model.jasa.Jasa', {
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
            type: 'int',
            name: 'harga_jual'
        },
        {
            type: 'bool',
            name: 'pajak_jual'
        },
        {
            type: 'string',
            name: 'keterangan'
        }
    ]
});