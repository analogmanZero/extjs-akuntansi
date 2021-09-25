Ext.define('Admin.view.webdesktop.resetdata.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.resetdata',

    title: 'Reset Data',
    layout: 'fit',
    height: 180,
    width: 260,
    modal : true,

    initComponent: function() {

        var me = this;
        me.items = [{
            xtype: 'form',
            url: 'api/store/resetData.php',

            border: false,
            bodyPadding: 10,

            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 90,
                anchor: '100%'
            },

            layout: 'anchor',

            items:[{
                xtype: 'textfield',
                allowBlank: false,
                inputType: 'password',
                fieldLabel: 'Password',
                name: 'pass',
                anchor: '100%'
//            }, {
//                xtype: 'checkbox',
//                checked: true,
//                boxLabel: 'Hapus Data Master',
//                name: 'master',
//                anchor: '100%'
            }, {
                xtype: 'checkbox',
                checked: true,
                boxLabel: 'Hapus Data Transaksi',
                name: 'transaksi',
                anchor: '100%'
            }]
        }];
                
        me.buttons = [{
            text: 'Proses',
            listeners: {
                click: function(b) {
                    var form = me.down('form');
                    if(form.getForm().isValid()) {
                        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk reset data?', function(btn,text) {
                            if(btn=='yes') {
                                form.getForm().waitMsgTarget = me.getEl();
                                form.getForm().submit({
                                    method:'POST',
                                    waitMsg: 'Proses...',
                                    success:function(f, a) {
                                        Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                                            form.getForm().reset();
                                        });
                                    },
                                    failure:function(form, action){
                                        Ext.MessageBox.show({
                                            title: 'Gagal',
                                            msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.ERROR
                                        })
                                    }
                                });
                            }
                        });
                    }
                }
            }
        }, {
            text: 'Tutup',
            scope: this,
            handler: this.close
        }];

        me.callParent(arguments);
    }    
});