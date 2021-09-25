Ext.define('Admin.view.informasi.InformasiEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'informasi-edit',

    
    bodyPadding: 10,

    cls: 'shadow',

    listeners: {
        render: 'onFormLoad'
    },
    
    layout: 'anchor',
    
    defaults: {
        labelSeparator: '',
        msgTarget: 'side',
        anchor: '100%',
        selectOnFocus: true,
        allowBlank: false,
        labelAlign: 'top',
    },
        
    items: [{
        xtype: 'textfield',
        name: 'judul',
        fieldLabel: 'Judul'
    }, 
    {
        xtype: 'textfield',
        name: 'kepada',
        fieldLabel: 'Kepada'
    }, 
    {
        xtype: 'datefield',
        name:'tanggal',
        fieldLabel: 'Tanggal',
        format: 'd-m-Y',
        submitFormat: 'Y-m-d',
        value: new Date()
    }, 
    {
        xtype: 'ckeditor',
        fieldLabel: 'Penjelasan',
        itemId: 'ckeditor'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Audio Upload',
        itemId: 'audiofile',
        ext: 'mp3|mp4',
        keterangan: 'Tipe file harus mp3, mp4.'
    },
    {
        xtype: 'fileupload',
        fieldLabel: 'Dokumen Upload',
        itemId: 'docfile',
        ext: 'pdf|doc|docx',
        keterangan: 'Tipe file harus pdf, doc, docx.'
    },
    {
        xtype: 'checkbox',
        name: 'aktif',
        boxLabel: 'Aktifkan Informasi',
        inputValue: 1,
        checked: true,
        width: 120
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
