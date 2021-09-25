Ext.define('Admin.view.webdesktop.inv.rolltoroll.aktual', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.invrolltorollaktual',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
        
    constructor: function(c) {
        var me = this;
        
        Ext.apply(Ext.form.field.VTypes, {
		
            noroll: function(val, field) {

                var value = field.getSubmitValue();
                var current = me.getStore().indexOf(me.recordSelected);
                for(var i=0; i<me.getStore().getCount(); i++) {
                    if(i!=current && me.getStore().getAt(i).get('noroll')==value) return false;
                }
                
                return true;
            },
            
            norollText: 'No. Roll sudah dimasukkan.'
        });
        
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var summaryDecimalRender = function(value, p, record) {
            return '<B>'+me.func.currency(value)+'</B>';
        };
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
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
                    if(me.addNew) {
                        me.store.remove(e.record);
                    }
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    
                    var tambah = me.up('window').down('#tambah');
                    var simpan = me.up('window').down('#simpan');
                    var tabDetail = me.up('window').down('#tabdetail').items.getAt(0);
                    var tabWasted = me.up('window').down('#tabdetail').items.getAt(2);
                    
                    setTimeout(function() {
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);
                        tabDetail.setDisabled(false);
                        tabWasted.setDisabled(false);                      
                    }, 100);
                },

                beforeedit: function(f, e) {
                    if(me.saved) return false;

                    f.hideButtons();
                    me.recordSelected   = e.record;
                    me.validateEdit     = false;
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    var simpan = me.up('window').down('#simpan');
                    var tabDetail = me.up('window').down('#tabdetail').items.getAt(0);
                    var tabWasted = me.up('window').down('#tabdetail').items.getAt(2);
                    setTimeout(function() {
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                        simpan.setDisabled(true);
                        tabDetail.setDisabled(true);
                        tabWasted.setDisabled(true);
                        
                        var satuan       = me.columns[5].getEditor(e.record);
                        var store_satuan = satuan.getStore();
                        store_satuan.removeAll();
                        store_satuan.loadRawData(me.satuan_barang);
                        satuan.setValue(me.default_satuan); 
        
                    }, 100);
                },

                afteredit: function(f, e) {
                    e.record.set('kode_barang', me.kode_barang);
                    e.record.set('nama_barang', me.nama_barang);
                    e.record.commit();
                     
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var row = me.getStore().indexOf(e.record);
                    setTimeout(function() {
                        var tambah = me.up('window').down('#tambah');
                        var simpan = me.up('window').down('#simpan');
                        var tabDetail = me.up('window').down('#tabdetail').items.getAt(0);
                        var tabWasted = me.up('window').down('#tabdetail').items.getAt(2);
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);                        
                        tabDetail.setDisabled(false);
                        tabWasted.setDisabled(false);
                        
                        if(row==me.getStore().getCount()-1) {
                            tambah.fireEvent('click', tambah);
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

            plugins: me.rowEditor,
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            store: Ext.create('Admin.store.stores', {
                fields: ['id', 'kode_barang', 'nama_barang', 'harga', 'noroll', 'substance', 'size', {name: 'qty', type: 'float'}, 'satuan'],
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: 'aktuals'
                    }
                }
            }),

            columns: [
                //--- [0]
                {text: 'No.', width: 55, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo, editor: {
                    xtype: 'displayfield',
                    fieldStyle: 'text-align: center;'
                }},
                
                //--- [1]
                {sortable: false, text: 'No. Roll', dataIndex: 'noroll', align: 'left', flex: 1.2, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        msgTarget: 'side',
                        vtype: 'noroll',
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
                {sortable: false, text: 'Substance', dataIndex: 'substance', align: 'right', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [3]
                {sortable: false, text: 'Size', dataIndex: 'size', align: 'right', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [4]
                {sortable: false, text: 'Weight', dataIndex: 'qty', align: 'right', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender,
                    summaryType: 'sum',
                    summaryRenderer: summaryDecimalRender
                },
                
                //--- [5]
                {sortable: false, text: 'Unit', dataIndex: 'satuan', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        selectOnFocus: true,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['satuan'],
                            proxy: {
                                type: 'memory',
                                reader: {
                                    type: 'json',
                                    rootProperty: 'satuan'
                                }
                            }
                        }),
                        valueField: 'satuan',
                        displayField: 'satuan',
                        queryMode: 'local',
                        typeAhead: true,
                        listeners: {
                            specialkey: function(field, e){
                                //console.log('enter..');
                                me.validateEdit = (e.getKey() == e.ENTER);
                                if (e.getKey() == e.TAB) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                }
            ],

            listeners: {
                selectionchange: function(view, records) {
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    
                    var getValue = tambah.disabled || !records.length;
                    edit.setDisabled(getValue);
                    hapus.setDisabled(getValue);
                },
                keydown: {
                    element: 'el',
                    fn: function (eventObject, htmlElement, object, options) {
                        if (eventObject.keyCode == 46)
                            me.hapusRecord();
                        if (eventObject.keyCode == 113)
                            me.editRecord();
                    }
                }
            }
        });

        this.callParent(arguments);
    },
    
    penjelasanChanges: function(f) {
        if (this.afterEdit) return;

        var grid   = this;
        var record = grid.recordSelected;
        var v      = f.getValue();
        var r      = f.findRecord(f.valueField || f.displayField, v);
        var index  = f.store.indexOf(r);

        grid.columns[2].getEditor(record).setValue(); //No. Roll
        grid.columns[3].getEditor(record).setValue(); //Subtance
        grid.columns[4].getEditor(record).setValue(); //size
        grid.columns[5].getEditor(record).setValue(index>-1?f.store.getAt(index).get('harga'):undefined); //harga
        
        grid.columns[6].getEditor(record).setValue(); //qty
        grid.columns[7].getEditor(record).setValue(); //satuan
        
        var satuan       = grid.columns[7].getEditor(record);
        var store_satuan = satuan.getStore();
        store_satuan.removeAll();
        if(index>-1) {
            store_satuan.loadRawData(f.store.getAt(index).get('satuan'));
            satuan.setValue(f.store.getAt(index).get('default_satuan'));
        } 
        
        f.collapse();
    },


    hapusRecord: function() {

        var grid = this;
        var selection = grid.getView().getSelectionModel().getSelection()[0];

        if (selection) {
            var index = grid.getStore().indexOf(selection);
            grid.store.remove(selection);
            
            for(var i=index; i<grid.store.getCount(); i++) {
                grid.store.getAt(i).set('id', i+1);
                grid.store.getAt(i).commit();
            }
        }
    },

    editRecord: function() {
        var grid = this;

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            grid.rowEditor.startEdit(row, 1);
            grid.columns[1].getEditor(selection).focus(true, 10);
        }
    },

    tambahRecord: function() {
        var grid = this;
        var rowGridCount = grid.getStore().getCount();
        
        grid.addNew = true;
        grid.getStore().insert(rowGridCount, {
            id: rowGridCount+1
        });
            
        grid.rowEditor.startEdit(rowGridCount, 1);  //1 Nama Barang. yang tampak.
        grid.columns[1].getEditor(grid.getStore().getAt(rowGridCount)).focus(true, 10);
    },
    
    getDetail: function() {
        var me = this;
        var str = '';

        for(var row =0;row<me.getStore().getCount();row++) {
            var rec = me.getStore().getAt(row);

            str += (str!=''?'\n':'') +                               // id  keterangan
                rec.data['id'] + '\t' +                              //  0  id
                rec.data['kode_barang'] + '\t' +                     //  1  kode_barang
                rec.data['nama_barang'] + '\t' +                     //  2  nama_barang
                rec.data['harga'].replace(/[\,]/g, '') + '\t' +      //  3  harga
                rec.data['noroll'] + '\t' +                          //  4  noroll
                rec.data['substance'].replace(/[\,]/g, '') + '\t' +  //  5  substance
                rec.data['size'].replace(/[\,]/g, '') + '\t' +       //  6  size
                (rec.data['qty']+'').replace(/[\,]/g, '') + '\t' +        //  7  qty
                rec.data['satuan'];                                  //  8  jumlah
       }

        //console.log(str + '\n\n\n\n');
        return str;
    },
    
    transaksiBaru: function() {
        this.getStore().removeAll();
        this.saved = false;
    },

    transaksiSave: function() {
        this.saved = true;
    }
});