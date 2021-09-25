Ext.define('Admin.controller.lemburreguler', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.lemburreguler.edit', 'webdesktop.lemburreguler.detail'],
    
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
            
            'lemburregulerdetail button[action=tambah]': {
                click: this.tambahItem
            },
            'lemburregulerdetail button[action=edit]': {
                click: this.editItem
            },
            'lemburregulerdetail button[action=hapus]': {
                click: this.hapusItem
            },
            'lemburregulerdetail button[action=cetak]': {
                click: this.cetakData
            },
            
            'lemburregulerdetail': {
                render: this.winRender
            }
        });
    },
    
    tambahItem: function (button) {
        var lemburregulerdetail = button.up('lemburregulerdetail');
        lemburregulerdetail.tambahRecord();
    },
    
    editItem: function (button) {
        var lemburregulerdetail = button.up('lemburregulerdetail');
        lemburregulerdetail.editRecord();
    },
    
    hapusItem: function (button) {
        var lemburregulerdetail = button.up('lemburregulerdetail');
        lemburregulerdetail.hapusRecord();
    },
    
    cetakData: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }
});