Ext.define('Admin.view.webdesktop.plgrid', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.plgrid',
    
    columnLines: true,
    
    constructor: function(config) {
        var me = this;

        Ext.apply(config, {
            selModel: (config.sm?false:Ext.create('Ext.selection.CheckboxModel', {
                listeners: {
                    selectionchange: function(sm, selections) {
                        me.idSelect='';
                        for(var i=0; i<sm.getSelection().length; i++)
                            me.idSelect+=(me.idSelect!=''?',':'') + sm.getSelection()[i].data[config.idProp?config.idProp:'id'];
                        me.down('#selected').setValue(me.idSelect);
                        
                        //console.log('~~> ' + idSelect);
                        me.down('#removeButton').setDisabled(selections.length == 0);
                        me.down('#editButton').setDisabled(selections.length != 1);
                        me.down('#printButton').setDisabled(selections.length == 0);
                    }
                }
            })),
            dockedItems: [{
                hidden: config.hidedockedItems,
                xtype: 'toolbar',
                items: [{
                    itemId: 'baruButton',
                    text:'Baru',
                    tooltip:'Tambah data baru',
                    iconCls:'add',
                    hidden: config.hideBaru?config.hideBaru:false,
                    action: 'baru'
                }, {
                    itemId: 'editButton',
                    text:'Edit',
                    tooltip:'Edit data yang dipilh',
                    iconCls:'edit',
                    hidden: config.hideEdit?config.hideEdit:false,
                    disabled: true,
                    action: 'edit'
                },{
                    itemId: 'removeButton',
                    text:'Hapus',
                    tooltip:'Hapus data yang dipilih',
                    iconCls:'remove',
                    hidden: config.hideHapus?config.hideHapus:false,
                    disabled: true,
                    action: 'hapus'
                }, {                    
                    itemId: 'printButton',
                    text:'Cetak',
                    tooltip:'Cetak data yang dipilih',
                    iconCls:'print',
                    hidden: true,
                    disabled: true,
                    action: 'cetak'
                }, {
                    xtype: 'container',
                    width: 100
                }, Ext.create('Admin.view.webdesktop.searchField', {
                        hidden: config.hideSearch,
                        store: config.store,
                        flex: 1
                }), {                    
                    itemId: 'exportButton',
                    tooltip:'Ekspor data',
                    iconCls:'export',
                    hidden: true,
                    action: 'export'
                }, {                    
                    itemId: 'importButton',
                    tooltip:'Impor data',
                    iconCls:'import',
                    hidden: true,
                    action: 'import'
                }, {
                    xtype: 'container',
                    width: 50
                }, {
                    xtype: 'form',
                    hidden: true,
                    border: false,
                    items: [{
                        xtype: 'hiddenfield',
                        name: 'selected',
                        itemId: 'selected'
                    }]
                }]
            }],        
            bbar: Ext.create('Ext.PagingToolbar', {
                hidden: config.hidePaging,
                store: config.store,
                displayInfo: true,
                displayMsg: 'Data {0} - {1} dari {2} data',
                emptyMsg: 'Tidak ada data untuk ditampilkan'
            })
        });

        this.callParent(arguments);

    }
    
});

