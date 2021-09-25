Ext.define('Admin.model.laporan.beli.faktur', {
    extend: 'Ext.data.Model',
    fields: ['level','no','nofaktur','tanggal','vendor','noref','matauang','kurs','gudang','alamat','kirim',
             'status','sales','subtotal','diskonextra','pajak','biaya','total','uangmuka','bayar','sisa','iconCls',
             {name: 'leaf', type: 'bool'},
             {name: 'expanded', type: 'bool'}]
});