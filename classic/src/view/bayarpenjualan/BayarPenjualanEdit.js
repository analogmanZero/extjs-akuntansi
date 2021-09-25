Ext.define('Admin.view.bayarpenjualan.BayarPenjualanEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'bayarpenjualan-edit',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea'
    ],
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    bodyPadding: 20,

    scrollable: true,
    
    listeners: {
        afterrender: 'onLoadData'
    },

    items: [{
        xtype: 'panel',
        itemId: 'panel-header',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            itemId: 'panel-header-left',
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                msgTarget: 'side',
                labelAlign: 'left',
                allowBlank: false,
                labelWidth: 100
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    name: 'nobukti',
                    itemId:'nobukti',
                    fieldLabel: 'No. Bukti',
                    msgTarget: 'side',
                    labelAlign: 'left',
                    allowBlank: false,
                    labelWidth: 100,
                    flex: 0.6,
                    margin: '0 10 0 0',
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                var me = this.up('kasbankmasuk-edit');
                                me.down('#tanggal').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'datefield',
                    name: 'tanggal',
                    itemId: 'tanggal',
                    fieldLabel: 'Tanggal',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    msgTarget: 'side',
                    labelAlign: 'left',
                    allowBlank: false,
                    value: new Date(),
                    labelWidth: 60,
                    flex: 0.42,
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                var me = this.up('kasbankmasuk-edit');
                                me.down('#jenistransaksi').focus(true, 10);
                            }
                        }
                    }
                }]
            }, 
            {
                xtype: 'combobox',
                name: 'jenistransaksi',
                itemId: 'jenistransaksi',
                fieldLabel: 'Sumber Dana',
                store: Ext.create('Ext.data.Store', {
                    fields: [
                        {
                            type: 'int',
                            name: 'id'
                        },
                        {
                            type: 'string',
                            name: 'tipe'
                        },
                        {
                            type: 'string',
                            name: 'kode'
                        },
                        {
                            type: 'string',
                            name: 'nama'
                        }
                    ],
                    data: [
                        {id: 1, tipe: 'K', kode: 'BKM', nama: 'Kas (BKM)'},
                        {id: 2, tipe: 'B', kode: 'BBM', nama: 'Bank (BBM)'}
                    ]
                }),
                valueField: 'kode',
                displayField: 'nama',
                typeAhead: true,
                queryMode: 'local',
                value: 'BKM',
                listeners: {
                    select: function(field, record) {
                        var me = this.up('kasbankmasuk-edit');
                        var rekeningheader = me.down('#rekeningheader');                                        
                        var store = rekeningheader.getStore();
                        rekeningheader.reset();
                        store.load({
                            params: {
                                tipe: record.data['tipe']
                            }
                        });

                        if(me.idEdit && me.jenis_trx==record.data['kode']) {
                            me.down('[name=nobukti]').setValue(me.nobukti);
                        } else {
                            me.setNobukti(record.data['kode']);
                        }
                    },
                    
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            var me = this.up('kasbankmasuk-edit');
                            me.down('#rekeningheader').focus(true, 10);
                        }
                    }
                }
            },
            {
                xtype: 'combobox',
                name: 'rekeningheader',
                itemId: 'rekeningheader',
                fieldLabel: 'Akun Debet',
                store: {
                    type: 'akunkasbank',
                    proxy: {
                        extraParams: {
                            tipe: 'K'
                        }
                    },
                    autoLoad: true
                },
                valueField: 'kode_akun',
                displayField: 'display',
                typeAhead: true,
                queryMode: 'local',
                listeners: {  
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            var me = this.up('kasbankmasuk-edit');
                            me.down('#subyek').focus(true, 10);
                        }
                    }
                }       
            },
            {
                xtype: 'combobox',
                name: 'subyek',
                itemId: 'subyek',
                fieldLabel: 'Customer',
                store: {
                    type: 'customer',
                    autoLoad: true
                },
                valueField: 'id',
                displayField: 'nama',
                typeAhead: true,
                queryMode: 'local',
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            var me = this.up('bayarpenjualan-edit');
                            me.down('#uraian').focus(true, 10);
                        }
                    }
                }
            }],
            flex: 0.55,
            margin: '0 10 0 0'
        },
        {
            xtype: 'panel',
            itemId: 'panel-header-right',
            
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            
            defaults: {
                msgTarget: 'side',
                labelAlign: 'top',
                allowBlank: false
            },
            items: [{
                xtype: 'textareafield',
                name: 'uraian',
                itemId: 'uraian',
                fieldLabel: 'Keterangan',
                allowBlank: true,
                flex: 1 /*,
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            var me = this.up('kasbankmasuk-edit');
                            var btnTambah = me.down('#tambah');
                            btnTambah.fireEvent('click', btnTambah);
                        }
                    }
                }*/
            }],
            flex: 0.45,
            margin: '0 0 0 10'
        }]              
    },
    {
        xtype: 'panel',
        itemId: 'panel-detail',
        flex: 1,
        margin: '0 0 10 0',
        bodyStyle: 'background-color: #c5c5c5',
        bodyPadding: 1,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'bayarpenjualan-edit-detail',
            flex: 1
        }]
    },
    {
        xtype: 'panel',
        itemId: 'panel-footer',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            itemId: 'panel-footer-left',
            flex: 0.7
        }, {
            xtype: 'panel',
            itemId: 'panel-footer-right',
            flex: 0.3,
            
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'currencyfield',
                labelWidth: 70,
                margin: '5 0 0 0',
                readOnly: true,
                fieldStyle: 'font-weight: bold; text-align: right; background: none #F8F9F9;',
                labelStyle: 'font-weight: bold; text-align: right;',
                labelSeparator: '&nbsp;',
                value: 0
            },
            items: [{
                name: 'total',
                itemId:'total',
                fieldLabel: 'Total:&nbsp;&nbsp;&nbsp;'
            }]
        }],
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Batal',
                handler: 'onCancelButtonClick'
            },
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-green',
                text: 'Simpan',
                handler: 'onSaveButtonClick'
            }
        ]
    },

    setNobukti: function(kode) {
        var me = this;

        Ext.Ajax.request({
            method:'GET',
            url: './server/public/bayarpenjualan/getnobukti',
            params: {
                tipe: kode
            },
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                me.down('[name=nobukti]').setValue(json.nobukti);
                me.down('[name=nobukti]').focus(true, 10);
            }
        });
    }
});
