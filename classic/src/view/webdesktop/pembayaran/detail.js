Ext.define('Admin.view.webdesktop.pembayaran.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.pembayarandetail',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
        
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var storeSumberAnggaran = Ext.create('Admin.store.stores', {
            fields: ['id', 'notrx', 'keterangan', 'jumlah', "nama_proyek", "nama_pelanggan"],
            url: 'api/store/anggaranStore.php'
        });
        
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
                        me.up('window').down('#divisi').setReadOnly(me.getStore().getCount()>0);
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
                        me.columns[3].getEditor(e.record).reset();                        
                        
                        var proxy = me.columns[1].getEditor(e.record).store.getProxy();
                        proxy.extraParams['divisi'] = me.up('window').down('#divisi').getSubmitValue();
                        
                        if(!me.addNew) {
                            me.columns[3].getEditor(e.record).setValue(e.record.data['kode_akun']);
                        }
                        me.up('window').down('#divisi').setReadOnly(true);
                    }, 100);
                },

                afteredit: function(f, e) {
                    var anggaran = me.columns[1].getEditor(e.record);
                    e.record.set('keterangan', anggaran.getDisplayValue());
                    
                    var akun = me.columns[3].getEditor(e.record);
                    e.record.set('nama_akun', akun.getDisplayValue());
                    
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
                        me.up('window').down('#divisi').setReadOnly(me.getStore().getCount()>0);
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
                fields: ['id', 'id_anggaran', 'keterangan', 'kode_akun', 'nama_akun', {name: 'jumlah', type: 'int'}],
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
                {sortable: false, text: 'Anggaran', dataIndex: 'keterangan', align: 'left', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        store: storeSumberAnggaran,
                        valueField: 'notrx',
                        displayField: 'keterangan',
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
                                return '{nama_pelanggan} / {nama_proyek} / {keterangan}';
                            }
                        },            
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                var id_anggaran = me.columns[2].getEditor(me.recordSelected);
                                var anggaran = me.columns[5].getEditor(me.recordSelected);
                                var jumlah   = me.columns[6].getEditor(me.recordSelected);

                                id_anggaran.setValue(record[0].data['notrx']);
                                anggaran.setValue(record[0].data['jumlah']);
                                jumlah.setValue(record[0].data['jumlah']);
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
                {sortable: false, text: 'No. Anggaran', dataIndex: 'id_anggaran', align: 'left', flex: 0.5, menuDisabled: true,
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
                {menuDisabled: true, sortable: false, text: 'Debet', renderer: akunRenderer, flex: 1,
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
                                var kode_akun = me.columns[4].getEditor(me.recordSelected);
                                kode_akun.setValue(record[0].data['kode_akun']);
                                me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }   
                    }
                },
                
                //--- [4]
                {sortable: false, text: 'Kode', dataIndex: 'kode_akun', align: 'left', flex: 0.3, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [5]
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', align: 'right', flex: 0.4, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                //console.log('enter..');
                                me.validateEdit = (e.getKey() == e.ENTER);
                                if (e.getKey() == e.TAB) {
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
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

        grid.columns[0].getEditor(record).setValue(index>-1?f.store.getAt(index).get('id'):0); //id_anggaran 
        
        
        
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
        
        grid.up('window').down('#divisi').setReadOnly(grid.getStore().getCount()>0);
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
            jumlah: 0
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
            str += (str!=''?'\n':'') +                                      // id  keterangan
                   rec.data['id'] + '\t' +                                  //  0  id
                   rec.data['id_anggaran'] + '\t' +                         //  1  id_anggaran
                   rec.data['keterangan'] + '\t' +                          //  2  keterangan
                   rec.data['kode_akun'] + '\t' +                           //  3  kode_akun
                   rec.data['nama_akun'] + '\t' +                           //  4  nama_akun
                   (rec.data['jumlah']+'').replace(/[\,]/g, '');            //  5  jumlah
        }

        console.log(str + '\n\n\n\n');
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