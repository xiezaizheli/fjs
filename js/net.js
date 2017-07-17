"use strict";

var net = {
  pageNum: null,//当前页码
  pageSize: 7,//每页显示条数
  type: 2,//类型，1：理财专区 2：投资项目 3.债权转让
  count: 0,//总页数
  index: 0,//当前点击的页码的下标
  myBinds: function () {//所有事件绑定
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("网贷专区");
    });
    this.launchAjax(1, 2);//页面加载完成，异步加载
    this.panigation();//分页功能
    this.toggleType();//点击market-name切换type
  },
  toggleType: function () {//点击market-name切换type
    $(".market-name").on("click", "li", function (e) {
      this.type = $(e.target).index() === 0 ? 2 : 3;
      $(e.target).addClass('cur').siblings().removeClass('cur');
      this.launchAjax(1, this.type);
    }.bind(this));
  },
  panigation: function () {//分页功能
    $(".pages").on("click", "li>a", function (e) {
      e.preventDefault();
      this.index = $(e.target).parent().index();
      if (this.index === 0) {
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
      this.launchAjax(this.pageNum, this.type);
    }.bind(this));
  },
  launchAjax: function (pageNum, type) {//发起异步请求
    $.ajax({
      type: 'GET',
      url: 'data/product-select.php',
      dataType: 'json',
      data: {pageNum: pageNum, pageSize: this.pageSize, type: type},
      success: function (pager) {
        this.updateView(pager);
      }.bind(this)
    });
  },
  updateView: function (pager) {
    //1. 解析服务器端的json数据，转换为HTML片段，追加到页面中
    var html = '';
    $.each(pager.data, function (i, p) {
      html += '<tr data-pid="'+p.pid+'"><td class="project-name"><i class="icon ' + p.subType + '">' + p.subTypeTitle + '</i><span>' + p.subject + '</span></td><td><span class="font-30 c-red-pink">' + p.yearRate + '</span><span class="font-18 c-red-pink">%</span></td><td>' + p.totalAmount + '</td><td>' + p.investTime + '天</td><td><img src="' + p.cooper + '"></td><td class="project-charc"><span></span>' + p.subCharc + '<span></span>' + p.subCharc1 + '</td><td><canvas id="my-canvas" width="50" height="50"></canvas></td><td class="project-state"><span>' + p.state + '</span></td></tr>';
    });
    $(".market-list tbody").html(html);
    $('.market-list tbody tr').click(function () {
      var pid = $(this).data("pid");
      location.href = "finance-detail.html?pid="+pid;
    });

    //2. 异步加载分页内容
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
net.myBinds();