Ext.define('Admin.model.inv.stockawal.edit', {
    extend: 'Ext.data.Model',
    fields:[
        'notrx',
        'tanggal',
        'keterangan',
        {name: 'draft', type: 'bool'}
    ]
});
