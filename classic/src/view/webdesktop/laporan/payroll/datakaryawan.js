Ext.define('Admin.view.webdesktop.laporan.payroll.datakaryawan', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanpayrolldatakaryawan',

    title: 'Data Karyawan',
    layout: 'fit',

    width: 350,
    height: 350,
    modulId: 'L7',
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
                    xtype: 'combobox',
                    name: 'tipe',
                    itemId: 'tipe',
                    fieldLabel: 'Tipe Laporan',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'nama'],
                        data:[
                            {id: 1, nama: 'Daftar Karyawan'},
                            {id: 2, nama: 'Detail Karyawan'}
                        ]
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    value: 1,
                    listeners: {
                        scope: me,
                        select: function(c) {
                            me.down('#jenis').focus(true, 10);                            
                        },
                        specialkey: function(c, e) {
                            if (e.getKey() == e.ENTER) {
                                me.down('#jenis').focus(true, 10);
                            }
                        }
                    }                    
                }, {
                    xtype: 'combobox',
                    name: 'jenis',
                    itemId: 'jenis',
                    fieldLabel: 'Cetak Untuk',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'nama'],
                        data:[
                            {id: 1, nama: 'Semua Karyawan'},
                            {id: 2, nama: 'NIK Karyawan'},
                            {id: 3, nama: 'Nama Karyawan'},
                            {id: 4, nama: 'Project'} //,
                            //{id: 5, nama: 'Umur'},
                            //{id: 6, nama: 'Golongan Darah'}
                        ]
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    value: 1,
                    listeners: {
                        scope: me,
                        select: function(c) {
                            var value = c.getSubmitValue();
                            var nik = me.down('#nik');
                            var keterangan = me.down('[name=keterangan]');                    
                            var nama = me.down('#nama');
                            var project = me.down('#project');                 
                            //var umur = me.down('#umur');
                            //var goldarah = me.down('#goldarah');
                            
                            nik.setDisabled(value!=2);
                            keterangan.setDisabled(value!=2);
                            nama.setDisabled(value!=3);
                            project.setDisabled(value!=4);
                            //umur.setDisabled(value!=5);
                            //goldarah.setDisabled(value!=6);
                            
                            if(value==2) { nik.focus(true, 10); }
                            if(value==3) { nama.focus(true, 10); }
                            if(value==4) { project.focus(true, 10); }
                            //if(value==5) { umur.focus(true, 10); }
                            //if(value==6) { goldarah.focus(true, 10); }
                        },
                        specialkey: function(c, e) {
                            if (e.getKey() == e.ENTER) {                                    
                                var value = c.getSubmitValue();
                                var nik = me.down('#nik');
                                var keterangan = me.down('[name=keterangan]');                    
                                var nama = me.down('#nama');
                                var project = me.down('#project');

                                nik.setDisabled(value!=2);
                                keterangan.setDisabled(value!=2);
                                nama.setDisabled(value!=3);
                                project.setDisabled(value!=4);

                                if(value==2) { nik.focus(true, 10); }
                                if(value==3) { nama.focus(true, 10); }
                                if(value==4) { project.focus(true, 10); }
                            }
                        }
                    }                    
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'NIK',
                    name: 'nik',
                    itemId: 'nik',
                    disabled: true
                }, {
                    xtype: 'displayfield',
                    name: 'keterangan',
                    fieldLabel: '&nbsp;',
                    labelSeparator: '&nbsp;',
                    value: 'Pisahkan dengan tanda koma (,) pada setiap NIK jika ingin mencetak detail karyawan lebih dari 1.',
                    disabled: true
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Nama Karyawan',
                    name: 'nama',
                    itemId: 'nama',
                    disabled: true,
                    store: Ext.create('Admin.store.stores', {
                        fields: ['nama', 'display'],
                        url: 'api/store/karyawanDataStore.php',
                        pageSize: 1000000
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
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
                            return '{display}';
                        }
                    }            
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Project',
                    name: 'project',
                    itemId: 'project',
                    disabled: true,                    
                    store:  Ext.create('Admin.store.stores', {
                        fields: ['id', 'area'],
                        url: 'api/store/areaDataStores.php',
                        pageSize: 1000000
                    }),
                    valueField: 'id',
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
                }/*, {
                    xtype: 'textfield',
                    fieldLabel: 'Umur',
                    name: 'umur',
                    itemId: 'umur',
                    disabled: true
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Gol. Darah',
                    name: 'goldarah',
                    itemId: 'goldarah',
                    disabled: true
                }*/],
                buttons: [{
                    text: 'Excel',
                    handler: function(b) {
                        var tipe = me.down('[name=tipe]').getSubmitValue();
                        var jenis = me.down('[name=jenis]').getSubmitValue();
                        var reportFileName = tipe==1?'payroll/ListKaryawan.jrxml':'payroll/DetailKaryawan.jrxml';
                        var nik      = jenis==2?me.down('[name=nik]').getSubmitValue():'0';
                        var nama     = jenis==3?me.down('[name=nama]').getSubmitValue():'';
                        var project  = jenis==4?me.down('[name=project]').getSubmitValue():'';
                        //var umur     = jenis==5?me.down('[name=umur]').getSubmitValue():'';
                        //var goldarah = jenis==6?me.down('[name=goldarah]').getSubmitValue():'';
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});
                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                nik: nik,
                                nama: nama.replace("'", "\\'"),
                                project: project,
                                //umur: umur,
                                //goldarah: goldarah,
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
                        });
                        
                    }
                }, {
                    text: 'Cetak',
                    handler: function(b) {
                        var tipe = me.down('[name=tipe]').getSubmitValue();
                        var jenis = me.down('[name=jenis]').getSubmitValue();
                        var reportFileName = tipe==1?'payroll/ListKaryawan.jrxml':'payroll/DetailKaryawan.jrxml';
                        var nik      = jenis==2?me.down('[name=nik]').getSubmitValue():'0';
                        var nama     = jenis==3?me.down('[name=nama]').getSubmitValue():'';
                        var project  = jenis==4?me.down('[name=project]').getSubmitValue():'';
                        var umur     = jenis==5?me.down('[name=umur]').getSubmitValue():'';
                        var goldarah = jenis==6?me.down('[name=goldarah]').getSubmitValue():'';
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});
                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                nik: nik,
                                nama: nama,
                                project: project,
                                //umur: umur,
                                //goldarah: goldarah,
                                reportFileName: reportFileName,                           
                                subreport: 'payroll',
                                format: 'pdf'
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.open('reports/readFile.php?filename='+json['filename'],
                                    'datakaryawan', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
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