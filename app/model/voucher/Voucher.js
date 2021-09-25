Ext.define('Admin.model.voucher.Voucher', {
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
            name: 'id_area'
        },  
        {
            type: 'string',
            name: 'area'
        },
        {
            type: 'int',
            name: 'harga_jual'
        },
        {
            type: 'bool',
            name: 'pajak_jual'
        }
    ]
});