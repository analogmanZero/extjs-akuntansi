Ext.define('Admin.view.webdesktop.transaksikasdanbank.list', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.transaksikasdanbanklist',
    modulId: 'BKB',
    
    layout: 'fit',
    border: false,

    title: 'Bukti Kas & Bank',

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

        var renderTopic = function(value, p, record) {
            return '<div style="white-space:normal !important;">'+ value +'</div>';
        };

        me.tbar = [{
            xtype: 'datefield',
            name: 'from',
            fieldLabel: 'Tanggal',
            labelWidth: 55,
            width: 170,
            value: new Date(),
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            listeners: {
                change: function(d) {
                    var me = d.up('panel');
                    var store = me.down('plgrid').getStore(),
                        proxy = store.getProxy();

                    proxy.extraParams['from'] = d.getSubmitValue();
                    store.loadPage(1);
                }
            }
        }, {
            xtype: 'datefield',
            name: 'to',
            fieldLabel: 'sd.',
            labelWidth: 30,
            labelSeparator: '&nbsp;',
            labelStyle: 'text-align: center;',
            width: 145,
            value: new Date(),
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            listeners: {
                change: function(d) {
                    var me = d.up('panel');
                    var store = me.down('plgrid').getStore(),
                        proxy = store.getProxy();

                    proxy.extraParams['to'] = d.getSubmitValue();
                    store.loadPage(1);
                }
            }
        }, '->', {
            xtype: 'combobox',
            fieldLabel: 'Jenis Transaksi',
            name: 'jenistransaksi',
            labelWidth: 110,
            width: 300,
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'nama'],
                data:[
                    {id: '', nama: '[Semua]'},
                    {id: 'BKM', nama: 'Bukti Kas Masuk (BKM)'},
                    {id: 'BKK', nama: 'Bukti Kas Keluar (BKK)'},
                    {id: 'BBM', nama: 'Bukti Bank Masuk (BBM)'},
                    {id: 'BBK', nama: 'Bukti Bank Keluar (BBK)'}
                ]
            }),
            value: '',
            valueField: 'id',
            displayField: 'nama',
            listeners: {
                scope: me,
                select: function(cmb) {
                    var me = cmb.up('panel');
                    var store = me.down('plgrid').getStore(),
                        proxy = store.getProxy();

                    proxy.extraParams['tipe'] = cmb.getSubmitValue();
                    store.loadPage(1);
                }
            }       
        }];

        me.items = [{
            xtype: 'plgrid',
            
            store: Ext.create('Admin.store.stores', {
                fields: ['nobukti', 'tanggal', 'subyek', 'keterangan',  'jenistransaksi', 'jumlah'],
                url: 'api/store/transaksikas/dataStore.php'
            }),
            columns: [
                {text: 'No.', flex: 0.2, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo},
                {text: 'No. Bukti', flex: 0.5, sortable: true, dataIndex: 'nobukti', align: 'left'},
                {text: 'Tanggal', flex: 0.5, sortable: true, align: 'center', dataIndex: 'tanggal'},
                {text: 'Subyek', flex: 0.8, sortable: true, dataIndex: 'subyek', renderer: renderTopic},
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