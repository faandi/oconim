<?php

use Luracast\Restler\RestException;
require_once 'DirBase.php';

class DB_FS_DirProject extends DirBase
{
    function getAll()
    {
        try {
            $dir = $this->picturePath;
            $d = dir($dir);
            $dirs = array();        
            while (false !== ($entry = $d->read())) {
                if($entry!='.' && $entry!='..' && is_dir($dir.$entry)) {
                    $dirs[] = array('name' => $entry, 'id' => $entry);
                }
            }
            return $dirs;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }
}
