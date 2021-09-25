Ext.define('Admin.model.inv.rolltoroll.edit', {
    extend: 'Ext.data.Model',
    fields:[
            'notrx',
            'tanggal',
            'keterangan',
            'kode_barang',
            'wasted',
            {name: 'draft', type: 'bool'}
        ]
});
