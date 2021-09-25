Ext.define('Admin.view.webdesktop.karyawan.utama', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawanutama',

    border: false,

    layout: 'anchor',
    
    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        labelWidth: 100
    },
    bodyPadding: 20,
    
    constructor: function(c) {
        var me = this;

        var hidden = []; 
        var grup_akses = c.grupAkses;
        for(var key in grup_akses) {
            console.log(grup_akses[key]['itemId']+'  '+grup_akses[key]['fiturAkses']);
            hidden[grup_akses[key]['itemId']] = grup_akses[key]['fiturAkses']==null || grup_akses[key]['fiturAkses'].indexOf('Y')==-1;
        }

        Ext.apply(c, {
            items: [{
                xtype: 'fieldcontainer',
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
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    name:'nik',
                    itemId:'nik',
                    emptyText: 'Auto',
                    fieldLabel: 'NIK',
                    allowBlank: true /***/,
                    flex: 0.5,
                    readOnly: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('[name=status_pegawai]').setValue(false);
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    flex: hidden['AN']?0.5:0.1
                }, {
                    xtype: 'checkbox',
                    inputValue: '1',
                    flex: 0.4,
                    name: 'is_approve_nik',
                    boxLabel: 'NIK disetujui.',
                    hidden: hidden['AN'],
                    listeners: {
                        change: function(c) {
                            if(c.getValue()) {
                                
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 30
                }, {
                    xtype: 'combobox',
                    flex: 0.6,                    
                    fieldLabel: 'Status',
                    name: 'status_pegawai',
                    itemId: 'status_pegawai',
                    msgTarget: 'side',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'KONTRAK'}, {nama: 'TETAP'}, {nama: 'KELUAR'}, {nama: 'MELAMAR'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'local',
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#tmt').focus(true, 10);
                            }
                        }
                    }
                 }, {
                    xtype: 'datefield',
                    fieldLabel: 'TMT',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    name: 'tmt',
                    itemId: 'tmt',
                    readOnly: c.isView,
                    flex: 0.4,
                    labelWidth: 50,
                    labelStyle: 'text-align: right;',          
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#pangkat').focus(true, 10);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                defaults: {
                    msgTarget: 'side',
                    allowBlank: true
                },
                items: [{
                    xtype: 'combobox',
                    flex: 0.6,                    
                    fieldLabel: 'Jabatan',
                    name: 'pangkat',
                    itemId: 'pangkat',
                    msgTarget: 'side',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'MANAGER'}, {nama: 'ASMEN'}, {nama: 'SUPERVISOR'}, {nama: 'STAFF'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'local',
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        change: function() {
                            var pangkat = me.down('#pangkat').getSubmitValue();
                            var jabatan = me.down('#jabatan');
                            jabatan.setValue();
                            jabatan.setDisabled(pangkat!='STAFF');
                            
                        },
                        select: function(combo, record) {
                            var pangkat = me.down('#pangkat').getSubmitValue();
                            var jabatan = me.down('#jabatan');
                            jabatan.setValue();
                            jabatan.setDisabled(pangkat!='STAFF');
                        }, 
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#jabatan').focus(true, 10);
                            }
                        }
                    }
                 }, {
                    xtype: 'combobox',
                    flex: 0.4,
                    name: 'jabatan',
                    itemId: 'jabatan',
                    msgTarget: 'side',
                    store:  Ext.create('Admin.store.stores', {
                        fields: ['id', 'kode', 'nama', 'display'],
                        url: 'api/store/jabatanStore.php'
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 100,
                    minChars:0,
                    autoSelect: false,
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                               me.down('#tmt_jabatan').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 30
                }, {
                    xtype: 'combobox',
                    flex: 1,                    
                    fieldLabel: 'Area Operasi',
                    name: 'departemen',
                    itemId: 'departemen',
                    msgTarget: 'side',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'HO'}, {nama: 'PROJECT'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'local',
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        change: function() {
                            var departemen = me.down('#departemen').getSubmitValue();
                            var area = me.down('#area');
                            var store = area.getStore();
                            area.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['departemen'] = "";
                            store.removeAll();
                            
                            var lokasi = me.down('#lokasi');
                            var store_lokasi = lokasi.getStore();
                            lokasi.setValue();

                            var proxy_lokasi = store_lokasi.getProxy();
                            proxy_lokasi.extraParams['area'] = "";
                            store_lokasi.removeAll();
                            
                            lokasi.setDisabled(departemen=='HO');                            
                        },
                        select: function(combo, record) {
                            var departemen = me.down('#departemen').getSubmitValue();
                            
                            var area = me.down('#area');
                            var store = area.getStore();
                            area.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['departemen'] = me.down('#departemen').getSubmitValue();
                            store.removeAll();
                            store.loadPage(1);
                            
                            var lokasi = me.down('#lokasi');
                            var store_lokasi = lokasi.getStore();
                            lokasi.setValue();

                            var proxy_lokasi = store_lokasi.getProxy();
                            proxy_lokasi.extraParams['area'] = "";
                            store_lokasi.removeAll();
                            store_lokasi.loadPage(1);
                            
                            lokasi.setDisabled(departemen=='HO');
                        }, 
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#area').focus(true, 10);
                            }
                        }
                    }
                 }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    align: 'stretch',
                    type: 'hbox'
                },
                defaults: {
                    msgTarget: 'side',
                    allowBlank: true
                },
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Divisi',
                    labelWidth: 100,
                    flex: 1,
                    name: 'area',
                    itemId: 'area',
                    msgTarget: 'side',
                    store:  Ext.create('Admin.store.stores', {
                        fields: ['id', 'nama', 'display'],
                        url: 'api/store/areaOperasiStore.php'
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 0,
                    minChars:0,
                    autoSelect: false,
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        change: function() {
                            var lokasi = me.down('#lokasi');
                            var store = lokasi.getStore();
                            lokasi.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['area'] = "";
                            store.removeAll();
                            
                        },
                        select: function(combo, record) {
                            var lokasi = me.down('#lokasi');
                            var store = lokasi.getStore();
                            lokasi.setValue();

                            var proxy = store.getProxy();
                            proxy.extraParams['area'] = me.down('#area').getSubmitValue();
                            store.removeAll();
                            store.loadPage(1);
                        }, 
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#lokasi').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'container',
                    width: 30
                }, {
                    xtype: 'combobox',
                    labelWidth: 100,
                    flex: 1,
                    fieldLabel: 'Lokasi Kerja',
                    name: 'lokasi',
                    itemId: 'lokasi',
                    msgTarget: 'side',
                    store:  Ext.create('Admin.store.stores', {
                        fields: ['id', 'kode', 'nama', 'display'],
                        url: 'api/store/lokasiKerjaStore.php'
                    }),
                    valueField: 'id',
                    displayField: 'nama',
                    typeAhead: true,
                    queryMode: 'remote',
                    queryDelay: 100,
                    minChars:0,
                    autoSelect: false,
                    selectOnFocus: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                
                                me.up('window').down('#no_identitas').focus(true, 10);
                            }
                        }
                    }
                }]
            }]
        });
        
        me.callParent(arguments);
    }
});