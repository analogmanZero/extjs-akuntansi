Ext.define('Admin.view.webdesktop.transaksi_potongan_absen.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.transaksipotonganabsendetail',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
        
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();


        var storeKaryawan = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'tk', 'izin', 'sakit', 'cuti'],
            url: 'api/store/karyawanAreaAbsenStore.php',
            pageSize: 1000000
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
                        
                    }, 100);
                },

                afteredit: function(f, e) {
                    e.record.commit();
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var row = me.getStore().indexOf(e.record);
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
                fields: ['id', 'karyawan_id', 'nik', 'nama', {name: 'tk', type: 'int'}, {name: 'izin', type: 'int'}, {name: 'sakit', type: 'int'}, {name: 'cuti', type: 'int'}, {name: 'qty_tk', type: 'int'}, {name: 'qty_izin', type: 'int'}, {name: 'qty_sakit', type: 'int'}, {name: 'qty_cuti', type: 'int'}, {name: 'jumlah', type: 'int'}],
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
                {text: 'No.', width: 55, sortable: false, menuDisabled: true, align: 'center', locked: true, renderer: renderNo, editor: {
                    xtype: 'displayfield',
                    fieldStyle: 'text-align: center;'
                }},
                
                
                //--- [1]
                {sortable: false, text: 'NIK', dataIndex: 'nik', align: 'center', width: 100, locked: true, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        store: storeKaryawan,
                        valueField: 'nik',
                        displayField: 'nik',
                        typeAhead: true,
                        queryMode: 'remote',
                        queryDelay: 100,
                        minChars:0,
                        matchFieldWidth : false,
                        autoSelect: false,
                        selectOnFocus: true,
                        listConfig: {
                            loadingText: 'Loading...',
                            //set tinggi dan lebar isi list
                            width : '40%',
                            height : '110%',
                            resizable : true,
                            emptyText: 'Data tidak ditemukan.',
                            getInnerTpl: function() {
                                return '{nik}  {nama}';
                            }
                        },            
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                me.recordSelected.set('karyawan_id', record[0].data['id']);
                                var nama       = me.columns[2].getEditor(me.recordSelected);
                                var tk         = me.columns[3].getEditor(me.recordSelected);
                                var izin       = me.columns[4].getEditor(me.recordSelected);
                                var sakit      = me.columns[5].getEditor(me.recordSelected);
                                var cuti       = me.columns[6].getEditor(me.recordSelected);
                                
                                var qty_tk     = me.columns[7].getEditor(me.recordSelected);
                                var qty_izin   = me.columns[8].getEditor(me.recordSelected);
                                var qty_sakit  = me.columns[9].getEditor(me.recordSelected);
                                var qty_cuti   = me.columns[10].getEditor(me.recordSelected);
                                
                                
                                nama.setValue(record[0].data['nama']);
                                tk.setValue(record[0].data['tk']);
                                izin.setValue(record[0].data['izin']);
                                sakit.setValue(record[0].data['sakit']);
                                cuti.setValue(record[0].data['cuti']);
                                
                                qty_tk.setValue(0);
                                qty_izin.setValue(0);
                                qty_sakit.setValue(0);
                                qty_cuti.setValue(0);
                                
                                
                                me.getJumlah();
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
                {sortable: false, text: 'Nama', dataIndex: 'nama', align: 'left', width: 200, locked: true, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
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
                {sortable: false, text: 'TK', dataIndex: 'tk', align: 'right', width: 120, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
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
                
                //--- [4]
                {sortable: false, text: 'Izin', dataIndex: 'izin', align: 'right', width: 120, menuDisabled: true,
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
                {sortable: false, text: 'Sakit', dataIndex: 'sakit', align: 'right', width: 120, menuDisabled: true,
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
                {sortable: false, text: 'Cuti', dataIndex: 'cuti', align: 'right', width: 120, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [7]
                {sortable: false, text: 'Qty TK', dataIndex: 'qty_tk', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[8].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [8]
                {sortable: false, text: 'Qty Izin', dataIndex: 'qty_izin', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[9].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [9]
                {sortable: false, text: 'Qty Sakit', dataIndex: 'qty_sakit', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[10].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [10]
                {sortable: false, text: 'Qty Cuti', dataIndex: 'qty_cuti', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[11].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function() {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                
                //--- [11]
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', width: 120, menuDisabled: true, align: 'right',
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                //console.log('enter..');
                                me.validateEdit = (e.getKey() == e.ENTER);
                                if (e.getKey() == e.TAB) {
                                    me.columns[11].getEditor(me.recordSelected).focus(true, 10);
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
        
        var subyek = grid.up('window').down('#subyek');
        subyek.setReadOnly(grid.getStore().getCount()>0);
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
                str += (str!=''?'\n':'') +                                      // id  keterangan
                   rec.data['karyawan_id'] + '\t' +                             //  0  id karyawan
                   (rec.data['tk']+'').replace(/[\,]/g, '') + '\t' +            //  1  tk
                   (rec.data['izin']+'').replace(/[\,]/g, '') + '\t' +          //  2  izin
                   (rec.data['sakit']+'').replace(/[\,]/g, '') + '\t' +         //  3  sakit
                   (rec.data['cuti']+'').replace(/[\,]/g, '') + '\t' +          //  4  cuti                   
                   (rec.data['qty_tk']+'').replace(/[\,]/g, '') + '\t' +        //  5  qty_tk
                   (rec.data['qty_izin']+'').replace(/[\,]/g, '') + '\t' +      //  6  qty_izin
                   (rec.data['qty_sakit']+'').replace(/[\,]/g, '') + '\t' +     //  7  qty_sakit
                   (rec.data['qty_cuti']+'').replace(/[\,]/g, '') + '\t' +      //  8  qty_cuti
                   (rec.data['jumlah']+'').replace(/[\,]/g, '');                //  9  jumlah
       }

        //console.log(str + '\n\n\n\n');
        return str;
    },
    
    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            //var record = me.recordSelected;
            var tk         = me.columns[3].getEditor(me.recordSelected).getSubmitValue();
            var izin       = me.columns[4].getEditor(me.recordSelected).getSubmitValue();
            var sakit      = me.columns[5].getEditor(me.recordSelected).getSubmitValue();
            var cuti       = me.columns[6].getEditor(me.recordSelected).getSubmitValue();

            var qty_tk     = me.columns[7].getEditor(me.recordSelected).getSubmitValue();
            var qty_izin   = me.columns[8].getEditor(me.recordSelected).getSubmitValue();
            var qty_sakit  = me.columns[9].getEditor(me.recordSelected).getSubmitValue();
            var qty_cuti   = me.columns[10].getEditor(me.recordSelected).getSubmitValue();

            me.columns[11].getEditor(me.recordSelected).setValue(
                (eval(tk)*eval(qty_tk)) +
                (eval(izin)*eval(qty_izin)) +
                (eval(sakit)*eval(qty_sakit)) +
                (eval(cuti)*eval(qty_cuti)) 
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
        Ext.Ajax.request({
            method:'POST',
            url: 'api/store/transaksi_potongan_absen/dataStore.php',
            params: {periode: periode},
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
        
                me.getStore().loadRawData(json.topics);
            },
            failure: function() {
                
            }
        });
    }
    
});