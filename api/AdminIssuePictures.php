<?php
use Luracast\Restler\RestException;

class AdminIssuePictures
{
    public $dp;
    public $dpCommon;

    function __construct()
    {
        $this->dp = new DB_PDO_MySqlIssue();
        $this->dpCommon = new DB_PDO_MySqlCommon();
    }

//    function index()
//    {
//        return $this->dp->getAll();
//    }

    /**
     * @param int $issueId {@from body}
     *
     * @return array
     */
    function get($issueId)
    {        
        $r = $this->dp->getPictures($issueId);
        if ($r === false) {
            throw new RestException(404);
        }
        return $r;
    }

    /**
     * @status 201
     *
     * @param int $issueId  {@from body}
     * @param string $picturePath  {@from body}
     * 
     * @return mixed
     */
    function post($issueId, $picturePath)
    {
        $pictureId = $this->dpCommon->insertPicture(Config::$picturePath . $picturePath);
        return $this->dp->addPicture($issueId, $pictureId);
    }

    /**
     * @param int $issueId   {@from body}
     * @param string $pictureId  {@from body}
     *
     * @return array
     */
    function delete($issueId, $pictureId)
    {
        return $this->dp->removePicture($issueId, $pictureId);
    }
        
}

