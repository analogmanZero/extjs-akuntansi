Ext.define('Admin.view.webdesktop.potongan.bpjs', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.potonganbpjs',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
    
    constructor: function(c) {
        var me = this;
        
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
        
        var totalPotonganRender = function(value, p, record) {
            var potongan = Math.ceil((record.data["potongan_bpjs"]*0.01)*record.data["nilai"]);
                    
            return me.func.currency(potongan);
        };
        
        var totalKekuranganRender = function(value, p, record) {
            var persen   = record.data["potongan_bpjs"]*0.01;
            var potongan = Math.ceil(persen*record.data["nilai"]);
            var original = Math.ceil(persen*(record.data["nilai"]<record.data["umr"]?record.data["umr"]:record.data["nilai"]));
            
            return me.func.currency(original-potongan);
        };
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'status_pegawai', 'kode_area', 'nama_area',
                {name: 'nilai', type: 'float'}, 
                {name: 'umr', type: 'float'}, 
                {name: 'potongan_bpjs', type: 'float'}
            ],
            url: 'api/store/potongan/bpjsStore.php'
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
                        
                        var persen   = rec.data["potongan_bpjs"]*0.01;
                        var potongan = Math.ceil(persen*rec.data["nilai"]);
                        var original = Math.ceil(persen*(rec.data["nilai"]<rec.data["umr"]?rec.data["umr"]:rec.data["nilai"]));
                        
                        //SAVE
                        Ext.Ajax.request({
                            url: 'api/store/potongan/bpjsSave.php',
                            method: 'POST',
                            params:{
                                id_karyawan: rec.get('id'),
                                umr: rec.get('umr'), 
                                manual: rec.get('nilai'),
                                potongan_bpjs: rec.get('potongan_bpjs'),
                                total_potongan: potongan,
                                total_kekurangan: (original-potongan)
                                
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
                {menuDisabled: true, sortable: false, text: 'Nama Karyawan', width: 300, renderer: namaKaryawanRender},
                
                //--- [1]
                {menuDisabled: true, sortable: false, text: 'Area', width: 250, renderer: namaAreaRender},
                
                //--- [2]
                {menuDisabled: true, sortable: false, text: 'UMR', dataIndex: 'umr', align: 'right', width: 120, 
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
                    }, renderer: decimalRender},
                
                //--- [3]
                {menuDisabled: true, sortable: false, text: 'Upah Tetap', dataIndex: 'nilai', align: 'right', width: 120, 
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
                {menuDisabled: true, sortable: false, text: 'BPJS (%)', dataIndex: 'potongan_bpjs', align: 'right', width: 120,
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    //goto_cell=1;
                                }
                            }
                        }
                    },
                    renderer: decimalRender
                },
                
                //--- [5]
                {menuDisabled: true, sortable: false, text: 'Potongan', renderer: totalPotonganRender, align: 'right', width: 200},
                
                //--- [6]
                {menuDisabled: true, sortable: false, text: 'Kekurangan', renderer: totalKekuranganRender, align: 'right', width: 200}
            
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