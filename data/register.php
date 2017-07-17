<?php
  /*注册新用户，
   请求参数：
      uname-用户名
      upwd-密码
      phone-电话号码
    输出结果：
    {"code":1,"uid":3,"uname":"test"}或{"code":500}
  */
  @$phone = $_REQUEST['phone'] or die('{"phone":"required"}');
  @$upwd = $_REQUEST['upwd'] or die('{"upwd":"required"}');
  require 'init.php';

  $sql = "INSERT INTO fjs_user VALUES(NULL,'$phone','$upwd')";
  $result = mysqli_query($conn,$sql);

  if($result){
    $output['code'] =1;
    $output['uid'] =intval(mysqli_insert_id($conn));
    $output['phone'] = $phone;
  }else{
    $output['code'] =500;
  }

  echo json_encode($output);
?>