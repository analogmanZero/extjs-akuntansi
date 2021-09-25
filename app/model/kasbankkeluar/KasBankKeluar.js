Ext.define('Admin.model.kasbankkeluar.KasBankKeluar', {
    extend: 'Admin.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'nobukti'
        },
        {
            type: 'string',
            name: 'tanggal'
        },
        {
            type: 'string',
            name: 'subyek'
        },
        {
            type: 'string',
            name: 'keterangan'
        },
        {
            type: 'string',
            name: 'jenis_trx'
        },
        {
            type: 'int',
            name: 'jumlah'
        }
    ]
});