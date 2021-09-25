Ext.define('Admin.controller.karyawan', {
    extend: 'Ext.app.Controller',

    models: ['karyawan.edit'],
    views: ['webdesktop.karyawan.list', 'webdesktop.karyawan.komponen', 'webdesktop.karyawan.bayargaji',  'webdesktop.karyawan.edit', 'webdesktop.karyawan.utama','webdesktop.karyawan.profil','webdesktop.karyawan.alamat_ktp', 'webdesktop.karyawan.alamat_tinggal', 'webdesktop.karyawan.catatan', 'webdesktop.karyawan.keluarga', 'webdesktop.karyawan.orangtua_wali', 'webdesktop.karyawan.kerabat', 'webdesktop.karyawan.pendidikan_formal', 'webdesktop.karyawan.pendidikan_non_formal', 'webdesktop.karyawan.pengalaman_kerja'],


    init: function() {

        this.control({
            'karyawanlist button[action=baru]': {
                click: this.baru
            },

            'karyawanlist button[action=edit]': {
                click: this.edit
            },

            'karyawanlist button[action=hapus]': {
                click: this.hapus
            },
            
            'karyawanlist button[action=cetak]': {
                click: this.cetakDetailKaryawan
            },
            
            'karyawanedit button[action=simpan]': {
                click: this.simpanData
            },

            'karyawanedit filefield[action=upload_foto]': {
                change: this.upload
            },
            
            'karyawankeluarga button[action=tambah]': {
                click: this.tambahKeluarga
            },
            
            'karyawankeluarga button[action=edit]': {
                click: this.editKeluarga
            },
            
            'karyawankeluarga button[action=hapus]': {
                click: this.hapusKeluarga
            },


            'karyawanorangtuawali button[action=tambah]': {
                click: this.tambahOrangtuawali
            },
            
            'karyawanorangtuawali button[action=edit]': {
                click: this.editOrangtuawali
            },
            
            'karyawanorangtuawali button[action=hapus]': {
                click: this.hapusOrangtuawali
            },
            
            'karyawankerabat button[action=tambah]': {
                click: this.tambahKerabat
            },
            
            'karyawankerabat button[action=edit]': {
                click: this.editKerabat
            },
            
            'karyawankerabat button[action=hapus]': {
                click: this.hapusKerabat
            },
            
            'karyawanpendidikanformal button[action=tambah]': {
                click: this.tambahPendidikanformal
            },
            
            'karyawanpendidikanformal button[action=edit]': {
                click: this.editPendidikanformal
            },
            
            'karyawanpendidikanformal button[action=hapus]': {
                click: this.hapusPendidikanformal
            },
            
            'karyawanpendidikannonformal button[action=tambah]': {
                click: this.tambahPendidikannonformal
            },
            
            'karyawanpendidikannonformal button[action=edit]': {
                click: this.editPendidikannonformal
            },
            
            'karyawanpendidikannonformal button[action=hapus]': {
                click: this.hapusPendidikannonformal
            },
            
            'karyawanpengalamankerja button[action=tambah]': {
                click: this.tambahPengalamankerja
            },
            
            'karyawanpengalamankerja button[action=edit]': {
                click: this.editPengalamankerja
            },
            
            'karyawanpengalamankerja button[action=hapus]': {
                click: this.hapusPengalamankerja
            },
            
            'karyawanbayargaji button[action=editbayargaji]': {
                click: this.editBayarGaji
            }
            
        });
    },   
    
    cetakDetailKaryawan: function (b) {
        var id = b.up('window').down('#selected').getValue();
        //alert(id); 
        var reportFileName = 'payroll/DetailKaryawan.jrxml';
        var myMask = new Ext.LoadMask({target: b.up('window'), msg: "Proses..."});
        myMask.show();
        Ext.Ajax.request({
            method:'POST',
            url: 'reports/exec.php',
            params: {
                id: id,
                nik: '0',
                nama: '',
                project: '',
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
    },
    
    editBayarGaji: function (button) {
        var karyawanbayargaji = button.up('karyawanbayargaji');
        karyawanbayargaji.editRecord();
    },
    
    tambahKeluarga: function (button) {
        var karyawankeluarga = button.up('karyawankeluarga');
        karyawankeluarga.tambahRecord();
    },
    
    editKeluarga: function (button) {
        var karyawankeluarga = button.up('karyawankeluarga');
        karyawankeluarga.editRecord();
    },
    
    hapusKeluarga: function (button) {
        var karyawankeluarga = button.up('karyawankeluarga');
        karyawankeluarga.hapusRecord();
    },
    
    
    tambahOrangtuawali: function (button) {
        var karyawanorangtuawali = button.up('karyawanorangtuawali');
        karyawanorangtuawali.tambahRecord();
    },
    
    editOrangtuawali: function (button) {
        var karyawanorangtuawali = button.up('karyawanorangtuawali');
        karyawanorangtuawali.editRecord();
    },
    
    hapusOrangtuawali: function (button) {
        var karyawanorangtuawali = button.up('karyawanorangtuawali');
        karyawanorangtuawali.hapusRecord();
    },
    
    tambahKerabat: function (button) {
        var karyawankerabat = button.up('karyawankerabat');
        karyawankerabat.tambahRecord();
    },
    
    editKerabat: function (button) {
        var karyawankerabat = button.up('karyawankerabat');
        karyawankerabat.editRecord();
    },
    
    hapusKerabat: function (button) {
        var karyawankerabat = button.up('karyawankerabat');
        karyawankerabat.hapusRecord();
    },
    
    tambahPendidikanformal: function (button) {
        var karyawanpendidikanformal = button.up('karyawanpendidikanformal');
        karyawanpendidikanformal.tambahRecord();
    },
    
    editPendidikanformal: function (button) {
        var karyawanpendidikanformal = button.up('karyawanpendidikanformal');
        karyawanpendidikanformal.editRecord();
    },
    
    hapusPendidikanformal: function (button) {
        var karyawanpendidikanformal = button.up('karyawanpendidikanformal');
        karyawanpendidikanformal.hapusRecord();
    },
    
    tambahPendidikannonformal: function (button) {
        var karyawanpendidikannonformal = button.up('karyawanpendidikannonformal');
        karyawanpendidikannonformal.tambahRecord();
    },
    
    editPendidikannonformal: function (button) {
        var karyawanpendidikannonformal = button.up('karyawanpendidikannonformal');
        karyawanpendidikannonformal.editRecord();
    },
    
    hapusPendidikannonformal: function (button) {
        var karyawanpendidikannonformal = button.up('karyawanpendidikannonformal');
        karyawanpendidikannonformal.hapusRecord();
    },
    
    tambahPengalamankerja: function (button) {
        var karyawanpengalamankerja = button.up('karyawanpengalamankerja');
        karyawanpengalamankerja.tambahRecord();
    },
    
    editPengalamankerja: function (button) {
        var karyawanpengalamankerja = button.up('karyawanpengalamankerja');
        karyawanpengalamankerja.editRecord();
    },
    
    hapusPengalamankerja: function (button) {
        var karyawanpengalamankerja = button.up('karyawanpengalamankerja');
        karyawanpengalamankerja.hapusRecord();
    },
    
    upload: function(button) {
        var win = button.up('window'),
            form = win.down('#formupload');

        form.getForm().waitMsgTarget = form.getEl();
        form.getForm().submit({
            method:'POST',
            params: {karyawan_id: win.isEdit?win.isEdit:0, fileBefore: win.fileBefore?win.fileBefore:''},
            url: 'api/store/karyawan/photoSave.php',
            waitMsg: 'Upload...',
            success: function(form, action) {
                win.fileBefore = action.result.filename;
                win.down('karyawanprofil').loadLogo(win.fileBefore);
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
    },
    
    baru: function(button) {
        var win = button.up('window'),
            wins = new Ext.create('Admin.view.webdesktop.karyawan.edit', {
            title: 'Karyawan',
            parent: button.up('window'),
            aksesStore: button.up('window').aksesStore,
            path: 'karyawan',
            save: 'save',
            modulId :'karyawanBaru',
            grupAkses: win.grupAkses
        });

        win.cUtama.showWindow(win.tab, wins);
    },

    edit: function(button) {
        var win = button.up('window'),
            wins = new Ext.create('Admin.view.webdesktop.karyawan.edit', {
            title: 'Edit Karyawan',
            parent: button.up('window'),
            aksesStore: button.up('window').aksesStore,
            path: 'karyawan',
            save: 'update',
            modulId : 'karyawanEdit',
            isEdit: button.up('window').down('#selected').getValue(),
            grupAkses: win.grupAkses
        });
         
        win.cUtama.showWindow(win.tab, wins);
    },

  
    hapus: function(button) {
        var win = button.up('window');

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {
                win.down('form').getForm().waitMsgTarget = win.getEl();
                win.down('form').getForm().submit({
                    method:'POST',
                    url: 'api/store/karyawan/delete.php',
                    waitMsg: 'Delete...',
                    success:function(form, action) {
                        Ext.Msg.alert('Sukses', action.result.message, function(btn, text){
                            win.down('plgrid').store.loadPage(1);
                        });
                    },
                    failure:function(form, action){
                        Ext.MessageBox.show({
                            title: 'Gagal',
                            msg: action.result?action.result.message:'Kesalahan sistem, ulangi lagi.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR,
                            fn: function() {
                                win.down('plgrid').store.loadPage(1);
                            }
                        })
                    }
                });
            }
        });
    },

    simpanData: function(button) {
        var win  = button.up('window'),
            form = win.down('form');
        if(!form.getForm().isValid()) return;

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn,text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = win.getEl();
                form.getForm().submit({
		    method:'POST',
                    params: {
                        id: win.isEdit,
                        photo: win.fileBefore,
                        keluarga: win.down('karyawankeluarga').getDetail(),
                        orangtuawali: win.down('karyawanorangtuawali').getDetail(),
                        kerabat: win.down('karyawankerabat').getDetail(),
                        pendidikanformal: win.down('karyawanpendidikanformal').getDetail(),
                        pendidikannonformal: win.down('karyawanpendidikannonformal').getDetail(),
                        pengalamankerja: win.down('karyawanpengalamankerja').getDetail()
                    },
                    url: 'api/store/karyawan/' + win.save + '.php',
                    waitMsg: 'Simpan...',
                    success:function(form, action) {
                        Ext.Msg.alert('Sukses', action.result.message, function(btn, text){
                            win.close();
                            win.parent.down('plgrid').store.loadPage(1);
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
    }

});