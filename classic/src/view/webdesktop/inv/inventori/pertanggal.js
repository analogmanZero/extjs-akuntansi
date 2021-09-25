Ext.define('Admin.view.webdesktop.inv.inventori.pertanggal', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.hargapertanggal',

    columnLines: true,

    constructor: function(c) {
        var me = this;

        me.storeCabang =  Ext.create('Ext.data.Store', {
            fields: ['kodecabang', 'cabang'],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'cabangstore'
                }
            }
        });

        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                cancelEdit: function(f, e) {
                    if(e.record.data['add']=='T') me.getStore().remove(e.record);
                    me.down('#addButton').setDisabled(false);
                },

                beforeEdit: function(f, e) {
                    me.down('#addButton').setDisabled(true);
                },

                afterEdit: function(f, e) {
                    var isEdit = e.record.data['add']=='F';
                    var pertanggal = me.columns[0].getEditor(e.record);
                    
                    for(var i=0; i<3; i++) {
                        for(var j=0; j<me.storeCabang.getCount(); j++) {
                            var storeharga = me.up('inventoriedit').down('#harga_jual_unit_'+ (i+1)).getStore();
                            if(isEdit) {
                                for(var k=0; k<storeharga.getCount(); k++) {
                                    storeharga.getAt(k).set('pertanggal', pertanggal.getSubmitValue());
                                    storeharga.getAt(k).commit();
                                }
                            } else {
                                var rec = new Admin.model.inv.inventori.hargaJual({
                                    add: 'F',
                                    kodecabang: me.storeCabang.getAt(j).data['kodecabang'],
                                    cabang: me.storeCabang.getAt(j).data['cabang'],
                                    kodecabangacuan: me.storeCabang.getAt(j).data['kodecabang'],
                                    cabangacuan: me.storeCabang.getAt(j).data['cabang'],
                                    pertanggal: pertanggal.getSubmitValue(),                               
                                    hargaretail: '0',
                                    hargapartai: '0',
                                    hargagrosir: '0',
                                    diskonretail: '0',
                                    diskonpartai: '0',
                                    diskongrosir: '0'
                                });
                                
                                storeharga.insert(j, rec);
                            }
                        }
                    }

                    e.record.set('add', 'F');
                    e.record.set('tanggal', pertanggal.getSubmitValue());
                    e.record.commit();

                    me.getView().getSelectionModel().select(e.record);
                    me.down('#addButton').setDisabled(false);
                }
            }
        });

        me.store = Ext.create('Admin.store.stores', {
            model: 'Admin.model.inv.inventori.pertanggal',
            url: 'api/store/inventori/hargaPertanggalStore.php',
            params: {idInventori: c.idInventori},
            autoLoad: c.idInventori!=undefined,
            listeners: {
                load: function(e, records, successful, eOpts) {
                    if(successful) {
                        var json = this.getProxy().reader.jsonData;
                        me.up('inventoriedit').down('#harga_jual_unit_1').getStore().loadRawData(json);
                        me.up('inventoriedit').down('#harga_jual_unit_2').getStore().loadRawData(json);
                        me.up('inventoriedit').down('#harga_jual_unit_3').getStore().loadRawData(json);

                        if(this.getCount()>0) me.getView().getSelectionModel().select(this.getAt(0));
                    }
                }
            }
        });
                   
        me.tbar = [{
            itemId: 'addButton',
            tooltip:'Tambah baru',
            iconCls:'add',
            scope: me,
            handler: me.tambahRecord
        },{
            itemId: 'editButton',
            tooltip:'Edit',
            iconCls:'edit',
            disabled: true,
            scope: me,
            handler: me.editRecord
        },{
            itemId: 'removeButton',
            tooltip:'Hapus',
            iconCls:'remove',
            disabled: true,
            scope: me,
            handler: me.hapusRecord
        }];

        me.columns = [
            {text: 'Per Tanggal', flex: 1, sortable: true, dataIndex: 'tanggal', editor: {
                xtype: 'datefield',
                format: 'd-m-Y'
            }}
        ];

        me.listeners = {
            selectionchange: function(e, selected, eOpts) {
                me.loadHarga(me.up('inventoriedit').down('#harga_jual_unit_1'), selected);
                me.loadHarga(me.up('inventoriedit').down('#harga_jual_unit_2'), selected);
                me.loadHarga(me.up('inventoriedit').down('#harga_jual_unit_3'), selected);

                me.down('#removeButton').setDisabled(selected.length==0);
                me.down('#editButton').setDisabled(selected.length==0);
            }
        };
        
        this.callParent(arguments);
    },

    loadHarga: function(editorHarga, selected) {
        editorHarga.allowEdit = selected.length>0;

        var store = editorHarga.getStore();
        store.suspendEvents();
        store.clearFilter();
        store.resumeEvents();
        store.filter([{
            fn: function(record) {
                var tanggal = selected.length>0?selected[0].get('tanggal'):'';
                return record.get('pertanggal')==tanggal;
            }
        }]);
    
        if(store.getCount()>0) editorHarga.getView().getSelectionModel().select(store.getAt(0));
    },

    tambahRecord: function() {
        var grid =  this,
            rowGridCount = grid.getStore().getCount(),
            rec = new Admin.model.inv.inventori.pertanggal({
                add: 'T'
            });

        grid.getStore().insert(rowGridCount, rec);
        grid.getPlugin().startEdit(rowGridCount, 0);
    },

    editRecord: function() {
        var me = this,
            selection = me.getView().getSelectionModel().getSelection()[0];

        if (selection) me.getPlugin().startEdit(me.getStore().indexOf(selection), 0);
    },
    
    hapusRecord: function() {
        var me = this,
            win = me.up('inventoriedit'),
            selection = me.getView().getSelectionModel().getSelection()[0];

         if (selection) {
            for(var i=0; i<3; i++) {
                for(var j=0; j<me.storeCabang.getCount(); j++) {
                    var storeharga = win.down('#harga_jual_unit_'+ (i+1)).getStore();
                    storeharga.removeAll();
                }
            }

            me.getStore().remove(selection);
         }
    },

    afterRender: function() {
        this.callParent();
        if(this.getStore().getCount()>0) this.getView().getSelectionModel().select(this.getStore().getAt(0));
    }
    
});