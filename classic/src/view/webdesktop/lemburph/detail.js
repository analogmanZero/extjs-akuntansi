Ext.define('Admin.view.webdesktop.lemburph.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.lemburphdetail',

    layout: 'fit',

   
        
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();
        
        var storeKaryawan = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'jabatan', 'area_kode', 'area_nama', 'nilai'],
            url: 'api/store/lemburph/karyawanStore.php',
            pageSize: 1000000
        });
        
        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
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
                    
                    var from_edit = !me.addNew;
                    if(me.addNew) {
                        me.store.remove(e.record);
                    }
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                        
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    var cetak = me.up('window').down('#cetak');
                    
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
                    
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    var cetak = me.up('window').down('#cetak');
                    
                    setTimeout(function() {
                        
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                        cetak.setDisabled(true);
                        
                        if(me.addNew) {
                            me.columns[1].getEditor(me.recordSelected).reset();
                            me.columns[3].getEditor(me.recordSelected).reset();
                        }
                        
                    }, 100);
                },

                afteredit: function(f, e) {
                    //console.log(me.recordSelected.get('id'));
                    var temp = me.columns[4].getEditor(e.record).getSubmitValue().split('-');
                    
                    e.record.set('id', me.recordSelected.get('id'));
                    e.record.set('tanggal', temp[2]+'-'+temp[1]+'-'+temp[0]);
                    e.record.commit();
                    
                    var from_edit = !me.addNew;
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    var cetak = me.up('window').down('#cetak');
                    
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
            
            store: Ext.create('Admin.store.stores', {
                fields: ['id', 'nik', 'nama', 'jabatan', 'tanggal',  {name: 'nilai', type: 'float'}, 'masuk', 
                    {name: 'qty', type: 'float'}, {name: 'jumlah', type: 'float'}],
                    
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
                {sortable: false, text: 'NIK', dataIndex: 'nik', flex: 0.5, menuDisabled: true,
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
                                
                                var nama    = me.columns[2].getEditor(me.recordSelected);
                                var jabatan = me.columns[3].getEditor(me.recordSelected);
                                var nilai   = me.columns[5].getEditor(me.recordSelected);
                                
                                nama.setValue(record[0].data['nama']);
                                jabatan.setValue(record[0].data['jabatan']);
                                nilai.setValue(record[0].data['nilai']);
                                
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
                {sortable: false, text: 'Jabatan', dataIndex: 'jabatan', align: 'left', width: 120, menuDisabled: true,
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
                {sortable: false, text: 'Tanggal', dataIndex: 'tanggal', align: 'center', width: 120, menuDisabled: true,
                    editor: {
                        xtype: 'datefield',
                        fieldStyle: 'text-align: center;',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
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
                    }
                },
                
                //--- [5]
                {sortable: false, text: 'Upah', dataIndex: 'nilai', align: 'right', width: 120, menuDisabled: true,
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
                {sortable: false, text: 'Masuk', dataIndex: 'masuk', align: 'left', width: 120, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['nama'],
                            data:[{nama: '0.5 HARI'}, {nama: '1 HARI'}]
                        }),
                        valueField: 'nama',
                        displayField: 'nama',
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                var value = record[0].data['nama'];
                                var qty =  me.columns[7].getEditor(me.recordSelected);
                                qty.setValue(value=='0.5 HARI'?'0.5':(value=='1 HARI'?'1':'0'));
                                me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                if (e.getKey() == e.TAB) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [7]
                {sortable: false, text: 'Qty', dataIndex: 'qty', align: 'right', width: 100, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: right;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[8].getEditor(me.recordSelected).focus(true, 10);
                                }
                                
                                if (e.getKey() == e.TAB) {
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
                
                //--- [8]
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
                                        url: 'api/store/lemburph/save.php',
                                        method: 'POST',
                                        params:{
                                            id: me.recordSelected.get('id'),
                                            periode: me.up('window').down('#periode').getSubmitValue(),
                                            nik: me.columns[1].getEditor(me.recordSelected).getSubmitValue(),
                                            tanggal: me.columns[4].getEditor(me.recordSelected).getSubmitValue(),
                                            kategori: me.columns[3].getEditor(me.recordSelected).getSubmitValue(),
                                            nilai: me.columns[5].getEditor(me.recordSelected).getSubmitValue(),
                                            pengambilan: me.columns[6].getEditor(me.recordSelected).getSubmitValue(),
                                            qty: me.columns[7].getEditor(me.recordSelected).getSubmitValue(),
                                            jumlah: me.columns[8].getEditor(me.recordSelected).getSubmitValue()
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
                                                        me.columns[1].getEditor(me.recordSelected).focus(true, 10);
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
                                                    me.columns[1].getEditor(me.recordSelected).focus(true, 10);
                                                }
                                            });
                                        }
                                    });
                                    
                                }
                                if (e.getKey() == e.TAB) {
                                    me.columns[7].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    },
                    renderer: decimalRender
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
            Ext.Ajax.request({
                url: 'api/store/lemburph/delete.php',
                method: 'POST',
                params:{
                    id: selection.get('id')                    
                },
                success:function(response, opt) {
                    var json = Ext.JSON.decode(response.responseText);
                    if(json['success']) {
                        grid.store.remove(selection);
                        
                        var tambah = grid.up('window').down('#tambah');
                        //var edit   = grid.up('window').down('#edit');
                        //var hapus  = grid.up('window').down('#hapus');
                        var cetak  = grid.up('window').down('#cetak');

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
            jabatan: '',
            tanggal: new Date(),
            nilai: 0,
            masuk: '1 HARI',
            qty: 1,
            jumlah: 0
        });
            
        grid.rowEditor.startEdit(rowGridCount, 1);
        grid.columns[1].getEditor(grid.getStore().getAt(rowGridCount)).focus(true, 10);
    },
    
    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            var nilai = me.columns[5].getEditor(me.recordSelected).getSubmitValue();
            var qty   = me.columns[7].getEditor(me.recordSelected).getSubmitValue();
            
            me.columns[8].getEditor(me.recordSelected).setValue(
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
        Ext.Ajax.request({
            method:'POST',
            url: 'api/store/lemburph/dataStore.php',
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