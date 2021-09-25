Ext.define('Admin.model.customer.Customer', {
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
            type: 'int',
            name: 'id_area'
        },  
        {
            type: 'string',
            name: 'area'
        },
        {
            type: 'string',
            name: 'akun_piutang'
        },
        {
            type: 'string',
            name: 'keterangan'
        }
    ]
});