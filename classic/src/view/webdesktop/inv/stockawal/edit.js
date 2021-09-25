Ext.define('Admin.view.webdesktop.inv.stockawal.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.invstockawaledit',

    layout: 'fit',

    width: 1224,
    height: 570,
    
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
                    model: 'Admin.model.inv.stockawal.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
//                    xtype: 'invstockawalheader',
//                    isEdit: c.isEdit
//                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'invstockawaldetail',
                        isEdit: c.isEdit                            
                    }]
                }, {
                    xtype: 'invstockawaltombol',
                    isEdit: c.isEdit
                }]
            }]
        });

        me.callParent(arguments);
    },
    
    show: function() {
        this.callParent();
        
        var me = this;
        setTimeout(function() {
            var form = me.down('form');
            form.getForm().waitMsgTarget = me.getEl();
            form.getForm().load({
                url: 'api/store/stockawal/dataLoad.php',
                //waitMsg: 'Loading...',
                success: function(f, a) {
                    var json = form.reader.jsonData.results;
                    me.down('invstockawaldetail').getStore().loadRawData(json['details']);
                    
                    if(json['isView']) {
                        Ext.MessageBox.show({
                            title: 'Peringatan',
                            msg: 'Transaksi tidak bisa diedit karena sudah terpakai.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.WARNING,
                            fn: function() {
                                me.down('invstockawaldetail').transaksiSave();
                                me.down('invstockawaltombol').suksesSimpan();
                            }
                        });
                    } else {
                        me.down('invstockawaltombol').transaksiBaru();                        
                    }
                }
            });            
        }, 500);        
        //}                
    }
});