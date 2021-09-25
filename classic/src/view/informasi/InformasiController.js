Ext.define('Admin.view.informasi.InformasiController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.informasi',

    init: function() {
        var me = this;
        var viewType = me.getView().viewType;
        console.log(viewType);
        this.setCurrentView(viewType);
    },

    onViewLoad: function(form) {
        var judul    = form.down('[name=judul]');
        var kepada    = form.down('[name=kepada]');
        var tanggal    = form.down('[name=tanggal]');
        var dataview = form.down('#dataview-informasi');
        var store    = dataview.getStore();

        //console.log(form.datarecord);
        store.loadRecords(form.datarecord);
        store.loadRecords(form.datarecord);

        judul.setValue(form.datarecord.data['judul']);
        kepada.setValue(form.datarecord.data['kepada']);
        tanggal.setValue(form.datarecord.data['tanggal']);
    },

    onFormLoad: function(form) {
        var me = this;
        if(form.idEdit) {        
            form.getForm().load({
                ////waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/informasi/'+form.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    var view      = me.getView();
                    var ckeditor  = view.down('#ckeditor');
                    var audiofile = view.down('#audiofile');
                    var docfile   = view.down('#docfile');

                    ckeditor.setValue(json['data']['penjelasan']);
                    audiofile.setValue(json['data']['audiofile']);
                    docfile.setValue(json['data']['docfile']);
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);

                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        }
    },

    onDeleteButtonClick: function(btn) {
        var grid_informasi = this.getView().down('#grid-informasi');
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_informasi, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/informasi/'+grid_informasi.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_informasi.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_informasi.selModel.getSelection().length==0) page--;
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
        var me        = this;
        var view      = me.getView();
        var form      = view.down('informasi-edit');
        var ckeditor  = view.down('#ckeditor');
        var audiofile = view.down('#audiofile');
        var docfile   = view.down('#docfile');

        if(!form.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form.getForm().waitMsgTarget = form.getEl();
                form.getForm().submit({
                    method:'POST',
                    url: './server/public/informasi/'+form.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        penjelasan: ckeditor.getValue(),
                        audiofile : audiofile.getValue(),
                        docfile   : docfile.getValue(),
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.redirectTo('informasi-list', true);
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
    },

    onCancelButtonClick: function(btn) {
        this.redirectTo('informasi-list', true);
    },

    onBtnViewInformasi: function(view, rowIndex, colIndex, item, e, record, row, action) {
        this.setCurrentView('informasi-view', {
            openWindow: true, // Let the controller know that we want this component in the window,
            targetCfg: {
                datarecord: record
            },
            windowCfg: {
                // Any configs that you would like to apply for window popup goes here
                title: 'Informasi',
                width: 900,
                height: 720
            }
        });
    },
    
    onAktifCheckChange: function(column, rowIndex, checked, eOpts) {
        var grid_informasi = this.getView().down('#grid-informasi');
        var store          = grid_informasi.getStore();
        var id_informasi   = store.getAt(rowIndex).data['id'];

        //console.log(column);
        //store.getAt(rowIndex).commit();

        //var myMask = new Ext.LoadMask({target: grid_informasi, msg:'Hapus...'});
        //myMask.show();

        Ext.Ajax.request({
            method:'POST',
            url: './server/public/informasi/'+id_informasi+'/aktif',
            params: {
                status: checked?1:0
            },
            success: function(response) {
                //myMask.hide();
                store.getAt(rowIndex).commit();
            },

            failure: function(response) {
                //myMask.hide();
                var json = Ext.JSON.decode(response.responseText);

                Ext.MessageBox.show({
                    title: 'Error',
                    msg: json['message'],
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR,
                    fn : function(buttonValue, inputText, showConfig) {
                        store.getAt(rowIndex).set('aktif', !checked);   
                    }
                });
            }
        });
    }, 
    
    onCloseViewInformasiClick: function(btn) {
        var win = btn.up('window');
        if (win) {
            win.close();   
        }
    },

    setCurrentView: function(view, params) {
        var me = this;
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
                xtype: 'informasiwindow',
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
                    xtype: view,
                    flex: 1
                }, params)
            );

            Ext.resumeLayouts(true);
            me.fireEvent('goontop');
        }
    },

    onAddButtonClick: function(btn) {
        
        this.setCurrentView('informasi-edit', {
            saveUrl: 'insert',
            title: 'Tambah Informasi',
        });
    },

    onEditButtonClick: function(btn) {
        var grid_informasi = this.getView().down('#grid-informasi');
        this.setCurrentView('informasi-edit', {
            saveUrl: grid_informasi.idSelect+'/update',
            idEdit: grid_informasi.idSelect,
            title: 'Edit Informasi' 
        });
    },

    onSelectionChange: function(sm, selections) {        
        var me = this,
            grid = me.getView().down('#grid-informasi'),
            refs = me.getReferences(),
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
    }
    
});
