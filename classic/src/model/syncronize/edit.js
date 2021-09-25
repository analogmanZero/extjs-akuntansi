Ext.define('Admin.model.syncronize.edit', {
    extend: 'Ext.data.Model',
    fields: [
        'http',
        'server',
        'idperusahaan',
        'userid',
        'password',
        {name: 'proses_auto', type: 'bool'},
        'tempo'
    ]
});