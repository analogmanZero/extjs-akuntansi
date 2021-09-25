Ext.define('Admin.model.aktiva.aktivatetap.edit', {
    extend: 'Ext.data.Model',
    fields: ['id','tglbeli', 'tglpakai', 'idbarang', 'nama', 'kategori', 'nilaiawal',
             'residu', 'umur', 'metode', 'biayaaset', 'nilaidepresiasi', 'nilaiterkini',
             'akunaset', 'akundepresiasi','akunbeban',
             'tgldisposal','akunrugilaba','aktifdisposal']
});