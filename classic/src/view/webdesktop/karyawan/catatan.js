Ext.define('Admin.view.webdesktop.karyawan.catatan', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.karyawancatatan',

    border: false,

    layout: 'anchor',
    bodyPadding: 20,

    defaults: {
        msgTarget: 'side',
        anchor: '100%',
        labelWidth: 100
    },

    constructor: function(c) {
        var me = this;

        Ext.apply(c, {

            items: [{
                xtype: 'textareafield',
                region: 'center',
                name:'catatan',
                hideLabel: true,
                height: 200
            }]
        });

        me.callParent(arguments);
    }
});