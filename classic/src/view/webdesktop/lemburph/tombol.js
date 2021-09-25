Ext.define('Admin.view.webdesktop.lemburph.tombol', {
    
    extend: 'Ext.panel.Panel',
    alias : 'widget.lemburphtombol',

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
                    itemId: 'cetak',
                    action: 'cetak',
                    text : 'Cetak [<B> C </B>]',
                    disabled: true
                },{
                    xtype: 'container',
                    flex: 1
                }]
            }]
        });

        this.callParent(arguments);
    },

    editTransaksi: function() {
        this.down('#tambah').setDisabled(false);
        this.down('#edit').setDisabled(true);
        this.down('#hapus').setDisabled(true);
        
        this.down('#cetak').setDisabled(true);
    },

    suksesSimpan: function() {        
        this.down('#tambah').setDisabled(false);
        this.down('#edit').setDisabled(true);
        this.down('#hapus').setDisabled(true);
        
        this.down('#cetak').setDisabled(false);
    }


});