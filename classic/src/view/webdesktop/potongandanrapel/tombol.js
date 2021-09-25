Ext.define('Admin.view.webdesktop.transaksi_potongan_absen.tombol', {
    
    extend: 'Ext.panel.Panel',
    alias : 'widget.transaksipotonganabsentombol',

    layout: 'fit',
    border : false,
    
    bodyPadding: 5,
    
    constructor: function(c) {

        Ext.apply(c, {
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [{
                    xtype: 'button',
                    itemId: 'baru',
                    action: 'baru',
                    text : 'Baru [<B>F8</B>]',
                    style : 'padding-left:10px'
                },{
                    xtype: 'container',
                    width: 5
                },{
                    xtype: 'button',
                    itemId: 'tambah',
                    action: 'tambah',
                    text : 'Tambah [<B>INS</B>]',
                    disabled: true
                },{
                    xtype: 'container',
                    width: 5
                },{
                    xtype: 'button',
                    itemId: 'edit',
                    action: 'edit',
                    text : 'Edit [<B>F2</B>]',
                    disabled: true
                },{
                    xtype: 'container',
                    width: 5
                },{
                    xtype: 'button',
                    itemId: 'hapus',
                    action :'hapus',
                    text : 'Hapus [<B>DEL</B>]',
                    disabled: true
                },{
                    xtype: 'container',
                    width: 5
                },{
                    xtype: 'button',
                    itemId: 'simpan',
                    action: 'simpan',
                    text : 'Simpan [<B>F4</B>]',
                    disabled: true
                },{
                    xtype: 'container',
                    width: 5
                },{
                    xtype: 'button',
                    itemId: 'cetak',
                    action: 'cetak',
                    text : 'Cetak [<B> C </B>]',
                    disabled: true
//                },{
//                    xtype: 'container',
//                    flex: 1
//                },{
//                    xtype     :'checkbox',
//                    boxLabel  : '<B>DRAFT</B>',
//                    name      : 'draft',
//                    itemId    : 'draft',
//                    inputValue: 'Y',
//                    disabled: true
                },{
                    xtype: 'container',
                    flex: 1
                }]
            }]
        });

        this.callParent(arguments);
    },

    transaksiBaru: function() {
        this.down('#baru').setDisabled(true);
        this.down('#tambah').setDisabled(false);
        this.down('#edit').setDisabled(true);
        this.down('#hapus').setDisabled(true);
        this.down('#simpan').setDisabled(false);
        this.down('#cetak').setDisabled(true);
//        this.down('#draft').setDisabled(false);
//        this.down('#draft').setValue(true);
    },

    disabledButton: function(value) {
        this.down('#tambah').setDisabled(value);
        this.down('#edit').setDisabled(value);
        this.down('#hapus').setDisabled(value);
        this.down('#simpan').setDisabled(value);
//        this.down('#draft').setDisabled(value);
    },

    suksesSimpan: function() {
        
        this.down('#baru').setDisabled(this.isEdit?true:false);
        this.down('#tambah').setDisabled(true);
                
        this.down('#edit').setDisabled(true);
        this.down('#hapus').setDisabled(true);
        this.down('#simpan').setDisabled(true);
//        this.down('#draft').setDisabled(true);
        this.down('#cetak').setDisabled(false);
    }


});