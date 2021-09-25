Ext.define('Admin.view.webdesktop.jurnalmemorial.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.jurnalmemorialheader',

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
                        labelWidth: 105,
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
                            name: 'nobukti',
                            itemId:'nobukti',
                            fieldLabel: 'No. Bukti',
                            msgTarget: 'side',
                            labelWidth: 105,
                            allowBlank: true,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
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
                        height: 80,
                        allowBlank: true,
                        selectOnFocus: true,
                        listeners: {
                            focus: function(t) {
                                setTimeout(function() {                                        
                                    t.selectText(t.getSubmitValue().length, t.getSubmitValue().length);
                                }, 100);
                            },
                            keydown: {
                                element: 'el',
                                fn: function (eventObject, htmlElement, object, options) {
                                    if (eventObject.keyCode == 9) {
                                        setTimeout(function(){
                                            var grid = me.up('window').down('jurnalmemorialdetail');
                                            if(grid.getStore().getCount()>0) {
                                                grid.rowEditor.startEdit(0, 1);
                                                grid.columns[1].getEditor(grid.recordSelected).focus(true, 10);
                                            } else {
                                                var tambah =  me.up('jurnalmemorialedit').down('#tambah');
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
                    width: 10
                }, {
                    xtype: 'panel',
                    bodyPadding: 10,
                    border: false,
                    flex: 1,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 60,
                        allowBlank: false,
                        anchor: '100%'
                    }
                }]
            }]    
        });

        me.callParent(arguments);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {
        var me = this;

        me.down('#tanggal').setReadOnly(act);
        me.down('#keterangan').setReadOnly(act);

        if(!act && !me.isEdit) {
            me.down('#tanggal').setValue(new Date());
            Ext.Ajax.request({
                method:'POST',
                url: 'api/store/jurnalmemorial/getLastNobukti.php',
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    me.down('[name=nobukti]').setValue(json.nobukti);
                    setTimeout(function() {
                        me.down('#nobukti').focus(true, 10);
                    }, 100);
                }
            });
        } else {            
            setTimeout(function() {
                me.down('#nobukti').focus(true, 10);
            }, 100);
        } 
        
        
    }
});