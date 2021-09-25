Ext.define('Admin.model.inv.inventori.listMaster', {
    extend: 'Ext.data.Model',
     fields: ['add','kode','nama','induk', 'kodeinduk', {name: 'pos', type: 'bool'}]
});