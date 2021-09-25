<?php
namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Satuan extends BaseController
{
	use ResponseTrait;
	
	public function index() {
        $model = new \App\Models\Satuan();
        $builder = $model->select('id, satuan')->orderBy('satuan', 'ASC');
        $data = $builder->get()->getResultArray();

        $response = [
            'total' => count($data),
            'data' => $data
        ];
            
		return $this->respond($response, 200);
    }

    
	public function load($id) {
		$model = new \App\Models\Satuan();

		$builder = $model->select('
			id, 
			satuan
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
		$model = new \App\Models\Satuan();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus Satuan berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus Satuan gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Satuan();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'satuan'         => $this->request->getPost('satuan'),
			'date_create'    => $date->format('Y-m-d H:i:s'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];
		
		//CHECK DUPLIKAT KODE SATUAN;
		$builder = $model->select('COUNT(*) TOTAL')->where('satuan', $_DATA['satuan']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Satuan sudah ada.'
			];
			return $this->respond($response, 500);
		}

		//PROSES INSERT DATA SATUAN
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Satuan berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Satuan();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
		$_DATA = [
			'satuan'         => $this->request->getPost('satuan'),
			'date_update'    => $date->format('Y-m-d H:i:s')
		];

		//CHECK DUPLIKAT KODE SATUAN;
		$builder = $model->select('COUNT(*) TOTAL')->where(['satuan' => $_DATA['satuan'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Satuan sudah ada.'
			];
			return $this->respond($response, 500);
		}

		//PROSES UPDATE SATUAN
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Satuan berhasil.'
		];
		return $this->respond($response, 200);
	}
}
