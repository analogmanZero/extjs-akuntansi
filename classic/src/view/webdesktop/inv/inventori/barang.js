Ext.define('Admin.view.webdesktop.inv.inventori.barang', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.inventoribarang',

    border: false,
    layout: 'anchor',
    bodyPadding: 10,

    defaults: {
        labelWidth: 150,
        anchor: '100%'
    },

    constructor: function(c) {
        var me = this;

        var storeSatuan = Ext.create('Admin.store.stores', {
            fields: ['id'],
            url: 'api/store/unitStore.php',
            autoLoad: true
        });

        me.items = [{
            xtype: 'fieldcontainer',
            fieldLabel: 'Tipe Barang',
            defaultType: 'radiofield',
            defaults: {
                readOnly: c.editHarga,
                flex: 1
            },
            layout: 'hbox',
            items: [{
                boxLabel  : 'Inventori',
                name      : 'idTipe',
                inputValue: '1',
                itemId 	  : 'radio1',
                checked   : true
            }, {
                boxLabel  : 'Jasa',
                name      : 'idTipe',
                inputValue: '2',
                itemId    : 'radio2'
            }, {
                boxLabel  : 'Olahan',
                name      : 'idTipe',
                inputValue: '5',
                itemId 	  : 'radio3'
            }, {
                boxLabel  : 'Bahan Baku',
                name      : 'idTipe',
                inputValue: '4',
                itemId 	  : 'radio4'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Kepemilikan',
            items: [{
                xtype: 'checkbox',
                inputValue: 'Y',
                flex: 1,
                name: 'serial',
                boxLabel: 'Nomer Seri',
                listeners: {
                    change: function(c) {
                        if(c.getValue()) {
                            me.down('[name=batchno]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'checkbox',
                inputValue: 'Y',
                flex: 1,
                name: 'batchno',
                boxLabel: 'Nomer Batch',
                listeners: {
                    change: function(c) {
                        if(c.getValue()) {
                            me.down('[name=serial]').setValue(false);
                        } else {
                            me.down('[name=expire_date]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'checkbox',
                inputValue: 'Y',
                flex: 1,
                name: 'expire_date',
                boxLabel: 'Tanggal Kadarluarsa',
                listeners: {
                    change: function(c) {
                        if(c.getValue()) {
                            me.down('[name=batchno]').setValue(true);
                        } else {
                            me.down('[name=expire_date]').setValue(false);
                        }
                    }
                }
            }]
        }, {
            xtype: 'textfield',
            maskRe: /([a-zA-Z0-9.-]+)$/,
            readOnly: c.editHarga,
            disabled: c.isEdit,
            fieldLabel: 'ID Barang',
            value: 'Auto',
            name:'id',
            itemId: 'id',
            maxLength: 20,
            listeners : {
                change: function(e) {
                    me.up('inventoriedit').down('[name=labelidinventori]').setValue(e.getValue());
                }
            }
        }, {
            xtype: 'textfield',
            maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
            readOnly: c.editHarga,
            fieldLabel: 'Keterangan',
            name:'nama',
            maxLength: 50,
            listeners : {
                change: function(e) {
                    me.up('inventoriedit').down('[name=labelnamainventori]').setValue(e.getValue());
                }
            }
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Unit 1 ',
            items: [{
                xtype: 'combobox',
                flex: 1,
                name: 'unit1',
                store: storeSatuan,
                valueField: 'id',
                displayField: 'id',
                queryMode: 'local',
                typeAhead: true,
                listeners: {
                    change: function(e) {
                        var val = e.getValue()==''?'Unit 1':e.getValue();
                        me.down('#lbl_unit_2').setText(val);
                        me.down('#lbl_unit_3').setText(val);
                        me.down('#satkecil').setText(val);
                        me.up('inventoriedit').down('#tabhargajual').items.getAt(0).setTitle(val);
                        me.up('inventoriedit').down('[name=labelsatuan]').setValue(e.getValue());

                        me.up('inventoriedit').down('inventorihargabeli').columns[1].setText('Harga ' + val);
                        me.up('inventoriedit').down('inventorihargabeli').columns[4].setText('Diskon ' + val);
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }, {
                xtype: 'container',
                flex: 1
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'container',
                flex: 1
            }, {
                xtype: 'checkbox',
                flex: 1,
                checked: true,
                name: 'satuan_jual_1',
                boxLabel: 'Satuan Jual',
                listeners: {
                    change: function(c) {

                        if(c.getValue()) {
                            me.down('[name=satuan_jual_2]').setValue(false);
                            me.down('[name=satuan_jual_3]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }, {
                xtype: 'checkbox',
                flex: 1,
                checked: true,
                name: 'satuan_beli_1',
                boxLabel: 'Satuan Beli',
                listeners: {
                    change: function(c) {                        
                        if(c.getValue()) {
                            me.down('[name=satuan_beli_2]').setValue(false);
                            me.down('[name=satuan_beli_3]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Unit 2 ',
            items: [{
                xtype: 'combobox',
                readOnly: c.editHarga,
                flex: 1,
                name: 'unit2',
                store: storeSatuan,
                valueField: 'id',
                displayField: 'id',
                queryMode: 'local',
                typeAhead: true,
                listeners: {
                    change: function(e) {
                        var val = e.getValue()==''?'Unit 2':e.getValue();
                        me.up('inventoriedit').down('#tabhargajual').items.getAt(1).setTitle(val);

                        me.up('inventoriedit').down('inventorihargabeli').columns[2].setText('Harga ' + val);
                        me.up('inventoriedit').down('inventorihargabeli').columns[5].setText('Diskon ' + val);
                    }
                }
            } , {
                xtype: 'label',
                style: 'text-align: center;',
                width: 20,
                text: '='
            }, {
                xtype: 'currencyfield',
                readOnly: c.editHarga,
                name:'jmlKonvSat2',
                flex: 1,
                maxLength: 66,
                fieldStyle: 'text-align: right;',
                value: '0'
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'label',
                itemId: 'lbl_unit_2',
                style: 'font-weight: bold; font-style:italic;',
                text: 'Unit 1',
                flex: 1
            }, {
                xtype: 'checkbox',
                flex: 1,
                name: 'satuan_jual_2',
                boxLabel: 'Satuan Jual',
                listeners: {
                    change: function(c) {
                        if(c.getValue()) {
                            me.down('[name=satuan_jual_1]').setValue(false);
                            me.down('[name=satuan_jual_3]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }, {
                xtype: 'checkbox',
                flex: 1,
                name: 'satuan_beli_2',
                boxLabel: 'Satuan Beli',
                listeners: {
                    change: function(c) {
                        if(c.getValue()) {
                            me.down('[name=satuan_beli_1]').setValue(false);
                            me.down('[name=satuan_beli_3]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Unit 3 ',
            items: [{
                xtype: 'combobox',
                readOnly: c.editHarga,
                flex: 1,
                name: 'unit3',
                store: storeSatuan,
                valueField: 'id',
                displayField: 'id',
                queryMode: 'local',
                typeAhead: true,
                listeners: {
                    change: function(e) {
                        var val = e.getValue()==''?'Unit 3':e.getValue();
                        me.up('inventoriedit').down('#tabhargajual').items.getAt(2).setTitle(val);

                        me.up('inventoriedit').down('inventorihargabeli').columns[3].setText('Harga ' + val);
                        me.up('inventoriedit').down('inventorihargabeli').columns[6].setText('Diskon ' + val);
                    }
                }
            }, {
                xtype: 'label',
                style: 'text-align: center;',
                width: 20,
                text: '='
            }, {
                xtype: 'currencyfield',
                readOnly: c.editHarga,
                name:'jmlKonvSat3',
                flex: 1,
                maxLength: 66,
                fieldStyle: 'text-align: right;',
                value: '0'
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'label',
                itemId: 'lbl_unit_3',
                style: 'font-weight: bold; font-style:italic;',
                text: 'Unit 1',
                flex: 1
            }, {
                xtype: 'checkbox',
                flex: 1,
                name: 'satuan_jual_3',
                boxLabel: 'Satuan Jual',
                listeners: {
                    change: function(c) {
                        if(c.getValue()) {
                            me.down('[name=satuan_jual_1]').setValue(false);
                            me.down('[name=satuan_jual_2]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }, {
                xtype: 'checkbox',
                flex: 1,
                name: 'satuan_beli_3',
                boxLabel: 'Satuan Beli',
                listeners: {
                    change: function(c) {                        
                        if(c.getValue()) {
                            me.down('[name=satuan_beli_1]').setValue(false);
                            me.down('[name=satuan_beli_2]').setValue(false);
                        }
                    }
                }
            }, {
                xtype: 'container',
                width: 20
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Kode Pajak Beli',
            items: [{
                xtype: 'textfield',
                readOnly: c.editHarga,
                name:'pjkBeli',
                itemId: 'pjkBeli',
                maxLength: 6,
                flex: 1
            }, {
                xtype: 'container',
                width: 70
            }, {
                xtype: 'container',
                flex: 4
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Kode Pajak Jual',
            items: [{
                xtype: 'textfield',
                readOnly: c.editHarga,
                name:'pjkJual',
                itemId: 'idPjkJual',
                maxLength: 6,
                flex: 1
            }, {
                xtype: 'container',
                width: 70
            }, {
                xtype: 'container',
                flex: 4
            }]
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Pakai di Transaksi',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [{
                xtype: 'checkboxfield',
                readOnly: c.editHarga,
                name: 'jual',
                checked: true,
                boxLabel: 'Jual',
                flex: 0.5
            }, {
                xtype: 'checkboxfield',
                readOnly: c.editHarga,
                name: 'beli',
                checked: true,
                boxLabel: 'Beli',
                flex: 0.5
            }, {
                xtype: 'container',
                flex: 1
            }]
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Minimal Stock',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items:[{
                xtype: 'currencyfield',
                readOnly: c.editHarga,
                name:'minimalstock',
                flex: 1,
                maxLength: 66,
                fieldStyle: 'text-align: right;',
                value: '0'
            }, {
                xtype: 'container',
                width: 10
            }, {
                xtype: 'label',
                style: 'font-weight: bold; font-style:italic;',
                text: 'Unit 1',
                itemId: 'satkecil',
                flex: 4
            }, {
                xtype: 'container',
                width: 60
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Merek',
            items: [{
                xtype: 'newAutoComplete',
                readOnly: c.editHarga,
                flex: 0.8,
                name: 'merek',
                isInitValue: c.isEdit,
                fields: ['kode', 'nama'],
                url: 'api/store/merekStore.php',
                valueField: 'kode',
                displayField: 'nama',
                textTpl: '{nama}'
            }, {
               xtype: 'container',
               width: 20
            }, {
                xtype: 'newAutoComplete',
                readOnly: c.editHarga,
                labelWidth: 60,
                flex: 1,
                name: 'model',
                isInitValue: c.isEdit,
                fieldLabel: 'Model',
                fields: ['kode', 'nama'],
                url: 'api/store/modelStore.php',
                valueField: 'kode',
                displayField: 'nama',
                textTpl: '{nama}'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Group 1',
            items: [{
                xtype: 'newAutoComplete',
                readOnly: c.editHarga,
                flex: 0.8,
                name: 'group',
                isInitValue: c.isEdit,
                fields: ['kode', 'nama', 'display'],
                url: 'api/store/groupStore.php',
                valueField: 'kode',
                displayField: 'display',
                textTpl: '{nama}'
            }, {
               xtype: 'container',
               width: 20
            }, {
                xtype: 'newAutoComplete',
                readOnly: c.editHarga,
                labelWidth: 60,
                flex: 1,
                name: 'group_1',
                isInitValue: c.isEdit,
                fieldLabel: 'Group 2',
                fields: ['kode', 'nama', 'display'],
                url: 'api/store/groupStore.php',
                valueField: 'kode',
                displayField: 'display',
                textTpl: '{nama}'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            fieldLabel: 'Group 3',
                items: [{
                xtype: 'newAutoComplete',
                readOnly: c.editHarga,
                flex: 0.8,
                name: 'group_2',
                isInitValue: c.isEdit,
                fields: ['kode', 'nama', 'display'],
                url: 'api/store/groupStore.php',
                valueField: 'kode',
                displayField: 'display',
                textTpl: '{nama}'
            }, {
               xtype: 'container',
               width: 20
            }, {
                xtype: 'newAutoComplete',
                readOnly: c.editHarga,
                labelWidth: 60,
                flex: 1,
                name: 'group_3',
                isInitValue: c.isEdit,
                fieldLabel: 'Group 4',
                fields: ['kode', 'nama', 'display'],
                url: 'api/store/groupStore.php',
                valueField: 'kode',
                displayField: 'display',
                textTpl: '{nama}'
            }]
        }];

        this.callParent(arguments);
    }
});

