Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Admin',

    stores: [
        'NavigationTree',
        'stores'
    ],

    controllers : [
        'utama',
        'user',
        
        'jurnalumum',
        'jurnalmemorial',
        
        'karyawan',
        'gajiprorate',
        'uttretail',
        'uttmigas',
        'uanghadir',
        'potongan',
        'prosesgaji'
    ],

    //defaultToken : 'dashboard',

    // The name of the initial view to create. This class will gain a "viewport" plugin
    // if it does not extend Ext.Viewport.
    //
    mainView: 'Admin.view.webdesktop.menu.VW_Menu', //'Admin.view.main.Main',

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});

