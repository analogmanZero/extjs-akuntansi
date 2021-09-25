Ext.define('Admin.view.webdesktop.laporan.akuntansi.neracasaldo', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanakuntansineracasaldo',

    title: 'Laporan Neraca Saldo',
    layout: 'fit',

    width: 370,
    height: 200,
    modulId: 'L2',
    disabledMaximize: true,

    constructor: function(c) {
        var me = this;
        
        
        Ext.apply(c, {
            items: [{
                xtype: 'form',                                
                layout: 'anchor',
                fieldDefaults: {
                    anchor: '100%',
                    msgTarget: 'side',
                    labelWidth: 90
                },
                bodyPadding: 10,
                items:[{
                    xtype: 'datefield',
                    name: 'from',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    fieldLabel: 'Tanggal',
                    value: new Date()
                }, {
                    xtype: 'datefield',
                    name: 'to',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    fieldLabel: 'Sampai',
                    value: new Date()
                }],
                buttons: [{
                    text: 'Excel',
                    handler: function(b) {
                        var reportFileName = 'accounting/neraca_saldo.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                reportFileName: reportFileName,                           
                                format: 'xls'
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.location = 'reports/readFile.php?filename='+json['filename']+'&format=xls';
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
                        
                        
                        
                    }
                }, {
                    text: 'Cetak',
                    handler: function(b) {
                        var reportFileName = 'accounting/neraca_saldo.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                reportFileName: reportFileName
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.open('reports/readFile.php?filename='+json['filename'],
                                    'neracasaldo', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
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
                        
                        
                        
                    }
                }]
            }]
        });

        me.callParent(arguments);
    }
});

//xtype: 'component',
//					autoEl: {
//						tag: 'iframe',
//						style: 'height: 100%; width: 100%; border: none',
//						src: 'native/gli/laporan_jurnal.php?id='+notrx  
//					}