Ext.define('Admin.model.laporan.beli.bayarretur', {
    extend: 'Ext.data.Model',
    fields: ['level','no','nobayar','tanggal','jumlah','vendor','noref','matauang','kurs',
        'subtotal',
        'totalbiaya',
        'total','status','iconCls', {name: 'leaf', type: 'bool'}, {name: 'expanded', type: 'bool'}]
});