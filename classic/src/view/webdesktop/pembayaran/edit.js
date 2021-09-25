Ext.define('Admin.view.webdesktop.pembayaran.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.pembayaranedit',

    layout: 'fit',

    width: 1024,
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
                    model: 'Admin.model.pembayaran.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'pembayaranheader',
                    isEdit: c.isEdit
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'pembayarandetail',
                        isEdit: c.isEdit                            
                    }]
                }, {
                    xtype: 'pembayarantombol',
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
                    params: {id: me.isEdit},
                    url: 'api/store/pembayaran/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData;
                        me.down('pembayarandetail').getStore().loadRawData(json.details);
                        me.down('pembayaranheader').transaksiBaru();
                        me.down('pembayarantombol').transaksiBaru(true);
                        
                        var rekeningheader = me.down('#rekeningheader').getSubmitValue();
                        me.down('#jenistransaksi').fireEvent('select', me.down('#jenistransaksi'));
                        me.down('#rekeningheader').setValue(rekeningheader);
                        me.down('#divisi').setReadOnly(true);
                    }
                });            
            }, 750);        
        }                
    }
});