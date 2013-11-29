<?php

use Luracast\Restler\RestException;

abstract class DirBase
{
    protected $picturePath;

    function __construct()
    {
        $this->picturePath = "/home/fachi/Projects/oconim/bilder/";
    }
    
    protected function pathCombine($p1,$p2,$p3 = null, $p4 = null)
    {        
        $res = $p1 . '/' . $p2;
        if ($p3 !== null) {
            $res = $res . '/' . $p3;
        }
        if ($p4 !== null) {
            $res = $res . '/' . $p4;
        }
        return $res;
    }
}