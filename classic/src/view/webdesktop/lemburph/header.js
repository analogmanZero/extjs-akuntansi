Ext.define('Admin.view.webdesktop.lemburph.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.lemburphheader',

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
                    xtype: 'monthfield',
                    name: 'periode',
                    itemId: 'periode',
                    fieldLabel: 'Gaji Bulan',
                    labelStyle: 'text-align: center;',
                    labelWidth: 100,
                    format: 'm-Y',
                    submitFormat: 'Y-m',
                    msgTarget: 'side',
                    allowBlank: false,
                    width: 260,
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.up('window').down('lemburphtombol').down('#tambah').focus(true, 10);
                            }
                        },
                        change: function() {
                            me.up('window').down('lemburphdetail').transaksiBaru();
                            me.up('window').down('lemburphdetail').loadDataStore(me.down('#periode').getSubmitValue());
                            me.up('window').down('lemburphtombol').suksesSimpan();
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    xtype: 'panel',
                    bodyPadding: 10,
                    border: false,
                    flex: 3
                }]
            }]    
        });

        me.callParent(arguments);
    }
});