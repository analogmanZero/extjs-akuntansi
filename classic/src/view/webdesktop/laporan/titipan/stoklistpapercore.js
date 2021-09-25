Ext.define('Admin.view.webdesktop.laporan.titipan.stoklistpapercore', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.laporantitipanstoklistpapercore',

    border: false,
    layout: 'fit',
    
    constructor: function(c) {
        var me = this;
        var cur_func = new Admin.view.currency();

        var reportFileName = 'titipan/stoklistpapercore.jrxml';

        var rendererNo =  function(value, p, record) {
            var store = me.getStore();
            return ((store.currentPage-1)*store.pageSize)+(store.indexOf(record)+1);
        };

        var rendererDecimal =  function(value, p, record) {
            return cur_func.currency(value);
        };
        
        var summaryRendererWeight = function(value, p, record) {
            var total = me.getStore().getProxy().reader.jsonData.total;            
            return '<B><I>'+cur_func.currency(total)+'</I></B>';
        };
        
        var summaryRendereBall = function(value, p, record) {
            var ball = me.getStore().getProxy().reader.jsonData.ball;            
            return '<B><I>'+cur_func.currency(ball)+'</I></B>';
        };
        
        this.tbar = [{
            xtype: 'datefield',
            name: 'from',
            labelWidth: 90,
            width: 210,
            fieldLabel: 'Tanggal',
            value: new Date(),
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            listeners: {
                change: function(p) {
                    me.loadData();
                }
            }
        }, {
            xtype: 'datefield',
            name: 'to',
            labelWidth: 90,
            width: 210,
            fieldLabel: 'sd.',
            labelStyle: 'text-align: center;',
            labelSeparator: '&nbsp;',
            value: new Date(),
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            listeners: {
                change: function(p) {
                    me.loadData();
                }
            }
        }, '->', {
            xtype: 'container',
            layout: 'fit',
            items:[{
                xtype: 'button',
                text: 'Cetak',
                handler: function(b) {

                    var store = me.getStore(),
                        proxy = store.getProxy(),
                        tag = '';

                    for(var key in proxy.extraParams) {
                        tag+='&'+key+'='+proxy.extraParams[key];
                    }

                    window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
                            'lapstoklistpapercoretitipan', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');                            
                }
            }]
        }];

        var store = Ext.create('Admin.store.stores', {
            fields: ['tanggal', 'kode_barang', 'nama_barang', 'weight', 'satuan', 'nospk', 'customer'],
            url: 'api/store/laporan/titipan/stoklistpapercoreStore.php'
        });

        Ext.apply(c, {
            store: store,
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            columns: [
                {text: 'No.', renderer: rendererNo, width: 55, align: 'center'},
                {text: 'Tanggal', dataIndex: 'tanggal', flex: 0.5, align: 'center'},
                {text: 'Kode', dataIndex: 'kode_barang', flex: 0.5, align: 'center'},
                {text: 'Grade / Nama Barang', dataIndex: 'nama_barang', flex: 1, align: 'left'},
                {text: 'Weight (KG)', dataIndex: 'weight', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeight},
                {text: 'Unit (Core)', dataIndex: 'satuan', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendereBall},
                {text: 'Customer', dataIndex: 'customer', flex: 0.7, align: 'left'},
                {text: 'No. SPK', dataIndex: 'nospk', flex: 0.7, align: 'center'}
            ],
            bbar: Ext.create('Ext.PagingToolbar', {
                store: store,
                displayInfo: true,
                displayMsg: 'Data {0} - {1} dari {2} data',
                emptyMsg: 'Tidak ada data untuk ditampilkan'
            })
        });

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();
        this.loadData();
    },

    loadData: function() {
        var me = this,
            from = me.down('[name=from]').getSubmitValue(),
            to = me.down('[name=to]').getSubmitValue(),
            store = me.getStore();

        store.getProxy().extraParams['from'] = from;
        store.getProxy().extraParams['to'] = to;
        
        store.loadPage(1);
    }


});