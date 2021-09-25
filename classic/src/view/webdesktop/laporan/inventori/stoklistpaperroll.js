Ext.define('Admin.view.webdesktop.laporan.inventori.stoklistpaperroll', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.laporaninventoristoklistpaperroll',

    border: false,
    layout: 'fit',
    
    constructor: function(c) {
        var me = this;
        var cur_func = new Admin.view.currency();

        var reportFileName = 'inventori/stoklistpaperroll.jrxml';

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
            
            return '<B><I>'+cur_func.currency(roll)+' Unit'+(roll>1?'s':'')+'</I></B>';
        };
        
        var data_sumber = [];
        if(c.grup=='DEPOSIT') {
            data_sumber = [
                {kode: 'OC', keterangan: 'Order Confirmation'},
                {kode: 'SA', keterangan: 'Stok Awal'},
                {kode: 'PK', keterangan: 'Proses Kerja'}
            ];
        } else {
            data_sumber = [
                {kode: 'BL', keterangan: 'Pembelian'},
                {kode: 'SA', keterangan: 'Stok Awal'},
                {kode: 'PS', keterangan: 'Penyesuaian'},
                {kode: 'RR', keterangan: 'Roll To Roll'},
                {kode: 'PK', keterangan: 'Proses Kerja'}
            ];
        }
        this.tbar = [{
            xtype: 'combo',
            fieldLabel: 'Bentuk',
            width: 130,
            labelWidth: 50,
            name: 'bentuk',
            selectOnFocus: true,
            store: Ext.create('Ext.data.Store', {
                fields: ['bentuk'],
                data: [
                    {bentuk: '[Semua]'},
                    {bentuk: 'Roll'},
                    {bentuk: 'Sheet'},
                    {bentuk: 'Waste'},
                    {bentuk: 'Core'},
                    {bentuk: 'Reject'}
                ]
            }),
            value: '[Semua]',
            valueField: 'bentuk',
            displayField: 'bentuk',
            queryMode: 'local',
            typeAhead: true,
            listeners: {
                select: function(cmb, records) {
                    me.loadData();
                }
            }
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Grade',
            labelWidth: 40,
            flex: 1,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'combo',
                flex: 1,
                name: 'kode_barang',
                store: Ext.create('Admin.store.stores' , {
                    fields: ['id', 'nama', {name: 'satuan', type: 'auto'}, 'default_satuan', 'pajak'],
                    params: {menu: 'Beli'},
                    url: 'api/store/barangStore.php',
                    autoLoad: true
                }),
                valueField: 'id',
                displayField: 'nama',
                queryMode: 'local',
                typeAhead: true,
                selectOnFocus: true,
                matchFieldWidth : false,
                listConfig: {
                    loadingText: 'Loading...',
                    width : '20%',
                    height : '110%',
                    resizable : true,
                    emptyText: 'Data tidak ditemukan.',
                    getInnerTpl: function() {
                        return '{id} - {nama}';
                    }
                }, 
                listeners: {
                    select: function(button) {
                        me.loadData();
                    }                    
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
            flex: 1,
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
        }, '-',{
            xtype: 'fieldcontainer',
            fieldLabel: 'Sumber',
            labelWidth: 60,
            flex: 0.9,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'combobox',
                flex: 1,
                name: 'sumber',
                store: Ext.create('Ext.data.Store', {
                    fields: ['kode', 'keterangan'],
                    data: data_sumber
                }),
                
                valueField: 'kode',
                displayField: 'keterangan',
                listeners: { 
                    select: function(f) {
                        me.loadData();
                    }
                }
            }, {
                xtype: 'button',
                text: 'Reset',
                handler: function(b) {
                    me.down('[name=sumber]').setValue();
                    me.loadData();
                }
            }]
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
                        'lapstockpaparroll', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
                }
            }]
        }];

        var store = Ext.create('Admin.store.stores', {
            fields: ['tanggal', 'noroll', 'grade', 'substance', 'size', 'ukuran_potong', 'weight', 'satuan', 'supplier', 'noref'],
            url: 'api/store/laporan/inventori/stoklistpaperrollStore.php'
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
                {text: 'Bentuk/No. Roll', dataIndex: 'noroll', flex: 0.7, align: 'center', summaryRenderer: summaryRendererRoll},
                {text: 'Grade / Nama Barang', dataIndex: 'grade', flex: 1, align: 'left'},
                {text: 'Subs. (GSM)', dataIndex: 'substance', flex: 0.5, align: 'right', renderer: rendererDecimal},
                {text: 'Width (CM)', dataIndex: 'size', flex: 0.5, align: 'right', renderer: rendererDecimal},
                {text: 'Size (CM)', dataIndex: 'ukuran_potong', flex: 0.5, align: 'center'},
                {text: 'Weight (KG)', dataIndex: 'weight', flex: 0.5, align: 'right', renderer: rendererDecimal, summaryRenderer: summaryRendererWeight},
                //{text: 'Unit', dataIndex: 'satuan', flex: 0.5, align: 'right', renderer: rendererDecimal},
                {text: c.grup=='DEPOSIT'?'Customer':'Supplier', dataIndex: 'supplier', flex: 1, align: 'left'},
                {text: 'No. Ref', dataIndex: 'noref', flex: 0.5, align: 'left'}
                
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
            bentuk = me.down('[name=bentuk]').getSubmitValue(),
            kode_barang = me.down('[name=kode_barang]').getSubmitValue(),
            substance_min = me.down('[name=substance_min]').getSubmitValue(),
            substance_max = me.down('[name=substance_max]').getSubmitValue(),
            width_min = me.down('[name=width_min]').getSubmitValue(),
            width_max = me.down('[name=width_max]').getSubmitValue(),
            sumber = me.down('[name=sumber]').getSubmitValue(),
            store = me.getStore();

        store.getProxy().extraParams['grup'] = grup;
        store.getProxy().extraParams['bentuk'] = bentuk=='[Semua]'?'':bentuk;
        store.getProxy().extraParams['kode_barang'] = kode_barang;
        store.getProxy().extraParams['substance_min'] = substance_min;
        store.getProxy().extraParams['substance_max'] = substance_max;
        store.getProxy().extraParams['width_min'] = width_min;
        store.getProxy().extraParams['width_max'] = width_max;
        store.getProxy().extraParams['sumber'] = sumber;
        
        store.loadPage(1);
    }
});