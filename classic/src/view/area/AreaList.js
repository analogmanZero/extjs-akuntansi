Ext.define('Admin.view.area.AreaList', {
    extend: 'Ext.panel.Panel',
    xtype: 'area-list',

    cls: 'shadow',
    layout: 'fit',

    constructor: function(c) {
        
        var dataStore = Ext.create('Ext.data.Store', {
            model: 'Admin.model.area.Area',
            pageSize: 25,
            proxy: {
                type: 'ajax',
                url: './server/public/area',
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
                cls: 'area-grid',
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
                    flex: 0.5
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',
                    dataIndex: 'nama',
                    text: 'Nama',
                    flex: 1,
                    cellWrap: true
                }]
            }]
        });

        this.callParent(arguments);
    }
});