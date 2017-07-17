"use strict";

var productIntro={
  myBinds: function () {
    $("#header-box").load("data/header.html", function () {//异步加载页头
      main();
      navText("产品介绍");
    });
  }
};
productIntro.myBinds();