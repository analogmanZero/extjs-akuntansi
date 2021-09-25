Ext.define('Admin.controller.lokasikerja', {
    extend: 'Ext.app.Controller',

    models: ['lokasikerja.edit'],
    views: ['webdesktop.lokasikerja.list', 'webdesktop.lokasikerja.edit'],

    init: function() {

        this.control({
            'lokasikerjalist button[action=baru]': {
                click: this.baru
            },

            'lokasikerjalist button[action=edit]': {
                click: this.edit
            },

            'lokasikerjalist button[action=hapus]': {
                click: this.hapus
            },

            'lokasikerjaedit button[action=save]': {
                click: this.save
            }

        });
    },   
    
    baru: function(button) {
        var win = button.up('window'),
            wins = new Ext.create('Admin.view.webdesktop.lokasikerja.edit', {
            title: 'Tambah Lokasi Kerja',
            parent: button.up('window'),
            aksesStore: button.up('window').aksesStore,
            path: 'lokasikerja',
            save: 'save',
            modulId :'lokasikerjaBaru'
        });

        win.cUtama.showWindow(win.tab, wins);
    },

    edit: function(button) {
        var win = button.up('window'),
            wins = new Ext.create('Admin.view.webdesktop.lokasikerja.edit', {
            title: 'Edit Lokasi Kerja',
            parent: button.up('window'),
            aksesStore: button.up('window').aksesStore,
            path: 'lokasikerja',
            save: 'update',
            modulId : 'lokasikerjaEdit',
            isEdit: button.up('window').down('#selected').getValue()
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
                    url: 'api/store/lokasikerja/delete.php',
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

    save: function(button) {
        var win  = button.up('window'),
            form = win.down('form');
        if(!form.getForm().isValid()) return;

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn,text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = win.getEl();
                form.getForm().submit({
		    method:'POST',
                    params: {
                        id: win.isEdit
                    },
                    url: 'api/store/lokasikerja/' + win.save + '.php',
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