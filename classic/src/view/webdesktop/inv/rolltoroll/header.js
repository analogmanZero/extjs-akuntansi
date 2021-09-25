Ext.define('Admin.view.webdesktop.inv.rolltoroll.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.invrolltorollheader',

    layout: 'fit',
    border : false,
    
    bodyPadding: 5,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [{
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 90,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            flex: 1.4,
                            name: 'notrx',
                            itemId:'notrx',
                            fieldLabel: 'No. Proses',
                            msgTarget: 'side',
                            labelWidth: 90,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
                                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#tanggal').focus(true, 10);
                                    }
                                }
                            }
                        }, {
                            xtype: 'container',
                            width: 10
                        }, {
                            xtype: 'datefield',
                            name: 'tanggal',
                            itemId: 'tanggal',
                            fieldLabel: 'Tanggal',
                            labelStyle: 'text-align: center;',
                            labelWidth: 60,
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            msgTarget: 'side',
                            allowBlank: false,
                            flex: 1,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
                                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#kode_barang').focus(true, 10);
                                    }
                                }
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            fieldLabel: 'Nama Barang',
                            name: 'kode_barang',
                            itemId: 'kode_barang',
                            store: Ext.create('Admin.store.stores', {
                                fields: ['id', 'nama', {name: 'satuan', type: 'auto'}, 'default_satuan', 'harga'],
                                params: {menu: 'Jual'},
                                url: 'api/store/barangStore.php',
                                autoLoad: true
                            }),
                            valueField: 'id',
                            displayField: 'nama',
                            typeAhead: true,
                            queryMode: 'local',
                            readOnly: true,
                            labelWidth: 90,
                            flex: 1,
                            autoSelect: false,
                            listConfig: {
                                loadingText: 'Loading...',
                                emptyText: 'Data tidak ditemukan.'
                            },
                            allowBlank: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                select: function(c, record) {
                                    var data = record[0].data;
                                    var detail = me.up('window').down('invrolltorolldetail');
                                    detail.kode_barang = data['id'];
                                    detail.nama_barang = data['nama'];
                                    detail.satuan_barang = data['satuan'];
                                    detail.default_satuan = data['default_satuan'];
                                                                        
                                    var aktual = me.up('window').down('invrolltorollaktual');
                                    aktual.kode_barang = data['id'];
                                    aktual.nama_barang = data['nama'];
                                    aktual.satuan_barang = data['satuan'];
                                    aktual.default_satuan = data['default_satuan'];
                                    aktual.harga = data['harga'];
                                    
                                },
                                specialkey: function(field, e){
                                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#keterangan').focus(true, 10);
                                    }
                                }
                            }
                        }]
                    }]
                },{
                    xtype: 'container',
                    width: 30
                }, {
                    xtype: 'panel',
                    bodyPadding: 10,
                    border: false,
                    flex: 1,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 60,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: 'Uraian',
                        name: 'keterangan',
                        itemId: 'keterangan',
                        readOnly: true,
                        height: 80,
                        allowBlank: true,
                        selectOnFocus: true,
                        listeners: {
                            keydown: {
                                element: 'el',
                                fn: function (eventObject, htmlElement, object, options) {
                                    if (eventObject.keyCode == 9) {
                                        setTimeout(function(){
                                            var grid = me.up('invrolltorolledit').down('invrolltorolldetail');
                                            if(grid.getStore().getCount()>0) {
                                                grid.rowEditor.startEdit(0, 1);
                                                grid.columns[1].getEditor(grid.recordSelected).focus(true, 10);
                                            } else {
                                                var tambah =  me.up('invrolltorolledit').down('#tambah');
                                                tambah.fireEvent('click', tambah);
                                            }
                                        }, 10);
                                    }
                                }
                            }
                        }
                    }]
                }]                              
            }]    
        });


        me.callParent(arguments);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {

        this.down('#notrx').setReadOnly(this.isEdit || act);
        this.down('#tanggal').setReadOnly(act);
        this.down('#kode_barang').setReadOnly(act);
        this.down('#keterangan').setReadOnly(act);
        
        if(act || this.isEdit) {
        } else {
            this.down('#tanggal').setValue(new Date());
            var me = this;
            Ext.Ajax.request({
                method:'POST',
                url: 'api/store/getLastNobukti.php',
                params: {
                    prefix: 'RR'
                },
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    me.down('[name=notrx]').setValue(json.nobukti);
                    me.down('[name=notrx]').focus(true, 10);
                },
                failure: function() {
                    me.down('[name=notrx]').focus(true, 10);
                }
            });
        }

        this.down('#notrx').focus(true, 10);
    },

    partnerChange: function(store, index) {
        return;
    },

    sodetailgridDataChaged: function(store) {
        return;
    }
});