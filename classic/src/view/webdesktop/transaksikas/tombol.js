Ext.define('Admin.view.webdesktop.transaksikas.tombol', {
    
    extend: 'Ext.container.Container',
    alias : 'widget.transaksikastombol',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    constructor: function(c) {
        var me = this;

        this.items = [{
           xtype: 'container',
           height: 5
        }, {
            xtype: 'panel',
            bodyPadding: 5,
            border : true,
            height: 35,
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                width: 5
            },{
                xtype: 'button',
                iconCls: 'save',
                itemId: 'simpan',
                action: 'simpan',
                text : 'Simpan'
            },{
                xtype: 'container',
                width: 5
            },{
                xtype: 'button',
                iconCls: 'print',
                itemId: 'cetak',
                action: 'cetak',
                text : 'Cetak',
                disabled: true,
				hidden: true
            },{
                xtype: 'container',
                flex: 1
            }]
        }];

        this.callParent(arguments);
    },

    setDisabled: function(disabled, isSaved) {
        var me = this;
        
        me.down('[action=baru]').setDisabled((isSaved && me.isEdit)?true:!disabled);
        me.down('[action=cetak]').setDisabled(!isSaved);        
        me.down('[action=simpan]').setDisabled(disabled);
    }
    
});