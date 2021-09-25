Ext.define('Admin.view.webdesktop.karyawan.pendidikan_formal', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.karyawanpendidikanformal',

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
                fields: ['id', 'jenjang', 'nama', 'jurusan', 'tahun_keluar', 'ijasah'],
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
                {sortable: false, text: 'Jenjang', dataIndex: 'jenjang', align: 'left', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['nama'],
                            data:[{nama: 'SD'}, {nama: 'SMP'}, {nama: 'SMA'}, {nama: 'D3'}, {nama: 'S1'}, {nama: 'S2'}, {nama: 'S3'}]
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
                
                //--- [2]
                {sortable: false, text: 'Nama Sekolah', dataIndex: 'nama', align: 'left', flex: 1, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
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
                {sortable: false, text: 'Jurusan', dataIndex: 'jurusan', align: 'left', flex: 0.5, menuDisabled: true, 
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
                {sortable: false, text: 'Tahun Keluar', dataIndex: 'tahun_keluar', align: 'center', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.TAB) {
                                    me.columns[5].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [5]
                {sortable: false, text: 'Ijasah', dataIndex: 'ijasah', align: 'center', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'combobox',
                        msgTarget: 'side',
                        queryMode: 'local',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['nama'],
                            data:[{nama: 'Lulus'}, {nama: 'Tidak Lulus'}]
                        }),
                        valueField: 'nama',
                        displayField: 'nama',
                        typeAhead: true,
                        
                        autoSelect: false,
                        selectOnFocus: true,
                        listeners: {
                            scope: me,
                            select: function(combo, record) {
                                me.validateEdit = (e.getKey() == e.ENTER);
                                me.columns[4].getEditor(me.recordSelected).focus(true, 10);
                            },    
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.validateEdit = (e.getKey() == e.ENTER);
                                    me.columns[4].getEditor(me.recordSelected).focus(true, 10);
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
            jenjang: '',
            nama: '',
            jurusan: '',
            tahun_keluar: '',
            ijasah: ''
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
                   rec.data['jenjang'] + '\t' +                             //  1  jenjang
                   rec.data['nama'] + '\t' +                                //  2  nama
                   rec.data['jurusan'] + '\t' +                             //  3  jurusan
                   rec.data['tahun_keluar'] + '\t' +                        //  4  tahun_keluar
                   rec.data['ijasah'];                                      //  5  ijasah
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