<?php
use Luracast\Restler\RestException;

class AdminIssues
{
    public $dp;

    function __construct()
    {
        $this->dp = new DB_PDO_MySqlIssue();
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
     * @param string $subject  {@from body}
     * @param int $touser_id  {@from body}
     * 
     * @return mixed
     */
    function post($subject, $touser_id = null)
    {
        return $this->dp->insert(compact('subject', 'touser_id'));
    }

    /**
     * @param int    $id
     * @param string $subject  {@from body}
     * @param int $touser_id  {@from body}
     *
     * @return mixed
     */
    function put($id, $subject, $touser_id)
    {
        $r = $this->dp->update($id, compact('subject','touser_id'));
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

