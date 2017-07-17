"use strict";

/*  功能点1：轮播广告   */
$.fn.carousel = function () {
  //广告图片数组
  var imgs = [
    {"i": 0, "img": "images/index/banner_01.jpg", "link": "#"},
    {"i": 1, "img": "images/index/banner_02.jpg", "link": "#"},
    {"i": 2, "img": "images/index/banner_03.jpg", "link": "#"}
  ];
  var slider = {
    timer: null,//保存自动轮播的定时器序号
    $imgs: null,//保存轮播的的ul li的所有背景图片
    $num: 0,//当前图片的最大下标
    cur: 0,//保存轮播的当前图片的下标
    $controls: null,//保存当前控制轮播的小圆圈
    canAuto: true,//保存是否可启动自动轮播
    WAIT: 5000,
    init: function () {
      this.$num = imgs.length - 1;
      //调用updateView方法
      this.updateView();
      //调用所有事件
      this.myBind();
    },
    slider: function (currImg, nextImg) {//重构上一张和下一张共有的部分
      this.$imgs.eq(currImg).css({"z-index": "10"}).stop().fadeOut();
      this.$imgs.eq(nextImg).css({"z-index": "20"}).stop().fadeIn();
      this.$controls.eq(nextImg).addClass("active").siblings().removeClass("active");
    },
    sliderNext: function () {//下一张
      if (this.cur < this.$num) {
        this.slider(this.cur, this.cur + 1);
        this.cur++;
      } else {
        this.slider(this.cur, 0);
        this.cur = 0;
      }
    },
    sliderPrev: function () {//上一张
      if (this.cur > 0) {
        this.slider(this.cur, this.cur - 1);
        this.cur--;
      } else {
        this.slider(this.cur, this.$num);
        this.cur = this.$num;
      }
    },
    autoMove: function () {//启动自动轮播
      this.timer = setInterval(this.sliderNext.bind(this), this.WAIT);
    },
    myBind: function () { //所有事件的绑定
      this.autoMove();//调用自动轮播
      $("#banner").hover( //当鼠标移入banner区时，停止轮播,当鼠标进入时继续轮播
        function () {//进入时停止播放，停止计时器，清除timer
          clearInterval(this.timer);
          this.timer = null;
          this.canAuto = false;
        }.bind(this),
        function () {//移除时重新启动自动轮播，
          this.canAuto = true;
          this.autoMove();
        }.bind(this)
      );
      //单击底部的indicators时，选中对应的图片
      $("#banner .indicator span").mouseover(this, function (e) {
        //on(events,[selector],[data],fn),  e.data就是当前的slider对象
        var now = $(this).index();
        if (e.data.cur != now) {
          e.data.slider(e.data.cur, now);
          e.data.cur = now;
        }
      });
    },
    updateView: function () {
      //动态生成页面，包括ul,左右箭头，底部的小圆圈
      var html = "" + '<ul>';
      $.each(imgs, function (i, p) {
        html += '<li style="background-image: url(' + p.img + ')"><a class="link" href="' + p.link + '"></a></li>';
      });
      html += '</ul><div class="indicator">';
      for (var i = 0; i <= this.$num; i++) {
        html += '<span></span>';
      }
      html += '</div>';
      $("#banner").prepend(html);
      $("#banner").on("click", 'ul li a', function () {
        sessionStorage['productPid'] = $(this).attr("href").split("=")[1];
      });
      $(".indicator span:first-child").addClass("active");
      this.$imgs = $("#banner ul li");
      this.$controls = $("#banner .indicator span");
    }
  };
  return slider.init();
};

var indexDetail = {
  proType: 1,//产品类型
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("首页");
    });
    $("#banner").carousel();//启动轮播广告
    $(".owl-carousel").owlCarousel({//合作伙伴部分的轮播，使用的是owl-carousel插件
      items: 7,
      navigation: true,
      navigationText: [
        "<i class='icon-chevron-left'></i>",
        "<i class='icon-chevron-right'></i>"
      ]
    });
    this.launchNewsAjax();//异步加载新闻
    this.launchInfoAjax();//异步加载资讯
    this.launchProAjax(1);//页面加载完成之后异步加载内容
    this.toggleType();//点击span异步加载内容
    this.loginExitst();//用户名检查
  },
  launchNewsAjax: function () {//新闻部分发起异步请求
    $.ajax({
      type: 'GET',
      url: 'data/news-select.php',
      data: {pageNum: 1, pageSize: 20},
      dataType: 'json',
      success: function (news) {
        this.updateNewsView(news);
      }.bind(this)
    })
  },
  launchInfoAjax: function () {//资讯部分发起异步请求
    $.ajax({
      type: 'GET',
      url: 'data/information-select.php',
      data: {pageNum: 1, pageSize: 4},
      dataType: 'json',
      success: function (info) {
        this.updateInfoView(info);
      }.bind(this)
    })
  },
  updateNewsView: function (news) {//更新news界面
    var html = '';
    $.each(news.data, function (i, n) {
      var time = dateFormat(parseInt(n.pubTime), "-", ":");
      html += '<li><a href="news-detail.html?nid=' + n.nid + '"><span class="notice-content">' + n.title + '</span><span>' + time + '</span></a></li>';
    });
    $(".notice-list").html(html);//插入公告
    $("#notice-slider").textSlider({line: 1, speed: 500, timer: 3000});//文字滚动播放
  },
  updateInfoView: function (info) {//更新information界面
    var html = '';
    $.each(info.data, function (i, n) {
      html += '<li><span class="bg-black"></span><a href="">' + n.title + '</a></li>';
    });
    $(".fast-news-list").html(html);//插入公告
  },
  launchProAjax: function (type) {
    $.ajax({
      type: 'GET',
      url: 'data/product-select.php',
      data: {pageNum: 1, pageSize: 5, type: type},
      dataType: 'json',
      success: function (pro) {
        this.updateProView(pro);
      }.bind(this)
    })
  },
  updateProView: function (pro) {//更新产品界面
    var html = '';
    $.each(pro.data, function (i, p) {
      html += '<tr data-pid="' + p.pid + '"><td class="project-name"><i class="icon ' + p.subType + '">' + p.subTypeTitle + '</i><span>' + p.subject + '</span></td><td><span class="font-30 c-red-pink">' + p.yearRate + '</span><span class="font-18 c-red-pink">%</span></td><td>' + p.totalAmount + '</td><td>' + p.investTime + '天</td><td><img src="' + p.cooper + '"></td><td class="project-charc"><span></span>' + p.subCharc + '<span></span>' + p.subCharc1 + '</td><td><canvas id="my-canvas" width="50" height="50"></canvas></td><td class="project-state"><span>' + p.state + '</span></td></tr>';
    });
    $("#pro-list>tbody").html(html);
    $('#pro-list tbody tr').click(function () {
      var pid = $(this).data("pid");
      location.href = "finance-detail.html?pid=" + pid;
    });
  },
  toggleType: function () {//点击span异步加载底部的内容
    $("#toggle-pro").on("click", "span", function (e) {
      this.proType = $(e.target).index() === 0 ? 1 : 2;
      $(e.target).addClass('active').siblings().removeClass("active");
      if (this.proType === 1) {
        $("#pro-list .fin").show().siblings().hide();
      } else {
        $("#pro-list .credit").show().siblings().hide();
      }
      this.launchProAjax(this.proType);
    }.bind(this));
  },
  loginExitst: function () {//用户名检查
    if(sessionStorage.uid){
      var html='<p class="user-in">您好，'+sessionStorage.phone+'</p><p class="acc-balance">账户余额：<b>0.00元</b></p><a class="login" href="#">查看我的账户</a>';
      $("#banner .total-deal").html(html);
      $('#banner .piggy-img-enter').attr("href","main.html");
    }else{
      var html='<a class="register" href="register.html">立即注册</a><p class="login">已有账号&nbsp;&nbsp;<a href="login.html">点击登录</a></p>';
      $("#banner .total-deal").append(html);
      $('#banner .piggy-img-enter').attr("href","login.html");
    }
  }
};
indexDetail.myBinds();
