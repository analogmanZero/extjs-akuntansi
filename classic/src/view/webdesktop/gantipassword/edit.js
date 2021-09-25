Ext.define('Admin.view.webdesktop.gantipassword.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.gantipassword',

    title: 'Ganti Password',
    modal: true,
    layout: 'fit',
    height: 350,
    width: 400,

    initComponent: function() {
        var me = this;
             
        Ext.apply(Ext.form.field.VTypes, {

            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },

            passwordText: 'Password tidak sama.'
        });

        Ext.applyIf(me, {
        
            items: [{
                xtype: 'form',
                url: 'api/store/gantiPassword.php',
                border: false,
                bodyPadding: 20,
                defaults: {
                    msgTarget: 'under',
                    labelWidth: 120,
                    labelAlign: 'top'
                },
                buttons: [{
                    text: 'Simpan',
                    action: 'simpan',
                    listeners: {
                        click: function() {
                            var form = me.down('form');
                            if(form.getForm().isValid()) {
                                
                                form.getForm().waitMsgTarget = me.getEl();
                                form.getForm().submit({
                                    method:'POST',
                                    waitMsg: 'Simpan...',
                                    success:function(f, a) {
                                        Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                                            form.getForm().reset();
                                            me.close();
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
                        }
                    }
                }, {
                    text: 'Batal',
                    scope: this,
                    handler: this.close
                }],
                items: [{
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password Lama',
                    name: 'pass-old',
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    allowBlank: false,
                    inputType: 'password',
                    fieldLabel: 'Password Baru',
                    name: 'pass',
                    id: 'pass',
                    anchor: '100%'
                }, {
                    xtype: 'textfield',
                    inputType: 'password',
                    fieldLabel: 'Konfirmasi Password',
                    name: 'pass-cfrm',
                    vtype: 'password',
                    initialPassField: 'pass',
                    allowBlank: false,
                    anchor: '100%'
                }]
            }]
        });

        me.callParent(arguments);
    }    
});