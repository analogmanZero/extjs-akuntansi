Ext.define('Admin.view.webdesktop.jurnalmemorial.total', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.jurnalmemorialtotal',

    layout: 'fit',
    border : false,
    
    bodyPadding: 5,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'panel',
                //border: false,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [{
                    xtype: 'container',
                    flex: 1
                }, {
                    xtype: 'panel',
                    flex: 0.5,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 90,
                        allowBlank: true,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'currencyfield',
                        value: 0,
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold;',
                        name: 'totaldiskon',
                        itemId:'totaldiskon',
                        fieldLabel: 'Total Diskon',
                        readOnly: true,
                        selectOnFocus: true
                    }]
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    xtype: 'panel',
                    flex: 0.5,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 80,
                        allowBlank: true,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'currencyfield',
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold;',
                        value: 0,
                        name: 'subtotal',
                        itemId:'subtotal',
                        fieldLabel: 'Sub Total',
                        readOnly: true,
                        selectOnFocus: true
                    }, {
                        xtype: 'currencyfield',
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold;',
                        value: 0,
                        name: 'totalpajak',
                        itemId:'totalpajak',
                        fieldLabel: 'Total Pajak',
                        readOnly: true,
                        selectOnFocus: true
                    }, {
                        xtype: 'currencyfield',
                        value: 0,
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold;',
                        name: 'total',
                        itemId:'total',
                        fieldLabel: 'Total',
                        readOnly: true,
                        selectOnFocus: true
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

//        this.down('#totaldiskon').setReadOnly(act);
//        this.down('#totalpajak').setReadOnly(act);
//        this.down('#subtotal').setReadOnly(act);
//        this.down('#total').setReadOnly(act);
        
        if(act || this.isEdit) {
            
        } else {
            this.down('#totaldiskon').setValue(0);
            this.down('#totalpajak').setValue(0);
            this.down('#subtotal').setValue(0);
            this.down('#total').setValue(0);
        }
    },

    partnerChange: function(store, index) {
        return;
    },

    sodetailgridDataChaged: function(store) {
        return;
    }
});