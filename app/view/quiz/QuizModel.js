Ext.define('Admin.view.quiz.QuizModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.quiz',
    
    stores: {
        results: {
            type: 'quiz'
        }/*,
        
        kelasquiz: {
            type: 'kelasquiztree'
        }*/
    }

});
