Ext.define('Admin.view.webdesktop.uanghadir.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.uanghadirlist',
    modulId: 'MU',
    
    layout: 'fit',
    border: false,

    title: 'Uang Hadir',
    
    width: 1024,
    height: 500,
    
    constructor: function(c) {
        var me = this;
        
        me.items = [{            
            xtype: 'uanghadirdetail'
        }];

        me.callParent(arguments);
    }
});