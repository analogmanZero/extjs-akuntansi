Ext.define('Admin.view.tahunpelajaran.TahunPelajaranModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tahunpelajaran',
    
    stores: {
        results: {
            type: 'tahunpelajaran'
        }
    }

});
