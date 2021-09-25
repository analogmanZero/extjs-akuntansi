Ext.define('Admin.view.webdesktop.transaksi_potongan_absen.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.transaksipotonganabsenedit',

    layout: 'fit',
    modulId: 'TPA',

    width: 860,
    height: 500,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'form',
                layout: {
                    align: 'stretch',
                    type: 'vbox'
                },
                flex: 1,
                border: false,
                reader: new Ext.data.JsonReader({
                    model: 'Admin.model.transaksi_potongan_absen.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'transaksipotonganabsenheader',
                    isEdit: c.isEdit
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'transaksipotonganabsendetail',
                        isEdit: c.isEdit                            
                    }]
                }, {
                    xtype: 'transaksipotonganabsentombol',
                    isEdit: c.isEdit
                }]
            }]
        });

        me.callParent(arguments);
    },
    
    show: function() {
        this.callParent();
        
        var me = this;
        if(me.isEdit!=undefined) {
            setTimeout(function() {
                //me.maximize();
                var form = me.down('form');
                form.getForm().waitMsgTarget = me.getEl();
                form.getForm().load({
                    params: {nobukti: me.isEdit},
                    url: 'api/store/transaksi_potongan_absen/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData;
                        me.down('transaksipotonganabsendetail').getStore().loadRawData(json.details);
                    }
                });            
            }, 750);        
        }                
    }
});