Ext.define('Admin.model.suratjalan.detail', {
    extend: 'Ext.data.Model',
    fields:[
            'add',
            {name: 'no', type: 'int'},
            'penjelasan',
            'qty',
            'unit'
        ]
});