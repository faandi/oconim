<?php
use Luracast\Restler\RestException;

class AdminPlaces
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_FS_DirPlace();
    }

    /**
     * @param string $project {@from query}
     * @param string $site {@from query}
     *
     * @return array
     */
    function index($project, $site)
    {
        return $this->dp->getAll($project, $site);
    }       
}