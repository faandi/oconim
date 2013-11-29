<?php

require_once 'MySqlBase.php';

class DB_PDO_MySqlCompany extends MySqlBase
{
    function get($id)
    {
        $query = 'SELECT id, name, address FROM oconim_company WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawGet($query, $queryparams);
    }

    function getAll()
    {
        $query = 'SELECT id, name, address FROM oconim_company';
        return parent::rawGetAll($query);
    }

    function insert($rec)
    {        
        $query = 'INSERT INTO oconim_company (name, address) VALUES (:name, :address)';
        $queryparams = array(':name' => $rec['name'], ':address' => $rec['address']);        
        return parent::rawInsert($query, $queryparams);
    }

    function update($id, $rec)
    {
        $query = 'UPDATE oconim_company SET name = :name, address = :address WHERE id = :id';
        $queryparams = array(':name' => $rec['name'], ':address' => $rec['address'], ':id' => $id);
        return parent::rawUpdate($query, $queryparams);
    }

    function delete($id)
    {
        $query = 'DELETE FROM oconim_company WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawDelete($query, $queryparams);
    }
}
