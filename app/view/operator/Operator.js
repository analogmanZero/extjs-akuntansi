Ext.define('Admin.view.operator.OperatorModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.operator',
    
    stores: {
        results: {
            type: 'operator'
        }
    }

});
