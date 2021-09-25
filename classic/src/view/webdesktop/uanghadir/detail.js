Ext.define('Admin.view.webdesktop.uanghadir.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.uanghadirdetail',

    layout: 'fit',
 
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();
        
        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'area', 'status_pegawai', {name: 'nilai', type: 'float'}, {name: 'qty', type: 'float'}, {name: 'jumlah', type: 'float'}],
            url: 'api/store/uanghadir/dataStore.php',    
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'details'
                }
            }
        });
        
        me.tbar = [{
            xtype: 'monthfield',
            name: 'periode',
            itemId: 'periode',
            fieldLabel: 'Gaji Bulan',
            labelStyle: 'text-align: center;',
            labelWidth: 100,
            format: 'm-Y',
            submitFormat: 'Y-m',
            width: 200,
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
                    me.loadDataStore(me.down('#periode').getSubmitValue());
                }
            }
        }, {
            xtype: 'container',
            flex: 1
        }, Ext.create('Admin.view.webdesktop.searchField', {
            store: me.store,
            width: 350
        })];
    
        me.bbar = [{
            xtype: 'button',
            itemId: 'edit',
            action: 'edit',
            text : 'Edit [<B>F2</B>]',
            disabled: true
        }, {
            xtype: 'button',
            itemId: 'cetak',
            action: 'cetak',
            text : 'Cetak [<B> C </B>]',
            disabled: false,
            hidden: true
        }, '->', Ext.create('Ext.PagingToolbar', {
            border: false,
            store: me.store,
            displayInfo: true,
            displayMsg: 'Data {0} - {1} dari {2} data',
            emptyMsg: ''
        })];
    
        me.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            autoCancel: false,
            hideButtons: function(){
                var me = this;
                if (me.editor && me.editor.floatingButtons) {
                    me.editor.floatingButtons.hide();
                } else {
                    Ext.defer(me.hideButtons, 10, me);
                }
            },

            listeners: {
                scope: me,
                canceledit: function(f, e) {
                    
                    var from_edit = !me.addNew;
                    if(me.addNew) {
                        me.store.remove(e.record);
                    }
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                        
                    var edit = me.down('#edit');
                    var cetak = me.down('#cetak');
                    
                    setTimeout(function() {
                        
                        edit.setDisabled(!from_edit);
                        cetak.setDisabled(false);
                    
                    }, 100);
                },

                beforeedit: function(f, e) {
                    if(me.saved) return false;                    
                    f.hideButtons();
                    
                    me.recordSelected   = e.record;
                    me.validateEdit     = false;
                    
                    var edit = me.down('#edit');
                    var cetak = me.down('#cetak');
                    
                    setTimeout(function() {
                        
                        edit.setDisabled(true);
                        cetak.setDisabled(true);
                        
                        if(me.addNew) {
                            me.columns[1].getEditor(me.recordSelected).reset();
                            me.columns[3].getEditor(me.recordSelected).reset();
                        }
                        
                    }, 100);
                },

                afteredit: function(f, e) {
                    //console.log(me.recordSelected.get('id'));
                    e.record.set('id', me.recordSelected.get('id'));
                    e.record.commit();
                    
                    var from_edit = !me.addNew;
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var edit = me.down('#edit');
                    var cetak = me.down('#cetak');
                    
                    setTimeout(function() {
                        edit.setDisabled(!from_edit);
                        cetak.setDisabled(false);                        
                    }, 10);
                },

                validateedit: function(editor, e) {
                    return me.validateEdit;
                }                    
            }
        });       
        
        Ext.apply(c, {

            plugins: me.rowEditor,
            
            columns: [
                //--- [0]
                {text: 'No.', width: 55, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo, editor: {
                    xtype: 'displayfield',
                    fieldStyle: 'text-align: center;'
                }},
                
                //--- [1]
                {sortable: false, text: 'NIK', dataIndex: 'nik', width: 70, align: 'center', menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        readOnly: true,        
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [2]
                {sortable: false, text: 'Nama', dataIndex: 'nama', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[1].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [3]
                {sortable: false, text: 'Area', dataIndex: 'area', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [4]
                {sortable: false, text: 'Upah', dataIndex: 'nilai', align: 'right', width: 120, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [5]
                {sortable: false, text: 'Qty', dataIndex: 'qty', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    Ext.Ajax.request({
                                        url: 'api/store/uanghadir/save.php',
                                        method: 'POST',
                                        params:{
                                            id: me.recordSelected.get('id'),
                                            periode: me.down('#periode').getSubmitValue(),
                                            nik: me.columns[1].getEditor(me.recordSelected).getSubmitValue(),
                                            nilai: me.columns[4].getEditor(me.recordSelected).getSubmitValue(),
                                            qty: me.columns[5].getEditor(me.recordSelected).getSubmitValue(),
                                            jumlah: me.columns[6].getEditor(me.recordSelected).getSubmitValue()
                                        },
                                        success:function(response, opt) {
                                            var json = Ext.JSON.decode(response.responseText);
                                            if(json['success']) {
                                                me.validateEdit = true;
                                                me.recordSelected.set('id', json['result_id']);
                                                me.rowEditor.completeEdit();
                                            } else {
                                                Ext.MessageBox.show({
                                                    title: 'Gagal',
                                                    msg:  json['message'],
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR,
                                                    fn: function() {
                                                        me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                                    }
                                                });
                                            }
                                        },
                                        failure:function(resp, opt){
                                            Ext.MessageBox.show({
                                                title: 'Gagal',
                                                msg:  'Silahkan coba lagi!',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR,
                                                fn: function() {
                                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                                }
                                            });
                                        }
                                    });
                                }
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [6]
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', width: 120, menuDisabled: true, align: 'right',
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                //console.log('enter..');
                                if (e.getKey() == e.ENTER) {
                                    //proses seve disini
                                    //me.validateEdit = (e.getKey() == e.ENTER);
                                    //me.columns[8].getEditor(me.recordSelected).focus(true, 10);
                                    Ext.Ajax.request({
                                        url: 'api/store/uanghadir/save.php',
                                        method: 'POST',
                                        params:{
                                            id: me.recordSelected.get('id'),
                                            periode: me.down('#periode').getSubmitValue(),
                                            nik: me.columns[1].getEditor(me.recordSelected).getSubmitValue(),
                                            nilai: me.columns[4].getEditor(me.recordSelected).getSubmitValue(),
                                            qty: me.columns[5].getEditor(me.recordSelected).getSubmitValue(),
                                            jumlah: me.columns[6].getEditor(me.recordSelected).getSubmitValue()
                                        },
                                        success:function(response, opt) {
                                            var json = Ext.JSON.decode(response.responseText);
                                            if(json['success']) {
                                                me.validateEdit = true;
                                                me.recordSelected.set('id', json['result_id']);
                                                me.rowEditor.completeEdit();
                                            } else {
                                                Ext.MessageBox.show({
                                                    title: 'Gagal',
                                                    msg:  json['message'],
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.ERROR,
                                                    fn: function() {
                                                        me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                                                    }
                                                });
                                            }
                                        },
                                        failure:function(resp, opt){
                                            Ext.MessageBox.show({
                                                title: 'Gagal',
                                                msg:  'Silahkan coba lagi!',
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.ERROR,
                                                fn: function() {
                                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                                                }
                                            });
                                        }
                                    });
                                    
                                }
                                if (e.getKey() == e.TAB) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                }
            ],

            cls: 'custom-grid',
            viewConfig: {
                getRowClass: function(record) {
                    if(record.data['status_pegawai']=='KELUAR') {
                        return 'changed_colour_red';
                    }
                }
            },
            
            listeners: {
                selectionchange: function(view, records) {
                    var edit = me.down('#edit');
                    edit.setDisabled(!records.length);                    
                },
                keydown: {
                    element: 'el',
                    fn: function (eventObject, htmlElement, object, options) {
                        if (eventObject.keyCode == 113) {
                            me.editRecord();
                        } else if (eventObject.keyCode == 67) {
                            var element = me.down('#cetak');
                            element.fireEvent('click',element);
                        }
                    }
                }
            }
        });

        this.callParent(arguments);
    },
    
    editRecord: function() {
        var grid = this;

        grid.addNew = false;
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            grid.rowEditor.startEdit(row, 5);
            grid.columns[5].getEditor(selection).focus(true, 10);
        }
    },

    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            var nilai = me.columns[4].getEditor(me.recordSelected).getSubmitValue();
            var qty   = me.columns[5].getEditor(me.recordSelected).getSubmitValue();
            
            me.columns[6].getEditor(me.recordSelected).setValue(
                (eval(nilai)*eval(qty)) 
            );
    
        }, 10);                                    
    },
    
    transaksiBaru: function() {
        this.getStore().removeAll();
        this.saved = false;
    },

    transaksiSave: function() {
        this.saved = true;
    },
    
    loadDataStore: function(periode) {
        var me = this;
        
        var proxy = me.store.getProxy();
        proxy.extraParams['periode'] = periode;
        me.store.loadPage(1);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        me.down('#periode').setValue(new Date());
    }
    
});