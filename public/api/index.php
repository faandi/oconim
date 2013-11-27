<?php

require_once '../../vendor/restler.php';
use Luracast\Restler\Restler;

$r = new Restler();
$r->addAPIClass('Projects');
$r->addAPIClass('Install');
$r->addAPIClass('Resources');
$r->handle();

