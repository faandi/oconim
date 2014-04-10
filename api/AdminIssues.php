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
    
    /**
     * 
     * @url GET /sendmail
     * 
     * @param int $id
     *
     * @return bool
     */
    function sendMail($id)
    {
        $issue = $this->dp->get($id);
        
        $user_dp = new DB_PDO_MySqlUser();
        
        $user = $user_dp->get($issue['touser_id']);
        
        $pictures = $this->dp->getPictures($id);
        
        // http://www.bauphilosophie.com/api/pictures/content.json?id=1&size=100x100
        
        $empfaenger = $user['email'];
        $betreff = $issue['subject'];
        $nachricht = "Art und Umfang\r\n" . $issue['artUndUmfang'] . "\r\n\r\n"
                . "Verursacher\r\n" .  $issue['verursacher'] . "\r\n\r\n"
                . "Bemerkung\r\n" .  $issue['bemerkungen'] . "\r\n\r\n"
                . "Kennung\r\n" .  $issue['kennung'] . "\r\n\r\n"
                . "Bilder\r\n";
        
        for($i = 0; $i < count($pictures); $i++) {
            $picurl = 'http://www.bauphilosophie.com/' . $pictures[$i]['url']
                     . '&size=full';
            $nachricht .= $pictures[$i]['name'] . ': ' . $picurl . "\r\n";
        }
        
        $header = "From: webmaster@bauphilosophie.com\r\n"                
                . "Content-Type: text/plain; charset=\"utf-8\"\r\n";
                //. "MIME-Version: 1.0\r\n"
        
        $this->dp->emailSent($id);
        
        return mail($empfaenger, $betreff, $nachricht, $header);
    }
    
}

