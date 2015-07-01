<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/7/1
 * Time: 1:32
 */
include 'conn.php';
include 'table.php';
function M($table){
    $d=new table($table);
    return $d;
}