Ext.define('Admin.view.webdesktop.menu.viewIconMenu', {

    extend: 'Ext.view.View',
    alias : 'widget.viewIconMenu',
    
    style: {
        position: 'absolute'
    },
    x: 0,
    y: 0,
    trackOver: true,
    tpl  : Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div style="position:absolute; top:{y}px; left:{x}px;" id="{id}-shortcut">',
                  '<div class={[values.css==""?"ux-desktop-shortcut-depan":"uxx-normalyy"]}>',
                    '<img  src="{url}" /><br/>',
                    '<span class="ux-desktop-shortcut-text-depan">{name}</span><br />',
                  '</div>',
            '</div>',
        '</tpl>'
    ),
    itemSelector: 'div.ux-desktop-shortcut-depan',
    overItemCls : 'x-view-over-depan',
    multiSelect : true,
    autoScroll  : true,

    listeners: {
        render: function() {
            render: Ext.getBody().on("contextmenu", Ext.emptyFn, null, {preventDefault: true});
        }
    }
});