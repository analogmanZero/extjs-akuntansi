Ext.define('Admin.model.laporan.jual.barangjual', {
    extend: 'Ext.data.Model',
    fields: ['level','no','tanggal','notrx','no_barang','kode_barang','nama_barang','qty','harga','diskon','pelanggan',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});