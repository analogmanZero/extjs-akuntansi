Ext.define('Admin.view.webdesktop.laporan.spk.list' ,{

    extend: 'Ext.window.Window',
    alias : 'widget.laporanspklist',

    title : 'Laporan SPK',
    
    layout: 'fit',
    width: 1200,
    height: 600,

    constructor: function(c) {
        var me = this;
        var fcurrency = new Admin.view.currency();
        var renderTopics = function(value, p, record) {
            
            if(value==null || value.length==0) return '';
            //return (record.data['level']==1?'<B><I>':'')+value+(record.data['level']==1?'</I></B>':'');
            return value;
        };
        
        var renderDecimal = function(value, p, record) {
            
            if(value==null || value.length==0) return '';
            //return (record.data['level']==1?'<B><I>':'')+fcurrency.currency(value)+(record.data['level']==1?'</I></B>':'');
            return fcurrency.currency(value);            
        };

        var loadData = function() {
            var from = me.down('[name=from]').getSubmitValue(),
                to = me.down('[name=to]').getSubmitValue(),
                nospk = me.down('[name=nospk]').getSubmitValue(),
                treepanel = me.down('treepanel'), 
                root = treepanel.getRootNode(),
                tree_store = treepanel.getStore();
    
            tree_store.getProxy().extraParams['from'] = from;
            tree_store.getProxy().extraParams['to'] = to;
            tree_store.getProxy().extraParams['nospk'] = nospk;
                        
            me.down('treepanel').getStore().reload({node: root});
        };
        
        var treeStore = Ext.create('Ext.data.TreeStore', {
            fields: [
                'no','notrx', 'tanggal', 'level',
                'total_roll', 'outstanding_roll', 'finish_roll', 'total_ream', 'total_pallet','total_weight',
                'pallet', 'gw','nw','ream','wasted'
            ],
            rootProperty: {
                text: 'Root',
                id: null,
                expanded: false
            },
            autoLoad: false,
            remoteSort: true,
            proxy: {
                type: 'ajax',
                url: 'api/store/laporan/spk/dataTreeStore.php',
                actionMethods: {
                    read: 'POST'
                }
            }
        });
        
        this.tbar = [{ 
            xtype: 'datefield',
            name: 'from',
            labelWidth: 50,
            width: 155,
            fieldLabel: 'Tanggal',
            value: new Date(),
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            listeners: {
                change: function(p) {
                    loadData();
                }
            }
        }, {
            xtype: 'datefield',
            name: 'to',
            labelWidth: 20,
            width: 125,
            fieldLabel: 'sd.',
            labelStyle: 'text-align: center;',
            labelSeparator: '&nbsp;',
            value: new Date(),
            format: 'd-m-Y',
            submitFormat: 'Y-m-d',
            listeners: {
                change: function(p) {
                    loadData();
                }
            }
        }, '->', {
            xtype: 'textfield',
            fieldLabel: 'No. SPK',
            labelWidth: 70,
            name: 'nospk'
        }, {
            xtype: 'button',
            text: 'Cari',
            handler: function() {
                loadData();
            }
        }, '-', {
            xtype: 'container',
            layout: 'fit',
            items:[{
                xtype: 'button',
                text: 'Cetak',
                handler: function(b) {
                    var reportFileName = 'inventori/laporan_spk.jrxml';
                        from = me.down('[name=from]').getSubmitValue(),
                        to = me.down('[name=to]').getSubmitValue(),
                        nospk = me.down('[name=nospk]').getSubmitValue();
                    var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                    myMask.show();
                    Ext.Ajax.request({
                        method:'POST',
                        url: 'reports/exec.php',
                        params: {
                            from: from,
                            to: to,
                            nospk: nospk,
                            reportFileName: reportFileName
                        },
                        success: function(response) {
                            var json = Ext.JSON.decode(response.responseText);
                            if(json['success']) {
                                window.open('reports/readFile.php?filename='+json['filename'],
                                'jurnal', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
                                myMask.hide();
                            } else {
                                myMask.hide();
                                Ext.MessageBox.show({
                                    title: "Kesalahan",
                                    msg: json['message'],
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        },
                        failure: function() {
                            myMask.hide();
                            Ext.MessageBox.show({
                                title: "Kesalahan",
                                msg: "Respon server error. Coba lagi.",
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });

//                    var reportFileName = 'inventori/laporan_spk.jrxml',
//                        from = me.down('[name=from]').getSubmitValue(),
//                        to = me.down('[name=to]').getSubmitValue(),
//                        nospk = me.down('[name=nospk]').getSubmitValue(),
//                        tag ='&from='+from+'&to='+to+'&nospk='+nospk;
//                    
//                    window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
//                            'lapspk', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
                }
            }]
        }]; 
        this.items = [{
            xtype: 'treepanel',
            columnLines: true,
            useArrows: true,
            rootVisible: false,            
            setRootNode: function() {
                if (this.getStore().autoLoad) {
                    this.callParent(arguments);
                }
            },
            store: treeStore,            
            columns: [
                {text: 'No.', width: 55, sortable: true, dataIndex: 'no', align: 'center', locked: true, renderer: renderTopics},
                {xtype: 'treecolumn', text: 'No. SPK / PK', width: 190, sortable: false, dataIndex: 'notrx', locked: true, renderer: renderTopics},
                {text: 'Tanggal', width: 100, sortable: false, dataIndex: 'tanggal', align: 'center', renderer: renderTopics},
                {text: 'Surat Perintah Kerja (SPK)', columns: [
                    {text: 'Roll', width: 100, sortable: false, dataIndex: 'total_roll', align: 'right', renderer: renderDecimal},
                    {text: 'Outstanding', width: 100, sortable: false, dataIndex: 'outstanding_roll', align: 'right', renderer: renderDecimal},
                    {text: 'Selesai', width: 100, sortable: false, dataIndex: 'finish_roll', align: 'right', renderer: renderDecimal},
                    {text: 'Ream', width: 100, sortable: true, dataIndex: 'total_ream', align: 'right', renderer: renderDecimal},
                    {text: 'Pallet', width: 70, sortable: true, dataIndex: 'total_pallet', align: 'right', renderer: renderDecimal},
                    {text: 'Berat', width: 100, sortable: true, dataIndex: 'total_weight', align: 'right', renderer: renderDecimal}
                ]},
                {text: 'Proses Kerja', columns: [
                    {text: 'Pallet', width: 70, sortable: true, dataIndex: 'pallet', align: 'right', renderer: renderDecimal},
                    {text: 'GW', width: 100, sortable: false, dataIndex: 'gw', align: 'right', renderer: renderDecimal},
                    {text: 'NW', width: 100, sortable: false, dataIndex: 'nw', align: 'right', renderer: renderDecimal},
                    {text: 'Ream', width: 100, sortable: false, dataIndex: 'ream', align: 'right', renderer: renderDecimal},
                    {text: 'Waste', width: 100, sortable: true, dataIndex: 'wasted', align: 'right', renderer: renderDecimal}
                ]}
            ],
            animate : true,
            cls: 'custom-grid',
            viewConfig: {
                getRowClass: function(record) {
                    return 'changed_colour_' + record.data['level'];
                }
            }
        }];

        this.callParent(arguments);
    },
    
    afterRender: function() {
        this.callParent();
        
        var treepanel = this.down('treepanel'), 
            tree_store = treepanel.getStore();
    
        setTimeout(function() {
            tree_store.getRootNode().expand();
        }, 100);
    }

});