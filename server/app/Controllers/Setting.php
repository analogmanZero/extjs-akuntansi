<?php
namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Setting extends BaseController
{
	use ResponseTrait;
	
	public function index() {
		$model = new \App\Models\Setting();

		$builder = $model->select('
			id, 
			nama,
			alamat,
			kodepos,
			telepon,
			fax,
			negara
		');
		$data = $builder->get()->getRowArray();
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

	public function update() {
		$model = new \App\Models\Setting();
		$_DATA = [
			'nama'    => $this->request->getPost('nama'),
			'alamat'  => $this->request->getPost('alamat'),
			'kodepos' => $this->request->getPost('kodepos'),
			'telepon' => $this->request->getPost('telepon'),
			'fax'     => $this->request->getPost('fax'),
			'negara'  => $this->request->getPost('negara')
		];

		//PROSES UPDATE
		$model->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update data berhasil.'
		];
		return $this->respond($response, 200);
	}
}
