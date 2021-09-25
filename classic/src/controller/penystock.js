Ext.define('Admin.controller.penystock', {
    extend: 'Ext.app.Controller',

    views: ['webdesktop.inv.penystock.list', 'webdesktop.inv.stockawal.list'],

    init: function() {       

        this.control({

            'plgrid[itemId=penystock-list] button[action=baru]': {
                click: this.tambahPs
            },

            'plgrid[itemId=stockawal-list] button[action=baru]': {
                click: this.tambahSa
            }
        });
    },

    tambahPs: function(button) {
        var grid = button.up('plgrid');
        var win = button.up('window');
        
        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});
        myMask.show();

        var wins =  new Ext.create('Admin.view.webdesktop.so.edit', {
            title: 'Tambah Penyesuaian Stok',
            gridId: grid.itemId,
            parent: button.up('window'),
            menu: 'inventori',
            form: 'penystock',
            path: 'penystock',
            status: 'PS',
            width: 1025,
            height: 505,
            isEdit: false,
            headers: [['penystock','', 115]],
            details: [['grid','Utama'], ['detail', 'Detail']],
            akses: button.up('window').akses,
            aksesStore: button.up('window').aksesStore,
            itemId: 'tambahPS',
            modulId :'tambahPS',
            listeners: {
                show: function() {
                    myMask.hide();
                }
            }
        });

          win.cUtama.showWindow(win.tab, wins);      
        
    },

    tambahSa: function(button) {
        var grid = button.up('plgrid');
        var win = button.up('window');

        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});
        myMask.show();

        var wins =  new Ext.create('Admin.view.webdesktop.so.edit', {
            title: 'Tambah Stok Awal',
            gridId: grid.itemId,
            parent: button.up('window'),
            menu: 'inventori',
            form: 'penystock',
            path: 'penystock',
            status: 'SA',
            width: 1025,
            height: 505,
            isEdit: false,
            headers: [['penystock','', 90]],
            details: [['grid','Utama'], ['detail', 'Detail']],
            akses: button.up('window').akses,
            aksesStore: button.up('window').aksesStore,
            itemId: 'tambahPS',
            modulId :'tambahPS',
            listeners: {
                show: function() {
                    myMask.hide();
                }
            }
        });

          win.cUtama.showWindow(win.tab, wins);

    }

});