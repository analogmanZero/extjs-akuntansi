Ext.define('Admin.model.pengiriman.detail', {
    extend: 'Ext.data.Model',
    fields:[
            'add',
            'no',
            {name: 'parent', type: 'int'},
            'idbarang',
            'nosumber',
            'penjelasan',
            'sn',
            'ukuran',
            'warna',
            'qty',
            'satuan',
            'banyak',
            'expire',
            'idgudang',
            'gudang',
            {name: 'keluar_bebas', type: 'bool'},
            {name: 'wasted', type: 'bool'}
        ]
});
