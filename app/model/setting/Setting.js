Ext.define('Admin.model.setting.Setting', {
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
            name: 'alamat'
        },
        {
            type: 'string',
            name: 'kodepos'
        },
        {
            type: 'string',
            name: 'telepon'
        },
        {
            type: 'string',
            name: 'fax'
        },
        {
            type: 'string',
            name: 'negara'
        }
    ]
});