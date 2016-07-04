/**
 * 公共方法js
 * @author chenjun 20160308
 */

/**
 * 公共组件依赖jqury的方法
 */
$(function () {
    /// 创建委托函数
    ///      context：函数上下文
    ///      params：参数【必须是数组形式】,可以为空
    Function.prototype.delegate = function (context, params) {
        var func = this;
        return function () {
            if (params == null) {
                return func.apply(context);
            }
            return func.apply(context, params);
        };
    };
    $.extend({
        coverObject: function (obj1, obj2) {
            var o = this.cloneObject(obj1, false);
            var name;
            for (name in obj2) {
                if (obj2.hasOwnProperty(name)) {
                    o[name] = obj2[name];
                }
            }
            return o;
        },
        cloneObject: function (obj, deep) {
            if (obj === null) {
                return null;
            }
            var con = new obj.constructor();
            var name;
            for (name in obj) {
                if (!deep) {
                    con[name] = obj[name];
                } else {
                    if (typeof (obj[name]) == "object") {
                        con[name] = $.cloneObject(obj[name], deep);
                    } else {
                        con[name] = obj[name];
                    }
                }
            }
            return con;
        },
        ///说明：
        ///      创建委托
        delegate: function (func, context, params) {
            if ($.isFunction(func)) {
                return func.delegate(context, params);
            } else {
                return $.noop;
            }
        },
        getParam: function (param) {
            if (typeof (param) == "undefined") {
                return "";
            } else {
                return param;
            }
        },
        ///说明：
        ///      判断元素是否存在某个属性
        boolHasAttr: function (id, attr) {
            if (typeof ($("#" + id).attr(attr)) != "undefined") {
                return false;
            }
            return true;
        },
        IsNull: function (str) {
            if ($.trim(str) == "" || isNaN(str)) {
                return true;
            }
            return false;
        }
    });
});

$.extend({
    enumDdataGrid: {
        //表格头部数据参数 类型
        enumTHeadDataParamsType: {
            number: 1,
            string: 2,
            ip: 3
        },
        //皮肤风格
        enumSkin: {
            classic: 1,     //经典
            traditional: 2, //传统
            gorgeous: 3,     //绚丽
            defautl : 4        //uban风格  add by cj 20160229
        }
    }
});


/**
 * 获取公共控件列表-datagrid的options配置
 * @param datagridId
 * @returns json
 * @author chenjun 20160307
 */
function getDataGridOptions(datagridId){
    var gridAttributes = $("#"+datagridId)[0].attributes;
    var options = {};
    for (var i=0; i<gridAttributes.length; i++){
        if (gridAttributes[i].name == 'datagrid'){
            options = eval('(' + gridAttributes[i].value + ')');
            break;
        }
    }
    return options;
}

/**
 * 获取公共控件下拉框-combox的options配置
 * @param comboxId
 * @returns json
 * @author chenjun 20160307
 */
function getComboxOptions(comboxId){

    var comboxAttributes = $("#"+comboxId)[0].attributes;
    var options = {};
    for (var i=0; i<comboxAttributes.length; i++){
        if (comboxAttributes[i].name == 'combox'){
            options = eval('(' + comboxAttributes[i].value + ')');
            break;
        }
    }
    return options;
}


/**
 * 日期格式化
 * @param format
 * @returns {*}
 */
Date.prototype.format = function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

/*
 * 日期：毫秒值转日期时间
 */
function dateHMZToDateTime(ms){
    var date = new Date(ms);
    return date.format('yyyy-MM-dd hh:mm:ss'); //就得到普通的时间了
}


/*
 * 日期：毫秒值转日期
 */
function dateHaoMiaoZToDate(ms){
    var date = new Date(ms);
    return date.format('yyyy-MM-dd'); //就得到普通的时间了
}

/*
 * 日期：秒值转日期时间
 */
function dateMinuteToDate(minute){
    if (minute == null || minute == 0){
        return "";
    }
    var date = new Date(minute*1000);
    return date.format('yyyy-MM-dd hh:mm:ss'); //就得到普通的时间了
}

/*
 * 日期：秒值转日期
 */
function dateMinuteToDay(minute){
    if (minute == null || minute == 0){
        return "";
    }
    var date = new Date(minute*1000);
    return date.format('yyyy-MM-dd'); //就得到普通的时间了
}

/*
 * 日期：秒值转中文日期
 */
function dateMinuteToZHDate(minute){
    if (minute == null || minute == 0){
        return "";
    }
    var date = new Date(minute*1000);
    return date.format('yyyy年MM月dd日'); //就得到普通的时间了
}

/**
 * 大楼列表楼盘名称-重新渲染
 * @param record
 * @param value
 * @returns {string}
 * @author chenjun 20160307
 */
function renderOfBuildingName(record, value){
    var url = base + "/officeController/insertOrUpdateOffice?id=" + record["id"];
    return  "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;' >" + " <font color='#28a4c9'>"+ value + "</font></a>";
}


/**
 * 大楼列表楼盘发布状态-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfBuildingStatus(record, value){
    //未发布，1已发布，2全部
    if (value == 1){
        return "<font color='#ff0000'>已发布</font>";
    }else if (value == 0){
        return "未发布";
    }
    return "未发布";
}

/**
 * 大楼列表楼盘锁盘状态-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfLockflag(record, value){
    if (value == 0){
        return "<font color='#28a4c9'>未锁盘</font>";
    }else if (value == 1){
        return "<font color='#ff0000'>锁盘</font>";
    }
    return value;
}

/**
 * 房源列表租金显示
 * @param record
 * @param value
 * @returns {*}
 */
function priceShow(record, value){

    return value +'(元/平/天)<br/>' + record.monthPrice + '(元/月)';
}


/**
 * 根据城市id获取对应的城市名称
 * @param cityId
 */
function getCityName(cityId){
    if (cityId == '12'){
        return '北京';
    }else if (cityId == '13'){
        return '上海';
    }
    return '';
}

function filterItem(q, row){
    var opts = $(this).combobox('options');
    //根据楼盘中文名过滤
    if (row.name.toLowerCase().indexOf(q.toLowerCase()) != -1){
        return true;
    }

    //根据楼盘英文名称过滤
    if (row.nameEn.toLowerCase().indexOf(q.toLowerCase()) != -1){
        return true;
    }

    //根据楼盘大楼名称拼音（全拼）过滤
    if (row.nameSp.toLowerCase().indexOf(q.toLowerCase()) != -1){
        return true;
    }

    //根据大楼首字母名称过滤
    if (row.nameFl.toLowerCase().indexOf(q.toLowerCase()) != -1){
        return true;
    }

    return false;
}


/**
 * 房源下拉框显示名称格式化
 * @returns {*}
 * @author chenjun 20160307
 */
function formatItem(row){
    if (row.status == null){
        return '<span style="font-weight:bold">' + row.name + '</span>';
    }
    var status = renderOfBuildingStatus(null, row.status);
    var lockflag = renderOfLockflag(null, row.lockflag)
    var modifyAtime = dateMinuteToDate(row.modifyAt);
    if (modifyAtime != ''){
        modifyAtime = '<br/><span style="color:#888">' + "更新时间: " + modifyAtime + '</span>';
    }
    var s = '<span style="font-weight:bold">' + row.name + '</span><br/>' +
        '<span style="color:#888">' + row.cityName + '-' + row.districtName + '-' + row.circleName + ', ' +
        status+ ', ' + lockflag + '</span>' + modifyAtime;
    return s;
}

/**
 * 房源列表带看数，预约数
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function donelook_unlook_count(record, value){
    return record.donelookCount + "/" + record.unlookCount;
}


/**
 * 人员名称控件的过滤筛选
 * @param q
 * @param row
 * @returns {boolean}
 */
function filterItemOfPersonName(q, row){
    var opts = $(this).combobox('options');
    //根据用户中文名称过滤
    if (row.fullname.toLowerCase().indexOf(q.toLowerCase()) != -1){
        return true;
    }

    //根据用户登录名过滤
    if (row.loginname.toLowerCase().indexOf(q.toLowerCase()) != -1){
        return true;
    }
    return false;
}

/**
 * 人员名称下拉框显示名称格式化
 * @returns {*}
 * @author chenjun 20160322
 */
function formatItemOfPersonName(row){
    /*var deptName = '&nbsp;&nbsp;<span style="color:#888">' + "部门: " + row.deptName + '</span>';
    if (row.title != null && row.title != ''){
        deptName += '<span style="color:#888">' + ", 职位: " + row.title + '</span>';
    }*/
    var s = '<span style="font-weight:bold">' + row.fullname + '</span>';
    return s;
}

/**
 * 房源列表名称显示
 * @param record
 * @param value
 * @returns {*}
 */
function houseName(record, value){
    var tags = '';
    /*if (record.imgCount > 0){
        tags += '<span class="msg-tag-picture poshytooltip" title="该房源有图片">图</span>&nbsp;';
    }*/
    if (record.investigator != 0 && record.imgCount > 0){
        tags += '<span class="msg-tag-investigator poshytooltip" title="该房源已被实勘">勘</span>&nbsp;';
    }
    if(record.parentId==-1)
    {
        tags += '<span class="msg-tag-picture poshytooltip" title="该房源为组合房源">组</span>&nbsp;';
    }

    if(record.cooperateHouseName != '' && record.cooperateHouseName != '非合作房源'){
        tags += '<span class="msg-tag-forceFlag poshytooltip" title="该房源为合作商房源">商</span>&nbsp;';
    }

    /*if (record.forceFlag == 1){

        var date = new Date();
        var day = 0;
        if (record.forceTime != null){
            day = Math.ceil((date.getTime()/1000 - record.forceTime)/(60*60*24));
        }
        tags += '<span class="msg-tag-forceFlag poshytooltip" title="推送剩余'+ day +'天">推</span>&nbsp;';
    }*/

    if (record.lock == 1){
        tags += '<span class="msg-tag-lock poshytooltip" title="该房源被锁定">锁</span>&nbsp;';
    }
    else if (record.status >= 20 && record.status < 30){
        tags += '<span class="msg-tag-close poshytooltip" title="该房源24小时内将被删除">删</span>&nbsp;';
    }else{
        if (record.showUnmaintenanceTag != null && record.showUnmaintenanceTag){
            var date = new Date();
            var day = 0;
            if (record.flowJudgeTime != null){
                day = Math.ceil((date.getTime()/1000 - record.flowJudgeTime)/(60*60*24));
            }

            if (day >= 6 && day <= 10 && $('#userId').val() != null && $('#userId').val() == record.accendantId){
                tags += '<span class="msg-tag-unmaintenance poshytooltip" title="'+ day +'天未维护">未</span>&nbsp;';
            }
        }
    }

    if (record.investorType == 1){
        tags += '<span class="msg-tag-investorType poshytooltip" title="该房源为大业主">大</span>&nbsp;';
    }
    if (record.investorType == 2){
        tags += '<span class="msg-tag-investorType poshytooltip" title="该房源为小业主">小</span>&nbsp;';
    }
    if (record.verify == 2){
        tags += '<span class="msg-tag-verify poshytooltip" title="该房源已审核通过">核</span>&nbsp;';
    }



    if (tags != ''){
        tags = '<br/>' + tags;
    }

    var url = base + "/houseController/houseModify?id=" + record["id"];
    return  "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a>" + tags ;
}


/**
 * 关闭房源列表名称显示
 * @param record
 * @param value
 * @returns {*}
 */
function closedHouseName(record, value){
    var url = base + "/houseCloseController/houseCloseDetails?id=" + record["id"];
    return  "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a>" ;
}

/**
 * 关闭原因
 * 11房源不存在,12,业主信息错误或已更换,13房源重复录入,14其他
 */
var closereason = function(record, value){
    var reason = '';
    var value = "";
    if (record.status == 31){
        value = '无效';
        if (record.invalidType == 11){
            reason = "<br/><font color='#ff0000'>房源不存在</font>";
        }else if (record.invalidType == 12){
            reason = "<br/><font color='#ff0000'>业主信息错误或已更换</font>";
        }else if (record.invalidType == 13){
            reason = "<br/><font color='#ff0000'>房源重复录入</font>";
        }else if (record.invalidType == 14){
            reason = "<br/><font color='#ff0000'>其他</font>";
        }else if (record.invalidType == 15){
            reason = "<br/><font color='#ff0000'>未维护</font>";
        }
    }
    else if (record.status == 32){
        value = '优办成交';
    }
    else if (record.status == 33){
        value = '已租';
    }
    return value + reason;
}


/**
 * 时间控件
 * @param id
 * @param tagId
 */
function dateWidget(tagId,grid_id){
	$('#'+tagId).datetimepicker({
        format: 'yyyy-mm-dd hh:00:00',
        language: 'zh-CN',
        minView: 1,
        //todayBtn: true,
        startDate: "today"
    }).on('changeDate',function(ev){
    	if(grid_id){
    		buttonSearchOfReload(grid_id);
    	}
    });
}
/**
 * 起始终止时间关联控制
 * @param startTagId
 * @param endTagId
 * @param grid_id
 */
function dateWidgetLimit(startTagId,endTagId,grid_id){
	if(startTagId){
		dateWidget(startTagId,grid_id);
	}
	if(endTagId){
		dateWidget(endTagId,grid_id);
	}
	if(startTagId!=""&&startTagId!=null&&endTagId!=null && endTagId!=""){
		$("#"+startTagId)
		.datetimepicker()
		.on('click',function(ev){
	    	$("#"+startTagId).datetimepicker("setEndDate", $("#"+endTagId).val());
		});
		$("#"+endTagId)
		.datetimepicker()
		.on('click',function(ev){
	    	$("#"+endTagId).datetimepicker("setStartDate", $("#"+startTagId).val());
		});
	}
}

/**
 * 获取客户的来源
 * 来源0全部 1个人用户 2incall 3主站 4赶集 558同城 6安居客 7搜房帮 8其他网站9老用户10公众号 11电话销售 12虚拟号创建
 * @param orderSource
 */
function getCustomerOrderSource(value){
	var ret = "";
	if(value=='1'){
		ret = "个人用户";
	}
	if(value=='2'){
		ret = "优办400";
	}
	if(value=='3'){
		ret = "预约看房";
	}
	if(value=='4'){
		ret = "赶集";
	}
	if(value=='5'){
		ret = "58同城";
	}
	if(value=='6'){
		ret = "安居客";
	}
	if(value=='7'){
		ret = "搜房帮";
	}
	if(value=='8'){
		ret = "其他网站";
	}
	if(value=='9'){
		ret = "老用户";
	}
	if(value=='10'){
		ret = "公众号";
	}
	if(value=='11'){
		ret = "电话销售";
	}
	if(value=='12'){
		ret = "主站详情页";
	}
	if(value=='13'){
		ret = "委托找楼";
	}
	if(value=='14'){
        ret = "大业主转介绍";
    }

	return ret;
}

/**
 * 客户带看状态
 * 1预约中，2已经带看, 3已关闭
 */
var renderOfCustomerLookstatus = function(record, value){
    var value = "";
    if (record.status == 1){
        value = "<font color='#ff0000'>预约中</font>";
    }else if (record.status == 2){
        value = '已经完成';
    }else if (record.status == 3){
        value = '已关闭';
    }
    return value;
}

/**
 * url 链接参数 转json
 */
function parseUrlParametersToJson(param)
{
    var obj = {};
    var keyvalue = [];
    var key = "", value = "";
    var paraString = param.split("&");
    for(var i in paraString)
    {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

/**
 * 确认时间
 */
var renderOfCustomerConfirmTime = function (record, value) {
    if (record.status != 1){
        return dateMinuteToDate(value);
    }
    return '';
}

/**
 *  checkbox选中和不选中时
 * 对指定的array执行push和
 * pop
 * @param value
 * @param array
 */
function keyCheck(value,array){
	if($.inArray(value,array)>-1){
		array.splice($.inArray(value,array),1);
	}else{
		array.push(value);
	}

}
/**
 * 去重复值添加进数组
 * @param value
 * @param array
 */
function keyCheckNoRepeat(value,array){
	if($.inArray(value,array)==-1){
		array.push(value);
	}
}

/**
 * 楼盘列表显示待租房源数
 */
var renderOfOfficeHouseCount = function(record, value){
    var url = base + "/houseController/fangyuanlist?officeId=" +
        record.id + ",officeName=" + encodeURI(record.name);
    return  "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a>" ;

}


/**
 * 订单来源-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfReserved(record, value){
    //pc web android ios
    if (value == 'pc'){
        return "PC";
    }else if (value == 'web'){
        return "WAP";
    }else if (value == 'ios'){
        return "IOS";
    }else if (value == 'android'){
        return "ANDROID";
    }
    return "";
}

/**
 * 订单搜索引擎-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfSearchengine(record, value){
    //百度=bd 360=qh 搜狗=sg 神马=sm
    if (value == 'bd'){
        return "百度";
    }else if (value == 'qh'){
        return "360";
    }else if (value == 'sg'){
        return "搜狗";
    }else if (value == 'sm'){
        return "神马";
    }
    return "";
}

/**
 * 业主类型 0，1大业主， 2小业主， 3大业主+小业主
 * @author cj 20160426
 */
var renderOfInvestorType = function (record, value) {
    if (value == 0 || value == 1){
        return "大业主";
    }else if (value == 2){
        return "小业主";
    }else if (value == 3){
        return "大业主+小业主";
    }
    return '';
}

/**
 * 控盘数/锁盘数
 * @author cj 20160426
 */
var renderOfOfficeKongpanNumber = function (record, value) {
    if (record.kongpanNumber != null && record.lockNumber != null){
        return record.kongpanNumber + '/' + record.lockNumber;
    }
    return '0/0';

}


function isRegisterUserName(s) {
    if (s == null || s.trim() == '') {
        return false;
    }
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){3,19}$/;
    if (!patrn.exec(s)) {
        return false;
    }
    return true;
}

function isTrueName(s) {
    if (s == null || s.trim() == '') {
        return false;
    }
    var patrn = /[\u4E00-\u9FA5]/;
    if (!patrn.exec(s)) {
        return false;
    }
    if (s.length > 30) {
        return false;
    }
    return true;
}

function isPhone(s) {
    if (s == null || s.trim() == '') {
        return false;
    }
    var patrn = /^1\d{10}$/;
    if (!patrn.exec(s)) {
        return false;
    }
    return true;
}

function isPasswd(s) {
    if (s == null || s.trim() == '') {
        return false;
    }
    var patrn = /^(\w){4,20}$/;
    if (!patrn.exec(s)) {
        return false;
    }
    return true;
}

function isEmail(s) {
    if (s == null || s.trim() == '') {
        return false;
    }
    var patrn = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!patrn.exec(s)) {
        return false;
    }
    if (s.length > 100) {
        return false;
    }
    return true;
}

