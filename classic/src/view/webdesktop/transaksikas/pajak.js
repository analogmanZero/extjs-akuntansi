Ext.define('Admin.view.webdesktop.transaksikas.pajak', {

    extend: 'Ext.window.Window',
    alias: 'widget.transaksikaspajak',

    layout: 'fit',

    width: 500,
    height: 250,

    modal: true,
    constructor: function(c) {
        var me = this;

        this.buttons = [{
            text: 'Submit',
            handler: function() {

                var values = me.down('form').getForm().getValues();

                me.recordSelect.set('ppn', me.down('[name=ppn]').getValue());
                me.recordSelect.set('total_ppn', me.down('[name=total_ppn]').getSubmitValue());

                me.recordSelect.set('pph_21', me.down('[name=pph_21]').getValue());
                me.recordSelect.set('pph_21_nilai', me.down('[name=pph_21]').getValue()?values['pph_21_nilai']:0);
                me.recordSelect.set('total_pph_21', me.down('[name=total_pph_21]').getSubmitValue());

                me.recordSelect.set('pph_22', me.down('[name=pph_22]').getValue());
                me.recordSelect.set('pph_22_nilai', me.down('[name=pph_22]').getValue()?values['pph_22_nilai']:0);
                me.recordSelect.set('total_pph_22', me.down('[name=total_pph_22]').getSubmitValue());

                me.recordSelect.set('pph_23', me.down('[name=pph_23]').getValue());
                me.recordSelect.set('pph_23_nilai', me.down('[name=pph_23]').getValue()?values['pph_23_nilai']:0);
                me.recordSelect.set('total_pph_23', me.down('[name=total_pph_23]').getSubmitValue());

                me.recordSelect.set('pph_sewa', me.down('[name=pph_sewa]').getValue());
                me.recordSelect.set('total_pph_sewa', me.down('[name=total_pph_sewa]').getSubmitValue());

                var totalPajak = me.totalPajak();
                me.editorPajak.setValue(totalPajak);
                
                me.close();
            }
        }, {
            text: 'Batal',
            scope: me,
            handler: this.close
        }];

        this.items = [{
            xtype: 'form',
            bodyPadding: 10,
            layout: 'anchor',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'checkbox',
                    boxLabel: 'PPN - 10%',
                    inputValue: 'Y',
                    name: 'ppn',
                    width: 320,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'currencyfield',
                    name: 'total_ppn',
                    fieldStyle: 'text-align: right',
                    flex: 1,
                    readOnly: true
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'checkbox',
                    boxLabel: 'PPH 21',
                    name: 'pph_21',
                    inputValue: 'Y',
                    width: 80,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_21_nilai',
                    boxLabel: '18%',
                    inputValue: 18,
                    width: 60,
                    checked: true,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_21_nilai',
                    boxLabel: '15%',
                    inputValue: 15,
                    width: 60,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_21_nilai',
                    boxLabel: '6%',
                    inputValue: 6,
                    width: 60,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_21_nilai',
                    boxLabel: '5%',
                    inputValue: 5,
                    width: 60,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'currencyfield',
                    name: 'total_pph_21',
                    fieldStyle: 'text-align: right',
                    flex: 1,
                    readOnly: true
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'checkbox',
                    boxLabel: 'PPH 22',
                    name: 'pph_22',
                    inputValue: 'Y',
                    width: 80,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_22_nilai',
                    boxLabel: '3%',
                    inputValue: 3,
                    width: 60,
                    checked: true,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_22_nilai',
                    boxLabel: '1.5%',
                    inputValue: 1.5,
                    width: 180,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'currencyfield',
                    name: 'total_pph_22',
                    fieldStyle: 'text-align: right',
                    flex: 1,
                    readOnly: true
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'checkbox',
                    boxLabel: 'PPH 23',
                    name: 'pph_23',
                    inputValue: 'Y',
                    width: 80,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_23_nilai',
                    boxLabel: '2%',
                    inputValue: 2,
                    width: 60,
                    checked: true,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'radiofield',
                    name: 'pph_23_nilai',
                    boxLabel: '4%',
                    inputValue: 4,
                    width: 180,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'currencyfield',
                    name: 'total_pph_23',
                    fieldStyle: 'text-align: right',
                    flex: 1,
                    readOnly: true
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'checkbox',
                    boxLabel: 'PPH Sewa 10%',
                    name: 'pph_sewa',
                    inputValue: 'Y',
                    width: 320,
                    listeners: {
                        scope: me,
                        change: me.hitungPajak
                    }
                }, {
                    xtype: 'currencyfield',
                    name: 'total_pph_sewa',
                    fieldStyle: 'text-align: right',
                    flex: 1,
                    readOnly: true
                }]
            }]
        }];

        this.callParent(arguments);
    },

    totalPajak: function() {
        var me = this;
        var ppn = me.down('[name=total_ppn]').getSubmitValue();
        var pph_21 = me.down('[name=total_pph_21]').getSubmitValue();
        var pph_22 = me.down('[name=total_pph_22]').getSubmitValue();
        var pph_23 = me.down('[name=total_pph_23]').getSubmitValue();
        var pph_sewa = me.down('[name=total_pph_sewa]').getSubmitValue();

        return ppn+pph_21+pph_22+pph_23+pph_sewa;
    },

    totalPajakPpn: function(pajak, name) {
        var me = this;
        var total = me.jumlah;
		//if(name=='total_ppn' && total>=2000000 && pajak>0) { memang ada perubahan disini
        var total_ppn = me.down('[name=total_ppn]').getSubmitValue();
		//alert(total_ppn);
		if(name=='total_pph_22' && total_ppn>0 && pajak==1.5) {		//nng	
			
			me.down('[name='+name+']').setValue(total_ppn*((10*pajak)/100)); 	
		} else		
        if(name=='total_ppn' && total>=1 && pajak>0) {
            me.down('[name='+name+']').setValue(total*(10/110));
        } else {
            me.down('[name='+name+']').setValue(total*(pajak/100));   
        }
    },

    hitungPajak: function() {
        var me = this;
        var values = me.down('form').getForm().getValues();
        
        me.totalPajakPpn(me.down('[name=ppn]').getValue()?10:0, 'total_ppn');
        me.totalPajakPpn(me.down('[name=pph_21]').getValue()?values['pph_21_nilai']:0, 'total_pph_21');
        me.totalPajakPpn(me.down('[name=pph_22]').getValue()?values['pph_22_nilai']:0, 'total_pph_22');
        me.totalPajakPpn(me.down('[name=pph_23]').getValue()?values['pph_23_nilai']:0, 'total_pph_23');
        me.totalPajakPpn(me.down('[name=pph_sewa]').getValue()?10:0, 'total_pph_sewa');
    },

    afterRender: function() {
        this.callParent();
    },

    onClose: function() {
        this.callParent();

        alert('1234');
    }
});