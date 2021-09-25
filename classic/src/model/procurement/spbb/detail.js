Ext.define('Admin.model.procurement.spbb.detail', {
    extend: 'Ext.data.Model',
    fields:[
            'add',
            {name: 'no', type: 'int'},
            'kode',
            'nama',
            'penjelasan',
            'qty',
            'unit'
        ]
});