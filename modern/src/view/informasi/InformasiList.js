Ext.define('Admin.view.informasi.InformasiList', {
    extend: 'Ext.Panel',
    xtype: 'informasi-list',

    requires: [
        'Ext.dataview.DataView' 
    ],

    scrollable: true,

    listeners: {
        added: 'onLoadList'
    },

    title: 'Informasi',
    items: [{
        xtype: 'dataview',
        flex: 1, 
        store: {
            type: 'informasi',
            autoLoad: false
        },
        listeners: {
            select: 'onSelect'
        },
        selectedCls: 'inbox-item-selected',
        itemTpl: 
            new Ext.XTemplate(
                '<div class="inbox-item">',
                    '<div class="inbox-inner-row inbox-{read:pick(\'unread\',\'read\')}">',
                        '<div class="list-cls inbox-from">{kepada}</div>',
                        '<div class="inbox-date">',
                            '<tpl if="audiofile !== \'\' || docfile !==\'\'">',
                                '<span class="x-fa fa-paperclip inbox-attachment"></span>',
                            '</tpl>',
                            '{tanggal:date("M d")}',
                        '</div>',
                    '</div>',
                    '<div class="inbox-inner-row">',
                        '<div class="inbox-summary">{judul}</div>',
                    '</div>',
                '</div>'
            )           
        
    }]
});
