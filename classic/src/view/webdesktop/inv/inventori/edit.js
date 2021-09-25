Ext.define('Admin.view.webdesktop.inv.inventori.edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.invinventoriedit',

    layout: 'fit',
    width: 475,
    height: 520,
    disabledMaximize: true,
    
    items: [{
        xtype: 'form',
        reader: new Ext.data.JsonReader({
            model: 'Admin.model.inv.inventori.edit',
            rootProperty: 'results',
            totalProperty: 'total'
        }),

        bodyPadding: 20,
        layout: 'anchor',
        defaults: {
            msgTarget: 'under',
            labelWidth: 90,
            anchor: '100%',
            labelAlign: 'top',
            allowBlank: false
        },
        scrollable: true,

        items: [{
            xtype: 'textfield',
            name: 'kode',
            fieldLabel: 'Kode'
        }, {
            xtype: 'textfield',
            name: 'nama',
            fieldLabel: 'Nama'    
        }, {
            xtype: 'textfield',
            name: 'unit',                        
            fieldLabel: 'Satuan'                    
        }, {
            xtype: 'currencyfield',
            name: 'jual',
            fieldLabel: 'Harga Jual',
            fieldStyle: 'text-align: right;'
        }, {
            xtype: 'currencyfield',
            name: 'beli',
            fieldLabel: 'Harga Beli',
            fieldStyle: 'text-align: right;'
        }]
    }],
    
    buttons: [{
        text: 'Simpan',
        itemId: 'simpan',
        action: 'simpan'
    }, {
        text: 'Batal',
        handler: function(btn) {
            btn.up('window').close();
        }
    }],

    afterRender: function() {
        this.callParent();
        
        var me = this;
        if(me.isEdit!=undefined) {
            setTimeout(function() {
                //me.maximize();
                var form = me.down('form');
                form.getForm().waitMsgTarget = me.getEl();
                form.getForm().load({
                    params: {id: me.isEdit},
                    url: 'api/store/inventori/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        me.down('[name=kode]').focus(true, 10);
                    }
                });            
            }, 500);        
        } else {            
            setTimeout(function() {
                me.down('[name=kode]').focus(true, 10);
            }, 500);
        }
        
    }
    
});