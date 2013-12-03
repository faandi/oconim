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
     * @param string $siteId {@from query}
     *
     * @return array
     */
    function index($siteId)
    {
        return $this->dp->getAll($siteId);
    }       
}