Ext.define('Admin.view.webdesktop.transaksikas.header', {
    
    extend: 'Ext.container.Container',
    alias: 'widget.transaksikasheader',
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    constructor: function(c) {
        var me = this;

        var storeSumberDanaAlokasi = Ext.create('Admin.store.stores', {
            fields: ['id','kode_akun','nama_akun', 'display', 'level'],
            url: 'api/store/rekeningStore.php',
            pageSize: 1000000,
            params: {alokasi: 'Y'}            
        });
		
        Ext.apply(Ext.form.field.VTypes, {
		
            sumberdanaalokasi: function(val, field) {

                if(field.initialLoad) {
                    field.initialLoad = false;
                    return true;
                }
                
                var values = field.getSubmitValue();
                var index = storeSumberDanaAlokasi.indexOf(field.findRecord(field.valueField, values));
                return (index>-1 && eval(storeSumberDanaAlokasi.getAt(index).get('level'))==4);
            },
				                
            sumberdanaalokasiText: 'Harus level empat.'
        });  

        this.items = [{
            xtype: 'panel',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'anchor',
                    items: [{
                        xtype: 'datefield',
                        name: 'tanggal',
                        fieldLabel: 'Tanggal',
                        value: new Date(),
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        editable: false
                    }, {
                        xtype: 'combobox',
                        name: 'tipe',
                        fieldLabel: 'Debet/Kredit',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id', 'nama'],
                            data:[
                                {id: 'BKM', nama: 'Bukti Kas Masuk (BKM)'},
                                {id: 'BKK', nama: 'Bukti Kas Keluar (BKK)'},
                                {id: 'BBM', nama: 'Bukti Bank Keluar (BKK)'},
                                {id: 'BBK', nama: 'Bukti Bank Keluar (BKK)'}
                            ]
                        }),
                        valueField: 'id',
                        displayField: 'nama',
                        listeners: {
                            scope: me,
                            select: function(c) {
                                me.down('[name=sumber]').setValue();
                                me.down('[name=sumber]').reset();
                                
                                me.down('[name=sbr_dana]').setValue();
                                me.down('[name=sbr_dana]').reset();
                                
                                storeSumberDanaAlokasi.getProxy().extraParams['tipe'] = c.getSubmitValue();
                                if(me.down('[name=sumber]').isExpanded!=undefined) storeSumberDanaAlokasi.loadPage(1);
                                
                                //me.down('[name=sbr_dana]').setDisabled(c.getSubmitValue()!='BKK');                                
                                //me.down('[name=sbr_dana]').setVisible(c.getSubmitValue()=='BKK');
                                //me.down('[name=program]').setDisabled(c.getSubmitValue()!='BKK');
								
                                //nng 
                                //me.down('[name=tipe_lpj]').setDisabled(c.getSubmitValue()!='BKK');
                                me.down('[name=sumber]').setFieldLabel(c.getSubmitValue()=='BKK'?'Rek. Pengeluaran':'Sumber Dana');    
                                me.down('[name=sbr_dana]').setFieldLabel(c.getSubmitValue()=='BKK'?'Sumber Dana':'Rek. Pemasukan');
                                
                                Ext.Ajax.request({
                                    method:'POST',
                                    url: 'api/store/transaksikas/getLastNobukti.php',
                                    params: {
                                        prefix: c.getSubmitValue()=='BKK'?'KK':'KM'
                                    },
                                    success: function(response) {
                                        var json = Ext.JSON.decode(response.responseText);
                                        me.down('[name=nobukti]').setValue(json.nobukti);                                        
                                    }
                                });
                            }
                        }
                    }, {
//                        xtype: 'combobox',
//                        fieldLabel: 'Program Kegiatan',
//                        name: 'program',
//                        store: storeProgKegiatan,
//                        valueField: 'kode_akun',
//                        displayField: 'nama_akun',
//                        typeAhead: true,
//                        queryMode: 'remote',
//                        queryDelay: 100,
//                        minChars:0,
//                        vtype: 'progkegiatan',
//                        //pageSize: storeSumberDana.pageSize,
//                        matchFieldWidth : false,
//                        autoSelect: false,
//                        listConfig: {
//                            loadingText: 'Loading...',
//                            //set tinggi dan lebar isi list
//                            width : '40%',
//                            height : '110%',
//                            resizable : true,
//                            emptyText: 'Data tidak ditemukan.',
//                            getInnerTpl: function() {
//                                return '{display}';
//                            }
//                        }
//                    }, {
                        xtype: 'textfield',
                        name: 'nobukti',
                        fieldLabel: 'No. Bukti',
                        readOnly: true
                    }]
                }, {
                    xtype: 'container',
                    width: 25
                }, {
                    xtype: 'container',
                    flex: 1,
                    layout: 'anchor',
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: 'Rek. Pemasukan',
                        name: 'sbr_dana',
                        store: storeSumberDanaAlokasi,
                        valueField: 'kode_akun',
                        displayField: 'nama_akun',
                        typeAhead: true,
                        queryMode: 'remote',
                        queryDelay: 100,
                        minChars:0,
                        vtype: 'sumberdanaalokasi',
                        initialLoad: c.isEdit.length>0,
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
                        xtype: 'combobox',
                        fieldLabel: 'Sumber Dana',
                        name: 'sumber',
                        store: storeSumberDanaAlokasi,
                        valueField: 'kode_akun',
                        displayField: 'nama_akun',
                        typeAhead: true,
                        queryMode: 'remote',
                        queryDelay: 100,
                        minChars:0,
                        vtype: 'sumberdanaalokasi',
                        initialLoad: c.isEdit.length>0,
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
                        xtype: 'textarea',
                        height: 55,
                        name: 'uraian',
                        fieldLabel: 'Uraian'
                    }]
                }]
            }]
        }, {
            xtype: 'container',
            height: 5
        }];

        this.callParent(arguments);
    },
    
    setReadonly: function(readonly) {
        var me = this;

        var children = (new Admin.view.webdesktop.akses()).getAllChilden(me);
        for (var i=0; i<children.length; i++) {
            if(children[i].name || children[i].action) children[i].setReadOnly(readonly);
        }
    } 
});