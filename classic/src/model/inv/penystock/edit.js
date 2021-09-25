Ext.define('Admin.model.inv.penystock.edit', {
    extend: 'Ext.data.Model',
    fields:[
        'notrx',
        'tanggal',
        'keterangan',
        {name: 'draft', type: 'bool'}
    ]
});
