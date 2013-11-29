<?php

require_once '../vendor/restler.php';
use Luracast\Restler\Restler;

$r = new Restler();
$r->addAPIClass('AdminUsers', 'admin/users');
$r->addAPIClass('AdminCompany', 'admin/company');
$r->addAPIClass('AdminProjects', 'admin/projects');
$r->addAPIClass('AdminSites', 'admin/sites');
$r->addAPIClass('AdminPlaces', 'admin/places');
$r->addAPIClass('AdminPictures', 'admin/pictures');
$r->addAPIClass('Projects');
$r->addAPIClass('Authenticate');
$r->addAPIClass('Resources');
$r->handle();

