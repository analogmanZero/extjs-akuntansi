Ext.define('Admin.model.wo.edit', {
    extend: 'Ext.data.Model',
    fields: [
        'notrx',
        'tanggal',
        'bentuk',
        'idnopeng',
        'cabang',

        {name: 'draft', type: 'bool'},
        {name: 'close', type: 'bool'},
        {name: 'lock', type: 'bool'},
        'subtotal',
        'totalbiaya',
        'total'
    ]
});