Ext.define('Admin.model.pembayaran.edit', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'nobukti',
        'tanggal',
        'jenistransaksi',
        'rekeningheader',
        'divisi',
        {name: 'draft', type: 'bool'},
        'keterangan'
    ]
});