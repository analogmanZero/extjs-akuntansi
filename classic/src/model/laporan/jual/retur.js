Ext.define('Admin.model.laporan.jual.retur', {
    extend: 'Ext.data.Model',
    fields: ['level','no','noretur','tanggal','pelanggan','noref','matauang','kurs','gudang','subtotal','biaya','diskonextra','pajak','total','iconCls',
             {name: 'leaf', type: 'bool'},
             {name: 'expanded', type: 'bool'}]
});