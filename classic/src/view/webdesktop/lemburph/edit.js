Ext.define('Admin.view.webdesktop.lemburph.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.lemburphedit',

    modulId: 'LP',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    width: 1024,
    height: 500,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'lemburphheader',
                isEdit: c.isEdit
            }, {
                xtype: 'panel',
                border: false,
                flex: 1,
                layout: 'fit',
                bodyPadding: 5,
                items: [{
                    xtype: 'lemburphdetail',
                    isEdit: c.isEdit                            
                }]
            }, {
                xtype: 'lemburphtombol',
                isEdit: c.isEdit
            }]            
        });

        me.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        me.down('lemburphheader').down('#periode').setValue(new Date());
    }
});