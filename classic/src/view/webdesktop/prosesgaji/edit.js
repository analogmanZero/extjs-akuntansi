Ext.define('Admin.view.webdesktop.prosesgaji.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.prosesgajiedit',

    modulId: 'PG',
    flex: 1,
    layout: 'fit',
    bodyPadding: 5,
    border: false,

    width: 1024,
    height: 500,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'prosesgajidetail',
                isEdit: c.isEdit                            
            }]
        });

        me.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        me.down('prosesgajidetail').down('#periode').setValue(new Date());
    }
});