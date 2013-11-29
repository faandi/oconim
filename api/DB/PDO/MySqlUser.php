<?php

require_once 'MySqlBase.php';

class DB_PDO_MySqlUser extends MySqlBase
{
    function get($id)
    {
        $query = 'SELECT id, username, password, name, surname, email, tel, isadmin FROM oconim_user WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawGet($query, $queryparams);
    }

    function getAll()
    {
        $query = 'SELECT id, username, password, name, surname, email, tel, isadmin FROM oconim_user';
        return parent::rawGetAll($query);
    }

    function insert($rec)
    {
        // A higher "cost" is more secure but consumes more processing power
        $cost = 10;
        // Create a random salt
        $salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
        // Prefix information about the hash so PHP knows how to verify it later.
        // "$2a$" Means we're using the Blowfish algorithm. The following two digits are the cost parameter.
        $salt = sprintf("$2a$%02d$", $cost) . $salt;
        // Hash the password with the salt
        $hash = crypt($rec['password'], $salt);
        
        $query = 'INSERT INTO oconim_user (username, password, name, surname, email, tel) VALUES (:username, :password, :name, :surname, :email, :tel)';
        $queryparams = array(':username' => $rec['username'], ':password' => $hash, ':name' => $rec['name'], ':surname' => $rec['surname'], ':email' => $rec['email'], ':tel' => $rec['tel']);        
        return parent::rawInsert($query, $queryparams);
    }

    function update($id, $rec)
    {
        $query = 'UPDATE oconim_user SET name = :name, surname = :surname, email = :email, tel = :tel WHERE id = :id';
        $queryparams = array(':name' => $rec['name'], ':surname' => $rec['surname'], ':email' => $rec['email'], ':tel' => $rec['tel'], ':id' => $id);        
        return parent::rawUpdate($query, $queryparams);
    }

    function delete($id)
    {
        $query = 'DELETE FROM oconim_user WHERE id = :id';
        $queryparams = array(':id' => $id);        
        return parent::rawDelete($query, $queryparams);
    }    
    
    function authenticate($username, $password)
    {
        $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);        
        $query = 'SELECT password FROM oconim_user WHERE username = :username LIMIT 1';
        $queryparams = array(':username' => $username);
        $sql = $this->db->prepare($query);
        if (!$sql->execute($queryparams)) {
            return false;
        }
        $user = $sql->fetch(PDO::FETCH_OBJ);
        // Hashing the password with its hash as the salt returns the same hash
        return $user && crypt($password, $user->password) == $user->password;
    }
}
