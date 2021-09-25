Ext.define('Admin.view.webdesktop.payroll.default', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.payrolldefault',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
    
    constructor: function(c) {
        var me = this;
        
        var komponen_array = ["gaji_pokok", "tunjangan_jabatan", "tunjangan_operasional", "tunjangan_kewilayahan", "tunjangan_perumahan", 
            "tunjangan_shift", "uang_meal", "uang_kehadiran", "uang_lembur", "uang_extra_food", "uang_makan_transport"];
        
        
        var goto_cell = undefined;
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var namaKaryawanRender = function(value, p, record) {
            var display = record.data["nik"]+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+record.data["nama"];
            
            
            
            return display;
        };
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 
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
                {name: 'uang_makan_transport', type: 'float'}, 
                {name: 'jumlah', type: 'float'}
            ],
            url: 'api/store/payroll/dataStore.php'
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
                        var jumlah = 
                            eval((rec.get('gaji_pokok')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('tunjangan_jabatan')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('tunjangan_operasional')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('tunjangan_kewilayahan')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('tunjangan_perumahan')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('tunjangan_shift')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('uang_meal')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('uang_kehadiran')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('uang_lembur')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('uang_extra_food')+'').replace(/[\,]/g, '')) +
                            eval((rec.get('uang_makan_transport')+'').replace(/[\,]/g, ''));

                        rec.set('jumlah', jumlah);
                        
                        //alert('bulan: '+(e.colIdx+1)+'\n' +
                              //'akunbudget: '+rec.get('id_akun')+'\n' +
                              //'jumlah: '+rec.get(month_array[e.colIdx])+'\n');
                        
                        //SAVE
                        
                        //console.log(komponen_array[e.colIdx]);
                        //console.log(rec.get(komponen_array[e.colIdx]));
                        Ext.Ajax.request({
                            url: 'api/store/payroll/save.php',
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
            
            /*features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],*/
            
            columns: [
                
                //--- [0]
                {menuDisabled: true, sortable: false, text: 'Nama Karyawan', dataIndex: 'nama', width: 300, locked: true, renderer: namaKaryawanRender},
                
                //--- [1]
                {sortable: false, text: 'Jumlah', dataIndex: 'jumlah', width: 150, menuDisabled: true, locked: true, align: 'right',
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
                },
                
                //--- [2]
                {menuDisabled: true, sortable: false, text: 'G. Pokok', dataIndex: 'gaji_pokok', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=1;
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
                },
                
                //--- [4]
                {menuDisabled: true, sortable: false, text: 'T. Ops.', dataIndex: 'tunjangan_operasional', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=3;
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
                },
                
                
                //--- [9]
                {menuDisabled: true, sortable: false, text: 'U. Hadir', dataIndex: 'uang_kehadiran', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    goto_cell=8;
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
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
                                    
                                    /*var store = me.getStore();
                                    var row = store.indexOf(me.recordSelected);
                                    var cellEditing =  me.getPlugin('cellediting');
                                    cellEditing.startEdit(row, 3);*/
                                }
                            }
                        }
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
                },
                
                //--- [12]
                {menuDisabled: true, sortable: false, text: 'U. Trans.', dataIndex: 'uang_makan_transport', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;'
                    },
                    renderer: decimalRender/*,
                    summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'*/
                }                
            ],
            
            
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
    
    
    getJumlah: function() {
        var me     = this;
        setTimeout(function() {
            var record = me.recordSelected;
            
            var jumlah = 0;
            for(var i=3; i<=14; i++) {
                jumlah+=me.columns[i].getEditor(record).getSubmitValue();
            }
            
            me.columns[2].getEditor(record).setValue(jumlah);
        }, 10);                                    
    },
    
    getTotal: function() {
        var me = this;
        
        var total = 0;
        for(var row=0;row<me.store.getCount(); row++) {
            var rec = me.getStore().getAt(row);                        
            total+=eval(rec.data['jumlah'].replace(/[\,]/g, ''));
        }
        
        var e_grandtotal = me.up('window').down('#grandtotal');        
        e_grandtotal.setValue(total); 
    },
    
    getDetail: function() {
        var me = this;
        var str = '';

        for(var row =0;row<me.getStore().getCount();row++) {
            var rec = me.getStore().getAt(row);

            str += (str!=''?'\n':'') +                          // id  keterangan
                rec.data['id'] + '\t' +                                     //   0  id_karyawan
                rec.data['gaji_pokok'].replace(/[\,]/g, '') + '\t' +   //   1  nov
                rec.data['tunjangan_jabatan'].replace(/[\,]/g, '') + '\t' +   //   2  des
                rec.data['tunjangan_operasional'].replace(/[\,]/g, '') + '\t' +   //   3  jan
                rec.data['tunjangan_kewilayahan'].replace(/[\,]/g, '') + '\t' +   //   4  feb
                rec.data['tunjangan_perumahan'].replace(/[\,]/g, '') + '\t' +   //   5  mar
                rec.data['tunjangan_shift'].replace(/[\,]/g, '') + '\t' +   //   6  apr
                rec.data['uang_meal'].replace(/[\,]/g, '') + '\t' +   //   7  mei
                rec.data['uang_kehadiran'].replace(/[\,]/g, '') + '\t' +   //   8  jun
                rec.data['uang_lembur'].replace(/[\,]/g, '') + '\t' +   //   9  jul
                rec.data['uang_extra_food'].replace(/[\,]/g, '') + '\t' +   //  10  agu
                rec.data['uang_makan_transport'].replace(/[\,]/g, '') + '\t' +   //  11  sep                   
                rec.data['jumlah'].replace(/[\,]/g, '');        //  13  jumlah
       }

        //console.log(str + '\n\n\n\n');
        return str;
    },
    
    loaddetail: function() {
        var me = this;
        //var divisi = me.up('window').down('#divisi').getSubmitValue();
        //var jenisanggaran = me.up('window').down('#jenisanggaran').getSubmitValue();
        //var proyek = me.up('window').down('#proyek').getSubmitValue();
        //var tahun = me.up('window').down('#tahun').getSubmitValue();
        
        var store = me.store;
        //var proxy = store.getProxy();
        //proxy.extraParams['divisi'] = divisi;
        //proxy.extraParams['jenisanggaran'] = jenisanggaran;
        //proxy.extraParams['proyek'] = proyek;
        //proxy.extraParams['tahun'] = tahun;
        
        store.loadPage(1);                        
    }
    
});