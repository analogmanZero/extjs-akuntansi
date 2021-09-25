Ext.define('Admin.view.webdesktop.payroll.tombol', {
    
    extend: 'Ext.panel.Panel',
    alias : 'widget.payrolltombol',

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
                }/*,{
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
                }*/,{
                    xtype: 'container',
                    flex: 1
                }]
            }]
        });

        this.callParent(arguments);
    },

    transaksiBaru: function() {
        this.down('#baru').setDisabled(true);
        //this.down('#simpan').setDisabled(false);
        //this.down('#cetak').setDisabled(true);
    },

    disabledButton: function(value) {
        this.down('#simpan').setDisabled(value);
    },

    suksesSimpan: function() {        
        this.down('#baru').setDisabled(this.isEdit?true:false);
        //this.down('#simpan').setDisabled(true);
        //this.down('#cetak').setDisabled(false);
    }


});