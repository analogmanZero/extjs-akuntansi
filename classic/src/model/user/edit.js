Ext.define('Admin.model.user.edit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'userid', type: 'string'},
        {name: 'namauser', type: 'string'},
        {name: 'divisi', type: 'string'},
        {name: 'id_propinsi', type: 'int'},
        {name: 'propinsi', type: 'string'},
        {name: 'id_kabupaten', type: 'int'},
        {name: 'kabupaten', type: 'string'},
        {name: 'nonaktif', type: 'bool'}
    ]
});