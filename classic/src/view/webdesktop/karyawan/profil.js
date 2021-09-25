Ext.define('Admin.view.webdesktop.karyawan.profil', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawanprofil',

    border: false,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
       
    constructor: function(c) {
        var me = this;

        me.loadLogo = function(filename) {
            me.down('wallpaper').setWallpaper('photo/'+filename, true);
        };

        Ext.apply(c, {

            items: [{
                xtype: 'panel',
                flex: 1,
                border: false,
                defaults: {
                    msgTarget: 'side',
                    anchor: '100%',
                    labelWidth: 160,
                    allowBlank: true
                },
                bodyPadding: 20,
                layout: 'anchor',
                items: [{
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/,
                    fieldLabel: 'No. KTP',
                    name: 'no_identitas',
                    itemId: 'no_identitas',                    
                    readOnly: c.isView,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#no_kk').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'No. KK',
                    name: 'no_kk',
                    itemId: 'no_kk',                    
                    readOnly: c.isView,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#no_bpjs_kes').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'No. BPJS Kesehatan',
                    name: 'no_bpjs_kes',
                    itemId: 'no_bpjs_kes',
                    readOnly: c.isView,
                    allowBlank: true /***/,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#no_bpjs_tk').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'No. BPJS TK',
                    name: 'no_bpjs_tk',
                    itemId: 'no_bpjs_tk',
                    readOnly: c.isView,
                    allowBlank: true /***/,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#no_bpjs_jp').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'No. BPJS JP',
                    name: 'no_bpjs_jp',
                    itemId: 'no_bpjs_jp',
                    readOnly: c.isView,
                    allowBlank: true /***/,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#no_kta').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'No. KTA / Masa Berlaku',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    defaults: {
                        msgTarget: 'side',
                        allowBlank: true
                    },
                    items: [{
                        xtype: 'textfield',
                        name:'no_kta',
                        itemId:'no_kta',
                        readOnly: c.isView,
                        flex: 0.5,            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#masa_berlaku_kta').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'container',
                        width: 5
                    }, {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        name:'masa_berlaku_kta',
                        itemId:'masa_berlaku_kta',
                        readOnly: c.isView,
                        flex: 0.3,            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#no_npwp').focus(true, 10);
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'No. NPWP',
                    name: 'no_npwp',
                    itemId: 'no_npwp',
                    readOnly: c.isView,
                    allowBlank: true /***/,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#nama').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    fieldLabel: 'Nama',
                    name:'nama',
                    itemId:'nama',
                    readOnly: c.isView,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#jeniskelamin').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Jenis Kelamin',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    defaultType: 'radiofield',
                    items: [{
                        boxLabel  : 'Laki-laki',
                        name      : 'jeniskelamin',
                        inputValue: 'L',
                        checked   : true,
                        readOnly: c.isView,
                        flex      : 0.5
                    }, {
                        boxLabel  : 'Perempuan',
                        name      : 'jeniskelamin',
                        inputValue: 'P',
                        readOnly: c.isView,
                        flex      : 1
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Tempat Tanggal Lahir',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    defaults: {
                        msgTarget: 'side',
                        allowBlank: true
                    },
                    items: [{
                        xtype: 'textfield',
                        name:'tempatlahir',
                        itemId:'tempatlahir',
                        readOnly: c.isView,
                        flex: 0.5,            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#tanggallahir').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'container',
                        width: 5
                    }, {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        name:'tanggallahir',
                        itemId:'tanggallahir',
                        readOnly: c.isView,
                        flex: 0.3,            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#agama').focus(true, 10);
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    hidden: !c.isView,
                    fieldLabel: 'Usia Hari Ini',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [{
                        xtype: 'textfield',
                        name:'usia',
                        readOnly: true,
                        flex: 0.3
                    }, {
                        xtype: 'container',
                        width: 10
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Tahun',
                        labelSeparator: '&nbsp;',
                        flex: 0.7
                    }]
                }, {
                    xtype: 'combo',
                    name:'agama',
                    itemId:'agama',
                    fieldLabel: 'Agama',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Islam'}, {nama: 'Kristen'}, {nama: 'Hindu'}, {nama: 'Budha'}, {nama: 'Kepercayaan Terhadap Tuhan YME'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
                    readOnly: c.isView,            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#statusperkawinan').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Status Perkawinan',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    defaults: {
                        msgTarget: 'side',
                        allowBlank: true
                    },
                    items: [{
                        xtype: 'combo',
                        readOnly: c.isView,
                        name: 'statusperkawinan',
                        itemId: 'statusperkawinan',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['kode', 'nama'],
                            data:[
                                {kode: 'BELUM KAWIN', nama: 'Belum Kawin'},
                                {kode: 'KAWIN', nama: 'Kawin'},
                                {kode: 'CERAI', nama: 'Cerai'}
                            ]
                        }),
                        queryMode: 'local',
                        valueField: 'kode',
                        displayField: 'nama',            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#jumlah_anak').focus(true, 10);
                                }
                            }
                        }
                    }, {
                       xtype: 'container',
                       width: 30
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Jumlah Anak',
                        labelWidth: 100,
                        maskRe: /([0-9\s]+)$/,
                        flex: 0.1,
                        allowBlank: true /***/,
                        readOnly: c.isView,
                        name: 'jumlah_anak',
                        itemId: 'jumlah_anak',            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#pendidikan').focus(true, 10);
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Pendidikan Terakhir',
                    name: 'pendidikan',
                    itemId: 'pendidikan',
                    readOnly: c.isView,
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'SMA'}, {nama: 'D3'}, {nama: 'S1'}, {nama: 'S2'}, {nama: 'S3'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',            
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#bb').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Berat Badan',
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [{
                        xtype: 'textfield',
                        name:'bb',
                        itemId:'bb',
                        readOnly: c.isView,
                        flex: 0.4,            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#tb').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: '&nbsp;&nbsp;KG',
                        labelSeparator: '&nbsp;',
                        width: 50
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Tng. Badan',
                        labelWidth: 75,
                        name:'tb',
                        itemId:'tb',
                        readOnly: c.isView,
                        flex: 1.2,            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#gol_darah').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: '&nbsp;&nbsp;CM',
                        labelSeparator: '&nbsp;',
                        width: 50
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Gol. Darah',
                        labelWidth: 70,
                        name:'gol_darah',
                        itemId:'gol_darah',
                        readOnly: c.isView,
                        flex: 1,
                        msgTarget: 'side',
                        allowBlank: true,       
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#bentuk_tubuh').focus(true, 10);
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Bentuk Tubuh',
                    name: 'bentuk_tubuh',
                    itemId: 'bentuk_tubuh',
                    allowBlank: true /***/,
                    readOnly: c.isView,
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Atletis'}, {nama: 'Kurus'}, {nama: 'Sedang'}, {nama: 'Gemuk'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#warna_kulit').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Warna Kulit',
                    name: 'warna_kulit',
                    itemId: 'warna_kulit',
                    allowBlank: true /***/,
                    readOnly: c.isView,
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Putih'}, {nama: 'Coklat'}, {nama: 'Sawo Matang'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#jenis_warna_rambut').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Jenis Warna Rambut',
                    name: 'jenis_warna_rambut',
                    itemId: 'jenis_warna_rambut',
                    allowBlank: true /***/,
                    readOnly: c.isView,
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Hitam Ikal'}, {nama: 'Hitam Lurus'}, {nama: 'Hitam Keriting'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#bentuk_muka').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Bentuk Muka',
                    name: 'bentuk_muka',
                    itemId: 'bentuk_muka',
                    allowBlank: true /***/,
                    readOnly: c.isView,
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Bulat'}, {nama: 'Kotak'}, {nama: 'Oval'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#warna_mata').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'combo',
                    fieldLabel: 'Warna Mata',
                    name: 'warna_mata',
                    itemId: 'warna_mata',
                    allowBlank: true /***/,
                    readOnly: c.isView,
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Hitam'}, {nama: 'Coklat'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',       
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                
                                 me.up('window').down('#ktp_alamat1').focus(true, 10);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'form',
                width: 250,
                itemId: 'formupload',
                layout: 'anchor',
                border: false,
                bodyStyle: 'padding: 20px 20px 0 0;',
                items: [{
                    xtype: 'wallpaper',
                    stretch: true,
                    itemId: 'viewlogo',
                    height: 300
                    
                }, {
                    xtype: 'filefield',
                    action: 'upload_foto',
                    anchor: '100%',
                    name: 'filename',
                    emptyText: 'Pilih file ...'
                }]
            }]
        });

        me.callParent(arguments);
    }
});