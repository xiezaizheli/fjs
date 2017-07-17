<?php
  /*图片验证码：php动态生成*/
  session_start();
  header("Cache-Control:no-cache");
  header('Content-Type:image/png');

  // 1. 设置验证码图片大小的函数,imagecreatetruecolor(int $width,int $height)
  $image = imagecreatetruecolor(100,30);

  // 2. 设置验证码颜色 imagecolorallocate($image,int $red,int $green,int $blue)
  $color = imagecolorallocate($image,rand(150,230),rand(150,230),rand(150,230));

  // 3. 区域填充imagefill  ($image, int $x, int $y, int $color)
  imagefill($image,0,0,$color);

  // 4. 开始绘制4个随机的文字或数字
    $captcha_code = "ABCDEFGHJKMNPQRSTWXY3456789";
    for($i=0;$i<4;$i++){
      $fontsize = 10; //设置字体大小
      $fontcolor = imagecolorallocate($image, rand(0,120),rand(0,120), rand(0,120));//  //设置字体颜色，随机颜色,0-120深颜色
      $fontcontent = $captcha_code[rand(0,strlen($captcha_code)-1)];//设置数字或文字
      $captcha_code .= $fontcontent; //连续定义变量
      $x = ($i*100/4)+rand(5,10);  //设置坐标
      $y = rand(5,10);
      imagestring($image,$fontsize,$x,$y,$fontcontent,$fontcolor);
    }
    $_SESSION['authcode'] = $captcha_code;

    // 5. 增加干扰元素，设置雪花点
    for( $i = 0 ; $i < 100 ; $i++ ){
      $pointcolor = imagecolorallocate($image,rand(50,200), rand(50,200), rand(50,200));//设置点的颜色，50-200颜色比数字浅，不干扰阅读
      imagesetpixel($image, rand(1,99), rand(1,29), $pointcolor); //imagesetpixel — 画一个单一像素
    }
    // 6. 增加干扰元素，设置横线
    /*for( $i = 0 ; $i < 4 ; $i++ ){
      $linecolor = imagecolorallocate($image,rand(80,220), rand(80,220),rand(80,220));  //设置线的颜色
      imageline($image,rand(1,99), rand(1,29),rand(1,99), rand(1,29),$linecolor);      //设置线，两点一线
    }*/

    // 7. imagepng() 建立png图形函数
    imagepng($image);

    // 8.imagedestroy() 结束图形函数 销毁$image
    imagedestroy($image);
?>