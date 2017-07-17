"use strict";

var finance = {
  pageNum: null,//当前页码
  pageSize: 5,
  type: 1,
  index: 0,//当前点击的页码下标
  count: 0,//总页数
  myBinds: function () {//所有事件绑定
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("理财专区");
    });
    this.launchAjax(1);//页面加载完成，异步加载内容
    this.panigation();//分页功能
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
  },
  launchAjax: function (pageNum) {
    $.ajax({
      type: 'GET',
      url: 'data/product-select.php',
      dataType: 'json',
      data: {pageNum: pageNum, pageSize: this.pageSize, type: this.type},
      success: function (pager) {
        this.updateView(pager);
      }.bind(this)
    });
  },
  updateView: function (pager) {
    //1. 解析服务器端的json数据，转换为HTML片段，追加到页面中
    var html = '';
    $.each(pager.data, function (i, p) {
      html += '<tr data-pid="' + p.pid + '"><td class="project-name"><i class="icon ' + p.subType + '">' + p.subTypeTitle + '</i><span>' + p.subject + '</span></td><td><span class="font-30 c-red-pink">' + p.yearRate + '</span><span class="font-18 c-red-pink">%</span></td><td>' + p.totalAmount + '</td><td>' + p.investTime + '天</td><td><img src="' + p.cooper + '"></td><td class="project-charc"><span></span>' + p.subCharc + '<span></span>' + p.subCharc1 + '</td><td><canvas id="my-canvas" width="50" height="50"></canvas></td><td class="project-state"><span>' + p.state + '</span></td></tr>';
    });
    $(".market-list tbody").html(html);
    $('.market-list tbody tr').click(function () {
      var pid = $(this).data("pid");
      location.href = "finance-detail.html?pid=" + pid;
    });

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
  }
};
finance.myBinds();
