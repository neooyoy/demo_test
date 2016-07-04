package com.publiccms.crmenum;

/**
 * 业务标识枚举类.
 * <ul>
 * 规范：
 * <li>字段长度 (最大50个字符) = 主表名称 + _ + 业务拼音</li>
 * </ul>
 *
 * @author zhaolm
 *
 */
public enum ModifyActionEnum {
	ignore,
	office_chuangjianxinloupan, // 创建新楼盘
	office_tags_ceshishili, // 大楼更新
	office_baocundiliweizhi, // 保存大楼地理位置
	office_imgs_shanchudaloutupian, // 删除大楼图片
	office_suopan_dalouguizepeizhi, // 大楼规则配置
	office_imgs_tupian, // 添加楼盘图片
	office_imgs_tianjiaquanjingtumiaosu, // 添加全景图描述
	office_updatedalou, // 修改大楼信息
	office_suopan,//锁盘
	office_fabudalou, // 发布大楼
	office_quxiaofabudalou, // 取消发布大楼
	house_gengxinfangyuan, // 更新房源
	house_shenqingguanbi,//申请关闭房源
	house_cancelguanbi,//取消关闭房源
	house_guanbifangyuan, // 关闭房源
	house_closeHouseToDeal,//房源被报单，系统判定已成交
	house_status_31,//10 天未跟进自动下架
	house_close_after24hour,//申请关闭24小时，自动关闭
	house_lurufangyuan, // 录入房源
	house_shikan,//实勘房源
	housefollow_lurufangyuangenjin, // 录入房源跟进
	house_imgs_fangyuanshangchuanyanzhengtupian, //房源上传验证图
	house_imgs_fangyuanshangchuantupian, // 房源上传图片
	house_imgs_shanchufangyuantupian, // 删除房源图片
	house_imgs_shanchufangyuanyanzhengtupian, //删除验证房源图片
	house_imgs_shangchuan720tupian, // 上传720全景图
	house_imgs_shanchu720tupian, // 删除720全景图
	house_imgs_gengxin720youxiao,//更新720全景图有效
	house_imgs_sheweibiaotitu, // 设为标题图
	house_secret_diaoquxinxi, // 调取敏感信息
	house_secret_close_baocunxinxi, // 保存关闭房源敏感信息
	house_updateQiangtui, // 强推房源
	house_heShiFangYuan, // 核实房源


	house_quXiaoHeShi,// 取消核实房源
	house_jihuofangyuan,//激活房源
	house_jihuo_pbZuofei,//报单作废：房源激活
	house_lock_bypaybill,//锁房源，报单
	house_unlock_bypaybill,//解锁房源，报单
	house_unlock_after3day,//解锁房源，3天自动解锁
	house_resign_accendant,//离职或转岗，调整归属人
	house_zuhefangyuantizozheng, //组合房源调整


	house_zuhefangyuanxiajia,//组合房源下架
	house_guanbixiaofangyuan,//关闭小房源
    house_gengxinxiaofangyuanparentId,//更新房源parenthId
	house_jihuoxiaofangyuan,//激活小房源
	house_zhfangyuangengxin,//组合房源更新


	house_jihuo_before30, // 到期前30天激活
	house_judgetime_trigger, // 更新最后一次影响自动下架的时间
	house_xiugaiguishuren, // 批量调整房源归属人
	house_lockHouse, // 锁定房源
	house_unlockHouse, // 解锁房源
	office_insertofficePm, // 添加空气质量
	office_updateofficePm, // 修改空气质量

	customer_apply_moidfyCustomerToInvalid, // 申请为无效客户
	customer_apply_corpWithOtherCompany, // 申请为已和其他公司合作客户

	customer_moidfyCustomerToDeal, //客户设置成交
	customer_moidfyCustomerToInvalid, // 设置为无效客户
	customer_moidfyCustomerToCorpWithOtherCompany, // 设置为已和其他公司合作客户
	customer_approvelCustomerToInvalid, // 审批为无效客户
	customer_approvelCorpWithOtherCompany, // 审批为已和其他公司合作客户
	customer_approvelCustomerToValid, // 审批为有效客户
	customer_paybill, // 设置为优办成交客户
	customer_paycancelbill, // 成交客户退单
	customer_addbyvitralphone,//虚拟号创建客户
	customer_customerMod, // 客户修改
	customer_customerModVirtual, // 虚拟号客户修改
	customer_customerAdd, // 手动录入 客户
	customer_customerAddVirtual, // 虚拟号录入 客户订单
	customer_customerAddByOrder, // 预约/委托 -> 客服 分配生成 客户订单:
	customer_customerUpdateByOrder, // 客服修改客户
	customer_moidfyCustomerAccendantUser, // 调整客户归属人
	customer_finishCustomerLook, // 完成带看
	customer_closeCustomerLook, // 关闭带看
	customer_addCustomerLook, // 添加带看
	order_didi_add, // 滴滴预约
	customer_tianjiangenjin, // 添加跟进
	customer_jihuokehu, // 客户激活
	customer_jihuokehu_pbZuofei, // 报单作废后客户激活
	order_didi_judge_success, // 滴滴预约审核通过
	order_didi_judge_faile, // 滴滴预约审核不通过
	customer_group_receiveCustomer, // 领取组公海客户
	customer_area_receiveCustomer, // 领取区公海客户

	orderyuyue_xiugai,// 订单修改
	orderyuyue_wuxiao,// 订单无效
	orderyuyue_jihuofenpeiziji,// 订单激活并分配自己
	order_customer_questionnaire_add,//添加回访
	orderyuyue_kefuluru, // 客服 订单录入
	orderyuyue_weituozhaolou, // 委托找楼 订单录入
	orderyuyue_yuyuekanfang, // 预约看房 订单录入
	customer_addCustomerLookRecommend, //生成看房单
	customer_deletelookhouseorder, //删除看房单
	customer_resign_accendant,//离职 客户流入组公海
	customer_to_groupsea,//流入组公海
	customer_to_districtsea,//流入区公海
	customer_activate_to_group_sea,//激活客户至组公海
	order_toufang_add,//创建房东投放订单
	order_toufang_private,//房源投放订单私有化
	order_toufang_update,//修改房源投放订单内容
	order_toufang_invalid,//房源投放订单无效话
	order_toufang_turnOverSelf,//投放订单转为有效并分配给自己
	order_toufang_linkHouse,//投放订单关联已有房源
	order_toufang_addHouse,//投放订单新建房源
	order_toufang_resetOrderCity,//重置订单城市
	house_shenheHouse,//审核房源
	house_chongXinShenHeHouse,//申请重新审核房源
	house_shenhetongguoHouse,//审核通过房源
	house_shenheDaiQueRenHouse,//审核待确认
	house_shenheWeiTongGuoHouse,//审核未通过
	house_shenheWeiTongGuoCloseHouse,//审核未通过关闭房源

	office_auditperson_change,//分配责任人
	office_auditperson_delete,//解除责任人
	office_suopan_isfullCheck_modify,//是否满租核实修改
	office_suopan_lockCheck_modify,//锁盘核实修改

	order400calllog_calllogGoOrderYuYue, //400通话转预约看房订单
	order400calllog_calllogGoOrderToufang, //400通话转业主委托看房订单
	order400calllog_calllogToInvalid, //400通话无效化


	release_notes_add_url,//版本发布说明，页面URL添加修改说明
	release_notes_add_notes,//版本发布说明，添加更新说明内容
	release_notes_edit_notes,//版本发布说明，修改更新说明内容
	release_notes_delete_parentUrl,//版本发布说明，修改父级分类
	release_notes_delete_notes,//版本发布说明，删除更新说明内容
	release_notes_change_parentid,//版本发布说明，修改分类下包含页面

	business_port_batchApply,//顾问端口批量申请

	business_port_pricecheck,//顾问端口充值审核
    //报单相关
	pbfile_insert,//保单上传文件
	pbfile_delete,//报单删除文件
	pborder_insert,//报单创建
	pbprder_update,//报单更新
	pborder_yunying_judge_tongguo,//报单_运营审核通过
	pborder_yunying_judge_jujue,//报单_运营审核拒绝
	pborder_zuofei,//报单_作废
	pborder_hetong_judge_tongguo,//报单_合同审核通过
	pborder_hetong_judge_jujue,//报单_合同审核拒绝
	pborder_modify_contract,//报单_修改合同信息
	pborder_dakuan,//报单_打款

	pbOperatorsGroup_distributeGroup,//运营审核分配小组
	business_port_targetcheck,//顾问端口开通审核
	head_picture_upload,//顾问头像上传
	head_picture_delete,//顾问头像删除

	//买卖房源相关
	housesell_lurufangyuan,
	housesell_update,

	insert_export_config,//添加导出文件配置
	insert_export_column_config;//添加导出文件参数配置
}
