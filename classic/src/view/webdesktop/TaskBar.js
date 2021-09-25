Ext.define('Admin.view.webdesktop.TaskBar', {
    extend: 'Ext.toolbar.Toolbar', 
    xtype: 'xtaskbar',

    cls: 'ux-taskbar',
    startBtnText: 'Start',

    initComponent: function () {
        var me = this;
        me.windowBar = new Ext.toolbar.Toolbar(me.getWindowBarConfig());

        me.startMenu =  Ext.create('Admin.view.webdesktop.StartMenu', {
            iconCls: 'user',
            height: 400,
            toolConfig: {
                width: 150,
                items: [{
                    text:'Ganti Password',
                    iconCls:'options_icon',
                    action: 'change_password',
                    textAlign: 'left'
                }, {
                    text:'Keluar',
                    iconCls:'logout',
                    action: 'logout',
                    textAlign: 'left'
                }]
            }
        }); 
        
        me.items = [{
                xtype: 'button',
                cls: 'ux-start-button',
                iconCls: 'ux-start-button-icon',
                menu: me.startMenu,
                menuAlign: 'bl-tl',
                text: me.startBtnText
            }, {
                xtype: 'splitter', html: '&#160;',
                height: 14, width: 2, // TODO - there should be a CSS way here
                cls: 'x-toolbar-separator x-toolbar-separator-horizontal'
            }, me.windowBar, {
                xtype: 'splitter', html: '&#160;',
                height: 14, width: 2, // TODO - there should be a CSS way here
                cls: 'x-toolbar-separator x-toolbar-separator-horizontal'
            }, {
                xtype: 'trayclock'
            }
        ];

        me.callParent();
    },

    afterLayout: function () {
        var me = this;
        me.callParent();
        me.windowBar.el.on('contextmenu', me.onButtonContextMenu, me);
    },

    /**
     * This method returns the configuration object for the Quick Start toolbar. A derived
     * class can override this method, call the base version to build the config and
     * then modify the returned object before returning it.
     */
    getQuickStart: function () {
        var me = this, ret = {
            minWidth: 20,
            width: 60,
            items: [],
            enableOverflow: true
        };

        Ext.each(this.quickStart, function (item) {
            ret.items.push({
                tooltip: { text: item.name, align: 'bl-tl' },
                //tooltip: item.name,
                overflowText: item.name,
                iconCls: item.iconCls,
                module: item.module,
                handler: me.onQuickStartClick,
                scope: me
            });
        });

        return ret;
    },

    getWindowBarConfig: function () {
        return {
            border: false,
            flex: 1,
            cls: 'ux-desktop-windowbar',
            items: [ '&#160;' ],
            layout: { overflowHandler: 'Scroller' }
        };
    },

    getWindowBtnFromEl: function (el) {
        var c = this.windowBar.getChildByElement(el);
        return c || null;
    },

    onQuickStartClick: function (btn) {
        var module = this.app.getModule(btn.module),
            window;

        if (module) {
            window = module.createWindow();
            window.show();
        }
    },

    onButtonContextMenu: function (e) {
        var me = this, t = e.getTarget(), btn = me.getWindowBtnFromEl(t);
        if (btn) {
            e.stopEvent();
            me.windowMenu.theWin = btn.win;
            me.windowMenu.showBy(t);
        }
    },

    onWindowBtnClick: function (btn) {
        if(btn.menu==undefined) {
            var win = btn.win;
            if (win.minimized || win.hidden) {
                win.show();
            } else if (win.active) {
                win.minimize();
            } else {
                win.toFront();
            }
        }
    },

    createConfig: function(win) {
        return {            
            modulId: win.modulId,
            iconCls: win.iconCls,
            enableToggle: true,
            toggleGroup: 'all',
            width: 140,
            margins: '0 2 0 3',
            text: Ext.util.Format.ellipsis(win.title, 20),
            listeners: {
                click: this.onWindowBtnClick,
                scope: this
            },
            win: win
        };
    },

    addTaskButton: function(win) {        
        var cmp,  me = this,
            config = me.createConfig(win);
            
        var taskbar_menu = Ext.getCmp('taskbar_' + win.modulId);
        //console.log('taskbar_' + win.modulId + ' -> ' + taskbar_menu);
        if(taskbar_menu) {
            config.hidden = true;
            var title = Ext.util.Format.ellipsis(win.title, 20) + ' (' + (1+taskbar_menu.menu.items.length) + ')';
            taskbar_menu.menu.add({
                text: title,
                iconCls: win.iconCls,
                listeners: {
                    click: this.onWindowBtnClick,
                    scope: this
                },
                win: win
            });

            win.setTitle(title);
            win.animateTarget = taskbar_menu.el;

            taskbar_menu.setText(title);
        } else {
            me.windowBar.items.each(function (item) {
                if (item.modulId === win.modulId) {
                    config.hidden = true;
                    item.setVisible(false);
                    taskbar_menu = me.windowBar.insert(me.windowBar.items.indexOf(item), {
                        id: 'taskbar_' + win.modulId,
                        iconCls: win.iconCls,
                        enableToggle: true,
                        toggleGroup: 'all',
                        width: 140,
                        margins: '0 2 0 3',
                        text: Ext.util.Format.ellipsis(win.title, 20) + ' (2)',
                        menu: Ext.menu.Menu({
                            plain: true,
                            items: [{
                                text: Ext.util.Format.ellipsis(item.win.title, 20) + ' (1)',
                                iconCls: item.win.iconCls,
                                listeners: {
                                    click: me.onWindowBtnClick,
                                    scope: me
                                },
                                win: item.win
                            },{
                                text: Ext.util.Format.ellipsis(win.title, 20)  + ' (2)',
                                iconCls: win.iconCls,
                                listeners: {
                                    click: me.onWindowBtnClick,
                                    scope: me
                                },
                                win: win
                            }]
                        })
                    });

                    item.win.setTitle(Ext.util.Format.ellipsis(win.title, 20)  + ' (1)');
                    item.win.animateTarget = Ext.getCmp('taskbar_' + win.modulId).el;

                    win.animateTarget = Ext.getCmp('taskbar_' + win.modulId).el;
                    win.setTitle(Ext.util.Format.ellipsis(win.title, 20)  + ' (2)');

                    return;
                }
            });
        }

        me.onAddTaskBar = taskbar_menu;
        if(taskbar_menu) taskbar_menu.toggle(true);
        cmp = this.windowBar.add(config);
        
        return cmp;
    },

    removeTaskButton: function (btn, win) {
        var found, grup, wins, me = this;

        grup = Ext.getCmp('taskbar_' + win.modulId);
        if(grup) {
            var updateTitle = false;
            for(var i=0; i<grup.menu.items.length; i++) {
                if(!updateTitle && grup.menu.items.getAt(i).win === win)  {
                    grup.menu.remove(grup.menu.items.getAt(i));
                    updateTitle = true; //break;
                }

                if(updateTitle && grup.menu.items.getAt(i)) {
                    grup.menu.items.getAt(i).setText(grup.menu.items.getAt(i).win.mainTitle + ' (' + (i+1) + ')');
                    grup.menu.items.getAt(i).win.setTitle(grup.menu.items.getAt(i).win.mainTitle + ' (' + (i+1) + ')');
                }

            }

            if(grup.menu.items.length === 1) {
                wins =  grup.menu.items.getAt(0).win;
                me.windowBar.remove(grup);
            }


        }
        me.windowBar.items.each(function (item) {
            if (item.win === win) found = item;
            if (wins && item.win === wins) {
                item.setVisible(true);
                item.win.setTitle(item.getText());
                item.win.animateTarget = item.el;
            }
            //return !found;
        });

        if(found) me.windowBar.remove(found);

        return found;
    },

    setActiveButton: function(btn, win) {
        if(this.onAddTaskBar) {
            this.onAddTaskBar = undefined;
            return;
        }
        var taskbar_menu = Ext.getCmp('taskbar_' + win.modulId);
        if(taskbar_menu) {
            //console.log(win.title);
            taskbar_menu.setText(win.title);
            taskbar_menu.toggle(true);
            return;
        }
        
        if (btn) {
            btn.toggle(true);
        } else {
            this.windowBar.items.each(function (item) {
                if (item.isButton) {
                    item.toggle(false);
                }
            });
        }
    }

});