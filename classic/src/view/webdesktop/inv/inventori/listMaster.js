Ext.define('Admin.view.webdesktop.inv.inventori.listMaster' ,{

    extend: 'Ext.window.Window',
    alias : 'widget.inventorilistmaster',
    
    
    layout: 'border',
    width: 600,
    height: 400,
    border: false,

    constructor: function(c) {
        var me = this;

        var induk = new Ext.create('Admin.view.webdesktop.newAutoComplete', {
            fields: ['kode', 'nama', 'display'],
            url: 'api/store/groupStore.php',
            valueField: 'kode',
            displayField: 'display',
            textTpl: '{nama}'
        });

        var pos_resto = new Ext.create('Admin.view.webdesktop.CheckColumn', {
            header: 'Tampil',
            hidden: c.kode!='group',
            menuDisabled: true,
            width: 70,
            sortable: false,
            dataIndex: 'pos',
            editor: {
                xtype: 'checkbox',
                cls: 'x-grid-checkheader-editor'
            },
            listeners: {
                checkchange: function(e, recordIndex, checked) {
                    me.CheckChangeValue(e, recordIndex, checked);
                }
            }
        });

        this.rowEditor = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                canceledit: function(f, e) {

                    if(c.kode=='group') me.down('plgrid').getStore().loadPage(1);

                    if(e.record.data['add']=='T') {
                        this.oldRecord = null;
                        me.down('plgrid').store.remove(e.record);
                    }
                    else {
                        e.record.set('kode', me.oldValue[0]);
                        e.record.set('nama', me.oldValue[1]);
                        e.record.set('pos', me.oldValue[2]);
                        e.record.set('kodeinduk', me.oldValue[3]);
                        e.record.set('induk', me.oldValue[4]);

                        e.record.commit();
                        this.oldValue = undefined;
                    }
                },
                beforeedit: function(f, e) {
                    if(me.down('#editButton').hidden) return;
                    
                    me.kodeupdate = e.record.data['kode'];
                    //me.down('plgrid').columns[1].getEditor(e.record).setDisabled(e.record.data['add']=='F');
                    
                    if(c.kode=='group') {
                        var ket = e.record.data['nama'].replace(/&nbsp;/gi, '');
                        e.record.set('nama', ket);
                        //me.down('plgrid').columns[2].getEditor(e.record).setValue(ket);
                    }

                    induk.isExpanding = false;
                    if(e.record.data['kodeinduk']!='') {
                        induk.isInitValue = true;
                        induk.setValue(e.record.data['kodeinduk']);
                    } else {
                        induk.submitValue = '';
                        induk.setValue();
                    }

                    if(me.oldValue==undefined)
                        me.oldValue = new Array(
                            e.record.data['kode'],
                            e.record.data['nama'],
                            e.record.data['pos'],
                            e.record.data['induk']
                        );
                },
                afteredit: function(f, e) {
                    var form = me.down('form');
                    form.getForm().waitMsgTarget = me.getEl();
                    form.getForm().submit({
                        params: {
                            add: e.record.data['add'],
                            kodeupdate: me.kodeupdate,
                            kode: e.record.data['kode'],
                            nama: e.record.data['nama'],
                            pos:  e.record.data['pos']?'Y':'N',
                            induk: induk.submitValue
                        },
                        method:'POST',
                        url: c.updateUrl,
                        waitMsg: 'Update...',
                        success: function(f, a) {
                            Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                                if(c.kode!='group') {
                                    e.record.set('add','F');
                                    e.record.commit();
                                    me.oldValue=undefined;
                                } else
                                    me.down('plgrid').getStore().loadPage(1);

                            });
                        },
                        failure:function(f, a) {
                            Ext.MessageBox.show({
                                title: 'Gagal',
                                msg: a.result?a.result.message:'Kesalahan sistem, ulangi lagi.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR,
                                fn: function() {
                                    var row = me.down('plgrid').store.indexOf(e.record);
                                    me.rowEditor.startEdit(row, 1);
                                }
                            })
                        }
                    });
                }
            }
        });

        Ext.apply(c, {
            items: [Ext.create('Admin.view.webdesktop.plgrid', {
                region: 'center',
                layout: 'fit',
                plugins: this.rowEditor,
                store: Ext.create('Admin.store.stores', {
                    model: 'Admin.model.inv.inventori.listMaster',
                    url: c.storeUrl,
                    autoLoad: true                    
                }),
                columns: [
                    {text: 'Kode', flex: 0.5, sortable: false, menuDisabled: true, dataIndex: 'kode', editor: {
                            xtype: 'textfield',
                            disabled: true
                    }},
                    {text: 'Nama', flex: 1, sortable: false, menuDisabled: true, dataIndex: 'nama', editor: {
                            xtype: 'textfield'
                    }},
                    {text: 'Induk Grup', flex: 1, sortable: false, menuDisabled: true, dataIndex: 'induk', hidden: c.kode!='group', editor: induk},
                    pos_resto
                ],
                idProp: 'kode'
            })]

        });

        this.callParent(arguments);
    },
    
    editRecord: function() {
        var grid = this.down('plgrid');

        var selection = grid.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            var row = grid.store.indexOf(selection);
            this.rowEditor.startEdit(row, 2);
            grid.columns[2].getEditor(selection).focus(true, 10);
        }
    },

    tambahRecord: function() {
        var grid = this.down('plgrid');
        var rec = new Admin.model.inv.inventori.listMaster({
            add: 'T',
            kode: 'Auto'
        });
        grid.store.insert(0, rec);
        this.rowEditor.startEdit(0, 2);
        grid.columns[1].getEditor(grid.store.getAt(2)).focus(true, 10);
    },
    
    CheckChangeValue: function(e, recordIndex, checked) {
        var me = this;

        var grid = me.down('plgrid'),
            record = grid.store.getAt(recordIndex);

        //alert(checked);
        record.set(e.dataIndex, !checked);
        record.commit();

        me.rowEditor.startEdit(recordIndex, 0);
        grid.columns[1].getEditor(record).focus(true, 10);
    }
});
