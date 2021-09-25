<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Inventori extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Inventori();

		$page     = $this->request->getVar('page');
		$start    = $this->request->getVar('start');
		$limit    = $this->request->getVar('limit');
		
		$query    = $this->request->getVar('query');
		if($query!='') {
			$query = '(kode LIKE \'%'.$query.'%\' OR nama LIKE \'%'.$query.'%\' OR keterangan LIKE \'%'.$query.'%\')';
		}

		//Inventori
		$builder = $model->select('
			id, 
			kode,
			nama,
			unit satuan,
			pajak_jual,
			pajak_beli,
			harga_jual,
			harga_beli,
			keterangan
        ');
		if($query!='') {
			$builder->where($query);
		}
		$builder->orderBy('id', 'ASC');
		$builder->limit($limit, $start);
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL INVENTORI
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
		$model = new \App\Models\Inventori();

		$builder = $model->select('
			id, 
			kode,
			nama,
			unit,
			pajak_jual,
			pajak_beli,
			harga_jual,
			harga_beli,
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
		$model = new \App\Models\Inventori();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus Inventori berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus Inventori gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Inventori();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'unit'           => $this->request->getPost('unit'),
			'pajak_jual'     => $this->request->getPost('pajak_jual'),
			'pajak_beli'     => $this->request->getPost('pajak_beli'),
			'harga_jual'     => $this->request->getPost('harga_jual'),
			'harga_beli'     => $this->request->getPost('harga_beli'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE INVENTORI;
		$builder = $model->select('COUNT(*) TOTAL')->where('kode', $_DATA['kode']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Inventori sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA INVENTORI
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Inventori berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Inventori();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'unit'           => $this->request->getPost('unit'),
			'pajak_jual'     => $this->request->getPost('pajak_jual'),
			'pajak_beli'     => $this->request->getPost('pajak_beli'),
			'harga_jual'     => $this->request->getPost('harga_jual'),
			'harga_beli'     => $this->request->getPost('harga_beli'),
			'keterangan'     => $this->request->getPost('keterangan'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE INVENTORI;
		$builder = $model->select('COUNT(*) TOTAL')->where(['kode' => $_DATA['kode'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Inventori sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE INVENTORI
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Inventori berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function pajakJual($id) {
		$model  = new \App\Models\Inventori();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'pajak_jual'  => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Pajak Jual Inventori berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Update Pajak Jual Inventori gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function pajakBeli($id) {
		$model  = new \App\Models\Inventori();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'pajak_beli'  => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Pajak Beli Inventori berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Update Pajak Beli Inventori gagal.'
			];

			return $this->respond($response, 500);
		}
	}
}
