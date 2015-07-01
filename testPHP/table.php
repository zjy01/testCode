<?php
/**
 * Created by PhpStorm.
 * User: zjy
 * Date: 2015/7/1
 * Time: 1:06
 */

class table {
    public $table;
    public $attr;
    public $query;
    public $where=1;
    function __construct($table=''){
        $this->table=$table;
    }
    function select($attr='*'){
        $this->attr=$attr;
        $this->query='select';
        return $this;
    }
    public function insert($attr=array()){
        $this->attr=$attr;
        $this->query='insert';
        return $this;
    }
    public function update($attr=array()){
        $this->attr=$attr;
        $this->query='update';
        return $this;
    }
    public function delete(){
        $this->query='delete';
        return $this;
    }
    public function where($where){
        $this->where=$where;
        return $this;
    }
    public function sql(){
        switch($this->query){
            case 'insert':
                $tuple='';
                $value='';
                foreach($this->attr as $assoc=>$val){
                    $tuple.=$assoc.",";
                    $value.="\'".$val."\'".",";
                }
                $tuple=substr($tuple,0,-1);
                $value=substr($value,0,-1);
                $sql="insert into ".$this->table." (".$tuple.") values (".$value.")";
                if(mysql_query($sql)){
                    return mysql_insert_id();
                }
                else{
                    return false;
                }
                break;
            case 'select':
                $sql="select ".$this->attr." from ".$this->table." where ".$this->where;
                if($re=mysql_query($sql)){
//                    $r=0;
                    while($result=mysql_fetch_assoc($re)){
                        $r[]=$result;
                    }
                    return $r;
                }
                else{
                    return false;
                }
            default:return false;
        }
    }
}