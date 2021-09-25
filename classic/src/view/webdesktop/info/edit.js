Ext.define('Admin.view.webdesktop.info.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.profitlookinfo',

    layout: 'fit',
    border: false,
    modal: true,
    height: 215,
    width: 438,
    title: 'Informasi Profitlook',
    
    constructor: function() {
        var me = this;
        
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                border: true,
                reader: new Ext.data.JsonReader({
                    model: 'Admin.model.info.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                layout: 'border',
                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 150
                },
                bodyPadding: 10,
                items: [{
                    xtype: 'container',
                    region: 'center',
                    layout: 'anchor',
                    items: [{
                        xtype: 'textfield',
                        name: 'serialno',
                        readOnly: true,
                        anchor: '100%',
                        fieldLabel: 'No. Serial'
                    }, {
                        xtype: 'textfield',
                        name: 'registrasino',
                        readOnly: true,
                        anchor: '100%',
                        fieldLabel: 'No. Registrasi'
                    }, {
                        xtype: 'textfield',
                        name: 'aksesno',
                        readOnly: true,
                        anchor: '100%',
                        fieldLabel: 'Jumlah Maximum Akses'
                    }, {
                        xtype: 'combobox',
                        name: 'paket',
                        store: Ext.create('Admin.store.stores', {
                            fields: ['id','keterangan'],
                            url: 'api/store/paketStore.php',
                            autoLoad: true
                        }),
                        valueField: 'id',
                        displayField: 'keterangan',
                        queryMode: 'local',
                        typeAhead: true,
                        fieldLabel: 'Paket Program',
                        readOnly: true,
                        anchor: '100%'
                    }]
                }, {
                    xtype: 'container',
                    region: 'south',
                    layout: 'hbox',
                    items: [{
                        xtype: 'container',
                        flex: 1
                    }, {
                        xtype: 'button',                        
                        width: 60,
                        text: 'Tutup',
                        scope: this,
                        handler: this.close
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});