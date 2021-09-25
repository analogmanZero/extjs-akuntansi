Ext.define('Admin.view.customer.CustomerEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'customer-edit',

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
        xtype: 'textfield',
        name: 'no_hp',
        fieldLabel: 'No. HP'
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
        xtype: 'combobox',
        name: 'akun_piutang',
        fieldLabel: 'Akun Piutang',
        store: {
            type: 'akunpiutang'
        },
        selectOnFocus: false,
        typeAhead: true,
        queryMode: 'local',
        valueField: 'kode_akun',
        displayField: 'nama_akun'
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
