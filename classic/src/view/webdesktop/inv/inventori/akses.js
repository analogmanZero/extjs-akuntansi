Ext.define('Admin.view.webdesktop.inv.inventori.akses', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.inventoriakses',

    columnLines: true,

    constructor: function(c) {
        var me = this;

        var akses = new Ext.create('Admin.view.webdesktop.CheckColumn', {
            header: 'Akses',
            width: 90,
            sortable: false,
            menuDisabled: false,
            align: 'center',
            dataIndex: 'akses'
        });

        me.store = Ext.create('Admin.store.stores', {
            fields: ['kodecabang','cabang',{name: 'akses', type: 'bool'}],
            params: {idInventori: c.idInventori},
            url: 'api/store/inventori/inventoriCabangAksesStore.php',
            autoLoad: true
        });

        me.bbar = Ext.create('Ext.PagingToolbar', {
            store:  me.store,
            displayInfo: true,
            displayMsg: 'Data {0} - {1} dari {2} data',
            emptyMsg: 'Tidak ada data untuk ditampilkan'
        });

        me.columns = [
            {header: 'Kode Cabang', dataIndex: 'kodecabang', flex: 1},
            {header: 'Cabang', dataIndex: 'cabang', flex: 1},
            akses
        ]

        me.callParent(arguments);
    },

    editRecord: function() {
        var grid = this;

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            grid.rowEditor.startEdit(row, 1);
           
        }
    },

    getAksesCabang: function() {

        var grid = this,
            str = '';

        for(var i=0; i<grid.getStore().getCount(); i++) {
            var rec = grid.getStore().getAt(i);
            if(rec.data['akses']) str += rec.data['kodecabang']+',';
        }
        
        return str;
    }
    
});