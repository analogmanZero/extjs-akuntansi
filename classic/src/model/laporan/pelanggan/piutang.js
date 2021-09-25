Ext.define('Admin.model.laporan.pelanggan.piutang', {
    extend: 'Ext.data.Model',
    fields: ['level','no','idPelanggan','namaPelanggan','totalPiutang','npwp','tingkat','diskon','alamat','telepon','fax','kontak','email','website','limitKredit','catatan','akunPiutang','akunExtraDiskon',
        'iconCls',
        {name: 'leaf', type: 'bool'},
        {name: 'expanded', type: 'bool'}]
});