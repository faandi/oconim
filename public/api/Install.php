<?php

class Install
{

    /**
     * @return array
     */
    function index()
    {
        $dps = array('projects' => new DB_PDO_MySqlProject());
        $results = array();
        foreach ($dps as $k => $v) {
            $results[$k] = $v->install();
        }        
        return $results;
    }
    
    /**
     * @return array
     * @url GET sampledata
     */
    function sampledata()
    {
        $dps = array('projects' => new DB_PDO_MySqlProject());
        $results = array();
        foreach ($dps as $k => $v) {
            $results[$k] = $v->insertSampleData();
        }        
        return $results;
    }
    
}

