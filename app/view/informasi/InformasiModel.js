Ext.define('Admin.view.informasi.InformasiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.informasi',
    
    stores: {
        results: {
            type: 'informasi'
        }
    }

});
