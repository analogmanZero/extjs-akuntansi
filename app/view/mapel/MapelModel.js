Ext.define('Admin.view.mapel.MapelModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.mapel',
    
    stores: {
        results: {
            type: 'mapel'
        }
    }

});
