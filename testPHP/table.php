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
    public $where;
    function __construct($table=''){
        $this->table=$table;
        $this->attr=null;
        $this->query=null;
        $this->where=1;
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
        $returnValue='';
        switch($this->query){
            case 'insert':
                $tuple='';
                $value='';
                foreach($this->attr as $assoc=>$val){
                    $tuple.=$assoc.",";
                    $value.="'".$val."'".",";
                }
                $tuple=substr($tuple,0,-1);
                $value=substr($value,0,-1);
                $sql="insert into ".$this->table." (".$tuple.") values (".$value.")";
                if(mysql_query($sql)){
                    $returnValue= mysql_insert_id();
                }
                else{
                    $returnValue= mysql_error();
                }
                break;
            case 'select':
                $sql="select ".$this->attr." from ".$this->table." where ".$this->where;
                if($re=mysql_query($sql)){
                    $r=array();
                    while($result=mysql_fetch_assoc($re)){
                        $r[]=$result;
                    }
                    if(count($r)==0){
                        $returnValue= 0;
                    }
                    else{
                        $returnValue= $r;
                    }
                }
                else{
                    $returnValue= mysql_error();
                }
                break;
            case 'update':
                $tuple='';
                foreach($this->attr as $assoc=>$val){
                    $tuple.=$assoc."='$val',";
                }
                $tuple=substr($tuple,0,-1);
                $sql="update ".$this->table." set ".$tuple." where ".$this->where;
                if(mysql_query($sql)){
                    if(mysql_affected_rows()>0){
                        $returnValue=true;
                    }
                    else{
                        $returnValue =mysql_error();
                    }
                }
                else{
                    $returnValue =mysql_error();
                }
                break;
            case 'delete':
                $sql="delete from ".$this->table." where ".$this->where;
                if(mysql_query($sql)){
                    if(mysql_affected_rows()>0){
                        $returnValue=true;
                    }
                    else{
                        $returnValue =mysql_error();
                    }
                }
                else{
                    $returnValue =mysql_error();
                }
                break;
            default:$returnValue= false;
        }
        $this->__construct($this->table);
        return $returnValue;
    }
}