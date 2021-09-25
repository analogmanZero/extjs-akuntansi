Ext.define('Admin.view.webdesktop.karyawan.alamat_ktp', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawanalamatktp',

    border: false,

    layout: 'anchor',
    bodyPadding: 20,

    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        labelWidth: 100,
        allowBlank: true
    },

    constructor: function(c) {
        var me = this;

        Ext.apply(c, {

            items: [{
                xtype: 'textfield',
                fieldLabel: 'Alamat',
                maskRe: /([a-zA-Z0-9\s.\-]+)$/,
                readOnly: c.isView,
                name: 'ktp_alamat1',
                itemId: 'ktp_alamat1',       
                listeners: {
                    scope: me,
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            me.down('#ktp_alamat2').focus(true, 10);
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '&nbsp;',
                labelSeparator: '&nbsp;',
                maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                readOnly: c.isView,
                name: 'ktp_alamat2',
                itemId: 'ktp_alamat2',
                allowBlank: true /***/,       
                listeners: {
                    scope: me,
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            me.down('#ktp_rt').focus(true, 10);
                        }
                    }
                }
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'RT',
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                defaults: {
                    msgTarget: 'side',
                    allowBlank: true
                },
                items: [{
                    xtype: 'textfield',
                    maskRe: /([0-9\s]+)$/,
                    flex: 0.1,
                    readOnly: c.isView,
                    name:'ktp_rt',  
                    itemId:'ktp_rt',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#ktp_rw').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;RW',
                    //labelStyle: 'text-align: center;',
                    labelWidth: 50,
                    maskRe: /([0-9\s]+)$/,
                    flex: 0.2,
                    readOnly: c.isView,
                    name:'ktp_rw', 
                    itemId:'ktp_rw',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#ktp_kota').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Kota',
                    //labelStyle: 'text-align: center;',
                    labelWidth: 70,
                    name: 'ktp_kota',
                    itemId: 'ktp_kota',
                    readOnly: c.isView,
                    flex: 0.5,       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#ktp_kodepos').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Kode Pos',
                    maskRe: /([0-9\s]+)$/,
                    //labelStyle: 'text-align: right;',
                    labelWidth: 90,
                    name:'ktp_kodepos',
                    itemId: 'ktp_kodepos',
                    readOnly: c.isView,
                    flex: 0.3,       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                 me.up('window').down('#alamat1').focus(true, 10);
                            }
                        }
                    }
                }]
            }]
        });

        me.callParent(arguments);
    }
});