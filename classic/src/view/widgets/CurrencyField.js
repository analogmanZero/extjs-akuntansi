Ext.define('Admin.view.widgets.CurrencyField', {
    extend:'Ext.form.field.Text',
    xtype: 'currencyfield',
    
    i: 0,
    constructor: function(config) {
        
        this.func = new Admin.view.currency();
        Ext.apply(config, {
            maskRe: config.minus?(config.tipe=='diskon'?/([0-9\s.\-+%]+)$/:/([0-9\s.\-]+)$/):
                    (config.tipe=='diskon'?/([0-9\s.+%]+)$/:/([0-9\s.]+)$/)
        });
                
        this.callParent(arguments);
    },

    onChange: function(v) {
        this.setValue(v);
    },

    setValue: function(v) {
	this.callParent(arguments);

        var t = this, f = t.func;
        var dec = t.dec==undefined?2:t.dec;
        this.setRawValue(t.tipe?(t.tipe=='diskon'?f.diskon(v):f.currency(v, dec)):f.currency(v, dec));
    },

    getSubmitValue: function() {
        var v = this.getValue();
        return v.replace(/[\,]/g, '');
    }
});

