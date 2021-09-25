Ext.define('Admin.view.webdesktop.inv.penystock.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.invpenystockdetail',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
        
    constructor: function(c) {
        var me = this;
        
        Ext.apply(Ext.form.field.VTypes, {
		
            noroll_: function(val, field) {

                var value = field.getSubmitValue();
                var current = me.getStore().indexOf(me.recordSelected);
                for(var i=0; i<me.getStore().getCount(); i++) {
                    if(i!=current && me.getStore().getAt(i).get('noroll')==value) return false;
                }
                
                return true;
            },
            
            noroll_Text: 'No. Roll sudah dimasukkan.'
        });
        
        me.func = new Admin.view.currency();

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
                        var nama_barang = me.columns[1].getEditor(e.record);
                        nama_barang.setValue(e.record.data['kode_barang']);
                        
                        var bentuk = me.columns[2].getEditor(e.record);
                        bentuk.fireEvent('select', bentuk);                        
                    }, 100);
                },

                afteredit: function(f, e) {
                    var penjelasan = me.columns[1].getEditor(e.record);
                    e.record.set('kode_barang', penjelasan.getSubmitValue());
                    e.record.set('nama_barang', penjelasan.getDisplayValue());
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
                fields: ['id', 'kode_barang', 'nama_barang', 'bentuk', 'noroll', 'substance', 'size', 'ukuran_potong', 'qty', 'satuan', 'harga', {name: 'jumlah', type: 'int'}],
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
                {text: 'No.', width: 50, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo, editor: {
                    xtype: 'displayfield',
                    fieldStyle: 'text-align: center;'
                }},
                
                //--- [1]
                {menuDisabled: true, sortable: false, text: 'Nama Barang', dataIndex: 'nama_barang', flex: 1.3,
                    editor: {
                        xtype: 'combo',
                        store: Ext.create('Admin.store.stores' , {
                            fields: ['id', 'nama', {name: 'satuan', type: 'auto'}, 'default_satuan', 'pajak'],
                            params: {menu: 'Beli'},
                            url: 'api/store/barangStore.php',
                            autoLoad: true
                        }),
                        valueField: 'id',
                        displayField: 'nama',
                        queryMode: 'local',
                        typeAhead: true,
                        selectOnFocus: true,
                        matchFieldWidth : false,
                        listConfig: {
                            loadingText: 'Loading...',
                            width : '20%',
                            height : '110%',
                            resizable : true,
                            emptyText: 'Data tidak ditemukan.',
                            getInnerTpl: function() {
                                return '{id} - {nama}';
                            }
                        },                        
                        listeners: {
                            select: function(f) {
                                me.penjelasanChanges(f);
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
                
                // --- [2]
                {sortable: false, text: 'Bentuk', dataIndex: 'bentuk', align: 'left', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        selectOnFocus: true,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['bentuk'],
                            data: [
                                {bentuk: 'Roll'},
                                {bentuk: 'Sheet'},
                                {bentuk: 'Waste'},
                                {bentuk: 'Core'},
                                {bentuk: 'Reject'}
                            ]
                        }),
                        valueField: 'bentuk',
                        displayField: 'bentuk',
                        queryMode: 'local',
                        typeAhead: true,
                        listeners: {
                            select: function(cmb, records) {
                                var bentuk = cmb.getSubmitValue();
                                if(bentuk=='Roll') me.columns[6].getEditor(me.recordSelected).setValue();
                                if(bentuk=='Sheet') {
                                    me.columns[3].getEditor(me.recordSelected).setValue();
                                    me.columns[5].getEditor(me.recordSelected).setValue();
                                }
                                if(bentuk=='Core' || bentuk=='Waste') {
                                    me.columns[3].getEditor(me.recordSelected).setValue();
                                    me.columns[4].getEditor(me.recordSelected).setValue();
                                    me.columns[5].getEditor(me.recordSelected).setValue();
                                    me.columns[6].getEditor(me.recordSelected).setValue();
                                }
                                if(bentuk=='Reject') {
                                    me.columns[3].getEditor(me.recordSelected).setValue();
                                    me.columns[5].getEditor(me.recordSelected).setValue();
                                }
                                
                                me.columns[3].getEditor(me.recordSelected).setReadOnly(bentuk!='Roll');
                                me.columns[4].getEditor(me.recordSelected).setReadOnly(bentuk=='Core'||bentuk=='Waste');
                                me.columns[5].getEditor(me.recordSelected).setReadOnly(bentuk=='Sheet'||bentuk=='Reject'||bentuk=='Core'||bentuk=='Waste');
                                me.columns[6].getEditor(me.recordSelected).setReadOnly(bentuk!='Sheet'&&bentuk!='Reject');
                            },
                            specialkey: function(cmb, e){
                                if (e.getKey() == e.ENTER) {
                                    var bentuk = cmb.getSubmitValue();
                                    me.columns[bentuk=='Roll'?3:(bentuk=='Core'||bentuk=='Waste'?7:4)].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [3]
                {sortable: false, text: 'No. Roll', dataIndex: 'noroll', align: 'left', flex: 0.8, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        msgTarget: 'side',
                        vtype: 'noroll_',                        
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
                {sortable: false, text: 'Subs.', dataIndex: 'substance', align: 'right', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    var bentuk = me.columns[2].getEditor(me.recordSelected).getSubmitValue();
                                    me.columns[bentuk=='Sheet'||bentuk=='Reject'||bentuk=='Core'||bentuk=='Waste'?6:5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [5]
                {sortable: false, text: 'Size', dataIndex: 'size', align: 'right', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    var bentuk = me.columns[2].getEditor(me.recordSelected).getSubmitValue();
                                    me.columns[bentuk!='Sheet'&&bentuk!='Reject'?7:6].getEditor(me.recordSelected).focus(true, 10);
                                    
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [6]
               {sortable: false, text: 'Ukuran Potong', dataIndex: 'ukuran_potong', align: 'right', flex: 0.8, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        selectOnFocus: true,
                        store: Ext.create('Admin.store.stores', {
                            fields: ['ukuran'],
                            url: 'api/store/ukuranPotongStore.php',
                            autoLoad: true
                        }),
                        valueField: 'ukuran',
                        displayField: 'ukuran',
                        queryMode: 'local',
                        typeAhead: true,
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
                {sortable: false, text: 'Weight', dataIndex: 'qty', align: 'right', flex: 0.6, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[8].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function(f) {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [8]
                {sortable: false, text: 'Unit', dataIndex: 'satuan', flex: 0.4, menuDisabled: true,
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
                                if (e.getKey() == e.ENTER) {
                                    me.columns[9].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [9]
                {sortable: false, text: 'Harga', dataIndex: 'harga', align: 'right', flex: 0.6, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[10].getEditor(me.recordSelected).focus(true, 10);
                                }
                            },
                            change: function(f) {
                                me.getJumlah();
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [10]
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', flex: 0.7, menuDisabled: true, align: 'right',
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e) {
                                me.validateEdit = (e.getKey() == e.ENTER);
                                if (e.getKey() == e.TAB) {
                                    me.columns[10].getEditor(me.recordSelected).focus(true, 10);
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

        grid.columns[2].getEditor(record).setValue('Roll'); //Bentuk
        grid.columns[2].getEditor(record).fireEvent('select', grid.columns[2].getEditor(record)); //Bentuk
        
        grid.columns[3].getEditor(record).setValue();       //No. Roll
        grid.columns[4].getEditor(record).setValue();       //Subtance
        grid.columns[5].getEditor(record).setValue();       //size
        grid.columns[6].getEditor(record).setValue();       //ukuran potong
        
        grid.columns[7].getEditor(record).setValue(0);      //qty                 
        grid.columns[8].getEditor(record).setValue();       //satuan
        grid.columns[9].getEditor(record).setValue(0);      //harga
        grid.columns[10].getEditor(record).setValue(0);     //jumlah
        //grid.columns[11].getEditor(record).setValue('BAHANA'); //jumlah
                
        var satuan       = grid.columns[8].getEditor(record);
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

    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            var record = me.recordSelected;
            var harga  = me.columns[9].getEditor(record).getSubmitValue();
            var qty    = me.columns[7].getEditor(record).getSubmitValue();

            me.columns[10].getEditor(record).setValue(eval(harga)*eval(qty));
        }, 10);                                    
    },
    
    getDetail: function() {
        var me = this;
        var str = '';

        for(var row =0;row<me.getStore().getCount();row++) {
            var rec = me.getStore().getAt(row);

            str += (str!=''?'\n':'') +                                //  id keterangan
                rec.data['id'] + '\t' +                               //   0 id
                rec.data['kode_barang'] + '\t' +                      //   1 kode_barang
                rec.data['nama_barang'] + '\t' +                      //   2 nama_barang
                rec.data['bentuk'] + '\t' +                           //   3 bentuk
                rec.data['noroll'] + '\t' +                           //   4 noroll
                rec.data['substance'].replace(/[\,]/g, '') + '\t' +   //   5 substance
                rec.data['size'].replace(/[\,]/g, '') + '\t' +        //   6 size
                rec.data['ukuran_potong'] + '\t' +                    //   7 ukuran_potong
                rec.data['qty'].replace(/[\,]/g, '') + '\t' +         //   8 qty
                rec.data['satuan'] + '\t' +                           //   9 satuan
                rec.data['harga'].replace(/[\,]/g, '') + '\t' +       //  10 harga
                (rec.data['jumlah']+'').replace(/[\,]/g, '');         //  11 jumlah
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