Ext.define('Admin.view.webdesktop.inv.inventori.gridAkunJurnal', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.inventorigridakunjurnal',

    columnLines: true,

    constructor: function(c) {
        var me = this;
        var fields = [
            'kodecabang','cabang',
            'kodeakunpersediaan','akunpersediaan',
            'kodeakunpenjualan','akunpenjualan',
            'kodeakunreturpenjualan','akunreturpenjualan',
            'kodeakundiskonitemjual','akundiskonitemjual',
            'kodeakunhpp','akunhpp',
            'kodeakunreturbeli','akunreturbeli',
            'kodeakunterimabarang','akunterimabarang',
            'kodeakunkirimbarang','akunkirimbarang'
        ];
        var arrtipe = new Array('14','41','41','41,72','51','14','21,22','12,15');
        var storeakun = Ext.create('Admin.store.stores', {
            fields: fields,
            url: 'api/store/inventori/akunJurnalStore.php',
            params: {idInventori: c.idInventori},
            autoLoad: true
        });

        var akun = new Array();
        for(var i=0; i<8; i++) {
            akun[i] = Ext.create('Admin.view.webdesktop.newAkunField', {
                params : {tipe: arrtipe[i]},
                msgTarget: 'side'
            });
        }

        me.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            listeners: {

                beforeEdit: function(f, e) {
                    me.cabangedit = e.record.data['kodecabang'];

                    for(var i=0; i<akun.length; i++) {
                        akun[i].getStore().removeAll();
                        akun[i].getStore().getProxy().extraParams['cabang'] = e.record.data['kodecabang'];
                        akun[i].isExpanding = false;

                        //console.log(fields[(i*2)*2] + ' | ' + e.record.data[fields[i+2]])
                        if(e.record.data[fields[(i*2)+2]]!='') {
                            akun[i].isInitValue = true;
                            akun[i].setValue(e.record.data[fields[(i*2)+2]]);
                        } else {
                            akun[i].submitValue = '';
                            akun[i].setValue();
                        }
                    }
                },

                afterEdit: function(f, e) {
                    for(var i=0; i<akun.length; i++) {
                        e.record.set(fields[(i*2)+2], akun[i].submitValue);
                        e.record.set(fields[(i*2)+3], akun[i].getDisplayValue());

                    }

                    e.record.commit();
                }
            }
        });

        Ext.apply(c, {
            
            bbar: Ext.create('Ext.PagingToolbar', {
                store: storeakun,
                displayInfo: true,
                displayMsg: 'Data {0} - {1} dari {2} data',
                emptyMsg: 'Tidak ada data untuk ditampilkan'
            }),

            store: storeakun,
            plugins: me.rowEditor,
            columns: [
                {header: 'Cabang', dataIndex: 'cabang', flex: 0.9},
                {header: 'Persediaan', dataIndex: 'akunpersediaan', flex: 1, editor: akun[0]},
                {header: 'Penjualan', dataIndex: 'akunpenjualan', flex: 1, editor: akun[1]},
                {header: 'Retur Penjualan', dataIndex: 'akunreturpenjualan', flex: 1, editor: akun[2]},
                {header: 'Diskon Item Jual', dataIndex: 'akundiskonitemjual', flex: 1, editor: akun[3]},
                {header: 'HPP', dataIndex: 'akunhpp', flex: 1, editor: akun[4]},
                {header: 'Retur Beli', dataIndex: 'akunreturbeli', flex: 1, editor: akun[5]},
                {header: 'Terima Barang', dataIndex: 'akunterimabarang', flex: 1, editor: akun[6]},
                {header: 'Kirim Barang', dataIndex: 'akunkirimbarang', flex: 1, editor: akun[7]}
            ]
        });

        this.callParent(arguments);

    },

    editRecord: function() {
        var grid = this;

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            grid.rowEditor.startEdit(row, 1);
           
        }
    },

    getDetail: function() {

        var grid = this,
            str = '';

        for(var i=0; i<grid.getStore().getCount(); i++) {
            var rec = grid.getStore().getAt(i);
            str += (str!=''?'\n':'') +                      // id  keterangan
                   rec.data['kodecabang'] + '\t' +          //  0  kodecabang                   
                   rec.data['kodeakunpersediaan'] + '\t' +      //  1  akunpersediaan
                   rec.data['kodeakunpenjualan'] + '\t' +       //  2  akunpenjualan
                   rec.data['kodeakunreturpenjualan'] + '\t' +  //  3  akunreturpenjualan
                   rec.data['kodeakundiskonitemjual'] + '\t' +  //  4  akundiskonitemjual
                   rec.data['kodeakunhpp'] + '\t' +             //  5  akunhpp
                   rec.data['kodeakunreturbeli'] + '\t' +       //  6  akunreturbeli
                   rec.data['kodeakunterimabarang'] + '\t' +    //  7  akunterimabarang
                   rec.data['kodeakunkirimbarang'];             //  8  akunkirimbarang
        }

        //alert(str);
        return str;
    }
    
});