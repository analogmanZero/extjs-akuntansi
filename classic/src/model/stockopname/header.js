Ext.define('Admin.model.stockopname.header', {
    extend: 'Ext.data.Model',
    fields: ['id', 'qty', 'satuan', {name: 'detail', type: 'auto'}]
});