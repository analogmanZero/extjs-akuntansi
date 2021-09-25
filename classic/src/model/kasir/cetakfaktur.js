Ext.define('Admin.model.kasir.cetakfaktur', {
    extend: 'Ext.data.Model',
    fields: [
       {name: 'subtotal', type: 'bool'},
       {name: 'pajak', type: 'bool'},
       {name: 'diskon', type: 'bool'},
       {name: 'voucher', type: 'bool'},
       {name: 'total', type: 'bool'},
       {name: 'debet', type: 'bool'},
       {name: 'bayar', type: 'bool'},
       {name: 'kembali', type: 'bool'},
       'keterangan']
});