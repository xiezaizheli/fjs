<?php
  //以json格式输出
  header('Content-Type:application/json;charset=UTF-8');

  //连接数据库，执行SQL语句
  $db_url = "127.0.0.1";
  $db_user = "root";
  $db_pwd = "";
  $db_dbname = "fangjs";
  $db_port = "3306";
  $conn = mysqli_connect($db_url,$db_user,$db_pwd,$db_dbname,$db_port);
  $sql = "SET NAMES UTF8";
  mysqli_query($conn,$sql);

  //定义json对象
  $output=[];

  //定义共用的抓取所有函数
  function fetchAll($sql){
    global $conn; //声明使用外部的全局变量$conn
    $result = mysqli_query($conn,$sql);
    if($result === false){
      return 'sql err:'.$sql;
    }
    return mysqli_fetch_all($result,MYSQLI_ASSOC);
  }

  //定义共用的抓取一行，
  function fetchRow($sql){
    global $conn; //声明使用外部的全局变量$conn
    $result = mysqli_query($conn,$sql);
    if($result === false){
      return 'sql err:'.$sql;
    }
    return mysqli_fetch_row($result);
  }

  //定义共用的抓取一行，
  function fetchAssoc($sql){
    global $conn; //声明使用外部的全局变量$conn
    $result = mysqli_query($conn,$sql);
    if($result === false){
      return 'sql err:'.$sql;
    }
    return mysqli_fetch_assoc($result);
  }
?>