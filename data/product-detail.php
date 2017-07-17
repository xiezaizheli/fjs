<?php
  /* 根据产品ID。返回产品的详情
    请求参数：
      pid-产品ID，必需
    输出结果：
      {
        "pid": 1,
        "title":"xxx",
        ...
      }
  */
   @$pid = $_REQUEST['pid'] or die('{"code":"2","message","pid required"}');

   require 'init.php';

   $sql = "SELECT * from fjs_product WHERE pid='$pid'";
   if(fetchAssoc($sql)){
      $output = fetchAssoc($sql);
   }

   echo json_encode($output);
?>