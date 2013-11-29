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
     * @param string $project {@from query}
     *
     * @return array
     */
    function index($project)
    {
        return $this->dp->getAll($project);
    }        
}