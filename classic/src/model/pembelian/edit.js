Ext.define('Admin.model.pembelian.edit', {
    extend: 'Ext.data.Model',
    fields:[
        'id',
        'notrx',
        'tanggal',
        'vendor',
        'keterangan',
        'nopo',
        'jenistrx',
        {name: 'draft', type: 'bool'},
        'subtotal',
        'totalpajak',
        'totaldiskon',
        'total'
        ]
});
