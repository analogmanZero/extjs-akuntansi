Ext.define('Admin.model.kasir.diskonfinal', {
    extend: 'Ext.data.Model',
    fields: ['add','id','nominal','diskon','tglakhir','tglawal', {name:'bukanitemdiskon', type: 'bool'},'kodecabang','cabang', {name:'semuacabang', type: 'bool'}]
});                