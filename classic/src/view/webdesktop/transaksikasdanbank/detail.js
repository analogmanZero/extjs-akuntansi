Ext.define('Admin.view.webdesktop.transaksikasdanbank.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.transaksikasdanbankdetail',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
        
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var storeSumberDana = Ext.create('Admin.store.stores', {
            fields: ['id','kode_akun','nama_akun', 'display', 'level'],
            url: 'api/store/rekeningStore.php',
            pageSize: 1000000,
            autoLoad: true
        });
        
        Ext.apply(Ext.form.field.VTypes, {
		
            sumberdana: function(val, field) {                
                var values = field.getSubmitValue();
                var index = storeSumberDana.indexOf(field.findRecord(field.valueField, values));                
                return (index>-1 && eval(storeSumberDana.getAt(index).get('level'))==4);
            },
				                
            sumberdanaText: 'Rekening harus level empat.'
        });  
        
        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var summaryRendererJumlah = function(value, p, record) {
            return '<B>'+me.func.currency(value)+'</B>';
        };
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
        var akunRenderer = function(value, p, record) {
            return record.data['nama_akun'];
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
                    setTimeout(function() {
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);
                        simpan.focus(true, 10);
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
                    setTimeout(function() {
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                        simpan.setDisabled(true);
                        me.columns[1].getEditor(e.record).reset();
                        if(!me.addNew) {
                            me.columns[1].getEditor(e.record).setValue(e.record.data['kode_akun']);
                        }
                    }, 100);
                },

                afteredit: function(f, e) {
                    var akun = me.columns[1].getEditor(e.record);
                    e.record.set('nama_akun', akun.getDisplayValue());
                    e.record.commit();
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var row = me.getStore().indexOf(e.record);
                    //me.up('window').down('#rekeningheader').setReadOnly(true);
                    setTimeout(function() {
                        var tambah = me.up('window').down('#tambah');
                        var simpan = me.up('window').down('#simpan');
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);
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
                fields: ['id', 'kode_akun', 'nama_akun', 'keterangan', {name: 'qty', type: 'int'}, {name: 'harga', type: 'int'}, {name: 'jumlah', type: 'int'}],
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: 'details'
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
                {menuDisabled: true, sortable: false, text: 'Kredit', renderer: akunRenderer, flex: 1,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        store: storeSumberDana,
                        valueField: 'kode_akun',
                        displayField: 'nama_akun',
                        typeAhead: true,
                        queryMode: 'local',
                        //queryDelay: 100,
                        //minChars:0,
                        vtype: 'sumberdana',
                        pageSize: 1000000,
                        matchFieldWidth : false,
                        autoSelect: false,
                        listConfig: {
                            loadingText: 'Loading...',
                            //set tinggi dan lebar isi list
                            width : '40%',
                            height : '110%',
                            resizable : true,
                            emptyText: 'Data tidak ditemukan.',
                            getInnerTpl: function() {
                                return '{display}';
                            }
                        },
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                var kode_akun = me.columns[2].getEditor(me.recordSelected);
                                kode_akun.setValue(record[0].data['kode_akun']);
                                me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }   
                    }
                },
                
                //--- [2]
                {sortable: false, text: 'Kode', dataIndex: 'kode_akun', align: 'center', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [3]
                {sortable: false, text: 'Keterangan', dataIndex: 'keterangan', align: 'left', flex: 1.3, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
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
                {sortable: false, text: 'Qty', dataIndex: 'qty', align: 'right', flex: 0.7, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
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
                {sortable: false, text: 'Harga', dataIndex: 'harga', align: 'right', flex: 0.7, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
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
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', flex: 0.7, menuDisabled: true, align: 'right',
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                //console.log('enter..');
                                me.validateEdit = (e.getKey() == e.ENTER);
                                if (e.getKey() == e.TAB) {
                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'
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
                        if (eventObject.keyCode == 46) {
                            me.hapusRecord();
                        } else if (eventObject.keyCode == 113) {
                            me.editRecord();
                        } else if (eventObject.keyCode == 119) {
                            var element = me.up('window').down('#baru');
                            element.fireEvent('click',element);
                        } else if (eventObject.keyCode == 115) {
                            var element = me.up('window').down('#simpan');
                            element.fireEvent('click',element);
                        } else if (eventObject.keyCode == 45) {
                            var element = me.up('window').down('#tambah');
                            element.fireEvent('click',element);
                        } else if (eventObject.keyCode == 67) {
                            var element = me.up('window').down('#cetak');
                            element.fireEvent('click',element);
                        }
                    }
                }
            }
        });

        this.callParent(arguments);
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
        
        //grid.up('window').down('#rekeningheader').setReadOnly(grid.getStore().getCount()>0);
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
            id: rowGridCount+1,
            qty: 1,
            harga: 0
        });
            
        grid.rowEditor.startEdit(rowGridCount, 1);  //1 Nama Barang. yang tampak.
        grid.columns[1].getEditor(grid.getStore().getAt(rowGridCount)).focus(true, 10);
    },
    
    getDetail: function() {
        var me = this;
        var str = '';

        me.total=0;
        for(var row =0;row<me.getStore().getCount();row++) {
            var rec = me.getStore().getAt(row);
            me.total+=eval((rec.data['jumlah']+'').replace(/[\,]/g, '')); 
            str += (str!=''?'\n':'') +                                 // id  keterangan
                   rec.data['id'] + '\t' +                             //  0  id
                   rec.data['kode_akun'] + '\t' +                      //  1  kode_akun
                   rec.data['nama_akun'] + '\t' +                      //  2  nama_akun
                   rec.data['keterangan'] + '\t' +                     //  3  keterangan
                   (rec.data['qty']+'').replace(/[\,]/g, '') + '\t' +       //  4  qty
                   (rec.data['harga']+'').replace(/[\,]/g, '') + '\t' +     //  5  harga
                   (rec.data['jumlah']+'').replace(/[\,]/g, '');            //  6  jumlah
       }

        //console.log(str + '\n\n\n\n');
        return str;
    },
    
    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            var record = me.recordSelected;
            var qty    = me.columns[4].getEditor(record).getSubmitValue();
            var harga  = me.columns[5].getEditor(record).getSubmitValue();
            me.columns[6].getEditor(record).setValue(eval(harga)*eval(qty));
        }, 10);                                    
    },
    
    transaksiBaru: function() {
        this.getStore().removeAll();
        this.saved = false;
    },

    transaksiSave: function() {
        this.saved = true;
    }
});