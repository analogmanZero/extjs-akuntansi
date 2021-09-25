Ext.define('Admin.model.laporan.beli.po', {
    extend: 'Ext.data.Model',
    fields: ['level','no','nopo','tanggal','vendor','matauang','kurs','subtotal','diskonextra','total','uangmuka','pajak','termin','tunai','tabel_name',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});