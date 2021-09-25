Ext.define('Admin.view.webdesktop.gajiprorate.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.gajiproratedetail',

    layout: 'fit',
    
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();
        
        var storeKaryawan = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'area_kode', 'area_nama', 'thp', 'total_hari'],
            url: 'api/store/gajiprorate/karyawanStore.php',
            pageSize: 1000000
        });
        
        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'area', {name: 'thp', type: 'float'}, {name: 'total_hari', type: 'float'}, {name: 'masuk', type: 'float'}, {name: 'jumlah', type: 'float'}],
            url: 'api/store/gajiprorate/dataStore.php',
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
        }, '-', {
            xtype: 'button',
            itemId: 'tambah',
            action: 'tambah',
            text : 'Tambah [<B>INS</B>]',
            disabled: false
        },{
            xtype: 'button',
            itemId: 'edit',
            action: 'edit',
            text : 'Edit [<B>F2</B>]',
            disabled: true
        },{
            xtype: 'button',
            itemId: 'hapus',
            action :'hapus',
            text : 'Hapus [<B>DEL</B>]',
            disabled: true
        },{
            xtype: 'button',
            itemId: 'cetak',
            action: 'cetak',
            text : 'Cetak [<B> C </B>]',
            hidden: true
        },{
            xtype: 'container',
            flex: 1
        }, Ext.create('Admin.view.webdesktop.searchField', {
            store: me.store,
            width: 350
        })];
    
    
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Data {0} - {1} dari {2} data',
            emptyMsg: 'Tidak ada data untuk ditampilkan'
        });
        
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
                        
                    var tambah = me.down('#tambah');
                    var edit = me.down('#edit');
                    var hapus = me.down('#hapus');
                    var cetak = me.down('#cetak');
                    
                    setTimeout(function() {
                        
                        tambah.setDisabled(false);
                        edit.setDisabled(!from_edit);
                        hapus.setDisabled(!from_edit);
                        cetak.setDisabled(false);
                    
                    }, 100);
                },

                beforeedit: function(f, e) {
                    if(me.saved) return false;                    
                    f.hideButtons();
                    
                    me.recordSelected   = e.record;
                    me.validateEdit     = false;
                    
                    var tambah = me.down('#tambah');
                    var edit = me.down('#edit');
                    var hapus = me.down('#hapus');
                    var cetak = me.down('#cetak');
                    
                    setTimeout(function() {
                        
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                        cetak.setDisabled(true);
                        
                        if(me.addNew) {
                            me.columns[1].getEditor(me.recordSelected).reset();
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
                    var tambah = me.down('#tambah');
                    var edit = me.down('#edit');
                    var hapus = me.down('#hapus');
                    var cetak = me.down('#cetak');
                    
                    //var row = me.getStore().indexOf(e.record);
                    setTimeout(function() {
                        tambah.setDisabled(false);
                        edit.setDisabled(!from_edit);
                        hapus.setDisabled(!from_edit);
                        cetak.setDisabled(false);
                        
                        if(!from_edit) {
                            tambah.fireEvent('click', tambah);
                        }
                        
                        /*if(row==me.getStore().getCount()-1) {
                            tambah.fireEvent('click', tambah);
                        } else {
                            me.rowEditor.startEdit(row+1, 1);
                            me.columns[1].getEditor(me.recordSelected).focus(true, 10);
                        }*/
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
                {sortable: false, text: 'NIK', dataIndex: 'nik', width: 90, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
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
                                return '{nik}  {nama} ({area_kode} - {area_nama})';
                            }
                        },            
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                
                                var nama       = me.columns[2].getEditor(me.recordSelected);
                                var area       = me.columns[3].getEditor(me.recordSelected);
                                var thp        = me.columns[4].getEditor(me.recordSelected);
                                var total_hari = me.columns[5].getEditor(me.recordSelected);
                                var masuk      = me.columns[6].getEditor(me.recordSelected);
                                
                                nama.setValue(record[0].data['nama']);
                                area.setValue(record[0].data['area_kode']+' '+record[0].data['area_nama']);
                                thp.setValue(record[0].data['thp']);
                                total_hari.setValue(record[0].data['total_hari']);
                                masuk.setValue(record[0].data['total_hari']);
                                
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
                {sortable: false, text: 'THP', dataIndex: 'thp', align: 'right', width: 120, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [5]
                {sortable: false, text: 'Total Hari', dataIndex: 'total_hari', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
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
                {sortable: false, text: 'Masuk', dataIndex: 'masuk', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                if (e.getKey() == e.TAB) {
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
                
                //--- [7]
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', width: 120, menuDisabled: true, align: 'right',
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    Ext.Ajax.request({
                                        url: 'api/store/gajiprorate/save.php',
                                        method: 'POST',
                                        params:{
                                            id: me.recordSelected.get('id'),
                                            periode: me.down('#periode').getSubmitValue(),
                                            nik: me.columns[1].getEditor(me.recordSelected).getSubmitValue(),
                                            thp: me.columns[4].getEditor(me.recordSelected).getSubmitValue(),
                                            total_hari: me.columns[5].getEditor(me.recordSelected).getSubmitValue(),
                                            masuk: me.columns[6].getEditor(me.recordSelected).getSubmitValue(),
                                            jumlah: me.columns[7].getEditor(me.recordSelected).getSubmitValue()
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
                                                        me.columns[7].getEditor(me.recordSelected).focus(true, 10);
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
                                                    me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                                                }
                                            });
                                        }
                                    });
                                    
                                }
                                if (e.getKey() == e.TAB) {
                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                }
            ],

            listeners: {
                selectionchange: function(view, records) {
                    var tambah = me.down('#tambah');
                    var edit = me.down('#edit');
                    var hapus = me.down('#hapus');
                    
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
                        } else if (eventObject.keyCode == 45) {
                            var element = me.down('#tambah');
                            element.fireEvent('click',element);
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
    
    hapusRecord: function() {

        var grid = this;
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
                if(btn=='yes') {                    
                    Ext.Ajax.request({
                        url: 'api/store/gajiprorate/delete.php',
                        method: 'POST',
                        params:{
                            id: selection.get('id')                    
                        },
                        success:function(response, opt) {
                            var json = Ext.JSON.decode(response.responseText);
                            if(json['success']) {
                                grid.store.remove(selection);

                                var tambah = grid.down('#tambah');
                                //var edit   = grid.down('#edit');
                                //var hapus  = grid.down('#hapus');
                                var cetak  = grid.down('#cetak');

                                tambah.setDisabled(false);
                                //edit.setDisabled(true);
                                //hapus.setDisabled(true);
                                cetak.setDisabled(false);

                            } else {
                                Ext.MessageBox.show({
                                    title: 'Gagal',
                                    msg:  json['message'],
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        },
                        failure:function(resp, opt){
                            Ext.MessageBox.show({
                                title: 'Gagal',
                                msg:  'Silahkan coba lagi!',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });
                }
            });
        }        
        
        
    },

    editRecord: function() {
        var grid = this;

        grid.addNew = false;
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
            id: 0,
            nik: '',
            nama: '',
            thp: 0,
            total_hari: 0,
            qty: 1,
            jumlah: 0
        });
            
        grid.rowEditor.startEdit(rowGridCount, 1);
        grid.columns[1].getEditor(grid.getStore().getAt(rowGridCount)).focus(true, 10);
    },
    
    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            var thp        = me.columns[4].getEditor(me.recordSelected).getSubmitValue();
            var total_hari = me.columns[5].getEditor(me.recordSelected).getSubmitValue();
            var masuk      = me.columns[6].getEditor(me.recordSelected).getSubmitValue();
            
            me.columns[7].getEditor(me.recordSelected).setValue(Math.floor((thp/total_hari)*masuk));
    
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