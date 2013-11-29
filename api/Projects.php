<?php
use Luracast\Restler\RestException;

class Projects
{
    public $dp;

    function __construct()
    {
        //$this->dp = new DB_Session();
        $this->dp = new DB_PDO_MySqlProject();
    }

    function index()
    {
        return $this->dp->getAll();
    }

    /**
     * @param int $id
     *
     * @return array
     */
    function get($id)
    {
        $r = $this->dp->get($id);
        if ($r === false) {
            throw new RestException(404);
        }
        return $r;
    }
}

