Ext.define('Admin.view.webdesktop.gajiprorate.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.gajiproratelist',
    modulId: 'PR',

    layout: 'fit',
    border: false,

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
                xtype: 'gajiproratedetail',
                hidden: hidden['PR'],
                title: 'Gaji Prorate'                
            }, {
                xtype: 'gajiproraterapel',
                hidden: hidden['RL'],
                title: 'Gaji Rapel'                
            }]
        }];

        me.callParent(arguments);
    }
});