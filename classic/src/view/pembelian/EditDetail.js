Ext.define('Admin.view.pembelian.EditDetail', {
    extend: 'Ext.grid.Panel',
    xtype: 'pembelian-edit-detail',

    cls: 'pembelian-grid',
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var diskonRender = function(value, p, record) {
            return me.func.diskon(value);
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
                
                me.getSubTotalJumlah();            
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

        var barangSelect = function(f, record) {
            var store = me.getStore();
            var rec = me.recordSelected;
            var index = store.indexOf(rec);
            
            store.getAt(index).set('id_barang', record.data['id']); //id_barang
            me.columns[3].getEditor(rec).setValue(record.data['satuan']); //harga jual
            me.columns[4].getEditor(rec).setValue(record.data['harga_jual']); //harga jual
            me.columns[6].getEditor(rec).setValue(record.data['pajak_jual']?'PPN':''); //pajak
        };

        me.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            autoCancel: false,
            hideButtons: function() {
                var me = this;
                
                me.editor.floatingButtons.setStyle('visibility', 'hidden');
                //me.editor.floatingButtons.items.items[0].hide();
                //me.editor.floatingButtons.items.items[1].hide();
                //me.editor.floatingButtons.items.items[0].setText();
                //me.editor.floatingButtons.items.items[0].setIconCls('x-fa fa-check');
                //me.editor.floatingButtons.items.items[1].setText();
                //me.editor.floatingButtons.items.items[1].setIconCls('x-fa fa-trash');
                /*if (me.editor && me.editor.floatingButtons) {
                    me.editor.floatingButtons.setStyle('visibility', 'hidden');
                } else {
                    Ext.defer(me.hideButtons, 10, me);
                }*/
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
                    
                    setTimeout(function() {
                        tambah.setDisabled(true);
                        hapus.setDisabled(true);
                        edit.setDisabled(true);                  
                    }, 100);
                },

                afteredit: function(f, e) {
                    e.record.commit();
                    
                    me.getSubTotalJumlah();
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
                    name: 'id_barang'
                },
                {
                    type: 'string',
                    name: 'nama_barang'
                }, 
                {
                    type: 'int',
                    name: 'qty'
                }, 
                {
                    type: 'string',
                    name: 'satuan'
                }, 
                {
                    type: 'int',
                    name: 'harga'
                }, 
                {
                    type: 'string',
                    name: 'diskon'
                }, 
                {
                    type: 'string',
                    name: 'pajak'
                }, {
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
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Item Barang', flex: 1.5, menuDisabled: true, sortable: false, align: 'left', dataIndex: 'nama_barang', 
                    editor: {
                        xtype: 'combobox',
                        store: {
                            type: 'inventori'
                        },
                        typeAhead: true,
                        queryMode: 'local',
                        valueField: 'nama',
                        displayField: 'nama',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            select: barangSelect
                        }                    
                    }
                },
                
                //--- [2]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Qty', flex: 0.7, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'qty', renderer: decimalRender, 
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function(f) {
                                me.getJumlah();
                            }
                        }
                    }
                },
                
                //--- [3]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Unit', flex: 0.7, menuDisabled: true, sortable: false, align: 'left',  dataIndex: 'satuan', 
                    editor: {
                        xtype: 'combobox',
                        store: {
                            type: 'satuan'
                        },
                        typeAhead: true,
                        queryMode: 'local',
                        valueField: 'satuan',
                        displayField: 'satuan',
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
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Harga', flex: 0.7, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'harga', renderer: decimalRender,
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
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Diskon', flex: 0.7, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'diskon', renderer: diskonRender,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        tipe: 'diskon',
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
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Pajak', flex: 0.7, menuDisabled: true, sortable: false, align: 'left', dataIndex: 'pajak',
                    editor: {
                        xtype: 'textfield',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }                    
                    }
                },
                
                //--- [7]
                {xtype: 'gridcolumn', cls: 'content-column', text: 'Jumlah', flex: 0.7, menuDisabled: true, sortable: false, align: 'right', dataIndex: 'jumlah', renderer: decimalRender,
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
            var diskon = me.columns[5].getEditor(record).getSubmitValue();
            var harga  = me.columns[4].getEditor(record).getSubmitValue();
            var qty    = me.columns[2].getEditor(record).getSubmitValue();

            var totDiskon = 0;
            var nilai = harga;
            var disk = diskon.split('+');
            for(var i=0;i<disk.length;i++) {
                var diskons = eval(disk[i].substring(disk[i].length-1)=='%'?nilai*0.01*eval(disk[i].replace('%','')):disk[i]);

                nilai = nilai-diskons;
                totDiskon += diskons;
            }

            me.columns[7].getEditor(record).setValue(qty*(harga-totDiskon));
        }, 10);                                    
    },
    
    getSubTotalJumlah: function() {
        var me = this;
        var subtotal = 0;
        var totalpajak = 0;

        for(var row=0;row<me.store.getCount(); row++) {
            var rec = me.getStore().getAt(row);
            subtotal+=rec.data['jumlah'];
            totalpajak+=(rec.data['pajak'].toUpperCase()=='PPN'?(0.1*rec.data['jumlah']):0);
        }

        var e_subtotal = me.up('pembelian-edit').down('#subtotal');
        var e_totalpajak = me.up('pembelian-edit').down('#totalpajak');
        var e_total = me.up('pembelian-edit').down('#total');

        e_subtotal.setValue(subtotal);
        e_totalpajak.setValue(totalpajak);
        e_total.setValue(subtotal+totalpajak);
    },
    
    getDetail: function() {
        var me = this;
        var str = '';

        for(var row =0;row<me.getStore().getCount();row++) {
            var rec = me.getStore().getAt(row);

            str += (str!=''?';':'') +                                  // id  keterangan
                   
                rec.data['id_barang'] + ',' +                      //  1  id_barang
                rec.data['nama_barang'] + ',' +                    //  2  nama_barang
                rec.data['qty'] + ',' +                             //  3  qty
                rec.data['satuan'] + ',' +                          //  4  satuan
                rec.data['harga'] + ',' +                           //  5  harga
                rec.data['diskon'].replace(/[\,]/g, '') + ',' +     //  6  diskon
                rec.data['pajak'] + ',' +                           //  7  pajak
                rec.data['jumlah'];                                 //  8  jumlah
        }

        //console.log(str);
        return str;
    }
});