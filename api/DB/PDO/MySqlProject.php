<?php

require_once 'MySqlBase.php';

class DB_PDO_MySqlProject extends MySqlBase
{
    function get($id)
    {
        $query = 'SELECT id, name, path FROM cim_projects WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawGet($query, $queryparams);
    }

    function getAll()
    {
        $query = 'SELECT id, name, path FROM cim_projects';
        return parent::rawGetAll($query);
    }

    function insert($rec)
    {
        $query = 'INSERT INTO cim_projects (name, path) VALUES (:name, :path)';
        $queryparams = array(':name' => $rec['name'], ':path' => $rec['path']);        
        return parent::rawInsert($query, $queryparams);
    }

    function update($id, $rec)
    {
        $query = 'UPDATE cim_projects SET name = :name, path = :path WHERE id = :id';
        $queryparams = array(':id' => $id, ':name' => $rec['name'], ':path' => $rec['path']);
        return parent::rawUpdate($query, $queryparams);
    }

    function delete($id)
    {
        $query = 'DELETE FROM cim_projects WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawDelete($query, $queryparams);
    }
    
    function install()
    {
        try {
            $this->db->exec(
                "CREATE TABLE cim_projects (
                    id INT AUTO_INCREMENT PRIMARY KEY ,
                    name VARCHAR(100) NOT NULL,
                    path VARCHAR(4096) NOT NULL
                ) DEFAULT CHARSET=utf8;"
            );            
            return true;
        } catch(Exception $e) {
            return false;
        }        
    }
    
    function insertSampleData()
    {
        try {
            $this->db->exec(
                "INSERT INTO cim_projects (name, path) VALUES ('Wien SÜD 1', 'data/wien_süd');
                 INSERT INTO cim_projects (name, path) VALUES ('Anderes Projekt', 'data/anderes_projekt');"
            );
            return true;
        } catch(Exception $e) {
            return false;
        }        
    }
}
