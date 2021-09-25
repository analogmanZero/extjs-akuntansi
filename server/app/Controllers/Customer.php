<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Customer extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Customer();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');
		
		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(A.kode LIKE \'%'.$query.'%\' OR A.nama LIKE \'%'.$query.'%\' OR A.no_hp LIKE \'%'.$query.'%\')';
		}

		//CUSTOMER

		$builder = $model->db->table('customer A');
		$builder->select('
			A.id, 
			A.kode,
			A.nama,
			A.no_hp,
			A.id_area,
			B.nama area,
			A.akun_piutang,
			A.keterangan
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
		$model = new \App\Models\Customer();

		$builder = $model->select('
			id, 
			kode,
			nama,
			no_hp,
			id_area,
			akun_piutang,
			keterangan
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
		$model = new \App\Models\Customer();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus Customer berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus Customer gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Customer();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'no_hp'          => $this->request->getPost('no_hp'),
			'id_area'		 => $this->request->getPost('id_area'),
			'akun_piutang'   => $this->request->getPost('akun_piutang'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		
		//CHECK DUPLIKAT KODE CUSTOMER;
		$builder = $model->select('COUNT(*) TOTAL')->where('kode', $_DATA['kode']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Customer sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA CUSTOMER
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Customer berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Customer();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'no_hp'          => $this->request->getPost('no_hp'),
			'id_area'		 => $this->request->getPost('id_area'),
			'akun_piutang'   => $this->request->getPost('akun_piutang'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE CUSTOMER;
		$builder = $model->select('COUNT(*) TOTAL')->where(['kode' => $_DATA['kode'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Customer sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE CUSTOMER
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Customer berhasil.'
		];
		return $this->respond($response, 200);
	}

}
