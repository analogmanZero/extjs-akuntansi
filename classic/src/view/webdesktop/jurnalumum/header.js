Ext.define('Admin.view.webdesktop.jurnalumum.header', {
    
    extend: 'Ext.panel.Panel',
    alias : 'widget.jurnalumumheader',

    border: false,
    layout: 'fit',
    bodyPadding: 5,
    
    onExpand: false,
    constructor: function(c) {
        var me = this;
        
        var storeSumberDanaAlokasi = Ext.create('Admin.store.stores', {
            fields: ['id','kode_akun','nama_akun', 'display', 'level'],
            url: 'api/store/rekeningStore.php',
            pageSize: 1000000,
            autoLoad: true,
            params: {alokasi: 'Y'}
        });
        
        Ext.apply(Ext.form.field.VTypes, {
            
            sumberdana_head: function(val, field) {
                
                if(field.initialLoad) {
                    field.initialLoad = false;
                    return true;
                }
                
                var values = field.getValue();
                var index = storeSumberDanaAlokasi.indexOf(field.findRecord(field.valueField, values));
                return (index>-1 && eval(storeSumberDanaAlokasi.getAt(index).get('level'))==4);
            },
				                
            sumberdana_headText: 'Harus level empat.'
        });
        
        me.items = [{
            xtype: 'panel',
            layout: 'hbox',
            items:[{
                xtype: 'panel',
                layout: 'anchor',
                border: false,
                flex: 1.3,
                bodyPadding: 10,
                items: [{ 
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',                    
                        fieldLabel: 'No. Transaksi',
                        name: 'notrx',
                        itemId: 'notrx',
                        msgTarget: 'side',
                        labelWidth: 110,
                        flex: 1.2,
                        readOnly: true,
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#tanggal').focus(true, 10);
                                }
                            }
                        }
                    }, {
                        xtype: 'datefield',
                        fieldLabel: '&nbsp;&nbsp;Tanggal',
                        name: 'tanggal',
                        itemId: 'tanggal',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d',
                        msgTarget: 'side',
                        labelWidth: 55,
                        flex: 1,
                        readOnly: true,
                        listeners: {
                            scope: me,
                            specialkey: function(field, e){
                                if (e.getKey() == e.ENTER) {
                                    me.down('#jenis').focus(true, 10);
                                }
                            }
                        }
                    }]
                }, {
                    xtype: 'combobox',
                    name: 'jenis',
                    itemId: 'jenis',
                    fieldLabel: 'Debet/Kredit',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['id', 'nama'],
                        data:[
                            {id: 'D', nama: 'Debet'},
                            {id: 'K', nama: 'Kredit'}
                        ]
                    }),
                    valueField: 'nama',
                    displayField: 'nama',
                    listeners: {
                        scope: me,
                        select: function(c) {
                            var grid = me.up('jurnalumumedit').down('grid');
                            grid.columnManager.columns[1].setText(c.getValue()=='Debet'?'Kredit':'Debet');
                        },
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#kode_akun').focus(true, 10);
                            }
                        }
                    },
                    readOnly: true
            
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Kode Rekening',
                    name: 'kode_akun',
                    itemId: 'kode_akun',
                    readOnly: true,
                    store: storeSumberDanaAlokasi,
                    valueField: 'kode_akun',
                    displayField: 'nama_akun',
                    typeAhead: true,
                    queryMode: 'local',
                    queryDelay: 100,
                    minChars:0,
                    vtype: 'sumberdana_head',
                    //initialLoad: c.isEdit.length>0,
                    pageSize: 1000000,
                    matchFieldWidth : false,
                    autoSelect: false,
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
                                me.down('#jumlah').focus(true, 10);
                            }
                        }
                    }
                }, {
                    xtype: 'currencyfield',
                    name: 'jumlah',
                    itemId: 'jumlah',
                    fieldStyle: 'text-align: right',
                    fieldLabel: 'Jumlah',
                    readOnly: true,
                    listeners: {
                        scope: me,
                        specialkey: function(field, e){
                            if (e.getKey() == e.ENTER) {
                                me.down('#keterangan').focus(true, 10);
                            }
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                layout: 'anchor',
                border: false,
                flex: 1,
                bodyPadding: 10,
                items :[{
                    xtype: 'displayfield',
                    name: 'lblket',
                    readOnly: true,
                    fieldLabel: 'Keterangan'
                }, {
                    xtype: 'container',
                    height: 87,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [{
                    xtype: 'textareafield',
                        itemId:'keterangan',
                        name: 'keterangan',
                        readOnly: true,
                        flex: 1,
                        listeners: {
                            focus: function(t) {
                                setTimeout(function() {                                        
                                    t.selectText(t.getSubmitValue().length, t.getSubmitValue().length);
                                }, 100);
                            },
                            keydown: {
                                element: 'el',
                                fn: function (eventObject, htmlElement, object, options) {
                                    if (eventObject.keyCode == 9) {
                                        setTimeout(function(){
                                            var grid = me.up('window').down('jurnalumumgrid');
                                            if(grid.getStore().getCount()>0) {
                                                grid.rowEditor.startEdit(0, 1);
                                                grid.columns[1].getEditor(grid.recordSelected).focus(true, 10);
                                            } else {
                                                var tambah =  me.up('jurnalumumedit').down('#tambah');
                                                tambah.fireEvent('click', tambah);
                                            }
                                        }, 10);
                                    }
                                }
                            }
                        }
                    }, {
                        xtype: 'container',
                        height: 2
                    }]
                }]
            }]
        }];

        this.callParent(arguments);
    },  

    transaksiEdit: function() {
        this.transaksiBaru(false);
    },

    transaksiSave: function() {
        this.transaksiBaru(true);
    },

    transaksiBaru: function(act) {
        var me = this;
        
        //this.down('textfield[name=notrx]').setReadOnly(act);
        this.down('datefield[name=tanggal]').setReadOnly(act);
        this.down('[name=jenis]').setReadOnly(act);
        this.down('[name=kode_akun]').setReadOnly(act);
        this.down('[name=jumlah]').setReadOnly(act);		
        this.down('displayfield[name=lblket]').setReadOnly(act);
        this.down('#keterangan').setReadOnly(act);

        if(act || this.isEdit) return;
        
        var time=new Date();
        var tanggal = ((String(time.getDate()).length==1?'0':'') + time.getDate()) + '-' +
           ((String(time.getMonth()+1).length==1?'0':'') + (time.getMonth()+1)) + '-' +
           time.getFullYear();
               
        this.down('datefield[name=tanggal]').setValue(tanggal);
        Ext.Ajax.request({
            method:'POST',
            url: 'api/store/jurnalumum/getLastNobukti.php',
            success: function(response) {
                var json = Ext.JSON.decode(response.responseText);
                me.down('[name=notrx]').setValue(json.nobukti);
                me.down('[name=notrx]').focus(true, 10);
            },
            failure: function() {
                me.down('[name=notrx]').focus(true, 10);
            }
        });
    }
});