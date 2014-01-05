<?php

require_once 'MySqlBase.php';

class DB_PDO_MySqlIssue extends MySqlBase
{
    function get($id)
    {
        $query = 'SELECT id, subject, created, modified, touser_id FROM oconim_issue WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawGet($query, $queryparams);
    }

    function getAll()
    {
        $query = 'SELECT id, subject, created, modified, touser_id FROM oconim_issue';
        return parent::rawGetAll($query);
    }

    function insert($rec)
    {
        $query = 'INSERT INTO oconim_issue (subject, touser_id) VALUES (:subject, :touser_id)';
        $queryparams = array(':subject' => $rec['subject'], ':touser_id' => $rec['touser_id']);        
        return parent::rawInsert($query, $queryparams);
    }

    function update($id, $rec)
    {
        $query = 'UPDATE oconim_issue SET subject = :subject, touser_id = :touser_id WHERE id = :id';
        $queryparams = array(':subject' => $rec['subject'], ':touser_id' => $rec['touser_id'], ':id' => $id);
        return parent::rawUpdate($query, $queryparams);
    }

    function delete($id)
    {
        $query = 'DELETE FROM oconim_issue WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawDelete($query, $queryparams);
    }
}