Ext.define('Admin.model.kasir.diskonvoucher', {
    extend: 'Ext.data.Model',
    fields: ['add','id','kodevoucher','qty','tglexpire','nominal','kodecabang','cabang',{name:'semuacabang',type: 'bool'}]
});                