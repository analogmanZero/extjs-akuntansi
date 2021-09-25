Ext.define('Admin.controller.potongandanrapel', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.potongandanrapel.list'],
    
    winRender: function(win) {
        var me = this;
        
        win.on({
            keydown: {
                element: 'el',
                fn: function (eventObject) {
                    if (eventObject.keyCode == 119) {
                        me.transaksiBaru(win.down('#baru'));
                    } if (eventObject.keyCode == 115)
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
            
            'transaksipotonganabsenedit button[action=baru]': {
                click: this.transaksiBaru                
            },
            'transaksipotonganabsenedit button[action=tambah]': {
                click: this.tambahItem
            },
            'transaksipotonganabsenedit button[action=edit]': {
                click: this.editItem
            },
            'transaksipotonganabsenedit button[action=hapus]': {
                click: this.hapusItem
            },
            'transaksipotonganabsenedit button[action=simpan]': {
                click: this.simpanData
            },
            'transaksipotonganabsenedit button[action=cetak]': {
                click: this.cetakData
            },
            
            'transaksipotonganabsenedit': {
                render: this.winRender
            }
        });
    },
    
    transaksiBaru: function(button) {
        var transaksipotonganabsenedit = button.up('transaksipotonganabsenedit');
        
        if(!transaksipotonganabsenedit.down('transaksipotonganabsentombol').down('#baru').disabled) {
            transaksipotonganabsenedit.down('form').getForm().reset();
            transaksipotonganabsenedit.down('transaksipotonganabsenheader').transaksiBaru();
            transaksipotonganabsenedit.down('transaksipotonganabsendetail').transaksiBaru();
            transaksipotonganabsenedit.down('transaksipotonganabsentombol').transaksiBaru();
        }
    },
    
    tambahItem: function (button) {
        var transaksipotonganabsenedit = button.up('transaksipotonganabsenedit');
        transaksipotonganabsenedit.down('transaksipotonganabsendetail').tambahRecord();
    },
    
    editItem: function (button) {
        var transaksipotonganabsenedit = button.up('transaksipotonganabsenedit');
        transaksipotonganabsenedit.down('transaksipotonganabsendetail').editRecord();
    },
    
    hapusItem: function (button) {
        var transaksipotonganabsenedit = button.up('transaksipotonganabsenedit');
        transaksipotonganabsenedit.down('transaksipotonganabsendetail').hapusRecord();
    },
    
    simpanData: function(button) {
        var me = this;
        var transaksipotonganabsenedit = button.up('transaksipotonganabsenedit');
        var detail = transaksipotonganabsenedit.down('transaksipotonganabsendetail').getDetail();
        if(!transaksipotonganabsenedit.down('form').getForm().isValid()) return;
        
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn,text) {
            if(btn=='yes') {
                transaksipotonganabsenedit.down('form').getForm().waitMsgTarget = transaksipotonganabsenedit.getEl();
                transaksipotonganabsenedit.down('form').getForm().submit({
                    params: {
                        selected: transaksipotonganabsenedit.isEdit,
                        detail: detail
                    },
                    method:'POST',
                    url: 'api/store/potongandanrapel/save.php',
                    waitMsg: 'Simpan...',
                    success:function(f, a) {
                        Ext.Msg.alert('Sukses', a.result.message, function(btn, text){
                            transaksipotonganabsenedit.down('transaksipotonganabsenheader').transaksiSave();
                            transaksipotonganabsenedit.down('transaksipotonganabsendetail').transaksiSave();
                            transaksipotonganabsenedit.down('transaksipotonganabsentombol').suksesSimpan();                                 
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
    },
    
    cetakData: function(button) {
        var notrx = button.up('window').down('#nobukti').getSubmitValue();        
        
        var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');
    }
});