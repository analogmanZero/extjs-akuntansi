Ext.define('Admin.store.menu.Str_Icon', {
    extend: 'Ext.data.ArrayStore',

    constructor: function(config) {

        Ext.apply(config, {
        		model: config.model,
       		sortInfo: {
            		field    : 'name',
            		direction: 'ASC'
        				},
       		 data: config.data
    		
          });

        this.callParent(arguments);

    }

});