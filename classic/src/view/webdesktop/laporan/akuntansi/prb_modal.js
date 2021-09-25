Ext.define('Admin.view.webdesktop.laporan.akuntansi.prb_modal', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanakuntansiprb_modal',

	title: 'Laporan Perubahan Modal',
    layout: 'fit',

    width: 970,
    height: 500,
	modulId: 'L4',

    constructor: function(c) {
        var me = this;
		var notrx = '123';

        Ext.apply(c, {	
            items: [{
				xtype: 'panel',
				layout: 'fit',
				items:[{
					xtype: 'component',
					autoEl: {
						tag: 'iframe',
						style: 'height: 100%; width: 100%; border: none',
						src: 'native/gli/lap_modal.php?id='+notrx  
					}
				}]
			}]
        });

        me.callParent(arguments);
    }
});