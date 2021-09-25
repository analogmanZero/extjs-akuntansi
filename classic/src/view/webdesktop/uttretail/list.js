Ext.define('Admin.view.webdesktop.uttretail.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.uttretaillist',
    modulId: 'TR',
    
    
    layout: 'fit',
    border: false,

    title: 'Lembur Retail',
    
    width: 1024,
    height: 500,
    
    constructor: function(c) {
        var me = this;

        var hidden = []; 
        var grup_akses = c.grupAkses;
        for(var key in grup_akses) {
            hidden[grup_akses[key]['itemId']] = grup_akses[key]['fiturAkses']==null || grup_akses[key]['fiturAkses'].indexOf('Y')==-1;
        }
        
        me.items = [{
            xtype: 'tabpanel',
            items: [{
                xtype: 'uttretaillemburbackup',
                hidden: hidden['RB'],
                title: 'Lembur Backup'                
            }, {
                xtype: 'uttretaillemburph',
                hidden: hidden['RH'],
                title: 'Lembur PH'                
            }, {
                xtype: 'uttretaillemburspl',
                hidden: hidden['PL'],
                title: 'Lembur SPL'                
            }]
        }];

        me.callParent(arguments);
    }
});