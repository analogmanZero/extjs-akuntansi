Ext.define('Admin.view.pembelian.PembelianController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pembelian',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        if(viewType && viewType!='webdesktop') {
            console.log('pembelian-init');
            this.setCurrentView(viewType);
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
                xtype: 'pembelian-window',
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

    onSelectionChange: function(sm, selections) {
        var grid         = this.getView().down('gridpanel'),
            refs         = this.getReferences(),
            delBtn       = refs.deleteButton,
            edtBtn       = refs.editButton,
            idSelect     = '',
            recordSelect = null;

        for(var i=0; i<sm.getSelection().length; i++) {
            idSelect+=(idSelect!=''?',':'') + sm.getSelection()[i].data['id'];
        }

        if(sm.getSelection().length==1) {
            recordSelect = sm.getSelection()[0];
        }

        delBtn.setDisabled(selections.length == 0);
        edtBtn.setDisabled(selections.length != 1);
        grid.idSelect = idSelect;
    },

    onAddButtonClick: function(btn) {
        var win = this.getView();
        var viewType = win.viewType;
        var gridpanel = win.down('gridpanel'); 

        if(viewType=='webdesktop') {   
            var params = {
                xtype: 'webdesktop-pembelian-edit',
                title: 'Pembelian Baru',
                modulId: 'pembelian-add',
                modal: true,
                constrain: true,
                grid: gridpanel
            };

            win.cUtama.showWindow(win.tab, Ext.create(params));
        } else {
            this.setCurrentView('pembelian-edit', {
                openWindow: true, // Let the controller know that we want this component in the window,
                targetCfg: {
                    //put any extra configs for your view here
                    saveUrl: 'insert',
                    grid: gridpanel
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: 'Tambah Pembelian',
                    width: 450,
                    height: 550
                }
            });
        }
    },
    
    onEditButtonClick: function(btn) {
        var win = this.getView();
        var viewType = win.viewType;
        var gridpanel = win.down('gridpanel'); 

        if(viewType=='webdesktop') {   
            var params = {
                xtype: 'webdesktop-pembelian-edit',
                title: 'Edit Pembelian',
                modulId: 'pembelian-edit',
                modal: true,
                constrain: true,
                grid: gridpanel,
                idEdit: gridpanel.idSelect           
            };

            win.cUtama.showWindow(win.tab, Ext.create(params));
        } else {
            this.setCurrentView('pembelian-edit', {
                openWindow: true, // Let the controller know that we want this component in the window,
                targetCfg: {
                    //put any extra configs for your view here
                    grid: gridpanel,
                    idEdit: gridpanel.idSelect
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: 'Edit Pembelian',
                    width: 450,
                    height: 550
                }
            });
        }
    },
    
    onLoadData: function(form) {
        var win = this.getView();
        var viewType = win.viewType;
        var form = win.down('pembelian-edit');
        var idEdit = viewType=='webdesktop'?win.idEdit:form.idEdit;

        if(idEdit) {
            form.load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/pembelian/'+idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    var grid = form.down('pembelian-edit-detail');
                    var store = grid.getStore();
                    store.loadData(json['detail']);
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
        }
    },

    onDeleteButtonClick: function(btn) {
        
        var gridpanel = this.getView().down('gridpanel');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: gridpanel, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/pembelian/'+gridpanel.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = gridpanel.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-gridpanel.selModel.getSelection().length==0) page--;
                            store.loadPage(page);
                        });
                    },

                    failure: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });
            }
        });
    },

    onSaveButtonClick: function(btn) {
        var win = this.getView();
        var viewType = win.viewType;
        var form = win.down('pembelian-edit');
        var grid = viewType=='webdesktop'?win.grid:form.grid;
        var idEdit = viewType=='webdesktop'?win.idEdit:form.idEdit;
        var saveUrl = idEdit?idEdit+'/update':'insert';
        var editDetail = form.down('pembelian-edit-detail');

        if(form.getForm().isValid()) {
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
                if(btn=='yes') {
                    form.getForm().waitMsgTarget = win.getEl();
                    form.getForm().submit({
                        method:'POST',
                        url: './server/public/pembelian/'+saveUrl,
                        params: {
                            detail: editDetail.getDetail()
                        },
                        waitMsg: 'Simpan...',
                        success:function(frm, action) {
                            var json = Ext.JSON.decode(action.response.responseText);
                            Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                if (win) {
                                    win.close();
                                    grid.getStore().loadPage(1);
                                }
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
