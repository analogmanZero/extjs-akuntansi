Ext.define('Admin.view.webdesktop.menu.viewIconMenu_gerak', {
    extend: 'Ext.view.View',
    alias : 'widget.viewIconMenu_gerak',
    
    constructor: function(config) {
        var me = this;
	var store = Ext.data.StoreManager.lookup(config.store);
       
        var drag_record;
        var initializePatientDragZone = function(v) {
            Ext.getBody().on("contextmenu", Ext.emptyFn,
                null, {preventDefault: true});

            v.dragZone = Ext.create('Ext.dd.DragZone', v.getEl(), {
                onInitDrag : function(x, y) {
                    return true;
                },

                    
                getDragData: function(e) {
                    var sourceEl = e.getTarget(v.itemSelector, 10), d;
                    if (sourceEl) {
                        drag_record = v.getRecord(sourceEl);
                        d = sourceEl.cloneNode(true);
                        d.id = Ext.id();
                        return v.dragData = {
                            sourceEl: sourceEl,
                            repairXY: Ext.fly(sourceEl).getXY(),
                            ddel: d,
                            patientData: v.getRecord(sourceEl).data
                        };
                    }
                },

                getRepairXY: function() {
                    return this.dragData.repairXY;
                }
            });

             v.dropZone = Ext.create('Ext.dd.DropZone', v.el, {


                 getTargetFromEvent: function(e) {

                  
                    var temp = {
                    		// x: e.getX(),
                        // y: e.getY()

                        x: e.getX()-27-me.getPosition()[0],
                        y: e.getY()-40-me.getPosition()[1]
                    };
                    
                    return temp;

                },

                // On entry into a target node, highlight that node.
                onNodeEnter : function(target, dd, e, data){
                //    Ext.fly(target).addCls('my-row-highlight-class');
                },

                // On exit from a target node, unhighlight that node.
                onNodeOut : function(target, dd, e, data){
                //    Ext.fly(target).removeCls('my-row-highlight-class');
                },

                onNodeOver : function(target, dd, e, data){
                     //alert('shortcut-' + drag_record.data['id']);{id}-shortcut
                    var foo = document.getElementById(drag_record.data['id'] + '-shortcut_icon');
                    foo.style.left = target.x + 'px';
                    foo.style.top = target.y + 'px';                    
                    return Ext.dd.DropZone.prototype.dropAllowed;
                },

                onNodeDrop : function(target, dd, e, data) {

                    //alert('shortcut-' + drag_record.data['id']);{id}-shortcut
                    var foo = document.getElementById(drag_record.data['id'] + '-shortcut_icon');

                    foo.style.left = target.x + 'px';
                    foo.style.top = target.y + 'px';
                    drag_record.set('x', target.x);
                    drag_record.set('y', target.y);

                    return true;
                }
            });
        };

        Ext.apply(config, {
        	style: {
                        position: 'absolute'
                    },
                    x: 0, y: 0,
                    trackOver: true,

                    store: store,

                    tpl  : Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                                '<div style="position:absolute; top:{y}px; left:{x}px;" id="{id}-shortcut_icon">',
                                      '<div class={[values.css==""?"ux-desktop-shortcut-depan":"uxx-normalyy"]}>',
                                        '<img  src="{url}" /><br/>',
                                       // '<img width="48px" height="48px" src="{url}" /><br/>',
                                        '<span class="ux-desktop-shortcut-text-depan">{name}</span><br />',
                                      '</div>',
                                '</div>',
                            '</tpl>'
                    ),

							 
        
                    

                    itemSelector: 'div.ux-desktop-shortcut-depan',
                    overItemCls : 'x-view-over-depan',
                    multiSelect : true,
                    autoScroll  : true,
                     listeners: {
                        render: function(v) {
                        	initializePatientDragZone(v);
  
                                },
                        itemcontextmenu: function(view, rec, node, index, e) {
                            idSelect = rec.data['id'];
                            
                            e.stopEvent();
                            if(idSelect=='1UXNNNUYYYYYYY1UXY'){
                                this.menu_posResto.showAt(e.getXY());
                            }
                            if (idSelect=='1XYXYXYXYXYXYXYX1XY'){
                            	if (rec.data['hakAkses'].substr(0,1)!='Y')
                            		this.menu_jual.items.getAt(0).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(1,1)!='Y')
                            		this.menu_jual.items.getAt(2).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(6,1)!='Y')
                            		this.menu_jual.items.getAt(4).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(2,1)!='Y')
                            		this.menu_jual.items.getAt(6).setDisabled(true);	
                            	if (rec.data['hakAkses'].substr(3,1)!='Y')
                            		this.menu_jual.items.getAt(8).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(4,1)!='Y')
                            		this.menu_jual.items.getAt(10).setDisabled(true);
                                if (rec.data['hakAkses'].substr(7,1)!='Y')
                            		this.menu_jual.items.getAt(12).setDisabled(true);    
                            	this.menu_jual.showAt(e.getXY());
                            	
                            	
                            }
                             if (idSelect=='2YYYYYYYYYYYYY2XY'){
                             	if (rec.data['hakAkses'].substr(0,1)!='Y')
                            		this.menu_beli.items.getAt(0).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(1,1)!='Y')
                            		this.menu_beli.items.getAt(2).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(2,1)!='Y')
                            		this.menu_beli.items.getAt(4).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(3,1)!='Y')
                            		this.menu_beli.items.getAt(6).setDisabled(true);	
                            	if (rec.data['hakAkses'].substr(4,1)!='Y')
                            		this.menu_beli.items.getAt(8).setDisabled(true);
                            	if (rec.data['hakAkses'].substr(5,1)!='Y')
                            		this.menu_beli.items.getAt(10).setDisabled(true);	
                            	this.menu_beli.showAt(e.getXY());
                            	
                            	
                            }
                            if (idSelect=='33XXXXXX33X'){
                            	if (rec.data['hakAkses'].substr(0,1)!='Y')
                            		this.menu_inventori.items.getAt(0).setDisabled(true);// data inventori
                            	if (rec.data['hakAkses'].substr(1,1)!='Y')
                            		this.menu_inventori.items.getAt(2).setDisabled(true);// stok awal
                            	if (rec.data['hakAkses'].substr(6,1)!='Y')
                            		this.menu_inventori.items.getAt(4).setDisabled(true);//Kartu Stok	
                            	if (rec.data['hakAkses'].substr(8,1)!='Y')
                            		this.menu_inventori.items.getAt(6).setDisabled(true);//Stok Opname        
                            
                            	if (rec.data['hakAkses'].substr(2,1)!='Y')
                            		this.menu_inventori.items.getAt(8).setDisabled(true);//multi gudang
                            	
                            	if (rec.data['hakAkses'].substr(3,1)!='Y')
                            		this.menu_inventori.items.getAt(10).setDisabled(true);	//transfer barang
                            	if (rec.data['hakAkses'].substr(4,1)!='Y')
                            		this.menu_inventori.items.getAt(12).setDisabled(true); //BoM
                            	if (rec.data['hakAkses'].substr(5,1)!='Y')
                            		this.menu_inventori.items.getAt(14).setDisabled(true);//WO
                                if (rec.data['hakAkses'].substr(7,1)!='Y')
                            		this.menu_inventori.items.getAt(16).setDisabled(true);//RO    
                                 		
                            	this.menu_inventori.showAt(e.getXY());
                            	
                            	
                            }
                            if (idSelect=='55XYXYXYXYXYXYXYX55XY'){
                            	if (rec.data['hakAkses'].substr(0,1)!='Y')//I = Pendapatan Lain
                            		this.menu_jurnalRekon.items.getAt(0).setDisabled(true);// Pendapatan Lain
                            	if (rec.data['hakAkses'].substr(1,1)!='Y')//O = Pengeluaran Lain
                            		this.menu_jurnalRekon.items.getAt(2).setDisabled(true);// Pengeluaran Lain
                            	if (rec.data['hakAkses'].substr(2,1)!='Y')//VC = Jurnal Voucher
                            		this.menu_jurnalRekon.items.getAt(4).setDisabled(true);// Jurnal Transaksi
                            	if (rec.data['hakAkses'].substr(3,1)!='Y')//RK = Rutin Kurs
                            		this.menu_jurnalRekon.items.getAt(12).setDisabled(true);// Rutin Kurs
                            	if (rec.data['hakAkses'].substr(4,1)!='Y' && rec.data['hakAkses'].substr(7,1)!='Y')//BA ATAU BK = Buku Bank
                            		this.menu_jurnalRekon.items.getAt(8).setDisabled(true);// Buku Bank
                            	if (rec.data['hakAkses'].substr(5,1)!='Y')//RR = Rekonsiliasi Bank
                            		this.menu_jurnalRekon.items.getAt(10).setDisabled(true);// Jurnal Transaksi
                            	if (rec.data['hakAkses'].substr(6,1)!='Y')//TK = Transfer Kas/Bank
                            		this.menu_jurnalRekon.items.getAt(6).setDisabled(true);// Rutin Kurs
                            	
                            	
                            	this.menu_jurnalRekon.showAt(e.getXY());
                           }
                            if (idSelect=='66XYXYXXYXYXYXY66XY'){
                            		if (rec.data['hakAkses'].substr(0,1)!='Y')
                            			this.menu_aktivaTetap.items.getAt(0).setDisabled(true);// data inventori
                            		if (rec.data['hakAkses'].substr(1,1)!='Y')
                            			this.menu_aktivaTetap.items.getAt(2).setDisabled(true);// stok awal
                            	
                            		this.menu_aktivaTetap.showAt(e.getXY());
                            	
                            }
                            if (idSelect=='77XYYXYXXYXYYXYXY77XY'){
                            	if (rec.data['hakAkses'].substr(0,1)!='Y')
                            		this.menu_akuntansi.items.getAt(0).setDisabled(true);// Jurnal Transaksi
                            	if (rec.data['hakAkses'].substr(1,1)!='Y')
                            		this.menu_akuntansi.items.getAt(2).setDisabled(true);// Buku Besar
                            	if (rec.data['hakAkses'].substr(2,1)!='Y')
                            		this.menu_akuntansi.items.getAt(4).setDisabled(true);// Neraca Percobaan
                            	
                            	if (rec.data['hakAkses'].substr(3,1)!='Y')
                            		this.menu_akuntansi.items.getAt(6).setDisabled(true);// Laba/Rugi
                            	
                            	if (rec.data['hakAkses'].substr(4,1)!='Y')
                            		this.menu_akuntansi.items.getAt(8).setDisabled(true);	//Neraca
                            	this.menu_akuntansi.showAt(e.getXY());
                            	
                            	
                            }
                            
                            return false;
                        }
                    }
                    
                    //
                    
        });

        this.callParent(arguments);

    }
    

});