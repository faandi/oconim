<?php
use Luracast\Restler\RestException;

class Authenticate
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_PDO_MySqlUser();
    }

    /**     
     * @param string $username  {@from body}
     * @param string $password  {@from body}
     *
     * @return mixed
     */
    function post($username, $password)
    {
        $r = $this->dp->authenticate($username, $password);
        if ($r === false) {
            throw new RestException(401);
        }
        return $r;
    }
    
}

