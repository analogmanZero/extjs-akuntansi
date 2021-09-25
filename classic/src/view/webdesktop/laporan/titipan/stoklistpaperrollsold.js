Ext.define('Admin.view.webdesktop.laporan.titipan.stoklistpaperrollsold', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.laporantitipanstoklistpaperrollsold',

    border: false,
    layout: 'fit',
    
    constructor: function(c) {
        var me = this;
        var cur_func = new Admin.view.currency();

        var reportFileName = 'titipan/stoklistpaperrollsold.jrxml';

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
        
        var summaryRendererRoll = function(value, p, record) {
            var roll = me.getStore().getProxy().reader.jsonData.roll;
            
            return '<B><I>'+cur_func.currency(roll)+' Roll'+(roll>1?'s':'')+'</I></B>';
        };
        
        this.tbar = [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Grade',
            labelWidth: 50,
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'newAutoComplete',
                flex: 1,
                name: 'kode_barang',
                fields: ['id', 'nama', {name: 'satuan', type: 'auto'}, 'default_satuan', 'pajak'],
                url: 'api/store/barangStore.php',
                params: {menu: 'Beli'},
                valueField: 'id',
                displayField: 'nama',
                textTpl: '{id} - {nama}',
                listenSelect:  function(f) {
                    me.loadData();
                }
            }, {
                xtype: 'button',
                text: 'Reset',
                handler: function(b) {
                    me.down('[name=kode_barang]').setValue();
                    me.loadData();
                }
            }]
        }, '-', {
            xtype: 'fieldcontainer',
            flex: 1.2,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;',
                flex: 1,
                name: 'substance_min',
                listeners: {
                    scope: me,
                    change: me.loadData
                }
            }, {
                xtype: 'displayfield',
                width: 100,
                value: '&le; Substance &le;',
                fieldStyle: 'text-align: center;'
            },{
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;',
                flex: 1,
                name: 'substance_max',
                listeners: {
                    scope: me,
                    change: me.loadData
                }
            }, {
                xtype: 'container',
                width: 5
            }, {
                xtype: 'button',
                text: 'Reset',
                handler: function(b) {
                    me.down('[name=substance_min]').setValue();
                    me.down('[name=substance_max]').setValue();
                    me.loadData();
                }
            }]
        }, '-', {
            xtype: 'fieldcontainer',
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;',
                flex: 1,
                name: 'width_min',
                listeners: {
                    scope: me,
                    change: me.loadData
                }
            }, {
                xtype: 'displayfield',
                width: 80,
                value: '&le; Width &le;',
                fieldStyle: 'text-align: center;'
            },{
                xtype: 'currencyfield',
                fieldStyle: 'text-align: right;',
                flex: 1,
                name: 'width_max',
                listeners: {
                    scope: me,
                    change: me.loadData
                }
            }, {
                xtype: 'container',
                width: 5
            }, {
                xtype: 'button',
                text: 'Reset',
                handler: function(b) {
                    me.down('[name=width_min]').setValue();
                    me.down('[name=width_max]').setValue();
                    me.loadData();
                }
            }]
        }, '-', { 
            xtype: 'datefield',
            name: 'from',
            labelWidth: 30,
            width: 135,
            fieldLabel: 'Tgl.',
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
            labelWidth: 20,
            width: 125,
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
        }, '-', {
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
                        'lapstoklistpaperrolsoldtitipan', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
                }
            }]
        }];

        var store = Ext.create('Admin.store.stores', {
            fields: ['tanggal', 'noroll', 'grade', 'substance', 'size', 'weight', 'satuan', 'customer',  'sumber', 'noref'],
            url: 'api/store/laporan/titipan/stoklistpaperrollsoldStore.php'
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
                {text: 'Kode Roll', dataIndex: 'noroll', flex: 0.5, align: 'center'},
                {text: 'Grade / Nama Barang', dataIndex: 'grade', flex: 1, align: 'left'},
                {text: 'Substance (GSM)', dataIndex: 'substance', flex: 0.5, align: 'right', renderer: rendererDecimal},
                {text: 'Width (CM)', dataIndex: 'size', flex: 0.5, align: 'right', renderer: rendererDecimal},
                {text: 'Weight (KG)', dataIndex: 'weight', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeight},
                {text: 'Unit (Roll)', dataIndex: 'satuan', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererRoll},
                {text: 'Customer', dataIndex: 'customer', flex: 1, align: 'left'},
                {text: 'Sumber', dataIndex: 'sumber', flex: 0.4, align: 'center'},
                {text: 'No. Ref', dataIndex: 'noref', flex: 0.4, align: 'left'}
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
            kode_barang = me.down('[name=kode_barang]').getSubmitValue(),
            substance_min = me.down('[name=substance_min]').getSubmitValue(),
            substance_max = me.down('[name=substance_max]').getSubmitValue(),
            width_min = me.down('[name=width_min]').getSubmitValue(),
            width_max = me.down('[name=width_max]').getSubmitValue(),
            store = me.getStore();

        store.getProxy().extraParams['from'] = from;
        store.getProxy().extraParams['to'] = to;
        store.getProxy().extraParams['kode_barang'] = kode_barang;
        store.getProxy().extraParams['substance_min'] = substance_min;
        store.getProxy().extraParams['substance_max'] = substance_max;
        store.getProxy().extraParams['width_min'] = width_min;
        store.getProxy().extraParams['width_max'] = width_max;
        
        store.loadPage(1);
    }
});