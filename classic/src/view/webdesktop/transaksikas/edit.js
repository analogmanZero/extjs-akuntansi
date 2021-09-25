Ext.define('Admin.view.webdesktop.transaksikas.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.transaksikasedit',

    layout: 'fit',

    width: 970,
    height: 500,

    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            buttons: [{
                text : 'Simpan',
                iconCls: 'save',
                itemId: 'simpan',
                action: 'simpan'
            }, {
                text : 'Cetak',
                iconCls: 'print',
                itemId: 'cetak',
                action: 'cetak',
                disabled: true,
                hidden: true
            }],

            items: [{
                xtype: 'form',
                border: false,
                reader: new Ext.data.JsonReader({
                    model: 'Admin.model.transaksikas.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),

                fieldDefaults: {
                    msgTarget: 'side',
                    labelWidth: 120,
                    allowBlank: false,
                    anchor: '100%'
                },

                layout: 'border',

                items: [Ext.create('Admin.view.webdesktop.transaksikas.header', {
                    region: 'north',
                    isEdit: c.isEdit,
                    aparatur: c.aparatur
                }),
                Ext.create('Admin.view.webdesktop.transaksikas.detail', {
                    region: 'center',
                    isEdit: c.isEdit,
                    aparatur: c.aparatur
                }), {
                    xtype: 'container',
                    region: 'south',
                    height: 5
                }] //,
//                Ext.create('Admin.view.webdesktop.transaksikas.tombol', {
//                    isEdit: c.isEdit
//                })]
            }]
        });

        me.callParent(arguments);
    },

    //LOAD DATA SAAT TOMBOL EDIT DI KLIK
    afterRender: function() {
        this.callParent();
        var me = this;

        if(me.isEdit.length>0) {
            var form = me.down('form');
            var myMask = new Ext.LoadMask({target: me, msg:'Loading...'});
            myMask.show();
            Ext.Ajax.request({
                params: {id: me.isEdit},
                url: 'api/store/transaksikas/dataLoad.php',
                //waitMsg: 'Loading...',
                success: function(response) {
                    myMask.hide();
                    
                    var json = Ext.JSON.decode(response.responseText);
                    var results = json['results'][0];
                    form.getForm().setValues(results);

                    var header = me.down('transaksikasheader');
                    var detail = me.down('transaksikasdetail');
                    //var program = header.down('[name=program]');
                    var sbr_dana = header.down('[name=sbr_dana]');
                    var sumber = header.down('[name=sumber]');

                    sumber.getStore().getProxy().extraParams['tipe'] = json.results[0]['tipe'];
                    sumber.getStore().add({id: json.results[0]['id_akun'], kode_akun: json.results[0]['sumber'], nama_akun: json.results[0]['nama_akun'], level: 4});
                    sumber.setValue(json.results[0]['sumber']);
                    sumber.initialLoad = undefined;
                    
                    sbr_dana.getStore().getProxy().extraParams['tipe'] = json.results[0]['tipe'];
                    sbr_dana.getStore().add({id: json.results[0]['id_sbr_dana'], kode_akun: json.results[0]['sbr_dana'], nama_akun: json.results[0]['nama_sbr_dana'], level: 4});
                    sbr_dana.setValue(json.results[0]['sbr_dana']);
                    sbr_dana.initialLoad = undefined;

//                    program.getStore().getProxy().extraParams['tipe'] = json.results[0]['tipe'];
//                    program.getStore().add({
//                        leaf: json.results[0]['leaf_program'], 
//                        id: json.results[0]['id_program'], 
//                        kode_akun: json.results[0]['rekening_pk'], 
//                        nama_akun: json.results[0]['nama_program']});                    
//                    program.setValue(json.results[0]['rekening_pk']);

                    detail.down('grid').getStore().loadRawData(json);
                    
                    var tipe = me.down('[name=tipe]').getSubmitValue();
                    //me.down('[name=sbr_dana]').setDisabled(tipe!='BKK');    
                    //me.down('[name=program]').setDisabled(tipe!='BKK');
                    me.down('[name=sumber]').setFieldLabel(tipe=='BKK'?'Rek. Pengeluaran':'Sumber Dana');    
                    me.down('[name=sbr_dana]').setFieldLabel(tipe=='BKK'?'Sumber Dana':'Rek. Pemasukan');                                                                
                            					
                }
            });
        } else {
            me.down('[name=tipe]').setValue('BKM');
            me.down('[name=tipe]').fireEvent('select', me.down('[name=tipe]'));
        }
    }
});