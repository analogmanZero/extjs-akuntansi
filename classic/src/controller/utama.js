Ext.define('Admin.controller.utama', {
    extend: 'Ext.app.Controller',
    
    views : [
        /*'webdesktop.menu.VW_Menu',
        'webdesktop.DataView',
        'webdesktop.TaskBar',
        'webdesktop.StartMenu',*/

        'webdesktop.menu.viewIconMenu',
        'webdesktop.menu.viewIconMenu_gerak',
        'webdesktop.menu.winMenuUtama',
        'webdesktop.menu.winMenuAkuntansi',
        'webdesktop.menu.winMenuJual',
        'webdesktop.menu.winMenuBeli',
        'webdesktop.menu.winMenuBudgetholder',
        'webdesktop.menu.winMenuInventori',
        'webdesktop.menu.winMenuLaporan',
        'webdesktop.menu.winMenuLaporanPayroll',
        
        'webdesktop.laporan.akuntansi.all',
        'webdesktop.laporan.akuntansi.bukubesar',
        'webdesktop.laporan.akuntansi.jurnal',
        'webdesktop.laporan.akuntansi.labarugi',
        'webdesktop.laporan.akuntansi.neraca',
        'webdesktop.laporan.akuntansi.rincianbh',
        'webdesktop.laporan.akuntansi.neracasaldo',
        'webdesktop.laporan.akuntansi.prb_modal',
        
        'webdesktop.laporan.payroll.datakaryawan',
        'webdesktop.laporan.payroll.proraterapel',
        'webdesktop.laporan.payroll.lemburretail',
        'webdesktop.laporan.payroll.lemburmigas',
        'webdesktop.laporan.payroll.uanghadir',
        'webdesktop.laporan.payroll.slipgaji',
        'webdesktop.laporan.payroll.bayargaji',
        'webdesktop.laporan.payroll.reviewgaji',
        'webdesktop.laporan.payroll.detailreviewgaji',
        'webdesktop.laporan.payroll.laporanpph21',
        
        'webdesktop.akses',
        'webdesktop.plgrid',
        'webdesktop.searchField',
        
        'webdesktop.CheckColumn',
        'webdesktop.gridFeatureSummary'
         
    ],

    refs: [{
        ref: 'usermenu',
        selector: 'usermenu'
    }],
    
    init: function() {
        
        this.control({
            'usermenu': {
                afterrender: this.afterrender
            },

            'xtaskbar menu': {
                click: this.menuClick
            },

            'button[action=logout]': {
                click: this.logout
            },

            'button[action=change_password]': {
                click: this.gantiPassword
            },


            'xdataview': {
                itemclick: this.openModul
            },
            

            /*'usermenu viewIconMenu_gerak[itemId=menuUtama]': {
                itemclick: this.dashboardClick
            },
            
            'mainmenu [action=setuputama]': {
                click: this.showSetupUtama
            },

            'winMenuUtama viewIconMenu': {
                itemclick: this.dashboardClick
            },
            
            'winMenuBudgetholder viewIconMenu': {
                 itemclick: this.dashboardClick
            },
            
            'winMenuJual viewIconMenu': {
                 itemclick: this.dashboardClick
            },

            'winMenuBukuBesarPembantu viewIconMenu': {
                itemclick: this.dashboardClick
            },

            'winMenuAkutansi viewIconMenu': {
                itemclick: this.dashboardClick
            },

            'winMenuJurnalKhusus viewIconMenu': {
                itemclick: this.dashboardClick
            },

            'winMenuLaporan viewIconMenu': {
                itemclick: this.dashboardClick
            },

            'winMenuLaporanPayroll viewIconMenu': {
                itemclick: this.dashboardClick
            }*/ 
        });
    },

    menuClick: function(menu, item, e, eOpts ) {
        var me = this;
        var tab = me.getUsermenu();
        me.openModulSubMenu(tab, item.modul, item.text, item.akses, item.idItem);
    },

    openModulSubMenu: function(tab, modul, judul, akses, mod_id) {
        var me = this,
            win = Ext.create(modul, {
                viewType: 'webdesktop',
                constrain: true,
                title: judul,
                cUtama: me,
                tab: tab,
                akses: akses,
                modulId: mod_id
            });

        //Ext.create('Admin.view.webdesktop.akses', {}).cekMenu(win, akses);
        this.showWindow(tab, win);
    },

    openModul: function(dv, record, item, index, e, eOpts ) {
        //for(var key in record.data)
            //console.log(record.data[key] + ' => ' + key);
        
        //alert(record.data['mod_id']);
        var me = this,
            tab = me.getUsermenu(),
            akses = record.data['akses'],
            win = Ext.create(record.data['modul'], {
                icon: record.data['iconfilename'],
                tipeuser: me.tipeuser,
                cUtama: me,
                tab: tab,
                constrain: true,
                akses: akses,
                modulId: record.data['kode'],
                closeAction: 'hide'
            });

        Ext.create('Admin.view.webdesktop.akses', {}).cekMenu(win, akses);
        this.showWindow(tab, win);
    },

    afterrender: function(usermenu) {
        var me = this;

        Ext.Ajax.request({
            url: './server/public/akses',
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);

                var login = json['login'];
                var user = json['user'];
                var shortcut = json['shortcut'];
                var menu = json['menu'];

                usermenu.down('xtaskbar').setVisible(login);
                usermenu.down('xdataview').getStore().loadRawData(shortcut);
                if(!login) {
                    me.showLoginWindow();    
                } else {
                    usermenu.down('xtaskbar').startMenu.setTitle(user['nama']);
                    usermenu.down('xtaskbar').startMenu.add(menu);
                }
            },

            failure: function() {
                me.showLoginWindow();   
            }
        });
    },

     showLoginWindow: function() {
        var me = this,
            usermenu = me.getUsermenu();

        Ext.create({
            xtype: 'webdesktop-login',
            usermenu: usermenu
        }).show();
    },

    logout: function() {

        var me = this,
            usermenu = me.getUsermenu();

        Ext.MessageBox.show({
            title: 'Konfirmasi',
            msg: 'Yakin ingin keluar?',
            buttons: Ext.MessageBox.YESNO,
            fn: function(btn, text) {
                if(btn=='yes') {
                    var myMask = new Ext.LoadMask({target: usermenu, msg: 'Logout...'});
                    myMask.show();

                    Ext.Ajax.request({
                        method: 'GET',
                        url: './server/public/logout',
                        success: function() {                            
                            
                            usermenu.down('xtaskbar').setVisible(false);
                            usermenu.down('xdataview').getStore().removeAll();

                            me.closeAllWindow();
                            me.showLoginWindow();
                            myMask.hide();
                        }
                    });
                }
            }
        });
    },

    gantiPassword: function(b) {
        Ext.create('Admin.view.webdesktop.gantipassword.edit').show();

    },

    dashboardClick: function(dataview, record, item, number, e) {

        var me = this,
            usermenu = me.getUsermenu(),
            tab = usermenu,
            params = {
            cUtama: me,
            constrain: true,
            tab: tab,
            akses: new Admin.view.akses()
        };
        

        for(var key in record.get('params')) {
            params[key] = record.get('params')[key];
        }

        var win = Ext.create(record.get('modul'), params);
        me.showWindow(tab, win);        
        
        setTimeout(function() {
            for(var key in win.tabs) {
                //console.log(key + ' --> ' + win.tabs[key]);
                //console.log(win.tabs[key]['tabId'] + ' --> ' + win.tabs[key]['fiturAkses']);
                if(win.tabs[key]['fiturAkses']!=undefined) {               
                   //alert(win.tabs[key]['tabId'] + ' --> ' + win.tabs[key]['fiturAkses']);
                   //alert(win.down('[modulId='+win.tabs[key]['tabId']+']').down('#baruButton').isVisible());
                    //if(win.down('[modulId='+win.tabs[key]['tabId']+']').down('#baruButton')!=undefined && win.down('[modulId='+win.tabs[key]['tabId']+']').down('#baruButton').isVisible()) win.down('[modulId='+win.tabs[key]['tabId']+']').down('#baruButton').setVisible(win.tabs[key]['fiturAkses'][0]=='Y');
                    if(win.down('[modulId='+win.tabs[key]['tabId']+']').down('#editButton')!=undefined) win.down('[modulId='+win.tabs[key]['tabId']+']').down('#editButton').setVisible(win.tabs[key]['fiturAkses'][1]=='Y');
                    if(win.down('[modulId='+win.tabs[key]['tabId']+']').down('#removeButton')!=undefined) win.down('[modulId='+win.tabs[key]['tabId']+']').down('#removeButton').setVisible(win.tabs[key]['fiturAkses'][2]=='Y');
                }
            }
            
            if(win.fiturAkses!=undefined) {
                //alert(win.fiturAkses[1]);
                if(win.down('#baruButton')!=undefined && win.down('#baruButton').isVisible()) win.down('#baruButton').setVisible(win.fiturAkses[0]=='Y');
                if(win.down('#editButton')!=undefined && win.down('#editButton').isVisible()) win.down('#editButton').setVisible(win.fiturAkses[1]=='Y');
                if(win.down('#removeButton')!=undefined && win.down('#removeButton').isVisible()) win.down('#removeButton').setVisible(win.fiturAkses[2]=='Y');
            }   
        }, 330);
    },

    showWindow: function(tab, w) {
        //alert( w.modulId);        
        var me = this,
            usermenu = me.getUsermenu(),
            open = true;

        var xtaskbar_menu = Ext.getCmp('xtaskbar_' + w.modulId);
        if(xtaskbar_menu) {
            w.destroy();
            open = false;
            var win = xtaskbar_menu.win;
            if (win.minimized || win.hidden) {
                win.show();
            }else {
                win.toFront();
            }

        } else {

            usermenu.down('xtaskbar').windowBar.items.each(function (item) {
                if (item.modulId === w.modulId) {
                    w.destroy();
                    open = false;

                    var win = item.win;
                    if (win.minimized || win.hidden) {
                        win.show();
                    }else {
                        win.toFront();
                    }
                    return;
                }
            });
        }

        if(open) {
            var f = function() {
                return function() {
                    w.viewType = 'webdesktop';
                    w.tab = tab;
                    w.stateful = false;
                    w.isWindow = true;
                    w.constrainHeader = true;
                    w.minimizable = !w.modal;
                    w.maximizable = !w.modal;

                    var win = tab.add(w),
                    xtaskbar = usermenu.down('xtaskbar');
                    tab.windows.add(win);

                    win.mainTitle = Ext.util.Format.ellipsis(win.title, 20);
                    win.taskButton = xtaskbar.addTaskButton(win);
                    if(win.animateTarget==undefined) win.animateTarget = win.taskButton.el;

                    win.on({
                        activate: me.updateActiveWindow,
                        beforeshow: me.updateActiveWindow,
                        deactivate: me.updateActiveWindow,
                        minimize: me.minimizeWindow,
                        destroy: me.onWindowClose,
                        scope: me
                    });
                    w.show();
                };
            };

            setTimeout(f(), 0);
        }
    },

    closeAllWindow: function() {
        var me = this,
            usermenu = me.getUsermenu(),
            windows = usermenu.windows;
        for(var i=windows.length-1; i>=0; i--) windows.getAt(i).close();
    },

    onWindowClose: function(win) {
        var me = win.tab,
            usermenu = this.getUsermenu();

        me.windows.remove(win);
        usermenu.down('xtaskbar').removeTaskButton(win.taskButton, win);

        this.updateActiveWindow(win);

    },

    getActiveWindow: function (tab) {
        var win = null,
            zmgr = this.getDesktopZIndexManager(tab);

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function (tab) {
        var windows = tab.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    getWindow: function(id) {
        return this.windows.get(id);
    },

    minimizeWindow: function(win) {
        win.minimized = true;
        win.hide();
    },

    updateActiveWindow: function (win) {
        //console.log('set active');
        var usermenu = this.getUsermenu();
        var me = win.tab,
        activeWindow = this.getActiveWindow(me),
        last = me.lastActiveWindow;
        if (activeWindow === last) {
            usermenu.down('xtaskbar').setActiveButton(activeWindow && activeWindow.taskButton, activeWindow?activeWindow:win);
            return;
        }

        if (last) {
            if (last.el && last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }
        usermenu.down('xtaskbar').setActiveButton(activeWindow && activeWindow.taskButton, activeWindow?activeWindow:win);
    },
    
    validTanggal: function(tanggal) {
        if(tanggal==null || tanggal=='') return false;

        var dt = new Date(tanggal);
        if(isNaN(dt)) return false;

        return true;
    },


    konversiTanggal: function(tanggal) {

        if(!this.validTanggal(tanggal)) return '';

        var dt = new Date(tanggal);
        dt.setDate(dt.getDate());

        return ((String(dt.getDate()).length==1?'0':'') + dt.getDate()) + '-' +
               ((String(dt.getMonth()+1).length==1?'0':'') + (dt.getMonth()+1)) + '-' +
               dt.getFullYear();
    }

});