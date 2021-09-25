Ext.define('Admin.model.pembelian.Pembelian', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'notrx'
        },
        {
            type: 'string',
            name: 'tanggal'
        },
        {
            type: 'int',
            name: 'id_vendor'
        },
        {
            type: 'string',
            name: 'vendor'
        },
        {
            type: 'string',
            name: 'keterangan'
        },  
        {
            type: 'string',
            name: 'no_po'
        },
        {
            type: 'string',
            name: 'jenis_trx'
        },
        {
            type: 'int',
            name: 'subtotal'
        },
        {
            type: 'int',
            name: 'totalpajak'
        },
        {
            type: 'int',
            name: 'totaldiskon'
        },
        {
            type: 'int',
            name: 'total'
        },
        {
            type: 'bool',
            name: 'draft'
        }
    ]
});