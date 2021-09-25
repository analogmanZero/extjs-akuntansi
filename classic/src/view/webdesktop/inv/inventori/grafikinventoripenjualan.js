Ext.define('Admin.view.webdesktop.inv.inventori.grafikinventoripenjualan', {

    extend: 'Ext.panel.Panel',
    alias : ['widget.grafikinventoripenjualan', 'widget.grafikinventori1'],
    layout: 'fit',

    title: 'Grafik Qty Terhadap Penjualan',
    
    constructor: function(c) {
        var me = this;

        me.store = Ext.create('Admin.store.stores', {
            fields: ['item', 'qty'],
            url: 'api/store/inventori/grafikinventoripenjualan.php'
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
                    xtype: 'datefield',
                    name: 'dari',
                    format: 'd-m-Y',
                    labelWidth: 25,
                    width: 125,
                    fieldLabel: '&nbsp;&nbsp;Tgl.'
                }, {
                    xtype: 'datefield',
                    name: 'sd',
                    format: 'd-m-Y',
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
                    xtype: 'numberfield',
                    name: 'jumlah',
                    labelWidth: 90,
                    width: 140,
                    fieldLabel: 'Jum. Inventori'
                }, {
                    xtype: 'container',
                    width: 20
                }, {
                    xtype     : 'radiofield',
                    boxLabel  : 'Terbesar',
                    name      : 'desc',
                    inputValue: 'B',
                    itemId    : 'B',
                    checked   : true
                }, {
                    xtype: 'container',
                    width: 10
                }, {
                    xtype     : 'radiofield',
                    boxLabel  : 'Terkecil',
                    name      : 'desc',
                    inputValue: 'K',
                    itemId    : 'K'
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


        me.items = Ext.create('Admin.view.webdesktop.laporan.grafik.batang', {
            stores: me.store,
            
            //SUMBU Y
            yTitle: 'Qty Penjualan',
            yField: 'qty',
            yFieldArray: ['qty'],

            //SUMBU X
            xTitle: 'Item',
            xField: 'item',
            xFieldArray: ['item']

        });

        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store
        });

        me.callParent(arguments);

    }
});