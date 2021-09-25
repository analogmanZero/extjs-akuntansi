Ext.define('Admin.view.webdesktop.lokasikerja.list' ,{

    extend: 'Ext.window.Window',
    alias : 'widget.lokasikerjalist',

    title : 'lokasikerja',
    modulId: 'AR',

    layout: 'fit',
    border: false,

    width: 680,
    height: 400,

    initComponent: function() {
        var me = this;
        
        var renderNo = function(value, p, record) {
            var store = me.down('plgrid').getStore();
            var page = store.currentPage;
            var index = store.indexOf(record);
            var limit = store.pageSize;

            return ((page-1)*limit)+index+1;
        };
        
        this.items = [{
            xtype: 'plgrid',
            store: Ext.create('Admin.store.stores', {
                fields: [
                    {name: 'id', type: 'string'},
                    {name: 'kode', type: 'string'},
                    {name: 'nama', type: 'string'},
                    {name: 'area', type: 'string'}
                 ],
                url: 'api/store/lokasikerja/dataStore.php',
                autoLoad: true
            }),
            columns: [
                {text: 'No.', width: 50, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo},
                /*{text: 'Kode', flex: 0.1, sortable: true, align: 'center', dataIndex: 'kode'},*/
                {text: 'Nama', flex: 0.7, sortable: true, dataIndex: 'nama'},
                {text: 'Area Operasi', width: 120, sortable: true, dataIndex: 'area_operasi', align: 'center'}
            ],
            idProp: 'id'
        }];
        
        this.callParent(arguments);
    }
});