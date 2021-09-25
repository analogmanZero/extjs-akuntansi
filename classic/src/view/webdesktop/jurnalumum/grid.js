Ext.define('Admin.view.webdesktop.jurnalumum.grid', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.jurnalumumgrid',
    layout: 'fit',
       
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();
        
        this.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            autoCancel: false,
            hideButtons: function(){
                var me = this;
                if (me.editor && me.editor.floatingButtons) {
                    me.editor.floatingButtons.hide();
                } else {
                    Ext.defer(me.hideButtons, 10, me);
                }
            },
            listeners: {
                scope: me,
                canceledit: function(f, e) {
                    if(me.addNew) {
                        me.store.remove(e.record);
                    }
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    
                    var tambah = me.up('window').down('#tambah');
                    var simpan = me.up('window').down('#simpan');
                    setTimeout(function() {
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);                      
                    }, 100);
                },
					
                beforeedit: function(f, e) {
                    if(me.saved) return false;                    
                    f.hideButtons();
                    
                    me.recordSelected   = e.record;
                    me.validateEdit     = false;
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    var simpan = me.up('window').down('#simpan');
                    setTimeout(function() {
                        tambah.setDisabled(true);
                        edit.setDisabled(true);
                        hapus.setDisabled(true);
                        simpan.setDisabled(true);
                        me.columns[1].getEditor(e.record).reset();
                        if(!me.addNew) {
                            me.columns[1].getEditor(e.record).setValue(e.record.data['kode']);
                        }
                    }, 100);                    
                },
                afteredit: function(f, e) {
                    var akun = me.columns[1].getEditor(e.record);
                    e.record.set('nama', akun.getDisplayValue());
                    e.record.commit();
                    
                    me.addNew = false;
                    me.recordSelected = undefined;
                    var row = me.getStore().indexOf(e.record);
                    //me.up('window').down('#rekeningheader').setReadOnly(true);
                    setTimeout(function() {
                        var tambah = me.up('window').down('#tambah');
                        var simpan = me.up('window').down('#simpan');
                        tambah.setDisabled(false);
                        simpan.setDisabled(false);
                        if(row==me.getStore().getCount()-1) {
                            tambah.fireEvent('click', tambah);
                        } else {
                            me.rowEditor.startEdit(row+1, 1);
                            me.columns[1].getEditor(me.recordSelected).focus(true, 10);
                        }
                    }, 10);
                },

                validateedit: function(editor, e) {
                    return me.validateEdit;
                }
            }
        });

        this.plugins = this.rowEditor;

        var stores = Ext.create('Ext.data.Store', {
            fields: ['kode','nama','jumlah'],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'topics'
                }
            }
        });
		
        var renderNo = function(v,p,r) {
            var no = stores.indexOf(r)+1;					
            return no;
        };
        
        var storeSumberDana = Ext.create('Admin.store.stores', {
            fields: ['kode_akun','nama_akun', 'display', 'level'],
            url: 'api/store/rekeningStore.php',
            autoLoad: true,
            pageSize: 1000000
        });
	
        Ext.apply(Ext.form.field.VTypes, {
		
            sumberdana: function(val, field) {                
                var values = field.getSubmitValue();
                var index = storeSumberDana.indexOf(field.findRecord(field.valueField, values));                
                //console.log(storeSumberDana.getAt(index).get('level'));
                return (index>-1 && eval(storeSumberDana.getAt(index).get('level'))==4);
            },
				                
            sumberdanaText: 'Rekening harus level empat.'
        });
        
        var akunRenderer = function(value, p, record) {
            return record.data['nama'];
        };
        
        Ext.apply(c, {

            store: stores,
            columns: [
                {header: 'No', renderer: renderNo, width: 50, align: 'center', sortable: false, menuDisabled: true},
                // ---[1]
                {header: 'Kredit', renderer: akunRenderer, editor: {
                    xtype: 'combobox',
                    msgTarget: 'side',
                    store: storeSumberDana,
                    valueField: 'kode_akun',
                    displayField: 'nama_akun',
                    typeAhead: true,
                    queryMode: 'local',
                    //queryDelay: 100,
                    //minChars:0,
                    pageSize: 1000000,
                    vtype: 'sumberdana',
                    matchFieldWidth : false,
                    autoSelect: false,
                    listeners: {
                        scope: me,
                        select: function(combo, record) {
                            var kode_akun = me.columns[2].getEditor(me.recordSelected);
                            kode_akun.setValue(record[0].data['kode_akun']);
                            me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                        },    
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.columns[2].getEditor(me.recordSelected).focus(true, 10);
                            }
                        }
                    },
                    listConfig: {
                        loadingText: 'Loading...',
                        //set tinggi dan lebar isi list
                        width : '40%',
                        height : '110%',
                        resizable : true,
                        emptyText: 'Data tidak ditemukan.',
                        getInnerTpl: function() {
                            return '{display}';
                        }
                    } 
                }, flex:1, sortable: false, menuDisabled: true},
            
		//--- [2]
                {sortable: false, text: 'Kode', dataIndex: 'kode', align: 'center', flex: 0.5, menuDisabled: true,
                    editor: {
                        xtype: 'textfield',
                        fieldStyle: 'text-align: center;',
                        readOnly: true,
                        listeners: {
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                                }
                            }
                        }
                    }
                },
                
                //--- [3]		
                {header: 'Jumlah', dataIndex: 'jumlah', flex: 0.4, align: 'right', editor: {
                    xtype: 'currencyfield',
                    fieldStyle: 'text-align: right;',
                    listeners: {
                        specialkey: function(field, e){
                            //console.log('enter..');
                            me.validateEdit = (e.getKey() == e.ENTER);
                            if (e.getKey() == e.TAB) {
                                me.columns[3].getEditor(me.recordSelected).focus(true, 10);
                            }
                        }
                    }
                }, sortable: false, menuDisabled: true, renderer: function(v,p,r) {
                    return me.func.currency(v);
                }}                
            ],
            listeners: {
                 selectionchange: function(view, records) {
                    var tambah = me.up('window').down('#tambah');
                    var edit = me.up('window').down('#edit');
                    var hapus = me.up('window').down('#hapus');
                    
                    var getValue = tambah.disabled || !records.length;
                    edit.setDisabled(getValue);
                    hapus.setDisabled(getValue);
                },
                keydown: {
                    element: 'el',
                    fn: function (eventObject, htmlElement, object, options) {
                        if (eventObject.keyCode == 46)
                            me.hapusRecord();
                        if (eventObject.keyCode == 113)
                            me.editRecord();
                    }
                }
            }

        });

        this.callParent(arguments);
    },
    
    hapusRecord: function() {
        
        var grid = this;

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var index = grid.getStore().indexOf(selection);
            grid.store.remove(selection);
            
            for(var i=index; i<grid.store.getCount(); i++) {
                grid.store.getAt(i).set('no', (i+1));
                grid.store.getAt(i).commit();
            }
        }

    },

    editRecord: function() {        
        var grid = this;

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            grid.getPlugin().startEdit(row, 1);
            grid.columns[1].getEditor(selection).focus(true, 10);
        }
    },

    tambahRecord: function() {
        
        var grid = this;
		var store = grid.getStore();
		var row = store.getCount();        
        store.insert(row, {kode:'', nama:'', jumlah: 0});
		grid.addNew = true;
		
        grid.getPlugin().startEdit(row, 1);
        grid.columns[1].getEditor(grid.getStore().getAt(row)).focus(true, 10);
    },
    
    getDetail: function() {
        var grid = this;

        var str = '';
		var total = 0;
		
        for(var row =0;row<grid.store.getCount();row++) {
            var rec = grid.store.getAt(row);
            str += (str!=''?'\n':'') + (row+1) + '\t' + //  0 no
                   rec.data['kode'] + '\t' +                   //  1 kode_akun
                   rec.data['nama'] + '\t' +                   //  2 nama_akun
                   rec.data['jumlah'].replace(/[\,]/g, '');    //  3 jumlah
				   
                total+=eval(rec.data['jumlah'].replace(/[\,]/g, ''));			
			
        }
		grid.isBalance = total==eval(grid.up('jurnalumumedit').down('[name=jumlah]').getValue().replace(/[\,]/g, ''));
		
		//console.log(str);
        return str;

    },
    
    transaksiBaru: function() {
        this.store.removeAll();
        this.saved = false;
    },

    transaksiSave: function() {
        this.saved = true;
    }
});