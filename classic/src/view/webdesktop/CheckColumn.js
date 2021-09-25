Ext.define('Admin.view.webdesktop.CheckColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.plcheckcolumn',
    
    constructor: function() {
        var me = this;

        this.addEvents(
            /**
             * @event checkchange
             * Fires when the checked state of a row changes
             * @param {Ext.ux.CheckColumn} this
             * @param {Number} rowIndex The row index
             * @param {Boolean} checked True if the box is checked
             */
            'checkchange'
        );

        this.listeners= {
            checkchange: function(e, recordIndex, checked) {
                me.CheckChangeValue(e, recordIndex, checked);
            }
        }
        this.callParent(arguments);
    },

    CheckChangeValue: function(e, recordIndex, checked, parent) {
        var me = this;
        
        if (!parent && !me.parent) return;

        var grid = me.up(parent?parent:me.parent);
        var record = grid.store.getAt(recordIndex);
        var newChecked = me.mustChecked?true:checked;

        record.set(me.dataIndex, newChecked);
        record.commit();

        if(newChecked) {
            for(var i=0; i<grid.store.getCount(); i++) {
                if(i!=recordIndex) {
                    grid.store.getAt(i).set(me.dataIndex, false);
                    grid.store.getAt(i).commit();
                }
            }
        }
    },


    /**
     * @private
     * Process and refire events routed from the GridView's processEvent method.
     */
    processEvent: function(type, view, cell, recordIndex, cellIndex, e) {
        if (type == 'mousedown' || (type == 'keydown' && (e.getKey() == e.ENTER || e.getKey() == e.SPACE))) {
            var record = view.panel.store.getAt(recordIndex),
                dataIndex = this.dataIndex,
                checked = !record.get(dataIndex);
                
            record.set(dataIndex, checked);
            this.fireEvent('checkchange', this, recordIndex, checked);
            // cancel selection.
            return false;
        } else {
            return this.callParent(arguments);
        }
    },

    // Note: class names are not placed on the prototype bc renderer scope
    // is not in the header.
    renderer : function(value){
        var cssPrefix = Ext.baseCSSPrefix,
            cls = [cssPrefix + 'grid-checkheader'];

        if (value) {
            cls.push(cssPrefix + 'grid-checkheader-checked');
        }
        return '<div class="' + cls.join(' ') + '">&#160;</div>';
    }
});

