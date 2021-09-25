Ext.define('Admin.view.essai.EssaiModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.essai',
    
    stores: {
        ujian_results: {
            type: 'ujian'
        },
        
        essai_results: {
            type: 'essai'
        }
    }

});
