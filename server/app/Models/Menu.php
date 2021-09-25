<?php

namespace App\Models;

use CodeIgniter\Model;

class Menu extends Model
{
	protected $DBGroup              = 'default';
	protected $table                = 'modul';
	protected $primaryKey           = 'id';
	protected $useAutoIncrement     = true;
	protected $insertID             = 0;
	protected $returnType           = 'array';
	protected $useSoftDelete        = false;
	protected $protectFields        = true;
	protected $allowedFields        = [];

	// Dates
	protected $useTimestamps        = false;
	protected $dateFormat           = 'datetime';
	protected $createdField         = 'created_at';
	protected $updatedField         = 'updated_at';
	protected $deletedField         = 'deleted_at';

	// Validation
	protected $validationRules      = [];
	protected $validationMessages   = [];
	protected $skipValidation       = false;
	protected $cleanValidationRules = true;

	// Callbacks
	protected $allowCallbacks       = true;
	protected $beforeInsert         = [];
	protected $afterInsert          = [];
	protected $beforeUpdate         = [];
	protected $afterUpdate          = [];
	protected $beforeFind           = [];
	protected $afterFind            = [];
	protected $beforeDelete         = [];
	protected $afterDelete          = [];

	public function getMenu($id_user, $id_parent, $index, $submenu_name) {
		
		$builder = $this->db->table('modul A');
		$builder->join('user_modul_akses B', 'B.id_modul=A.id', 'LEFT');
		$builder->select('
			A.id idItem, 
            A.text, 
            A.iconCls,
            A.rowCls,
            A.viewType,
            A.routeId,
            A.modul,
            B.akses
		');
		$builder->where(['A.id_parent' => $id_parent, 'B.id_user' => $id_user, 'A.aktif' => 1]);
		$builder->orderBy('A.sequence');
		$data = $builder->get()->getResultArray();
		
		$result = [];
		foreach ($data as $value) {
			$children = $this->getMenu($id_user, $value['idItem'], $index++, $submenu_name);			
			if(count($children)>0) {
				$value['expanded']    = false;
				$value[$submenu_name] = $children;
			} else {
				$value['leaf'] = true;
			}
			array_push($result, $value);
		}

		return $result;
	}
}
