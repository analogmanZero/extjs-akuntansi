Ext.define('Admin.view.webdesktop.inv.inventori.gambar', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.inventorigambar',

    loadRecord: function(records, new_update, urls) {
        var me = this;
        this.body.hide();

        var chars = "0123456789";
	var string_length = 3;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}

        var url = (urls?urls:'api/store/inventori/img.php?') + randomstring + '&';
        this.tpl = new Ext.Template(
                (!Ext.isIE6? '<img width="' + me.width + '" height="' + me.height + '" src="'+ url + 'id={id}" />' :
                '<div style="width:' + me.width + ';height:' + me.height + ';filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'' + url + 'id={id}\')"></div>')
        );

        this.tpl.overwrite(this.body, records?records.data:0);
        this.body.slideIn('t', {
            duration: 250
        });

    }
});
