Ext.define('Admin.view.akun.AkunEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'akun-edit',

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
        xtype: 'combobox',
        name: 'id_parent',
        fieldLabel: 'Induk',
        store: {
            type: 'akun'
        },
        selectOnFocus: false,
        typeAhead: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'nama_akun',
        allowBlank: true,
        listConfig: {
            loadingText: 'Loading...',
            //set tinggi dan lebar isi list
            //width : '40%',
            //height : '100%',
            //resizable : true,
            //emptyText: 'Data tidak ditemukan.',
            getInnerTpl: function() {
                return '{display}';
            }
        } 
    },
    {
        xtype: 'textfield',
        name: 'kode_akun',
        fieldLabel: 'Kode Akun',
        maskRe: /([a-zA-Z0-9.-]+)$/,
        maxLength: 70
    }, 
    {
        xtype: 'textfield',
        name: 'nama_akun',
        fieldLabel: 'Nama Akun',
        maxLength: 150
    }, 
    {
        xtype: 'combobox',
        name: 'tipe',
        fieldLabel: 'Jenis',
        store: {
            type: 'jenisrek'
        },
        selectOnFocus: false,
        typeAhead: true,
        queryMode: 'local',
        valueField: 'jenis',
        displayField: 'jenis'
    },
    {
        xtype: 'combobox',
        name: 'saldonormal',
        fieldLabel: 'Saldo Normal',
        store: {
            type: 'saldonormal'
        },
        selectOnFocus: false,
        typeAhead: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'id',
        allowBlank: true
    },
    {
        xtype: 'textareafield',
        name: 'keterangan',
        fieldLabel: 'Keterangan',
        allowBlank: true
    }
    /*,
    {
        xtype: 'checkbox',
        name: 'status',
        boxLabel: 'Akun Transaksi',
        inputValue: 'Y',
        checked: true
    }*/],

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
