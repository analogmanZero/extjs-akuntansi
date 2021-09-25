Ext.define('Admin.view.webdesktop.inv.inventori.atribut', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.inventoriatribut',

    layout: 'fit',
    itemId: 'atribut',
    
    title: 'Atribut',

    columnLines: true,
    constructor: function(c) {
        var me = this;

        this.store = Ext.create('Admin.store.stores', {
            model: 'Admin.model.inv.inventori.atribut',
            url: 'api/store/inventori/inventoriAtributStore.php',
            params: {idInventori: c.idInventori},
            autoLoad: c.idInventori!=undefined,
            listeners: {
                load: function(e, records, successful, eOpts) {
                    if(successful) me.updateButton();
                }
            }
        });

        var atribut = Ext.create('Admin.view.webdesktop.newAutoComplete', {          
            fields: ['kode', 'nama'],
            url: 'api/store/atributStore.php',
            valueField: 'kode',
            displayField: 'nama',
            textTpl: '{nama}'
        });

        this.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                cancelEdit: function(f, e) {

                    var grid = me.down('grid');
                    if(e.record.data['add']=='T') grid.getStore().remove(e.record);

                    me.updateButton();
                },

                beforeEdit: function(f, e) {
                    if(e.record.data['kode']!='') {
                        atribut.isInitValue = true;
                        atribut.setValue(e.record.data['kode']);
                    } else {
                        atribut.submitValue = '';
                        atribut.setValue();
                    }

                    me.updateButton(true);
                },

                afterEdit: function(f, e) {
                    e.record.set('add', 'F');
                    e.record.set('kode', atribut.submitValue);
                    e.record.set('nama', atribut.getDisplayValue());
                    e.record.commit();

                    me.updateButton();
                }
            }
        });

        this.tbar = [{
            itemId: 'baruButton',
            text:'Baru',
            tooltip:'Tambah data baru',
            iconCls:'add',
            action: 'baru',
            handler: this.tambahRecord
        }, {
            itemId: 'editButton',
            text:'Edit',
            tooltip:'Edit data yang dipilh',
            iconCls:'edit',
            disabled: true,
            action: 'edit',
            scope: this,
            handler: this.editRecord
        },{
            itemId: 'removeButton',
            text:'Hapus',
            tooltip:'Hapus data yang dipilih',
            iconCls:'remove',
            disabled: true,
            action: 'hapus',
            scope: this,
            handler: this.hapusRecord
        }];

        this.bbar = Ext.create('Ext.PagingToolbar', {
            store: this.store,
            displayInfo: true,
            displayMsg: 'Data {0} - {1} dari {2} data',
            emptyMsg: 'Tidak ada data untuk ditampilkan'
        });

        this.plugins = this.rowEditor;
        this.columns = [
            {header: 'Atribut', dataIndex: 'nama',  flex: 1, editor: atribut}
        ];

        this.listeners = {
            selectionchange: function(view, records) {
                var grid = me;
                grid.down('#editButton').setDisabled(!records.length);
                grid.down('#removeButton').setDisabled(!records.length);
            }
        };
        
        me.callParent(arguments);
    },    

     tambahRecord: function(b) {
        var grid = b.up('inventoriatribut');
        var rec = new Admin.model.inv.inventori.atribut({
            add: 'T'
        });
        grid.getStore().insert(0, rec);
        grid.rowEditor.startEdit(0, 0);
        grid.columns[0].getEditor(grid.getStore().getAt(0)).focus(true, 10);
    },

    editRecord: function(b) {
        var grid = b.up('inventoriatribut');
        for(var i=grid.selModel.getSelection().length-1; i>=0; i--) {
            var row = grid.store.indexOf(grid.selModel.getSelection()[i]);
            this.rowEditor.startEdit(row, 0);
        }
    },

    hapusRecord: function(b) {
        var grid = b.up('inventoriatribut');

        for(var i=grid.selModel.getSelection().length-1; i>=0; i--)
            grid.store.remove(grid.selModel.getSelection()[i]);

        this.updateButton();
    },
    
    updateButton: function(val) {
        var grid =  this;
        grid.down('#editButton').setDisabled(val!=undefined?val:(grid.selModel.getSelection().length != 1));
        grid.down('#removeButton').setDisabled(val!=undefined?val:(grid.selModel.getSelection().length != 1));

    },

    getDetail: function() {

        var grid = this,
            str = '';

        for(var i=0; i<grid.getStore().getCount(); i++) {
            var rec = grid.getStore().getAt(i);
            str += (str!=''?'\n':'') + // id  keterangan
                   rec.data['kode'];   //  0  kode
        }

        //alert(str);
        return str;
    }
});