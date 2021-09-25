Ext.define('Admin.view.webdesktop.laporan.payroll.reviewgaji', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanpayrollreviewgaji',

    title: 'Rekap Transfer/Tunai',
    layout: 'fit',

    width: 350,
    height: 350,
    modulId: 'L15',
    disabledMaximize: true,

    constructor: function(c) {
        var me = this;
                
        var storeArea = Ext.create('Admin.store.stores', {
            fields: ['area'],
            url: 'api/store/areaHasilGajiStore.php',
            pageSize: 1000000
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
                   xtype: 'monthfield',
                    name: 'periode',
                    itemId: 'periode',
                    fieldLabel: 'Gaji Bulan',
                    format: 'm-Y',
                    submitFormat: 'Y-m',
                    selectOnFocus: true,
                    value: new Date(),
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {                                
                                me.down('#tipe').focus(true, 10);                                
                            }
                        }
                    } 
                }, {
                    xtype: 'combobox',
                    name: 'tipe',
                    itemId: 'tipe',
                    fieldLabel: 'Cetak Untuk',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'nama'],
                        data:[
                            {id: 1, nama: 'Semua Project'},
                            {id: 4, nama: 'Project'}
                        ]
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    value: 1,
                    listeners: {
                        scope: me,
                        select: function(c) {
                            var value = c.getSubmitValue();
                            var project = me.down('#project');
                            
                            project.setDisabled(value!=4);
                            if(value==4) { project.focus(true, 10); }
                        },
                        specialkey: function(c, e) {
                            if (e.getKey() == e.ENTER) {                                    
                                var value = me.down('#tipe').getSubmitValue();
                                var project = me.down('#project');

                                project.setDisabled(value!=4);
                                if(value==4) { project.focus(true, 10); }
                            }
                        }
                    }                    
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Project',
                    name: 'project',
                    itemId: 'project',
                    disabled: true,                    
                    store: storeArea,
                    valueField: 'area',
                    displayField: 'area',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 100,
                    minChars:0,
                    autoSelect: false,
                    selectOnFocus: true,
                    matchFieldWidth : false,
                    listConfig: {
                        loadingText: 'Loading...',
                        //set tinggi dan lebar isi list
                        width : '40%',
                        height : '100%',
                        resizable : true,
                        emptyText: 'Data tidak ditemukan.',
                        getInnerTpl: function() {
                            return '{area}';
                        }
                    }   
                }],
                buttons: [{
                    text: 'Excel',
                    handler: function(b) {
                        var tipe = me.down('[name=tipe]').getSubmitValue();
                        var periode = me.down('[name=periode]').getSubmitValue()+'-01';
                        var project = tipe==4?me.down('[name=project]').getSubmitValue():'';
                        
                        window.location = 'api/store/laporan/payroll/rv_gaji_report_data.php?periode='+periode+'&project='+project;
                        
                        /*var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});
                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                nik: nik,
                                nama: nama,
                                project: project,
                                periode: periode,
                                reportFileName: reportFileName,                           
                                subreport: 'payroll',
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
                        });*/
                        
                    }
                }, {
                    text: 'Cetak',
                    handler: function(b) {
                        var tipe = me.down('[name=tipe]').getSubmitValue();
                        var reportFileName = 'payroll/ReviewGaji.jrxml';
                        var periode = me.down('[name=periode]').getSubmitValue()+'-01';
                        var project = tipe==4?me.down('[name=project]').getSubmitValue():'';
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});
                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                project: project,
                                periode: periode,
                                reportFileName: reportFileName,                           
                                subreport: 'payroll',
                                format: 'pdf'
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.open('reports/readFile.php?filename='+json['filename'],
                                    'reviewgaji', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
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