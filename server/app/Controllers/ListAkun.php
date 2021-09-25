<?php

namespace App\Controllers;
use CodeIgniter\API\ResponseTrait;
use App\Controllers\BaseController;

class ListAkun extends BaseController
{
	use ResponseTrait;
	
    protected $data = [];

    private function getListAkun($id_parent, $index, $alokasi) {
        $model = new \App\Models\Akun();

        $builder = $model->db->table('
            rekening A LEFT JOIN
            (SELECT DISTINCT(id_parent) id, COUNT(id) total_anak FROM rekening GROUP BY id_parent) B ON A.id=B.id
        ');
        $builder->select("
            A.id, 
            A.kode_akun, 
            CONCAT(
                '<div class=\"mid_satu\">',
                '<span class=\"mid_dua\">', REPEAT('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;', ".$index."), '</span>',
                '<span class=\"mid_dua\">', '<img style=\"mid_tiga\" src=\"resources/images/webdesktop/leaf.png\" />', '</span>',
                '<span class=\"mid_dua\">&nbsp;', IF(B.total_anak IS NULL".($alokasi=="Y"?" OR A.level=3":"").", '', '<B>'), A.nama_akun, IF(B.total_anak IS NULL".($alokasi=="Y"?" OR A.level=3":"").", '','</B>'), '</span>',
            '</div>') display, 
            A.nama_akun, 
            (B.total_anak IS NULL) AS leaf, 
            A.level
        ");
        $builder->where('A.id_parent', $id_parent);
        if($alokasi=='Y') {
            $builder->where('A.level < 5');    
        }
        $builder->orderBy('A.kode_akun', 'ASC');
		$data = $builder->get()->getResultArray();

        foreach($data as $key => $value) {
            array_push($this->data, $value);
            $this->getListAkun($value['id'], $index++, $alokasi);
        }
    }

    public function index()
    {
        $alokasi = $this->request->getVar('alokasi');
        $this->data = [];
        $this->getListAkun(0, 0, $alokasi);

        $response = [
            'total' => count($this->data),
            'data' => $this->data
        ];

        return $this->respond($response, 200);
    }

    public function listAkunHutang() {
        $model = new \App\Models\Akun();

        $builder = $model->select('
            id, 
            kode_akun, 
            nama_akun, 
            CONCAT(kode_akun, \' - \', nama_akun) display, 
            level 
        ');
        $builder->where(['level' => 4, 'id_parent' => 115]);
        $builder->orderBy('kode_akun', 'ASC');
		$this->data = $builder->get()->getResultArray();

        $response = [
            'total' => count($this->data),
            'data' => $this->data
        ];

        return $this->respond($response, 200);
    }

    public function listAkunPiutang() {
        $model = new \App\Models\Akun();

        $builder = $model->select('
            id, 
            kode_akun, 
            nama_akun, 
            CONCAT(kode_akun, \' - \', nama_akun) display, 
            level 
        ');
        $builder->where(['level' => 4, 'id_parent' => 13]);
        $builder->orderBy('kode_akun', 'ASC');
		$this->data = $builder->get()->getResultArray();

        $response = [
            'total' => count($this->data),
            'data' => $this->data
        ];

        return $this->respond($response, 200);
    }

    public function listAkunKasBank() {
        $model = new \App\Models\Akun();
        $id_akun_parent = [
            'K' => [4],
            'B' => [8]    
        ];
        
        $tipe = $this->request->getVar('tipe');

        $builder = $model->select('
            id, 
            kode_akun, 
            nama_akun, 
            CONCAT(kode_akun, \' - \', nama_akun) display, 
            level 
        ');
        $builder->whereIn('id_parent', $id_akun_parent[$tipe]);
        $builder->orderBy('kode_akun', 'ASC');
		$this->data = $builder->get()->getResultArray();

        $response = [
            'total' => count($this->data),
            'data' => $this->data
        ];

        return $this->respond($response, 200);
    }

    public function listAkunLevel4() {
        $model = new \App\Models\Akun();

        $builder = $model->select('
            id, 
            kode_akun, 
            nama_akun, 
            CONCAT(kode_akun, \' - \', nama_akun) display, 
            level 
        ');
        $builder->where(['level' => 4]);
        $builder->orderBy('kode_akun', 'ASC');
		$this->data = $builder->get()->getResultArray();

        $response = [
            'total' => count($this->data),
            'data' => $this->data
        ];

        return $this->respond($response, 200);
    }
}