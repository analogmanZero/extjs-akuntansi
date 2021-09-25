<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;

class Auth extends \CodeIgniter\Controller
{
    use ResponseTrait;

    public function Akses() {
        $session = \Config\Services::session();
        $user_login = $session->get('user');

        if($user_login) {
            $model = new \App\Models\Menu();
            $response = [
                'login' => true,
                'user' => $user_login,
                'menu' => $model->getMenu($user_login['id'], 0, 0, 'menu')
            ];

            return $this->respond($response, 200);	

        } else {
            
            $response = [
                'login' => false
            ];

            return $this->respond($response, 500);	

        }

    }

    public function Login() {
		
        $_DATA = [
            'username' => $this->request->getPost('username'),
            'password' => $this->request->getPost('password')
        ];

        $validation = \Config\Services::validation();
		if($validation->run($_DATA, 'auth') == FALSE) {
            foreach($validation->getErrors() as $value) {
                $response = [                
                    'success' => false,
                    'message' => $value
                ];
    
                return $this->respond($response, 500);
            }
        }

        $MCrypt = new \App\Libraries\MCrypt();
		$_DATA['password'] = $MCrypt->encrypt($_DATA['password']);  

        $model = new \App\Models\User();
        $user  = $model->select('
            id, 
            iduser, 
            id_divisi, 
            nama, 
            pass, 
            aktif, 
            status tipe_user
        ')->where([
            'iduser' => $_DATA['username'],
            'pass'   => $_DATA['password']
        ])->get()->getRowArray();

		if($user) {
            if($user['aktif']=='N') {
                $response = [                
                    'success' => false,
                    'message' => 'User tidak aktif.'
                ];
    
                return $this->respond($response, 500);
            } 
            
            $mdl_menu = new \App\Models\Menu();
            $menu = $mdl_menu->getMenu($user['id'], 0, 0, 'children');
			$response = [
                'success' => true,
                'message' => 'Proses login user berhasil.',
                'data' => [
                    $user
                ],
                'menu' => [
                    'children' => $menu,
                ]
            ];

            $session = \Config\Services::session();
            $session->set(['user' => $user, 'menu' => $menu]);

			return $this->respond($response, 200);
		} else {
			$response = [
                'success' => false,
                'message' => 'User ID dan password tidak sesuai.'
            ];

            return $this->respond($response, 500);	
		}
    }

    public function Logout() {
		$session = \Config\Services::session();
		$session->destroy();

		$response = [
            'status' => 200,
            'success' => true,
            'data' => [
                'message' => 'Proses logout berhasil.'
            ],
        ];

        return $this->respond($response, 200);	
	}

}