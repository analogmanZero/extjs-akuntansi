Ext.define('Admin.view.kasbankmasuk.KasBankMasukList', {
    extend: 'Ext.panel.Panel',
    xtype: 'kasbankmasuk-list',

    cls: 'shadow',
    layout: 'fit',

    constructor: function(c) {
        
        var func  = new Admin.view.currency();
        var d     = new Date();
        var year  = d.getFullYear();
        var month = d.getMonth()+1;
        var day   = d.getDate();

        var from_date = year + '-' + (month<10 ? '0' : '') + month + '-01';
        var to_date = year + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day;
        var tipe = 'ALL';

        var dataStore = Ext.create('Ext.data.Store', {
            model: 'Admin.model.kasbankmasuk.KasBankMasuk',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                url: './server/public/kasbankmasuk',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                extraParams: {
                    'from': from_date,
                    'to': to_date,
                    'tipe': tipe
                }
            },
            
            autoLoad: true
        });

        var renderNo = function(value, p, record) {
            var page = dataStore.currentPage;
            var index = dataStore.indexOf(record);
            var limit = dataStore.pageSize;

            return ((page-1)*limit)+index+1;
        };

        Ext.apply(c, {
            items: [{
                xtype: 'gridpanel',
                idSelect: 0,
                cls: 'kasbankmasuk-grid',
                store: dataStore,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        reference: 'addButton',
                        text:'Baru',
                        iconCls:'x-fa fa-plus',
                        handler: 'onAddButtonClick'
                    }, {
                        xtype: 'button',
                        reference: 'deleteButton',
                        text:'Hapus',
                        iconCls:'x-fa fa-trash-alt',
                        handler: 'onDeleteButtonClick',
                        disabled: true
                    }, {
                        xtype: 'button',
                        reference: 'editButton',
                        text:'Edit',
                        iconCls:'x-fa fa-pencil-alt',
                        handler: 'onEditButtonClick',
                        disabled: true
                    }, 
                    '-', 
                    {
                        xtype: 'datefield',
                        width: 120,
                        value: from_date,
                        format: 'd-m-Y',            
                        submitFormat: 'Y-m-d',
                        listeners: {
                            change: function(field) {
                                from_date = this.getSubmitValue();
                                dataStore.load({
                                    params: {
                                        'from': from_date,
                                        'to': to_date,
                                        'tipe': tipe
                                    }
                                });
                            }
                        }
                    }, 
                    {
                        xtype: 'datefield',
                        fieldLabel: 's/d',
                        labelStyle: 'text-align: center;',
                        labelSeparator: '&nbsp;',
                        labelWidth: 25,
                        width: 150,
                        value: to_date,
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        listeners: {
                            change: function(field) {
                                to_date = this.getSubmitValue();
                                dataStore.load({
                                    params: {
                                        'from': from_date,
                                        'to': to_date,
                                        'tipe': tipe
                                    }
                                });
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        emptyText: 'Pilih Jenis Transaksi',
                        flex: 1,
                        store: Ext.create('Ext.data.Store', {
                            fields: [
                                {
                                    type: 'int',
                                    name: 'id'
                                },
                                {
                                    type: 'string',
                                    name: 'tipe'
                                },
                                {
                                    type: 'string',
                                    name: 'kode'
                                },
                                {
                                    type: 'string',
                                    name: 'nama'
                                }
                            ],
                            data: [
                                {id: 1, tipe: 'A', kode: 'ALL', nama: 'Semua Transaksi'},
                                {id: 2, tipe: 'K', kode: 'BKM', nama: 'Transaksi Kas (BKM)'},
                                {id: 3, tipe: 'B', kode: 'BBM', nama: 'Transaksi Bank (BBM)'}
                            ]
                        }),
                        value: tipe,
                        valueField: 'kode',
                        displayField: 'nama',
                        listeners: {
                            select: function(field, record) {
                                var tipe = record.data['kode'];
                                dataStore.load({
                                    params: {
                                        'from': from_date,
                                        'to': to_date,
                                        'tipe': tipe
                                    }
                                });
                            }
                        }       
                    },
                    '-' ,
                    {
                        xtype: 'searchfield',
                        flex: 1,
                        store: dataStore
                    }]
                }, {
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    displayInfo: false,
                    store: dataStore
                }],
                selModel: {
                    selType: 'checkboxmodel',
                    checkOnly: true,
                    showHeaderCheckbox: true,
                    headerWidth: 50,
                    listeners: {
                        selectionchange: 'onSelectionChange'
                    }
                },
                columns: [{
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    renderer: renderNo,
                    text: 'No.',
                    flex: 0.2
                }, 
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'tanggal',
                    text: 'Tanggal',
                    flex: 0.4
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'nobukti',
                    text: 'No. Bukti',
                    flex: 0.5
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'subyek',
                    text: 'Subyek',
                    flex: 0.7,
                    cellWrap: true
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'keterangan',
                    text: 'Keterangan',
                    flex: 0.9,
                    cellWrap: true
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    dataIndex: 'jenis_trx',
                    text: 'Transaksi',
                    flex: 0.4
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'right',
                    dataIndex: 'total',
                    text: 'Total',
                    flex: 0.4,
                    renderer: function(value, p, record) {
                        return func.currency(value);
                    },
                }]
            }]
        });

        this.callParent(arguments);
    }
});