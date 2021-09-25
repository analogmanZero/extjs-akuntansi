Ext.define('Admin.model.penjualan.edit', {
    extend: 'Ext.data.Model',
    fields:[
        'id',
        'notrx',
        'tanggal',
        'proyek',
        'jenistransaksi',
        'keterangan',
        'subtotal',
        'totalmanagemenfee',
        'totalpajak',
        'total'
    ]
});
