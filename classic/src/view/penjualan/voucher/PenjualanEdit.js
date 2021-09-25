Ext.define('Admin.view.penjualan.voucher.PenjualanEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'penjualan-voucher-edit',

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
                    name: 'notrx',
                    itemId:'notrx',
                    fieldLabel: 'No. Transaksi',
                    msgTarget: 'side',
                    labelAlign: 'left',
                    allowBlank: false,
                    labelWidth: 100,
                    flex: 0.6,
                    margin: '0 10 0 0',
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                var me = this.up('penjualan-voucher-edit');
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
                    flex: 0.4,
                    listeners: {
                        specialkey: function(field, e) {
                            if (e.getKey() == e.ENTER) {
                                var me = this.up('penjualan-voucher-edit');
                                me.down('#customer').focus(true, 10);
                            }
                        }
                    }
                }]
            }, 
            {
                xtype: 'combobox',
                name: 'id_customer',
                itemId: 'customer',
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
                            var me = this.up('penjualan-voucher-edit');
                            me.down('#no_so').focus(true, 10);
                        }
                    }
                }       
            },
            {
                xtype: 'textfield',
                name: 'no_so',
                itemId:'no_so',
                fieldLabel: 'No. SO',
                allowBlank: true,
                listeners: {
                    
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            var me = this.up('penjualan-voucher-edit');
                            me.down('#keterangan').focus(true, 10);
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
                name: 'keterangan',
                itemId: 'keterangan',
                fieldLabel: 'Keterangan',
                allowBlank: true,
                flex: 1 /*,
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() == e.ENTER) {
                            var me = this.up('penjualan-voucher-edit');
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
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'penjualan-voucher-edit-detail',
            flex: 1
        }],
        flex: 1,
        bodyStyle: 'background-color: #c5c5c5',
        bodyPadding: 1,
        margin: '0 0 10 0'
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
                labelWidth: 90,
                margin: '5 0 0 0',
                readOnly: true,
                fieldStyle: 'font-weight: bold; text-align: right; background: none #F8F9F9;',
                labelStyle: 'font-weight: bold;',
                value: 0
            },
            items: [{
                name: 'subtotal',
                itemId:'subtotal',
                fieldLabel: 'Sub Total'
            }, {
                name: 'totalpajak',
                itemId:'totalpajak',
                fieldLabel: 'Pajak'
            }, {
                name: 'total',
                itemId:'total',
                fieldLabel: 'Total'
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
    }
});
