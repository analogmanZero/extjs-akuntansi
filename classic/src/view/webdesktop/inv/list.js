Ext.define('Admin.view.webdesktop.inv.list', {
    extend: 'Ext.window.Window',
    alias : 'widget.invlist',

    modulId: 'inv',
    layout: 'fit',
    border: false,

    title: 'Inventori',
    width: 900,
    height: 500,

    items: [{
        xtype: 'invinventorilist'
    }]

});