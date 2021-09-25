Ext.define('Admin.view.webdesktop.karyawan.detail', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawandetail',

    border: false,

    layout: 'anchor',
    bodyPadding: 20,

    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        labelWidth: 180
    },

    constructor: function(c) {
        var me = this;
        Ext.apply(c, {

            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Status Kepegawaian',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaultType: 'radiofield',
                items: [{
                    boxLabel  : 'PNS',
                    name      :'statuspegawai',
                    readOnly: c.isView,
                    inputValue: 'PNS',
                    flex      : 0.2
                }, {
                    boxLabel  : 'Swasta',
                    name      : 'statuspegawai',
                    readOnly: c.isView,
                    inputValue: 'Swasta',
                    flex      : 0.2
                }, {
                    boxLabel  : 'Honor',
                    name      : 'statuspegawai',
                    readOnly: c.isView,
                    inputValue: 'Honor',
                    flex      : 0.6
                }]
            }, {
                xtype: 'textfield',
                name: 'jabatan',
                readOnly: c.isView,
                fieldLabel: 'Jabatan'
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Pangkat',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    readOnly: c.isView,
                    name: 'pangkat',
                    flex: 0.5
                }, {
                    xtype: 'textfield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Golongan',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    readOnly: c.isView,
                    name: 'golongan',
                    flex: 0.5,
                    labelWidth: 135
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'SK CPNS',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    flex: 0.5,
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    readOnly: c.isView,
                    name: 'skcpns'
                }, {
                    xtype: 'datefield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Tanggal CPNS',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    name: 'tanggalcpns',
                    readOnly: c.isView,
                    flex: 0.5,
                    labelWidth: 135
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'SK Pengaktaan',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    flex: 0.5,
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    readOnly: c.isView,
                    name: 'skpengangkatan'
                }, {
                    xtype: 'datefield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;TMT Pengaktaan',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    name: 'tmtpengangkatan',
                    readOnly: c.isView,
                    flex: 0.5,
                    labelWidth: 135
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Lembaga Pengangkat',
                maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                readOnly: c.isView,
                name: 'lembagapengangkatan'
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'TMT PNS',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'datefield',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    name: 'tmtpns',
                    readOnly: c.isView,
                    flex: 0.7
                }, {
                    xtype: 'combo',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Lisensi Kepala Sekolah',
                    name: 'lisensikepsek',
                    queryMode: 'local',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['nama'],
                        data:[{nama: 'Ada'}, {nama: 'Belum Ada'}]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
                    readOnly: c.isView,
                    flex: 1,
                    labelWidth: 180
                }]
            }, {
                xtype: 'textfield',
                maskRe: /([a-zA-Z0-9.-~@_]+)$/ ,
                fieldLabel: 'Sumber Gaji',
                readOnly: c.isView,
                name:'sumbergaji'
            }, {
                xtype: 'textfield',
                maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                fieldLabel: 'NPWP',
                readOnly: c.isView,
                name:'npwp'
            }]
        });
        
        me.callParent(arguments);
    }
});