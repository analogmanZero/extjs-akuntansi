Ext.define('Admin.view.webdesktop.jurnalumum.tombol', {
    
    extend: 'Ext.panel.Panel',
    alias : 'widget.jurnalumumtombol',

    bodyPadding: 5,
    border : false,
    layout: 'anchor',

    constructor: function(c) {
        var me = this;

        me.items = [{
            xtype: 'panel',
            bodyPadding: 5,
            layout: {
                type: 'hbox'
            },
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
                text : 'Cetak [<B>F10</B>]',
                disabled: true
            /*},{
                xtype: 'container',
                width: 50
            },{
                xtype :'checkboxfield',
                boxLabel  : 'KUNCI',
                name      : 'lock',
                itemId    : 'lock',
                inputValue: '1',
                hidden: !c.isEdit,
                disabled: true*/
            },{
                xtype: 'container',
                flex: 1
            }]
        }];

        this.callParent(arguments);
    },

    transaksiBaru: function() {
        this.down('#baru').setDisabled(true);
        this.down('#tambah').setDisabled(false);
        this.down('#edit').setDisabled(true);
        this.down('#hapus').setDisabled(true);
        this.down('#simpan').setDisabled(false);
        this.down('#cetak').setDisabled(true);
        //this.down('#lock').setDisabled(false);
    },

    afterEdit: function(val) {
        this.down('#tambah').setDisabled(!val);
        this.down('#edit').setDisabled(!val);
        this.down('#hapus').setDisabled(!val);
        this.down('#simpan').setDisabled(!val);
        //this.down('#lock').setDisabled(!val);
    },

    afterSave: function(qtyCetak) {
        this.down('#baru').setDisabled(this.isEdit?true:false);
        this.down('#tambah').setDisabled(true);
        this.down('#edit').setDisabled(true);
        this.down('#hapus').setDisabled(true);
        this.down('#simpan').setDisabled(true);
        //this.down('#lock').setDisabled(true);
        
        this.down('#cetak').setDisabled(false);
    }
});