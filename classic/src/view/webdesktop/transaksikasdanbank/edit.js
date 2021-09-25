Ext.define('Admin.view.webdesktop.transaksikasdanbank.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.transaksikasdanbankedit',

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
                    model: 'Admin.model.transaksikasdanbank.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'transaksikasdanbankheader',
                    isEdit: c.isEdit
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'transaksikasdanbankdetail',
                        isEdit: c.isEdit                            
                    }]
                }, {
                    xtype: 'transaksikasdanbanktombol',
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
                    url: 'api/store/transaksikas/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData;
                        me.down('transaksikasdanbankdetail').getStore().loadRawData(json.details);
                        me.down('transaksikasdanbankheader').transaksiBaru();
                        me.down('transaksikasdanbanktombol').transaksiBaru();
                        
                        var rekeningheader = me.down('#rekeningheader').getSubmitValue();
                        me.down('#jenistransaksi').fireEvent('select', me.down('#jenistransaksi'));
                        me.down('#rekeningheader').setValue(rekeningheader);
                        //me.down('#rekeningheader').setReadOnly(true);
                    }
                });            
            }, 750);        
        }                
    }
});