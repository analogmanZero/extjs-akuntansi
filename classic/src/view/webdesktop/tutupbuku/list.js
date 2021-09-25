Ext.define('Admin.view.webdesktop.tutupbuku.list' ,{

    extend: 'Ext.window.Window',
    alias : 'widget.tutupbuku',

    title : 'Tutup Buku Tahunan',

    layout: 'fit',
    modulId: 'TH',
    width: 600,
    height: 400,
    border: false,
    
    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'grid',
            store: Ext.create('Admin.store.stores', {
                fields: [
                    {name: 'tahun', type: 'string'},
                    {name: 'keterangan', type: 'string'}
                 ],
                 autoLoad: true,
                 url: 'api/store/tutupbuku/dataStore.php'
            }),
            columns: [
                {text: 'Akhir Periode', flex: 0.5, sortable: true, dataIndex: 'tahun'},
                {text: 'Keterangan', flex: 1, sortable: true, dataIndex: 'keterangan'}
            ]
        }];

        me.buttons = [{
            text: 'Proses Tutup Buku',
            listeners: {
                click: function() {
                    Ext.create('Admin.view.webdesktop.tutupbuku.edit',{
                        parent: me
                    }).show();
                }
            }
        }];
        
        this.callParent(arguments);
    }
});