Ext.define('Admin.view.webdesktop.payroll.header', {

    extend: 'Ext.panel.Panel',
    alias : 'widget.payrollheader',

    layout: 'fit',
    border : false,
    bodyPadding: 5,
    
    constructor: function(c) {
        var me = this;

        Ext.apply(c, {
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                bodyPadding: 5,
                items: [{
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 120,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            flex: 1,
                            labelWidth: 120,
                            name: 'tahun',
                            itemId:'tahun',
                            fieldLabel: 'Tahun Anggaran',
                            msgTarget: 'side',
                            allowBlank: true,
                            readOnly: true,
                            selectOnFocus: true,
                            listeners: {
                                scope: me,
                                specialkey: function(field, e){
                                    if (e.getKey() == e.ENTER) {
                                        me.down('#jenisanggaran').focus(true, 10);
                                    }
                                }
                            }
                        }, {
                            xtype: 'container',
                            width: 10
                        }, {
                            xtype: 'container',
                            flex: 1
                        }]
                    }, {
                        xtype: 'combobox',
                        readOnly: true,
                        name: 'jenisanggaran',
                        itemId: 'jenisanggaran',
                        fieldLabel: 'Anggaran Biaya',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['id', 'nama'],
                            data:[
                                {id: '1', nama: 'Head Office (HO)'},
                                {id: '2', nama: 'Proyek'}
                            ]
                        }),
                        valueField: 'id',
                        displayField: 'nama',
                        listeners: {
                            scope: me,
                            select: function(c) {
                                var value = c.getSubmitValue();
                                var proyek = me.down('#proyek');
                                proyek.setDisabled(value=="1");
                                
                                var payrollgrid = me.up('window').down('payrollgrid'); 
                                payrollgrid.loaddetail();
                            },
                            specialkey: function(c, e) {
                                if (e.getKey() == e.ENTER) {
                                    me.down('#divisi').focus(true, 10);
                                }
                            }
                        }
                    }]
                },{
                    xtype: 'container',
                    width: 10
                }, {
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    layout: 'anchor',
                    defaults: {
                        msgTarget: 'side',
                        labelWidth: 90,
                        allowBlank: false,
                        anchor: '100%'
                    },
                    bodyPadding: 10,
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: 'Divisi',
                        name: 'divisi',
                        itemId: 'divisi',
                        readOnly: true,
                        msgTarget: 'side',
                        store:  Ext.create('Admin.store.stores', {
                            fields: ['id', 'kode', 'nama', 'display'],
                            url: 'api/store/divisiStore.php'
                        }),
                        valueField: 'id',
                        displayField: 'nama',
                        typeAhead: true,
                        queryMode: 'remote',
                        queryDelay: 0,
                        minChars:0,
                        matchFieldWidth : false,
                        autoSelect: false,
                        selectOnFocus: true,
                        listConfig: {
                            loadingText: 'Loading...',
                            //set tinggi dan lebar isi list
                            width : '40%',
                            height : '110%',
                            resizable : true,
                            emptyText: 'Data tidak ditemukan.',
                            getInnerTpl: function() {
                                return '{display}';
                            }
                        },            
                        listeners: {
                            scope: me,
                            select: function(c) {
                                var payrollgrid = me.up('window').down('payrollgrid'); 
                                payrollgrid.loaddetail();
                            },
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    var value = me.down('#jenisanggaran').getSubmitValue();
                                    
                                    if(value=="2") {  
                                        me.down('#proyek').focus(true, 10);
                                    } else {
                                        
                                    }                                    
                                }
                            }
                        }
                    }, {
                        xtype: 'combobox',
                        fieldLabel: 'Proyek',
                        name: 'proyek',
                        itemId: 'proyek',
                        readOnly: true,
                        msgTarget: 'side',
                        store:  Ext.create('Admin.store.stores', {
                            fields: ['id', 'kode', 'nama', 'display'],
                            url: 'api/store/proyekStore.php'
                        }),
                        valueField: 'id',
                        displayField: 'nama',
                        typeAhead: true,
                        queryMode: 'remote',
                        queryDelay: 100,
                        minChars:0,
                        matchFieldWidth : false,
                        autoSelect: false,
                        selectOnFocus: true,
                        allowBlank: true,
                        listConfig: {
                            loadingText: 'Loading...',
                            //set tinggi dan lebar isi list
                            width : '40%',
                            height : '110%',
                            resizable : true,
                            emptyText: 'Data tidak ditemukan.',
                            getInnerTpl: function() {
                                return '{display}';
                            }
                        },            
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    //me.down('#jumlah').focus(true, 10);
                                }
                            }
                        }
                    }]
                }]
            }]    
        });

        me.callParent(arguments);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {
        
        this.down('#tahun').setReadOnly(act);
        this.down('#jenisanggaran').setReadOnly(act);
        this.down('#divisi').setReadOnly(act);
        this.down('#proyek').setReadOnly(act);
        
        if(act || this.isEdit) {
        } else {
            var me = this;
            Ext.Ajax.request({
                method:'POST',
                url: 'api/store/payroll/getTahunAnggaran.php',
                
                success: function(response) {
                    var json = Ext.JSON.decode(response.responseText);
                    me.down('[name=tahun]').setValue(me.up('payrolledit').tahun);
                    
                    //divisi
                    var divisi = me.down('#divisi');
                    if(json.divisi.length>0) {
                        var data_divisi = json.divisi[0];
                        divisi.getStore().add({id: data_divisi['id'], kode: data_divisi['kode'], nama: data_divisi['nama'], display: data_divisi['display']});
                        divisi.setValue(data_divisi['id']);
                    }
                    divisi.setReadOnly(json.tipe_user=='U');
                    me.down('#jenisanggaran').setValue("1");
                    
                    var payrollgrid = me.up('window').down('payrollgrid'); 
                    payrollgrid.loaddetail();
        
                    me.down('#proyek').setDisabled(true);
                    me.down('[name=tahun]').setReadOnly(true);
                    me.down('[name=jenisanggaran]').focus(true, 10);
                },
                failure: function() {
                    me.down('[name=tahun]').focus(true, 10);
                }
            });
        }

        this.down('#tahun').focus(true, 10);
    },

    partnerChange: function(store, index) {
        return;
    },

    sodetailgridDataChaged: function(store) {
        return;
    }
});