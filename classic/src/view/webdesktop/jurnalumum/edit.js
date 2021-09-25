Ext.define('Admin.view.webdesktop.jurnalumum.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.jurnalumumedit',

    layout: 'fit',

    width: 785,
    height: 510,

    constructor: function(c) {
        var me = this;


        me.items = [{
            xtype: 'form',
            border: false,

            layout: {
                align: 'stretch',
                type: 'vbox'
            },

            reader: new Ext.data.JsonReader({
                model: 'Admin.model.jurnalumum.edit',
                rootProperty: 'results',
                totalProperty: 'total'
            }),

            fieldDefaults: {
                anchor: '100%',
                msgTarget: 'side',
                labelWidth: 110
            },

            items: [Ext.create('Admin.view.webdesktop.jurnalumum.header', {
                form: c.form,
                path: c.path,
                isEdit: c.isEdit
            }), {
                xtype: 'panel',
                flex: 1,
                bodyPadding: 5,
                border : false,
                layout: 'fit',
                items: Ext.create('Admin.view.webdesktop.jurnalumum.grid',{
                    form: c.form,
                    path: c.path
                })
            }, Ext.create('Admin.view.webdesktop.jurnalumum.tombol', {
                form: c.form,
                path: c.path,
                isEdit: c.isEdit
            })]
        }];

        me.callParent(arguments);
    }
});