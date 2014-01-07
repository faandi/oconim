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
     * @param string $artUndUmfang  {@from body}
     * @param string $verursacher  {@from body}
     * @param string $bemerkungen  {@from body}
     * @param string $kennung  {@from body}
     * @param int $touser_id  {@from body} 
     * 
     * @return mixed
     */
    function post($subject, $artUndUmfang, $verursacher, $bemerkungen, $kennung, $touser_id = null)
    {
        return $this->dp->insert(compact('subject', 'touser_id',
                'artUndUmfang', 'verursacher', 'bemerkungen', 'kennung'));
    }

    /**
     * @param int    $id
     * @param string $subject  {@from body}     
     * @param string $artUndUmfang  {@from body}
     * @param string $verursacher  {@from body}
     * @param string $bemerkungen  {@from body}
     * @param string $kennung  {@from body}
     * @param int $touser_id  {@from body}
     *
     * @return mixed
     */
    function put($id, $subject, $artUndUmfang, $verursacher, $bemerkungen, $kennung, $touser_id)
    {
        $r = $this->dp->update($id, compact('subject', 'touser_id',
                'artUndUmfang', 'verursacher', 'bemerkungen', 'kennung'));
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

