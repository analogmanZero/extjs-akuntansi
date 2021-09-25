Ext.define('Admin.model.so.biaya.list', {
    extend: 'Ext.data.Model',
    idProperty : '__KEY',
    fields:[
            '__KEY',
            'add',
            {name: 'no', type: 'int'},
            'idakun',
            'akun',
            'qty',
            'def_harga',
            'harga',
            'jumlah',
            'catatan'
        ]
});