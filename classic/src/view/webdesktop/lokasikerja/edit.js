Ext.define('Admin.view.webdesktop.lokasikerja.edit', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.lokasikerjaedit',

    layout: 'fit',
  
    width: 410,
    height: 235,
    border: false,
    disabledMaximize: true,

    constructor: function(c) {
        var me = this;
        
        var storeAreaOperasi = Ext.create('Admin.store.stores', {
            fields: ['id', 'kode', 'nama', 'display'],
            url: 'api/store/areaoperasiStore.php'
        });
        
        me.items = [{
            xtype: 'form',
            reader: new Ext.data.JsonReader({
                model: 'Admin.model.lokasikerja.edit',
                rootProperty: 'results',
                totalProperty: 'total'
            }),

            bodyPadding: 10,
            layout: 'anchor',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100,
                anchor: '100%'
            },
            items: [{
                xtype: 'textfield',
                name: 'nama_lokasi',
                allowBlank: false,
                fieldLabel: 'Nama Lokasi'
            }, {
                xtype: 'combobox',
                store: storeAreaOperasi,
                name: 'id_area',
                fieldLabel: 'Area Operasi',
                valueField: 'id',
                displayField: 'nama',
                typeAhead: true,
                queryMode: 'remote',
                queryDelay: 100,
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
                } 
            }]                    
        }];
            
        me.buttons = [{
            text: 'Simpan',
            action: 'save'
        }, {
            text: 'Batal',
            scope: this,
            handler: this.close
        }];
    
        me.callParent(arguments);
    },
    
    afterRender: function() {
        this.callParent();
        
        var me = this;
        if(this.isEdit) {
            var form = me.down('form');
            form.getForm().waitMsgTarget = me.getEl();
            form.getForm().load({
                params: {id: me.isEdit},
                url: 'api/store/lokasikerja/dataLoad.php',
                //waitMsg: 'Loading...',
                success: function(f, a) {
                    var json = form.reader.jsonData;
                    var area_operasi = me.down('[name=id_area]');
                    
                    area_operasi.getStore().add({id: json.results['id_area'], kode: json.results['kode_area'], nama: json.results['nama_area'], display: json.results['display_area']});
                    area_operasi.setValue(json.results['id_area']);
                    
                    setTimeout(function() {
                        me.down('textfield[name=nama_lokasi]').focus(true, 10);
                    }, 500);
                }                
            });
        } else {
            setTimeout(function() {
                me.down('textfield[name=nama_lokasi]').focus(true, 10);
            }, 500);
        }
    }
});