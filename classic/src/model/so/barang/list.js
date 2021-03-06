Ext.define('Admin.model.so.barang.list', {
    extend: 'Ext.data.Model',
    idProperty : '__KEY',
    fields:[
            '__KEY',
            'add',
            'id',
            'nama',
            {name: 'no', type: 'int'},
            'penjelasan',
            'def_harga',
            'harga',
            'def_diskon',
            'diskon',
            'qty',
            'satuan',
            'pajak',
            'jumlah',
            'qty_pesan',
            'qty_terkirim',
            'qty_terima',
            'satuan_terima',
            'idTipeInv',
            'tipeInv',
            'tipeInv_1',
            'tipeInv_2',
            'detail',
            'catatan',
            'idgudang',
            'gudang',
            'idsumber',
            'nosumber',
            {name: 'variable', type: 'bool'},
            'idspesial',
            'spesial',
            'qty_hapus',
            'hapus',
            {name: 'bungkus_1', type: 'bool'},
            'idakundp',
            'akundp'
        ]
});