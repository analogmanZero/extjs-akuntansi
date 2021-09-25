Ext.define('Admin.controller.perusahaan', {
    extend: 'Ext.app.Controller',
    
    init: function() {       

        this.control({
            'perusahaanlist': {
                afterrender: this.ar
            },
            'perusahaanlist button[action=baru]': {
                click: this.tambah
            },
            'perusahaanlist button[action=hapus]': {
                click: this.hapus
            }           
            
        });
    },
    ar: function(win) {
        win.down('#editButton').setVisible(false);
    },
    
    tambah: function(button) {
        var win = button.up('window'),
            wins = new Ext.create('Admin.view.webdesktop.perusahaan.edit');  
        win.cUtama.showWindow(win.tab, wins);
    },   

    hapus: function(button) {
        var win = button.up('window'),
            form = win.down('form');

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data perusahaan yang dipilih?', function(btn,text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.up('window').getEl();
                form.getForm().submit({
                    method:'POST',
                    url: 'api/store/perusahaan/delete.php',
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
                            icon: Ext.MessageBox.ERROR
                        })
                    }
                });
            }
        });
    }

});