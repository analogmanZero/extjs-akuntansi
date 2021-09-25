Ext.define('Admin.view.webdesktop.karyawan.orangtua_wali', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.karyawanorangtuawali',

    layout: 'fit',
        
    constructor: function(c) {
        var me = this;
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
        me.bbar = [{
            itemId: 'tambah',
            text:'Baru',
            tooltip:'Tambah data baru',
            iconCls:'add',
            action: 'tambah'
        }, {
            itemId: 'edit',
            text:'Edit',
            tooltip:'Edit data yang dipilh',
            iconCls:'edit',
            disabled: true,
            action: 'edit'
        }, {
            itemId: 'hapus',
            text:'Hapus',
            tooltip:'Hapus data yang dipilih',
            iconCls:'remove',
            disabled: true,
            action: 'hapus'
        }];  
    
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
                    
                    var tambah = me.down('#tambah');
                    setTimeout(function() {
                        tambah.setDisabled(false);
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
                    
                    setTimeout(function() {
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                    }, 100);
                },

                afteredit: function(f, e) {
                    var tanggal_lahir = me.columns[4].getEditor(e.record);
                    var tgl_lahir = tanggal_lahir.getSubmitValue();
                    var temp_ = tgl_lahir.split("-");
                    
                    e.record.set('tgl_lahir', tgl_lahir);
                    e.record.set('tanggal_lahir', temp_[2]+'-'+temp_[1]+'-'+temp_[0]);
                    e.record.commit();
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var row = me.getStore().indexOf(e.record);
                    var tambah = me.down('#tambah');
                    setTimeout(function() {
                        tambah.setDisabled(false);
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
            store: Ext.create('Admin.store.stores', {
                fields: ['id', 'nama', 'hub_keluarga', 'pekerjaan', 'tgl_lahir', 'tanggal_lahir', 'status', 'alamat'],
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
                {sortable: false, text: 'Nama Orang Tua / Wali', dataIndex: 'nama', align: 'left', flex: 1, menuDisabled: true,
                    editor: {
                    xtype: 'textfield',
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
                {sortable: false, text: 'Hub. Kel.', dataIndex: 'hub_keluarga', align: 'left', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['nama'],
                            data:[{nama: 'Ayah'}, {nama: 'Ibu'}]
                        }),
                        valueField: 'nama',
                        displayField: 'nama',
                        typeAhead: true,
                        
                        autoSelect: false,
                        selectOnFocus: true,
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [3]
                {sortable: false, text: 'Pekerjaan', dataIndex: 'pekerjaan', align: 'left', flex: 0.5, menuDisabled: true, 
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
                {sortable: false, text: 'Tgl. Lahir', dataIndex: 'tanggal_lahir', align: 'center', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
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
                {sortable: false, text: 'Status', dataIndex: 'status', align: 'left', flex: 0.4, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['nama'],
                            data:[{nama: 'Ada'}, {nama: 'Alm.'}]
                        }),
                        valueField: 'nama',
                        displayField: 'nama',
                        typeAhead: true,
                        
                        autoSelect: false,
                        selectOnFocus: true,
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[6].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [6]
                {sortable: false, text: 'Alamat', dataIndex: 'alamat', align: 'left', flex: 1.2, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
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
                    var tambah = me.down('#tambah');
                    var edit = me.down('#edit');
                    var hapus = me.down('#hapus');
                    
                    var getValue = tambah.disabled || !records.length;
                    edit.setDisabled(getValue);
                    hapus.setDisabled(getValue);
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
            nama: '',
            hub_keluarga: '',
            pekerjaan: '',
            tgl_lahir: '',
            tanggal_lahir: '',
            status: 'Ada',
            alamat: ''
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
                   rec.data['nama'] + '\t' +                                //  1  nama
                   rec.data['hub_keluarga'] + '\t' +                        //  2  hub_keluarga
                   rec.data['pekerjaan'] + '\t' +                           //  3  pekerjaan
                   rec.data['tgl_lahir'] + '\t' +                           //  4  tgl_lahir
                   rec.data['status'] + '\t' +                              //  5  status
                   rec.data['alamat'];                                      //  6  alamat
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