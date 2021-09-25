Ext.define('Admin.view.webdesktop.payroll.list', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.payrolllist',
    modulId: 'KG',
    
    layout: 'fit',
    border: false,

    title: 'Komponen Gaji',

    width: 1000,
    height: 500,

    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();

        me.items = [{
            xtype: 'payrolldefault'
        }];
        
        this.callParent(arguments);
    },

    afterRender: function() {
        this.callParent();
        var me = this;

        me.down('payrolldefault').loaddetail();
    }

});