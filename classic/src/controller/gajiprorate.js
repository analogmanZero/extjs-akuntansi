Ext.define('Admin.controller.gajiprorate', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.gajiprorate.list', 'webdesktop.gajiprorate.detail', 'webdesktop.gajiprorate.rapel'],
    
    init: function() {
        this.control({
            
            'gajiproratedetail button[action=tambah]': {
                click: this.tambahDetail
            },
            'gajiproratedetail button[action=edit]': {
                click: this.editDetail
            },
            'gajiproratedetail button[action=hapus]': {
                click: this.hapusDetail
            },
            'gajiproratedetail button[action=cetak]': {
                click: this.cetakDetail
            },
            
            'gajiproraterapel button[action=tambah]': {
                click: this.tambahRapel
            },
            'gajiproraterapel button[action=edit]': {
                click: this.editRapel
            },
            'gajiproraterapel button[action=hapus]': {
                click: this.hapusRapel
            },
            'gajiproraterapel button[action=cetak]': {
                click: this.cetakRapel
            }
        });
    },
    
    tambahDetail: function (button) {
        var gajiproratedetail = button.up('gajiproratedetail');
        gajiproratedetail.tambahRecord();
    },
    
    editDetail: function (button) {
        var gajiproratedetail = button.up('gajiproratedetail');
        gajiproratedetail.editRecord();
    },
    
    hapusDetail: function (button) {
        var gajiproratedetail = button.up('gajiproratedetail');
        gajiproratedetail.hapusRecord();
    },
    
    cetakDetail: function(button) {
        
    },
    
    tambahRapel: function (button) {
        var gajiproraterapel = button.up('gajiproraterapel');
        gajiproraterapel.tambahRecord();
    },
    
    editRapel: function (button) {
        var gajiproraterapel = button.up('gajiproraterapel');
        gajiproraterapel.editRecord();
    },
    
    hapusRapel: function (button) {
        var gajiproraterapel = button.up('gajiproraterapel');
        gajiproraterapel.hapusRecord();
    },
    
    cetakRapel: function(button) {
        
    }
});