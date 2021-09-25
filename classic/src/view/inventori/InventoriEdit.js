Ext.define('Admin.view.inventori.InventoriEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'inventori-edit',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
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
        name: 'unit',
        fieldLabel: 'Satuan',
        store: {
            type: 'satuan'
        },
        selectOnFocus: false,
        typeAhead: true,
        queryMode: 'local',
        valueField: 'satuan',
        displayField: 'satuan'
    },
    {
        xtype: 'checkbox',
        name: 'pajak_jual',
        boxLabel: 'Pajak Jual',
        inputValue: 1,
        checked: true
    },
    {
        xtype: 'checkbox',
        name: 'pajak_beli',
        boxLabel: 'Pajak Beli',
        inputValue: 1,
        checked: true
    },
    {
        xtype: 'numberfield',
        name: 'harga_jual',
        fieldLabel: 'Harga Jual'
    },
    {
        xtype: 'numberfield',
        name: 'harga_beli',
        fieldLabel: 'Harga Beli'
    },
    {
        xtype: 'textareafield',
        name: 'keterangan',
        fieldLabel: 'Keterangan',
        allowBlank: true
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
