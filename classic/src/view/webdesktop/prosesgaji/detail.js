Ext.define('Admin.view.webdesktop.prosesgaji.detail', {

    extend: 'Ext.grid.Panel',
    alias : 'widget.prosesgajidetail',

    layout: 'fit',
    
    constructor: function(c) {
        var me = this;
        me.func = new Admin.view.currency();
        
        var decimalRender = function(value, p, record) {
            return me.func.currency(value);
        };
        
        var summaryRendererJumlah = function(value, p, record) {
            return '<B>'+me.func.currency(value)+'</B>';
        };
        
        var renderNo = function(value, p, record) {
            return me.store.indexOf(record)+1;
        };
        
        me.store = Ext.create('Admin.store.stores', {
            fields: ['id', 'nik', 'nama', 'area', 'lokasi',
                {name: 'upah_tetap', type: 'float'}, 
                {name: 'upah_tidak_tetap', type: 'float'}, 
                {name: 'potongan', type: 'float'},
                {name: 'pendapatan', type: 'float'}
            ],
            url: 'api/store/prosesgaji/dataStore.php',
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    rootProperty: 'details'
                }
            },
            listeners: {
                load: function(e, records, successful, eOpts) {
                    /*if(successful) {
                        var json = this.getProxy().reader.jsonData;
                        setTimeout(function() {
                            if(json['totalCount']==0) {
                                var periode = me.down('#periode').getSubmitValue().split('-');
                                Ext.MessageBox.confirm('Proses Gaji', 'Gaji bulan '+periode[1]+'-'+periode[0]+' belum diproses. Ingin diproses?', function(btn,text) {
                                    if(btn=='yes') {
                                        me.prosesGaji(me.down('#periode').getSubmitValue());
                                    }
                                });
                            }
                        }, 500);
                    }*/
                }
            }
        });
        
        me.tbar = [{
            xtype: 'monthfield',
            name: 'periode',
            itemId: 'periode',
            fieldLabel: 'Gaji Bulan',
            labelStyle: 'text-align: center;',
            labelWidth: 100,
            format: 'm-Y',
            submitFormat: 'Y-m',
            width: 200,
            selectOnFocus: true,
            listeners: {
                scope: me,
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER) {
                        //me.down('#jenistransaksi').focus(true, 10);
                    }
                },
                change: function() {
                    //alert(me.down('#periode').getSubmitValue());
                    me.loadDataStore(me.down('#periode').getSubmitValue());
                }
            }
        }, '-', {
            xtype: 'button',
            itemId: 'proses',
            action :'proses',
            text : 'Proses [<B>F2</B>]',
            disabled: false
        },{
            xtype: 'button',
            itemId: 'cetak',
            action: 'cetak',
            text : 'Cetak [<B> C </B>]',
            disabled: false
        },{
            xtype: 'container',
            flex: 1
        }, Ext.create('Admin.view.webdesktop.searchField', {
            itemId: 'query',
            store: me.store,
            width: 350
        })];
    
    
        me.bbar = Ext.create('Ext.PagingToolbar', {
            store: me.store,
            displayInfo: true,
            displayMsg: 'Data {0} - {1} dari {2} data',
            emptyMsg: 'Tidak ada data untuk ditampilkan'
        });
        
        Ext.apply(c, {

            //plugins: me.rowEditor,
            features: [{
                ftype: 'summary',
                dock: 'bottom'
            }],
            columns: [
                //--- [0]
                {text: 'No.', width: 55, sortable: false, menuDisabled: true, locked: true, align: 'center', renderer: renderNo},
                
                //--- [1]
                {sortable: false, text: 'NIK', dataIndex: 'nik', width: 70, locked: true, menuDisabled: true},
                
                //--- [2]
                {sortable: false, text: 'Nama', dataIndex: 'nama', width: 210, locked: true, menuDisabled: true},
                
                //--- [3]
                {sortable: false, text: 'Area', dataIndex: 'area', width: 210, locked: true, menuDisabled: true},
                
                //--- [3]
                {sortable: false, text: 'Lokasi', dataIndex: 'lokasi', width: 210, locked: true, menuDisabled: true},
                
                //--- [4]
                {sortable: false, text: 'Upah Tetap', dataIndex: 'upah_tetap', align: 'right', width: 150, menuDisabled: true, renderer: decimalRender, summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'},
                
                //--- [5]
                {sortable: false, text: 'Upah T. Tetap', dataIndex: 'upah_tidak_tetap', align: 'right', width: 150, menuDisabled: true, renderer: decimalRender, summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'},
                
                //--- [6]
                {sortable: false, text: 'Potongan', dataIndex: 'potongan', align: 'right', width: 150, menuDisabled: true, renderer: decimalRender, summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'},
                
                //--- [6]
                {sortable: false, text: 'Total Gaji', dataIndex: 'pendapatan', align: 'right', width: 150, menuDisabled: true, renderer: decimalRender, summaryRenderer: summaryRendererJumlah,
                    summaryType: 'sum'}
            ]            
        });

        this.callParent(arguments);
    },
    
    loadDataStore: function(periode) {
        var me = this;
        
        var proxy = me.store.getProxy();
        proxy.extraParams['periode'] = periode;
        me.store.loadPage(1);
    },
    
    
    prosesGaji: function(periode) {
        var me = this;
        var win = me.up('window');
        
        var myMask = new Ext.LoadMask({target: win, msg:'Proses...'});
        myMask.show();
        
        Ext.Ajax.request({
            method:'POST',
            url: 'api/store/prosesgaji/proses.php',
            params: {
                periode: periode
            },
            success: function(response) {
                myMask.hide();

                var json = Ext.JSON.decode(response.responseText);
                if(json['success']) {
                    me.loadDataStore(periode);
                } else {
                    Ext.MessageBox.show({
                        title: 'Gagal',
                        msg: json['message'],
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            failure: function() {
                myMask.hide();

                Ext.MessageBox.show({
                    title: 'Kesalahan',
                    msg: 'Kesalahan sistem, ulangi lagi.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    }
    
});