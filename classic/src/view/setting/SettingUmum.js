Ext.define('Admin.view.setting.SettingUmum', {
    extend: 'Ext.form.Panel',
    xtype: 'setting-umum',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea'
    ],
    
    layout: 'anchor',
    bodyPadding: 20,

    scrollable: true,
    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        labelWidth: 100
    },

    listeners: {
        afterrender: 'onLoadData'
    },

    items: [{
        xtype: 'textfield',
        maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
        fieldLabel: 'Nama',
        name:'nama',
        maxLength: 50
    }, 
    {
        xtype: 'textareafield',
        maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
        fieldLabel: 'Alamat',
        name:'alamat'
    }, 
    {
        xtype: 'textfield',
        maskRe: /([0-9\s]+)$/,
        fieldLabel: 'Kode Pos',
        name:'kodepos',
        anchor: '45%',
        maxLength: 6
    }, 
    {
        xtype: 'textfield',
        maskRe: /([0-9\s+-]+)$/,
        fieldLabel: 'No. Telepon',
        name:'telepon',
        anchor: '60%',
        maxLength: 50
    }, 
    {
        xtype: 'textfield',
        maskRe: /([0-9\s+-]+)$/,
        fieldLabel: 'No. Fax',
        name:'fax',
        anchor: '60%',
        maxLength: 50
    }, 
    {
        xtype: 'textfield',
        maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
        fieldLabel: 'Negara',
        name:'negara',
        maxLength: 50
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Tutup',
                handler: 'onCancelButtonClick'
            },
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-green',
                text: 'Simpan',
                handler: 'onSaveButtonClick'
            }
        ]
    }
});
