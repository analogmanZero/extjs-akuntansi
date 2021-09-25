Ext.define('Admin.view.webdesktop.laporan.akuntansi.jurnal', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanakuntansijurnal',

    title: 'Laporan Jurnal',
    layout: 'fit',

    width: 370,
    height: 200,
    modulId: 'L0',
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
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tipe Jurnal',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'combo',
                        name: 'kode_jurnal',
                        flex: 1,
                        store: Ext.create('Admin.store.stores', {
                            fields: ['kode','keterangan'],
                            url: 'api/store/kodejurnalStore.php',
                            autoLoad: true
                        }),
                        valueField: 'kode',
                        displayField: 'keterangan',
                        typeAhead: true,
                        queryMode: 'local',
                        matchFieldWidth : false,
                        autoSelect: false,
                        listConfig: {
                            loadingText: 'Loading...',
                            width : '40%',
                            height : '110%',
                            //resizable : true,
                            emptyText: 'Data tidak ditemukan.'
                        },                    
                        selectOnFocus: true
                    }, {
                        xtype: 'button',
                        text: 'Reset',
                        handler: function() {
                            me.down('[name=kode_jurnal]').setValue();
                        }
                    }]
                }],
                buttons: [{
                    text: 'Excel',
                    handler: function(b) {
                        var reportFileName = 'accounting/jurnal_transaksi.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        var kode_jurnal = me.down('[name=kode_jurnal]').getSubmitValue();
                        var nama_jurnal = me.down('[name=kode_jurnal]').getDisplayValue();
                        nama_jurnal = nama_jurnal.length==0?'[Semua]':nama_jurnal;
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                kode_jurnal: kode_jurnal,
                                nama_jurnal: nama_jurnal,
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
                        var reportFileName = 'accounting/jurnal_transaksi.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        var kode_jurnal = me.down('[name=kode_jurnal]').getSubmitValue();
                        var nama_jurnal = me.down('[name=kode_jurnal]').getDisplayValue();
                        nama_jurnal = nama_jurnal.length==0?'[Semua]':nama_jurnal;
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                kode_jurnal: kode_jurnal,
                                nama_jurnal: nama_jurnal,
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