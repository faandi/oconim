<?php
use Luracast\Restler\RestException;

class AdminProjects
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_FS_DirProject();
    }

    function index()
    {
        return $this->dp->getAll();
    }        
}