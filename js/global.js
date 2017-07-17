"use strict";

/*  功能点1：异步加载头尾*/
$(function () {
  $(".footer").load('data/footer.html');
});


function main() {
  /* 功能点1：设置loan里面的href的值  */
  $("#net").on("click", ".goto-loan", function () {
    if (sessionStorage.uid) {
      $(this).attr("href",'loan.html');
    } else {
      $(this).attr("href",'login.html');
    }
  });

  /*功能点2：用户名登录检查*/
  function loginExists(){
    if(sessionStorage.uid){//用户已经登录
        var html ='<li>您好，'+sessionStorage.phone+'！</li><li class="messages"><a href="#">消息[ 0 ]</a></li><li><a href="#">[ 充值 ]</a></li><li class="h-quit"><a href="index.html">[ 安全退出 ]</a></li>';
        $("#h-left").html(html);
        $(".h-quit").click(function () {
          sessionStorage.removeItem('uid');//清除用户登录记录
          sessionStorage.removeItem('phone');
          sessionStorage.removeItem('uname');
        })
      }else{//用户未登录
        var html ='<li>您好，欢迎来到房金所！</li><li><a href="register.html">[ 注册 ]</a></li><li><a href="login.html">[ 登录 ]</a></li>';
        $("#h-left").html(html);
    }
  }
  loginExists();
}

/*   功能点3：时间格式化  */
function dateFormat(time, sign1, sign2) {
  var t = new Date(time);
  //如果月份和日期是0~9,前面补0
  var tf = function (i) {
    return i > 9 ? i : "0" + i
  };
  var year = t.getFullYear();
  var month = tf(t.getMonth() + 1);
  var date = tf(t.getDate());
  var hours = tf(t.getHours());
  var minute = tf(t.getMinutes());
  var sec = tf(t.getSeconds());
  return year + sign1 + month + sign1 + date + " " + hours + sign2 + minute + sign2 + sec;
}

/*   功能点4：当点击某个二级页的时候，所在导航项高亮显示  */
function navText(text) {
  $(".nav li").each(function () {
    var thisText = $(this).children("a").text();
    if (text == thisText) {
      $(this).addClass("cur");
    }
  });
}

/*  功能点5： jquery的text-slider效果  */
$.fn.textSlider = function (settings) {
  settings = jQuery.extend({
    speed: "normal",
    line: 2,
    timer: 3000
  }, settings);
  return this.each(function () {
    $.fn.textSlider.scllor($(this), settings);
  });
};
$.fn.textSlider.scllor = function ($this, settings) {
  var ul = $("ul:eq(0)", $this);
  var timerID;
  var li = ul.children();
  var liHight = $(li[0]).height();
  var upHeight = 0 - settings.line * liHight;//滚动的高度；
  var scrollUp = function () {
    ul.animate({marginTop: upHeight}, settings.speed, function () {
      for (var i = 0; i < settings.line; i++) {
        ul.find("li:first", $this).appendTo(ul);
      }
      ul.css({marginTop: 0});
    });
  };
  var autoPlay = function () {
    timerID = window.setInterval(scrollUp, settings.timer);
  };
  var autoStop = function () {
    window.clearInterval(timerID);
  };
  //事件绑定
  ul.hover(autoStop, autoPlay).mouseout();
};

/*function navText() {
 var urlStr = location.href;
 $(".nav>li>a").each(function () {
 if (urlStr.lastIndexOf($(this).attr("href")) != -1 && $(this).attr("href")!="") {
 $(this).parent().addClass("cur").siblings().removeClass("cur");
 }
 });
 }*/

/* 对象不支持bind方法 */
if (!Function.prototype.bind) {
  Function.prototype.bind = function(obj) {
    var _self = this,args = arguments;
    return function() {
      _self.apply(obj, Array.prototype.slice.call(args, 1));
    }
  }
}


