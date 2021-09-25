<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Voucher extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Voucher();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');
		
		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(A.kode LIKE \'%'.$query.'%\' OR A.nama LIKE \'%'.$query.'%\')';
		}

		//CUSTOMER

		$builder = $model->db->table('voucher A');
		$builder->select('
			A.id, 
			A.kode,
			A.nama,
			A.id_area,
			B.nama area,
			A.pajak_jual,
			A.harga_jual
        ');
		$builder->join('area B', 'B.id=A.id_area', 'LEFT');
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('A.id', 'ASC');
		$builder->limit($limit, $start);
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL CUSTOMER
		$builder->select('COUNT(*) total'); 
		if($query!='') {
			$builder->where($query);
		}
		//$total = $builder->getCompiledSelect();
		$total = $builder->get()->getRowArray();
		$total = $total['total'];

		$response = [
            'data' => $data,
            'total' => $total
        ];
            
		return $this->respond($response, 200);
	}
	
	public function load($id) {
		$model = new \App\Models\Voucher();

		$builder = $model->select('
			id, 
			kode,
			nama,
			id_area,
			pajak_jual,
			harga_jual
		');
		$builder->where('id', $id);
		$data  =  $builder->get()->getRowArray();
		if($data) {
			$response = [
				'success' => true,
        		'data' => $data
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

	public function delete($id) {
		$model = new \App\Models\Voucher();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus Voucher berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus Voucher gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Voucher();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'id_area'		 => $this->request->getPost('id_area'),
			'pajak_jual'     => $this->request->getPost('pajak_jual'),
			'harga_jual'     => $this->request->getPost('harga_jual'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		
		//CHECK DUPLIKAT KODE CUSTOMER;
		$builder = $model->select('COUNT(*) TOTAL')->where('kode', $_DATA['kode']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Voucher sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA CUSTOMER
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Voucher berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Voucher();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'id_area'		 => $this->request->getPost('id_area'),
			'pajak_jual'     => $this->request->getPost('pajak_jual'),
			'harga_jual'     => $this->request->getPost('harga_jual'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE CUSTOMER;
		$builder = $model->select('COUNT(*) TOTAL')->where(['kode' => $_DATA['kode'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Voucher sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE CUSTOMER
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Voucher berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function pajakJual($id) {
		$model  = new \App\Models\Voucher();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'pajak_jual'  => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Pajak Jual Voucher berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Update Pajak Jual Voucher gagal.'
			];

			return $this->respond($response, 500);
		}
	}

}
