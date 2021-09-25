Ext.define('Admin.model.beban.edit', {
    extend: 'Ext.data.Model',
    fields: ['cabang', 'kategori', {name: 'root', type: 'bool'}, 'subdari', 'idbeban', 'keterangan', 'akun']
});