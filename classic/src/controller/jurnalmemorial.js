Ext.define('Admin.controller.jurnalmemorial', {
    extend: 'Ext.app.Controller',

    models: ['jurnalmemorial.edit'],

    views: ['webdesktop.jurnalmemorial.list', 'webdesktop.jurnalmemorial.edit', 'webdesktop.jurnalmemorial.header', 'webdesktop.jurnalmemorial.detail', 'webdesktop.jurnalmemorial.tombol'],
    
    refs: [{
        ref: 'jurnalmemoriallist',
        selector: 'jurnalmemoriallist'
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
            
            'jurnalmemoriallist button[action=baru]': {
                click: this.tambahData
            },
            'jurnalmemoriallist button[action=edit]': {
                click: this.editData
            },
            'jurnalmemoriallist button[action=hapus]': {
                click: this.hapusData
            },
            'jurnalmemorialedit button[action=baru]': {
                click: this.transaksiBaru                
            },
            'jurnalmemorialedit button[action=tambah]': {
                click: this.tambahBarang
            },
            'jurnalmemorialedit button[action=edit]': {
                click: this.editBarang
            },
            'jurnalmemorialedit button[action=hapus]': {
                click: this.hapusBarang
            },
            'jurnalmemorialedit button[action=simpan]': {
                click: this.simpanData
            },
            'jurnalmemorialedit button[action=cetak]': {
                click: this.cetakData
            },
            
            'jurnalmemorialedit': {
                render: this.winRender
            }
        });
    },
    
    tambahData: function(button) {
        var jurnalmemoriallist = button.up('jurnalmemoriallist');
        var params = {
            title: 'Tambah Jurnal Memorial',
            modulId: 'ADD'+jurnalmemoriallist.modulId,
            constrain: true           
        };
        
        jurnalmemoriallist.cUtama.showWindow(jurnalmemoriallist.tab, Ext.create('Admin.view.webdesktop.jurnalmemorial.edit', params));
    },
    
    editData: function(button) {
        var jurnalmemoriallist = button.up('jurnalmemoriallist');
        var params = {
            title: 'Edit Jurnal Memorial',
            modulId: 'EDIT'+jurnalmemoriallist.modulId,
            constrain: true,
            isEdit: jurnalmemoriallist.down('#selected').getSubmitValue()            
        };
        
        jurnalmemoriallist.cUtama.showWindow(jurnalmemoriallist.tab, Ext.create('Admin.view.webdesktop.jurnalmemorial.edit', params));
    },
    
    hapusData: function(button) {
        var jurnalmemoriallist = button.up('jurnalmemoriallist');
        
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk menghapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {
                jurnalmemoriallist.down('form').getForm().waitMsgTarget = jurnalmemoriallist.getEl();
                jurnalmemoriallist.down('form').getForm().submit({
                    method:'POST',
                    url: 'api/store/jurnalmemorial/delete.php',
                    waitMsg: 'Hapus...',
                    success:function(f, a) {
                        jurnalmemoriallist.down('plgrid').getStore().loadPage(1);                        
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
    },
    
    transaksiBaru: function(button) {
        var jurnalmemorialedit = button.up('jurnalmemorialedit');
        
        if(!jurnalmemorialedit.down('jurnalmemorialtombol').down('#baru').disabled) {
            jurnalmemorialedit.down('form').getForm().reset();
            jurnalmemorialedit.down('jurnalmemorialheader').transaksiBaru();
            jurnalmemorialedit.down('jurnalmemorialdetail').transaksiBaru();
            jurnalmemorialedit.down('jurnalmemorialtombol').transaksiBaru();
            //jurnalmemorialedit.down('jurnalmemorialtotal').transaksiBaru();            
        }
    },
    
    tambahBarang: function (button) {
        var jurnalmemorialedit = button.up('jurnalmemorialedit');
        jurnalmemorialedit.down('jurnalmemorialdetail').tambahRecord();
    },
    
    editBarang: function (button) {
        var jurnalmemorialedit = button.up('jurnalmemorialedit');
        jurnalmemorialedit.down('jurnalmemorialdetail').editRecord();
    },
    
    hapusBarang: function (button) {
        var jurnalmemorialedit = button.up('jurnalmemorialedit');
        jurnalmemorialedit.down('jurnalmemorialdetail').hapusRecord();
    },
    
    simpanData: function(button) {
        var me = this;
        var jurnalmemorialedit = button.up('jurnalmemorialedit');
        var detail = jurnalmemorialedit.down('jurnalmemorialdetail').getDetail();
        
        if(jurnalmemorialedit.down('jurnalmemorialdetail').debet!=jurnalmemorialedit.down('jurnalmemorialdetail').kredit) {
            Ext.MessageBox.show({
                title: 'Kesalahan',
                msg: 'Total kredit dan debit tidak sama. Mohon periksa kembali!',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
            
            return;
        }
        if(!jurnalmemorialedit.down('form').getForm().isValid()) return;
        
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn,text) {
            if(btn=='yes') {
                jurnalmemorialedit.down('form').getForm().waitMsgTarget = jurnalmemorialedit.getEl();
                jurnalmemorialedit.down('form').getForm().submit({
                    params: {
                        selected: jurnalmemorialedit.isEdit,
                        detail: detail
                    },
                    method:'POST',
                    url: 'api/store/jurnalmemorial/' + (jurnalmemorialedit.isEdit?'update':'save') + '.php',
                    waitMsg: 'Simpan...',
                    success:function(f, a) {
                        jurnalmemorialedit.terbilang = a.result.terbilang;
                        Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                            jurnalmemorialedit.down('jurnalmemorialheader').transaksiSave();
                            jurnalmemorialedit.down('jurnalmemorialdetail').transaksiSave();
                            jurnalmemorialedit.down('jurnalmemorialtombol').suksesSimpan();
                            //jurnalmemorialedit.down('jurnalmemorialtotal').transaksiSave(); 
                            if(me.getJurnalmemoriallist()) {
                                me.getJurnalmemoriallist().down('plgrid').getStore().loadPage(1);
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
    },
    
    cetakData: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/jurnalmemorial.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakmemorial', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }
});