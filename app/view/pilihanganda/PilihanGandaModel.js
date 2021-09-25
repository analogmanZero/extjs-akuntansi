Ext.define('Admin.view.pilihanganda.PilihanGandaModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pilihanganda',
    
    stores: {
        ujian_results: {
            type: 'ujian'
        },

        pilihanganda_results: {
            type: 'pilihanganda'
        }
    }

});
