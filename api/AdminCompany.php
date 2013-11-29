<?php
use Luracast\Restler\RestException;

class AdminCompany
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_PDO_MySqlCompany();
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

    /**
     * @status 201
     *
     * @param string $name  {@from body}
     * @param string $address  {@from body}
     * 
     * @return mixed
     */
    function post($name, $address)
    {
        return $this->dp->insert(compact('name', 'address'));
    }

    /**
     * @param int    $id
     * @param string $name  {@from body}
     * @param string $address  {@from body}
     *
     * @return mixed
     */
    function put($id, $name, $address)
    {
        $r = $this->dp->update($id, compact('name','address'));
        if ($r === false) {
            throw new RestException(404);
        }
        return $r;
    }

    /**
     * @param int $id
     *
     * @return array
     */
    function delete($id)
    {
        return $this->dp->delete($id);
    }
        
}

