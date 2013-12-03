<?php
use Luracast\Restler\RestException;

class AdminSites
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_FS_DirSite();
    }

    /**
     * @param string $projectId {@from query}
     *
     * @return array
     */
    function index($projectId)
    {
        return $this->dp->getAll($projectId);
    }        
}