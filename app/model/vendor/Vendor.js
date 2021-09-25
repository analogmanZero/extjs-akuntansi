Ext.define('Admin.model.vendor.Vendor', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'kode'
        },
        {
            type: 'string',
            name: 'nama'
        },  
        {
            type: 'string',
            name: 'no_hp'
        },
        {
            type: 'string',
            name: 'akun_hutang'
        },
        {
            type: 'string',
            name: 'keterangan'
        }
    ]
});