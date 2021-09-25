Ext.define('Admin.view.essai.essaiController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.essai',

    init: function() {
        var viewType = this.getView().viewType;
        console.log('Initial Controller Essai:', viewType);
        this.setCurrentView(viewType);
    },

    setCurrentView: function(view, params) {
        var me = this;
        var contentPanel = this.getView();

        //We skip rendering for the following scenarios:
        // * There is no contentPanel
        // * view xtype is not specified
        // * current view is the same
        if(!contentPanel || view === '' || (contentPanel.down() && contentPanel.down().xtype === view)) {
            return false;
        }
        
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
    },

    onSelectionChange: function(sm, selections) {
        var grid         = this.getView().down('#grid-essai');
        var refs         = this.getReferences(),
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

    onEssaiListAfterRender: function() {
        var grid_ujian = this.getView().down('#grid-ujian');
        var store      = grid_ujian.getStore();
        
        store.on('load', function(el, records, successful, operation, eOpts ) {
            if(successful) {
                if(el.data.length>0) {
                    grid_ujian.getSelectionModel().select(0, true);
                }
            }
         });
    },

    onFormLoad: function() {
        var me         = this;
        var essai_edit = this.getView().down('essai-edit');
        var form_ujian = this.getView().down('#form-ujian');
        var form_essai = this.getView().down('#form-essai');

        form_ujian.getForm().loadRecord(essai_edit.dataUjian);
        if(essai_edit.idEdit) {
            form_essai.getForm().load({
                ////waitMsg: 'Loading...',
                method: 'GET',
                url: './server/public/essai/'+essai_edit.idEdit+'/load',
                success: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    form_essai.down('#pertanyaan').setValue(json.data['pertanyaan']);
                    form_essai.down('#audiofile').setValue(json.data['audiofile']);
                    //form_essai.down('#docfile').setValue(json.data['docfile']);
                    form_essai.down('#score').setValue(json.data['score']);
                    form_essai.down('#pembahasan').setValue(json.data['pembahasan']);
                    form_essai.down('#audiofile_pembahasan').setValue(json.data['audiofile_pembahasan']);
                    //form_essai.down('#docfile_pembahasan').setValue(json.data['docfile_pembahasan']);
                },
                failure: function (frm, action) {
                    var json = Ext.JSON.decode(action.response.responseText);
                    Ext.MessageBox.show({
                        title: 'Error',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR,
                        fn : function(buttonValue, inputText, showConfig) {
                            me.setCurrentView('essai-list');
                        }
                    });
                }
            });
        }
    },

    getRowNumberGridUjian: function(value, meta, record) {
        var grid  = this.getView().down('#grid-ujian');
        var store = grid.getStore();
        var page  = store.currentPage;
        var index = store.indexOf(record);
        var limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    getRowNumberGridEssai: function(value, meta, record) {
        var grid  = this.getView().down('#grid-essai');
        var store = grid.getStore();
        var page  = store.currentPage;
        var index = store.indexOf(record);
        var limit = store.pageSize;

        return ((page-1)*limit)+index+1;
    },

    renderSoalEssai: function(value, meta, record) {
        page = record.data.pertanyaan;
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        return page;
    },
    
    onGridUjianSelectionChange: function( el, selected, eOpts )  {
        var grid_essai = this.getView().down('#grid-essai');
        var store      = grid_essai.getStore();
        var proxy      = store.getProxy();

        proxy.extraParams['id_ujian'] = selected[0].data['id'];
        store.loadPage(1);
    },

    onAddButtonClick: function(btn) {
        var grid_ujian = this.getView().down('#grid-ujian');
        var records    = grid_ujian.getSelection();
        
        if(records.length>0) {
            var record = records[0];
            this.setCurrentView('essai-edit', {
                title: 'Tambah Soal Essai',
                saveUrl: 'insert',
                idUjian: record.data['id'],
                dataUjian: record
            });
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Pilih salah satu data ujian dahulu.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    /*onEditButtonClick: function(btn) {
        var grid_essai = this.getView().down('#grid-essai');
        var grid_ujian = this.getView().down('#grid-ujian');
        var records    = grid_ujian.getSelection();
        
        if(records.length>0) {
            var record = records[0];
            this.setCurrentView('essai-edit', {
                title: 'Edit Soal Essai',
                idUjian: record.data['id'],
                dataUjian: record,
                saveUrl: grid_essai.idSelect+'/update',
                idEdit: grid_essai.idSelect
            });
        } else {
            Ext.MessageBox.show({
                title: 'Error',
                msg: 'Pilih salah satu data ujian dahulu.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    },

    onDeleteButtonClick: function(btn) {
        var grid_essai = this.getView().down('#grid-essai');

        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
            if(btn=='yes') {

                var myMask = new Ext.LoadMask({target: grid_essai, msg:'Hapus...'});
                myMask.show();

                Ext.Ajax.request({
                    method:'GET',
                    url: './server/public/essai/'+grid_essai.idSelect+'/delete',
                    success: function(response) {
                        myMask.hide();
                        var json = Ext.JSON.decode(response.responseText);

                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            var store = grid_essai.getStore(),
                            page = store.currentPage;

                            if(page>1 && store.getCount()-grid_essai.selModel.getSelection().length==0) page--;
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
    },*/


    onDataViewItemClick: function( dataview, record, item, index, e, eOpts  ) {
        var target = e.getTarget();
        if(target.name == 'deleteButton') {
            var essai_list = this.getView().down('essai-list');
            var grid_essai = this.getView().down('#grid-essai');
            Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk hapus data yang dipilih?', function(btn,text) {
                if(btn=='yes') {
    
                    var myMask = new Ext.LoadMask({target: essai_list, msg:'Hapus...'});
                    myMask.show();
    
                    Ext.Ajax.request({
                        method:'GET',
                        url: './server/public/essai/'+record.data['id']+'/delete',
                        success: function(response) {
                            myMask.hide();
                            var json = Ext.JSON.decode(response.responseText);
    
                            Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                                var store = grid_essai.getStore(),
                                    page  = store.currentPage;

                                if(page>1 && store.getCount()==1) page--;
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
        }

        if(target.name == 'editButton') {
            var grid_ujian = this.getView().down('#grid-ujian');
            var records    = grid_ujian.getSelection();
        
            if(records.length>0) {
                var record_ = records[0];
                this.setCurrentView('essai-edit', {
                    title: 'Edit Soal Essai',
                    idUjian: record_.data['id'],
                    dataUjian: record_,
                    saveUrl: record.data['id']+'/update',
                    idEdit: record.data['id']
                });
            } else {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: 'Pilih salah satu data ujian dahulu.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }
    },

    onCancelButtonClick: function(btn) {
        this.setCurrentView('essai-list');
    },

    onSaveButtonClick: function(btn) {
        var me                   = this;
        var essai_edit           = this.getView().down('essai-edit');
        var form_essai           = this.getView().down('#form-essai');
        var pertanyaan           = form_essai.down('#pertanyaan');
        var audiofile            = form_essai.down('#audiofile');
        //var docfile              = form_essai.down('#docfile');
        var score                = form_essai.down('#score');
        var pembahasan           = form_essai.down('#pembahasan');
        var audiofile_pembahasan = form_essai.down('#audiofile_pembahasan');
        //var docfile_pembahasan   = form_essai.down('#docfile_pembahasan');

        if(!form_essai.getForm().isValid()) return;
        Ext.MessageBox.confirm('Konfirmasi', 'Yakin untuk proses simpan data?', function(btn, text) {
            if(btn=='yes') {
                form_essai.getForm().waitMsgTarget = essai_edit.getEl();
                form_essai.getForm().submit({
                    method:'POST',
                    url: './server/public/essai/'+essai_edit.saveUrl,
                    waitMsg: 'Simpan...',
                    params: {
                        id_ujian             : essai_edit.idUjian,
                        pertanyaan           : pertanyaan.getValue(),
                        audiofile            : audiofile.getValue(),
                        //docfile              : docfile.getValue(),
                        score                : score.getValue(),
                        pembahasan           : pembahasan.getValue(),
                        audiofile_pembahasan : audiofile_pembahasan.getValue(),
                        //docfile_pembahasan   : docfile_pembahasan.getValue()
                    },
                    success:function(frm, action) {
                        var json = Ext.JSON.decode(action.response.responseText);
                        Ext.Msg.alert('Sukses', json['message'], function(btn, text) {
                            me.setCurrentView('essai-list');
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
});
