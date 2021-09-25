Ext.define('Admin.view.webdesktop.inv.inventori.setting', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.inventorisetting',

    border: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    constructor: function(config) {
        var me = this;

        var checkColumn = new Ext.create('Admin.view.webdesktop.CheckColumn', {
            header: 'Utama',
            width: 90,
            sortable: true,
            dataIndex: 'utama',
            listeners: {
                checkchange: function(e, recordIndex, checked) {
                    var grid = me.down('plgrid');
                    var record = grid.store.getAt(recordIndex);
                    record.commit();

                    if(checked) {
                        for(var i=0; i<grid.store.getCount(); i++) {
                            if(i!=recordIndex) {
                                grid.store.getAt(i).set('utama', false);
                                grid.store.getAt(i).commit();
                            }
                        }
                    }
                }
            }
        });

        me.items = [Ext.create('Admin.view.webdesktop.plgrid', {
            hideSearch: true,
            hidePaging: true,
            flex: 1,
            store: Ext.create('Admin.store.stores', {
                model: 'Admin.model.inv.inventori.setting',
                url: 'api/store/inventori/gambarStore.php'
            }),
            columns: [
                {hidden: true, dataIndex: 'id'},
                {text: 'ID', flex: 1, sortable: true, dataIndex: 'kode'},
                {text: 'Warna', flex: 1, sortable: true, dataIndex: 'warna', hidden: config.warna?false:true},
                checkColumn
            ],
            listeners: {
                selectionchange: function(view, selections)  {
                    if(selections[0])
                        me.down('#detail-gambar').loadRecord(selections[0]);
                }
            }
        }), {
            xtype: 'panel',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },            
            border: false,
            bodyPadding: 10,
            items: [{
                xtype: 'panel',
                title: 'View Gambar:'
            }, {
                xtype: 'inventorigambar',
                itemId: 'detail-gambar',
                height: 270,
                width: 230
            }, {
                xtype: 'container',
                flex: 1
            }]
        }];
    
        this.callParent(arguments);
    }
});