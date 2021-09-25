Ext.define('Admin.view.webdesktop.jurnalumum.list', {

    extend: 'Ext.window.Window',
    alias : 'widget.jurnalumumlist',

    layout: 'fit',
    width: 900,
    height: 500,

    modulId: 'JU',
    title: 'Jurnal Umum',

    constructor: function(config) {
        var me = this;

        me.func = new Admin.view.currency();
	
        Ext.apply(config, {
            tbar: [{
                xtype: 'datefield',
                name: 'from',
                fieldLabel: 'Tanggal',
                labelWidth: 55,
                width: 170,
                value: new Date(),
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                listeners: {
                    change: function(d) {
                        var store = me.down('plgrid').getStore(),
                            proxy = store.getProxy();

                        proxy.extraParams['from'] = d.getSubmitValue();
                        store.loadPage(1);
                    }
                }
            }, {
                xtype: 'datefield',
                name: 'to',
                fieldLabel: 'sd.',
                labelWidth: 30,
                labelSeparator: '&nbsp;',
                labelStyle: 'text-align: center;',
                width: 145,
                value: new Date(),
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                listeners: {
                    change: function(d) {
                        var store = me.down('plgrid').getStore(),
                            proxy = store.getProxy();

                        proxy.extraParams['to'] = d.getSubmitValue();
                        store.loadPage(1);
                    }
                }
            }],
            items: [{
                xtype: 'plgrid',                 
                store: Ext.create('Admin.store.stores', {
                    fields: ['id', 'tanggal', 'nobukti', 'kd', 'kk', 'keterangan', 'jumlah', 'jenis', 'tipe_jurnal'],
                    url: 'api/store/jurnalumum/dataStore.php'
                }),
                features: [{
                    ftype: 'summary',
                    dock: 'bottom',
                    layout:'fit'
                }],
                columns: [
                    {text: 'No.', width: 55, sortable: true, align: 'center', renderer: function(v,p,r) {
                            var store = me.down('plgrid').getStore();
                            var page = store.currentPage;
                            var index = store.indexOf(r);
                            var limit = store.pageSize;

                            return ((page-1)*limit)+index+1;
                    }},
                    {text: 'No. Bukti', flex: 0.3, sortable: true, align: 'center', dataIndex: 'nobukti'},
                    {text: 'Tanggal', flex: 0.5, sortable: true, align: 'center', dataIndex: 'tanggal'},
                    //{text: 'KD', flex: 0.3, sortable: true, align: 'center', dataIndex: 'kd'},
                    {text: 'Debet/Kredit', flex: 0.4, sortable: true, align: 'center', dataIndex: 'jenis'},
                    {text: 'Keterangan', flex: 1, sortable: true, dataIndex: 'keterangan'},
                    {text: 'Jumlah', flex: 0.4, sortable: true, align: 'right', dataIndex: 'jumlah', renderer: function(v,p,r) {
                            return me.func.currency(v);
                        }, summaryRenderer: function() {
                            var json = me.down('plgrid').getStore().getProxy().reader.jsonData;
                            if(!json) return '<B>0</B>';

                            var total = json.sum_total;
                            if(!total) return '<B>0</B>';

                            return '<B>'+me.func.currency(total)+'</B>';;
                        }
                    }//,
                    //{text: 'Tipe', flex: 0.2, sortable: true, dataIndex: 'tipe_jurnal', align: 'center'}
                ],
                idProp: 'nobukti'
            }]
        });
        
        this.callParent(arguments);
    },
	
    afterRender: function() {
        this.callParent();

        var me = this;
        var store = me.down('plgrid').getStore();

        store.getProxy().extraParams['from']   = me.down('[name=from]').getSubmitValue();
        store.getProxy().extraParams['to']     = me.down('[name=to]').getSubmitValue();

        store.loadPage(1);
    }
});