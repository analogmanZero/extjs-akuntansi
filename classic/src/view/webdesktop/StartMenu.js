Ext.define('Admin.view.webdesktop.StartMenu', {
    extend: 'Ext.menu.Menu',
    xtype: 'xstartmenu',

    // We want header styling like a Panel 
    baseCls: Ext.baseCSSPrefix + 'panel',
 
    // Special styling within 
    cls: 'x-menu ux-start-menu',
    bodyCls: 'ux-start-menu-body',
 
    defaultAlign: 'bl-tl',
    iconCls: 'user',
 
    bodyBorder: true,
 
    width: 375,
 
    initComponent: function() {
        var me = this;
 
        me.layout.align = 'stretch';
 
        me.items = me.menu;
 
        me.callParent();
 
        me.toolbar = new Ext.toolbar.Toolbar(Ext.apply({
            dock: 'right',
            cls: 'ux-start-menu-toolbar',
            vertical: true,
            width: 100,
            layout: {
                align: 'stretch'
            }
        }, me.toolConfig));
 
        me.addDocked(me.toolbar);
 
        delete me.toolItems;
    },
 
    addMenuItem: function() {
        var cmp = this.menu;
        cmp.add.apply(cmp, arguments);
    },
 
    addToolItem: function() {
        var cmp = this.toolbar;
        cmp.add.apply(cmp, arguments);
    }
}); // StartMenu 

