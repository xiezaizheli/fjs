<?php
  /* 根据产品ID。返回产品的详情
    请求参数：
      nid-产品ID，必需
    输出结果：
      {
        "nid": 1,
        "title":"xxx",
        ...
      }
  */
   @$nid = $_REQUEST['nid'] or die('{"code":"2","message","nid required"}');

   require 'init.php';

   $sql = "SELECT * from fjs_news WHERE nid='$nid'";
   if(fetchAssoc($sql)){
      $output = fetchAssoc($sql);
   }

   echo json_encode($output);
?>