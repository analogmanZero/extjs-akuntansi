Ext.define('Admin.view.webdesktop.tutupbuku.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.tutupbukuedit',

    layout: 'fit',
    modal: true,

    title: 'Proses Tutup Buku Periode Akuntansi',
    height: 175,
    width: 450,

    initComponent: function() {
        var me = this;      

        me.items = [{
            xtype: 'form',
            border: false,
            layout: 'anchor',
            bodyPadding: 10,

            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100,
                anchor: '100%'
            },
            items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password',
                    name: 'pass'
                }, {
                    xtype: 'datefield',
                    itemId: 'tanggal',
                    format: 'd-m-Y',
                    name: 'tanggal',
                    fieldLabel: 'Tanggal Tutup '
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'Keterangan',
                    name: 'keterangan'
                }]
            }];

        me.buttons = [{
            text: 'Proses',
            scope: this,
            handler: function() {
                Ext.MessageBox.confirm('Konfirmasi', 'Pastikan tidak ada kesalahan!', function(btn,text) {
                    if(btn=='yes') {
                        me.down('form').getForm().waitMsgTarget = me.down('form').up('window').getEl();
                        me.down('form').getForm().submit({
                            method:'POST',
                            url: 'api/store/tutupbuku/proses.php',
                            waitMsg: 'Proses Tutup Buku...',
                            success:function(f, a) {

                                Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                                    me.close();
                                    me.parent.down('grid').store.loadPage(1);
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
        }, {
            text: 'Batal',
            scope: this,
            handler: this.close
        }];

        me.callParent(arguments);
    }
});