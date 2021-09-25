<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Pembelian extends BaseController
{
	use ResponseTrait;

	public function PenjualanListAll() {
		$model = new \App\Models\BeliFakturHead();

		$id_vendor = $this->request->getVar('id_vendor');
		
		$builder = $model->db->table('beli_faktur_head A');
		$builder->select('
			A.id, 
			A.notrx,
			DATE_FORMAT(A.tanggal, "%d-%m-%Y") tanggal,
			B.nama vendor,
			A.pembayaran,
			A.jenis_trx,
			A.total,
			A.keterangan,
			C.kode_akun,
			C.nama_akun
        ');
		$builder->join('vendor B', 'B.id=A.id_vendor', 'LEFT');
		$builder->join('rekening C', 'C.kode_akun=B.akun_piutang', 'LEFT');
		$builder->where(['id_vendor' => $id_vendor]);
		$builder->orderBy('A.tanggal', 'DESC');
		$builder->limit($limit, $start);
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		$total = count($data);
		
		$response = [
            'total' => $total,
            'data' => $data
        ];
            
		return $this->respond($response, 200);
	}

	public function PembelianList() {
		$model = new \App\Models\BeliFakturHead();

		$page      = $this->request->getVar('page');
		$start     = $this->request->getVar('start');
		$limit     = $this->request->getVar('limit');
		$query     = $this->request->getVar('query');
		$from      = $this->request->getVar('from');
		$to        = $this->request->getVar('to');

		$query = 'A.tanggal BETWEEN "'.$from.'" AND "'.$to.'" '.($query!=''?' AND (A.notrx LIKE "%'.$query.'%" OR B.nama LIKE "%'.$query.'%" OR A.no_po LIKE "%'.$query.'%" OR A.keterangan LIKE "%'.$query.'%")':'');
		$builder = $model->db->table('beli_faktur_head A');
		$builder->select('
			A.id, 
			A.notrx,
			DATE_FORMAT(A.tanggal, "%d-%m-%Y") tanggal,
			B.nama vendor,
			A.total,
			A.keterangan
        ');
		$builder->join('vendor B', 'B.id=A.id_vendor', 'LEFT');
		$builder->where($query);
		$builder->orderBy('A.tanggal', 'DESC');
		$builder->limit($limit, $start);
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL TANSAKSI
		$builder = $model->db->table('beli_faktur_head A');
		$builder->select('COUNT(*) total'); 
		$builder->join('vendor B', 'B.id=A.id_vendor', 'LEFT');
		$builder->where($query);
		//$total = $builder->getCompiledSelect();
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

		$response = [
            'data' => $data,
            'total' => $total
        ];
            
		return $this->respond($response, 200);
	}

	public function PembelianLoad($id) {
		$model = new \App\Models\BeliFakturHead();

		$builder = $model->select('
			id,
			notrx,
			DATE_FORMAT(tanggal, "%d-%m-%Y") tanggal,
			id_vendor,
			no_po,
			keterangan,
			subtotal,
			totalpajak,
			total
		');
		$builder->where('id', $id);
		$data = $builder->get()->getRowArray();
		if($data) {
			$mdl_detail = new \App\Models\BeliFakturDetail();
			$builder = $mdl_detail->where('id_head', $data['id'])->orderBy('id ASC');
			$detail = $builder->get()->getResultArray();

			$response = [
				'success' => true,
        		'data' => $data,
				'detail' => $detail
			];

			return $this->respond($response, 200);	
		} else {
			$response = [
				'success' => false,
        		'message' => 'Data tidak ditemukan.'
			];

			return $this->respond($response, 500);
		}
    }

	public function PembelianDelete($id) {
		$model = new \App\Models\BeliFakturHead();

		$id_jurnal = [];
		$data = $model->whereIn('id', explode(',', $id))->get()->getResultArray();
		foreach($data as $_DATA) {
			array_push($id_jurnal, $_DATA['id_jurnal']);
		}
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$mdl_detail = new \App\Models\BeliFakturDetail();
			$mdl_detail->whereIn('id_head', explode(',', $id))->delete();
		
			$response = [
				'success' => true,
				'message' => 'Hapus Pembelian berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Hapus Pembelian gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function PembelianInsert() {
		$model = new \App\Models\BeliFakturHead();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'notrx'          => $this->request->getPost('notrx'),
			'tanggal'        => $this->request->getPost('tanggal'),
			'id_vendor'      => $this->request->getPost('id_vendor'),
			'no_po'		     => $this->request->getPost('no_po'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'subtotal'       => $this->request->getPost('subtotal'),
			'totalpajak'     => $this->request->getPost('totalpajak'),
			'voucher'        => 0,
			'total'          => $this->request->getPost('total'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		
		//CHECK DUPLIKAT NO TRX;
		$builder = $model->select('COUNT(*) TOTAL')->where('notrx', $_DATA['notrx']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'No. Trx sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA TRANSAKSI
		$insert = $model->insert($_DATA);
		if($insert) {
			$mdl_detail = new \App\Models\BeliFakturDetail();
			$detail = $this->request->getPost('detail');
			$rows = explode(';', $detail);
			foreach($rows as $value) {
				$cols = explode(',', $value);
				$_DATA = [
					'id_head'      => $insert,
					'id_barang'    => $cols[0], 
					'nama_barang'  => $cols[1],
					'qty'          => $cols[2], 
					'satuan'       => $cols[3],
					'harga'        => $cols[4],
					'diskon'       => $cols[5], 
					'pajak'        => $cols[6],
					'jumlah'       => $cols[7]
				];

				$mdl_detail->insert($_DATA);
			}

			$response = [
				'success' => true,
				'message' => 'Tambah Pembelian berhasil.'
			];
			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Tambah Pembelian gagal.'
			];

			return $this->respond($response, 500);	
		}
		
	}

	public function PembelianUpdate($id) {
		$model = new \App\Models\BeliFakturHead();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'notrx'          => $this->request->getPost('notrx'),
			'tanggal'        => $this->request->getPost('tanggal'),
			'id_vendor'      => $this->request->getPost('id_vendor'),
			'no_po'		     => $this->request->getPost('no_po'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'subtotal'       => $this->request->getPost('subtotal'),
			'totalpajak'     => $this->request->getPost('totalpajak'),
			'voucher'        => 0,
			'total'          => $this->request->getPost('total'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT NO TRX;
		$builder = $model->select('COUNT(*) TOTAL')->where(['notrx' => $_DATA['notrx'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'No. Trx sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE DATA TRANSAKSI
		$update = $model->where(['id' => $id])->set($_DATA)->update();
		if($update) {
			$mdl_detail = new \App\Models\BeliFakturDetail();
			$mdl_detail->where('id_head', $id)->delete();
			$detail = $this->request->getPost('detail');
			$rows = explode(';', $detail);
			foreach($rows as $value) {
				$cols = explode(',', $value);
				$_DATA = [
					'id_head'      => $id,
					'id_barang'    => $cols[0], 
					'nama_barang'  => $cols[1],
					'qty'          => $cols[2], 
					'satuan'       => $cols[3],
					'harga'        => $cols[4],
					'diskon'       => $cols[5], 
					'pajak'        => $cols[6],
					'jumlah'       => $cols[7]
				];

				$mdl_detail->insert($_DATA);
			}

			$response = [
				'success' => true,
				'message' => 'Edit Pembelian berhasil.'
			];
			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Edit Pembelian gagal.'
			];

			return $this->respond($response, 500);	
		}
	}

}
