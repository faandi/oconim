<?php
use Luracast\Restler\RestException;

class AdminPictures
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_FS_DirPicture();
    }

    /**
     * @param string $placeId {@from query}
     *
     * @return array
     */
    function index($placeId)
    {
        return $this->dp->getAll($placeId);
    }
    
    /**
     * @param string $id {@from query}
     * @param string $size {@from query}
     *     
     */
    function getContent($id, $size = '100x100')
    {
        $path = '';
        if ($size == 'full') {
            $path = $this->dp->getPath($id);
        } else {
            $size = explode('x', $size, 2);
            $w = intval($size[0]);
            $h = intval($size[1]);
            $path = $this->dp->getThumbnailPath($id,$w,$h);
        }
        $im = imagecreatefromjpeg($path);
        header('Content-Type: image/jpeg');
        imagejpeg($im);
        imagedestroy($im);
    }
}