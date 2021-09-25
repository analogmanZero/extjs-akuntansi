Ext.define('Admin.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    requires: [
        'Ext.MessageBox'
    ],

    listen : {
        controller : {
            '#' : {
                unmatchedroute : 'setCurrentView'
            }/*,

            '*' : {
                hiddenToolbar: 'setHiddenToolbar'
            }*/
        }
    },

    routes: {
        ':node': 'setCurrentView'
    },

    config: {
        showNavigation: true
    },

    collapsedCls: 'main-nav-collapsed',

    onNavigationItemClick: function () {
        // The phone profile's controller uses this event to slide out the navigation
        // tree. We don't need to do anything but must be present since we always have
        // the listener on the view...
    },

    onNavigationTreeSelectionChange: function (tree, node) {
        var to = node && (node.get('routeId') || node.get('viewType'));

        if (to) {
            this.redirectTo(to);
        }
    },

    onSwitchToClassic: function () {
        Ext.Msg.confirm('Switch to Classic', 'Are you sure you want to switch toolkits?',
                        'onSwitchToClassicConfirmed', this);
    },

    onSwitchToClassicConfirmed: function (choice) {
        if (choice === 'yes') {
            var obj = Ext.Object.fromQueryString(location.search);

            delete obj.modern;

            obj.classic = '';

            location.search = '?' + Ext.Object.toQueryString(obj).replace('classic=', 'classic');
        } else {
            var button = this.lookup('toolkitSwitch');

            button.setValue(Ext.isModern ? 'modern' : 'classic');
        }
    },

    onToggleNavigationSize: function () {
        this.setShowNavigation(!this.getShowNavigation());
    },

    setHiddenToolbar: function(hidden) {
        var toolbarmenu    = this.lookup('toolbarmenu');
        toolbarmenu.setHidden(hidden);
    },

    setCurrentView: function (hashTag) {

        var user           = localStorage.getItem('m_user'),
            menu           = localStorage.getItem('m_menu'),
            toolbarmenu    = this.lookup('toolbarmenu'),
            navigationTree = this.lookup('navigationTree'),    
            defpage        = !user?'login':'page404';

        hashTag = (hashTag || '').toLowerCase();

        toolbarmenu.setHidden(!user);
        if(menu && navigationTree.getStore().getCount()==0) {
            //console.log('Size Menu: '+navigationTree.getStore().getCount());            
            var data = JSON.parse(menu);
            navigationTree.getStore().setRoot(data);
        }

        var view  = this.getView(),
            store = navigationTree.getStore(),
            node    = store.findNode('routeId', hashTag) ||
                      store.findNode('viewType', hashTag),

            item    = view.child('component[routeId=' + hashTag + ']'),
            testing = node && node.get('routeId');

        if (!item) {
            var xtypeviews = (node && node.get('viewType')) || defpage;
            //console.log(xtypeviews);

            item = {
                xtype: xtypeviews,
                viewType: testing,
                routeId: hashTag
            };
        }

        view.setActiveItem(item);

        navigationTree.setSelection(node);
    },

    updateShowNavigation: function (showNavigation, oldValue) {
        // Ignore the first update since our initial state is managed specially. This
        // logic depends on view state that must be fully setup before we can toggle
        // things.
        //
        if (oldValue !== undefined) {
            var me = this,
                cls = me.collapsedCls,
                logo = me.lookup('logo'),
                navigation = me.lookup('navigation'),
                navigationTree = me.lookup('navigationTree'),
                rootEl = navigationTree.rootItem.el;

            navigation.toggleCls(cls);
            logo.toggleCls(cls);

            if (showNavigation) {
                // Restore the text and other decorations before we expand so that they
                // will be revealed properly. The forced width is still in force from
                // the collapse so the items won't wrap.
                navigationTree.setMicro(false);
            } else {
                // Ensure the right-side decorations (they get munged by the animation)
                // get clipped by propping up the width of the tree's root item while we
                // are collapsed.
                rootEl.setWidth(rootEl.getWidth());
            }

            logo.element.on({
                single: true,
                transitionend: function () {
                    if (showNavigation) {
                        // after expanding, we should remove the forced width
                        rootEl.setWidth('');
                    } else {
                        navigationTree.setMicro(true);
                    }
                }
            });
        }
    },

    toolbarButtonClick: function (btn) {
        var href = btn.config.href;

        this.redirectTo(href);
    },

    toolbarLogoutClick: function (btn) {
        Ext.Msg.confirm('Logout', 'Yakin untuk keluar?',
                        'onButtonLogoutConfirmed', this);
    },

    onButtonLogoutConfirmed: function (choice) {
        var me = this;
        
        if (choice === 'yes') {
            Ext.Ajax.request({
                method:'GET',
                url: 'server/public/logout',
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    if(json['success']) {

                        localStorage.removeItem('m_user');
                        localStorage.removeItem('m_menu');
                        
                        me.redirectTo('login');
                    }
                },
                failure: function() {
                    
                    Ext.MessageBox.show({
                        title: 'Kesalahan',
                        msg: 'Kesalahan sistem, ulangi lagi.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },
});
