Ext.define('Admin.view.webdesktop.inv.inventori.list' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.invinventorilist',

    layout: 'fit',
    border: false,

    constructor: function(c) {
        var me = this;

        me.func = new Admin.view.currency();

        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
            
        Ext.apply(c, {
            items: [{
                xtype: 'plgrid',
                store: Ext.create('Admin.store.stores', {
                    fields: ['id', 'kode', 'nama', 'unit', 'beli', 'jual'],
                    url: 'api/store/inventori/dataStore.php',
                    autoLoad: true                        
                }),
                columns: [
                    {text: 'Kode', flex: 0.5, sortable: true, dataIndex: 'kode'},
                    {text: 'Keterangan ', flex: 1, sortable: true, dataIndex: 'nama'},
                    {text: 'Satuan', flex: 0.5, sortable: true, dataIndex: 'unit', align: 'right'},                   
                    {text: 'Harga Jual', flex: 0.7, sortable: true, dataIndex: 'jual', align: 'right', renderer: decimalRender},
                    {text: 'Harga Beli', flex: 0.7, sortable: true, dataIndex: 'beli', align: 'right', renderer: decimalRender}
                ]
            }]
        });

        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();
    }
});
