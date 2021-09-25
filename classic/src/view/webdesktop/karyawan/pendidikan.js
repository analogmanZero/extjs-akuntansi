Ext.define('Admin.view.webdesktop.karyawan.pendidikan', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawanpendidikan',

    border: false,

    layout: 'anchor',
    bodyPadding: 20,

    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        labelWidth: 200
    },

    constructor: function(c) {
        var me = this;
        Ext.apply(c, {

            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'karyawanan Terakhir',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    readOnly: c.isView,
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Jurusan',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    name: 'jurusan',
                    flex: 0.8,
                    labelWidth: 80
                }, {
                    xtype: 'textfield',
                    readOnly: c.isView,
                    maskRe: /([0-9\s]+)$/,
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Tahun Lulus',
                    name: 'tahunlulus',
                    flex: 0.5,
                    labelWidth: 105
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Keterangan Sertifikasi',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaultType: 'radiofield',
                items: [{
                    boxLabel  : 'Ada',
                    name      : 'ketsertifikasi',
                    readOnly: c.isView,
                    inputValue: 'Ada',
                    flex      : 0.2
                }, {
                    boxLabel  : 'Belum Ada',
                    name      : 'ketsertifikasi',
                    readOnly: c.isView,
                    inputValue: 'Belum Ada',
                    flex      : 0.8
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'No. Reg. Sertifikasi',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                    name: 'noregsertifikasi',
                    readOnly: c.isView,
                    flex      : 0.5
                }, {
                   xtype: 'datefield',
                    fieldLabel: '&nbsp;&nbsp;&nbsp;Tanggal Lulus Sertifikasi',
                    format: 'd-m-Y',
                    submitFormat: 'Y-m-d',
                    name: 'tanggallulussertifikasi',
                    readOnly: c.isView,
                    flex      : 0.6,
                    labelWidth: 180
                }]
            }]
        });
        
        me.callParent(arguments);
    }
});