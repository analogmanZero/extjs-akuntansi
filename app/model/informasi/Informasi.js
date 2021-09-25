Ext.define('Admin.model.informasi.Informasi', {
    extend: 'Admin.model.Base',

    fields: [{
        type: 'int',
        name: 'id'
    },
    {
        type: 'string',
        name: 'judul'
    },
    {
        type: 'string',
        name: 'tanggal'
    },
    {
        type: 'string',
        name: 'kepada'
    },
    {
        type: 'string',
        name: 'penjelasan'
    },
    {
        type: 'string',
        name: 'audiofile'
    },
    {
        type: 'string',
        name: 'docfile'
    },
    {
        type: 'bool',
        name: 'aktif'
    }]
});
