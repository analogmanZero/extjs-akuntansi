Ext.define('Admin.model.laporan.jual.bayarretur', {
    extend: 'Ext.data.Model',
    fields: ['level','no','nobayar','tanggal','jumlah','pelanggan','noref','matauang','kurs',
        'subtotal',
        'totalbiaya',
        'total',
             'status','iconCls', {name: 'leaf', type: 'bool'}, {name: 'expanded', type: 'bool'}]
});