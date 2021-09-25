Ext.define('Admin.view.webdesktop.inv.stockawal.list', {
    
    extend: 'Ext.panel.Panel',
    alias : 'widget.invstockawallist',
    
    layout: 'fit',
    border: false,

    constructor: function(c) {
        var me = this;

        var renderNo = function(value, p, record) {
            var store = me.down('plgrid').getStore();
            var page = store.currentPage;
            var index = store.indexOf(record);
            var limit = store.pageSize;

            return ((page-1)*limit)+index+1;
        };

        var renderDraft = function(value, p, record) {
            return value=='Y'?'<B>DRAFT</B>':'';
        };

        me.tbar = [{
            xtype: 'datefield',
            name: 'from',
            fieldLabel: 'Tanggal',
            labelWidth: 55,
            width: 170,
            value: new Date(),
            format: 'd-m-Y',
            listeners: {
                change: function(d) {
                    var me = d.up('panel');
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
            listeners: {
                change: function(d) {
                    var me = d.up('panel');
                    var store = me.down('plgrid').getStore(),
                        proxy = store.getProxy();

                    proxy.extraParams['to'] = d.getSubmitValue();
                    store.loadPage(1);
                }
            }
        }];

        me.items = [{
            xtype: 'plgrid',
            hideBaru: true,
            store: Ext.create('Admin.store.stores', {
                fields: ['notrx', 'tanggal', 'keterangan', 'draft'],
                url: 'api/store/stockawal/dataStore.php'
            }),
            columns: [
                {text: 'No.', flex: 0.2, sortable: false, menuDisabled: true, align: 'center', renderer: renderNo},
                {text: 'No. Proses', flex: 0.5, sortable: true, dataIndex: 'notrx'},
                {text: 'Tanggal', flex: 0.3, sortable: true, align: 'center', dataIndex: 'tanggal'},
                {text: 'Keterangan', flex: 1, sortable: true, dataIndex: 'keterangan'},
                {text: 'DRAFT', flex: 0.3, sortable: true, renderer: renderDraft, dataIndex: 'draft', align: 'center'}
            ],
            idProp: 'notrx'
        }];
        
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