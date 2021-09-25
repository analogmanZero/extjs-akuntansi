Ext.define('Admin.controller.uttmigas', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.uttmigas.list', 'webdesktop.uttmigas.lemburreguler', 'webdesktop.uttmigas.lemburbackup', 'webdesktop.uttmigas.lemburph'],
    
    init: function() {
        this.control({
            
            'uttmigaslemburreguler button[action=tambah]': {
                click: this.tambahItemLemburReguler
            },
            'uttmigaslemburreguler button[action=edit]': {
                click: this.editItemLemburReguler
            },
            'uttmigaslemburreguler button[action=hapus]': {
                click: this.hapusItemLemburReguler
            },
            'uttmigaslemburreguler button[action=cetak]': {
                click: this.cetakLemburReguler
            },
            
            'uttmigaslemburbackup button[action=tambah]': {
                click: this.tambahItemLemburBackup
            },
            'uttmigaslemburbackup button[action=edit]': {
                click: this.editItemLemburBackup
            },
            'uttmigaslemburbackup button[action=hapus]': {
                click: this.hapusItemLemburBackup
            },
            'uttmigaslemburbackup button[action=cetak]': {
                click: this.cetakLemburBackup
            },
            
            'uttmigaslemburph button[action=tambah]': {
                click: this.tambahItemLemburPh
            },
            'uttmigaslemburph button[action=edit]': {
                click: this.editItemLemburPh
            },
            'uttmigaslemburph button[action=hapus]': {
                click: this.hapusItemLemburPh
            },
            'uttmigaslemburph button[action=cetak]': {
                click: this.cetakLemburPh
            }
        });
    },
    
    tambahItemLemburReguler: function (button) {
        var uttmigaslemburreguler = button.up('uttmigaslemburreguler');
        uttmigaslemburreguler.tambahRecord();
    },
    
    editItemLemburReguler: function (button) {
        var uttmigaslemburreguler = button.up('uttmigaslemburreguler');
        uttmigaslemburreguler.editRecord();
    },
    
    hapusItemLemburReguler: function (button) {
        var uttmigaslemburreguler = button.up('uttmigaslemburreguler');
        uttmigaslemburreguler.hapusRecord();
    },
    
    cetakLemburReguler: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    },
    
    tambahItemLemburBackup: function (button) {
        var uttmigaslemburbackup = button.up('uttmigaslemburbackup');
        uttmigaslemburbackup.tambahRecord();
    },
    
    editItemLemburBackup: function (button) {
        var uttmigaslemburbackup = button.up('uttmigaslemburbackup');
        uttmigaslemburbackup.editRecord();
    },
    
    hapusItemLemburBackup: function (button) {
        var uttmigaslemburbackup = button.up('uttmigaslemburbackup');
        uttmigaslemburbackup.hapusRecord();
    },
    
    cetakLemburBackup: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    },
    
    tambahItemLemburPh: function (button) {
        var uttmigaslemburph = button.up('uttmigaslemburph');
        uttmigaslemburph.tambahRecord();
    },
    
    editItemLemburPh: function (button) {
        var uttmigaslemburph = button.up('uttmigaslemburph');
        uttmigaslemburph.editRecord();
    },
    
    hapusItemLemburPh: function (button) {
        var uttmigaslemburph = button.up('uttmigaslemburph');
        uttmigaslemburph.hapusRecord();
    },
    
    cetakLemburPh: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    }
});