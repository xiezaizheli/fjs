/*  新闻表，资讯表，网贷产品表，资讯，用户表，账户交易记录，*/
SET NAMES UTF8;
DROP DATABASE IF EXISTS fangjs;
CREATE DATABASE fangjs CHARSET=UTF8;
USE fangjs;

/* 用户表 */
CREATE TABLE fjs_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  phone VARCHAR(32), #手机号
  upwd VARCHAR(32)   #密码
);

INSERT INTO fjs_user VALUES
(NULL,'15000734841','123456'),
(NULL,'15000714643','321654');

/*  新闻表 */
CREATE TABLE fjs_news(
  nid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),       #标题
  pubTime BIGINT,          #发布时间
  content VARCHAR(8000)   #公告详情
);

INSERT INTO fjs_news VALUES(NULL,'热烈庆贺房金所荣获“《投资者报》互联网金融领先企业十强”','1484035870000','<div class="notice-txt"><p>第二届《投资者报》2016“互联网金融企业责任榜单”年度评选结果公布，房金所从近300家知名互联网金融企业中脱颖而出，荣获“《投资者报》互联网金融领先企业十强”。</p><p>此次评选是由投资者报主办，在评选活动推出后，近300家互金企业递交了相关资料，《投资者报》组织相关专家进行认真初审，从中选出90家入围企业，再经过微信投票综合考量得出最终30强互联网金融企业，分别包括责任、领先和创新企业各10强。</p><p>此次获奖，房金所网上微信用户投票的权重占比高，某种程度上也是投资用户自己选出的口碑企业，是对房金所多年来坚持用户为本、严格风控的肯定。房金所获此殊荣，也表明了业界及投资者对房金所平台安全性的充分认可。</p></div><p class="tr">房金所</p>');

/*  资讯表 */
CREATE TABLE fjs_info(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(64),    #标题
  title1 VARCHAR(128),  #副标题
  pubTime BIGINT        #发布时间
);

INSERT INTO fjs_info VALUES(NULL,'房金所：春节将至 投资以安全为先','聪明的用户，往往会在年前就做好获得额外收益的安排，比如靠互联网金融。','1484220362000');

/*  理财产品 */
CREATE TABLE fjs_product(
  fid INT PRIMARY KEY AUTO_INCREMENT,
  type INT(32),               #项目类型，1：理财专区 2：投资项目 3.债权转让
  subject VARCHAR(64),        #项目名称
  yearRate FLOAT(10),         #预期年化收益率
  totalAmount INT(10),        #标的总额（元）
  investTime INT(10),         #投资期限
  cooper VARCHAR(128),        #合作机构
  subCharc VARCHAR(128),      #项目特点
  investProgress INT(10),     #投资进度
  state VARCHAR(32)           #状态
);

INSERT INTO fjs_finance VALUES
(NULL,'1','融通宝系列产品第55期','9.20','2,000,000','294','images/product-intro/wjs_logo.png','100%','已结束'),
(NULL,'1','融通宝系列产品第54期','9.20','2,000,000','295','images/product-intro/wjs_logo.png','100%','已结束');


/* net-detail详情 */
CREATE TABLE fjs_net_detail(
  ndid INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,  #理财产品ID
  loanName VARCHAR(10),      #借款人信息
  loanAge INT(10),           #借款人年龄
  loanPhone VARCHAR(32),     #借款人手机号
  loanSex VARCHAR(10),       #借款人性别
  loanTodo VARCHAR(10),      #借款用途
  idCard VARCHAR(32)         #身份证
);
