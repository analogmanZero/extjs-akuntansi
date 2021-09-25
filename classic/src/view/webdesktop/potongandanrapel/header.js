Ext.define('Admin.view.webdesktop.transaksi_potongan_absen.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.transaksipotonganabsenheader',

    layout: 'fit',
    border : false,
    
    bodyPadding: 5,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [{
                    xtype: 'monthfield',
                    name: 'periode',
                    itemId: 'periode',
                    fieldLabel: 'Periode',
                    labelStyle: 'text-align: center;',
                    labelWidth: 60,
                    format: 'm-Y',
                    submitFormat: 'Y-m',
                    msgTarget: 'side',
                    allowBlank: false,
                    width: 160,
                    readOnly: true,
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                //me.down('#jenistransaksi').focus(true, 10);
                            }
                        },
                        change: function() {
                            //alert(me.down('#periode').getSubmitValue());
                            me.up('window').down('transaksipotonganabsendetail').loadDataStore(me.down('#periode').getSubmitValue());
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    xtype: 'panel',
                    bodyPadding: 10,
                    border: false,
                    flex: 3
                }]
            }]    
        });

        me.callParent(arguments);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {

        this.down('#periode').setReadOnly(act);
        
        if(act || this.isEdit) {
            
        } else {
            this.down('#periode').setValue(new Date());
        }
        var me = this;
        setTimeout(function() {
            me.down('[name=periode]').focus(true, 10);
        }, 100);
        //this.down('#nobukti').focus(true, 10);
    }
});