"use strict";

var financeDetail = {
  pid: null,//当前产品的pid值
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("理财专区");
    });
    $(".footer").load('data/footer.html');
    this.launchAjax();//发起异步请求

    //detail-info的内容切换
    $(".detail-info-title").on("click", "li", function () {
      var index = $(this).index();
      $(this).addClass("active").siblings().removeClass("active");
      $('.detail-content').children().eq(index).show().siblings().hide();
      console.log(index);
    });
  },
  launchAjax: function () {
    this.pid = (window.location.href).split("=")[1];
    $.ajax({
      type: 'GET',
      url: 'data/product-detail.php',
      dataType: 'json',
      data: {pid: this.pid},
      success: function (d) {
        this.updateView(d);
      }.bind(this)
    });
  },
  updateView: function (d) {
    //1. 异步加载标题部分
    var titleHtml = ' <i class="' + d.subType + '">' + d.subTypeTitle + '</i><span>' + d.subject + '</span><b>16112100025223</b>';
    $(".pd-title").html(titleHtml);

    //2.异步加载主体内容
    var dlHtml = '<li class="w175"><p class="mb-20">标的总额（元）</p><strong>' + d.totalAmount + '</strong><p class="left-line"></p></li><li class="w175"><p class="mb-20">预期年化收益率</p><strong class="c-red">' + d.yearRate + '<b>%</b></strong><p class="left-line"></p> </li> <li class="w175"> <p class="mb-20">投资期限（元）</p> <strong>' + d.investTime + '</strong> <p class="left-line"></p> </li> <li class="w175"> <p class="mb-20">投资进度</p> <canvas id="my-canvas" width="50" height="50"></canvas> </li>';
    $('.pd-left1').html(dlHtml);
    this.bulidCanvas();//绘制canvas
  },
  bulidCanvas: function () {
    var c1 = document.getElementById("my-canvas");
    var ctx = c1.getContext("2d");
    var deg = 0;
    //绘制路径
    var timer = setInterval(function () {
      //绘制之前要清除所有内容，绘制外边的背景椭圆
      ctx.clearRect(0, 0, 50, 50);
      ctx.beginPath();
      ctx.arc(25, 25, 20, 0, 2 * Math.PI);
      ctx.strokeStyle = "#ebebeb";
      ctx.lineWidth = 4;
      ctx.stroke();
      //绘制图片
      ctx.beginPath();
      deg += 10;
      ctx.arc(25, 25, 20, -Math.PI / 2, deg * Math.PI / 180 - Math.PI / 2);
      ctx.strokeStyle = "#F5564B";
      ctx.stroke();
      if (deg >= 360) {
        clearInterval(timer);
      }
      //绘制文本
      var txt = Math.floor(deg / 360 * 100) + "%";
      ctx.textBaseline = "top";
      ctx.font = "12px microsoft yahei";
      var w = ctx.measureText(txt).width;
      ctx.fillText(txt, 25 - w / 2, 25 - 12 / 2);
    }, 40);
  }
};
financeDetail.myBinds();