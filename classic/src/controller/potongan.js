Ext.define('Admin.controller.potongan', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.potongan.list', 'webdesktop.potongan.absen', 'webdesktop.potongan.ktadiksar', 'webdesktop.potongan.sp', 'webdesktop.potongan.seragam', 
            'webdesktop.potongan.lainlain', 'webdesktop.potongan.bpjs', 'webdesktop.potongan.bpjstkjp', 'webdesktop.potongan.pph21'],
    
    init: function() {
        this.control({
            
            'potonganabsen button[action=tambah]': {
                click: this.tambahItemAbsen
            },
            'potonganabsen button[action=edit]': {
                click: this.editItemAbsen
            },
            'potonganabsen button[action=hapus]': {
                click: this.hapusItemAbsen
            },
            'potonganabsen button[action=cetak]': {
                click: this.cetakDataAbsen
            },
            
            'potonganktadiksar button[action=tambah]': {
                click: this.tambahItemKtaDiksar
            },
            'potonganktadiksar button[action=edit]': {
                click: this.editItemKtaDiksar
            },
            'potonganktadiksar button[action=hapus]': {
                click: this.hapusItemKtaDiksar
            },
            'potonganktadiksar button[action=cetak]': {
                click: this.cetakDataKtaDiksar
            },
            
            'potongansp button[action=tambah]': {
                click: this.tambahItemSp
            },
            'potongansp button[action=edit]': {
                click: this.editItemSp
            },
            'potongansp button[action=hapus]': {
                click: this.hapusItemSp
            },
            'potongansp button[action=cetak]': {
                click: this.cetakDataSp
            },
            
            'potonganseragam button[action=tambah]': {
                click: this.tambahItemSeragam
            },
            'potonganseragam button[action=edit]': {
                click: this.editItemSeragam
            },
            'potonganseragam button[action=hapus]': {
                click: this.hapusItemSeragam
            },
            'potonganseragam button[action=cetak]': {
                click: this.cetakDataSeragam
            },
            
            'potonganlainlain button[action=tambah]': {
                click: this.tambahItemLainlain
            },
            'potonganlainlain button[action=edit]': {
                click: this.editItemLainlain
            },
            'potonganlainlain button[action=hapus]': {
                click: this.hapusItemLainlain
            },
            'potonganlainlain button[action=cetak]': {
                click: this.cetakDataLainlain
            },
            
            'potonganpph21 button[action=cetak]': {
                click: this.cetakDataPph21
            }
        });
    },
    
    tambahItemAbsen: function (button) {
        var potonganabsen = button.up('potonganabsen');
        potonganabsen.tambahRecord();
    },
    
    editItemAbsen: function (button) {
        var potonganabsen = button.up('potonganabsen');
        potonganabsen.editRecord();
    },
    
    hapusItemAbsen: function (button) {
        var potonganabsen = button.up('potonganabsen');
        potonganabsen.hapusRecord();
    },
    
    cetakDataAbsen: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    },
    
    tambahItemKtaDiksar: function (button) {
        var potonganktadiksar = button.up('potonganktadiksar');
        potonganktadiksar.tambahRecord();
    },
    
    editItemKtaDiksar: function (button) {
        var potonganktadiksar = button.up('potonganktadiksar');
        potonganktadiksar.editRecord();
    },
    
    hapusItemKtaDiksar: function (button) {
        var potonganktadiksar = button.up('potonganktadiksar');
        potonganktadiksar.hapusRecord();
    },
    
    cetakDataKtaDiksar: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }, 
    
    tambahItemSp: function (button) {
        var potongansp = button.up('potongansp');
        potongansp.tambahRecord();
    },
    
    editItemSp: function (button) {
        var potongansp = button.up('potongansp');
        potongansp.editRecord();
    },
    
    hapusItemSp: function (button) {
        var potongansp = button.up('potongansp');
        potongansp.hapusRecord();
    },
    
    cetakDataSp: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }, 
    
    tambahItemSeragam: function (button) {
        var potonganseragam = button.up('potonganseragam');
        potonganseragam.tambahRecord();
    },
    
    editItemSeragam: function (button) {
        var potonganseragam = button.up('potonganseragam');
        potonganseragam.editRecord();
    },
    
    hapusItemSeragam: function (button) {
        var potonganseragam = button.up('potonganseragam');
        potonganseragam.hapusRecord();
    },
    
    cetakDataSeragam: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }, 
    
    tambahItemLainlain: function (button) {
        var potonganlainlain = button.up('potonganlainlain');
        potonganlainlain.tambahRecord();
    },
    
    editItemLainlain: function (button) {
        var potonganlainlain = button.up('potonganlainlain');
        potonganlainlain.editRecord();
    },
    
    hapusItemLainlain: function (button) {
        var potonganlainlain = button.up('potonganlainlain');
        potonganlainlain.hapusRecord();
    },
    
    cetakDataLainlain: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    },
    
    cetakDataPph21: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }
});