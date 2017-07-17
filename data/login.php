<?php
   /*验证用户名和密码
     请求参数：phone 和 upwd
     输出结果：data{
      uid, 用户ID
      phone,  用户手机号
      upwd,  用户密码
      code, 1
     } 或者 code:400
   */
   @$phone = $_REQUEST['phone'] or die('{"code":"2","msg":"phone required"}');
   @$upwd = $_REQUEST['upwd'] or die('{"code":"2","msg":"upwd required"}');

   require 'init.php';

   $sql = "SELECT * FROM fjs_user WHERE phone='$phone' AND upwd='$upwd'";
   $row = fetchAssoc($sql);

   if($row){
     $output['code'] = 1;
     $output['uid'] = intval($row['uid']);
     $output['phone'] = $row['phone'];
     $output['upwd'] = $row['upwd'];
   }else{
    $output['code']=400;
   }

   echo json_encode($output);
?>