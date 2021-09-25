Ext.define('Admin.view.akun.AkunController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.akun',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        if(viewType && viewType!='webdesktop') {
            console.log('akun-init');
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
                xtype: 'akun-window',
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
                  
        var grid = this.getView().down('treepanel'),
            refs = this.getReferences(),
            delBtn = refs.deleteButton,
            edtBtn = refs.editButton,
            idSelect = '',
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
        var treepanel = win.down('treepanel'); 
        var recordSelected = treepanel.selModel.getSelection();

        if(viewType=='webdesktop') {   
            var params = {
                xtype: 'webdesktop-akun-edit',
                title: 'Akun Baru',
                modulId: 'akun-add',
                modal: true,
                constrain: true,
                grid: treepanel,
                akunselect: recordSelected
            };

            win.cUtama.showWindow(win.tab, Ext.create(params));
        } else {
            this.setCurrentView('akun-edit', {
                openWindow: true, // Let the controller know that we want this component in the window,
                targetCfg: {
                    //put any extra configs for your view here
                    saveUrl: 'insert',
                    grid: treepanel,
                    akunselect: recordSelected
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: 'Tambah Akun',
                    width: 450,
                    height: 550
                }
            });
        }
    },
    
    onEditButtonClick: function(btn) {
        var win = this.getView();
        var viewType = win.viewType;
        var treepanel = win.down('treepanel'); 
        var recordSelected = treepanel.selModel.getSelection();

        if(viewType=='webdesktop') {   
            var params = {
                xtype: 'webdesktop-akun-edit',
                title: 'Edit Akun',
                modulId: 'akun-edit',
                modal: true,
                constrain: true,
                grid: treepanel,
                akunselect: recordSelected,
                idEdit: treepanel.idSelect           
            };

            win.cUtama.showWindow(win.tab, Ext.create(params));
        } else {
            this.setCurrentView('akun-edit', {
                openWindow: true, // Let the controller know that we want this component in the window,
                targetCfg: {
                    //put any extra configs for your view here
                    grid: treepanel,
                    akunselect: recordSelected,
                    idEdit: treepanel.idSelect
                },
                windowCfg: {
                    // Any configs that you would like to apply for window popup goes here
                    title: 'Edit Akun',
                    width: 450,
                    height: 550
                }
            });
        }
    },
    
    onLoadData: function(form) {
        var win = this.getView();
        var viewType = win.viewType;
        var form = win.down('akun-edit');
        var idEdit = viewType=='webdesktop'?win.idEdit:form.idEdit;
        var akunselect = viewType=='webdesktop'?win.akunselect:form.akunselect;
        var combo = form.down('[name=id_parent]');
        var kode_akun = form.down('[name=kode_akun]');

        if(idEdit) {
            form.load({
                //waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/akun/'+idEdit+'/load',
                success: function (frm, action) {
                    console.log(win.viewType);
                    if(akunselect[0].data['id_parent']>0) {                
                        combo.setValue(akunselect[0].data['id_parent']);
                    } else {
                        combo.setValue();
                    }
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
        } else {
            if(akunselect.length>0) {
                Ext.Ajax.request({
                    method:'POST',
                    params: {
                        kode_akun_parent: akunselect[0].data['kode_akun'],  
                        level_parent: akunselect[0].data['level']
                    },
                    url: './server/public/akun/createkodeakun',
                    success: function(response) {
                        var json = Ext.JSON.decode(response.responseText);
                        kode_akun.setValue(akunselect[0].data['kode_akun']+'.'+json['last']);
                        combo.setValue(akunselect[0].data['id']+'');
                    },
                    failure: function() {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'Tidak bisa membuat kode akun.',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });    
                    }
                });
            } else {
                combo.setValue();
            }
        }
    },

    onDeleteButtonClick: function(btn) {
        
        var treepanel = this.getView().down('treepanel');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: treepanel, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/akun/'+treepanel.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = treepanel.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-treepanel.selModel.getSelection().length==0) page--;
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
        var form = win.down('akun-edit');
        var grid = viewType=='webdesktop'?win.grid:form.grid;
        var idEdit = viewType=='webdesktop'?win.idEdit:form.idEdit;
        var saveUrl = idEdit?idEdit+'/update':'insert'

        if(form.getForm().isValid()) {
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
                if(btn=='yes') {
                    form.getForm().waitMsgTarget = win.getEl();
                    form.getForm().submit({
                        method:'POST',
                        url: './server/public/akun/'+saveUrl,
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
    },
    
    onUpdateSaldoAwal: function(btn) {
        var rekeninglist = this.getView().down('akun-list');
        var balance = rekeninglist.isBalance();
        
        if(!balance) {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Saldo tidak seimbang.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });

            return;
        }
        var myMask = new Ext.LoadMask({target: rekeninglist, msg: "Proses..."});
        myMask.show();
        Ext.Ajax.request({
            method:'POST',
            url: './server/public/akun/updatesaldoawal',
            params: {
                data: rekeninglist.data
            },
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                if(json['success']) {
                    for(var key in rekeninglist.recordsEdit)
                        rekeninglist.recordsEdit[key].commit();

                    rekeninglist.down('#saldoButton').setDisabled(true);
                    myMask.hide();
                } else {
                    myMask.hide();
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function() {
                myMask.hide();
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Gagal update saldo awal.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    }
        
});
