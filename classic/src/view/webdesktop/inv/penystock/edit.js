Ext.define('Admin.view.webdesktop.inv.penystock.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.invpenystockedit',

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
                    model: 'Admin.model.inv.penystock.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'invpenystockheader',
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
                            xtype: 'invpenystockdetail',
                            title: 'Masuk',
                            isEdit: c.isEdit                            
                        }, {
                            xtype: 'invpenystockkeluar',
                            title: 'Keluar',
                            isEdit: c.isEdit
                        }]     
                    }]                    
                }, {
                    xtype: 'invpenystocktombol',
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
                    url: 'api/store/penystock/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData.results;
                        me.down('invpenystockdetail').getStore().loadRawData(json['details']);
                        me.down('invpenystockkeluar').getStore().loadRawData(json['keluars']);
                        if(json['isView']) {
                            Ext.MessageBox.show({
                                title: 'Peringatan',
                                msg: 'Transaksi tidak bisa diedit karena sudah terpakai.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.WARNING,
                                fn: function() {
                                    me.down('invpenystockheader').transaksiSave();
                                    me.down('invpenystockdetail').transaksiSave();
                                    me.down('invpenystocktombol').suksesSimpan();
                                }
                            });
                        } else {
                            me.down('invpenystockheader').transaksiBaru();
                            //me.down('invpenystockdetail').transaksiBaru();
                            me.down('invpenystocktombol').transaksiBaru();
                        }
                    }
                });            
            }, 500);        
        }                
    }
});