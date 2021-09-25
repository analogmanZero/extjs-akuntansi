Ext.define('Admin.view.webdesktop.karyawan.bayargaji', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.karyawanbayargaji',

    layout: 'fit',
 
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'status_pegawai', 'nama', 'area', 'cara_bayar', 'no_rek'],
            url: 'api/store/karyawan/bayargajiStore.php',    
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'details'
                }
            }
        });
        
        me.tbar = [{
            xtype: 'button',
            itemId: 'edit',
            action: 'editbayargaji',
            text : 'Edit [<B>F2</B>]',
            disabled: true
        }, {
            xtype: 'button',
            itemId: 'cetak',
            action: 'cetak',
            text : 'Cetak [<B> C </B>]',
            disabled: false,
            hidden: true
        }, {
            xtype: 'container',
            flex: 1
        }, Ext.create('Admin.view.webdesktop.searchField', {
            store: me.store,
            width: 350
        })];
    
        me.bbar = ['->', Ext.create('Ext.PagingToolbar', {
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
                {sortable: false, text: 'Cara Bayar', dataIndex: 'cara_bayar', align: 'center', flex: 0.7, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['nama'],
                            data: [{nama: 'TUNAI'}, {nama: 'TRANSFER'}]
                        }),
                        valueField: 'nama',
                        displayField: 'nama',
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                               me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [5]
                {sortable: false, text: 'No. Rekening', dataIndex: 'no_rek', align: 'left', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    //alert(me.recordSelected.get('id'));
                                    Ext.Ajax.request({
                                        url: 'api/store/karyawan/bayargajiSave.php',
                                        method: 'POST',
                                        params:{
                                            id_karyawan: me.recordSelected.get('id'),
                                            cara_bayar: me.columns[4].getEditor(me.recordSelected).getSubmitValue(),
                                            no_rek: me.columns[5].getEditor(me.recordSelected).getSubmitValue()
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
                            }
                        }
                    }
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
            grid.rowEditor.startEdit(row, 4);
            grid.columns[4].getEditor(selection).focus(true, 10);
        }
    },
    
    transaksiBaru: function() {
        this.getStore().removeAll();
        this.saved = false;
    },

    transaksiSave: function() {
        this.saved = true;
    },
    
    loadDataStore: function() {
        var me = this;
        
        me.store.loadPage(1);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        me.store.loadPage(1);
    }
    
});