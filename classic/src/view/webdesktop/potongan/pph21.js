Ext.define('Admin.view.webdesktop.potongan.pph21', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.potonganpph21',

    layout: 'fit',

    subtotal: 0,
    totalpajak: 0,
    
    constructor: function(c) {
        var me = this;
        
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var namaKaryawanRender = function(value, p, record) {
            var display = record.data["nik"]+'  '+record.data["nama"];
            
            return display;
        };
        
        
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'status_pegawai', 'npwp', 'kode',
                {name: 'gaji_sebulan', type: 'float'}, 
                {name: 'gaji_setahun', type: 'float'}, 
                {name: 'biaya_jabatan', type: 'float'}, 
                {name: 'penghasilan', type: 'float'}, 
                {name: 'penghasilan_tidak_kena_pajak', type: 'float'}, 
                {name: 'penghasilan_kena_pajak', type: 'float'}, 
                {name: 'pph_terhutang', type: 'float'}, 
                {name: 'pph', type: 'float'}
                
            ],
            url: 'api/store/potongan/pph21Store.php'
        });
        
        Ext.apply(c, {
            
            columns: [
                
                //--- [0]
                {menuDisabled: true, sortable: false, text: 'Nama Karyawan', width: 270, locked: true, renderer: namaKaryawanRender},
                
                //--- [1]
                {menuDisabled: true, sortable: false, text: 'NPWP', width: 130, locked: true, dataIndex: 'npwp'},
                
                //--- [2]
                {menuDisabled: true, sortable: false, text: 'Kode', dataIndex: 'kode', align: 'center', locked: true, width: 50},
                
                //--- [3]
                {menuDisabled: true, sortable: false, text: 'Gaji', dataIndex: 'gaji_sebulan', align: 'right', locked: true, width: 120, renderer: decimalRender},
                
                //--- [4]
                {menuDisabled: true, sortable: false, text: 'Gaji 1 Th.', dataIndex: 'gaji_setahun', align: 'right', width: 120, renderer: decimalRender},
                
                //--- [5]
                {menuDisabled: true, sortable: false, text: 'B. Jabatan', dataIndex: 'biaya_jabatan', align: 'right', width: 120, renderer: decimalRender},
                
                //--- [6]
                {menuDisabled: true, sortable: false, text: 'Penghasilan', dataIndex: 'penghasilan', align: 'right', width: 120, renderer: decimalRender},
                
                //--- [7]
                {menuDisabled: true, sortable: false, text: 'PTKP', dataIndex: 'penghasilan_tidak_kena_pajak', align: 'right', width: 120, renderer: decimalRender},
                
                //--- [8]
                {menuDisabled: true, sortable: false, text: 'PKP', dataIndex: 'penghasilan_kena_pajak', align: 'right', width: 120, renderer: decimalRender},
               
                //--- [9]
                {menuDisabled: true, sortable: false, text: 'PPH 1 Th.', dataIndex: 'pph_terhutang', align: 'right', width: 120, renderer: decimalRender},
                
                //--- [10]
                {menuDisabled: true, sortable: false, text: 'PPH',  dataIndex: 'pph', align: 'right', width: 120, renderer: decimalRender}
            
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