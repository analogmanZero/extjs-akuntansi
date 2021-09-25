Ext.define('Admin.view.webdesktop.laporan.inventori.stoklistpapersheet', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.laporaninventoristoklistpapersheet',

    border: false,
    layout: 'fit',
    
    constructor: function(c) {
        var me = this;
        var cur_func = new Admin.view.currency();

        var reportFileName = 'inventori/stoklistpapersheet.jrxml';

        var rendererNo =  function(value, p, record) {
            var store = me.getStore();
            return ((store.currentPage-1)*store.pageSize)+(store.indexOf(record)+1);
        };

        var rendererDecimal =  function(value, p, record) {
            return cur_func.currency(value);
        };
        
        var summaryRendererWeightAktual = function(value, p, record) {
            var aktual = me.getStore().getProxy().reader.jsonData.aktual;            
            return '<B><I>'+cur_func.currency(aktual)+'</I></B>';
        };
        
        var summaryRendererWeightRumus = function(value, p, record) {
            var rumus = me.getStore().getProxy().reader.jsonData.rumus;            
            return '<B><I>'+cur_func.currency(rumus)+'</I></B>';
        };
        
        var summaryRendererWeightReam = function(value, p, record) {
            var ream = me.getStore().getProxy().reader.jsonData.ream;            
            return '<B><I>'+cur_func.currency(ream)+'</I></B>';
        };
        
        var summaryRendererWeightPallet = function(value, p, record) {
            var pallet = me.getStore().getProxy().reader.jsonData.pallet;            
            return '<B><I>'+cur_func.currency(pallet)+'</I></B>';
        };
        
        this.tbar = [{
            xtype: 'datefield',
            name: 'from',
            labelWidth: 60,
            width: 180,
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
            labelWidth: 30,
            width: 150,
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
                            'lapstoklistpapersheet', 'width=715, height=565, toolbar=no, menubar=no, scsheetbars=yes');
                }
            }]
        }];

        var store = Ext.create('Admin.store.stores', {
            fields: ['tanggal', 'pallet', 'grade', 'substance', 'size', 'weight_aktual', 'weight_rumus', 'ream', 'unit_pallet', 'customer', 'nospk'],
            url: 'api/store/laporan/inventori/stoklistpapersheetStore.php'
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
                {text: 'Pallet', dataIndex: 'pallet', flex: 0.5, align: 'center'},
                {text: 'Grade / Nama Barang', dataIndex: 'grade', flex: 1, align: 'left'},
                {text: 'Subs. (GSM)', dataIndex: 'substance', flex: 0.5, align: 'right', renderer: rendererDecimal},
                {text: 'Size (GSM)', dataIndex: 'size', flex: 0.5, align: 'center'},
                {text: 'Aktual (KG)', dataIndex: 'weight_aktual', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeightAktual},
                {text: 'Rumus (KG)', dataIndex: 'weight_rumus', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeightRumus},
                {text: 'Ream', dataIndex: 'ream', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeightReam},
                {text: 'Unit (Pallet)', dataIndex: 'unit_pallet', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeightPallet},
                {text: 'No. SPK', dataIndex: 'nospk', flex: 0.7, align: 'left'},
                {text: 'Customer', dataIndex: 'customer', flex: 0.7, align: 'left'}
                
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
            grup = me.grup,
            from = me.down('[name=from]').getSubmitValue(),
            to = me.down('[name=to]').getSubmitValue(),
            store = me.getStore();
    
        store.getProxy().extraParams['grup'] = grup;
        store.getProxy().extraParams['from'] = from;
        store.getProxy().extraParams['to'] = to;
        
        store.loadPage(1);
    }


});