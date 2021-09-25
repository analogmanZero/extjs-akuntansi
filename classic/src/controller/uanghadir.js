Ext.define('Admin.controller.uanghadir', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.uanghadir.list', 'webdesktop.uanghadir.detail'],
    
    init: function() {
        this.control({
            
            'uanghadirdetail button[action=edit]': {
                click: this.editItem
            },
            'uanghadirdetail button[action=cetak]': {
                click: this.cetakItem
            }
        });
    },
    
    editItem: function (button) {
        var uanghadirdetail = button.up('uanghadirdetail');
        uanghadirdetail.editRecord();
    },
    
    cetakItem: function(button) {
        
        /*var reportFileName = 'jurnal/buktikasdanbank.jrxml';
        var tag = '&notrx='+notrx+'&terbilang=';
        
        window.open('api/store/cetakLaporan.php?filename=' + reportFileName + tag,
            'cetakbuktikasdanbank', 'width=715, height=565, toolbar=no, menubar=no, scrollbars=yes');*/
        
    }
});