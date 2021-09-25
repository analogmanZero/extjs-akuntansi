Ext.define('Admin.view.webdesktop.inv.stockawal.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.invstockawalheader',

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
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 90,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            flex: 1.4,
                            name: 'notrx',
                            itemId:'notrx',
                            fieldLabel: 'No. Bukti',
                            msgTarget: 'side',
                            labelWidth: 90,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
                                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#tanggal').focus(true, 10);
                                    }
                                }
                            }
                        }, {
                            xtype: 'container',
                            width: 10
                        }, {
                            xtype: 'datefield',
                            name: 'tanggal',
                            itemId: 'tanggal',
                            fieldLabel: 'Tanggal',
                            labelStyle: 'text-align: center;',
                            labelWidth: 60,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            msgTarget: 'side',
                            allowBlank: false,
                            flex: 1,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
                                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#keterangan').focus(true, 10);
                                    }
                                }
                            }
                        }]
                    }, {
                        xtype: 'textarea',
                        fieldLabel: 'Uraian',
                        name: 'keterangan',
                        itemId: 'keterangan',
                        readOnly: true,
                        height: 60,
                        allowBlank: true,
                        listeners: {
                            focus: function(t) {
                                setTimeout(function() {                                        
                                    t.selectText(t.getSubmitValue().length, t.getSubmitValue().length);
                                }, 100);
                            },
                            keydown: {
                                element: 'el',
                                fn: function (eventObject, htmlElement, object, options) {
                                    if (eventObject.keyCode == 13) {
                                        setTimeout(function(){
                                            var grid = me.up('invstockawaledit').down('invstockawaldetail');
                                            if(grid.getStore().getCount()>0) {
                                                grid.rowEditor.startEdit(0, 1);
                                                grid.columns[1].getEditor(grid.recordSelected).focus(true, 10);
                                            } else {
                                                var tambah =  me.up('invstockawaledit').down('#tambah');
                                                tambah.fireEvent('click', tambah);
                                            }
                                        }, 10);
                                    }
                                }
                            }
                        }
                    }]
                },{
                    xtype: 'container',
                    width: 30
                }, {
                    xtype: 'container',
                    flex: 1
                }]                              
            }]    
        });


        me.callParent(arguments);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {

        this.down('#notrx').setReadOnly(this.isEdit || act);
        this.down('#tanggal').setReadOnly(act);
        this.down('#keterangan').setReadOnly(act);
        
        if(act || this.isEdit) {
        } else {
            this.down('#tanggal').setValue(new Date());
        }

        this.down('#notrx').focus(true, 10);
    },

    partnerChange: function(store, index) {
        return;
    },

    sodetailgridDataChaged: function(store) {
        return;
    }
});