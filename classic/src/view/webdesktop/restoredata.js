Ext.define('Admin.view.webdesktop.restoredata', {

    extend: 'Ext.window.Window',
    alias : 'widget.restoredata',

    title: 'Restore Data',
    layout: 'fit',
    modal: true,
    width: 400,
    height: 170,

    initComponent: function() {
        var me = this;

        me.items = [{

            xtype: 'form',
            layout: 'anchor',
            bodyPadding: 10,
            
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Sumber Restore',
                defaultType: 'radiofield',
                layout: 'hbox',
                items: [{
                    xtype: 'radiofield',
                    boxLabel: 'Dari file backup.',
                    name : 'sumber',
                    inputValue: 'F',
                    checked   : true,
                    flex: 1
                }, {
                    xtype: 'radiofield',
                    boxLabel: 'Dari server.',
                    name : 'sumber',
                    inputValue: 'S',
                    checked: false,
                    flex: 1,
                    listeners : {
                        change: function(e) {
                            me.down('#filename').setDisabled(e.getValue());
                        }
                    }
                }]
            }, {
               xtype: 'container',
               height: 10
            }, {
                xtype: 'filefield',
                name: 'filename',
                itemId: 'filename',
                fieldLabel: 'Nama File',
                emptyText: 'Pilih file ...',
                anchor: '100%'
            }, {
                xtype: 'container',
                height: 15
            }, {
                xtype: 'container',
                height: 24,
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                items: [{
                    xtype: 'container',
                    flex: 1
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Proses',
                    action: 'proses'
                }, {
                    xtype: 'container',
                    width: 5
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Batal',
                    scope: this,
                    handler: this.close
                }]
            }]
        }];
        me.callParent(arguments);
    }
});