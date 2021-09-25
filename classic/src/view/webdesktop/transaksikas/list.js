Ext.define('Admin.view.webdesktop.transaksikas.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.transaksikaslist',

    layout: 'border',
    title: 'Buku Kas',
    modulId: 'BK',
	
    width: 900,
    height: 600,

	
    initComponent: function() {
        var me = this;
        var renderNo = function(value, p, record) {
            var store = me.down('plgrid').getStore();
            var page = store.currentPage;
            var index = store.indexOf(record);
            var limit = store.pageSize;

            return ((page-1)*limit)+index+1;
        };

        var fcurrency = new Admin.view.currency();
        var renderDecimal = function(value, p, record) {
            return fcurrency.currency(value);
        };

        var renderTopic = function(value, p, record) {
            return '<div style="white-space:normal !important;">'+ value +'</div>';
        };
        
        this.items = [{
            xtype: 'container',
            height: 39,
            region: 'north',
            layout: 'border',
            items:[{
                xtype: 'container',
                region: 'south',
                height: 5
            }, {
                xtype: 'panel',
                region: 'center',
                bodyPadding: 5,
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    width: 50
                }, {
                    xtype: 'checkbox',
                    width: 200,
                    boxLabel: 'Buku Kas Masuk',
                    checked: true,
                    inputValue: 'Y',
                    name: 'debet',
                    listeners: {
                        change: function() {
                            me.loadData();
                        }
                    }
                }, {
                    xtype: 'checkbox',
                    width: 200,
                    boxLabel: 'Buku Kas Keluar',
                    checked: true,
                    inputValue: 'Y',
                    name: 'kredit',
                    listeners: {
                        change: function() {
                            me.loadData();
                        }
                    }
                },{
                    xtype: 'container',
                    flex: 1
                }, {
                    xtype: 'displayfield',
                    fieldStyle: 'text-align: right;',
                    value: 'Tanggal:&nbsp;&nbsp;&nbsp;'
                }, {
                    xtype: 'datefield',
                    name: 'from',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    fieldStyle: 'text-align: right;',
                    width: 100,
                    listeners: {
                        change: function() {
                            me.loadData();
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    width: 40,
                    fieldStyle: 'text-align: center;',
                    value: '&nbsp;s/d&nbsp;',
                }, {
                    xtype: 'datefield',
                    name: 'to',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    value: new Date(),
                    fieldStyle: 'text-align: right;',
                    width: 100,
                    listeners: {
                        change: function() {
                            me.loadData();
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 5
                }]
            }]
        }, {
            xtype: 'plgrid',
            region: 'center',
            store: Ext.create('Admin.store.stores', {
                fields: ['id', 'kode_akun', 'nama_akun', 'tgl', 'program', 'uraian', 'nobukti', 'debet', 'kredit', 'subyek', 'jumlah_subyek', 'volume', 'satuan', 'jumlah_a', 'isAparatur'],
                url: 'api/store/transaksikas/dataStore.php'
            }),
            features: [{
                ftype: 'summary',
                dock: 'bottom',
                layout:'fit'
            }],
            columns: [
                {text: 'No.', width: 40, locked: true, sortable: false, renderer: renderNo, align: 'center'},
                {text: 'Kode', width: 90,  locked: true, sortable: true, dataIndex: 'kode_akun'},
                {text: 'Nama', width: 210, locked: true, sortable: true, dataIndex: 'nama_akun'},
                {text: 'Tanggal', width: 95, locked: true, sortable: true, dataIndex: 'tgl', align: 'center'},
                {text: 'Uraian', width: 220, sortable: true, dataIndex: 'uraian', align: 'left', renderer: renderTopic},
                {text: 'No. Bukti', width: 100, sortable: true, dataIndex: 'nobukti', align: 'left'},
                {text: 'Debet', width: 110, sortable: true, dataIndex: 'debet', align: 'right', renderer: renderDecimal,
                    summaryRenderer: function() {
                        var json = me.down('plgrid').getStore().getProxy().reader.jsonData;
                        if(!json) return '<B>0</B>';

                        var total = json.sum_debet;
                        if(!total) return '<B>0</B>';

                        return '<B>'+fcurrency.currency(total)+'</B>';;
                    }
                },
                {text: 'Kredit', width: 110, sortable: true, dataIndex: 'kredit', align: 'right', renderer: renderDecimal,
                    summaryRenderer: function() {
                        var json = me.down('plgrid').getStore().getProxy().reader.jsonData;
                        if(!json) return '<B>0</B>';

                        var total = json.sum_kredit;
                        if(!total) return '<B>0</B>';

                        return '<B>'+fcurrency.currency(total)+'</B>';;
                    }
                },
                {text: 'Subyek', width: 220, sortable: true, dataIndex: 'subyek', align: 'left'},
                {text: 'Jumlah Subyek', width: 100, sortable: true, dataIndex: 'jumlah_subyek', align: 'right', renderer: renderDecimal},
                {text: 'Volume', width: 100, sortable: true, dataIndex: 'volume', align: 'right', renderer: renderDecimal},
                {text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan', align: 'left'},
                {text: 'Jumlah', width: 100, sortable: true, dataIndex: 'jumlah_a', align: 'right', renderer: renderDecimal}
            ],
            idProp: 'id'
        }];;

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        this.loadData();
        
    },

    loadData: function() {
        var from   = this.down('[name=from]').getSubmitValue();
        var to     = this.down('[name=to]').getSubmitValue();
        var debet  = this.down('[name=debet]').getSubmitValue();
        var kredit = this.down('[name=kredit]').getSubmitValue();
        var store  = this.down('plgrid').getStore();
        var proxy  = store.getProxy();

        proxy.extraParams['from']   = from;
        proxy.extraParams['to']     = to;
        proxy.extraParams['debet']  = debet;
        proxy.extraParams['kredit'] = kredit;

        store.loadPage(1);
    }
});