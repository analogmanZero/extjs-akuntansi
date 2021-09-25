Ext.define('Admin.view.webdesktop.potongan.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.potonganlist',
    modulId: 'PO',
    
    layout: 'fit',
    border: false,

    title: 'Potongan',
    
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
                xtype: 'potonganabsen',
                hidden: hidden['TA'],
                title: 'Absen [RETAIL]'                
            }, {
                xtype: 'potonganktadiksar',
                hidden: hidden['JK'],
                title: 'KTA & DIKSAR'                
            }, {
                xtype: 'potongansp',
                hidden: hidden['TS'],
                title: 'SP'                
            }, {
                xtype: 'potonganseragam',
                hidden: hidden['TG'],
                title: 'Seragam'                
            }, {
                xtype: 'potonganlainlain',
                hidden: hidden['TL'],
                title: 'Lain-lain'                
            }, {
                xtype: 'potonganbpjs',
                hidden: hidden['TB'],
                title: 'BPJS Kes.'
            }, {
                xtype: 'potonganbpjstkjp',
                hidden: hidden['TT'],
                title: 'BPJS TKJP'
            }, {
                xtype: 'potonganpph21',
                hidden: hidden['TJ'],
                title: 'PPH 21'
            }]
        }];
        
        this.callParent(arguments);
    }
});