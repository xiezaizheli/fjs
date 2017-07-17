"use strict";

var newsDetail={
  nid: null,//当前产品的nid值
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
    });

    //根据内容添加cur
    $(".a-left").find("a").removeClass("cur");
    $("a:contains('官方公告')").addClass("cur");

    this.launchAjax();//发起异步请求
  },
  launchAjax: function () {
    this.nid = (window.location.href).split("=")[1];
    console.log(this.nid)
    $.ajax({
      type: 'GET',
      url: 'data/news-detail.php',
      dataType: 'json',
      data: {nid: this.nid},
      success: function (n) {
        this.updateView(n);
      }.bind(this)
    });
  },
  updateView: function (n) {
    var time = dateFormat(parseInt(n.pubTime), "-", ":");
    var html ='<h3 class="a-title"><i class="icon-notice"></i>公告详情<i class="icon-line"></i></h3><div class="notice-content"> <h2>'+n.title+'</h2> <p class="notice-time">'+time+'</p> <div class="notice-txt">'+n.content+'</div></div>';
    $(".a-right").html(html);
  }
};
newsDetail.myBinds();
