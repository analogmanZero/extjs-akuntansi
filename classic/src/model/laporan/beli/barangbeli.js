Ext.define('Admin.model.laporan.beli.barangbeli', {
    extend: 'Ext.data.Model',
    fields: ['level','no','tanggal','notrx','no_barang','kode_barang','nama_barang','qty','harga','diskon','vendor',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});