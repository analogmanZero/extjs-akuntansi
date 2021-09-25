Ext.define('Admin.view.webdesktop.karyawan.edit', {

    extend: 'Ext.window.Window',
    alias:'widget.karyawanedit',
   
    layout: 'fit',

    width: 900,
    height: 550,
    
    constructor: function(c) {
        var me = this;

        var store = Ext.create('Admin.store.stores', {
            fields: ['id','nama', 'tipe'],
            url: 'api/store/karyawan/berkasDataStore.php',
            params: {
              id_karyawan: c.isEdit  
            },
            autoLoad: true
        });

        var randomstring = function() {
            var chars = "0123456789";
            var string_length = 3;
            var randomstring = '';
            for (var i=0; i<string_length; i++) {
                var rnum = Math.floor(Math.random() * chars.length);
                randomstring += chars.substring(rnum,rnum+1);
            }

            return randomstring;
        };
        
        var _uploadPhoto = function(f) {

            me.down('form').getForm().waitMsgTarget = me.getEl();
            me.down('form').getForm().submit({
                method:'POST',
                params: {id_karyawan: c.isEdit},
                url: 'api/store/karyawan/uploadBerkas.php',
                waitMsg: 'Upload...',
                success: function(f, a) {
                    store.loadPage(1);
                    var wallpaper = me.down('#wallpaper_berkas');
                    wallpaper.setWallpaper();
                    
                },
                failure:function(f, a) {
                    Ext.MessageBox.show({
                        title: 'Kesalahan',
                        msg: a.result?a.result.message:'Oops, respon server error.',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        };

         var _hapusPhoto = function(f) {

             Ext.MessageBox.show({
                title: 'Konfirmasi',
                msg: 'Yakin untuk hapus data yang dipilih?',
                buttons: Ext.MessageBox.YESNO,
                fn: function(btn, text) {
                    if(btn=='yes') {
                        me.down('form').getForm().waitMsgTarget = me.getEl();
                        me.down('form').getForm().submit({
                            params: {selected: me.idSelect},
                            method:'POST',
                            url: 'api/store/karyawan/deleteBerkas.php',
                            waitMsg: 'Delete...',
                            success: function(f, a) {
                                store.loadPage(1);
                                var wallpaper = me.down('#wallpaper_berkas');
                                wallpaper.setWallpaper();
                            },
                            failure:function(f, a) {
                                Ext.MessageBox.show({
                                    title: 'Kesalahan',
                                    msg: a.result?a.result.message:'Oops, respon server error.',
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        });
                    }
                },
                icon: Ext.MessageBox.WARNING
            });
        };
        
        
        var _cetakPhoto = function(f) {

            var reportFileName = 'payroll/berkasKaryawan.jrxml';
            var myMask = new Ext.LoadMask({target: me, msg: "Proses..."});
            myMask.show();
            Ext.Ajax.request({
                method:'POST',
                url: 'reports/exec.php',
                params: {
                    id: 0,
                    nik: me.idSelect,
                    nama: '',
                    project: '',
                    reportFileName: reportFileName,                           
                    subreport: 'payroll',
                    format: 'pdf'
                },
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    if(json['success']) {
                        window.open('reports/readFile.php?filename='+json['filename'],
                        'berkaskaryawan', 'width=715, height=565, toolbar=no, menubar=no, sccorebars=yes');
                        myMask.hide();
                    } else {
                        myMask.hide();
                        Ext.MessageBox.show({
                            title: "Kesalahan",
                            msg: json['message'],
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                },
                failure: function() {
                    myMask.hide();
                    Ext.MessageBox.show({
                        title: "Kesalahan",
                        msg: "Respon server error. Coba lagi.",
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            });
        };

        var _selectPhoto = function(view, records) {
            var grid = me.down('#berkas'),
                wallpaper = me.down('#wallpaper_berkas');

            var record = grid.getView().getSelectionModel().getSelection()[0];
            if(record) {
                //alert('karyawan/loadImage.php?'  + randomstring() + '&id=' + record.data['id']);
                wallpaper.setWallpaper('berkas/'+record.data['nama'], true);
            }
        };
        
        Ext.apply(c, {
    
            buttons: [{
                text: 'Cetak',
                hidden: !c.isView,
                action: 'cetak'
            }, {
                text: 'Simpan',
                hidden: c.isView,
                action: 'simpan'
            }, {
                text: 'Tutup',
                scope: this,
                handler: this.close
            }],

            items: [{
                xtype: 'form',
                border: false,
                layout: 'fit',
                reader: new Ext.data.JsonReader({
                    model: 'Admin.model.karyawan.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'tabpanel',
                    items: [{
                        xtype: 'panel',
                        title: 'Utama',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        autoScroll: true,
                        items: [{
                            xtype: 'karyawanutama',
                            isEdit: c.isEdit,
                            isView: c.isView,
                            grupAkses: c.grupAkses
                        }, {
                            xtype: 'karyawanprofil',
                            title: 'Profil',
                            isEdit: c.isEdit,
                            isView: c.isView
                        }, {
                            xtype: 'karyawanalamatktp',
                            title: 'Alamat Sesuai KTP',
                            isEdit: c.isEdit,
                            isView: c.isView
                        }, {
                            xtype: 'karyawanalamattinggal',
                            title: 'Alamat Tempat Tinggal',
                            isEdit: c.isEdit,
                            isView: c.isView
                        }, {
                            xtype: 'karyawancatatan',
                            title: 'Catatan Karyawan',
                            isEdit: c.isEdit,
                            isView: c.isView
                        }, {
                            xtype: 'tabpanel',
                            bodyStyle: 'padding: 0 0 20px 0;',
                            height: 300,
                            items: [{
                                xtype: 'karyawankeluarga',
                                title: 'Keluarga'
                            }, {
                                xtype: 'karyawanorangtuawali',
                                title: 'Orang Tua / Wali'
                            }, {
                                xtype: 'karyawankerabat',
                                title: 'Kerabat'
                            }, {
                                xtype: 'karyawanpendidikanformal',
                                title: 'Pendidikan Formal'
                            }, {
                                xtype: 'karyawanpendidikannonformal',
                                title: 'Pendidikan Non Formal'
                            }, {
                                xtype: 'karyawanpengalamankerja',
                                title: 'Pengalaman Kerja'
                            }]
                        }]
                    }, {
                        xtype: 'form',
                        visible: c.isEdit,
                        title: 'Upload Berkas',
                        //border: false,
                        layout: 'border',
                        items: [{                    
                            xtype: 'grid',
                            itemId: 'berkas',
                            columnLines: true,
                            region: 'west',
                            split: true,
                            title: 'Setting',
                            flex: 0.8,
                            selModel: Ext.create('Ext.selection.CheckboxModel', {
                                listeners: {
                                    selectionchange: function(sm, selections) {
                                        me.idSelect='';
                                        for(var i=0; i<sm.getSelection().length; i++) {
                                            me.idSelect += (i>0?',':'') + sm.getSelection()[i].data['id'];
                                        }
                                        me.down('#remove').setDisabled(selections.length == 0);
                                        me.down('#cetak').setDisabled(selections.length == 0);
                                    }
                                }
                            }),
                            store: store,
                            columns: [
                                {text: 'Nama File', flex: 1, sortable: false, menuDisabled: true, dataIndex: 'nama'}
                            ],
                            tbar: ['->', {
                                xtype: 'container',
                                layout: 'hbox',
                                items:[{
                                    xtype: 'filefield',
                                    name: 'filename',
                                    buttonOnly: true,
                                    buttonText: 'Upload',
                                    buttonConfig: {
                                         iconCls: 'add'
                                    },
                                    listeners: {
                                        change: _uploadPhoto,
                                        scope: me
                                    }
                                }, {xtype: 'container', width: 3}, {
                                    xtype: 'button',
                                    text: 'Hapus',
                                    iconCls: 'remove',
                                    itemId: 'remove',
                                    disabled: true,
                                    handler: _hapusPhoto
                                }, {xtype: 'container', width: 3}, {
                                    xtype: 'button',
                                    text: 'Cetak',
                                    iconCls: 'print',
                                    itemId: 'cetak',
                                    disabled: true,
                                    handler: _cetakPhoto
                                }]
                            }],
                            bbar: [Ext.create('Ext.PagingToolbar', {
                                flex: 1,
                                store: store
                            })],
                            listeners: {
                                selectionchange: _selectPhoto
                            }

                        }, {
                            xtype: 'panel',
                            region: 'center',
                            title: 'Preview',
                            flex: 1,
                            layout: 'border',
                            items: [Ext.create('Admin.view.webdesktop.wallpaper', {
                                itemId: 'wallpaper_berkas',
                                region: 'center'
                            })]
                        }]
                    }]
                }]
            }]
        });

        this.callParent(arguments);
     },

     afterRender: function(win) {
         this.callParent();
         var me = this;
         
         if(me.isEdit>0) {
             setTimeout(function() {
                var form = me.down('form');
                form.getForm().waitMsgTarget = me.getEl();
                form.getForm().load({
                    params: {id: me.isEdit},
                    url: 'api/store/karyawan/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        
                            var json = form.reader.jsonData;                        
                            me.down('karyawankeluarga').getStore().loadRawData(json.results[0]['keluarga']);
                            me.down('karyawanorangtuawali').getStore().loadRawData(json.results[0]['orangtuawali']);
                            me.down('karyawankerabat').getStore().loadRawData(json.results[0]['kerabat']);
                            me.down('karyawanpendidikanformal').getStore().loadRawData(json.results[0]['pendidikanformal']);
                            me.down('karyawanpendidikannonformal').getStore().loadRawData(json.results[0]['pendidikannonformal']);
                            me.down('karyawanpengalamankerja').getStore().loadRawData(json.results[0]['pengalamankerja']);

                            //LOAD JABATAN
                            var jabatan = me.down('#jabatan');
                            jabatan.getStore().add({id: json.results[0]['id_jabatan'], kode: json.results[0]['id_jabatan'], nama: json.results[0]['nama_jabatan'], display: json.results[0]['nama_jabatan']});
                            jabatan.setValue(json.results[0]['id_jabatan']);
                            jabatan.setDisabled(json.results[0]['pangkat']!='STAFF');

                            //LOAD AREA OPERASI
                            var area = me.down('#area');
                            var store = area.getStore();
                            var proxy = store.getProxy();
                            proxy.extraParams['departemen'] = json.results[0]['departemen'];
                        
                            area.getStore().add({id: json.results[0]['id_area'], kode: json.results[0]['id_area'], nama: json.results[0]['nama_area'], display: json.results[0]['nama_area']});
                            area.setValue(json.results[0]['id_area']);

                            //LOAD LOKASI KERJA
                            var lokasi = me.down('#lokasi');
                            var store = lokasi.getStore();
                            var proxy = store.getProxy();
                            proxy.extraParams['area'] = json.results[0]['id_area'];

                            setTimeout(function() {
                                if(json.results[0]['departemen']=='PROJECT') {
                                    
                                    lokasi.getStore().add({id: json.results[0]['id_lokasi'], kode: json.results[0]['id_lokasi'], nama: json.results[0]['nama_lokasi'], display: json.results[0]['nama_lokasi']});
                                    lokasi.setValue(json.results[0]['id_lokasi']);
                                }
                            }, 1);
                            lokasi.setDisabled(json.results[0]['departemen']=='HO');
                        
                            me.fileBefore = json.results[0]['photo'];
                            me.down('karyawanprofil').loadLogo(json.results[0]['photo']);
                            
                            var nik = me.down('#nik');
                            nik.setValue(json.results[0]['is_approve_nik']?json.results[0]['nik']:'');
                            //nik.setReadOnly(me.isEdit?true:false);

                    }
                });
             }, 900);
         }
     },

    getFocusNotValid: function() {
        var me = this;

        var children = (new Admin.view.webdesktop.akses()).getAllChilden(me);
        for (var i=0; i<children.length; i++) {
            if(children[i].name && !children[i].isValid()) {
                children[i].focus(true, 10);
                break;
            }
        }
    }
});
                    
