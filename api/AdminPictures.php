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
     * @param string $project {@from query}
     * @param string $site {@from query}
     * @param string $place {@from query}
     *
     * @return array
     */
    function index($project, $site, $place)
    {
        return $this->dp->getAll($project, $site, $place);
    }       
}