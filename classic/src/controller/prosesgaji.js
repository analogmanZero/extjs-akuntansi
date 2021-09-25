Ext.define('Admin.controller.prosesgaji', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.prosesgaji.edit', 'webdesktop.prosesgaji.detail'],
    
    init: function() {
        this.control({
            
            'prosesgajiedit button[action=proses]': {
                click: this.prosesGaji
            },
            'prosesgajiedit button[action=cetak]': {
                click: this.cetakSlip
            }
        });
    },
    
    prosesGaji: function (button) {
        var me = button.up('prosesgajidetail');
        var periode = me.down('#periode').getSubmitValue().split('-');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin ingin Proses Gaji bulan '+periode[1]+'-'+periode[0]+'?', function(btn, text) {
            if(btn=='yes') {
                me.prosesGaji(me.down('#periode').getSubmitValue());
            }
        });
    },
    
    cetakSlip: function(button) {
        var me = button.up('prosesgajidetail');
        var periode = me.down('#periode').getSubmitValue()+'-01';
        var query   = me.down('#query').searchVal;
        
        var reportFileName = 'payroll/DetailReviewGaji.jrxml';
        var myMask = new Ext.LoadMask({target: button.up('window'), msg: "Cetak..."});

        myMask.show();
        Ext.Ajax.request({
            method:'POST',
            url: 'reports/exec.php',
            params: {
                periode: periode,
                query: query,
                subreport: 'payroll',
                reportFileName: reportFileName
            },
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                if(json['success']) {
                    window.open('reports/readFile.php?filename='+json['filename'],
                    'bukubesar', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
                    myMask.hide();
                } else {
                    myMask.hide();
                    Ext.MessageBox.show({
                        title: "Kesalahan",
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function() {
                myMask.hide();
                Ext.MessageBox.show({
                    title: "Kesalahan",
                    msg: "Respon server error. Coba lagi.",
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    }
});