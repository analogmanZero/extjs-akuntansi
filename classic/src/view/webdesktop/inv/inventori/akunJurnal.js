Ext.define('Admin.view.webdesktop.inv.inventori.akunJurnal', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.inventoriakunjurnal',

    border: false,
    layout: 'anchor',

    bodyPadding: 10,
    constructor: function(c) {
        var me = this;

        var arrlabel = new Array(
            'Akun Persediaan',
            'Akun Penjualan',
            'Akun Retur Penjualan',
            'Akun Diskon Item Jual',
            'Akun HPP',
            'Akun Retur Beli',
            'Akun Terima Barang',
            'Akun Kirim Barang'
        );
        var arrname = new Array(
            'akunInv',
            'akunJual',
            'akunReturJual',
            'akunDiskonJual',
            'akunHPP',
            'akunReturBeli',
            'akunBlmByrTerima',
            'akunBlmByrKirim'
        );

        var arrtipe = new Array('14','41','41','41,72','51','14','21,22','12,15');
        var akun = new Array();
        for(var i=0; i<8; i++) {
            akun[i] = Ext.create('Admin.view.webdesktop.newAkunField', {
                labelWidth: 150,
                fieldLabel: arrlabel[i],
                name: arrname[i],
                params : {tipe: arrtipe[i]},
                msgTarget: 'side',
                anchor: '60%',
                isInitValue: c.isEdit
            });
        }

        Ext.apply(c, {
            items: akun
        });

        this.callParent(arguments);
    }
});