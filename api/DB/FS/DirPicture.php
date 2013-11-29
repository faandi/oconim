<?php

use Luracast\Restler\RestException;
require_once 'DirBase.php';

class DB_FS_DirPicture extends DirBase
{
    function getAll($project,$site,$place)
    {
        try {
            $dir = parent::pathCombine($this->picturePath,$project,$site,$place);
            $d = dir($dir);
            $dirs = array();        
            while (false !== ($entry = $d->read())) {
                $path = parent::pathCombine($dir,$entry);
                $ext = '';
                if (!is_dir($path)) {
                    $ext = pathinfo($path, PATHINFO_EXTENSION);
                }
                if($entry!='.' && $entry!='..' && $ext=='jpeg' || $ext=='jpg') {
                    $dirs[] = array('name' => $entry, 'id' => $entry);
                }
            }
            return $dirs;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }
}
