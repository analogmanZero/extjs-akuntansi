Ext.define('Admin.view.webdesktop.laporan.akuntansi.all', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanakuntansiall',

	title: 'Laporan Semuanya',
    layout: 'fit',

    width: 970,
    height: 500,
	modulId: 'ALL',

    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
			items: [{
				xtype: 'tabpanel', 
				listeners: {
					tabchange: function(tabPanel, newCard, oldCard, eOpts) {
						var comp = me.down('comp_'+newCard.itemId);
						if(newCard.itemId=='bb')
							comp.update('<iframe src="native/gli/laporan_bb.php" style="height: 100%; width: 100%; border: none"></iframe>');
						if(newCard.itemId=='ns')
							comp.update('<iframe src="native/gli/laporan_neraca.php" style="height: 100%; width: 100%; border: none"></iframe>');
						if(newCard.itemId=='lr')
							comp.update('<iframe src="native/gli/cetak_rl_dagang.php" style="height: 100%; width: 100%; border: none"></iframe>');
						if(newCard.itemId=='pm')
							comp.update('<iframe src="native/gli/lap_modal.php" style="height: 100%; width: 100%; border: none"></iframe>');
						if(newCard.itemId=='n')
							comp.update('<iframe src="native/gli/cetak_neraca99.php" style="height: 100%; width: 100%; border: none"></iframe>');
					}					
				},
				items: [{
					xtype: 'panel',
					itemId: 'bb',
					title: '1. BUKU BESAR',
					layout: 'fit',
					items:[{
						xtype: 'component',
						itemId: 'comp_bb',
						html: '<iframe src="native/gli/laporan_bb.php" style="height: 100%; width: 100%; border: none"></iframe>'
						/*autoEl: {
							tag: 'iframe',
							style: 'height: 100%; width: 100%; border: none',
							src: 'native/gli/laporan_bb.php?id='+notrx  
						}*/
					}]
				}, {
					xtype: 'panel',
					itemId: 'ns',
					title: '2. NERACA SALDO',
					layout: 'fit',
					items:[{
						xtype: 'component',
						itemId: 'comp_ns',
						html: '<iframe src="native/gli/laporan_neraca.php" style="height: 100%; width: 100%; border: none"></iframe>'
						/*autoEl: {
							tag: 'iframe',
							style: 'height: 100%; width: 100%; border: none',
							src: 'native/gli/laporan_neraca.php?id='+notrx  
						}*/
					}]
				}, {
					xtype: 'panel',
					itemId: 'lr',
					title: '3. LABA RUGI',
					layout: 'fit',
					items:[{
						xtype: 'component',
						itemId: 'comp_lr',
						html: '<iframe src="native/gli/cetak_rl_dagang.php" style="height: 100%; width: 100%; border: none"></iframe>'
						/*autoEl: {
							tag: 'iframe',
							style: 'height: 100%; width: 100%; border: none',
							src: 'native/gli/cetak_rl_dagang.php?id='+notrx  
						}*/
					}]
				},{
					xtype: 'panel',
					itemId: 'pm',
					title: '4. PERUBAHAN MODAL',
					layout: 'fit',
					items:[{
						xtype: 'component',
						itemId: 'comp_pm',
						html: '<iframe src="native/gli/lap_modal.php" style="height: 100%; width: 100%; border: none"></iframe>'
						/*autoEl: {
							tag: 'iframe',
							style: 'height: 100%; width: 100%; border: none',
							src: 'native/gli/lap_modal.php?id='+notrx  
						}*/
					}]
				},{
					xtype: 'panel',
					itemId: 'n',
					title: '5. NERACA',
					layout: 'fit',
					items:[{
						xtype: 'component',
						itemId: 'comp_n',
						html: '<iframe src="native/gli/cetak_neraca99.php" style="height: 100%; width: 100%; border: none"></iframe>'
						/*autoEl: {
							tag: 'iframe',
							style: 'height: 100%; width: 100%; border: none',
							src: 'native/gli/cetak_neraca99.php?id='+notrx  
						}*/
					}]
				}]
			}]
        });

        me.callParent(arguments);
    }
});