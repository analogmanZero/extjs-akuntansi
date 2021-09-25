Ext.define('Admin.model.karyawan.edit', {
    extend: 'Ext.data.Model',
    fields: [
        'nik', {name: 'is_approve_nik', type: 'boolean'}, 'status_pegawai', 'tmt', 'pangkat', 'jabatan', 'departemen', 'area', 'lokasi', 
        'no_identitas', 'no_kk', 'no_bpjs_kes', 'no_bpjs_tk', 'no_bpjs_jp', 'no_kta', 'masa_berlaku_kta', 'no_npwp', 'nama', 'jeniskelamin', 'tempatlahir', 'tanggallahir', 'usia', 'agama', 'statusperkawinan', 'jumlah_anak', 'pendidikan', 'bb', 'tb', 'gol_darah', 'bentuk_tubuh', 'warna_kulit', 'jenis_warna_rambut', 'bentuk_muka', 'warna_mata',
        'ktp_alamat1', 'ktp_alamat2', 'ktp_rt', 'ktp_rw', 'ktp_kota', 'ktp_kodepos',
        'alamat1', 'alamat2', 'rt', 'rw', 'kota', 'kodepos', 'telepon', 'nohp', 'email',
        'catatan'
     ]
});