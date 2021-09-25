Ext.define('Admin.view.webdesktop.laporan.spk.detail', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanspkdetail',

    title: 'Laporan Detail SPK',
    layout: 'fit',

    width: 370,
    height: 220,
    modulId: 'DSPK',
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
                   xtype: 'checkbox',
                   boxLabel: 'Cetak Per No. SPK',
                   name: 'cek',
                   fieldLabel: '&nbsp;',
                   labelSeparator: '&nbsp;',
                   listeners: {
                       change: function(cek) {
                           me.down('[name=nospk]').setDisabled(!cek.getSubmitValue());
                           me.down('[name=from]').setDisabled(cek.getSubmitValue());
                           me.down('[name=to]').setDisabled(cek.getSubmitValue());
                       }
                   }
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'No. SPK',
                    name: 'nospk',
                    disabled: true                    
                }],
                buttons: [{
                    text: 'Cetak',
                    handler: function(b) {
                        var reportFileName = 'inventori/spkdetail.jrxml';
                        var cek = me.down('[name=cek]').getSubmitValue()
                        var from = cek?'':me.down('[name=from]').getSubmitValue();
                        var to = cek?'':me.down('[name=to]').getSubmitValue();
                        var nospk = cek?me.down('[name=nospk]').getSubmitValue():'';
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