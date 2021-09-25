Ext.define('Admin.controller.lemburbackup', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.lemburbackup.edit', 'webdesktop.lemburbackup.header', 'webdesktop.lemburbackup.detail', 'webdesktop.lemburbackup.tombol'],
    
    winRender: function(win) {
        var me = this;
        
        win.on({
            keydown: {
                element: 'el',
                fn: function (eventObject) {
                    if (eventObject.keyCode == 115)
                        me.simpanData(win.down('#simpan'));
                    if (eventObject.keyCode == 45)
                        me.tambahItem(win.down('#tambah'));
                    if (eventObject.keyCode == 67)
                        me.cetakFaktur(win.down('#cetak'));
                }
            }
        });
    },
    
    init: function() {
        this.control({
            
            'lemburbackupedit button[action=tambah]': {
                click: this.tambahItem
            },
            'lemburbackupedit button[action=edit]': {
                click: this.editItem
            },
            'lemburbackupedit button[action=hapus]': {
                click: this.hapusItem
            },
            'lemburbackupedit button[action=cetak]': {
                click: this.cetakData
            },
            
            'lemburbackupedit': {
                render: this.winRender
            }
        });
    },
    
    tambahItem: function (button) {
        var lemburbackupedit = button.up('lemburbackupedit');
        lemburbackupedit.down('lemburbackupdetail').tambahRecord();
    },
    
    editItem: function (button) {
        var lemburbackupedit = button.up('lemburbackupedit');
        lemburbackupedit.down('lemburbackupdetail').editRecord();
    },
    
    hapusItem: function (button) {
        var lemburbackupedit = button.up('lemburbackupedit');
        lemburbackupedit.down('lemburbackupdetail').hapusRecord();
    },
    
    cetakData: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }
});