Ext.define('Admin.controller.uttretail', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.uttretail.list', 'webdesktop.uttretail.lemburbackup', 'webdesktop.uttretail.lemburph', 'webdesktop.uttretail.lemburspl'],
    
    init: function() {
        this.control({
            
            'uttretaillemburbackup button[action=tambah]': {
                click: this.tambahItemLemburBackup
            },
            'uttretaillemburbackup button[action=edit]': {
                click: this.editItemLemburBackup
            },
            'uttretaillemburbackup button[action=hapus]': {
                click: this.hapusItemLemburBackup
            },
            'uttretaillemburbackup button[action=cetak]': {
                click: this.cetakLemburBackup
            },
            
            'uttretaillemburph button[action=tambah]': {
                click: this.tambahItemLemburPh
            },
            'uttretaillemburph button[action=edit]': {
                click: this.editItemLemburPh
            },
            'uttretaillemburph button[action=hapus]': {
                click: this.hapusItemLemburPh
            },
            'uttretaillemburph button[action=cetak]': {
                click: this.cetakLemburPh
            },
            
            'uttretaillemburspl button[action=tambah]': {
                click: this.tambahItemLemburSpl
            },
            'uttretaillemburspl button[action=edit]': {
                click: this.editItemLemburSpl
            },
            'uttretaillemburspl button[action=hapus]': {
                click: this.hapusItemLemburSpl
            },
            'uttretaillemburspl button[action=cetak]': {
                click: this.cetakLemburSpl
            }
        });
    },
    
    
    tambahItemLemburBackup: function (button) {
        var uttretaillemburbackup = button.up('uttretaillemburbackup');
        uttretaillemburbackup.tambahRecord();
    },
    
    editItemLemburBackup: function (button) {
        var uttretaillemburbackup = button.up('uttretaillemburbackup');
        uttretaillemburbackup.editRecord();
    },
    
    hapusItemLemburBackup: function (button) {
        var uttretaillemburbackup = button.up('uttretaillemburbackup');
        uttretaillemburbackup.hapusRecord();
    },
    
    cetakLemburBackup: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    },
    
    tambahItemLemburPh: function (button) {
        var uttretaillemburph = button.up('uttretaillemburph');
        uttretaillemburph.tambahRecord();
    },
    
    editItemLemburPh: function (button) {
        var uttretaillemburph = button.up('uttretaillemburph');
        uttretaillemburph.editRecord();
    },
    
    hapusItemLemburPh: function (button) {
        var uttretaillemburph = button.up('uttretaillemburph');
        uttretaillemburph.hapusRecord();
    },
    
    cetakLemburPh: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    },
    
    tambahItemLemburSpl: function (button) {
        var uttretaillemburspl = button.up('uttretaillemburspl');
        uttretaillemburspl.tambahRecord();
    },
    
    editItemLemburSpl: function (button) {
        var uttretaillemburspl = button.up('uttretaillemburspl');
        uttretaillemburspl.editRecord();
    },
    
    hapusItemLemburSpl: function (button) {
        var uttretaillemburspl = button.up('uttretaillemburspl');
        uttretaillemburspl.hapusRecord();
    },
    
    cetakLemburSpl: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.splp?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    }
});