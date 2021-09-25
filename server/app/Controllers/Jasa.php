<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Jasa extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Jasa();

		$page  = $this->request->getVar('page');
		$start = $this->request->getVar('start');
		$limit = $this->request->getVar('limit');
		$query = $this->request->getVar('query');
		$query = ($query!=''?'(kode LIKE \'%'.$query.'%\' OR nama LIKE \'%'.$query.'%\' OR keterangan LIKE \'%'.$query.'%\')':'1=1');
		
		//JASA
		$builder = $model->select('
			id, 
			kode,
			nama,
			keterangan,
			pajak_jual,
			harga_jual
        ');
		$builder->where($query);		
		$builder->orderBy('id', 'ASC');
		$builder->limit($limit, $start);
		//$data = $builder->getCompiledSelect();
		$data = $builder->get()->getResultArray();
		
		//TOTAL JASA
		$builder->select('COUNT(*) total'); 
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
	
	public function load($id) {
		$model = new \App\Models\Jasa();

		$builder = $model->select('
			id, 
			kode,
			nama,
			keterangan,
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
		$model = new \App\Models\Jasa();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus jasa berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses hapus jasa gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Jasa();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'pajak_jual'     => $this->request->getPost('pajak_jual'),
			'harga_jual'     => $this->request->getPost('harga_jual'),
			'keterangan'	 => $this->request->getPost('keterangan'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		
		//CHECK DUPLIKAT KODE JASA;
		$builder = $model->select('COUNT(*) TOTAL')->where('kode', $_DATA['kode']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Jasa sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA JASA
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Jasa berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Jasa();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'kode'           => $this->request->getPost('kode'),
			'nama'           => $this->request->getPost('nama'),
			'pajak_jual'     => $this->request->getPost('pajak_jual'),
			'harga_jual'     => $this->request->getPost('harga_jual'),
			'keterangan'	 => $this->request->getPost('keterangan'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE JASA;
		$builder = $model->select('COUNT(*) TOTAL')->where(['kode' => $_DATA['kode'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Jasa sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE JASA
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Jasa berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function pajakJual($id) {
		$model  = new \App\Models\Jasa();

		$date = new \DateTime('now', new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'pajak_jual'  => $this->request->getPost('status'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];

		$update = $model->where('id', $id)->set($_DATA)->update();
		if($update) {
			$response = [
				'success' => true,
				'message' => 'Update Pajak Jual Jasa berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Proses Update Pajak Jual Jasa gagal.'
			];

			return $this->respond($response, 500);
		}
	}

}
