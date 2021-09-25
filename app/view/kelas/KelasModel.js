Ext.define('Admin.view.kelas.KelasModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.kelas',
    
    stores: {
        kelas_results: {
            type: 'kelas'
        },

        ruang_results: {
            type: 'ruang'
        },

    }

});
