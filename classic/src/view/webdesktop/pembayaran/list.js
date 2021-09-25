Ext.define('Admin.view.webdesktop.pembayaran.list', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.pembayaranlist',
    modulId: 'BY',
    
    layout: 'fit',
    border: false,

    title: 'Bukti Pembayaran Kas & Bank',

    width: 1000,
    height: 500,

    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var renderDraft = function(value, p, record) {
            return value=='Y'?'<B>DRAFT</B>':'';
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
        }, {
            xtype: 'fieldcontainer',
            flex: 1
        }, {
            xtype: 'combobox',
            fieldLabel: 'Jenis Transaksi',
            name: 'jenistransaksi',
            labelWidth: 110,
            width: 300,
            store: Ext.create('Ext.data.Store', {
                fields: ['id', 'nama'],
                data:[
                    {id: '', nama: '[Semua]'},
                    {id: 'BKK', nama: 'Bukti Kas Keluar (BKK)'},
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
        }, {
            xtype: 'fieldcontainer',
            flex: 1
        }, {
            xtype     :'checkbox',
            boxLabel  : '<B>DRAFT</B>',
            name      : 'draft',
            itemId    : 'draft',
            inputValue: 'Y',
            listeners: {
                scope: me,
                change: function(chkbox) {
                    var me = chkbox.up('panel');
                    var store = me.down('plgrid').getStore(),
                        proxy = store.getProxy();

                    proxy.extraParams['draft'] = chkbox.getSubmitValue();
                    store.loadPage(1);
                }
            }
        },  {
            xtype: 'fieldcontainer',
            flex: 1
        }];

        me.items = [{
            xtype: 'plgrid',
            
            store: Ext.create('Admin.store.stores', {
                fields: ['id', 'nobukti', 'tanggal', 'subyek', 'keterangan', 'jenistransaksi', 'jumlah', 'draft'],
                url: 'api/store/pembayaran/dataStore.php'
            }),
            columns: [
                {text: 'No.', flex: 0.2, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo},
                {text: 'No. Bukti', flex: 0.5, sortable: true, dataIndex: 'nobukti', align: 'left',
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        return ' <B>Total:</B>';
                }},
                {text: 'Tanggal', flex: 0.5, sortable: true, align: 'center', dataIndex: 'tanggal'},
                {text: 'Divisi', flex: 0.8, sortable: true, dataIndex: 'subyek', renderer: renderTopic},
                {text: 'Keterangan', flex: 1, sortable: true, dataIndex: 'keterangan', renderer: renderTopic},
                {text: 'Jenis', flex: 0.3, sortable: true, align: 'center', dataIndex: 'jenistransaksi'},
                {text: 'Total', flex: 0.5, sortable: true, dataIndex: 'jumlah', align: 'right', renderer: decimalRender,
                    summaryRenderer: function(value, summaryData, dataIndex) {
                        var store = me.down('plgrid').getStore();
                        var json = store.getProxy().reader.jsonData;
                        return ' <B>'+me.func.currency(json['totalTrx'])+'</B>';
                }},
                {text: 'DRAFT', flex: 0.3, sortable: true, renderer: renderDraft, dataIndex: 'draft', align: 'center'}
            ],
            idProp: 'id'
        }];
        
        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        var store = me.down('plgrid').getStore();

        store.getProxy().extraParams['from']        = me.down('[name=from]').getSubmitValue();
        store.getProxy().extraParams['to']          = me.down('[name=to]').getSubmitValue();
        store.getProxy().extraParams['draft']       = me.down('[name=draft]').getSubmitValue();

        store.loadPage(1);
    }

});