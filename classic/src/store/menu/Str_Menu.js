Ext.define('Admin.store.menu.Str_Menu', {
	
	extend: 'Ext.data.Store',
	model: 'Admin.model.menu.Mod_Menu',
	storeId : 'tesId',
	
	
	proxy: {
		type: 'ajax',
		api: {
			read: 'php/tes.php'
			
		},
		reader: {
			type: 'json',
			rootProperty: 'tes',
			successProperty: 'success'
		}
	}
});