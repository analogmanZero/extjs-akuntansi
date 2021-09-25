Ext.define('Admin.view.webdesktop.uttmigas.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.uttmigaslist',
    modulId: 'TM',
    
    layout: 'fit',
    border: false,

    title: 'Lembur Migas',
    
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
                xtype: 'uttmigaslemburreguler',
                hidden: hidden['MR'],
                title: 'Lembur Reguler'                
            }, {
                xtype: 'uttmigaslemburbackup',
                hidden: hidden['MB'],
                title: 'Lembur Backup'                
            }, {
                xtype: 'uttmigaslemburph',
                hidden: hidden['MH'],
                title: 'Lembur PH'                
            }]
        }];

        me.callParent(arguments);
    }
});