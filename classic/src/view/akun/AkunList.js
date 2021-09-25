Ext.define('Admin.view.akun.AkunList',{
    extend: 'Ext.panel.Panel',
    xtype: 'akun-list',

    cls: 'shadow',
    layout: 'fit',

    constructor: function(c) {
        var me = this;
        var fcurrency = new Admin.view.currency();

        var dataTreeStore = Ext.create('Ext.data.TreeStore', {
            model: 'Admin.model.akun.Akun',
            proxy: {
                type: 'ajax',
                url: './server/public/akun'
            },
            listeners: {
                beforeexpand: function (node, eOpts) {
                    this.getProxy().extraParams['id_parent'] = node.data['id'];
                },
                load: function( str, node, records, successful, eOpts ) {
                    if(successful) {
                        me.isBalance();
                    }
                }
            },
            
            autoLoad: true
        });
        
        var updateOrder = function(id_1, no_urut_1, id_2, no_urut_2) {
            Ext.Ajax.request({
                method:'POST',
                url: './server/public/akun/updateorder',
                params: {
                    id_1: id_1,
                    no_urut_1: no_urut_1,
                    id_2: id_2,
                    no_urut_2: no_urut_2
                }                
            });
        };
		
        
        Ext.apply(c, {
            items: [{
                xtype: 'treepanel',
                idSelect: 0,
                cls: 'akun-list',
                store: dataTreeStore,
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'button',
                        reference: 'addButton',
                        text:'Baru',
                        iconCls:'x-fa fa-plus',
                        handler: 'onAddButtonClick'
                    }, {
                        xtype: 'button',
                        reference: 'deleteButton',
                        text:'Hapus',
                        iconCls:'x-fa fa-trash-alt',
                        handler: 'onDeleteButtonClick',
                        disabled: true
                    }, {
                        xtype: 'button',
                        reference: 'editButton',
                        text:'Edit',
                        iconCls:'x-fa fa-pencil-alt',
                        handler: 'onEditButtonClick',
                        disabled: true
                    }, '-',
                    {
                        text: 'Reload',
                        iconCls: 'x-fa reload',
                        handler: function() {
                            me.down('treepanel').getStore().load({params: {id_parent: 0}});
                        }
                    }, /*'-', {
                        xtype: 'searchfield',
                        flex: 1,
                        store: dataTreeStore
                    },*/ '->', {
                        xtype: 'button',
                        itemId: 'saldoButton',
                        text: 'Update Saldo',
                        iconCls: 'x-fa saldoAwal',
                        handler: 'onUpdateSaldoAwal',
                        disabled: true
                    }]
                }, {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [/*{
                        text: 'Naik',
                        disabled: true,
                        iconCls: 'x-fa up',
                        itemId: 'up',
                        handler: function(b) {
                            var treepanel = me.down('treepanel'),
                                parent = me.curRecord.parentNode==null?treepanel.getRootNode():me.curRecord.parentNode,
                                index = parent.indexOf(me.curRecord),
                                curr = me.curRecord.copy(me.curRecord.data['id'], true);
        
                            parent.removeChild(me.curRecord);
                            parent.insertChild(index-1, curr);
                            treepanel.getSelectionModel().select(parent.childNodes[index-1]);
        
                            updateOrder(
                                parent.childNodes[index-1].data['id'], 
                                parent.childNodes[index-1].data['nomer_urut'], 
                                parent.childNodes[index].data['id'], 
                                parent.childNodes[index].data['nomer_urut']
                            );
                        }
                    }, {
                        text: 'Turun',
                        disabled: true,
                        iconCls: 'x-fa down',
                        itemId: 'down',
                        handler: function() {
                            var treepanel = me.down('treepanel'),
                                parent = me.curRecord.parentNode==null?treepanel.getRootNode():me.curRecord.parentNode,
                                index = parent.indexOf(me.curRecord),
                                curr = me.curRecord.copy(me.curRecord.data['id'], true);
        
                            parent.removeChild(me.curRecord);
                            parent.insertChild(index+1, curr);
                            treepanel.getSelectionModel().select(parent.childNodes[index+1]);
        
                            updateOrder(
                                parent.childNodes[index+1].data['id'], 
                                parent.childNodes[index+1].data['nomer_urut'], 
                                parent.childNodes[index].data['id'], 
                                parent.childNodes[index].data['nomer_urut']
                            );
                        }
                    },*/ '->', {
                        xtype: 'currencyfield',
                        value: 0,
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold; text-align: right;',
                        name: 'totaldebet',
                        itemId:'totaldebet',
                        fieldLabel: 'Total Debet:',
                        labelSeparator: '&nbsp;',
                        readOnly: true,
                        selectOnFocus: true
                    }, {
                        xtype: 'currencyfield',
                        value: 0,
                        fieldStyle: 'font-weight: bold; text-align: right;',
                        labelStyle: 'font-weight: bold; text-align: right;',
                        name: 'totalkredit',
                        itemId:'totalkredit',
                        fieldLabel: 'Total Kredit:',
                        labelSeparator: '&nbsp;',
                        readOnly: true,
                        selectOnFocus: true
                    }]
                }],
                selModel: {
                    selType: 'checkboxmodel',
                    checkOnly: true,
                    showHeaderCheckbox: true,
                    headerWidth: 50,
                    listeners: {
                        selectionchange: 'onSelectionChange'
                    }
                },

                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 1,
                    listeners: {
                        scope: me,
                        beforeEdit: function(f, e) {
                            //console.log(e.colIdx + "    "+e.record.get('level'));
                            if(e.colIdx==6 && (e.record.get('level')!=4 || e.record.get('tipe')=='R')) return false;
                            
                        },
                        edit: function(f, e) {
                            me.down('#saldoButton').setDisabled(false);
                            me.isBalance();
                        }
                    }
                }],
            
                columnLines: true,
                useArrows: true,
                rootVisible: false,
                animate : true,
                columns: [{
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',  
                    dataIndex: 'kode_akun',
                    text: 'No. Akun', 
                    flex: 0.4 
                },
                {
                    xtype: 'treecolumn', 
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',  
                    dataIndex: 'nama_akun',
                    text: 'Nama Akun', 
                    flex: 1.5
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'left',  
                    dataIndex: 'tipe',
                    text: 'Tipe', 
                    flex: 0.4
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    dataIndex: 'saldonormal', 
                    text: 'Sld. Normal', 
                    flex: 0.4
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'center',
                    dataIndex: 'level',
                    text: 'Level', 
                    flex: 0.3 
                },
                {
                    xtype: 'gridcolumn',
                    cls: 'content-column',
                    menuDisabled: true,
                    align: 'right', 
                    dataIndex: 'saldo_awal',
                    text: 'Saldo Awal', 
                    flex: 0.5, 
                    editor: {
                        xtype: 'currencyfield',
                        fieldStyle: 'text-align: right;'
                        }, 
                    renderer: function(value, p, record) {
                        return fcurrency.currency(value);
                    }
                }],
            
                viewConfig: {
                    getRowClass: function(record) {
                        return 'changed_colour_' + record.data['level'];
                    }
                }/*,
            
                listeners: {
                    selectionchange: function(view, records) {
                        me.curRecord = records[0];
                        if(me.curRecord) {
                            var treepanel = me.down('treepanel'),
                                parent = me.curRecord.parentNode==null?treepanel.getRootNode():me.curRecord.parentNode,
                                index = parent.indexOf(me.curRecord);

                            me.down('#up').setDisabled(!me.curRecord || index==0);
                            me.down('#down').setDisabled(!me.curRecord || index==parent.childNodes.length-1);
                        } else {
                            me.down('#up').setDisabled(true);
                            me.down('#down').setDisabled(true);
                        }

                    }
                }*/
            }]
        });

        this.callParent(arguments);
    },
	
    isBalance: function() {

        this.data = '';
        this.recordsEdit = [];

        var me = this,
            tree = me.down('treepanel'),
            parent = tree.getRootNode(),
            values = me.getDebetKredit(parent);

        me.down('#totalkredit').setValue(values['kredit']);
        me.down('#totaldebet').setValue(values['debet']);
        
        return values['debet']==values['kredit'];
    },
    
    getDebetKredit: function(node) {
        var debet = 0;
        var kredit = 0;
        var me = this;
        
        for(var i=0; i<node.childNodes.length; i++) {
            var rec = node.childNodes[i];
            var values = me.getDebetKredit(rec);

            if(rec.get('saldo_normal')!=rec.get('saldo_normal_asal') || rec.get('saldo_awal')!=rec.get('saldo_awal_asal')) {
                me.recordsEdit[me.recordsEdit.length]=rec;
                me.data+=(me.data.length>0?';':'')+rec.get('id')+','+rec.get('saldo_normal')+','+rec.get('saldo_awal');
            }

            debet+=values['debet']+(rec.get('saldo_normal')=='D'?rec.get('saldo_awal'):0);
            kredit+=values['kredit']+(rec.get('saldo_normal')=='K'?rec.get('saldo_awal'):0);
        }
                
        return {debet: debet, kredit: kredit};
        
        
    }
});
