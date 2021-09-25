Ext.define('Admin.model.laporan.jual.bayarjual', {
    extend: 'Ext.data.Model',
    fields: ['level','no','nobayar','tanggal','jthtempo','jumlah','diskon','bayar','pelanggan','noref','matauang','kurs','subtotal','totalbiaya','totaldiskon',
             'total','statusum','kas','iconCls', {name: 'leaf', type: 'bool'}, {name: 'expanded', type: 'bool'}]
});