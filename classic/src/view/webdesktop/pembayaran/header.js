Ext.define('Admin.view.webdesktop.pembayaran.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.pembayaranheader',

    layout: 'fit',
    border : false,
    
    bodyPadding: 5,
    
    constructor: function(c) {
        var me = this;

        var storeSumberDana = Ext.create('Admin.store.stores', {
            fields: ['id', 'kode_akun', 'nama_akun', 'display', 'level'],
            url: 'api/store/transaksikas/rekeningStore.php',
            pageSize: 1000000
        });
        
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
                        labelWidth: 105,
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
                            name: 'nobukti',
                            itemId:'nobukti',
                            fieldLabel: 'No. Bukti',
                            msgTarget: 'side',
                            labelWidth: 105,
                            allowBlank: true,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
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
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#jenistransaksi').focus(true, 10);
                                    }
                                }
                            }
                        }]
                    }, {
                        xtype: 'combobox',
                        readOnly: true,
                        name: 'jenistransaksi',
                        itemId: 'jenistransaksi',
                        fieldLabel: 'Jenis Transaksi',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id', 'nama'],
                            data:[
                                {id: 'BKK', nama: 'Bukti Kas Keluar (BKK)'},
                                {id: 'BBK', nama: 'Bukti Bank Keluar (BBK)'}
                            ]
                        }),
                        valueField: 'id',
                        displayField: 'nama',
                        listeners: {
                            scope: me,
                            select: function(c) {
                                var value = c.getSubmitValue();
                                var rekeningheader = me.down('[name=rekeningheader]');                                        
                                rekeningheader.reset();
                                
                                rekeningheader.setFieldLabel((value=='BKM' || value=='BBM')?'Debet':'Kredit');
                                storeSumberDana.getProxy().extraParams['tipe'] = value;
                                storeSumberDana.loadPage(1);
                                
                                var grid = me.up('window').down('pembayarandetail');
                                grid.headerCt.getGridColumns()[3].setText((value=='BKM' || value=='BBM')?'Kredit':'Debet');
                                
                                Ext.Ajax.request({
                                    method:'POST',
                                    url: 'api/store/transaksikas/getLastNobukti.php',
                                    params: {
                                        tipe: value
                                    },
                                    success: function(response) {
                                        var json = Ext.JSON.decode(response.responseText);
                                        me.down('[name=nobukti]').setValue(json.nobukti);                                        
                                    }
                                });
                            },
                            
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#rekeningheader').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'Kredit',
                        readOnly: true,
                        name: 'rekeningheader',
                        itemId: 'rekeningheader',
                        store: storeSumberDana,
                        valueField: 'kode_akun',
                        displayField: 'display',
                        typeAhead: true,
                        queryMode: 'local',
                        queryDelay: 100,
                        minChars:0,
                        pageSize: 1000000,
                        matchFieldWidth : false,
                        autoSelect: false,
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
                        },
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#divisi').focus(true, 10);
                                }
                            }
                        }
                    }/*, {
                        xtype: 'currencyfield',
                        fieldLabel: 'Jumlah',
                        name: 'jumlah',
                        itemId: 'jumlah',
                        readOnly: true,
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#divisi').focus(true, 10);
                                }
                            }
                        }
                    }*/]
                },{
                    xtype: 'container',
                    width: 10
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
                        xtype: 'combo',
                        fieldLabel: 'Divisi',
                        name: 'divisi',
                        itemId: 'divisi',
                        store: Ext.create('Admin.store.stores', {
                            fields: ['id', 'kode', 'nama', 'display'],
                            url: 'api/store/divisiStore.php',
                            autoLoad: true
                        }),
                        valueField: 'id',
                        displayField: 'display',
                        typeAhead: true,
                        queryMode: 'local',
                        readOnly: true,
                        matchFieldWidth : false,
                        autoSelect: false,
                        listConfig: {
                            loadingText: 'Loading...',
                            width : '40%',
                            height : '110%',
                            emptyText: 'Data tidak ditemukan.'
                        },
                        allowBlank: true,
                        selectOnFocus: true,
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#keterangan').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'textarea',
                        fieldLabel: 'Uraian',
                        name: 'keterangan',
                        itemId: 'keterangan',
                        readOnly: true,
                        height: 80,
                        allowBlank: true,
                        selectOnFocus: true,
                        listeners: {
                            focus: function(t) {
                                setTimeout(function() {                                        
                                    t.selectText(t.getSubmitValue().length, t.getSubmitValue().length);
                                }, 100);
                            },
                            keydown: {
                                element: 'el',
                                fn: function (eventObject, htmlElement, object, options) {
                                    if (eventObject.keyCode == 9) {
                                        setTimeout(function(){
                                            var grid = me.up('window').down('pembayarandetail');
                                            if(grid.getStore().getCount()>0) {
                                                grid.rowEditor.startEdit(0, 1);
                                                grid.columns[1].getEditor(grid.recordSelected).focus(true, 10);
                                            } else {
                                                var tambah =  me.up('pembayaranedit').down('#tambah');
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

        this.down('#tanggal').setReadOnly(act);
        this.down('#jenistransaksi').setReadOnly(act);
        this.down('#rekeningheader').setReadOnly(act);
        //this.down('#jumlah').setReadOnly(act);
        this.down('#divisi').setReadOnly(act);
        this.down('#keterangan').setReadOnly(act);

        if(!act && !this.isEdit) {
            this.down('#tanggal').setValue(new Date());
            this.down('#jenistransaksi').setValue('BKK');
            this.down('#jenistransaksi').fireEvent('select', this.down('#jenistransaksi'));
        }
        var me = this;
        setTimeout(function() {
            me.down('[name=nobukti]').focus(true, 10);
        }, 100);
        //this.down('#nobukti').focus(true, 10);
    }
});