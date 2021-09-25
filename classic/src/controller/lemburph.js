Ext.define('Admin.controller.lemburph', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.lemburph.edit', 'webdesktop.lemburph.header', 'webdesktop.lemburph.detail', 'webdesktop.lemburph.tombol'],
    
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
            
            'lemburphedit button[action=tambah]': {
                click: this.tambahItem
            },
            'lemburphedit button[action=edit]': {
                click: this.editItem
            },
            'lemburphedit button[action=hapus]': {
                click: this.hapusItem
            },
            'lemburphedit button[action=cetak]': {
                click: this.cetakData
            },
            
            'lemburphedit': {
                render: this.winRender
            }
        });
    },
    
    tambahItem: function (button) {
        var lemburphedit = button.up('lemburphedit');
        lemburphedit.down('lemburphdetail').tambahRecord();
    },
    
    editItem: function (button) {
        var lemburphedit = button.up('lemburphedit');
        lemburphedit.down('lemburphdetail').editRecord();
    },
    
    hapusItem: function (button) {
        var lemburphedit = button.up('lemburphedit');
        lemburphedit.down('lemburphdetail').hapusRecord();
    },
    
    cetakData: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }
});