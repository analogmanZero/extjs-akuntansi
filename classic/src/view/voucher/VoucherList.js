Ext.define('Admin.view.voucher.VoucherList', {
    extend: 'Ext.panel.Panel',
    xtype: 'voucher-list',

    cls: 'shadow',
    layout: 'fit',

    constructor: function(c) {
        var fcurrency = new Admin.view.currency();
        
        var dataStore = Ext.create('Ext.data.Store', {
            model: 'Admin.model.voucher.Voucher',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                url: './server/public/voucher',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
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
                cls: 'voucher-grid',
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
                    }, '-', {
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
                    dataIndex: 'kode',
                    text: 'Kode',
                    flex: 0.4
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'nama',
                    text: 'Nama',
                    flex: 0.7,
                    cellWrap: true
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'area',
                    text: 'Area',
                    flex: 0.5,
                    cellWrap: true
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'right',
                    dataIndex: 'harga_jual',
                    text: 'Harga',
                    renderer: function(value, p, record) {
                        return fcurrency.currency(value);
                    },
                    flex: 0.5
                },
                {
                    xtype: 'checkcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    width: 70,
                    dataIndex: 'pajak_jual',
                    text: 'Pajak',
                    listeners: {
                        checkChange: 'onPajakJualCheckChange'
                    }
                }]
            }]
        });

        this.callParent(arguments);
    }
});