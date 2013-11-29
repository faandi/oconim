<?php

use Luracast\Restler\RestException;
require_once 'DirBase.php';

class DB_FS_DirSite extends DirBase
{
    function getAll($project)
    {
        try {
            $dir = parent::pathCombine($this->picturePath,$project);
            $d = dir($dir);
            $dirs = array();        
            while (false !== ($entry = $d->read())) {
                $path = parent::pathCombine($dir,$entry);
                if($entry!='.' && $entry!='..' && is_dir($path)) {
                    $dirs[] = array('name' => $entry, 'id' => $entry);
                }
            }
            return $dirs;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }
}
