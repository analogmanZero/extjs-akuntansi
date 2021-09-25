Ext.define('Admin.model.laporan.vendor.hutang', {
    extend: 'Ext.data.Model',
    fields: ['level','no','idVendor','namaVendor','totalHutang','npwp','tingkat','diskon','alamat','telepon','fax','kontak','email','website','limitKredit','catatan','akunPiutang','akunExtraDiskon',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});