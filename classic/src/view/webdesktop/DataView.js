Ext.define('Admin.view.webdesktop.DataView', {
    extend: 'Ext.view.View',
    xtype: 'xdataview',

    style: {
        position: 'absolute'
    },
    
    x: 0, y: 0,
    trackOver: true,

    store: Ext.create('Ext.data.Store', {
        fields: ['id', 'kode', 'keterangan', 'nama_file_icon', 'modul', 'akses', {name: 'iscrud', type: 'bool'}, {name: 'kolom', type: 'int'}, {name: 'baris', type: 'int'}],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'shortcut'
            }
        }
    }),

    tpl: Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div style="position:absolute; top:{baris}px; left:{kolom}px;">',
                '<div class="ux-desktop-shortcut" id="{id}-shortcut">',
                    '<center>',
                        (!Ext.isIE6?'<img class="ux-desktop-shortcut-icon" src="resources/images/webdesktop/shortcut/{nama_file_icon}" />' :
                        '<div style="width:48px; height:48px; background-color: transparent; background-repeat: no-repeat; filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/shortcut/{nama_file_icon}\',sizingMethod=\'scale\');"></div>'),
                    '</center>',
                '<span class="ux-desktop-shortcut-text">{keterangan}</span>',
                '</div>',
            '</div>',
        '</tpl>'
    ),  
    
    itemSelector: 'div.ux-desktop-shortcut',
    overItemCls : 'x-view-over'

});