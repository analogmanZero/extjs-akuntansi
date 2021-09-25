Ext.define('Admin.model.suratjalan.edit', {
    extend: 'Ext.data.Model',
    fields: [
        'isView',
        'notrx',
        'tanggal',
        'noref', 
        'cabang',
        'pelanggan',
        'alamat',
        'kirim',
        {name: 'darifaktur', type: 'bool'},
        {name: 'daripengiriman', type: 'bool'},
        'idnopeng'
    ]
});