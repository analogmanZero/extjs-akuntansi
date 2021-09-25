<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');

$routes->post('login', 'Auth::Login');
$routes->get('logout', 'Auth::Logout');
$routes->get('akses', 'Auth::Akses');

$routes->get('setting', 'Setting::index');
$routes->add('setting/update', 'Setting::update');

$routes->get('listakun/all', 'ListAkun::index');
$routes->get('listakun/akunlevel4', 'ListAkun::listAkunLevel4');
$routes->get('listakun/hutang', 'ListAkun::listAkunHutang');
$routes->get('listakun/piutang', 'ListAkun::listAkunPiutang');
$routes->get('listakun/kasbank', 'ListAkun::listAkunKasBank');

$routes->get('akun', 'Akun::index');
$routes->get('akun/(:segment)/load', 'Akun::load/$1');
$routes->get('akun/(:segment)/delete', 'Akun::delete/$1');
$routes->add('akun/insert', 'Akun::insert');
$routes->add('akun/(:segment)/update', 'Akun::update/$1');
$routes->post('akun/updateorder', 'Akun::updateOrder');
$routes->post('akun/updatesaldoawal', 'Akun::updateSaldoAwal');
$routes->post('akun/createkodeakun', 'Akun::createKodeAkun');

$routes->get('satuan', 'Satuan::index');
$routes->get('satuan/(:segment)/load', 'Satuan::load/$1');
$routes->get('satuan/(:segment)/delete', 'Satuan::delete/$1');
$routes->add('satuan/insert', 'Satuan::insert');
$routes->add('satuan/(:segment)/update', 'Satuan::update/$1');

$routes->get('area', 'Area::index');
$routes->get('area/(:segment)/load', 'Area::load/$1');
$routes->get('area/(:segment)/delete', 'Area::delete/$1');
$routes->add('area/insert', 'Area::insert');
$routes->add('area/(:segment)/update', 'Area::update/$1');

$routes->get('inventori', 'Inventori::index');
$routes->get('inventori/(:segment)/load', 'Inventori::load/$1');
$routes->get('inventori/(:segment)/delete', 'Inventori::delete/$1');
$routes->add('inventori/insert', 'Inventori::insert');
$routes->add('inventori/(:segment)/update', 'Inventori::update/$1');
$routes->add('inventori/(:segment)/pajakjual', 'Inventori::pajakJual/$1');
$routes->add('inventori/(:segment)/pajakbeli', 'Inventori::pajakBeli/$1');

$routes->get('jasa', 'Jasa::index');
$routes->get('jasa/(:segment)/load', 'Jasa::load/$1');
$routes->get('jasa/(:segment)/delete', 'Jasa::delete/$1');
$routes->add('jasa/insert', 'Jasa::insert');
$routes->add('jasa/(:segment)/update', 'Jasa::update/$1');
$routes->add('jasa/(:segment)/pajakjual', 'Jasa::pajakJual/$1');

$routes->get('voucher', 'Voucher::index');
$routes->get('voucher/(:segment)/load', 'Voucher::load/$1');
$routes->get('voucher/(:segment)/delete', 'Voucher::delete/$1');
$routes->add('voucher/insert', 'Voucher::insert');
$routes->add('voucher/(:segment)/update', 'Voucher::update/$1');
$routes->add('voucher/(:segment)/pajakjual', 'Voucher::pajakJual/$1');

$routes->get('customer', 'Customer::index');
$routes->get('customer/(:segment)/load', 'Customer::load/$1');
$routes->get('customer/(:segment)/delete', 'Customer::delete/$1');
$routes->add('customer/insert', 'Customer::insert');
$routes->add('customer/(:segment)/update', 'Customer::update/$1');

$routes->get('vendor', 'Vendor::index');
$routes->get('vendor/(:segment)/load', 'Vendor::load/$1');
$routes->get('vendor/(:segment)/delete', 'Vendor::delete/$1');
$routes->add('vendor/insert', 'Vendor::insert');
$routes->add('vendor/(:segment)/update', 'Vendor::update/$1');

$routes->get('pembelian', 'Pembelian::PembelianList');
$routes->get('pembelian/all', 'Pembelian::PembelianListAll');
$routes->get('pembelian/(:segment)/load', 'Pembelian::PembelianLoad/$1');
$routes->get('pembelian/(:segment)/delete', 'Pembelian::PembelianDelete/$1');
$routes->add('pembelian/insert', 'Pembelian::PembelianInsert');
$routes->add('pembelian/(:segment)/update', 'Pembelian::PembelianUpdate/$1');

$routes->get('penjualan', 'Penjualan::PenjualanList');
$routes->get('penjualan/all', 'Penjualan::PenjualanListAll');
$routes->get('penjualan/(:segment)/load', 'Penjualan::PenjualanLoad/$1');
$routes->get('penjualan/(:segment)/delete', 'Penjualan::PenjualanDelete/$1');
$routes->add('penjualan/insert', 'Penjualan::PenjualanInsert');
$routes->add('penjualan/(:segment)/update', 'Penjualan::PenjualanUpdate/$1');

$routes->get('penjualan/voucher', 'Penjualan::PenjualanVoucherList');
$routes->get('penjualan/voucher/(:segment)/load', 'Penjualan::PenjualanVoucherLoad/$1');
$routes->get('penjualan/voucher/(:segment)/delete', 'Penjualan::PenjualanVoucherDelete/$1');
$routes->add('penjualan/voucher/insert', 'Penjualan::PenjualanVoucherInsert');
$routes->add('penjualan/voucher/(:segment)/update', 'Penjualan::PenjualanVoucherUpdate/$1');

$routes->get('kasbankkeluar', 'KasBankKeluar::index');
$routes->get('kasbankkeluar/(:segment)/load', 'KasBankKeluar::load/$1');
$routes->get('kasbankkeluar/(:segment)/delete', 'KasBankKeluar::delete/$1');
$routes->add('kasbankkeluar/insert', 'KasBankKeluar::insert');
$routes->add('kasbankkeluar/(:segment)/update', 'KasBankKeluar::update/$1');
$routes->get('kasbankkeluar/getnobukti', 'KasBankKeluar::getNoBukti');

$routes->get('kasbankmasuk', 'KasBankMasuk::index');
$routes->get('kasbankmasuk/(:segment)/load', 'KasBankMasuk::load/$1');
$routes->get('kasbankmasuk/(:segment)/delete', 'KasBankMasuk::delete/$1');
$routes->add('kasbankmasuk/insert', 'KasBankMasuk::insert');
$routes->add('kasbankmasuk/(:segment)/update', 'KasBankMasuk::update/$1');
$routes->get('kasbankmasuk/getnobukti', 'KasBankMasuk::getNoBukti');

$routes->get('bayarpenjualan', 'BayarPenjualan::index');
$routes->get('bayarpenjualan/(:segment)/load', 'BayarPenjualan::load/$1');
$routes->get('bayarpenjualan/(:segment)/delete', 'BayarPenjualan::delete/$1');
$routes->add('bayarpenjualan/insert', 'BayarPenjualan::insert');
$routes->add('bayarpenjualan/(:segment)/update', 'BayarPenjualan::update/$1');
$routes->get('bayarpenjualan/getnobukti', 'BayarPenjualan::getNoBukti');

$routes->get('bayarpembelian', 'BayarPembelian::index');
$routes->get('bayarpembelian/(:segment)/load', 'BayarPembelian::load/$1');
$routes->get('bayarpembelian/(:segment)/delete', 'BayarPembelian::delete/$1');
$routes->add('bayarpembelian/insert', 'BayarPembelian::insert');
$routes->add('bayarpembelian/(:segment)/update', 'BayarPembelian::update/$1');
$routes->get('bayarpembelian/getnobukti', 'BayarPembelian::getNoBukti');

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
