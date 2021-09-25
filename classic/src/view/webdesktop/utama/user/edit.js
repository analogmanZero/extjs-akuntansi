Ext.define('Admin.view.webdesktop.utama.user.edit', {
    
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    layout: 'fit',
  
    width: 420,
    height: 545,
    border: false,
    disabledMaximize: true,

    constructor: function(c) {
        var me = this;

        Ext.apply(Ext.form.field.VTypes, {
            password: function(val, field) {
                if (field.initialPassField) {
                    var pwd = field.up('form').down('#' + field.initialPassField);
                    return (val == pwd.getValue());
                }
                return true;
            },

            passwordText: 'Passwords tidak sama.'
        });
        
        me.items = [{
            xtype: 'form',
            reader: new Ext.data.JsonReader({
                model: 'Admin.model.user.edit',
                rootProperty: 'results',
                totalProperty: 'total'
            }),
            bodyPadding: 10,
            layout: 'anchor',
            defaults: {
                msgTarget: 'side',
                labelWidth: 150,
                anchor: '100%'
            },            
            items:[{
                xtype: 'textfield',
                maskRe: /([a-zA-Z0-9.-]+)$/,
                allowBlank: false,
                name: 'userid',
                fieldLabel: 'ID Pengguna',
                minLength: 5,
                maxLength: 25,
                readOnly: c.isEdit
            }, {
                xtype: 'textfield',
                maskRe: /([a-zA-Z0-9\s.\-]+)$/ ,
                allowBlank: false,
                maxLength: 150,
                name: 'namauser',
                fieldLabel: 'Nama Pengguna'
            }, {
                xtype: 'combobox',
                fieldLabel: 'Divisi',
                name: 'divisi',
                itemId: 'divisi',
                store:  Ext.create('Admin.store.stores', {
                    fields: ['id', 'kode', 'nama', 'display'],
                    url: 'api/store/divisiStore.php'
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
            }, {
                xtype: 'checkbox',
                name: 'password',
                boxLabel: 'Ganti Password',
                hidden: !c.isEdit,
                listeners: {
                    change: function(d) {
                        var win = d.up('window');
                        win.down('textfield[name=pass]').setDisabled(!d.getValue());
                        win.down('textfield[name=pass-cfrm]').setDisabled(!d.getValue());
                    }
                }
            }, {
                xtype: 'textfield',
                disabled: c.isEdit,
                allowBlank: false,
                inputType: 'password',
                fieldLabel: 'Password',
                name: 'pass',
                itemId: 'pass'
            }, {
                xtype: 'textfield',
                disabled: c.isEdit,
                inputType: 'password',
                fieldLabel: 'Konfirmasi Password',
                name: 'pass-cfrm',
                vtype: 'password',
                initialPassField: 'pass',
                allowBlank: false
            }, {
                xtype: 'displayfield'
            }, Ext.create('Ext.tree.Panel', {
                
                    height: 200,
                    itemId: 'tree',
                    title: 'Menu Akses',
                    useArrows: true,
                    rootVisible: false,
                    store: Ext.create('Ext.data.TreeStore', {
                       model: 'Admin.model.user.list',
                       proxy: {
                          type: 'ajax',
                          url: 'api/store/user/modulStore.php',
                          extraParams: {iduser: c.isEdit},
                          actionMethods: {
                             read: 'POST'
                          }
                       }
                    }),
                    hideHeaders: true,
                    columns: [
                        {xtype: 'treecolumn', flex: 1, dataIndex: 'keterangan'}
                    ],
                    listeners: {
                        checkchange: function(node, check) {
                            for(var i=0; i<node.childNodes.length; i++) {
                                node.childNodes[i].set('checked', check);
                                this.fireEvent('checkchange', node.childNodes[i], check);
                            }

                            if(!check && node.childNodes.length==0) {
                                for(i=0; i<node.parentNode.childNodes.length; i++)
                                    if(node.parentNode.childNodes[i].data['checked']) return;

                                node.parentNode.set('checked', check);
                            }                       
                            if(check && node.childNodes.length==0) node.parentNode.set('checked', check);
                        }
                    }
                })]            
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
    
    getData: function(akses) {
        var str = '',
            getAkses = false;

        for(var i=0; i<akses.length; i++) {
            if(!getAkses) getAkses = (akses[i] && akses[i]=='Y');
            str += akses[i]?akses[i]:'N';
        }

        return getAkses?str:'';
    },

    getDetail: function() {
        
        var tree = this.down('#tree'),
            root = tree.getRootNode(),
            str = this.loopData(root, '');
                    
        //console.log(str);
        return str;
    },
    
    loopData: function(parent, str) {
       for(var i=0; i<parent.childNodes.length; i++) {
          var rec_0 = parent.childNodes[i];
          
          if(rec_0.childNodes.length>0 && rec_0.childNodes[0].childNodes.length>0) {
             str = this.loopData(rec_0, str);
          } else {
             var akses = new Array();
             for(var j=0; j<rec_0.childNodes.length; j++) {
                var rec_1 = rec_0.childNodes[j];            
                akses[eval(rec_1.data['idmodul'])] = rec_1.data['checked']?'Y':'N';
             }
             var getData = this.getData(akses);
             if(getData.length) str += (str!=''?'\n':'') + rec_0.data['idmodul'] + '\t' + getData;
          }         
       }
       
       return str;
    },
    
    afterRender: function() {
        this.callParent();
        
        var me = this;
        if(this.isEdit) {
            var form = me.down('form');
            form.getForm().waitMsgTarget = me.getEl();
            form.getForm().load({
                params: {id: me.isEdit},
                url: 'api/store/user/dataLoad.php',
                //waitMsg: 'Loading...',
                success: function(f, a) {
                    var json = form.reader.jsonData;                    
                    var divisi = me.down('#divisi');
                    divisi.getStore().add({id: json.results[0]['id_divisi'], kode: json.results[0]['kode_divisi'], nama: json.results[0]['nama_divisi'], display:json.results[0]['kode_divisi']+ ' - '+json.results[0]['nama_divisi']});
                    divisi.setValue(json.results[0]['id_divisi']);
                }                
            });
        }
    }
    
});