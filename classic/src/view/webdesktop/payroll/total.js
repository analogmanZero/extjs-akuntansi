Ext.define('Admin.view.webdesktop.payroll.total', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.payrolltotal',

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
                    flex: 1.5
                }, {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 120,
                        allowBlank: true,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'currencyfield',
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold;',
                        value: 0,
                        name: 'grandtotal',
                        itemId:'grandtotal',
                        fieldLabel: 'Total Anggaran:',
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
        if(act || this.isEdit) {
            
        } else {
            this.down('#grandtotal').setValue(0);
        }
    },

    partnerChange: function(store, index) {
        return;
    },

    sodetailgridDataChaged: function(store) {
        return;
    }
});