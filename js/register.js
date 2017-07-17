var login = {
  upwd:null,
  upwd2:null,
  phone:null,
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("我的账户");
    });
    $("#tel").blur(function () {this.phoneCheck();}.bind(this));//验证手机号码
    $("#upwd").blur(function () {this.upwdCheck();}.bind(this));//密码验证
    $("#upwd-confirm").blur(function () {this.upwdCheck2();}.bind(this));//重复密码验证
    //点击看不清，换张图片，重新更新php
    $(".change-pic").click(function () {
      $.ajax({
        type:'POST',
        url:'data/check-captcha.php',
        dataType:'json',
        success: function () {
          $("captcha_img").attr("href",'data/check-captcha.php');
        }
      })
    });
    //点击用户注册协议复选框时，控制注册按钮是否可用
    $(".chb input").click(this, function () {
      $("#register").prop("disabled", !$(this).prop("checked")).toggleClass("disabled");
    });
    //提交注册
    $("#register").click(function () {
      if(this.phoneCheck() && this.upwdCheck() && this.upwdCheck2()){
        $.ajax({
          type:"post",
          url:"data/register.php",
          data:{phone:this.phone,upwd:this.upwd},
          success:function(d){
            if(d.code==1){
              sessionStorage.uid= d.uid;
              sessionStorage.phone= d.phone;
              history.go(-1);
            }
          }
        });
      }
    }.bind(this));
  },
  upwdCheck: function () {//密码验证
    this.upwd= $.trim($("#upwd").val());
    var tipErr = $("#upwd").siblings(".tip-box").children(".error");
    var tipSuc = $("#upwd").siblings(".tip-box").children(".succ");
    regUpwd = /^(?![a-z0-9]+$)(?![A-Za-z]+$)[A-Za-z0-9]{6,8}$/;//6~8位，字母，数字的组合，至少包含一个大写字母和一个数字
    if (!this.upwd) {//密码为空
      tipErr.show().text("请输入您的密码");
      tipSuc.hide();
      return false;
    } else if (!regUpwd.test(this.upwd)) {//验证密码是否符合正则表达式
      tipErr.show().text("6~8位(字母，数字),至少包含一个大写字母和一个数字");
      tipSuc.hide();
      return false;
    } else {
      tipErr.hide();
      tipSuc.show();
      return true;
    }
  },
  upwdCheck2: function () {
    this.upwd2= $.trim($("#upwd-confirm").val());
    var tipErr = $("#upwd-confirm").siblings(".tip-box").children(".error");
    var tipSuc = $("#upwd-confirm").siblings(".tip-box").children(".succ");
    if (!this.upwd2) {
      tipErr.show().text("请输入您的密码");
      tipSuc.hide();
      return false;
    }
    if (this.upwdCheck()) {
      if (this.upwd != this.upwd2) {
        tipErr.show().text("两次输入的密码不一致");
        tipSuc.hide();
        return false;
      } else {
        tipErr.hide();
        tipSuc.show();
        return true;
      }
    }
  },
  phoneCheck: function () {//验证手机号码
    this.phone= $.trim($("#tel").val());
    var tipErr = $("#tel").siblings(".tip-box").children(".error");
    var tipSuc = $("#tel").siblings(".tip-box").children(".succ");
    var regPhone = /^(\+86|0086)?\s*1[34578]\d{9}$/;
    if (!this.phone) {//手机号码为空时
      tipErr.show().text("请输入您的手机号码");
      tipSuc.hide();
      return false;
    } else if (!regPhone.test(this.phone)) {//验证手机格式是否符合正则表达式
      tipErr.show().text("请输入正确的手机格式");
      tipSuc.hide();
      return false;
    } else if (this.phoneExitst(this.phone)) {//验证手机号码是否已经存在
      tipErr.show().text("此手机号已被其他用户绑定");
      tipSuc.hide();
      return false;
    } else {//验证成功
      tipErr.hide();
      tipSuc.show();
      return true;
    }
  },
  phoneExitst: function (phone) {
    var back = false;
    $.ajax({
      type: 'POST',
      url: 'data/check-phone.php',
      dataType: 'json',
      async: false,
      data: {phone: phone},
      success: function (d) {
        back = (d.code == 1 ? true : false);
      }
    });
    return back;
  },
};
login.myBinds();