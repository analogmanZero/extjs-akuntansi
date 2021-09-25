<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Vendor extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Vendor();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');
		
		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(kode LIKE \'%'.$query.'%\' OR nama LIKE \'%'.$query.'%\' OR no_hp LIKE \'%'.$query.'%\')';
		}

		//VENDOR
		$builder = $model->select('
			id, 
			kode,
			nama,
			no_hp,
			akun_hutang,
			keterangan
        ');
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('id', 'ASC');
		$builder->limit($limit, $start);
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL VENDOR
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
		$model = new \App\Models\Vendor();

		$builder = $model->select('
			id, 
			kode,
			nama,
			no_hp,
			akun_hutang,
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
		$model = new \App\Models\Vendor();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus Vendor berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus Vendor gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Vendor();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'no_hp'          => $this->request->getPost('no_hp'),
			'akun_hutang'   => $this->request->getPost('akun_hutang'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE VENDOR;
		$builder = $model->select('COUNT(*) TOTAL')->where('kode', $_DATA['kode']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Vendor sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA VENDOR
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Vendor berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Vendor();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'no_hp'          => $this->request->getPost('no_hp'),
			'akun_hutang'   => $this->request->getPost('akun_hutang'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE VENDOR;
		$builder = $model->select('COUNT(*) TOTAL')->where(['kode' => $_DATA['kode'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Vendor sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE VENDOR
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Vendor berhasil.'
		];
		return $this->respond($response, 200);
	}

}
