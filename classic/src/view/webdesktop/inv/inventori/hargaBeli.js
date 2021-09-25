Ext.define('Admin.view.webdesktop.inv.inventori.hargaBeli', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.inventorihargabeli',

    columnLines: true,

    constructor: function(c) {
        var me = this;       

        var storeharga = Ext.create('Admin.store.stores', {
            model: 'Admin.model.inv.inventori.hargaBeli',
            url: 'api/store/inventori/hargaBeliStore.php',
            params: {idInventori: c.idInventori},
            autoLoad: true
        }),

        hargabeli_1 = Ext.create('Admin.view.webdesktop.currencyField', {
            msgTarget: 'side',
            fieldStyle: 'text-align: right;'
        }),

        hargabeli_2 = Ext.create('Admin.view.webdesktop.currencyField', {
            msgTarget: 'side',
            fieldStyle: 'text-align: right;'
        }),

        hargabeli_3 = Ext.create('Admin.view.webdesktop.currencyField', {
            msgTarget: 'side',
            fieldStyle: 'text-align: right;'
        }),            

        diskonbeli_1 = Ext.create('Admin.view.webdesktop.currencyField', {
            tipe: 'diskon',
            msgTarget: 'side',
            fieldStyle: 'text-align: right;'
        }),
        
        diskonbeli_2 = Ext.create('Admin.view.webdesktop.currencyField', {
            tipe: 'diskon',
            msgTarget: 'side',
            fieldStyle: 'text-align: right;'
        }),
        
        diskonbeli_3 = Ext.create('Admin.view.webdesktop.currencyField', {
            tipe: 'diskon',
            msgTarget: 'side',
            fieldStyle: 'text-align: right;'
        }),
            
        cellEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            listeners: {
                
                beforeEdit: function(f, e) {

                    hargabeli_1.setValue(e.record.data['hargabeli_1']);
                    hargabeli_2.setValue(e.record.data['hargabeli_2']);
                    hargabeli_3.setValue(e.record.data['hargabeli_3']);
                    
                    diskonbeli_1.setValue(e.record.data['diskonbeli_1']);
                    diskonbeli_2.setValue(e.record.data['diskonbeli_2']);
                    diskonbeli_3.setValue(e.record.data['diskonbeli_3']);
                    
                },

                afterEdit: function(f, e) {

                    e.record.set('hargabeli_1', hargabeli_1.getSubmitValue());
                    e.record.set('hargabeli_2', hargabeli_2.getSubmitValue());
                    e.record.set('hargabeli_3', hargabeli_3.getSubmitValue());
                    
                    e.record.set('diskonbeli_1', diskonbeli_1.getSubmitValue());
                    e.record.set('diskonbeli_2', diskonbeli_2.getSubmitValue());
                    e.record.set('diskonbeli_3', diskonbeli_3.getSubmitValue());

                    e.record.commit();
                }
            }
        });

        Ext.apply(c, {
            
            bbar: Ext.create('Ext.PagingToolbar', {
                store: storeharga,
                displayInfo: true,
                displayMsg: 'Data {0} - {1} dari {2} data',
                emptyMsg: 'Tidak ada data untuk ditampilkan'
            }),

            store: storeharga,
            plugins: cellEditor,
            columns: [
                {header: 'Cabang', dataIndex: 'cabang', flex: 1},
                {header: 'Harga Unit 1', dataIndex: 'hargabeli_1',  flex: 1, editor: hargabeli_1, align: 'right'},
                {header: 'Harga Unit 2', dataIndex: 'hargabeli_2',  flex: 1, editor: hargabeli_2, align: 'right'},
                {header: 'Harga Unit 3', dataIndex: 'hargabeli_3',  flex: 1, editor: hargabeli_3, align: 'right'},
                {header: 'Diskon Unit 1', dataIndex: 'diskonbeli_1',  flex: 1, editor: diskonbeli_1, align: 'right'},
                {header: 'Diskon Unit 2', dataIndex: 'diskonbeli_2',  flex: 1, editor: diskonbeli_2, align: 'right'},
                {header: 'Diskon Unit 3', dataIndex: 'diskonbeli_3',  flex: 1, editor: diskonbeli_3, align: 'right'}
            ]
        });

        this.callParent(arguments);

    },
    
    getDetail: function() {
        var grid = this,
            str = '';
        for(var i=0; i<grid.getStore().getCount(); i++) {
            var rec = grid.getStore().getAt(i);
            
            str += (str!=''?'\n':'') +                 // id  keterangan
                   rec.data['kodecabang']  + '\t' +    //  0  kodecabang
                   rec.data['hargabeli_1'] + '\t' +    //  1  hargabeli_1
                   rec.data['hargabeli_2'] + '\t' +    //  2  hargabeli_2
                   rec.data['hargabeli_3'] + '\t' +    //  3  hargabeli_3
                   rec.data['diskonbeli_1'] + '\t' +   //  4  diskonbeli_1
                   rec.data['diskonbeli_2'] + '\t' +   //  5  diskonbeli_2
                   rec.data['diskonbeli_3'];           //  6  diskonbeli_3
        }
        
        return str;
    }    
});