<?php

use Luracast\Restler\RestException;
require_once 'DirBase.php';

class DB_FS_DirSite extends DirBase
{
    function getAll($projectId)
    {
        try {
            $dir = parent::pathCombine($this->picturePath,$projectId);
            $d = dir($dir);
            $dirs = array();        
            while (false !== ($entry = $d->read())) {
                $path = parent::pathCombine($dir,$entry);
                if($entry!='.' && $entry!='..' && is_dir($path)) {
                    $id = parent::pathCombine($projectId,$entry);
                    $dirs[] = array('name' => $entry, 'id' => $id);
                }
            }
            return $dirs;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }
}
