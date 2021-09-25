Ext.define('Admin.view.webdesktop.lemburbackup.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.lemburbackupedit',

    modulId: 'LB',
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
                xtype: 'lemburbackupheader',
                isEdit: c.isEdit
            }, {
                xtype: 'panel',
                border: false,
                flex: 1,
                layout: 'fit',
                bodyPadding: 5,
                items: [{
                    xtype: 'lemburbackupdetail',
                    isEdit: c.isEdit                            
                }]
            }, {
                xtype: 'lemburbackuptombol',
                isEdit: c.isEdit
            }]
        });

        me.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        me.down('lemburbackupheader').down('#periode').setValue(new Date());
    }
});