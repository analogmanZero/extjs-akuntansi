Ext.define('Admin.view.webdesktop.listJurnal' ,{

    extend: 'Ext.window.Window',
    alias : 'widget.jurnal',

    layout: 'fit',
    autoShow: true,
    border: false,
    width: 600,
    height: 400,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            title: 'Jurnal Lain-lain',
            items: [{
                xtype: 'tabpanel',
                layout: 'fit',
                items: [
                    Ext.create('Admin.view.webdesktop.jurnal.voucher.list'),
                    Ext.create('Admin.view.webdesktop.jurnal.pendapatan.list'),
                    Ext.create('Admin.view.webdesktop.jurnal.pengeluaran.list'),
                    Ext.create('Admin.view.webdesktop.transaksikas.list')
                ]
            }]

        });

        this.callParent(arguments);
    }
});