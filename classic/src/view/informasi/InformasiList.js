Ext.define('Admin.view.informasi.InformasiList',{
    extend: 'Ext.panel.Panel',
    xtype: 'informasi-list',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date'
    ],

    viewModel: {
        type: 'informasi'
    },

    cls: 'shadow',
    
    items: [
        {
            xtype: 'gridpanel',
            itemId: 'grid-informasi',
            cls: 'informasiCls',
            scrollable: false,
            //hideHeaders: true,
            border: false,
            title: 'Informasi',
            bind: '{results}',
            viewConfig: {
                preserveScrollOnRefresh: true,
                stripeRows: false
            },

            columns: [
                /*{
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex) {
                        var page = 
                        '<div class="resultsItemCls">' +
                            '<div class="resultsTitleCls">'+record.data.judul +'</div>' +
                            '<div class="resultsUrlCls"><a href="#">'+record.data.tanggal+'</a></div>' + 
                            '<div class="resultsContentCls">'+record.data.kepada+'</div>'
                        '</div>';
                        
                        return page;
                    },
                    dataIndex: 'content',
                    flex: 1
                }
                {
                    dataIndex: 'aktif',
                    menuDisabled: true,
                    text: '<span class="x-fa fa-heart"></span>',
                    width: 40,
                    renderer: function(value) {
                        return '<span class="x-fa fa-heart'+ (value ? '' : ' inactive') +'"></span>';
                    }
                },*/
                {
                    dataIndex: 'kepada',
                    text: 'Kepada',
                    flex: 1,
                    cellWrap: true
                },
                {
                    dataIndex: 'judul',
                    text: 'Judul',
                    flex: 2.5,
                    cellWrap: true
                },
                {
                    
                    dataIndex: 'tanggal',
                    width: 120,
                    text: 'Tanggal',
                    align: 'center'
                }, 
                {    
                    xtype: 'actioncolumn',
                    cls: 'content-column',
                    items: [{
                        iconCls:'x-fa fa-file',
                        handler: 'onBtnViewInformasi'
                    }],
                    align: 'center',
                    menuDisabled: true,
                    width: 70,
                    text: 'View'
                },
                {
                    xtype: 'checkcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    width: 70,
                    dataIndex: 'aktif',
                    text: 'Aktif',
                    listeners: {
                        checkChange: 'onAktifCheckChange'
                    }
                }
            ],

            selModel: {
                selType: 'checkboxmodel',
                checkOnly: true,
                showHeaderCheckbox: true,
                headerWidth: 50,
                listeners: {
                    selectionchange: 'onSelectionChange'
                }
            },
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
                }, '->', {
                    xtype: 'searchfield',
                    flex: 1,
                    store: {
                        type: 'informasi'
                    }
                }]
                
            }, {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                displayInfo: true,
                bind: '{results}'
            }]
        }
    ]

});
