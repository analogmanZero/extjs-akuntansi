Ext.define('Admin.view.webdesktop.inv.inventori.hargaJual', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.inventoriHargaJual',

    columnLines: true,

    constructor: function(c) {
        var me = this;

        var cabang = Ext.create('Admin.view.webdesktop.cabangField', {
            allowBlank: false,
            msgTarget: 'side',
            listenSelect: function() {
                var record = me.getView().getSelectionModel().getSelection()[0];
                if(this.submitValue!=me.cabangedit) {
                    var recordAcuan = me.getStore().findRecord('kodecabang', this.submitValue);
                    me.columns[2].getEditor(record).setValue(recordAcuan.data['hargaretail']);
                    me.columns[3].getEditor(record).setValue(recordAcuan.data['hargapartai']);
                    me.columns[4].getEditor(record).setValue(recordAcuan.data['hargagrosir']);

                    me.columns[5].getEditor(record).setValue(recordAcuan.data['diskonretail']);
                    me.columns[6].getEditor(record).setValue(recordAcuan.data['diskonpartai']);
                    me.columns[7].getEditor(record).setValue(recordAcuan.data['diskongrosir']);
                }
                me.columns[2].getEditor(record).setReadOnly(me.cabangedit!=this.submitValue);
                me.columns[3].getEditor(record).setReadOnly(me.cabangedit!=this.submitValue);
                me.columns[4].getEditor(record).setReadOnly(me.cabangedit!=this.submitValue);
                me.columns[5].getEditor(record).setReadOnly(me.cabangedit!=this.submitValue);
                me.columns[6].getEditor(record).setReadOnly(me.cabangedit!=this.submitValue);
                me.columns[7].getEditor(record).setReadOnly(me.cabangedit!=this.submitValue);
            }
        });

        me.plugins = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 1,
            listeners: {
                beforeEdit: function(f, e) {
                    if(!me.allowEdit) return false;                    
                    if(me.limitedAkses && e.record.data['kodecabang']!=me.cabangAkses) return false;
                    
                    cabang.getStore().getProxy().extraParams['cabang'] = me.limitedAkses?me.cabangAkses:'';
                    cabang.isInitValue = true;
                    cabang.setValue(e.record.data['kodecabangacuan']);
                    cabang.getStore().removeAll();
                    cabang.isExpanding = false;

                    me.columns[2].getEditor(e.record).setReadOnly(e.record.data['kodecabang']!=e.record.data['kodecabangacuan']);
                    me.columns[3].getEditor(e.record).setReadOnly(e.record.data['kodecabang']!=e.record.data['kodecabangacuan']);
                    me.columns[4].getEditor(e.record).setReadOnly(e.record.data['kodecabang']!=e.record.data['kodecabangacuan']);
                    me.columns[5].getEditor(e.record).setReadOnly(e.record.data['kodecabang']!=e.record.data['kodecabangacuan']);
                    me.columns[6].getEditor(e.record).setReadOnly(e.record.data['kodecabang']!=e.record.data['kodecabangacuan']);
                    me.columns[7].getEditor(e.record).setReadOnly(e.record.data['kodecabang']!=e.record.data['kodecabangacuan']);

                    me.cabangedit = e.record.data['kodecabang'];
                },

                afterEdit: function(f, e) {
                    e.record.set('kodecabangacuan', cabang.submitValue);
                    e.record.set('cabangacuan', cabang.getDisplayValue());
                    e.record.commit();

                    for(var i=0; i<me.getStore().getCount(); i++)
                        if(i!=me.getStore().indexOf(e.record) && me.getStore().getAt(i).data['kodecabangacuan']==e.record.data['kodecabang']) {
                            me.getStore().getAt(i).set('hargaretail', me.columns[2].getEditor(e.record).getSubmitValue());
                            me.getStore().getAt(i).set('hargapartai', me.columns[3].getEditor(e.record).getSubmitValue());
                            me.getStore().getAt(i).set('hargagrosir', me.columns[4].getEditor(e.record).getSubmitValue());
                            me.getStore().getAt(i).set('diskonretail', me.columns[5].getEditor(e.record).getSubmitValue());
                            me.getStore().getAt(i).set('diskonpartai', me.columns[6].getEditor(e.record).getSubmitValue());
                            me.getStore().getAt(i).set('diskongrosir', me.columns[7].getEditor(e.record).getSubmitValue());

                            me.getStore().getAt(i).commit();
                        }
                }
            }
        });

        Ext.apply(c, {
            tbar: [{
                text:'Samakan Harga Cabang',
                iconCls:'editharga',
                handler: function(v) {
                    var recordAcuan = me.getStore().findRecord('kodecabang', 'PST');
                    for(var i=0; i<me.getStore().getCount(); i++) {
                        me.getStore().getAt(i).set('kodecabangacuan', recordAcuan.data['kodecabang']);
                        me.getStore().getAt(i).set('cabangacuan', recordAcuan.data['cabang']);
                        me.getStore().getAt(i).set('hargaretail', recordAcuan.data['hargaretail']);
                        me.getStore().getAt(i).set('hargapartai', recordAcuan.data['hargapartai']);
                        me.getStore().getAt(i).set('hargagrosir', recordAcuan.data['hargagrosir']);
                        me.getStore().getAt(i).set('diskonretail', recordAcuan.data['diskonretail']);
                        me.getStore().getAt(i).set('diskonpartai', recordAcuan.data['diskonpartai']);
                        me.getStore().getAt(i).set('diskongrosir', recordAcuan.data['diskongrosir']);

                        me.getStore().getAt(i).commit();
                    }
                }
            }],            

            store: Ext.create('Ext.data.Store', {
                model: 'Admin.model.inv.inventori.hargaJual',
                proxy: {
                    type: 'memory',
                    reader: {
                        type: 'json',
                        rootProperty: 'hargajualunit'+c.unit
                    }
                }
            }),
            
            columns: [
                {header: 'Cabang', dataIndex: 'cabang', flex: 0.9},
                {header: 'Acuan', dataIndex: 'cabangacuan', flex: 0.9, editor: cabang},
                {header: 'Hrg. Retail', dataIndex: 'hargaretail',  flex: 1, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;'
                }, align: 'right'},
                {header: 'Hrg. Partai', dataIndex: 'hargapartai',  flex: 1, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;'
                }, align: 'right'},
                {header: 'Hrg. Grosir', dataIndex: 'hargagrosir',  flex: 1, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;'
                }, align: 'right'},
                {header: 'Disk. Retail', dataIndex: 'diskonretail',  flex: 1, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    tipe: 'diskon'
                }, align: 'right'},
                {header: 'Disk. Partai', dataIndex: 'diskonpartai',  flex: 1, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    tipe: 'diskon'
                }, align: 'right'},
                {header: 'Disk. Grosir', dataIndex: 'diskongrosir',  flex: 1, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    tipe: 'diskon'
                }, align: 'right'}
                //{header: 'tanggal', dataIndex: 'pertanggal'}
            ]
        });

        this.callParent(arguments);

    },

//    editRecord: function() {
//        var grid = this;
//
//        var selection = grid.getView().getSelectionModel().getSelection()[0];
//        if (selection) grid.getPlugin().startEdit(grid.store.indexOf(selection), 1);
//    },
    
    getDetail: function() {

        var grid = this,
            pertanggal = grid.up('inventoriedit').down('hargapertanggal'),
            store = grid.getStore(),
            str = '';

        store.clearFilter();
        for(var i=0; i<store.getCount(); i++) {
            var rec = store.getAt(i);
            str += (str!=''?'\n':'') +                   // id  keterangan
                   rec.data['kodecabang'] + '\t' +       //  0  kodecabang
                   rec.data['pertanggal'] + '\t' +       //  1  kodecabang
                   rec.data['kodecabangacuan'] + '\t' +  //  2  kodecabangacuan
                   
                   rec.data['hargaretail'].replace(',', '') + '\t' +      //  3  hargaretail
                   rec.data['hargapartai'].replace(',', '') + '\t' +      //  4  hargapartai
                   rec.data['hargagrosir'].replace(',', '') + '\t' +      //  5  hargagrosir

                   rec.data['diskonretail'].replace(',', '') + '\t' +     //  6  diskonretail
                   rec.data['diskonpartai'].replace(',', '') + '\t' +     //  7  diskonpartai
                   rec.data['diskongrosir'].replace(',', '');             //  8  diskongrosir
        }
        var selected = pertanggal.getView().getSelectionModel().getSelection();
        pertanggal.fireEvent('selectionchange', pertanggal, selected, null);

        return str;
    }
    
});