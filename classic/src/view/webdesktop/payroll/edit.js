Ext.define('Admin.view.webdesktop.payroll.edit', {

    extend: 'Ext.window.Window',
    alias : 'widget.payrolledit',

    layout: 'fit',

    width: 860,
    height: 480,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'form',
                layout: {
                    align: 'stretch',
                    type: 'vbox'
                },
                flex: 1,
                border: false,
                reader: new Ext.data.JsonReader({
                    model: 'Admin.model.payroll.edit',
                    rootProperty: 'results',
                    totalProperty: 'total'
                }),
                items: [{
                    xtype: 'payrollheader',
                    isEdit: c.isEdit
                }, {
                    xtype: 'panel',
                    border: false,
                    flex: 1,
                    layout: 'fit',
                    bodyPadding: 5,
                    items: [{
                        xtype: 'payrollgrid',
                        isEdit: c.isEdit                            
                    }]
                }, {
                    xtype: 'payrolltombol',
                    isEdit: c.isEdit
                }]
            }]
        });

        me.callParent(arguments);
    },
    
    show: function() {
        this.callParent();
        
        var me = this;
        if(me.isEdit!=undefined) {
            setTimeout(function() {
                var form = me.down('form');
                form.getForm().waitMsgTarget = me.getEl();
                form.getForm().load({
                    params: {id: me.isEdit},
                    url: 'api/store/payroll/dataLoad.php',
                    //waitMsg: 'Loading...',
                    success: function(f, a) {
                        var json = form.reader.jsonData;
                        
                        var divisi = me.down('#divisi');
                        divisi.getStore().add({id: json.results[0]['id_divisi'], kode: json.results[0]['kode_divisi'], nama: json.results[0]['nama_divisi'], display: json.results[0]['display_divisi']});
                        divisi.setValue(json.results[0]['id_divisi']);
                        
                        var proyek = me.down('#proyek');
                        if(json.results[0]['jenisanggaran']=='2') {
                            proyek.getStore().add({id: json.results[0]['id_proyek'], kode: json.results[0]['kode_proyek'], nama: json.results[0]['nama_proyek'], display: json.results[0]['display_proyek']});
                            proyek.setValue(json.results[0]['id_proyek']); 
                        }
                        
                        me.down('payrollgrid').loaddetail();
                        me.down('payrollheader').transaksiBaru();
                        me.down('payrolltombol').transaksiBaru();
                        me.down('payrollgrid').allow_edit = true;
                        
                        divisi.setReadOnly(json.tipe_user=='U');
                        
                        var tahun = me.down('#tahun');
                        var jenisanggaran = me.down('#jenisanggaran');
                        
                        tahun.setReadOnly(true);
                        divisi.setReadOnly(true);
                        //proyek.setDisabled(json.results[0]['jenisanggaran']=='1');
                        proyek.setReadOnly(true);
                        jenisanggaran.setReadOnly(true);
                        
                        proyek.setDisabled(json.results[0]['jenisanggaran']=='1');
                        
                        if(!json.allow) {
                            Ext.MessageBox.show({
                                title: 'Gagal',
                                msg: json.message,
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.ERROR
                            });
                            me.down('payrollheader').transaksiSave();
                            me.down('payrolltombol').suksesSimpan();
                            me.down('payrollgrid').allow_edit = false;
                        }
                    }
                });            
            }, 750);        
        }                
    }
});