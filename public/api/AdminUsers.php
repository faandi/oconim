<?php
use Luracast\Restler\RestException;

class AdminUsers
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_PDO_MySqlUser();
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
     * @param string $username  {@from body}
     * @param string $password  {@from body}
     * @param string $name  {@from body}
     * @param string $surname  {@from body}
     * @param string $email  {@from body}
     * @param string $tel  {@from body}
     * 
     * @return mixed
     */
    function post($username, $password, $name, $surname, $email, $tel)
    {
        return $this->dp->insert(compact('username', 'password', 'name','surname', 'email', 'tel'));
    }

    /**
     * @param int    $id
     * @param string $name  {@from body}
     * @param string $surname  {@from body}
     * @param string $email  {@from body}
     * @param string $tel  {@from body}
     *
     * @return mixed
     */
    function put($id, $name, $surname, $email, $tel)
    {
        $r = $this->dp->update($id, compact('name','surname', 'email', 'tel'));
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

