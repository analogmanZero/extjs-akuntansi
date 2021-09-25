Ext.define('Admin.model.akun.Akun', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'auto',
            name: 'id'
        },
        {
            type: 'int',
            name: 'id_parent'
        },
        {
            type: 'string',
            name: 'kode_akun'
        },
        {
            type: 'string',
            name: 'nama_akun'
        },  
        {
            type: 'string',
            name: 'display'
        },
        {
            type: 'int',
            name: 'level'
        },
        {
            type: 'int',
            name: 'nomer_urut'
        },
        {
            type: 'string',
            name: 'saldo_normal_asal'
        },
        {
            type: 'string',
            name: 'saldo_normal'
        },
        {
            type: 'string',
            name: 'tipe'
        },
        {
            type: 'int',
            name: 'saldo_awal_asal'
        },
        {
            type: 'int',
            name: 'saldo_awal'
        },
        {
            type: 'string',
            name: 'keterangan'
        }
    ]
});