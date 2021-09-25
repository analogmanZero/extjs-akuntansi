Ext.define('Admin.controller.jurnalumum', {
    
    extend: 'Ext.app.Controller',
    models: ['jurnalumum.edit'],	
    views: ['webdesktop.jurnalumum.list', 'webdesktop.jurnalumum.edit', 'webdesktop.jurnalumum.header', 'webdesktop.jurnalumum.grid', 'webdesktop.jurnalumum.tombol'],
    
    refs: [{
        ref: 'jurnalumumlist',
        selector: 'jurnalumumlist'
    }],

    winRender: function(win) {
        var me = this;
        
        win.on({
            keydown: {
                element: 'el',
                fn: function (eventObject) {
                    if (eventObject.keyCode == 119) {
                        me.transaksiBaru(win.down('#baru'));
                    } if (eventObject.keyCode == 115)
                        me.simpanData(win.down('#simpan'));
                    if (eventObject.keyCode == 45)
                        me.tambahBarang(win.down('#tambah'));
                    if (eventObject.keyCode == 67)
                        me.cetakFaktur(win.down('#cetak'));
                    
                }
            }
        });
    },
    
    init: function() {

        this.control({
            
            //controller untuk jurnal umum
            'jurnalumumlist button[action=baru]': {
                click: this.tampilJurnalUmumBaru
            },

            'jurnalumumlist button[action=edit]': {
                click: this.tampilJurnalUmumEdit
            },

            'jurnalumumlist button[action=hapus]': {
                click: this.hapusDataJurnalUmum
            }, 

            'jurnalumumedit': {
                render: this.winJurnalUmumRender
            },

            'jurnalumumedit button[action=baru]': {
                click: function (f) {
                    this.transaksiBaruJurnalUmum(f.up('window'));
                }
            },

            'jurnalumumedit button[action=tambah]': {
                click: function (f) {
                    this.tambahRecordJurnalUmum(f.up('window'));
                }
            },

            'jurnalumumedit button[action=edit]': {
                click: this.editRecordJurnalUmum

            },

            'jurnalumumedit button[action=hapus]': {
                click: this.hapusRecordJurnalUmum
            },

            'jurnalumumedit button[action=simpan]': {
                click: function (f) {
                    this.simpanTransaksiJurnalUmum(f.up('window'));
                }
            },

            'jurnalumumedit button[action=cetak]': {
                click: this.cetakFakturJurnalUmum
            },
            
            'jurnalumumedit': {
                render: this.winRender
            }
            //batas controller untuk jurnal umum
        });
    },
    
    tampilJurnalUmumBaru: function(button) {
        var jurnalumumlist=button.up('jurnalumumlist');
        var cUtama = jurnalumumlist.cUtama;
        var tab = jurnalumumlist.tab;

        var win = Ext.create('Admin.view.webdesktop.jurnalumum.edit', {
            title: 'Tambah Jurnal Umum',
            cUtama: cUtama,
            constrain: true,
            tab: tab,
            akses: jurnalumumlist.akses,
            itemId: 'Tambah_JU',
            modulId: 'Tambah_JU'
        });

        cUtama.showWindow(tab, win);
    }, 
	
    tampilJurnalUmumEdit: function(button) {
        var jurnalumumlist=button.up('jurnalumumlist');
        var cUtama = jurnalumumlist.cUtama;
        var tab = jurnalumumlist.tab;
        	
        var idSelect = jurnalumumlist.down('plgrid').idSelect;
        var win = Ext.create('Admin.view.webdesktop.jurnalumum.edit', {
            title: 'Edit Jurnal Umum',
            cUtama: cUtama,
            constrain: true,
            tab: tab,
            akses: jurnalumumlist.akses,
            itemId: 'Edit_JU',
            modulId: 'Edit_JU',
            isEdit: true,   
            idEdit: idSelect,
            listeners: {
                show: function() {
                    win.down('[action=baru]').fireEvent('click', win.down('#baru'));						
                    win.down('form').load({
                        url: 'api/store/jurnalumum/dataLoad.php',
                        params: {nobukti: idSelect},
                        success: function() {
                            var detail = win.down('grid');
                            var json = win.down('form').reader.jsonData.results;
                            detail.store.loadRawData(json);

                            win.down('[name=jenis]').fireEvent('select', win.down('[name=jenis]'));
                        }
                    });
                }
            }
        });

        cUtama.showWindow(tab, win);
        
    },
	
    hapusDataJurnalUmum: function(button) {
        var win = button.up('window'),
            plgrid = win.down('plgrid');

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: plgrid, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'POST',
                    url: 'api/store/jurnalumum/delete.php',
                    params: {
                        selected: plgrid.idSelect
                    },
                    success: function(response) {
                        myMask.hide();

                        var json = Ext.JSON.decode(response.responseText);
                        if(json['success']) {
                            plgrid.getStore().loadPage(1);
                        } else {
                            Ext.MessageBox.show({
                                title: 'Gagal',
                                msg: json['message'],
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    },
                    failure: function() {
                        myMask.hide();

                        Ext.MessageBox.show({
                            title: 'Kesalahan',
                            msg: 'Kesalahan sistem, ulangi lagi.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    },
	
    winJurnalUmumRender: function(win) {
        var me = this;
        win.on({
            keydown: {
                element: 'el',
                fn: function (eventObject) {
                    if (eventObject.keyCode == 119)
                        me.transaksiBaru(win);
                    if (eventObject.keyCode == 115)
                        me.simpanTransaksi(win);
                    if (eventObject.keyCode == 45)
                        me.tambahBarang(win);
                }
            }
        });

        win.down('jurnalumumgrid').on({
            selectionchange: function(view, records) {
                var jurnaltombol = win.down('jurnalumumtombol'),
                    getValue = jurnaltombol.down('#tambah').disabled || !records.length;
                jurnaltombol.down('#edit').setDisabled(getValue);
                jurnaltombol.down('#hapus').setDisabled(getValue);
            }
        });

        win.down('jurnalumumgrid').rowEditor.on({
            cancelEdit: function() {
                win.down('jurnalumumtombol').afterEdit(true);
            },

            beforeedit: function() {
                win.down('jurnalumumtombol').afterEdit(false);
            },

            afteredit: function() {
                win.down('jurnalumumtombol').afterEdit(true);
            }
        });
    },

    transaksiBaruJurnalUmum: function(win, isEdit) {

        var jurnalheader = win.down('jurnalumumheader');
        var jurnalgrid   = win.down('jurnalumumgrid');
        var jurnaltombol = win.down('jurnalumumtombol');

        if(!jurnaltombol.down('#baru').disabled) {
            if(!isEdit) win.down('form').getForm().reset();
            jurnalgrid.transaksiBaru();
            jurnalheader.transaksiBaru();
            jurnaltombol.transaksiBaru();            
        }
    },

    tambahRecordJurnalUmum: function (win) {
        if(!win.down('jurnalumumtombol').down('#tambah').disabled)
            win.down('jurnalumumgrid').tambahRecord();
    },

    editRecordJurnalUmum: function (button) {
        var win = button.up('window');
        win.down('jurnalumumgrid').editRecord();
    },

    hapusRecordJurnalUmum: function (button) {
        var win = button.up('window');
        win.down('jurnalumumgrid').hapusRecord();
    },

    simpanTransaksiJurnalUmum: function(win) {
        var detail = win.down('jurnalumumgrid').getDetail();
        var isBalance = win.down('jurnalumumgrid').isBalance;
        
        var me = this;
        
        if(isBalance) {
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn,text) {
                if(btn=='yes') {
                    win.down('form').getForm().waitMsgTarget = win.getEl();
                    win.down('form').getForm().submit({
                        params: {
                            id: win.idEdit,
                            detail: detail
                        },
                        method:'POST',
                        url: 'api/store/jurnalumum/' + (win.isEdit?'update':'save') + '.php',
                        waitMsg: 'Simpan...',
                        success:function(f, a) {
                            Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                                win.down('jurnalumumheader').transaksiSave();
                                win.down('jurnalumumgrid').transaksiSave();
                                win.down('jurnalumumtombol').afterSave(a.result.qtyCetak);
                                
                                if(me.getJurnalumumlist()) {
                                    me.getJurnalumumlist().down('plgrid').getStore().loadPage(1);
                                }
                            });
                        },
                        failure:function(form, action){
                            Ext.MessageBox.show({
                                title: 'Gagal',
                                msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                        }
                    });				
                }
            });
        } else {
            Ext.MessageBox.show({
                title: 'Kesalahan',
                msg: 'Jumlah debet dan kredit tidak sama.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    cetakFakturJurnalUmum: function(b) {
        
        var notrx = b.up('window').down('[name=notrx]').getSubmitValue();        
        
        var reportFileName = 'jurnal/jurnalumum.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakjurnalumum', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }

});