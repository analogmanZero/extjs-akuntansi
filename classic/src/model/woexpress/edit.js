Ext.define('Admin.model.woexpress.edit', {
    extend: 'Ext.data.Model',
    fields: ['add','idbom','bom', 'qty', 'pengali', {name: 'autoro', type: 'bool'}, 'total']
});                