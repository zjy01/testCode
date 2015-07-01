<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/7/1
 * Time: 1:35
 */
header("Content-Type:text/html;charset=utf-8");
include 'func.php';
$a=M("txl");
var_dump($a);
$arr=array('userName'=>'oyyyyy','short'=>'55555');
$c=$a->insert($arr)->sql();
var_dump($c);
$b=$a->select("*")->sql();
var_dump($b);