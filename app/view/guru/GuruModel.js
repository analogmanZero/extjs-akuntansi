Ext.define('Admin.view.guru.GuruModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.guru',
    
    stores: {
        results: {
            type: 'guru'
        }
    }

});
