<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/6/26
 * Time: 20:40
 */
mysql_connect('localhost','root','111111') or die('连接数据库服务器失败');
mysql_select_db('txl') or die('链接数据库 txl 失败');
mysql_query("set names 'utf8'");