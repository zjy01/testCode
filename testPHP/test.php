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
$b=$a->select("*")->where("id = 1")->sql();
var_dump($b);