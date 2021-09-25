Ext.define('Admin.view.siswa.SiswaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.siswa',
    
    stores: {
        results: {
            type: 'siswa'
        }
    }

});
