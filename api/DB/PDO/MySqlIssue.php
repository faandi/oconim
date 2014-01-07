<?php

require_once 'MySqlBase.php';

class DB_PDO_MySqlIssue extends MySqlBase
{
    function get($id)
    {
        $query = 'SELECT id, subject, created, modified, touser_id FROM oconim_issue WHERE id = :id';
        $queryparams = array(':id' => $id);        
        $issue = parent::rawGet($query, $queryparams);        
        $queryTags = 'SELECT tkey, tval FROM oconim_issue_tags where issue_id = :id';
        $queryparamsTags = array(':id' => $id);        
        $tags = parent::rawGet($queryTags, $queryparamsTags, TRUE);        
        foreach($tags as $t){
            $issue[$t['tkey']] = $t['tval'];
        }        
        return $issue;
    }

    function getAll()
    {
        $query = 'SELECT id, subject, created, modified, touser_id FROM oconim_issue';
        return parent::rawGetAll($query);
    }

    function insert($rec)
    {
        $query = 'INSERT INTO oconim_issue (subject, touser_id, created, modified) VALUES (:subject, :touser_id, NOW(), NOW())';
        $queryparams = array(':subject' => $rec['subject'], ':touser_id' => $rec['touser_id']);        
        $issueId = parent::rawInsert($query, $queryparams);
        if ($issueId === FALSE) {
            return FALSE;
        }
        $issueId = $issueId['id'];
        $query2 = 'INSERT INTO oconim_issue_tags (issue_id, tkey, tval) VALUES (:issue_id, :tkey, :tval)';
        $queryparams2 = array(':issue_id' => $issueId, ':tkey' => 'artUndUmfang', ':tval' => $rec['artUndUmfang']);
        parent::rawInsert($query2, $queryparams2);
        $queryparams3 = array(':issue_id' => $issueId, ':tkey' => 'verursacher', ':tval' => $rec['verursacher']);
        parent::rawInsert($query2, $queryparams3);
        $queryparams4 = array(':issue_id' => $issueId, ':tkey' => 'bemerkungen', ':tval' => $rec['bemerkungen']);
        parent::rawInsert($query2, $queryparams4);
        $queryparams5 = array(':issue_id' => $issueId, ':tkey' => 'kennung', ':tval' => $rec['kennung']);
        parent::rawInsert($query2, $queryparams5);
        
        return $this->get($issueId);
    }

    function update($id, $rec)
    {
        $query = 'UPDATE oconim_issue SET subject = :subject, touser_id = :touser_id, modified = NOW() WHERE id = :id';
        $queryparams = array(':subject' => $rec['subject'], ':touser_id' => $rec['touser_id'], ':id' => $id);
        parent::rawUpdate($query, $queryparams);
        
        $query2 = 'UPDATE oconim_issue_tags SET tval = :tval WHERE issue_id = :issue_id AND tkey = :tkey';
        $queryparams2 = array(':issue_id' => $id, ':tkey' => 'artUndUmfang', ':tval' => $rec['artUndUmfang']);
        parent::rawUpdate($query2, $queryparams2);
        $queryparams3 = array(':issue_id' => $id, ':tkey' => 'verursacher', ':tval' => $rec['verursacher']);
        parent::rawUpdate($query2, $queryparams3);
        $queryparams4 = array(':issue_id' => $id, ':tkey' => 'bemerkungen', ':tval' => $rec['bemerkungen']);
        parent::rawUpdate($query2, $queryparams4);
        $queryparams5 = array(':issue_id' => $id, ':tkey' => 'kennung', ':tval' => $rec['kennung']);
        parent::rawUpdate($query2, $queryparams5);
        
        return $this->get($id);
    }

    function delete($id)
    {
        $query = 'DELETE FROM oconim_issue WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawDelete($query, $queryparams);
    }
    
    function getPictures($id)
    {        
        $query = 'SELECT P.id, P.name, P.path FROM oconim_picture as P, oconim_issue_pictures as I WHERE I.issue_id = :id AND P.id = I.picture_id';
        $queryparams = array(':id' => $id);        
        $result = parent::rawGet($query, $queryparams, TRUE);       
        $pictures = array();
        foreach($result as $p){
            $pictures[] = array(
                'id' => $p['id'],
                'name' => $p['name'],
                'url' => 'api/pictures/content.json?id=' . urlencode($p['id'])
            );
        }      
        return $pictures;
    }
    
    function addPicture($issueId, $pictureId)
    {
        $query = 'SELECT issue_id, picture_id FROM oconim_issue_pictures WHERE issue_id = :issue_id AND picture_id = :picture_id';
        $queryparams = array(':issue_id' => $issueId, ':picture_id' => $pictureId);
        $pictures = parent::rawGet($query, $queryparams, TRUE);
        if (count($pictures) > 0) {
            return $pictures[0]['picture_id'];
        }
        
        $query2 = 'INSERT INTO oconim_issue_pictures (issue_id, picture_id) VALUES (:issue_id, :picture_id)';
        $queryparams2 = array(':issue_id' => $issueId, ':picture_id' => $pictureId);        
        return parent::rawInsert($query2, $queryparams2);   
    }
    
    function removePicture($issueId, $pictureId)
    {
        $query = 'DELETE FROM oconim_issue_pictures WHERE issue_id = :issue_id AND picture_id = :picture_id)';
        $queryparams = array(':issue_id' => $issueId, ':picture_id' => $pictureId);        
        return parent::rawDelete($query, $queryparams);
    }
}