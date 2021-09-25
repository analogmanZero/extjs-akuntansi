Ext.define('Admin.view.webdesktop.utama.user.list' ,{

    extend: 'Ext.window.Window',
    alias : 'widget.userlist',

    title : 'Pengguna',
    modulId: 'PE',
    layout: 'fit',
    width: 700,
    height: 470,
    border: false,

    constructor: function(c) {
        var me = this;

        var renderAktif = function(value) {
            return value=='Y'?'AKTIF':'NON AKTIF';
        };
        
        me.items = [{
            xtype: 'plgrid',
            layout: 'fit',
            region: 'center',
            flex: 1,
            store: Ext.create('Admin.store.stores', {
                fields: [
                    {name: 'id', type: 'string'},
                    {name: 'iduser', type: 'string'},
                    {name: 'nama', type: 'string'},
                    {name: 'aktif', type: 'string'},
                    {name: 'kode_divisi', type: 'string'},
                    {name: 'nama_divisi', type: 'string'}
                 ],
                url: 'api/store/user/dataStore.php',
                autoLoad: true
            }),
            columns: [
                {text: 'ID Pengguna', flex: 0.5, sortable: true, dataIndex: 'iduser'},
                {text: 'Nama Pengguna', flex: 0.7, sortable: true, dataIndex: 'nama'},
                {text: 'Kode Divisi', width: 90, align: 'center', sortable: true, dataIndex: 'kode_divisi'},
                {text: 'Nama Divisi', flex: 0.5, align: 'left', sortable: true, dataIndex: 'nama_divisi'}
            ]
        }];
        
        this.callParent(arguments);
    }
});