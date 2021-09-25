Ext.define('Admin.store.stores', {
    extend: 'Ext.data.Store',

    fields: [],
    remoteSort: true,
    pageSize: 50,

    constructor: function(c) {

        Ext.apply(c, {
            
            proxy: {
                type: 'ajax',
                url: c.url,
                actionMethods: {
                    read: 'POST'
                },
                extraParams: c.params?c.params:undefined,
                reader: {
                    type: 'json',
                    rootProperty: 'topics',
                    totalProperty: 'totalCount'
                },
                simpleSortMode: true
            }

        });

        this.callParent(arguments);
    }

});