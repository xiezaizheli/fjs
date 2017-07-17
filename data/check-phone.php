<?php
  /*
   手机号码验证：
   请求参数：phone
   输出结果：{"code":1,"message":"phone exitst"}或{"code":2,"message":"phone non-exitst"};
  */
  @$phone=$_REQUEST['phone'] or die('{"message","phone required"}');

  require 'init.php';

  $sql = "SELECT uid FROM fjs_user WHERE phone='$phone'";
  $row = fetchRow($sql);

  if($row){
    $output['code'] = 1;
    $output['message'] = 'phone exitst';
  }else{
    $output['code'] = 2 ;
    $output['message']='phone non-exitst';
  }

  echo json_encode($output);
?>