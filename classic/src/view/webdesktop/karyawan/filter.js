Ext.define('Admin.view.webdesktop.karyawan.filter', {

    extend: 'Ext.window.Window',
    alias:'widget.exportfilterkaryawan',

    layout: 'fit',
    border: false,
    modal: true,

    width: 640,
    height: 480,

    constructor: function(c) {
        var me = this;

        me.loadKabupaten = function(propinsi) {
            var cboKab = me.down('[name=kabupaten]');
            var cboKec = me.down('[name=kecamatan]');
            var cboKel = me.down('[name=kelurahan]');

            cboKab.setValue();
            cboKec.setValue();
            cboKel.setValue();

            var strKab = cboKab.getStore();
            var strKec = cboKec.getStore();
            var strKel = cboKel.getStore();

            strKab.load({
                params: {propinsi: propinsi}
            });

            strKec.removeAll();
            strKel.removeAll();
        }

        me.loadKecamatan = function(propinsi, kabupaten) {
            var cboKec = me.down('[name=kecamatan]');
            var cboKel = me.down('[name=kelurahan]');

            cboKec.setValue();
            cboKel.setValue();

            var strKec = cboKec.getStore();
            var strKel = cboKel.getStore();

            strKec.load({
                params: {propinsi: propinsi, kabupaten: kabupaten}
            });
            strKel.removeAll();
        }

        me.loadKelurahan = function(propinsi, kabupaten, kecamatan) {
            var cboKel = me.down('[name=kelurahan]');
            var strKel = cboKel.getStore();

            cboKel.setValue();
            strKel.load({
                params: {propinsi: propinsi, kabupaten: kabupaten, kecamatan: kecamatan}
            });
        }

        me.loadSekolah = function(propinsi, kabupaten, kecamatan, value) {
            var cboSek = me.down('[name=sekolah]');
            var strSek = cboSek.getStore();

            cboSek.setValue();
            strSek.load({
                params: {propinsi: propinsi, kabupaten: kabupaten, kecamatan: kecamatan}
            });
        }

        Ext.apply(c, {

            buttons: [{
                text: 'Export',
                action: 'export'
            }, {
                text: 'Tutup',
                scope: this,
                handler: this.close
            }],

            items: [{
                xtype: 'tabpanel',
                items: [{
                    xtype: 'form',
                    title: 'Saringan Utama',
                    autoScroll: true,
                    fieldDefaults: {
                        anchor: '100%',
                        labelWidth: 170
                    },
                    bodyPadding: 20,
                    layout: 'anchor',
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Propinsi',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            store: Ext.create('Admin.store.stores', {
                                fields: ['kode', 'nama'],
                                url: 'api/store/propinsiStore.php',
                                autoLoad: true
                            }),
                            valueField: 'kode',
                            displayField: 'nama',
                            name: 'propinsi',
                            queryMode: 'local',
                            listeners: {
                                select: function(combo) {
                                    me.loadKabupaten(combo.getValue());
                                }
                            },
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=propinsi]').setValue();
                                me.down('[name=propinsi]').fireEvent('select', me.down('[name=propinsi]'));
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Kabupaten',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            store: Ext.create('Admin.store.stores', {
                                fields: ['kode', 'nama'],
                                url: 'api/store/kabupatenStore.php'
                            }),
                            valueField: 'kode',
                            displayField: 'nama',
                            name: 'kabupaten',
                            queryMode: 'local',
                            listeners: {
                                select: function(c) {
                                    var propinsi = me.down('[name=propinsi]');
                                    me.loadKecamatan(propinsi.getValue(), c.getValue());
                                }
                            },
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=kabupaten]').setValue();
                                me.down('[name=kabupaten]').fireEvent('select', me.down('[name=kabupaten]'));
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Kecamatan',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            store: Ext.create('Admin.store.stores', {
                                fields: ['kode', 'nama'],
                                url: 'api/store/kecamatanStore.php'
                            }),
                            valueField: 'kode',
                            displayField: 'nama',
                            name: 'kecamatan',
                            queryMode: 'local',
                            listeners: {
                                select: function(c) {
                                    var propinsi = me.down('[name=propinsi]');
                                    var kabupaten = me.down('[name=kabupaten]');

                                    me.loadKelurahan(propinsi.getValue(), kabupaten.getValue(), c.getValue());
                                    me.loadSekolah(propinsi.getValue(), kabupaten.getValue(), c.getValue());
                                }
                            },
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=kecamatan]').setValue();
                                me.down('[name=kecamatan]').fireEvent('select', me.down('[name=kecamatan]'));
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Kelurahan',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            store: Ext.create('Admin.store.stores', {
                                fields: ['kode', 'nama'],
                                url: 'api/store/kelurahanStore.php',
                                autoLoad: true
                            }),
                            queryMode: 'local',
                            valueField: 'kode',
                            displayField: 'nama',
                            name: 'kelurahan',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=kelurahan]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Sekolah',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            store: Ext.create('Admin.store.stores', {
                                fields: ['kode', 'nama'],
                                url: 'api/store/sekolahStore.php',
                                autoLoad: true
                            }),
                            queryMode: 'local',
                            valueField: 'kode',
                            displayField: 'nama',
                            name: 'sekolah',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=sekolah]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Jenis Kelamin',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name:'jeniskelamin',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['kode', 'nama'],
                                data:[{kode: 'L', nama: 'Laki-laki'}, {kode: 'P', nama: 'Perempuan'}]
                            }),
                            valueField: 'kode',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=jeniskelamin]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Agama',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name:'agama',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['nama'],
                                data:[{nama: 'Islam'}, {nama: 'Kristen'}, {nama: 'Hindu'}, {nama: 'Budha'}, {nama: 'Kepercayaan Terhadap Tuhan YME'}]
                            }),
                            valueField: 'nama',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=agama]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Status Perkawinan',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name: 'statusperkawinan',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['kode', 'nama'],
                                data:[
                                    {kode: '1', nama: 'Belum Nikah'},
                                    {kode: '2', nama: 'Menikah'},
                                    {kode: '3', nama: 'Bercerai'}
                                ]
                            }),
                            queryMode: 'local',
                            valueField: 'kode',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=statusperkawinan]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Status Kepegawaian',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name: 'statuspegawai',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['nama'],
                                data:[
                                    {nama: 'PNS'},
                                    {nama: 'Swasta'},
                                    {nama: 'Honor'}
                                ]
                            }),
                            queryMode: 'local',
                            valueField: 'nama',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=statuspegawai]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'karyawanan',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name: 'karyawanan',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['nama'],
                                data:[{nama: 'D3'}, {nama: 'S1'}, {nama: 'S2'}, {nama: 'S3'}]
                            }),
                            valueField: 'nama',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=karyawanan]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Lisensi Kepsek',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name: 'lisensikepsek',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['nama'],
                                data:[{nama: 'Ada'}, {nama: 'Belum Ada'}]
                            }),
                            valueField: 'nama',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=lisensikepsek]').setValue();
                            }
                        }]
                    }, {
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Sertifikasi',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            name: 'ketsertifikasi',
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['nama'],
                                data:[{nama: 'Ada'}, {nama: 'Belum Ada'}]
                            }),
                            valueField: 'nama',
                            displayField: 'nama',
                            flex: 1
                        }, {
                            xtype: 'button',
                            text: 'Semua',
                            handler: function() {
                                me.down('[name=ketsertifikasi]').setValue();
                            }
                        }]
                    }]
                }, {
                    xtype: 'grid',
                    title: 'Saringan Tambahan',
                    columnLines: true,
                    plugins: Ext.create('Ext.grid.plugin.RowEditing', {
                        clicksToEdit: 2,
                        autoCancel: false,
                        hideButtons: function(){
                            var me = this;
                            if (me.editor && me.editor.floatingButtons) {
                                me.editor.floatingButtons.hide();
                            } else {
                                Ext.defer(me.hideButtons, 10, me);
                            }
                        },
                        listeners: {
                            afteredit: function(f, e) {
                                var filter = me.down('grid').columns[0].getEditor(e.record);
                                e.record.set('kodefilter', filter.getSubmitValue());
                                e.record.set('filter', filter.getDisplayValue());
                                e.record.commit();
                                me.addNew = false;

                                me.down('#tambah').setDisabled(false);
                                me.down('#edit').setDisabled(false);
                                me.down('#hapus').setDisabled(false);
                            },
                             beforeedit: function(f, e) {
                                f.hideButtons();

                                if(!me.addNew) {
                                    var filter = me.down('grid').columns[0].getEditor(e.record);
                                    filter.setValue(e.record.data['kodefilter']);
                                }

                                me.down('#tambah').setDisabled(true);
                                me.down('#edit').setDisabled(true);
                                me.down('#hapus').setDisabled(true);
                            },
                            canceledit: function(f, e) {
                                if(me.addNew) me.down('grid').getStore().remove(e.record);
                                me.addNew = false;

                                me.down('#tambah').setDisabled(false);
                            }
                        }
                    }),
                    store: Ext.create('Ext.data.Store', {
                        fields: ['kodefilter', 'filter', 'katakunci'],
                        proxy: {
                            type: 'memory',
                            reader: {
                                type: 'json',
                                rootProperty: 'filters'
                            }
                        }
                    }),
                    columns: [
                        {text: 'Kolom yang Disaring', flex: 1, dataIndex: 'filter', editor: {
                            xtype: 'combo',
                            editable: false,
                            queryMode: 'local',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['kode', 'keterangan'],
                                data: [
                                    {kode: 'A.nama', keterangan: 'Nama karyawan'},
                                    {kode: 'A.tempatlahir', keterangan: 'Tempat Lahir'},
                                    {kode: 'DATE_FORMAT(A.tanggallahir, \'%d-%m-%Y\')', keterangan: 'Tanggal Lahir'},
                                    {kode: 'A.nik', keterangan: 'NIK'},
                                    {kode: 'A.nip', keterangan: 'NIP'},
                                    {kode: 'A.nuptk', keterangan: 'NUPTK'},
                                    {kode: 'CONCAT(A.alamat1, \' \', A.alamat2)', keterangan: 'Alamat'},
                                    {kode: 'A.rt', keterangan: 'RT'},
                                    {kode: 'A.rw', keterangan: 'RW'},
                                    {kode: 'A.namadusun', keterangan: 'Nama Dusun'},
                                    {kode: 'A.kodepos', keterangan: 'Kode POS'},
                                    {kode: 'A.telepon', keterangan: 'Telepon'},
                                    {kode: 'A.nohp', keterangan: 'Fax'},
                                    {kode: 'A.email', keterangan: 'Email'},
                                    {kode: 'A.jabatan', keterangan: 'Jabatan'},
                                    {kode: 'A.pangkat', keterangan: 'Pangkat'},
                                    {kode: 'A.golongan', keterangan: 'Golongan'},
                                    {kode: 'A.skcpns', keterangan: 'SK CPNS'},
                                    {kode: 'DATE_FORMAT(A.tanggalcpns, \'%d-%m-%Y\')', keterangan: 'Tanggal SK CPNS'},
                                    {kode: 'A.skpengangkatan', keterangan: 'SK Pengangkatan'},
                                    {kode: 'DATE_FORMAT(A.tmtpengangkatan, \'%d-%m-%Y\')', keterangan: 'TMT Pengangkatan'},
                                    {kode: 'A.lembagapengangkat', keterangan: 'Lembaga Pengangkatan'},
                                    {kode: 'A.sumbergaji', keterangan: 'Sumber Gaji'},
                                    {kode: 'A.namaibukandung', keterangan: 'Nama Ibu Kandung'},
                                    {kode: 'A.namasuamiistri', keterangan: 'Nama Suami/Istri'},
                                    {kode: 'A.pekerjaansuamiistri', keterangan: 'Pekerjaan Suami/Istri'},
                                    {kode: 'A.nipsuamiistri', keterangan: 'NIP Suami/Istri'},
                                    {kode: 'DATE_FORMAT(A.tmtpns, \'%d-%m-%Y\')', keterangan: 'TMT PNS'},
                                    {kode: 'A.npwp', keterangan: 'NPWP'},
                                    {kode: 'A.jurusan', keterangan: 'Jurusan karyawanan'},
                                    {kode: 'A.tahunlulus', keterangan: 'Tahun Lulus karyawanan'},
                                    {kode: 'A.noregsertifikasi', keterangan: 'No. Reg. Sertifikasi'},
                                    {kode: 'DATE_FORMAT(A.tanggallulussertifikasi, \'%d-%m-%Y\')', keterangan: 'Tanggal Lulus Sertifikasi'}
                                ]
                            }),
                            valueField: 'kode',
                            displayField: 'keterangan'
                        }},
                        {text: 'Mengandung Kata', flex: 1, dataIndex: 'katakunci', editor: {
                            xtype: 'textfield'
                        }}
                    ],
                    bbar: [{
                        xtype: 'container',
                        layout: 'hbox',
                        flex: 1,
                        items: [{
                            xtype: 'button',
                            itemId: 'tambah',
                            width: 80,
                            text: 'Tambah',
                            handler: function() {
                                var grid = me.down('grid');
                                var store = grid.getStore();
                                var grideditor = grid.getPlugin();

                                me.addNew = true;
                                store.add({filter: '', katakunci: ''});
                                grideditor.startEdit( store.getAt(store.getCount()-1), 0);
                            }
                        }, {
                            xtype: 'container',
                            width: 5
                        }, {
                            xtype: 'button',
                            itemId: 'edit',
                            disabled: true,
                            width: 80,
                            text: 'Edit',
                            handler: function() {
                                var grid = me.down('grid');
                                var store = grid.getStore();
                                var grideditor = grid.getPlugin();
                                var selection = grid.getView().getSelectionModel().getSelection()[0];

                                if (selection) {
                                    var row = store.indexOf(selection);
                                    grideditor.rowEditor.startEdit(row, 0);
                                }
                            }
                        }, {
                            xtype: 'container',
                            width: 5
                        }, {
                            xtype: 'button',
                            itemId: 'hapus',
                            width: 80,
                            text: 'Hapus',
                            disabled: true,
                            handler: function() {
                                var grid = me.down('grid');
                                var store = grid.getStore();
                                var selection = grid.getView().getSelectionModel().getSelection()[0];

                                if (selection) {
                                    store.remove(selection);
                                }
                            }
                        }]
                    }],
                    listeners: {
                        selectionchange: function(view, records) {
                            var getValue = me.down('#tambah').disabled || !records.length;
                            me.down('#edit').setDisabled(getValue);
                            me.down('#hapus').setDisabled(getValue);
                        }
                    }
                }]
            }]
        });

        this.callParent(arguments);
     },

     getDetail: function() {
        var me = this;
        var str = '';
        var store = me.down('grid').getStore();

        for(var row =0;row<store.getCount();row++) {
            var rec = store.getAt(row);
            str += (str!=''?'\n':'') +                // id  keterangan
                   rec.data['kodefilter'] + '\t' +    //  0  filter
                   rec.data['katakunci'];             //  1  katakunci
        }

        return str;
    }
});

