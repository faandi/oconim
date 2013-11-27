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

    /**
     * @status 201
     *
     * @param string $name  {@from body}
     * @param string $path  {@from body}
     *
     * @return mixed
     */
    function post($name, $path)
    {
        return $this->dp->insert(compact('name', 'path'));
    }

    /**
     * @param int    $id
     * @param string $name  {@from body}
     * @param string $path  {@from body}
     *
     * @return mixed
     */
    function put($id, $name, $path)
    {
        $r = $this->dp->update($id, compact('name', 'path'));
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

