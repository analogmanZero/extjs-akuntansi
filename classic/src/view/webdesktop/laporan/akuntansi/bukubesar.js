Ext.define('Admin.view.webdesktop.laporan.akuntansi.bukubesar', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanakuntansibukubesar',

    title: 'Laporan Buku Besar',
    layout: 'fit',

    width: 370,
    height: 200,
    modulId: 'L1',
    disabledMaximize: true,

    constructor: function(c) {
        var me = this;
        
        var storeSumberDana = Ext.create('Admin.store.stores', {
            fields: ['id','kode_akun','nama_akun', 'display', 'level'],
            url: 'api/store/rekeningStore.php',
            pageSize: 1000000,
            autoLoad: true
        });
        
        Ext.apply(Ext.form.field.VTypes, {
		
            sumberdana: function(val, field) {
                if(!me.readyEdit) {
                    return true;
                }
                
                var values = field.getSubmitValue();
                var index = storeSumberDana.indexOf(field.findRecord(field.valueField, values));                
                return (index>-1 && eval(storeSumberDana.getAt(index).get('level'))==4);
            },
				                
            sumberdanaText: 'Rekening harus level empat.'
        });
        
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
                    fieldLabel: 'Rekening',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'combo',
                        flex: 1,
                        name: 'kode_akun',
                        msgTarget: 'side',
                        store: storeSumberDana,
                        valueField: 'kode_akun',
                        displayField: 'nama_akun',
                        typeAhead: true,
                        queryMode: 'local',
                        vtype: 'sumberdana',
                        pageSize: 1000000,
                        matchFieldWidth : false,
                        autoSelect: false,
                        listConfig: {
                            loadingText: 'Loading...',
                            //set tinggi dan lebar isi list
                            width : '40%',
                            height : '110%',
                            resizable : true,
                            emptyText: 'Data tidak ditemukan.',
                            getInnerTpl: function() {
                                return '{display}';
                            }
                        }
                    }, {
                        xtype: 'button',
                        text: 'Reset',
                        handler: function() {
                            me.down('[name=kode_akun]').setValue();
                        }
                    }]
                }],
                buttons: [{
                    text: 'Excel',
                    handler: function(b) {
                        var reportFileName = 'accounting/bukubesar.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        var kode_akun = me.down('[name=kode_akun]').getSubmitValue();
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});
                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                kode_akun: kode_akun,
                                reportFileName: reportFileName,
                                format: 'xls'
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.open('reports/readFile.php?filename='+json['filename'],
                                    'bukubesar', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
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
                        var reportFileName = 'accounting/bukubesar.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        var kode_akun = me.down('[name=kode_akun]').getSubmitValue();
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                kode_akun: kode_akun,
                                reportFileName: reportFileName
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.open('reports/readFile.php?filename='+json['filename'],
                                    'bukubesar', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
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