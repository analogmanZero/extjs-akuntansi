Ext.define('Admin.view.webdesktop.transaksikas.detail', {
    
    extend: 'Ext.panel.Panel',
    alias: 'widget.transaksikasdetail',
    
    layout: 'fit',

    constructor: function(c) {
        var me = this;
		
        me.oldpajak = undefined;
        Ext.grid.RowEditor.prototype.cancelBtnText = "Batal";
        Ext.grid.RowEditor.prototype.saveBtnText = "Selanjutnya";

        var totalPajak = function() {
                var data = me.recordSelect.data;
                var ppn = data['total_ppn'];
                var pph_21 = data['total_pph_21'];
                var pph_22 = data['total_pph_22'];
                var pph_23 = data['total_pph_23'];
                var pph_sewa = data['total_pph_sewa'];

                return ppn+pph_21+pph_22+pph_23+pph_sewa;
        };
		
        var totalPajakPpn = function(pajak, name) {

            var grid = me.down('grid');

            var jumlahSubyek = grid.columns[2].getEditor(me.recordSelect).getSubmitValue();
            var volume = grid.columns[3].getEditor(me.recordSelect).getSubmitValue();
            var jumlah = grid.columns[5].getEditor(me.recordSelect).getSubmitValue();
            var total = jumlahSubyek*volume*jumlah;

            var total_ppn = me.recordSelect.data['total_ppn'];
            if(name=='total_pph_22' && total_ppn>0 && pajak==1.5) {				
                me.recordSelect.set(name, total_ppn*((10*pajak)/100)); 	
            } else		
            if(name=='total_ppn' && total>=1 && pajak>0) {
                me.recordSelect.set(name, total*(10/110));
            } else {
                me.recordSelect.set(name, total*(pajak/100));   
            }
        };

        var hitungPajak = function() {			
            var data = me.recordSelect.data;			
            totalPajakPpn(data['ppn']?10:0, 'total_ppn');
            totalPajakPpn(data['pph_21']?data['pph_21_nilai']:0, 'total_pph_21');
            totalPajakPpn(data['pph_22']?data['pph_22_nilai']:0, 'total_pph_22');
            totalPajakPpn(data['pph_23']?data['pph_23_nilai']:0, 'total_pph_23');
            totalPajakPpn(data['pph_sewa']?10:0, 'total_pph_sewa');

            var grid = me.down('grid');
            var pajak = grid.columns[6].getEditor(me.recordSelect);
            pajak.setValue(totalPajak());
        };	
	
        var stores = Ext.create('Ext.data.Store', {
            fields: [
                'id', 'subyek', {name: 'jumlah_subyek', type: 'float'}, {name: 'volume', type: 'float'}, 'satuan', {name: 'jumlah', type: 'float'}, 'pajak', {name: 'nilai_pajak', type: 'float'}, {name: 'total', type: 'float'},
                {name: 'ppn', type: 'bool'}, {name: 'total_ppn', type: 'float'},
                {name: 'pph_21', type: 'bool'}, {name: 'pph_21_nilai', type: 'float'}, {name: 'total_pph_21', type: 'float'},
                {name: 'pph_22', type: 'bool'}, {name: 'pph_22_nilai', type: 'float'}, {name: 'total_pph_22', type: 'float'},
                {name: 'pph_23', type: 'bool'}, {name: 'pph_23_nilai', type: 'float'}, {name: 'total_pph_23', type: 'float'},
                {name: 'pph_sewa', type: 'bool'}, {name: 'total_pph_sewa', type: 'float'}, 'id_aparatur', 'aparatur'
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'details'
                }
            }
        });

        var func = new Admin.view.currency();

        this.items = [{
            xtype: 'grid',
            border: false,
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                listeners: {
                    selectionchange: function(sm, selections) {
                        if(!me.down('#tambah').isDisabled()) {
                            me.down('#edit').setDisabled(selections.length != 1);
                            me.down('#hapus').setDisabled(selections.length == 0);
                        }
                    }
                }
            }),
            columnLines: true,
            store: stores,
            columns: [
                {text: 'No.', flex: 0.2, sortable: false, menuDisabled: true, renderer: function(v,p,r) {
                    return stores.indexOf(r)+1;
                }, align: 'center'},
                {text: 'Subyek', flex: 0.8, sortable: false, menuDisabled: true, dataIndex: 'subyek', editor: {
                    xtype: 'textfield',
                    allowBlank: true
                }, align: 'left'},
                {text: 'Jumlah Subyek', flex: 0.5, sortable: true, dataIndex: 'jumlah_subyek', renderer: function(v,p,r) {
                    return func.currency(v);
                }, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    listeners: {
                        scope: me,
                        change: function(f) {
                            me.setTotal(f);
                            //hitungPajak();
                        }						
                    }
                }, align: 'right'},
                {text: 'Volume', flex: 0.4, allowDecimals: true, decimalPrecision: 3, sortable: true, dataIndex: 'volume', renderer: function(v,p,r) {
                    return func.currency(v);
                }, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    listeners: {
                        scope: me,
                        change: function(f) {
                            me.setTotal(f);
                            //hitungPajak();
                        }
                    }
                }, align: 'right'},
                {text: 'Satuan', flex: 0.4, sortable: true, dataIndex: 'satuan', editor: {
                    xtype: 'textfield',
                    allowBlank: true,
                    fieldStyle: 'text-align: center;'
                }, align: 'center'},
                {text: 'Jumlah', flex: 0.5, sortable: true, dataIndex: 'jumlah', renderer: function(v,p,r) {
                    return func.currency(v);
                }, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    listeners: {
                        scope: me,
                        change: function(f) {
                            me.setTotal(f);
                            //hitungPajak();
                        }
                    }
                }, align: 'right'},
//                {text: 'Pajak', flex: 0.5, sortable: true, dataIndex: 'pajak', editor: {
//                    xtype: 'currencyfield',
//                    fieldStyle: 'text-align: right;',
//                    readOnly: true,
//                    listeners: {
//                        scope: me,
//                        focus: me.openJendelaPajak,
//                        change: me.setTotal
//                    }
//                }, align: 'right'},
                {text: 'Total', flex: 0.5, sortable: true, dataIndex: 'total', renderer: function(v,p,r) {
                    return func.currency(v);
                }, editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    readOnly: true
                }, summaryType: 'sum', summaryRenderer: function(v,p,r) {
                    return '<B>'+func.currency(v)+'</B>';
                }, align: 'right'} //,
//                {text: 'Nama Pegawai', flex: 0.7, sortable: true, dataIndex: 'aparatur', editor: {
//                    
//                    xtype: 'combo',
//                    store: storeAparatur,
//                    valueField: 'id',
//                    displayField: 'nama',
//                    typeAhead: true,
//                    queryMode: 'local',
//                    matchFieldWidth : false,
//                    autoSelect: false,
//                    listConfig: {
//                        loadingText: 'Loading...',
//                        width : '40%',
//                        height : '110%',
//                        resizable : true,
//                        emptyText: 'Data tidak ditemukan.',
//						getInnerTpl: function() {
//                           return '{nama} - {jabatan}';
//                        }
//                    },
//                    allowBlank: true
//                }, hidden: c.aparatur==undefined}
            ],
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            plugins: Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToEdit: 2,
                listeners: {
                    cancelEdit: function(f, e) {
                        if(me.addNew) {
                           stores.remove(e.record);
                        } else {
                            e.record.set('ppn', me.oldpajak['ppn']);
                            e.record.set('total_ppn', me.oldpajak['total_ppn']);

                            e.record.set('pph_21', me.oldpajak['pph_21']);
                            e.record.set('pph_21_nilai', me.oldpajak['pph_21_nilai']);
                            e.record.set('total_pph_21', me.oldpajak['total_pph_21']); 

                            e.record.set('pph_22', me.oldpajak['pph_22']);
                            e.record.set('pph_22_nilai', me.oldpajak['pph_22_nilai']);
                            e.record.set('total_pph_22', me.oldpajak['total_pph_22']); 

                            e.record.set('pph_23', me.oldpajak['pph_23']);
                            e.record.set('pph_23_nilai', me.oldpajak['pph_23_nilai']);
                            e.record.set('total_pph_23', me.oldpajak['total_pph_23']); 

                            e.record.set('pph_sewa', me.oldpajak['pph_sewa']);
                            e.record.set('total_pph_sewa', me.oldpajak['total_pph_sewa']);
						
                            e.record.commit();						
                        }						

                        var grid = me.down('grid');
                        me.addNew = false;
                        me.setDisabled(false);
                        grid.selModel.deselectAll();
                        me.oldpajak = undefined;
                    },

                    beforeEdit: function(f, e) {
                        if(me.down('#tambah').isDisabled()) return false;                        
                        me.setDisabled(true);
						
                        me.oldpajak = [];
                        me.oldpajak['ppn'] = e.record.data['ppn'];
                        me.oldpajak['total_ppn'] = e.record.data['total_ppn'];

                        me.oldpajak['pph_21'] = e.record.data['pph_21'];
                        me.oldpajak['pph_21_nilai'] = e.record.data['pph_21_nilai'];
                        me.oldpajak['total_pph_21'] = e.record.data['total_pph_21'];

                        me.oldpajak['pph_22'] = e.record.data['pph_22'];
                        me.oldpajak['pph_22_nilai'] = e.record.data['pph_22_nilai'];
                        me.oldpajak['total_pph_22'] = e.record.data['total_pph_22'];

                        me.oldpajak['pph_23'] = e.record.data['pph_23'];
                        me.oldpajak['pph_23_nilai'] = e.record.data['pph_23_nilai'];
                        me.oldpajak['total_pph_23'] = e.record.data['total_pph_23'];

                        me.oldpajak['pph_sewa'] = e.record.data['pph_sewa'];
                        me.oldpajak['total_pph_sewa'] = e.record.data['total_pph_sewa'];
												
//                        var grid = me.down('grid');
//                        var tipe = me.up('transaksikasedit').down('[name=tipe]').getSubmitValue();
//                        var pajak = grid.columns[6].getEditor(e.record);
//                        if(me.aparatur!=undefined) {
//                            var aparatur = grid.columns[8].getEditor(e.record);
//                            if(e.record.data["id_aparatur"]!="") aparatur.setValue(e.record.data["id_aparatur"]);
//                        }
//                        pajak.setDisabled(tipe!='BKK');
                        me.recordSelect = e.record;
                        return true;
                    },

                    edit: function(f, e) {
                        var grid = me.down('grid');
                        var editor = this;
                        
//                        if(me.aparatur!=undefined) {
//                            var aparatur = grid.columns[8].getEditor(e.record);
//                            if(aparatur.getSubmitValue()=='') {
//                                me.setDisabled(false);
//                                Ext.MessageBox.show({
//                                    title: 'Kesalahan',
//                                    msg: 'Kolom Aparatur harus diisi.',
//                                    buttons: Ext.MessageBox.OK,
//                                    icon: Ext.MessageBox.ERROR,
//                                    fn: function() {									   
//                                        editor.startEdit(e.rowIdx, 9);   
//                                    }
//                                });
//
//                                return false;
//                            }
//                            
//                            e.record.set('id_aparatur', aparatur.getValue());
//                            e.record.set('aparatur', aparatur.getDisplayValue()==''?aparatur.getValue():aparatur.getDisplayValue());
//                        }

                        e.record.set('id', stores.indexOf(e.record)+1);
                        e.record.commit();
                        me.setDisabled(false);
                        grid.selModel.deselectAll();
                        me.oldpajak = undefined;
                    }
                }
            }),

            bbar: [{
                text: 'Tambah',
                itemId: 'tambah',
                iconCls: 'add',
                scope: me,
                handler: me.tambahRecord
            }, {
                text: 'Edit',
                itemId: 'edit',
                iconCls: 'edit',
                disabled: true,
                scope: me,
                handler: me.editRecord
            },{
                text: 'Hapus',
                itemId: 'hapus',
                iconCls: 'remove',
                disabled: true,
                scope: me,
                handler: me.hapusRecord
            }]
        }];

        this.callParent(arguments);
    },
    
    openJendelaPajak: function(){
        var me = this;
        var grid = me.down('grid');
        var pajak = grid.columns[6].getEditor(me.recordSelect);
        
        var jumlahSubyek = grid.columns[2].getEditor(me.recordSelect).getSubmitValue();
        var volume = grid.columns[3].getEditor(me.recordSelect).getSubmitValue();
        var jumlah = grid.columns[5].getEditor(me.recordSelect).getSubmitValue();
        var total = jumlahSubyek*volume*jumlah;


        var win = new Ext.create('Admin.view.webdesktop.transaksikas.pajak', {
            editorPajak: pajak,
            recordSelect: me.recordSelect,
            jumlah: total
        });

        win.down('form').getForm().loadRecord(me.recordSelect);
        win.show();
    },

    tambahRecord: function() {
        var me = this,
            grid = me.down('grid'),
            store = grid.getStore(),
            row = store.getCount();
		
        store.insert(row, {id: 0, subyek: '', jumlah_subyek: 0, volume: 0, satuan: '', jumlah: 0, pajak: 0, total: 0});
        grid.getPlugin().startEdit(row, 1);
        grid.columns[1].getEditor(store.getAt(row)).focus(true, 10);
		
        me.addNew = true;
    },

    editRecord: function() {
        var me = this,
            grid = me.down('grid'),
            store = grid.getStore(),
            row = store.indexOf(grid.selModel.getSelection()[0]);

        grid.getPlugin().startEdit(row, 1);
        grid.columns[1].getEditor(store.getAt(row)).focus(true, 10);
        me.addNew = false;
    },

    hapusRecord: function() {
        var me = this,
            grid = me.down('grid');

        for(var i=grid.selModel.getSelection().length-1; i>=0; i--) {
            grid.store.remove(grid.selModel.getSelection()[i]);
        }
    },

    setDisabled: function(disabled) {
        var me = this;

        me.down('#tambah').setDisabled(disabled);
        me.down('#edit').setDisabled(true);
        me.down('#hapus').setDisabled(true);
    },

    getDetail: function() {
        var str = '';
        var store = this.down('grid').getStore();
        for(var row =0;row<store.getCount();row++) {
            var rec = store.getAt(row);
            str += (str!=''?'\n':'') +                                   //  id  keterangan
                (row+1) + '\t' +                                         //   0  no
                rec.data['subyek'] + '\t' +                              //   1  subyek
                rec.data['jumlah_subyek'] + '\t' +                       //   2  jumlah_subyek
                (rec.data['volume']+'').replace(/[\,]/g, '') + '\t' +    //   3  volume
                rec.data['satuan'] + '\t' +                              //   4  satuan
                (rec.data['jumlah']+'').replace(/[\,]/g, '') + '\t' +    //   5  jumlah
                rec.data['pajak'] + '\t' +                               //   6  pajak
                (rec.data['nilai_pajak']+'') + '\t' +                    //   7  nilai_pajak
                (rec.data['total']+'').replace(/[\,]/g, '') + '\t' +     //   8  total

                (rec.data['ppn']?'Y':'N') + '\t' +                       //   9  ppn
                rec.data['total_ppn'] + '\t' +                           //  10  total_ppn

                (rec.data['pph_21']?'Y':'N') + '\t' +                    //  11  pph_21
                rec.data['pph_21_nilai'] + '\t' +                        //  12  pph_21_nilai
                rec.data['total_pph_21'] + '\t' +                        //  13  total_pph_21

                (rec.data['pph_22']?'Y':'N') + '\t' +                    //  14  pph_22
                rec.data['pph_22_nilai'] + '\t' +                        //  15  pph_22_nilai
                rec.data['total_pph_22'] + '\t' +                        //  16  total_pph_22

                (rec.data['pph_23']?'Y':'N') + '\t' +                    //  17  pph_23
                rec.data['pph_23_nilai'] + '\t' +                        //  18  pph_23_nilai
                rec.data['total_pph_23'] + '\t' +                        //  19  total_pph_23

                (rec.data['pph_sewa']?'Y':'N') + '\t' +                  //  20  pph_sewa
                rec.data['total_pph_sewa'] + '\t' +                      //  21  total_pph_sewa
                rec.data['id_aparatur'];                                 //  22  nama aparatur

        }

        return str;
    },

    setTotal: function() {
        var me = this;
        var grid = me.down('grid');
        var jumlahSubyek = grid.columns[2].getEditor(me.recordSelect).getSubmitValue() *1;
        var volume = parseFloat(grid.columns[3].getEditor(me.recordSelect).getSubmitValue()) * 1;
        var jumlah = grid.columns[5].getEditor(me.recordSelect).getSubmitValue() * 1;
        //var pajak = grid.columns[6].getEditor(me.recordSelect).getSubmitValue();
        var total = jumlahSubyek*parseFloat(volume)*jumlah*1;

        me.recordSelect.set('nilai_pajak', 0);
        grid.columns[6].getEditor(me.recordSelect).setValue(total); //+pajak nng
    }
});