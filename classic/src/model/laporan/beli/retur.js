Ext.define('Admin.model.laporan.beli.retur', {
    extend: 'Ext.data.Model',
    fields: ['level','no','noretur','tanggal','vendor','noref','matauang','kurs','gudang','subtotal','biaya','diskonextra','pajak','total','iconCls',
             {name: 'leaf', type: 'bool'},
             {name: 'expanded', type: 'bool'}]
});