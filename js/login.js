"use strict";

var login = {
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("我的账户");
    });
    $("#tel").blur(this.unameCheck);//用户名检查
    $("#upwd").blur(this.upwdCheck);//密码检查
    $("#login").click(this, function (e) {//登录检查发起异步请求
      if (e.data.unameCheck() && e.data.upwdCheck()) {
        var tel = $.trim($('#tel').val());
        var upwd = $.trim($("#upwd").val());
        $.ajax({
          type: 'POST',
          url: 'data/login.php',
          dataType: 'json',
          data: {phone: tel, upwd: upwd},
          success: function (data) {
            console.log(data);
            if (data.code == 1) {//登录成功
              sessionStorage.uid = data.uid;
              sessionStorage.phone = data.phone;
              history.go(-1);
            }else{//登录不成功
              $("#login-info").show().text("账户名或密码错误！")
            }
          }
        });
      }
    })
  },
  unameCheck: function (e) {//手机号码查验
    var tel = $.trim($('#tel').val());
    if (!tel) {//当用户名为空时
      $("#tel-tip").stop().fadeIn(500).text("手机号码不能为空");
      return false;
    } else {
      $("#tel-tip").stop().fadeOut(500);
      return true;
    }
  },
  upwdCheck: function () {//密码查验
    var upwd = $.trim($("#upwd").val());
    if (!upwd) {//当密码为空时
      $("#upwd-tip").stop().fadeIn(500).text("密码不能为空");
      return false;
    } else {
      $("#upwd-tip").stop().fadeOut(500);
      return true;
    }
  }
};
login.myBinds();
