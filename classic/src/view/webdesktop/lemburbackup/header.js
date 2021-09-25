Ext.define('Admin.view.webdesktop.lemburbackup.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.lemburbackupheader',

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
                                me.up('window').down('lemburbackuptombol').down('#tambah').focus(true, 10);
                            }
                        },
                        change: function() {
                            me.up('window').down('lemburbackupdetail').transaksiBaru();
                            me.up('window').down('lemburbackupdetail').loadDataStore(me.down('#periode').getSubmitValue());
                            me.up('window').down('lemburbackuptombol').suksesSimpan();
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