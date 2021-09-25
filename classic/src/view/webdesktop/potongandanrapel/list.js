Ext.define('Admin.view.webdesktop.potongandanrapel.list', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.potongandanrapellist',
    modulId: 'PR',
    
    layout: 'fit',
    border: false,

    title: 'Potongan & Rapel',

    width: 1000,
    height: 500,

    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var renderNo = function(value, p, record) {
            var store = me.down('plgrid').getStore();
            var page = store.currentPage;
            var index = store.indexOf(record);
            var limit = store.pageSize;

            return ((page-1)*limit)+index+1;
        };

        var storeKaryawan = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'area', 'lokasi'],
            url: 'api/store/karyawanStore.php',
            pageSize: 1000000
        });


        me.tbar = [{
            xtype: 'monthfield',
            name: 'periode',
            itemId: 'periode',
            fieldLabel: 'Periode',
            labelStyle: 'text-align: center;',
            labelWidth: 60,
            format: 'm-Y',
            submitFormat: 'Y-m',
            msgTarget: 'side',
            allowBlank: false,
            width: 160,
            readOnly: true,
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
                    me.up('window').down('transaksipotonganabsendetail').loadDataStore(me.down('#periode').getSubmitValue());
                }
            }
        }];

        me.items = [{
            xtype: 'plgrid',
            
            store: Ext.create('Admin.store.stores', {
                fields: ['nobukti', 'tanggal', 'subyek', 'keterangan',  'jenistransaksi', 'jumlah'],
                url: 'api/store/potongandanrapel/dataStore.php'
            }),
            columns: [
                {text: 'No.', flex: 0.2, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo},
                {text: 'No. Bukti', flex: 0.5, sortable: true, dataIndex: 'nobukti', align: 'center'},
                {text: 'Tanggal', flex: 0.5, sortable: true, align: 'center', dataIndex: 'tanggal'},
                {text: 'Dari', flex: 0.8, sortable: true, dataIndex: 'subyek', renderer: renderTopic},
                {text: 'Keterangan', flex: 1, sortable: true, dataIndex: 'keterangan', renderer: renderTopic},
                {text: 'Jenis', flex: 0.3, sortable: true, align: 'center', dataIndex: 'jenistransaksi'},
                {text: 'Total', flex: 0.5, sortable: true, dataIndex: 'jumlah', align: 'right', renderer: decimalRender}
            ],
            idProp: 'nobukti'
        }];
        
        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        var store = me.down('plgrid').getStore();

        store.getProxy().extraParams['from']   = me.down('[name=from]').getSubmitValue();
        store.getProxy().extraParams['to']     = me.down('[name=to]').getSubmitValue();

        store.loadPage(1);
    }

});