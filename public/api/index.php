<?php

require_once '../../vendor/restler.php';
use Luracast\Restler\Restler;

$r = new Restler();
$r->addAPIClass('AdminUsers', 'admin/users');
$r->addAPIClass('AdminCompany', 'admin/company');
$r->addAPIClass('Projects');
$r->addAPIClass('Authenticate');
$r->addAPIClass('Resources');
$r->handle();

