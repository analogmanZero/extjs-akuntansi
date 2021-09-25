Ext.define('Admin.model.kasbankmasuk.KasBankMasuk', {
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
            name: 'jenistransaksi'
        },
        {
            type: 'int',
            name: 'jumlah'
        }
    ]
});