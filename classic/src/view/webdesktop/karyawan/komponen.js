Ext.define('Admin.view.webdesktop.karyawan.komponen', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.karyawankomponen',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
    
    constructor: function(c) {
        var me = this;
        
        var komponen_array = [
            "gaji_pokok", 
            "tunjangan_jabatan", 
            "tunjangan_operasional", 
            "tunjangan_kewilayahan", 
            "tunjangan_perumahan", 
            "tunjangan_shift", 
            "uang_meal",
            "uang_kehadiran",
            "uang_lembur",
            "uang_extra_food",
            "uang_makan", 
            "uang_transport", 
            "uang_makan_transport"
        ];
        
        var goto_cell = undefined;
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var namaKaryawanRender = function(value, p, record) {
            var display = record.data["nik"]+'  '+record.data["nama"];
            
            return display;
        };
        
        var namaAreaRender = function(value, p, record) {
            var display = record.data["kode_area"]+'  '+record.data["nama_area"];
            
            return display;
        };
        
        var thpRender = function(value, p, record) {
            var thp = record.data["gaji_pokok"]+
                      record.data["tunjangan_jabatan"]+
                      record.data["tunjangan_operasional"]+
                      record.data["tunjangan_kewilayahan"]+
                      record.data["tunjangan_perumahan"]+
                      record.data["tunjangan_shift"]+
                      record.data["uang_meal"]+
                      record.data["uang_kehadiran"]+
                      record.data["uang_lembur"]+
                      record.data["uang_extra_food"]+
                      record.data["uang_makan"]+
                      record.data["uang_transport"]+
                      record.data["uang_makan_transport"];
                    
            return me.func.currency(thp);
        };
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'status_pegawai', 'kode_area', 'nama_area',
                {name: 'gaji_pokok', type: 'float'}, 
                {name: 'tunjangan_jabatan', type: 'float'}, 
                {name: 'tunjangan_operasional', type: 'float'}, 
                {name: 'tunjangan_kewilayahan', type: 'float'}, 
                {name: 'tunjangan_perumahan', type: 'float'}, 
                {name: 'tunjangan_shift', type: 'float'}, 
                {name: 'uang_meal', type: 'float'}, 
                {name: 'uang_kehadiran', type: 'float'}, 
                {name: 'uang_lembur', type: 'float'}, 
                {name: 'uang_extra_food', type: 'float'}, 
                {name: 'uang_makan', type: 'float'}, 
                {name: 'uang_transport', type: 'float'}, 
                {name: 'uang_makan_transport', type: 'float'}
            ],
            url: 'api/store/karyawan/komponenStore.php'
        });
        
        Ext.apply(c, {
            
            plugins: [{
                pluginId: 'cellediting',
                ptype: 'cellediting',
                clicksToEdit: 1,
                listeners: {
                    scope: me,
                    beforeEdit: function(f, e) {
                        /*if(!me.allow_edit) {
                            return false;
                        }*/
                        goto_cell=undefined;
                        me.recordSelected = e.record;
                    },

                    edit: function(f, e) {
                        var rec = e.record;
                        
                        //SAVE
                        Ext.Ajax.request({
                            url: 'api/store/karyawan/komponenSave.php',
                            method: 'POST',
                            params:{
                                id_karyawan: rec.get('id'),
                                kolom: komponen_array[e.colIdx],
                                jumlah: (rec.get(komponen_array[e.colIdx])+'').replace(/[\,]/g, '')
                                
                            },
                            success:function(resp,opt) {
                                rec.commit();
                                //me.getView().refresh();
                            },
                            failure:function(resp,opt){

                            }
                        });
                        
                        if(goto_cell!=undefined) {
                            f.startEdit(e.rowIdx, goto_cell);
                        }

                        goto_cell=undefined;
                    }
                }
            }],
            
            columns: [
                
                //--- [0]
                {menuDisabled: true, sortable: false, text: 'Nama Karyawan', width: 300, locked: true, renderer: namaKaryawanRender},
                
                //--- [1]
                {menuDisabled: true, sortable: false, text: 'Area', width: 250, locked: true, renderer: namaAreaRender},
                
                //--- [2]
                {menuDisabled: true, sortable: false, text: 'GP', dataIndex: 'gaji_pokok', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=1;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [3]
                {menuDisabled: true, sortable: false, text: 'T. Jabatan', dataIndex: 'tunjangan_jabatan', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=2;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [4]
                {menuDisabled: true, sortable: false, text: 'T. Oprasional', dataIndex: 'tunjangan_operasional', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=3;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [5]
                {menuDisabled: true, sortable: false, text: 'T. Wilayah', dataIndex: 'tunjangan_kewilayahan', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=4;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [6]
                {menuDisabled: true, sortable: false, text: 'T. Rumah', dataIndex: 'tunjangan_perumahan', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=5;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [7]
                {menuDisabled: true, sortable: false, text: 'T. Shift', dataIndex: 'tunjangan_shift', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=6;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                
                //--- [8]
                {menuDisabled: true, sortable: false, text: 'U. Meal', dataIndex: 'uang_meal', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=7;                                    
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                
                //--- [9]
                {menuDisabled: true, sortable: false, text: 'U. Kehadiran', dataIndex: 'uang_kehadiran', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=8;                                    
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [10]
                {menuDisabled: true, sortable: false, text: 'U. Lembur', dataIndex: 'uang_lembur', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=9;                                    
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [11]
                {menuDisabled: true, sortable: false, text: 'U. Extra Food', dataIndex: 'uang_extra_food', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=10;                                    
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [12]
                {menuDisabled: true, sortable: false, text: 'U. Makan', dataIndex: 'uang_makan', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=11;                                    
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                
                //--- [13]
                {menuDisabled: true, sortable: false, text: 'U. Transport', dataIndex: 'uang_transport', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=12;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [14]
                {menuDisabled: true, sortable: false, text: 'U. Makan & Trans.', dataIndex: 'uang_makan_transport', align: 'right', width: 170,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=13;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [15]
                {menuDisabled: true, sortable: false, text: 'THP', dataIndex: 'uang_makan_transport', align: 'right', width: 120, renderer: thpRender}                
                    
            ],
            
           
            cls: 'custom-grid',
            viewConfig: {
                getRowClass: function(record) {
                    if(record.data['status_pegawai']=='KELUAR') {
                        return 'changed_colour_red';
                    }
                }
            }, 
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    xtype: 'container',
                    width: 100
                }, Ext.create('Admin.view.webdesktop.searchField', {
                    store: me.store,
                    flex: 1
                }), {
                    xtype: 'container',
                    width: 50
                }]
            }],   
        
                   
            bbar: Ext.create('Ext.PagingToolbar', {
                store: me.store,
                displayInfo: true,
                displayMsg: 'Data {0} - {1} dari {2} data',
                emptyMsg: 'Tidak ada data untuk ditampilkan'
            })
        });

        this.callParent(arguments);
    },
    
    loaddetail: function() {
        var me = this;
        me.store.loadPage(1);                        
    },
    
    afterRender: function() {
        this.callParent();

        var me = this;
        me.store.loadPage(1);
    }
});