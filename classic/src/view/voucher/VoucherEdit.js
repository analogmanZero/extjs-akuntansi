Ext.define('Admin.view.voucher.VoucherEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'voucher-edit',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.TextArea'
    ],
    
    layout: 'anchor',
    bodyPadding: 20,

    scrollable: true,
    defaults: {
        anchor: '100%',
        msgTarget: 'under',
        labelAlign: 'top',
        allowBlank: false
    },

    listeners: {
        afterrender: 'onLoadData'
    },

    items: [{
        xtype: 'textfield',
        name: 'kode',
        fieldLabel: 'Kode'                
    },
    {
        xtype: 'textfield',
        name: 'nama',
        fieldLabel: 'Nama'
    },
    {
        xtype: 'combobox',
        name: 'id_area',
        fieldLabel: 'Area',
        store: {
            type: 'area'
        },
        selectOnFocus: false,
        typeAhead: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'nama'
    },
    {
        xtype: 'numberfield',
        name: 'harga_jual',
        fieldLabel: 'Harga'
    },
    {
        xtype: 'checkbox',
        name: 'pajak_jual',
        boxLabel: 'Pajak Jual',
        inputValue: 1,
        checked: true
    }],

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
