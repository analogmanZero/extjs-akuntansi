Ext.define('Admin.view.operator.OperatorList',{
    
    extend: 'Ext.panel.Panel',
    xtype: 'operator-list',

    viewModel: {
        type: 'operator'
    },

    cls: 'shadow',
    
    items: [{
        xtype: 'gridpanel',
        reference: 'operatorgridpanel',
        cls: 'operator-grid',
        title: 'Data Operator',
        bind: '{results}',
        scrollable: false,
        idSelect: '',
        columns: [
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                align: 'center',
                width: 70,
                renderer: 'getRowNumber',
                text: 'No.'
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nama',
                text: 'Nama',
                flex: 1.5
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'email',
                text: 'Email',
                align: 'LEFT',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'nohp',
                text: 'No. HP',
                align: 'center',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                dataIndex: 'username',
                text: 'User ID',
                flex: 1
            },
            {
                xtype: 'gridcolumn',
                cls: 'content-column',
                menuDisabled: true,
                align: 'center',
                width: 90,
                dataIndex: 'aktif',
                renderer: 'statusRender',
                text: 'Aktif'
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
                    type: 'operator'
                }
            }]
            
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            bind: '{results}'
        }]
    }]
});
