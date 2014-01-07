<?php

require_once 'MySqlBase.php';

class DB_PDO_MySqlCommon extends MySqlBase
{
    function getPicturePath($id)
    {
        $query = 'SELECT path FROM oconim_picture WHERE id = :id';
        $queryparams = array(':id' => $id);        
        $picture = parent::rawGet($query, $queryparams);         
        return $picture['path'];
    }
    
    function insertPicture($path)
    {   
        $query = 'SELECT id FROM oconim_picture WHERE path = :path';
        $queryparams = array(':path' => $path);
        $pictures = parent::rawGet($query, $queryparams, TRUE);
        if (count($pictures) > 0) {
            return $pictures[0]['id'];
        }
        
        $placePath = substr($path, 0, strlen($path) - strlen(basename($path)) - 1);        
        $sitePath = substr($placePath, 0, strlen($placePath) - strlen(basename($placePath)) - 1);
        $projectPath = substr($sitePath, 0, strlen($sitePath) - strlen(basename($sitePath)) - 1);        
        $name = basename($path);
        
        $projectId = $this->insertProject($projectPath);        
        $siteId = $this->insertSite($sitePath, $projectId);        
        $placeId = $this->insertPlace($placePath, $siteId);        
        
        $query2 = 'INSERT INTO oconim_picture (name, path, place_id) VALUES (:name, :path, :place_id)';
        $queryparams2 = array(':name' => $name, ':path' => $path, ':place_id' => $placeId);        
        return parent::rawInsertGetId($query2, $queryparams2);   
    }
    
    function insertProject($path)
    {
        $query = 'SELECT id FROM oconim_project WHERE path = :path';
        $queryparams = array(':path' => $path);
        $projects = parent::rawGet($query, $queryparams, TRUE);
        if (count($projects) > 0) {
            return $projects[0]['id'];
        }        
        $name = basename($path);
        $query2 = 'INSERT INTO oconim_project (name, path) VALUES (:name, :path)';
        $queryparams2 = array(':name' => $name, ':path' => $path);        
        return parent::rawInsertGetId($query2, $queryparams2);   
    }
    
    function insertSite($path, $projectId)
    {
        $query = 'SELECT id FROM oconim_site WHERE path = :path';
        $queryparams = array(':path' => $path);
        $sites = parent::rawGet($query, $queryparams, TRUE);
        if (count($sites) > 0) {
            return $sites[0]['id'];
        }        
        $name = basename($path);
        $query2 = 'INSERT INTO oconim_site (name, path, project_id) VALUES (:name, :path, :project_id)';
        $queryparams2 = array(':name' => $name, ':path' => $path, ':project_id' => $projectId);        
        return parent::rawInsertGetId($query2, $queryparams2);
    }
    
    function insertPlace($path, $siteId)
    {
        $query = 'SELECT id FROM oconim_place WHERE path = :path';
        $queryparams = array(':path' => $path);
        $places = parent::rawGet($query, $queryparams, TRUE);
        if (count($places) > 0) {
            return $places[0]['id'];
        }        
        $name = basename($path);
        $query2 = 'INSERT INTO oconim_place (name, path, site_id) VALUES (:name, :path, :site_id)';
        $queryparams2 = array(':name' => $name, ':path' => $path, ':site_id' => $siteId);        
        return parent::rawInsertGetId($query2, $queryparams2);
    }
}