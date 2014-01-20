<?php
use Luracast\Restler\RestException;

class Pictures
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_PDO_MySqlCommon();
        $this->filedp = new DB_FS_DirPicture();
    }
    
    /**
     * @param string $id {@from query}
     * @param string $size {@from query}
     *     
     */
    function getContent($id, $size = '100x100')
    {        
        if ($size !== 'full'){
            $size = explode('x', $size, 2);
            $w = intval($size[0]);
            $h = intval($size[1]);
            $path = $this->dp->getThumbnailPath($id,$w,$h);
        } else {
            $path = $this->dp->getPicturePath($id);
        }
        $im = imagecreatefromjpeg($path);
        header('Content-Type: image/jpeg');
        imagejpeg($im);
        imagedestroy($im);
    }
}