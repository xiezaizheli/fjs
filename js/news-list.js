"use strict";

var newsList={
  pageNum:null,
  pageSize:10,
  index: 0,//当前点击的页码下标
  count: 0,//总页数
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
    });
    this.launchAjax(1);//页面加载完成，异步加载内容
    this.panigation();
  },
  launchAjax: function (pageNum) {
    $.ajax({
      type: 'GET',
      url: 'data/news-select.php',
      dataType: 'json',
      data: {pageNum: pageNum, pageSize: this.pageSize},
      success: function (pager) {
        this.updateView(pager);
        console.log(this)
      }.bind(this)
    });
  },
  updateView: function (pager) {
    //1. 解析服务器端的json数据，转换为HTML片段，追加到页面中
    var html = '';
    $.each(pager.data, function (i, p) {
      var time = dateFormat(parseInt(p.pubTime), "-", ":");
      html +='  <li><span class="circle"></span><a href="news-detail.html?nid='+p.nid+'">'+p.title+'</a> <span class="time">'+time+'</span> </li>'
    });
    $(".notice-list").html(html);

    //2. 动态创建分页条中的内容
    var pageHtml = '<li><a href="prev-page">上一页</a></li>';
    for (var i = 0; i < pager.pageCount; i++) {
      var count = i + 1;
      pageHtml += '<li><a href="">' + count + '</a></li>';
    }
    pageHtml += '<li><a href="next-page">下一页</a></li>';
    $(".pages").html(pageHtml);
    $(".pages a").eq(pager.pageNum).addClass("cur").siblings().removeClass("cur");
    if (pager.pageNum == 1) {
      $(".pages :first>a").addClass("cur");
    }
    if (pager.pageNum == pager.pageCount) {
      $(".pages :last").addClass("cur");
    }

    //3. 获得总页数，以便后面的分页功能
    this.count = pager.pageCount;
  },
  panigation: function () {//分页功能
    $(".pages").on('click', 'li>a', function (e) {
      e.preventDefault();
      this.index = $(e.target).parent().index();
      if (this.index === 0) {//上一页
        if (this.pageNum == 1) {
          return;
        }
        this.pageNum--;
      } else if (this.index == this.count + 1) {
        if (this.pageNum == this.count) {
          return;
        }
        this.pageNum++;
      } else {
        this.pageNum = this.index;
      }
      this.launchAjax(this.pageNum)
    }.bind(this));
  }
};
newsList.myBinds();
