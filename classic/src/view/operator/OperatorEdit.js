Ext.define('Admin.view.operator.OperatorEdit', {
    
    extend: 'Ext.form.Panel',
    xtype: 'operator-edit',
    
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox'
    ],

    controller: 'operator',

    layout: 'anchor',

    bodyPadding: 10,
    scrollable: true,

    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },

    listeners: {
        afterrender: 'onLoadData'
    },

    items: [
        {
            xtype: 'textfield',
            name: 'nama',
            fieldLabel: 'Nama'
        },
        {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            vtype: 'email' 
        },
        {
            xtype: 'textfield',
            maskRe: /([0-9\s]+)$/,
            name: 'nohp',
            fieldLabel: 'No. HP'
        },
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'User ID'
        },
        {
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password'
        },
        {
            xtype: 'checkbox',
            name: 'aktif',
            boxLabel: 'Aktif',
            inputValue: 1,
            checked: true
        },
        {
            xtype: 'filefield',
            name: 'file',
            buttonConfig: {
                xtype: 'filebutton',
                glyph:'',
                iconCls: 'x-fa fa-cloud-upload-alt',
                text: 'Browse'
            },
            fieldLabel: 'Photo',
            allowBlank: true
        }
    ],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Batal',
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
