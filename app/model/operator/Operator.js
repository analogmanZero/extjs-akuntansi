Ext.define('Admin.model.operator.Operator', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'nama'
        },
        {
            type: 'string',
            name: 'email'
        },
        {
            type: 'string',
            name: 'nohp'
        },
        {
            type: 'string',
            name: 'username'
        },
        {
            type: 'int',
            name: 'aktif'
        }
    ]
});