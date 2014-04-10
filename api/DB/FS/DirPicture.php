<?php

use Luracast\Restler\RestException;
require_once 'DirBase.php';

class DB_FS_DirPicture extends DirBase
{
    function getAll($placeId)
    {
        try {
            $dir = parent::pathCombine($this->picturePath,$placeId);
            $d = dir($dir);
            $dirs = array();        
            while (false !== ($entry = $d->read())) {
                $path = parent::pathCombine($dir,$entry);                
                if(self::isValidPicture($path)) {
                    $id = parent::pathCombine($placeId,$entry);
                    $url = 'api/admin/pictures/content.json?id=' . urlencode($id);
                    $exif_data = exif_read_data ($path);
                    $date = !empty($exif_data['DateTime']) ? 
                            $exif_data['DateTime'] : NULL;
                    $dirs[] = array(
                        'name' => $entry,
                        'id' => $id,
                        'url' => $url,
                        'date' => $date
                    );
                }
            }
            usort($dirs, array($this, "cmpPicturesByDate"));
            return $dirs;
        } catch (Exception $e) {
            throw new RestException(500, $e->getMessage());
        }
    }
    
    function cmpPicturesByDate($a, $b)
    {
        return strcmp($b['date'], $a['date']);
    }
    
    private function isValidPicture($path) 
    {
        $isValid = true;
        $ext = '';
        if (!is_dir($path)) {
            $ext = pathinfo($path, PATHINFO_EXTENSION);
        }        
        $isValid = $isValid && $ext=='jpeg' || $ext=='jpg';        
        $l = strlen('.tn.jpg');
        if (strlen($path) >= $l) {
            $isValid = $isValid && substr($path, strlen($path) - $l) != '.tn.jpg';
        }
        return $isValid;
    }
    
    function getThumbnailPath($id, $maxW, $maxH, $quality=75, $bgColor=NULL) 
    {
        $imgPath = parent::pathCombine($this->picturePath,$id);
        $tnPath = $imgPath . '.' . $maxW . 'x' . $maxH . '.tn.jpg';        
        if (!file_exists($tnPath)) {
            $source = imagecreatefromjpeg($imgPath);
            $orig_w=imagesx($source);
            $orig_h=imagesy($source);
            if ($orig_w>$maxW || $orig_h>$maxH) {
                $thumb_w=$maxW;
                $thumb_h=$maxH;
                if ($thumb_w/$orig_w*$orig_h>$thumb_h) {
                    $thumb_w=round($thumb_h*$orig_w/$orig_h);
                }
                else {
                    $thumb_h=round($thumb_w*$orig_h/$orig_w);
                }
            } else {
                $thumb_w=$orig_w;
                $thumb_h=$orig_h;
            }
            if ($bgColor !== NULL) {
                $thumb=imagecreatetruecolor($thumb_w,$thumb_h);
                imagecopyresampled($thumb,$source,
                                   0,0,0,0,$thumb_w,$thumb_h,$orig_w,$orig_h);
            }
            else {
                $thumb=imagecreatetruecolor($maxW,$maxH);
                imagefilledrectangle($thumb,0,0,$maxW-1,$maxH-1,intval($bgColor,16));
                imagecopyresampled($thumb,$source,
                                   round(($maxW-$thumb_w)/2),round(($maxH-$thumb_h)/2),
                                   0,0,$thumb_w,$thumb_h,$orig_w,$orig_h);
            }
            imagejpeg($thumb,$tnPath,$quality);
            imagedestroy($thumb);
        }
        return $tnPath;
    }
    
    function getPath($id)
    {
        return parent::pathCombine($this->picturePath,$id);
    }
}
