Ext.define('Admin.view.setting.SettingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.setting',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        if(viewType && viewType!='webdesktop') {
            this.onEditButtonClick();
        }
    },

    setCurrentView: function(view, params) {
        var contentPanel = this.getView().down('#contentPanel');

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if(!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)){
            return false;
        }

        if (params && params.openWindow) {
            var cfg = Ext.apply({
                xtype: 'setting-window',
                items: [
                    Ext.apply({
                        xtype: view
                    }, params.targetCfg)
                ]
            }, params.windowCfg);

            Ext.create(cfg);
        } else {
            Ext.suspendLayouts();

            contentPanel.removeAll(true);
            contentPanel.add(
                Ext.apply({
                    xtype: view
                }, params)
            );

            Ext.resumeLayouts(true);
        }
    },

    onEditButtonClick: function(btn) {
        this.setCurrentView('setting-umum', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                //put any extra configs for your view here
                grid: gridpanel,
                idEdit: gridpanel.idSelect
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Umum',
                width: 450,
                height: 520
            }
        });
    },
    
    onLoadData: function(form) {
        var win = this.getView();
        var form = win.down('setting-umum');
        
        form.load({
            //waitMsg: 'Loading...',
            method: 'GET',
            url: './server/public/setting',
            success: function (frm, action) {
                console.log(win.viewType);    
            },
            failure: function (frm, action) {
                var json = Ext.JSON.decode(action.response.responseText);
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: json['message'],
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn : function(buttonValue, inputText, showConfig) {
                        if (win) {
                            win.close();
                        }
                    }
                });
            }
        });
        
    },

    onSaveButtonClick: function(btn) {
        var win = this.getView();
        var form = win.down('setting-umum');

        if(form.getForm().isValid()) {
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
                if(btn=='yes') {
                    form.getForm().waitMsgTarget = win.getEl();
                    form.getForm().submit({
                        method:'POST',
                        url: './server/public/setting/update',
                        waitMsg: 'Simpan...',
                        success:function(frm, action) {
                            var json = Ext.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                
                            });
                        },
    
                        failure:function(frm, action) {
                            var json = Ext.JSON.decode(action.response.responseText);
                            Ext.MessageBox.show({
                                title: 'Gagal',
                                msg: json['message'],
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            })
                        }
                    });
                }
            });
        }
    },

    onCancelButtonClick: function(btn) {
        var win = btn.up('window');
        if (win) {
            win.close();
            
        }
    }

});
