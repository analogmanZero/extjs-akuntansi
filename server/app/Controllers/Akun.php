<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class Akun extends BaseController
{
	use ResponseTrait;
	
    private function getListAkun($id_parent, $index) {
        $model = new \App\Models\Akun();

        $builder = $model->db->table('rekening A');
        $builder->select('
            A.id, 
            A.id_parent, 
            B.kode_akun kode_akun_parent, 
            B.nama_akun nama_akun_parent, 
            A.kode_akun, 
            A.nama_akun, 
            A.level,
            A.nomer_urut,
            A.saldonormal,
            A.tipe, 
            A.saldoawal, 
            A.debet, 
            A.kredit,
            A.saldoakhir,
            A.keterangan, 
             
            A.saldonormal saldo_normal_asal, 
            A.saldonormal saldo_normal,
            A.saldoawal saldo_awal_asal, 
            A.saldoawal saldo_awal
        ');
        $builder->join('rekening B', 'B.id=A.id_parent', 'LEFT');
        $builder->where('A.id_parent', $id_parent);
        $builder->orderBy('A.kode_akun', 'ASC');
		$data = $builder->get()->getResultArray();

        $result = [];
        foreach($data as $value) {
            $children = $this->getListAkun($value['id'], $index++);		
			if(count($children)>0) {
				$value['expanded'] = true;
				$value['children'] = $children;
			} else {
				$value['leaf'] = true;
			}
            array_push($result, $value);
        }

        return $result;
    }

    public function index()
    {
        $response = [
            'text' => 'root',
            'children' => $this->getListAkun(0, 0)
        ];

        return $this->respond($response, 200);       
    }

    public function load($id) {
		$model = new \App\Models\Akun();

		$builder = $model->select('
			id, 
			id_parent,
            kode_akun,
			nama_akun,
			tipe,
			saldonormal,
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
		$model = new \App\Models\Akun();
		
		$delete = $model->whereIn('id', explode(',', $id))->delete();
		if($delete) {
			$response = [
				'success' => true,
				'message' => 'Hapus Akun berhasil.'
			];

			return $this->respond($response, 200);
		} else {
			$response = [
				'success' => false,
				'message' => 'Hapus Akun gagal.'
			];

			return $this->respond($response, 500);
		}
	}

	public function insert() {
		$model = new \App\Models\Akun();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
        
        $_DATA = [
            'id_parent'   => $this->request->getPost('id_parent'),
			'kode_akun'   => $this->request->getPost('kode_akun'),
            'nama_akun'   => $this->request->getPost('nama_akun'),
            'tipe'        => $this->request->getPost('tipe'),
            'saldonormal' => $this->request->getPost('saldonormal'),
            'keterangan'  => $this->request->getPost('keterangan'),
			'date_create' => $date->format('Y-m-d H:i:s'),
			'date_update' => $date->format('Y-m-d H:i:s')
        ];

        //CHECK DUPLIKAT KODE AKUN;
		$builder = $model->select('COUNT(*) TOTAL')->where('kode_akun', $_DATA['kode_akun']);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Akun sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

        //GET LEVEL
        $builder = $model->select('level')->where('id', $_DATA['id_parent']);
        $level = $builder->get()->getRowArray(); 
        $_DATA['level'] = 1+($level?$level['level']:0);

        //GET NORUT
        $builder = $model->select('MAX(nomer_urut) nomer_urut')->where('id_parent', $_DATA['id_parent']);
        $nourt = $builder->get()->getRowArray(); 
        $_DATA['nomer_urut'] = 1+($nourt?$nourt['nomer_urut']:0);

		//PROSES INSERT DATA AKUN
		$model->insert($_DATA);
		$response = [
			'success' => true,
			'message' => 'Tambah Akun berhasil.'
		];
		return $this->respond($response, 200);
	}

	public function update($id) {
		
		$model = new \App\Models\Akun();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));
        
        $_DATA = [
            'id_parent'   => $this->request->getPost('id_parent'),
			'kode_akun'   => $this->request->getPost('kode_akun'),
            'nama_akun'   => $this->request->getPost('nama_akun'),
            'tipe'        => $this->request->getPost('tipe'),
            'saldonormal' => $this->request->getPost('saldonormal'),
            'keterangan'  => $this->request->getPost('keterangan'),
			'date_update' => $date->format('Y-m-d H:i:s')
        ];

        //CHECK DUPLIKAT KODE AKUN;
		$builder = $model->select('COUNT(*) TOTAL')->where(['kode_akun' => $_DATA['kode_akun'], 'id !=' => $id]);
		$check = $builder->get()->getRowArray();
		if($check['TOTAL']>0) {
			$response = [
				'success' => false,
				'message' => 'Kode Akun sudah terpakai.'
			];
			return $this->respond($response, 500);
		}

        //GET LEVEL
        $builder = $model->select('level')->where('id', $_DATA['id_parent']);
        $level = $builder->get()->getRowArray(); 
        $_DATA['level'] = 1+($level?$level['level']:0);

		//PROSES UPDATE AKUN
		$model->where(['id' => $id])->set($_DATA)->update();
		$response = [
			'success' => true,
			'message' => 'Update Akun berhasil.'
		];
		return $this->respond($response, 200);
	}

    public function updateOrder() {

        $model = new \App\Models\Akun();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));

        //UPDATE 1
        $_DATA = [
			'nomer_urut'  => $this->request->getPost('no_urut_2'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];
        $model->where('id', $this->request->getPost('id_1'))->set($_DATA)->update();

        //UPDATE 2
        $_DATA = [
			'nomer_urut'  => $this->request->getPost('no_urut_1'),
			'date_update' => $date->format('Y-m-d H:i:s')
		];
        $model->where('id', $this->request->getPost('id_2'))->set($_DATA)->update();

        $response = [
			'success' => true,
			'message' => 'Update urutan Akun berhasil.'
		];
		return $this->respond($response, 200);
    }

    public function updateSaldoAwal() {

        $model = new \App\Models\Akun();
		$date = new \DateTime("now", new \DateTimeZone('Asia/Jakarta'));

        $data = $this->request->getPost('data');
        $rows = explode(';', $data);
        foreach($rows as $value) {
            $cols = explode(',', $value);
            $_DATA = [
                'saldonormal' => $cols[1], 
                'saldoawal' => $cols[2],
                'date_update' => $date->format('Y-m-d H:i:s')
            ];

            $model->where('id', $cols[0])->set($_DATA)->update();
        }

        $response = [
			'success' => true,
			'message' => 'Update saldo awal berhasil.'
		];
		return $this->respond($response, 200);
    }

    public function createKodeAkun() {
        $model = new \App\Models\Akun();
        
        $kode_akun_parent = $this->request->getPost('kode_akun_parent');
        $level_parent = $this->request->getPost('level_parent') + 1;

        $builder = $model->select('
            MAX(CONVERT(RIGHT(kode_akun,LENGTH(kode_akun)-(LENGTH("'.$kode_akun_parent.'")+1)), SIGNED))+1 AS LAST
        ')->where([
            'LEFT(kode_akun, LENGTH("'.$kode_akun_parent.'"))' => $kode_akun_parent,
            'level' => $level_parent
        ]);
        $data = $builder->get()->getRowArray();
        $last = $data?$data['LAST']:1;

        $response = [
			'last' => $last
		];
		return $this->respond($response, 200);
    }
}
