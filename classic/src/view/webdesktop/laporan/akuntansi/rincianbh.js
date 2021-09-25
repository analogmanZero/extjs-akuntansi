Ext.define('Admin.view.webdesktop.laporan.akuntansi.rincianbh', {

    extend: 'Ext.window.Window',
    alias : 'widget.laporanakuntansirincianbh',

    title: 'Laporan Neraca',
    layout: 'fit',

    width: 470,
    height: 300,
    modulId: 'L3',
    disabledMaximize: true,

    constructor: function(c) {
        var me = this;
        
        var storeSumberDana = Ext.create('Admin.store.stores', {
            fields: ['id', 'kode_akun', 'nama_akun', 'display', 'level'],
            url: 'api/store/kodeakunBudgetStore.php'
        });
        
        Ext.apply(c, {
            items: [{
                xtype: 'form',                                
                layout: 'anchor',
                fieldDefaults: {
                    anchor: '100%',
                    msgTarget: 'side',
                    labelWidth: 120
                },
                bodyPadding: 10,
                items:[{
                    xtype: 'combobox',
                    fieldLabel: 'Divisi',
                    name: 'divisi',
                    itemId: 'divisi',
                    msgTarget: 'side',
                    store:  Ext.create('Admin.store.stores', {
                        fields: ['id', 'kode', 'nama', 'display'],
                        url: 'api/store/divisiStore.php'
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 100,
                    minChars:0,
                    matchFieldWidth : false,
                    autoSelect: false,
                    selectOnFocus: true,
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
                    },            
                    listeners: {
                        scope: me,
                        change: function() {
                            var kode_akun = me.down('#kode_akun');
                            var store = kode_akun.getStore();
                            kode_akun.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['divisi'] = "";
                            store.removeAll();
                            store.loadPage(1);
                        },
                        select: function(combo, record) {
                            var kode_akun = me.down('#kode_akun');
                            var store = kode_akun.getStore();
                            kode_akun.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['divisi'] = me.down('#divisi').getSubmitValue();
                            store.removeAll();
                            store.loadPage(1);
                        }, 
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#proyek').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Proyek',
                    name: 'proyek',
                    itemId: 'proyek',
                    allowBlank: true,
                    msgTarget: 'side',
                    store:  Ext.create('Admin.store.stores', {
                        fields: ['id', 'kode', 'nama', 'display'],
                        url: 'api/store/proyekStore.php'
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 100,
                    minChars:0,
                    matchFieldWidth : false,
                    autoSelect: false,
                    selectOnFocus: true,
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
                    },            
                    listeners: {
                        scope: me,
                        change: function() {
                            var kode_akun = me.down('#kode_akun');
                            var store = kode_akun.getStore();
                            kode_akun.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['proyek'] = "";
                            store.removeAll();
                            store.loadPage(1);
                        },
                        select: function(combo, record) {
                            var kode_akun = me.down('#kode_akun');
                            var store = kode_akun.getStore();
                            kode_akun.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['proyek'] = me.down('#proyek').getSubmitValue();
                            store.removeAll();
                            store.loadPage(1);
                        }, 
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#kode_akun').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Akun Budget',
                    name: 'kode_akun',
                    itemId: 'kode_akun',
                    store: storeSumberDana,
                    valueField: 'id',
                    displayField: 'display',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 100,
                    minChars:0,
                    matchFieldWidth : false,
                    autoSelect: false,
                    selectOnFocus: true,
                    allowBlank: true,
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
                    },
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#jumlah').focus(true, 10);
                            }
                        }
                    }
                }, {
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
                    text: 'Cetak',
                    handler: function(b) {
                        var reportFileName = 'accounting/rincianbh.jrxml';
                        var from = me.down('[name=from]').getSubmitValue();
                        var to = me.down('[name=to]').getSubmitValue();
                        var id_divisi = me.down('[name=divisi]').getSubmitValue();
                        var id_proyek = me.down('[name=proyek]').getSubmitValue();
                        var id_akun_budget = me.down('[name=kode_akun]').getSubmitValue();
                        
                        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});

                        myMask.show();
                        Ext.Ajax.request({
                            method:'POST',
                            url: 'reports/exec.php',
                            params: {
                                from: from,
                                to: to,
                                id_divisi: id_divisi,
                                id_proyek: id_proyek,
                                id_akun_budget: id_akun_budget,                                
                                reportFileName: reportFileName
                            },
                            success: function(response) {
                                var json = Ext.JSON.decode(response.responseText);
                                if(json['success']) {
                                    window.open('reports/readFile.php?filename='+json['filename'],
                                    'rincianbh', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
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