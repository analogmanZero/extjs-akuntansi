Ext.define('Admin.view.webdesktop.inv.inventori.grafikinventoritertentu', {

    extend: 'Ext.panel.Panel',
    alias : ['widget.grafikinventoritertentu', 'widget.grafikinventori3'],
    layout: 'fit',

    title: 'Grafik inventori Tertentu',
    
    constructor: function(c) {
        var me = this;

        me.store = Ext.create('Admin.store.stores', {
            fields: ['bulan', 'penjualan', 'pembelian'],
            url: 'api/store/inventori/grafikinventoritertentu.php'
        });

            
        me.tbar = [{
            xtype: 'container',
            layout: 'vbox',
            items:[{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'cabangfield',                    
                    name: 'cabang',
                    labelWidth: 30,
                    width: 125,
                    fieldLabel: 'Cbg.'
                },{
                    xtype: 'monthfield',
                    name: 'dari',
                    format: 'm-Y',
                    labelWidth: 25,
                    width: 125,
                    fieldLabel: '&nbsp;&nbsp;Bln.'
                }, {
                    xtype: 'monthfield',
                    name: 'sd',
                    format: 'm-Y',
                    labelWidth: 22,
                    width: 122,
                    fieldLabel: '&nbsp;&nbsp;s/d'
                }]
            }, {
               xtype: 'container',
               height: 3
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'newAutoComplete',
                    name: 'inventori',
                    itemId: 'inventori',
                    fieldLabel: 'Item',
                    fields: ['id','nama'],
                    url: 'api/store/barangStore.php',
                    valueField: 'id',
                    displayField: 'nama',
                    textTpl: '<tr><td>{id}</td><td>&nbsp;-&nbsp;</td><td>{nama}</td></tr>',
                    labelWidth: 35,
                    flex: 1
                }, {
                    xtype: 'combobox',
                    store: Ext.create('Admin.store.stores', {
                        fields: ['satuan', 'harga', 'diskon'],
                        url: 'api/store/satuanStore.php'
                    }),
                    valueField: 'satuan',
                    displayField: 'satuan',
                    queryMode: 'local',
                    typeAhead: true,
                    itemId: 'satuan',
                    name: 'satuan',
                    listeners: {
                        expand: function() {
                            if(!this.loadOnExpand) {
                                this.getStore().loadPage(1);
                                this.loadOnExpand = true;
                            }
                        }
                    },
                    labelWidth: 40,
                    width: 110,
                    fieldLabel: '&nbsp;Satuan'
                }, {
                    xtype: 'container',
                    width: 20
                }, {
                    xtype: 'button',
                    text: 'Export Excel',
                    action: 'export'
                }]
            }]
            
        }];


        me.items = Ext.create('Admin.view.webdesktop.laporan.grafik.batangganda', {
            stores: me.store,

            
            //SUMBU Y
            yTitle: 'Qty Penjulan & Pembelian',
            yField: ['penjualan','pembelian'],
            yFieldArray: ['penjualan','pembelian'],

            //SUMBU X
            xTitle: 'Bulan',
            xField: 'bulan',
            xFieldArray: ['bulan']

        });

        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store
        });

        me.callParent(arguments);

    }
});