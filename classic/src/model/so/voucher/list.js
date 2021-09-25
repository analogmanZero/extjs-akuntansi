Ext.define('Admin.model.so.voucher.list', {
    extend: 'Ext.data.Model',
    idProperty : '__KEY',
    fields:[
            '__KEY',
            'add',
            {name: 'no', type: 'int'},
            'kode',
            'qty',
            'nominal'
        ]
});