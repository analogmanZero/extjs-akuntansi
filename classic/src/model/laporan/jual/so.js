Ext.define('Admin.model.laporan.jual.so', {
    extend: 'Ext.data.Model',
    fields: ['level','no','noso','tanggal','pelanggan','matauang','kurs','subtotal','diskonextra','total','uangmuka','pajak','sales','termin','tunai','tabel_name',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});