Ext.define('Admin.view.webdesktop.gridFeatureSummary', {

    override: 'Ext.grid.feature.Summary',
    init: function(grid) {
        var me = this,
            view = me.view;

        me.callParent(arguments);

        if (me.dock) {
            grid.headerCt.on({
                afterlayout: me.onStoreUpdate,
                scope: me
            });
            grid.on({
                beforerender: function() {
                    var tableCls = [me.summaryTableCls];
                    if (view.columnLines) {
                        tableCls[tableCls.length] = view.ownerCt.colLinesCls;
                    }
                    me.summaryBar = grid.addDocked({
                        childEls: ['innerCt'],
                        renderTpl: [
                            '<div id="{id}-innerCt">',
                                '<table cellPadding="0" cellSpacing="0" class="' + tableCls.join(' ') + '">',
                                    '<tr class="' + me.summaryRowCls + '"></tr>',
                                '</table>',
                            '</div>'
                        ],
                        style: 'overflow:hidden',
                        itemId: 'summaryBar',
                        cls: [ me.dockedSummaryCls, me.dockedSummaryCls + '-' + me.dock ],
                        xtype: 'component',
                        dock: me.dock,
                        weight: 10000000
                    })[0];
                },
                afterrender: function() {
                    grid.body.addCls(me.panelBodyCls + me.dock);
                    view.mon(view.el, {
                        scroll: me.onViewScroll,
                        scope: me
                    });
                    me.onStoreUpdate();
                },
                single: true
            });

            // Stretch the innerCt of the summary bar upon headerCt layout
            grid.headerCt.afterComponentLayout = Ext.Function.createSequence(grid.headerCt.afterComponentLayout, function() {
                me.summaryBar.innerCt.setWidth(this.getFullWidth()/* Removed: + Ext.getScrollbarSize().width */);
            });
        } else {
            me.view.addFooterFn(me.renderTFoot);
        }

        grid.on({
            columnmove: me.onStoreUpdate,
            scope: me
        });

        // On change of data, we have to update the docked summary.
        view.mon(view.store, {
            update: me.onStoreUpdate,
            datachanged: me.onStoreUpdate,
            scope: me
        });
    }

});