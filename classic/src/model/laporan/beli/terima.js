Ext.define('Admin.model.laporan.beli.terima', {
    extend: 'Ext.data.Model',
    fields: ['level','no','noterima','tanggal','pelanggan','noref','matauang','kurs','alamatkirim','alamat','tabel_name',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});