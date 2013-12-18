<?php

use Luracast\Restler\RestException;

abstract class MySqlBase
{
    protected $db;

    function __construct()
    {
        try {
            //Make sure you are using UTF-8
            $options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
            //Update the dbname username and password to suit your server
            $this->db = new PDO(
                Config::$dbConnection,
                Config::$dbUser,
                Config::$dbPasswd,
                $options
            );
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,
                PDO::FETCH_ASSOC);

        } catch (PDOException $e) {
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }

    protected function rawGet($query, $queryparams)
    {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            $sql = $this->db->prepare($query);
            $sql->execute($queryparams);
            return $sql->fetch();
        } catch (PDOException $e) {
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }

    protected function rawGetAll($query)
    {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        try {
            $stmt = $this->db->query($query);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            throw new RestException(501, 'MySQL: ' . $e->getMessage());
        }
    }

    protected function rawInsert($query, $queryparams)
    {
        $sql = $this->db->prepare($query);
        if (!$sql->execute($queryparams)) {
            return FALSE;
        }
        return $this->get($this->db->lastInsertId());
    }

    protected function rawUpdate($query, $queryparams)
    {
        $sql = $this->db->prepare($query);
        if (!$sql->execute($queryparams)) {
            return FALSE;
        }
        return TRUE;
    }

    protected function rawDelete($query, $queryparams)
    {
        if (!$this->db->prepare($query)->execute($queryparams)) {
            return FALSE;
        }
        return TRUE;
    }

    protected function id2int($r)
    {
        if (!is_array($r)) {
            return $r;
        }
        if (isset($r['id'])) {
            $r['id'] = intval($r['id']);
        } else {
            foreach ($r as &$r0) {
                $r0['id'] = intval($r0['id']);
            }
        }
    }

    /*
    private function install()
    {
        $this->db->exec(
            "CREATE TABLE authors (
                id INT AUTO_INCREMENT PRIMARY KEY ,
                name TEXT NOT NULL ,
                email TEXT NOT NULL
            ) DEFAULT CHARSET=utf8;"
        );
    }
    */
}