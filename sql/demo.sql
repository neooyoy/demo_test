/*
SQLyog Professional v12.08 (64 bit)
MySQL - 5.6.26-log : Database - demo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`demo` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `demo`;

/*Table structure for table `banner` */

DROP TABLE IF EXISTS `banner`;

CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '名字',
  `link` varchar(100) NOT NULL DEFAULT '' COMMENT '连接地址',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0不展示,1展示',
  `create_id` int(11) NOT NULL DEFAULT '0' COMMENT '创建人',
  `create_name` varchar(50) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '时间',
  `modify_id` int(11) NOT NULL DEFAULT '0' COMMENT '修改人',
  `modify_name` varchar(50) NOT NULL DEFAULT '',
  `modify_at` int(11) NOT NULL DEFAULT '0',
  `isdelete` int(11) NOT NULL DEFAULT '0' COMMENT '0未删除1删除',
  `jump_link` varchar(100) NOT NULL DEFAULT '' COMMENT '跳转连接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

/*Data for the table `banner` */

insert  into `banner`(`id`,`name`,`link`,`status`,`create_id`,`create_name`,`create_at`,`modify_id`,`modify_name`,`modify_at`,`isdelete`,`jump_link`) values (14,'main-banner-1','94a92569e8d442a4bc9e6a4ad1f99ddf.jpg',1,24,'陈俊',1467340395,0,'管理员',1467344476,1,''),(15,'main-banner-3','140b515088f64b0aa773cf2543aabc88.jpg',1,24,'陈俊',1467340403,27,'李乐',1467345831,0,''),(16,'main-banner-2','9949ea22e0d54716829f172c5075d237.jpg',1,24,'陈俊',1467340404,27,'李乐',1467345837,0,'');

/*Table structure for table `business_circle` */

DROP TABLE IF EXISTS `business_circle`;

CREATE TABLE `business_circle` (
  `business_circle_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商圈id',
  `district_id` int(11) NOT NULL DEFAULT '0' COMMENT '区域id',
  `business_circle_name` varchar(200) NOT NULL DEFAULT '' COMMENT '商圈名字',
  `is_delete` int(5) NOT NULL DEFAULT '0' COMMENT '1已删除',
  PRIMARY KEY (`business_circle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=334 DEFAULT CHARSET=utf8;

/*Data for the table `business_circle` */

insert  into `business_circle`(`business_circle_id`,`district_id`,`business_circle_name`,`is_delete`) values (1,105056,'南京西路',0),(2,105054,'漕河泾',0),(3,105054,'徐家汇',0),(6,105064,'陆家嘴',0),(8,105052,'人民广场',0),(9,105064,'张江',0),(13,105064,'竹园商贸区',0),(14,105052,'打浦桥',0),(15,105052,'外滩',0),(18,105059,'四川北路',0),(19,105052,'豫园',0),(21,105052,'南京东路',0),(22,105056,'静安寺',0),(24,105057,'长寿路',0),(25,105055,'中山公园',0),(30,105059,'北外滩',0),(31,105060,'五角场',0),(32,105060,'东外滩',0),(44,105063,'安亭',0),(45,105055,'虹桥',0),(46,105055,'北新泾',0),(47,105061,'七宝',0),(53,105035,'望京',0),(54,105035,'燕莎',0),(55,105035,'CBD',0),(56,105035,'潘家园',0),(57,105035,'奥林匹克',0),(58,105036,'东直门商业圈',0),(59,105035,'朝外',0),(60,105036,'安定门',0),(61,105036,'王府井',0),(62,105036,'新世界',0),(63,105040,'方庄',0),(64,105040,'木樨园',0),(65,105040,'玉泉营',0),(66,105037,'马连道',0),(67,105037,'西单',0),(68,105034,'学院路',0),(69,105037,'金融街',0),(70,105037,'西直门',0),(71,105034,'上地',0),(72,105034,'中关村',0),(73,105034,'万柳',0),(74,105034,'公主坟',0),(75,105040,'丽泽桥',0),(77,105034,'五棵松',0),(80,105041,'西山',0),(81,105041,'苹果园',0),(82,105043,'黄村西大街',0),(83,105035,'三元桥',0),(86,105035,'亮马桥',0),(87,105035,'三里屯',0),(88,105035,'十八里店',0),(89,105035,'双井',0),(90,105035,'团结湖',0),(92,105035,'国贸',0),(93,105035,'定福庄/管庄',0),(94,105035,'安贞/马甸',0),(95,105035,'百子湾',0),(96,105035,'北苑',0),(97,105035,'朝阳公园',0),(98,105035,'慈云寺/四惠',0),(99,105035,'大望路',0),(100,105034,'北太平庄',0),(101,105034,'紫竹桥',0),(103,105034,'远大路',0),(104,105034,'颐和园',0),(105,105034,'西山',0),(106,105034,'五道口',0),(107,105034,'蓟门桥',0),(108,105034,'航天桥',0),(109,105034,'定慧寺',0),(110,105034,'清河',0),(111,105036,'雍和宫',0),(112,105036,'东四十条',0),(113,105036,'和平里',0),(114,105036,'建国门',0),(115,105036,'朝阳门/金宝街',0),(116,105037,'德胜门',0),(117,105037,'地安门',0),(118,105037,'复兴门',0),(119,105037,'木樨地',0),(120,105036,'崇文门',0),(121,105036,'广渠门',0),(122,105036,'前门',0),(123,105036,'左安门',0),(124,105037,'宣武门',0),(125,105037,'广安门',0),(126,105037,'右安门',0),(127,105040,'科技园区',0),(128,105040,'刘家窑',0),(129,105040,'马家堡',0),(130,105043,'西红门',0),(131,105043,'亦庄',0),(132,105041,'八角',0),(133,105041,'古城',0),(134,105041,'玉泉路',0),(135,105041,'鲁谷/八宝山',0),(136,105041,'杨庄',0),(137,105044,'通州区',0),(138,105035,'朝阳其他',0),(139,105035,'亚奥',0),(140,105035,'劲松/潘家园',0),(141,105035,'朝青',0),(142,105035,'对外经贸',0),(143,105035,'北工大',0),(144,105035,'首都机场',0),(145,105035,'惠新西街',0),(146,105035,'北沙滩',0),(147,105035,'十里堡',0),(148,105035,'亚运村小营',0),(149,105035,'东大桥',0),(150,105035,'华威',0),(151,105035,'太阳宫',0),(152,105035,'垡头',0),(153,105035,'芍药居',0),(154,105035,'亚运村',0),(155,105035,'欢乐谷',0),(156,105034,'公主坟/万寿路',0),(157,105034,'海淀其他',0),(158,105034,'清华园',0),(159,105034,'农大',0),(160,105034,'苏州桥',0),(161,105034,'双榆树',0),(162,105034,'马连洼',0),(163,105034,'世纪城',0),(164,105034,'四季青',0),(165,105034,'颐和园北',0),(166,105036,'安定门/雍和宫',0),(167,105036,'东四',0),(168,105036,'灯市口',0),(169,105036,'金宝街',0),(170,105036,'朝阳门内',0),(171,105036,'天坛',0),(172,105036,'永定门',0),(173,105036,'东花市',0),(174,105036,'广渠门内',0),(175,105037,'月坛',0),(176,105037,'展览路',0),(177,105037,'甘家口',0),(178,105037,'新街口',0),(179,105037,'车公庄',0),(180,105037,'广内大街',0),(181,105037,'菜市口',0),(182,105037,'广外大街',0),(183,105037,'虎坊桥',0),(184,105037,'陶然亭',0),(185,105037,'牛街',0),(186,105037,'大栅栏',0),(187,105040,'六里桥/丽泽桥',0),(188,105040,'洋桥/木樨园',0),(189,105040,'岳各庄',0),(190,105040,'丰台其他',0),(191,105040,'六里桥',0),(192,105040,'成寿寺',0),(193,105040,'花乡',0),(194,105040,'卢沟桥',0),(195,105040,'丰台体育馆',0),(196,105040,'东高地',0),(197,105040,'西罗园',0),(198,105040,'菜户营',0),(199,105040,'草桥',0),(200,105040,'京石高速',0),(201,105040,'丽泽',0),(202,105041,'石景山区',0),(203,105043,'大兴区',0),(204,105043,'黄村北',0),(205,105043,'旧宫东',0),(206,105043,'大兴',0),(207,105043,'黄村卫星城',0),(208,105046,'昌平区',0),(209,105046,'百善镇',0),(210,105046,'龙泽',0),(211,105046,'霍营',0),(212,105046,'小汤山',0),(213,105046,'昌平县城',0),(214,105046,'沙河',0),(215,105046,'立水桥',0),(216,105046,'回龙观',0),(217,105046,'北七家',0),(218,105046,'八达岭高速',0),(219,105044,'西马庄',0),(220,105044,'乔庄',0),(221,105044,'新华大街',0),(222,105044,'八里桥市场',0),(223,105044,'北关',0),(224,105044,'武夷花园',0),(225,105044,'亦庄',0),(226,105044,'通州北苑',0),(227,105044,'潞苑南大街',0),(228,105044,'果园',0),(229,105044,'九棵树',0),(230,105044,'永顺',0),(231,105044,'梨园',0),(232,105044,'马驹桥',0),(233,105051,'门头沟',0),(234,105045,'顺义',0),(235,105047,'密云',0),(236,105042,'房山',0),(237,105049,'延庆',0),(238,105048,'怀柔',0),(239,108193,'固安',0),(240,108193,'香河',0),(241,108193,'燕郊',0),(242,108193,'涿州',0),(243,105045,'后沙峪',0),(244,105045,'马坡乡',0),(245,105045,'顺义城',0),(246,105035,'四惠',0),(247,105050,'平谷',0),(248,105035,'酒仙桥',0),(249,105062,'大场镇',0),(250,105062,'大华',0),(251,105062,'共康',0),(252,105062,'共康通河',0),(253,105062,'顾村',0),(254,105062,'淞宝',0),(255,105062,'淞南高境',0),(256,105062,'杨行',0),(257,105069,'奉贤其他',0),(258,105069,'南桥',0),(260,105059,'虹口足球场',0),(261,105059,'江湾镇',0),(262,105059,'凉城',0),(263,105059,'曲阳',0),(264,105052,'黄浦滨江',0),(265,105052,'浦西滨江',0),(267,105063,'丰庄',0),(268,105063,'嘉定城区',0),(269,105063,'嘉定新城',0),(270,105063,'江桥',0),(271,105065,'金山',0),(272,105056,'江宁路',0),(274,105056,'曹家渡',0),(275,105056,'江宁路',0),(276,105053,'打浦桥',0),(277,105053,'淮海中路',0),(278,105053,'新天地',0),(279,105061,'春申',0),(280,105061,'古美罗阳',0),(281,105061,'华漕',0),(282,105061,'金虹桥',0),(283,105061,'老闵行',0),(284,105061,'南方商城',0),(285,105061,'浦江',0),(286,105061,'莘庄',0),(287,105061,'吴泾',0),(288,105064,'八佰伴',0),(289,105064,'碧云',0),(290,105064,'川沙',0),(291,105064,'高桥',0),(292,105064,'惠南',0),(293,105064,'金桥',0),(294,105064,'康桥',0),(295,105064,'临港新城',0),(296,105064,'三林',0),(297,105064,'世博',0),(298,105064,'世纪公园',0),(299,105064,'塘桥',0),(300,105064,'外高桥',0),(301,105064,'源深洋泾',0),(302,105064,'周康',0),(303,105057,'曹杨',0),(304,105057,'甘泉宜川',0),(305,105057,'桃浦',0),(306,105057,'万里',0),(307,105057,'武宁',0),(308,105057,'长风',0),(309,105057,'长风生态商务区',0),(310,105057,'长征',0),(311,105067,'青浦其他',0),(312,105067,'青浦新城',0),(313,105067,'徐泾',0),(314,105071,'昆山',0),(315,105066,'九亭',0),(316,105066,'泗泾',0),(317,105066,'松江城区',0),(318,105054,'龙华',0),(319,105054,'南站',0),(320,105054,'田林',0),(321,105054,'万体馆',0),(322,105054,'中山公园',0),(323,105060,'鞍山',0),(324,105060,'黄兴公园',0),(325,105060,'淞南高境',0),(326,105060,'周家嘴路',0),(327,105058,'不夜城',0),(328,105058,'大宁',0),(329,105058,'彭浦',0),(330,105055,'古北',0),(331,105055,'天山',0),(332,105055,'新华路',0),(333,105061,'虹桥开发区商圈',0);

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL DEFAULT '0' COMMENT '自动增长',
  `city_name` varchar(20) NOT NULL COMMENT '城市全称',
  `short_name` varchar(15) NOT NULL COMMENT '城市简称',
  `pinyin` varchar(50) NOT NULL COMMENT '城市拼音全称',
  `standard_code` varchar(6) NOT NULL,
  `domain` varchar(50) NOT NULL COMMENT '城市二级域名，例如bj。默认与城市拼音全拼一致',
  `domain_alias` varchar(50) DEFAULT NULL COMMENT '可选的城市二级域名，例如beijing',
  `database_name` varchar(50) NOT NULL COMMENT '数据库名称',
  `province_id` int(11) NOT NULL COMMENT '城市所属省份',
  `script_index` int(11) NOT NULL COMMENT '配置文件中的数组下标',
  `display_order` int(11) NOT NULL COMMENT '显示顺序',
  `province_script_index` int(11) NOT NULL COMMENT '省里的display_order',
  `google_analytics_code` varchar(15) NOT NULL COMMENT 'google分析代码',
  `created_by` int(11) NOT NULL COMMENT '添加人用户Id',
  `created_by_name` varchar(20) NOT NULL COMMENT '添加人用户姓名',
  `created_time` int(11) unsigned NOT NULL COMMENT '添加时间',
  `modified_by` int(11) DEFAULT NULL COMMENT '最后修改人用户Id',
  `modified_by_name` varchar(20) DEFAULT NULL COMMENT '最后修改人用户姓名',
  `modified_time` int(11) unsigned DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`city_id`),
  UNIQUE KEY `city_name` (`city_name`),
  UNIQUE KEY `pinyin` (`pinyin`),
  UNIQUE KEY `domain` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='城市';

/*Data for the table `city` */

insert  into `city`(`city_id`,`city_name`,`short_name`,`pinyin`,`standard_code`,`domain`,`domain_alias`,`database_name`,`province_id`,`script_index`,`display_order`,`province_script_index`,`google_analytics_code`,`created_by`,`created_by_name`,`created_time`,`modified_by`,`modified_by_name`,`modified_time`) values (12,'北京市','北京','beijing','110000','bj','','beijing',1,0,0,0,'UA-479320-2',1,'admin',1429770774,1,'admin',1429770774),(13,'上海市','上海','shanghai','310000','sh','','shanghai',2,0,0,1,'UA-479320-3',1,'admin',1429770774,1,'admin',1429770774);

/*Table structure for table `district` */

DROP TABLE IF EXISTS `district`;

CREATE TABLE `district` (
  `district_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动增长',
  `district_name` varchar(20) NOT NULL COMMENT '行政区全称',
  `short_name` varchar(15) NOT NULL COMMENT '行政区简称',
  `pinyin` varchar(50) NOT NULL COMMENT '行政区拼音全拼',
  `location` varchar(50) DEFAULT NULL COMMENT '地标中心的经纬度',
  `city_id` int(11) NOT NULL COMMENT '行政区所属城市',
  `display_order` int(10) NOT NULL COMMENT '显示顺序',
  `created_by` int(11) NOT NULL COMMENT '添加人用户Id',
  `created_by_name` varchar(20) NOT NULL COMMENT '添加人用户姓名',
  `created_time` int(11) unsigned NOT NULL COMMENT '添加时间',
  `modified_by` int(11) DEFAULT NULL COMMENT '最后修改人用户Id',
  `modified_by_name` varchar(20) DEFAULT NULL COMMENT '最后修改人用户姓名',
  `modified_time` int(11) unsigned DEFAULT NULL COMMENT '最后修改时间',
  PRIMARY KEY (`district_id`),
  UNIQUE KEY `district_name` (`city_id`,`district_name`),
  UNIQUE KEY `pinyin` (`city_id`,`pinyin`)
) ENGINE=InnoDB AUTO_INCREMENT=108194 DEFAULT CHARSET=utf8 COMMENT='区域';

/*Data for the table `district` */

insert  into `district`(`district_id`,`district_name`,`short_name`,`pinyin`,`location`,`city_id`,`display_order`,`created_by`,`created_by_name`,`created_time`,`modified_by`,`modified_by_name`,`modified_time`) values (105034,'海淀','海淀','haidian','b116.31035775162,39.963477697991',12,1,1,'admin',1428422400,1,'admin',1428422400),(105035,'朝阳','朝阳','chaoyang','b116.4500837025,39.927533915375',12,0,1,'admin',1428422400,1,'admin',1428422400),(105036,'东城','东城','dongcheng','b116.42273855844,39.934822619936',12,3,1,'admin',1428422400,1,'admin',1428422400),(105037,'西城','西城','xicheng','b116.37286212996,39.918546724152',12,2,1,'admin',1428422400,1,'admin',1428422400),(105040,'丰台','丰台','fengtai','b116.2926573859,39.864860664573',12,6,1,'admin',1428422400,1,'admin',1428422400),(105041,'石景山','石景山','shijingshan','b116.20544598602,39.921532512728',12,9,1,'admin',1428422400,1,'admin',1428422400),(105042,'房山','房山','fangshan','b116.14911040852,39.754177928564',12,11,1,'admin',1428422400,1,'admin',1428422400),(105043,'大兴','大兴','daxing','b116.33844326734,39.742874592395',12,8,1,'admin',1428422400,1,'admin',1428422400),(105044,'通州','通州','tongzhou','b116.66344230062,39.916240615185',12,10,1,'admin',1428422400,1,'admin',1428422400),(105045,'顺义','顺义','shunyi','b116.66172544792,40.136509720807',12,12,1,'admin',1428422400,1,'admin',1428422400),(105046,'昌平','昌平','changping','b116.23554939678,40.226327467753',12,7,1,'admin',1428422400,1,'admin',1428422400),(105047,'密云','密云','miyun','b116.84952614704,40.382201270687',12,13,1,'admin',1428422400,1,'admin',1428422400),(105048,'怀柔','怀柔','huairou','b116.63841471318,40.32253557572',12,16,1,'admin',1428422400,1,'admin',1428422400),(105049,'延庆','延庆','yanqing','b115.98159964988,40.462340128773',12,15,1,'admin',1428422400,1,'admin',1428422400),(105050,'平谷','平谷','pinggu','b117.12749307598,40.147063523599',12,14,1,'admin',1428422400,1,'admin',1428422400),(105051,'门头沟','门头沟','mentougou','b116.1082951451,39.945991485889',12,18,1,'admin',1428422400,1,'admin',1428422400),(105052,'黄浦区','黄浦','huangpu','b121.49100249964,31.237457210335',13,10,1,'admin',1428422400,1,'admin',1428422400),(105053,'卢湾区','卢湾','luwan','b121.47332902667,31.2237882099',13,70,1,'admin',1428422400,1,'admin',1428422400),(105054,'徐汇区','徐汇','xuhui','b121.44284539728,31.192758783873',13,30,1,'admin',1428422400,1,'admin',1428422400),(105055,'长宁区','长宁','changning','b121.43113188801,31.22670659927',13,40,1,'admin',1428422400,1,'admin',1428422400),(105056,'静安区','静安','jingan','b121.45398679964,31.234222163095',13,60,1,'admin',1428422400,1,'admin',1428422400),(105057,'普陀区','普陀','putuo','b121.4029593724,31.255321450368',13,90,1,'admin',1428422400,1,'admin',1428422400),(105058,'闸北区','闸北','zhabei','b121.4658234819,31.253381741226',13,50,1,'admin',1428422400,1,'admin',1428422400),(105059,'虹口区','虹口','hongkou','b121.51167396459,31.270145180644',13,80,1,'admin',1428422400,1,'admin',1428422400),(105060,'杨浦区','杨浦','yangpu','b121.53221914156,31.265725621178',13,160,1,'admin',1428422400,1,'admin',1428422400),(105061,'闵行区','闵行','minhang','b121.38818916288,31.11859500243',13,100,1,'admin',1428422400,1,'admin',1428422400),(105062,'宝山区','宝山','baoshan','b121.49617881075,31.411154212975',13,140,1,'admin',1428422400,1,'admin',1428422400),(105063,'嘉定区','嘉定','jiading','b121.27145464985,31.380091348289',13,120,1,'admin',1428422400,1,'admin',1428422400),(105064,'浦东','浦东','pudongxinqu','b121.55067621283,31.231191908789',13,20,1,'admin',1428422400,1,'admin',1428422400),(105065,'金山区','金山','jinshan','b121.34828432682,30.748120933696',13,180,1,'admin',1428422400,1,'admin',1428422400),(105066,'松江区','松江','songjiang','b121.23533473192,31.038370859093',13,170,1,'admin',1428422400,1,'admin',1428422400),(105067,'青浦区','青浦','qingpu','b121.11859651467,31.16248431699',13,190,1,'admin',1428422400,1,'admin',1428422400),(105068,'南汇区','南汇','nanhui','b121.76439493025,31.055398180599',13,110,1,'admin',1428422400,1,'admin',1428422400),(105069,'奉贤区','奉贤','fengxian','b121.48071428231,30.924461245333',13,130,1,'admin',1428422400,1,'admin',1428422400),(105070,'崇明县','崇明','chongming','b121.40393640156,31.628566763654',13,150,1,'admin',1428422400,1,'admin',1428422400),(105071,'上海周边','上海周边','shanghaizhoubian','',13,200,1,'admin',1428422400,1,'admin',1428422400),(108093,'燕郊','燕郊','yanjiao','b116.82629396754,39.951385192845',12,17,1,'admin',1428422400,1,'admin',1428422400),(108193,'北京周边','北京周边','beijingzhoubian','',12,1000,1,'admin',1428422400,1,'admin',1428422400);

/*Table structure for table `office` */

DROP TABLE IF EXISTS `office`;

CREATE TABLE `office` (
  `Id` int(11) NOT NULL AUTO_INCREMENT COMMENT '房产标识',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '楼盘名称',
  `name_en` varchar(200) NOT NULL DEFAULT '' COMMENT '楼盘英文名称',
  `name_sp` varchar(200) NOT NULL DEFAULT '' COMMENT 'spell name 大楼名称拼音（全拼）',
  `name_fl` varchar(50) NOT NULL DEFAULT '' COMMENT 'first letter name 大楼首字母名称',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '0未发布，1已发布，2全部',
  `publish_date` int(11) NOT NULL DEFAULT '0' COMMENT '大楼发布时间',
  `lockflag` int(11) NOT NULL DEFAULT '0' COMMENT '锁盘标识0未锁,1锁',
  `lockflag_at` int(11) NOT NULL DEFAULT '0' COMMENT '锁盘时间',
  `allow_to_create_house` int(11) NOT NULL DEFAULT '0' COMMENT '是否是大客户部的。 默认 0 不是，允许录入 1 不允许',
  `img_count` int(11) NOT NULL DEFAULT '0' COMMENT '图片数量(触发器更改)',
  `priority` int(11) NOT NULL DEFAULT '0' COMMENT '0不优先  1优先。暂时没用',
  `hot` int(11) NOT NULL DEFAULT '0' COMMENT '热度.暂时没用',
  `city_id` int(11) NOT NULL DEFAULT '0' COMMENT '城市id',
  `city_name` varchar(50) NOT NULL DEFAULT '' COMMENT '城市名',
  `circle_id` int(11) NOT NULL DEFAULT '0' COMMENT '商圈id',
  `circle_name` varchar(200) NOT NULL DEFAULT '' COMMENT '商圈',
  `district_id` int(11) NOT NULL DEFAULT '0' COMMENT '区域id',
  `district_name` varchar(200) NOT NULL DEFAULT '' COMMENT '区域名称',
  `address` varchar(1000) NOT NULL DEFAULT '' COMMENT '详细地址',
  `map_x` decimal(14,8) NOT NULL DEFAULT '0.00000000' COMMENT '东经',
  `map_y` decimal(14,8) NOT NULL DEFAULT '0.00000000' COMMENT '北纬',
  `create_id` int(11) NOT NULL DEFAULT '0' COMMENT '创建人id',
  `create_name` varchar(50) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `modify_id` int(11) NOT NULL DEFAULT '0' COMMENT '修改人',
  `modify_name` varchar(50) NOT NULL DEFAULT '' COMMENT '修改人姓名',
  `modify_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `accendant_id` int(11) NOT NULL DEFAULT '0' COMMENT '所属人',
  `accendant_name` varchar(50) NOT NULL DEFAULT '' COMMENT '所属人',
  `management_type` varchar(100) NOT NULL DEFAULT '' COMMENT '物业类型',
  `management_level` varchar(10) NOT NULL DEFAULT '' COMMENT '物业等级',
  `management_company` varchar(100) NOT NULL DEFAULT '' COMMENT '物业管理公司',
  `management_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '物业管理费,每平米',
  `investor_type` int(11) NOT NULL DEFAULT '0' COMMENT '0，1大业主， 2小业主， 3大业主+小业主',
  `investor` varchar(100) NOT NULL DEFAULT '' COMMENT '业主名称，可以是公司名',
  `investor_contact` varchar(50) NOT NULL DEFAULT '' COMMENT '业主代表，是指定人',
  `investor_contactphone` varchar(50) NOT NULL DEFAULT '' COMMENT '业主代表电话',
  `investor_Job` varchar(50) NOT NULL DEFAULT '' COMMENT '业主代表职位',
  `developer_company` varchar(100) NOT NULL DEFAULT '' COMMENT '开发商',
  `agent_company` varchar(100) NOT NULL DEFAULT '' COMMENT '代理商',
  `tel` varchar(50) NOT NULL DEFAULT '' COMMENT '租售热线',
  `design_company` varchar(100) NOT NULL DEFAULT '' COMMENT '设计单位',
  `construction_company` varchar(100) NOT NULL DEFAULT '' COMMENT '施工单位',
  `time_of_completion` int(11) NOT NULL DEFAULT '0' COMMENT '竣工时间,unixtime',
  `standard_height` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '标准层高',
  `land_areasize` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '占地面积,平方米',
  `total_areasize` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '总面积，平方米',
  `building_height` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '大楼高度,米',
  `floor_areasize` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '标准层面积，平方米',
  `construction_ratio` float(7,2) NOT NULL DEFAULT '0.00' COMMENT '得房率,百分比',
  `groundfloor` int(11) NOT NULL DEFAULT '0' COMMENT '地上楼层数',
  `undergroundfloor` int(11) NOT NULL DEFAULT '0' COMMENT '地下楼层数',
  `plot_ratio` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '容积率,百分比',
  `floor_height` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '净层高，米',
  `price` decimal(50,2) NOT NULL DEFAULT '0.00' COMMENT '均价',
  `remainder_area` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '可租售面积',
  `description` text NOT NULL COMMENT '特色描述',
  `artremark` varchar(35) NOT NULL DEFAULT '' COMMENT '艺术描述',
  `customcatagory1` int(11) NOT NULL DEFAULT '0' COMMENT '入住行业1',
  `customcatagory2` int(11) NOT NULL DEFAULT '0' COMMENT '入住行业2',
  `customcatagory3` int(11) NOT NULL DEFAULT '0' COMMENT '入住行业3',
  `greening_ratio` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '绿化率，百分比',
  `parking_count` int(11) NOT NULL DEFAULT '0' COMMENT '停车位，个',
  `parking_fees` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '停车费用，元',
  `lift_brand` varchar(1000) NOT NULL DEFAULT '' COMMENT '电梯品牌',
  `lift_partition` varchar(100) NOT NULL DEFAULT '' COMMENT '电梯分区',
  `lift_count` varchar(1000) NOT NULL DEFAULT '' COMMENT '电梯数量',
  `goodsliftcount` varchar(100) NOT NULL DEFAULT '' COMMENT '货梯数',
  `airconditioner_brand` varchar(1000) NOT NULL DEFAULT '' COMMENT '空调品牌',
  `airconditioner_count` varchar(1000) NOT NULL DEFAULT '' COMMENT '空调数量',
  `airconditioner_open` varchar(1000) NOT NULL DEFAULT '' COMMENT '空调开放时间',
  `airconditioner_system` varchar(100) NOT NULL DEFAULT '' COMMENT '空调系统',
  `airconditioner_overtimebill` varchar(1000) NOT NULL DEFAULT '' COMMENT '加时空调费用',
  `lobbyheight` varchar(1000) NOT NULL DEFAULT '' COMMENT '大堂挑高',
  `phonebill` varchar(1000) NOT NULL DEFAULT '' COMMENT '电话费用',
  `bathroom` varchar(1000) NOT NULL DEFAULT '' COMMENT '卫生间',
  `outerWall` varchar(1000) NOT NULL DEFAULT '' COMMENT '外墙',
  `porch` varchar(1000) NOT NULL DEFAULT '' COMMENT '公共走道',
  `netsystem` varchar(1000) NOT NULL DEFAULT '' COMMENT '网络通讯系统',
  `aeration_system` varchar(1000) NOT NULL DEFAULT '' COMMENT '新风系统',
  `satellite` varchar(1000) NOT NULL DEFAULT '' COMMENT '卫星电视',
  `vent` varchar(1000) NOT NULL DEFAULT '' COMMENT '换气窗',
  `smartdevices` varchar(1000) NOT NULL DEFAULT '' COMMENT '智能设备',
  `modify_actionid` varchar(100) NOT NULL DEFAULT '' COMMENT '业务动作标识',
  `isfull` int(11) NOT NULL DEFAULT '0' COMMENT '是否满租，1在租，2满租，0未知',
  `lock_checked` int(11) NOT NULL DEFAULT '0' COMMENT '是否已核实锁盘信息，1是，0否,2核实不通过',
  `house_count` int(11) NOT NULL DEFAULT '0' COMMENT '房源数量',
  `deliver_date` int(11) NOT NULL DEFAULT '0' COMMENT '大楼交付日期',
  `lock_checked_id` int(11) NOT NULL DEFAULT '0' COMMENT '锁盘核实人id',
  `lock_checked_at` int(11) NOT NULL DEFAULT '0' COMMENT '锁盘核实时间',
  `isfull_checked_id` int(11) NOT NULL DEFAULT '0' COMMENT '是否满租核实人id',
  `isfull_checked_at` int(11) NOT NULL DEFAULT '0' COMMENT '是否满租核实时间',
  `kongpan_number` int(11) NOT NULL DEFAULT '0' COMMENT '控盘数',
  `lock_number` int(11) NOT NULL DEFAULT '0' COMMENT '锁盘数',
  `lock_checked_name` varchar(50) NOT NULL DEFAULT '' COMMENT '锁盘核实人姓名',
  `isfull_checked_name` varchar(50) NOT NULL DEFAULT '' COMMENT '是否满租核实人姓名',
  `first_floor_height` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '首层层高，米',
  `developer_introduction` text NOT NULL COMMENT '开发商介绍',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=200279 DEFAULT CHARSET=utf8;

/*Data for the table `office` */

insert  into `office`(`Id`,`name`,`name_en`,`name_sp`,`name_fl`,`status`,`publish_date`,`lockflag`,`lockflag_at`,`allow_to_create_house`,`img_count`,`priority`,`hot`,`city_id`,`city_name`,`circle_id`,`circle_name`,`district_id`,`district_name`,`address`,`map_x`,`map_y`,`create_id`,`create_name`,`create_at`,`modify_id`,`modify_name`,`modify_at`,`accendant_id`,`accendant_name`,`management_type`,`management_level`,`management_company`,`management_money`,`investor_type`,`investor`,`investor_contact`,`investor_contactphone`,`investor_Job`,`developer_company`,`agent_company`,`tel`,`design_company`,`construction_company`,`time_of_completion`,`standard_height`,`land_areasize`,`total_areasize`,`building_height`,`floor_areasize`,`construction_ratio`,`groundfloor`,`undergroundfloor`,`plot_ratio`,`floor_height`,`price`,`remainder_area`,`description`,`artremark`,`customcatagory1`,`customcatagory2`,`customcatagory3`,`greening_ratio`,`parking_count`,`parking_fees`,`lift_brand`,`lift_partition`,`lift_count`,`goodsliftcount`,`airconditioner_brand`,`airconditioner_count`,`airconditioner_open`,`airconditioner_system`,`airconditioner_overtimebill`,`lobbyheight`,`phonebill`,`bathroom`,`outerWall`,`porch`,`netsystem`,`aeration_system`,`satellite`,`vent`,`smartdevices`,`modify_actionid`,`isfull`,`lock_checked`,`house_count`,`deliver_date`,`lock_checked_id`,`lock_checked_at`,`isfull_checked_id`,`isfull_checked_at`,`kongpan_number`,`lock_number`,`lock_checked_name`,`isfull_checked_name`,`first_floor_height`,`developer_introduction`) values (76,'嘉亭大厦','j Tower','jiatingdasha','JTDS',1,1429061245,1,0,0,7,0,0,13,'上海',44,'安亭',105063,'嘉定区','上海市嘉定区墨玉南路1033号','121.16921100','31.29341200',19776,'应艺青',1429061245,19806,'姜忠超',1444803085,19776,'应艺青','2','甲级','CBRE','14.00',3,'贝莱德集团','','','','崇邦房地产发展有限公司、上海国际汽车城新安亭联合发展有限公司','旭璞资产管理（上海）有限公司','69502255','','',1338480000,'0.00','1500.00','15210.00','60.00','1523.11',76.00,12,2,'0.00','3.50','3.50','9319.71','安亭区域内最高品质写字楼，商业配套成熟','多元化商业设施的高效办公环境',0,0,0,'0.00',813,'1400.00','迅达	','无','5','','日立	','','公共区域 9：00-18：00','分体式空调','无','5米','无','','低反射（LOW E）双层中空玻璃	','天花吊顶采用Armstrong矿棉板配照明装置，墙饰面为石英壁布刷高级乳胶漆，地面为高级玻化砖','电信、联通两家运营商提供通信光纤，入楼层弱电间，分单元入户','无','无','有','','',0,0,0,0,0,0,0,0,32,372,'','','0.00',''),(77,'建工汇豪商务广场','SCG HUIHAO PLAZA	','jiangonghuihaoshangwuguangchang','JGHHSWGC',1,1429077542,1,1458890246,0,10,0,200,13,'上海',3,'徐家汇',105054,'徐汇区','上海市吴中路51号	','121.42309100','31.19330900',19776,'应艺青',1429077542,20791,'王文奎',1460356135,19776,'应艺青','办公楼','甲级','振新物业		','25.90',1,'上海建工房产有限公司		','','','','上海达豪置业有限公司		','上海策源地产		','33686868','上海市建工设计院有限公司	','上海建工四建集团	',1417622400,'0.00','24098.00','86173.82','60.00','1914.04',70.00,14,2,'0.00','2.80','4.50','2915.59','项目基地位于徐汇区吴中路51号，为徐汇区西侧与闵行区交界处，基地北临吴中路、东临古井路，由上海建工房产有限公司开发。主要功能包括：办公、会议、休闲、棋牌等。','建工集团首个高端商业项目',0,0,0,'30.00',494,'1200.00','三菱	','无','7','','美国约克','','周一至周五8：00－20：00	','集中式中央空调','整层480元/小时	','9米','有 100mm','','玻璃幕墙加石材	','金属板吊顶，地毯，部分木质墙面','光纤到户，电信、移动、网通均可开通','有','无','有','5A标准','@DF9A0RYDP1W1J666E7W488QP28N5JLZAK00JQKQ85XQT03EU28_house_lurufangyuan',0,0,4,0,0,0,0,0,30,84,'','','0.00',''),(78,'中信广场','CITIC PLAZA','zhongxinguangchang','ZXGC',1,1429079948,1,0,0,5,0,200,13,'上海',0,'四川北路',0,'虹口区','虹口四川北路859号 ','121.49039400','31.25382300',19776,'应艺青',1429079948,20037,'杨灿杉',1460516188,19776,'应艺青','2','甲级','上海海泰物业管理有限公司','36.00',1,'上海海泰房地产（集团）有限公司		','','','','上海信虹房地产有限公司		','','62335557','','',-28800,'0.00','10131.00','143195.00','228.00','2600.00',70.00,55,3,'0.00','3.00','9.00','24693.43','中信广场位于四川北路与海宁路的交汇处，地处北外滩中心，远眺四下，黄浦江，浦东陆家嘴金融建筑群，外滩万国建筑群，苏州河畔等绝版珍稀风景尽收眼底，地理位置得天独厚。大厦高228米，雄踞北外滩新地标，大厦外立面采用中空玻璃幕墙装饰，简洁流畅，独特晶鳞状立面设计，独树一帜，主体采用U型无柱设计，极大提高空间利用率，净高3.1米，增强了办公空间的舒适度，单层面积为2300-2600平方米，可弹性分割，配套设施先进，品质卓越。','北外滩新地标，品质卓越',0,0,0,'0.00',400,'1800.00','三菱	','有','20','','开利	','','8:00-18:00	','集中式中央空调','按每小时每单元收费','15米','','','Low-E中空玻璃幕墙	','精装','电信、联通、长城、移动	','有','无','无','','@569B5272080OYAFG3BX9CW7QL5JR790H67MV18YF8LO94B2BIC_house_lurufangyuan',0,0,8,0,0,0,0,0,37,336,'','','0.00','');

/*Table structure for table `office_imgs` */

DROP TABLE IF EXISTS `office_imgs`;

CREATE TABLE `office_imgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片标识',
  `office_id` int(11) NOT NULL COMMENT '从属楼盘标识',
  `imgformat` varchar(20) NOT NULL COMMENT '图片格式',
  `imgpath` varchar(200) NOT NULL COMMENT '图片路径,注意图片路径是相对路径，其实是一个虚拟路径，路径并不真实存在，只是文件服务器的一种标识',
  `imgtype` int(11) NOT NULL COMMENT '图片种类,1，外形图、2，标准平面图、3，地理位置图、4，大厅图、5，办公区域图',
  `is3d` int(11) NOT NULL COMMENT '是否是全景图图',
  `isdelete` int(11) NOT NULL COMMENT '是否已删除,0(默认)未删除，1已删除',
  `create_id` int(11) NOT NULL DEFAULT '0' COMMENT '创建人id',
  `create_name` varchar(50) NOT NULL DEFAULT '' COMMENT '创建人',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `modify_id` int(11) NOT NULL DEFAULT '0' COMMENT '修改人',
  `modify_name` varchar(50) NOT NULL DEFAULT '' COMMENT '修改人姓名',
  `modify_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改时间',
  `modify_actionid` varchar(100) NOT NULL DEFAULT '' COMMENT '业务动作标识',
  `imgDesc` varchar(100) NOT NULL DEFAULT '' COMMENT '图片描述',
  `sign_address` varchar(100) DEFAULT NULL COMMENT '签到地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

/*Data for the table `office_imgs` */

insert  into `office_imgs`(`id`,`office_id`,`imgformat`,`imgpath`,`imgtype`,`is3d`,`isdelete`,`create_id`,`create_name`,`create_at`,`modify_id`,`modify_name`,`modify_at`,`modify_actionid`,`imgDesc`,`sign_address`) values (1,76,'.jpg','2976fbf171db41beb415cd2d582da236.jpg',1,0,0,0,'测试',1467193660,0,'测试',1467193660,'@S5P6NCP06X3621Q9KMD32258V238835361CM1WUJ8HSYZOXO2D_office_imgs_tupian','',NULL),(2,77,'.jpg','3a0b16beee1f488398986ab1c1d2c73d.jpg',1,0,0,0,'测试',1467193707,0,'测试',1467193707,'@8ACOX69MOX4C1LCK1S9H5J2T2QVR57068DK138AND6Y8KV6R2V_office_imgs_tupian','',NULL),(3,78,'.jpg','04feb7aeda93496593d3cad3e4a62570.jpg',1,0,0,0,'测试',1467193785,0,'测试',1467193785,'@988S9L37Z413K5957XYCQ2FS57T1864FK43VJI94K49162CC0A_office_imgs_tupian','',NULL),(4,76,'.jpg','45e739d0f9754c5ba898b2472cb11c85.jpg',1,0,0,0,'测试',1467197942,0,'测试',1467197942,'@7MA8S4X92294GEZ97S0I61L7KHIHUHTI52G85RBDIN386MALD1_office_imgs_tupian','',NULL),(5,77,'.jpg','1901a50da380475f963a80c2afb8997c.jpg',1,0,0,27,'李乐',1467257157,27,'李乐',1467257157,'@1469X9J2L9GKM0CO214A2K32R7QB5102A8HWCCS973E5N8964H_office_imgs_tupian','',NULL);

/*Table structure for table `partners` */

DROP TABLE IF EXISTS `partners`;

CREATE TABLE `partners` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '合作伙伴名称',
  `link` varchar(200) NOT NULL DEFAULT '' COMMENT '合作伙伴地址',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态0不显示,1显示',
  `create_id` int(11) NOT NULL DEFAULT '0' COMMENT '创建人id',
  `create_name` varchar(50) NOT NULL DEFAULT '' COMMENT '创建人name',
  `create_at` int(11) NOT NULL DEFAULT '0' COMMENT '创建时间',
  `modify_id` int(11) NOT NULL DEFAULT '0' COMMENT '修改人id',
  `modify_name` varchar(50) NOT NULL DEFAULT '' COMMENT '修改人name',
  `modify_at` int(11) NOT NULL DEFAULT '0' COMMENT '修改人时间',
  `isdelete` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

/*Data for the table `partners` */

insert  into `partners`(`id`,`name`,`link`,`status`,`create_id`,`create_name`,`create_at`,`modify_id`,`modify_name`,`modify_at`,`isdelete`) values (1,'123123','213123123',1,0,'测试',1467098888,0,'测试',1467101816,1),(2,'213123','123123123',1,0,'测试',1467099009,0,'测试',1467181276,1),(3,'uban','http://www.baidu.com',1,0,'测试',1467099050,0,'测试',1467181277,1),(4,'uban','http://www.baidu.com',1,0,'测试',1467099304,0,'测试',1467181278,1),(5,'213123','123123123',1,0,'测试',1467101759,0,'测试',1467181279,1),(6,'新浪','http://www.sina.com',1,0,'测试',1467182365,0,'测试',1467186981,0),(7,'百度','http://www.baidu.com',1,0,'测试',1467182383,0,'测试',1467186983,0),(8,'优办','http://www.uban.com',1,0,'测试',1467182400,0,'测试',1467186984,0),(9,'人人网','http://www.renren.com',1,0,'测试',1467182418,0,'测试',1467186985,0),(10,'搜房网','http://www.soufang.com',1,0,'测试',1467182502,0,'测试',1467186986,0),(11,'58同城','http://www.58.com',1,0,'测试',1467182564,0,'测试',1467186988,0);

/*Table structure for table `servicehotline` */

DROP TABLE IF EXISTS `servicehotline`;

CREATE TABLE `servicehotline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone` varchar(100) NOT NULL DEFAULT '' COMMENT '电话',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '联系人姓名',
  `create_id` int(11) NOT NULL DEFAULT '0',
  `create_name` varchar(50) NOT NULL DEFAULT '',
  `create_at` int(11) NOT NULL DEFAULT '0',
  `modify_id` int(11) NOT NULL DEFAULT '0',
  `modify_name` varchar(50) NOT NULL DEFAULT '',
  `modify_at` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '1,热线电话2,地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `servicehotline` */

insert  into `servicehotline`(`id`,`phone`,`name`,`create_id`,`create_name`,`create_at`,`modify_id`,`modify_name`,`modify_at`,`type`) values (8,'13900000000','李乐',0,'测试',1467196229,24,'陈俊',1467340427,1),(9,'','望京soho塔2C2501',0,'测试',1467196242,24,'陈俊',1467340449,2);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `loginname` varchar(100) NOT NULL COMMENT '登录名',
  `fullname` varchar(30) NOT NULL COMMENT '中文名字',
  `email` varchar(100) NOT NULL DEFAULT '' COMMENT '邮箱',
  `cell_phone` varchar(50) NOT NULL DEFAULT '' COMMENT '手机',
  `password` varchar(1000) NOT NULL COMMENT '密码',
  `isdelete` int(4) NOT NULL DEFAULT '0' COMMENT '0未删除，1已删除',
  `forbidden` int(4) NOT NULL DEFAULT '0' COMMENT '是否禁用 0 不禁用， 1禁用',
  `last_login_at` int(11) NOT NULL DEFAULT '0' COMMENT '最后一次登陆时间',
  `wrong_count` int(4) NOT NULL DEFAULT '0' COMMENT '用户登陆错误次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`loginname`,`fullname`,`email`,`cell_phone`,`password`,`isdelete`,`forbidden`,`last_login_at`,`wrong_count`) values (24,'chenjun','陈俊','chenjun@163.com','12345678912','234502401248932a009d10b5881b5b83',0,0,1467798904,0);

/*Table structure for table `user_role` */

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户角色ID',
  `user_id` int(11) unsigned DEFAULT NULL COMMENT '用户id',
  `role_id` int(11) unsigned DEFAULT NULL COMMENT '角色id',
  `creator` int(11) unsigned DEFAULT NULL COMMENT '录入人',
  `creator_name` varchar(255) DEFAULT NULL COMMENT '录入人',
  `created_at` int(255) unsigned DEFAULT NULL COMMENT '录入时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

/*Data for the table `user_role` */

insert  into `user_role`(`id`,`user_id`,`role_id`,`creator`,`creator_name`,`created_at`) values (47,24,1,0,'管理员',1467253766);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
