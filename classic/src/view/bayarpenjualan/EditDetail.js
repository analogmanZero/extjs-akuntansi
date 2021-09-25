Ext.define('Admin.view.bayarpenjualan.EditDetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'bayarpenjualan-edit-detail',

    cls: 'bayarpenjualan-grid',
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };

        var tambahRecord = function(btn) {
            var store = me.getStore();
            var rowGridCount = store.getCount();
            
            me.addNew = true;
            store.insert(rowGridCount, {
                id: rowGridCount+1
            });
                
            me.rowEditor.startEdit(rowGridCount, 1);
            me.columns[1].getEditor(store.getAt(rowGridCount)).focus(true, 10);
        };
        
        var hapusRecord = function(btn) {
            var store = me.getStore();
            var selection = me.getView().getSelectionModel().getSelection()[0];
    
            if (selection) {
                var index = store.indexOf(selection);
                store.remove(selection);
                
                for(var i=index; i<store.getCount(); i++) {
                    store.getAt(i).set('id', i+1);
                    store.getAt(i).commit();
                }
                
                me.getTotal();            
            }
        };
    
        var editRecord = function(btn) {
            var store = me.getStore();
            var selection = me.getView().getSelectionModel().getSelection()[0];
            if (selection) {
                var row = store.indexOf(selection);
                me.rowEditor.startEdit(row, 1);
                me.columns[1].getEditor(selection).focus(true, 10);
            }
        };

        var invoiceSelect = function(f, record) {
            var store = me.getStore();
            var rec = me.recordSelected;
            var index = store.indexOf(rec);
            
            store.getAt(index).set('id_penjualan', record.data['id']); //id_penjualan
            store.getAt(index).set('detail_akun', record.data['detail_akun']); //detail_akun

            me.columns[1].getEditor(rec).setValue(record.data['notrx']); //notrx_penjualan
            me.columns[2].getEditor(rec).setValue(record.data['keterangan']); //keterangan
            me.columns[3].getEditor(rec).setValue(record.data['kode_akun']); //kode_akun
            me.columns[4].getEditor(rec).setValue(1); //qty
            me.columns[5].getEditor(rec).setValue(record.data['total']); //harga
            me.columns[6].getEditor(rec).setValue(record.data['total']); //jumlah
        };

        me.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            autoCancel: false,
            hideButtons: function() {
                var me = this;
                
                me.editor.floatingButtons.setStyle('visibility', 'hidden');
            },

            listeners: {
                scope: me,
                canceledit: function(f, e) {
                    if(me.addNew) {
                        me.store.remove(e.record);
                    }
                    
                    me.addNew = false;
                    me.recordSelected = undefined;

                    var tambah = me.down('#tambah');
                    setTimeout(function() {
                        tambah.setDisabled(false);
                    }, 100);
                },

                beforeedit: function(f, e) {
                    if(me.saved) return false;

                    f.hideButtons();
                    me.recordSelected = e.record;
                    me.validateEdit = false;
                    var tambah = me.down('#tambah');
                    var hapus = me.down('#hapus');
                    var edit = me.down('#edit');
                    
                    var invoice = me.columns[1].getEditor(me.recordSelected).getStore();
                    invoice.load({
                        params: {
                            id_customer: me.up('bayarpenjualan-edit').down('#subyek').getSubmitValue()
                        }
                    });

                    setTimeout(function() {
                        tambah.setDisabled(true);
                        hapus.setDisabled(true);
                        edit.setDisabled(true);                  
                    }, 100);
                },

                afteredit: function(f, e) {
                    e.record.commit();
                    
                    me.getTotal();
                    me.addNew = false;
                    me.recordSelected = undefined;
                    
                    var tambah = me.down('#tambah');
                    var store = me.getStore();
                    var row = store.indexOf(e.record);

                    setTimeout(function() {
                        tambah.setDisabled(false);
                        if(row==store.getCount()-1) {
                            tambahRecord();
                        } else {
                            me.rowEditor.startEdit(row+1, 1);
                            me.columns[1].getEditor(me.recordSelected).focus(true, 10);
                        }
                    }, 10);
                },

                validateedit: function(editor, e) {
                    return me.validateEdit;
                }                    
            }
        });       
        
        Ext.apply(c, {

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'button',
                    itemId: 'tambah',
                    text : 'Tambah [<B>INS</B>]',
                    iconCls:'x-fa fa-plus',
                    listeners: {
                        click: tambahRecord
                    }
                }, {
                    xtype: 'button',
                    itemId: 'hapus',
                    text : 'Hapus [<B>DEL</B>]',
                    iconCls:'x-fa fa-trash-alt',
                    listeners: {
                        click: hapusRecord
                    },
                    disabled: true
                }, {
                    xtype: 'button',
                    itemId: 'edit',
                    text : 'Edit [<B>F2</B>]',
                    iconCls:'x-fa fa-pencil-alt',
                    listeners: {
                        click: editRecord
                    },
                    disabled: true
                }]
            }],

            plugins: me.rowEditor,

            store: Ext.create('Ext.data.Store', {
                
                fields: [{
                    type: 'int',
                    name: 'id'
                }, 
                {
                    type: 'int',
                    name: 'id_penjualan'
                },
                {
                    type: 'string',
                    name: 'notrx_penjualan'
                },
                {
                    type: 'string',
                    name: 'keterangan'
                }, 
                {
                    type: 'string',
                    name: 'kode_akun'
                },
                {
                    type: 'string',
                    name: 'detail_akun'
                }, 
                {
                    type: 'int',
                    name: 'qty'
                },                 
                {
                    type: 'int',
                    name: 'harga'
                },
                {
                    type: 'int',
                    name: 'jumlah'
                }],
                
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),

            columns: [
                //--- [0]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'No.', width: 55, menuDisabled: true, sortable: false, align: 'center', renderer: renderNo, 
                editor: {
                    xtype: 'displayfield',
                    fieldStyle: 'text-align: center;'
                }},
                
                //--- [1]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'No. Invoice', flex: 0.7, menuDisabled: true, sortable: false, align: 'left', dataIndex: 'notrx_penjualan', 
                    editor: {
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            model: 'Admin.model.penjualan.Penjualan',
                            proxy: {
                                type: 'ajax',
                                url: './server/public/penjualan/all',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'data'
                                }
                            },
                            
                            autoLoad: false
                        }),
                        typeAhead: true,
                        queryMode: 'local',
                        valueField: 'notrx',
                        displayField: 'notrx',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            select: invoiceSelect
                        }                    
                    }
                },

                //--- [2]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Keterangan', flex: 1, menuDisabled: true, sortable: false, align: 'left',  dataIndex: 'keterangan', 
                    editor: {
                        xtype: 'textfield',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    cellWrap: true
                },

                //--- [3]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Kredit', flex: 0.6, menuDisabled: true, sortable: false, align: 'left', dataIndex: 'kode_akun', 
                    editor: {
                        xtype: 'combobox',
                        readOnly: true,
                        fieldStyle: 'background: none #F8F9F9;',
                        store: {
                            type: 'akunpiutang'
                        },
                        typeAhead: true,
                        queryMode: 'local',
                        valueField: 'kode_akun',
                        displayField: 'kode_akun',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }                    
                    }
                },

                //--- [4]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Qty', flex: 0.4, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'qty', renderer: decimalRender, 
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function(f) {
                                me.getJumlah();
                            }
                        }
                    }
                },
                
                //--- [5]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Harga', flex: 0.6, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'harga', renderer: decimalRender,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function(f) {
                                me.getJumlah();
                            }
                        }
                    }
                },
                
                //--- [6]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Jumlah', flex: 0.6, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'jumlah', renderer: decimalRender,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                me.validateEdit = (e.getKey() == e.ENTER);                                
                            }
                        }
                    }
                }
            ],

            listeners: {
                selectionchange: function(view, records) {
                    var tambah = me.down('#tambah');
                    var hapus = me.down('#hapus');
                    var edit = me.down('#edit');
                    
                    var getValue = tambah.disabled || !records.length;
                    edit.setDisabled(getValue);
                    hapus.setDisabled(getValue);
                },
                keydown: {
                    element: 'el',
                    fn: function (eventObject, htmlElement, object, options) {
                        if (eventObject.keyCode == 45) {
                            tambahRecord();
                        } else
                        if (eventObject.keyCode == 46) {
                            hapusRecord();
                        } else 
                        if (eventObject.keyCode == 113) {
                            editRecord();
                        }
                    }
                }
            }
        });

        this.callParent(arguments);
    },
    
    getJumlah: function() {
        var me = this;
        setTimeout(function() {
            var record = me.recordSelected;
            var qty    = me.columns[4].getEditor(record).getSubmitValue();
            var harga  = me.columns[5].getEditor(record).getSubmitValue();

            me.columns[6].getEditor(record).setValue(qty*harga);
        }, 10);                                    
    },
    
    getTotal: function() {
        var me = this;
        var total = 0;

        for(var row=0;row<me.store.getCount(); row++) {
            var rec = me.getStore().getAt(row);
            total+=rec.data['jumlah'];
        }

        me.up('bayarpenjualan-edit').down('#total').setValue(total);
    },
    
    getDetail: function() {
        var me = this;
        var str = '';

        for(var row =0;row<me.getStore().getCount();row++) {
            var rec = me.getStore().getAt(row);

            str += (str!=''?';':'') +
                rec.data['id_penjualan'] + ',' +
                rec.data['notrx_penjualan'] + ',' +                     
                rec.data['kode_akun'] + ',' +
                rec.data['detail_akun'] + ',' + 
                rec.data['keterangan'] + ',' +
                rec.data['qty'] + ',' +
                rec.data['harga'] + ',' +
                rec.data['jumlah'];
        }

        //console.log(str);
        return str;
    }
});