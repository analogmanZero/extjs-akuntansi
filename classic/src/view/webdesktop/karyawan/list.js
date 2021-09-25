Ext.define('Admin.view.webdesktop.karyawan.list', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.karyawanlist',
    modulId: 'KY',
    
    layout: 'fit',
    border: false,

    title: 'Karyawan',

    width: 1000,
    height: 500,
    
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var renderNo = function(value, p, record) {
            var store = me.down('plgrid').getStore();
            var page = store.currentPage;
            var index = store.indexOf(record);
            var limit = store.pageSize;

            return ((page-1)*limit)+index+1;
        };

        
        var hidden = []; 
        var grup_akses = c.grupAkses;
        for(var key in grup_akses) {
            hidden[grup_akses[key]['itemId']] = grup_akses[key]['fiturAkses']==null || grup_akses[key]['fiturAkses'].indexOf('Y')==-1;
        }

        me.items = [{
            xtype: 'tabpanel',
            items: [{
                xtype: 'plgrid',
                //itemId: 'listkaryawan',
                hidden: hidden['KY'],
                title: 'Data Karyawan',
                flex: 1,
                store: Ext.create('Admin.store.stores', {
                    fields: ['id', 'nik', 'nama', 'status_pegawai', 'jabatan', 'departemen', 'area', 'lokasi'],
                    url: 'api/store/karyawan/dataStore.php'
                }),
                columns: [
                    {text: 'No.', width: 50, sortable: false, align: 'center', renderer: renderNo},
                    {text: 'NIK', width: 100, sortable: false, align: 'center', dataIndex: 'nik'},
                    {text: 'Nama', width: 250, sortable: false, align: 'left', dataIndex: 'nama'},
                    {text: 'Status', width: 100, sortable: false, align: 'center', dataIndex: 'status_pegawai'},
                    {text: 'Jabatan', width: 120, sortable: false, align: 'left', dataIndex: 'jabatan'},
                    {text: 'Area', width: 100, sortable: false, align: 'center', dataIndex: 'departemen'},
                    {text: 'Divisi/Project',  width: 270, sortable: false, align: 'left', dataIndex: 'area'},
                    {text: 'Lokasi Kerja',  width: 270, sortable: false, align: 'left', dataIndex: 'lokasi'}
                ],
                cls: 'custom-grid',
                viewConfig: {
                    getRowClass: function(record) {
                        if(record.data['status_pegawai']=='KELUAR') {
                            return 'changed_colour_red';
                        }
                    }
                },
                idProp: 'id'
            }, {
                xtype: 'karyawankomponen',
                hidden: hidden['KG'],
                title: 'Komponen Gaji'
            }, {
                xtype: 'karyawanbayargaji',
                hidden: hidden['GG'],
                title: 'Pembayaran Gaji'
            }]
        }];
        
        /*var items = me.items[0].items;
        for(var key in items) {
            console.log(items[key].itemId);
        }*/
        
        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();
        var me = this;
        
        me.down('#printButton').setVisible(true);
        var store = me.down('plgrid').getStore();
        store.loadPage(1);
    }

});