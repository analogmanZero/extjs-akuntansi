Ext.define('Admin.view.webdesktop.inv.rolltoroll.wasted', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.invrolltorollwasted',

    layout: 'fit',
    border : false,
    
    //bodyPadding: 5,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'panel',
                border: false,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                //bodyPadding: 5,
                items: [{
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 125,
                        allowBlank: true,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;',
                        flex: 1.4,
                        name: 'wasted',
                        itemId:'wasted',
                        fieldLabel: 'Wasted (KG)',
                        readOnly: true,
                        selectOnFocus: true,
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                if (e.getKey() == e.ENTER) {
                                    me.down('#core').focus(true, 10);
                                }
                            }
                        }
                    }]
                },{
                    xtype: 'container',
                    width: 10
                }, {
                    xtype: 'container',
                    flex: 1
                }]
            }]    
        });
        
        me.callParent(arguments);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {

        this.down('#wasted').setReadOnly(act);
        
        if(act || this.isEdit) {
            
        } else {
            this.down('#wasted').setValue(0);
        }
    },

    partnerChange: function(store, index) {
        return;
    },

    sodetailgridDataChaged: function(store) {
        return;
    }
});