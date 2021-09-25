Ext.define('Admin.view.informasi.InformasiView', {
    extend: 'Ext.Panel',
    xtype: 'informasi-view',

    requires: [
        'Ext.Button',
        'Ext.dataview.DataView' 
    ],

    title: 'Detail Informasi',

    bbar: ['->', {
        ui: 'header',
        text: '<b>Kembali</b>',
        handler: 'onShow'
    }],

    listeners: {
        added: 'onLoadView'
    },

    items: [{
        xtype: 'dataview',
        cls: 'informasi',
        flex: 1,
        scrollable: true,
        store: {
            type:'informasi',
            autoLoad: false,
        },
        selectedCls: 'informasi-item-selected',
        itemTpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="informasi-item">',
                    '<div class="list-cls">Kepada: {kepada}</div>',
                    '<div class="judul">{judul}</div>',
                    '<div class="time">{tanggal:date("d-m-Y")}</div>',
                    '<hr />',
                    '<div>{penjelasan}</div>',
                '</div>',
            '</tpl>',
            {
                getThumbUrl: function (jarak) {
                    //alert('tes '+jarak);
                    return '';
                }
            }
        )
    }]
});
