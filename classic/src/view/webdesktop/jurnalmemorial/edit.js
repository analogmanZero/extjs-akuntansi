Ext.define('Admin.view.webdesktop.jurnalmemorial.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.jurnalmemorialedit',

    layout: 'fit',

    width: 1024,
    height: 500,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'form',
                layout: {
                    align: 'stretch',
                    type: 'vbox'
                },
                flex: 1,
                border: false,
                reader: new Ext.data.JsonReader({
                    model: 'Admin.model.jurnalmemorial.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'jurnalmemorialheader',
                    isEdit: c.isEdit
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'jurnalmemorialdetail',
                        isEdit: c.isEdit                            
                    }]
                }, {
                    xtype: 'jurnalmemorialtombol',
                    isEdit: c.isEdit
                }]
            }]
        });

        me.callParent(arguments);
    },
    
    show: function() {
        this.callParent();
        
        var me = this;
        if(me.isEdit!=undefined) {
            setTimeout(function() {
                //me.maximize();
                var form = me.down('form');
                form.getForm().waitMsgTarget = me.getEl();
                form.getForm().load({
                    params: {nobukti: me.isEdit},
                    url: 'api/store/jurnalmemorial/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData;
                        me.down('jurnalmemorialdetail').getStore().loadRawData(json.details);
                        me.down('jurnalmemorialheader').transaksiBaru();
                        me.down('jurnalmemorialtombol').transaksiBaru();                        
                    }
                });            
            }, 750);        
        }                
    }
});