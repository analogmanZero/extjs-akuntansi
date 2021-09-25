Ext.define('Admin.view.webdesktop.inv.rolltoroll.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.invrolltorolldetail',

    layout: 'fit',

    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

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
                    me.current_id_stok_masuk = "";
                    
                    var tambah = me.up('window').down('#tambah');
                    var simpan = me.up('window').down('#simpan');
                    var tabAktual = me.up('window').down('#tabdetail').items.getAt(1);
                    var tabWasted = me.up('window').down('#tabdetail').items.getAt(2);
                    
                    setTimeout(function() {
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);
                        tabAktual.setDisabled(false);
                        tabWasted.setDisabled(false);
                    }, 100);
                },

                beforeedit: function(f, e) {
                    if(me.saved) return false;

                    f.hideButtons();
                    me.recordSelected   = e.record;
                    me.validateEdit     = false;
                    
                    me.current_id_stok_masuk = e.record.data['id_stok_masuk'];
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    var simpan = me.up('window').down('#simpan');
                    var tabAktual = me.up('window').down('#tabdetail').items.getAt(1);
                    var tabWasted = me.up('window').down('#tabdetail').items.getAt(2);
                    setTimeout(function() {
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                        simpan.setDisabled(true);
                        tabAktual.setDisabled(true);
                        tabWasted.setDisabled(true);
                        var noroll = me.columns[1].getEditor(e.record);
                        var store_noroll = noroll.getStore();
                        store_noroll.removeAll();
                        store_noroll.load({params: {idInventori: me.kode_barang}});
                         
                        var satuan       = me.columns[5].getEditor(e.record);
                        var store_satuan = satuan.getStore();
                        store_satuan.removeAll();
                        store_satuan.loadRawData(me.satuan_barang);
                        satuan.setValue(me.default_satuan);                        
                    }, 100);
                },

                afteredit: function(f, e) {
                    e.record.set('id_stok_masuk', me.current_id_stok_masuk);
                    e.record.set('kode_barang', me.kode_barang);
                    e.record.set('nama_barang', me.nama_barang);
                    e.record.commit();
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    me.current_id_stok_masuk = "";
                    var row = me.getStore().indexOf(e.record);
                    setTimeout(function() {
                       var tambah = me.up('window').down('#tambah');
                        var simpan = me.up('window').down('#simpan');
                        var tabAktual = me.up('window').down('#tabdetail').items.getAt(1);
                        var tabWasted = me.up('window').down('#tabdetail').items.getAt(2);
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);
                        tabAktual.setDisabled(false);
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
                fields: ['id', 'kode_barang', 'nama_barang', 'id_stok_masuk', 'noroll', 'substance',  'size', {name: 'qty', type: 'float'}, 'satuan'],
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
                {sortable: false, text: 'No. Roll', dataIndex: 'noroll', align: 'right', flex: 1.3, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        vtype: 'noroll',
                        selectOnFocus: true,
                        store: Ext.create('Admin.store.stores', {
                            fields: ['id_stok_masuk', 'noroll', 'substance', 'size', 'qty'],
                            url: 'api/store/norollStore.php',
                            autoLoad: true,
                            params: {notrx: c.isEdit, sumber: 'RR'}                            
                        }),
                        valueField: 'noroll',
                        displayField: 'noroll',
                        queryMode: 'local',
                        typeAhead: true,
                        listeners: {
                            select: function(c, records) {
                                var substance = me.columns[2].getEditor(me.recordSelected);
                                var size = me.columns[3].getEditor(me.recordSelected);
                                var qty = me.columns[4].getEditor(me.recordSelected);
                                
                                me.current_id_stok_masuk = records[0].data['id_stok_masuk'];
                                substance.setValue(records[0].data['substance']);
                                size.setValue(records[0].data['size']);
                                qty.setValue(records[0].data['qty']);
                                
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
    
    penjelasanChanges: function(f, rcd) {        
        var grid   = this;
        var record = grid.recordSelected;
        var index  = f.getStore().indexOf(rcd);

        grid.columns[2].getEditor(record).setValue(); //noroll
        var noroll = grid.columns[2].getEditor(record);
        var store_noroll = noroll.getStore();
        store_noroll.removeAll();
        if(index>-1) {
            store_noroll.load({params: {idInventori: f.store.getAt(index).get('id')}});
        } 
        grid.current_id_stok_masuk = ''; 
        
        grid.columns[5].getEditor(record).setValue(0); // qty
        grid.columns[6].getEditor(record).setValue();  //satuan        
                
        var satuan       = grid.columns[6].getEditor(record);
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

        for(var row =0;row<me.store.getCount();row++) {
            var rec = me.store.getAt(row);

            str += (str!=''?'\n':'') +                                  // id  keterangan
                   rec.data['id'] + '\t' +                              //  0  id
                   rec.data['kode_barang'] + '\t' +                     //  1  kode_barang
                   rec.data['nama_barang'] + '\t' +                     //  2  nama_barang
                   rec.data['noroll'] + '\t' +                          //  3  noroll
                   rec.data['substance'].replace(/[\,]/g, '') + '\t' +  //  4  substance
                   rec.data['size'].replace(/[\,]/g, '') + '\t' +       //  5  size
                   (rec.data['qty']+'').replace(/[\,]/g, '') + '\t' +        //  6  qty
                   rec.data['satuan'] + '\t' +                          //  7  satuan
                   rec.data['id_stok_masuk'];                           //  8  id_stok_masuk
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
    },
    
    loadDetailByOrder: function(noorder) {
        var me = this;
        
        Ext.Ajax.request({
            method:'POST',
            url: 'api/store/suratrolltoroll/loadDetail.php',
            params: {
                noorder: noorder
            },
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                me.getStore().loadRawData(json['details']);
            },
            failure: function() {
                //myMask.hide();
                me.getStore().removeAll();
            }
        });
        
    }
});