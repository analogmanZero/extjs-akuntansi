Ext.define('Admin.view.ujian.UjianModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ujian',
    
    stores: {
        results: {
            type: 'ujian'
        }/*,
        
        kelasujian: {
            type: 'kelasujiantree'
        }*/
    }

});
