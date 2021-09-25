Ext.define('Admin.view.webdesktop.lemburreguler.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.lemburreguleredit',

    modulId: 'LM',
    layout: 'fit',
    border: false,

    title: 'Lembur Migas',
    
    width: 1024,
    height: 500,
    
    constructor: function(c) {
        var me = this;

        me.items = [{
            xtype: 'tabpanel',
            items: [{
                xtype: 'lemburregulerdetail',
                title: 'Lembur'                
            }]
        }];

        me.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();

        var me = this;
        me.down('lemburregulerdetail').down('#periode').setValue(new Date());
    }
});