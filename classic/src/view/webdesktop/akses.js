Ext.define('Admin.view.webdesktop.akses', {

    cekMenu: function(store, win) {
    	  var index = store.indexOf(store.findRecord('idmodul', win.modulId));
    	  // alert(win.modulId) ;
          var akses = store.getAt(index).data['akses'];
        win.down('#baruButton').setVisible(akses[0]=='Y');
        win.down('#editButton').setVisible(akses[1]=='Y');
        win.down('#removeButton').setVisible(akses[2]=='Y');
    },

    cekAksesUtama: function(store, grupId, itemId, aksi) {
    	
    	   for(var i=0; i<store.getCount(); i++) {
              // console.log(store.getAt(i).data['akses'][aksi]+' DAN '+itemId+' DAN '+store.getAt(i).data['idmodul']+' AKSI'+aksi);
            if(grupId && grupId==store.getAt(i).data['idgrup']) return true;
            
            if(itemId && itemId==store.getAt(i).data['idmodul'])
                return (aksi!=undefined)?store.getAt(i).data['akses'][aksi]=='Y':true;
                //  return false ;  
        }
       
        return false;
    },

    getAllChildenIds: function(panel, aksesStore) {

        /*Get all child items. */
        var children = this.getAllChilden(panel);

        /*Replace items with their ids.*/
        for (var i=0; i<children.length; i++) {
            //if(children[i].grupId)
            if(children[i] && children[i].grupId)
                children[i].setVisible(this.cekAksesUtama(aksesStore, children[i].grupId, null));

            //if(children[i].itemId)
             if(children[i] && children[i].itemId)
                children[i].setVisible(this.cekAksesUtama(aksesStore, null, children[i].itemId, children[i].aksi));
        }



    },

    getAllChilden: function(panel) {

        var me = this;
        /*Get children of passed panel or an empty array if it doesn't have thems.*/
        var children = panel.items ? panel.items.items : [];
        /*For each child get their children and concatenate to result.*/
        Ext.each(children, function (child) {
            children = children.concat(me.getAllChilden(child));
        })
        return children;
    }
});