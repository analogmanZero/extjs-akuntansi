Ext.define('Admin.view.webdesktop.inv.rolltoroll.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.invrolltorolledit',

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
                    model: 'Admin.model.inv.rolltoroll.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'invrolltorollheader',
                    isEdit: c.isEdit
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    bodyPadding: 5,
                    layout: 'fit',
                    items: [{
                        xtype: 'tabpanel',
                        itemId: 'tabdetail',
                        plain: true,
                        items: [{
                            xtype: 'invrolltorolldetail',
                            title: 'Estimasi',
                            isEdit: c.isEdit                            
                        }, {
                            xtype: 'invrolltorollaktual',
                            title: 'Aktual',
                            isEdit: c.isEdit                            
                        }, {
                            xtype: 'invrolltorollwasted',
                            title: 'Wasted',
                            isEdit: c.isEdit
                        }]     
                    }]                    
                }, {
                    xtype: 'invrolltorolltombol',
                    isEdit: c.isEdit
                }]
            }]
        });

        me.callParent(arguments);
    },
    
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
                    url: 'api/store/rolltoroll/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData.results;
                        me.down('invrolltorolldetail').getStore().loadRawData(json['details']);
                        me.down('invrolltorollaktual').getStore().loadRawData(json['aktuals']);
                        if(json['isView']) {
                            Ext.MessageBox.show({
                                title: 'Peringatan',
                                msg: 'Transaksi tidak bisa diedit karena sudah terpakai.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING,
                                fn: function() {
                                    me.down('invrolltorollheader').transaksiSave();
                                    me.down('invrolltorolldetail').transaksiSave();
                                    me.down('invrolltorollaktual').transaksiSave();
                                    me.down('invrolltorollwasted').transaksiSave();                                    
                                    me.down('invrolltorolltombol').suksesSimpan();
                                }
                            });
                        } else {
                            me.down('invrolltorollheader').transaksiBaru();                            
                            me.down('invrolltorollwasted').transaksiBaru();
                            me.down('invrolltorolltombol').transaksiBaru();
                        }
                    }
                });            
            }, 600);        
        }                
    }
});