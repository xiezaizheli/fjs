<?php
  /*按照发布时间逆序显示新闻列表
    请求参数，请求的页码pageNum。默认为1，pageSize=10
    输出结果：data={
      pageNum:请求的页码，
      pageSize:每页显示的条数，
      pageCount:总页数
      totalRecord：总条数，
      data:{},{},数据
    }*/
    @$pageNum = $_REQUEST['pageNum'] or $pageNum=1;
    @$pageSize = $_REQUEST['pageSize'] or $pageSize=10;
    require 'init.php';

    //请求页码和显示条数
    $output['pageNum'] = intval($pageNum);
    $output['pageSize'] =intval($pageSize);

    //获得总条数
    $sql= "SELECT COUNT(*) FROM fjs_info";
    $output['totalRecord'] = intval(fetchRow($sql)[0]);

    //总页数=总条数/每页显示的条数，totalRecord/pageSize
    $output['pageCount'] =ceil(($output['totalRecord'])/($output['pageSize']));

    //读取当前页中的内容
    $start = ($output['pageNum']-1)*$output['pageSize']; //从哪一行开始读取
    $count = $output['pageSize'];
    $sql = "SELECT * FROM fjs_info ORDER BY pubTime DESC LIMIT $start,$count";
    $output['data'] = fetchAll($sql);

    echo json_encode($output);
?>