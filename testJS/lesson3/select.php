<?php

@header('content-type:text/html;charset=uft-8');
mysql_connect('localhost','root','linsist') or die('数据库连接失败'.mysql_error);
mysql_select_db('comment')or die(mysql_error());
mysql_query('set names utf8');

$sql = "SELECT imgUrl FROM imgList";
$result = mysql_query($sql);

$msg = array(
    'imgItem' =>array(),
    'success' =>'0'
); 

if(!empty($result)){
    $i = 0;
    while($rows = mysql_fetch_array($result)){
        $msg['imgItem'][$i] = $rows['imgUrl'];
        $i++;
    }
}
$msg['success'] = 1;
echo json_encode($msg);
?>