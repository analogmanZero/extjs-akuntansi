Ext.define('Admin.view.webdesktop.karyawan.alamat_tinggal', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawanalamattinggal',

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
                name: 'alamat1',
                itemId: 'alamat1',       
                listeners: {
                    scope: me,
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            me.down('#alamat2').focus(true, 10);
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '&nbsp;',
                labelSeparator: '&nbsp;',
                maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                readOnly: c.isView,
                name: 'alamat2',
                itemId: 'alamat2',       
                listeners: {
                    scope: me,
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            me.down('#rt').focus(true, 10);
                        }
                    }
                },
                allowBlank: true /***/
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
                    name:'rt',
                    itemId: 'rt',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#rw').focus(true, 10);
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
                    name:'rw',
                    itemId: 'rw',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#kota').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Kota',
                    //labelStyle: 'text-align: center;',
                    labelWidth: 70,
                    name: 'kota',
                    readOnly: c.isView,
                    flex: 0.5,
                    itemId: 'kota',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#kodepos').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Kode Pos',
                    maskRe: /([0-9\s]+)$/,
                    //labelStyle: 'text-align: right;',
                    labelWidth: 90,
                    name:'kodepos',
                    itemId:'kodepos',
                    readOnly: c.isView,
                    flex: 0.3,       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#telepon').focus(true, 10);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Telepon',
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
                    name:'telepon',
                    itemId:'telepon',
                    readOnly: c.isView,
                    flex: 0.3,
                    allowBlank: true /***/,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#nohp').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;No. HP',
                    maskRe: /([0-9\s]+)$/,
                    name:'nohp',
                    itemId:'nohp',
                    flex: 0.4,
                    readOnly: c.isView,
                    labelWidth: 70,       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#email').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Email',
                    name:'email',
                    itemId:'email',
                    vtype: 'email',
                    flex: 0.6,
                    readOnly: c.isView,
                    labelWidth: 65
                }]
            }]
        });

        me.callParent(arguments);
    }
});