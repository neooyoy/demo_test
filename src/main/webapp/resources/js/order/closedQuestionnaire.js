var grid_id = "grid_id";
var cityId = $('#cityIds').val();
/**
 * 默认状态条件(已关闭:无效,已和其他合作)
 */
var default_statuses = "3,4";
/**
 * 默认条件(无限制)
 */
var doneLookCountStart = null;
var initUrl = base+'/callback/order';
var queryUrl = base+'/callback/queryList';
var addUrl = base+'';
var modifyUrl = base+'';
var deleteUrl = base+'';
var detailUrl = base+'/callback/detail';

var findOffice = null;
var reasons = new Array();
var serviceReasons = new Array();
var isShowAll = false;
var firstChoose = true;

var order = 'c.id';

var departmentComboxData = [];

var searchDepIds = '';
var searchUserIds = '';

var personName_combobox_id = null;
var personName_combobox_name = null;

var officeName_combobox_id = null;
var officeName_combobox_name = null;

var personId = null;

var searchParams = [];

var columns = [
               { field: 'customerId', title: '客户编号', width: 150, align: 'center', sortable: false },
               { field: 'customerName', title: '客户姓名', width: 150, align: 'center', sortable: false,render:nameRender },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
               { field: 'orderSource', title: '来源', width: 150, align: 'center', sortable: false,render:sourceRender },
               { field: 'accendantName', title: '客户归属', width: 150, align: 'center', sortable: false },
               { field: 'customerCreateAt', title: '创建时间', width: 150, align: 'center', sortable: true,convert: convertDate },
               { field: 'systemresourceReason1', title: '关闭原因', width: 150, align: 'center', sortable: false },
               { field: 'status5StopTime', title: '关闭时间', width: 150, align: 'center', sortable: false,render: convertCloseDate },
               { field: 'totalCount', title: '回访次数', width: 150, align: 'center', sortable: false },
               { field: 'issuccess', title: '回访结果', width: 150, align: 'center', sortable: false,render:resultRender },
               { field: 'modifyAt', title: '上次回访时间', width: 150, align: 'center', sortable: false,convert: convertDate },
               { field: 'reason', title: '上次回访不成功原因', width: 150, align: 'center', sortable: false,render:reasonRender },
               { field: 'opt', title: '操作', width: 150, align: 'center', sortable: false ,render:optRender}
           ];


var gridOptions = {
        id: grid_id,
        pageSize: 20,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'desc'
        },
        trTdentity: 'id',
        url: queryUrl,
        tHeadCols:columns
     };

function nameRender(record,value){
	if(record.isPerfection=='1'){
		return value+"(未维护)";
	}else if(!value){
		return "信息未完善";
	}else{
		return value;
	}
}

function openSelectPage(pageType){
	var openUrl = initUrl +"?pageType="+pageType;
	window.location.href = openUrl;
}

function checkReason(obj){
	keyCheck($(obj).val(),reasons);
}

function checkFindOffice(obj){
	if(findOffice==null){
		findOffice = $(obj).val();
	}else{
		findOffice = null;
	}
}

function checkServiceReason(obj){
	keyCheck($(obj).val(),serviceReasons);
}

function checkAll(obj){
	var findOfficObj = $("#findOffice");
	var reasonObj = $("[name='reason']");
	var serviceReasonObj = $("[name='serviceReason']");
	if($(obj).attr("checked")){
		findOffice = $(findOfficObj).val();
		for(var i=0;i<reasonObj.length;i++){
			keyCheckNoRepeat($(reasonObj[i]).val(),reasons);
		}
		for(var i=0;i<serviceReasonObj.length;i++){
			keyCheckNoRepeat($(serviceReasonObj[i]).val(),serviceReasons);
		}
	}else{
		findOffice = null;
		reasons.length = 0;
		serviceReasons.length = 0;
	}
//	alert(reasons.join(","));
//	alert(serviceReasons.join(","));
}


function showself(obj){
	if($(obj).attr("checked")){
		personName_combobox_id = $('#userId').val();
	    personName_combobox_name = $('#useName').val();
	    personId = personName_combobox_id;
	    $('#personName').combobox("setValue", personName_combobox_name);
	    $('#personName').combobox("setText", personName_combobox_name);
        reloadCustomerGridAfterCleanSearchConditions();
	}else{
		personName_combobox_id = '';
	    personName_combobox_name = '';
	    personId = '';
	    $('#personName').combobox("setValue", '');
	    $('#personName').combobox("setText", '');
	    reloadCustomerGridAfterCleanSearchConditions();
	}
}

function reasonRender(record,value){
	var ret = "";
	if(value=='1'){
		ret = "电话号码不正确";
	}
	if(value=='2'){
		ret = "客户挂断";
	}
	if(value=='3'){
		ret = "客户未接听";
	}
	return ret;
}

function resultRender(record,value){
	var ret = "未回访";
//	if(value=='1'){
//		ret = "未回访"
//	}
	if(value=='2'){
		ret = "回访成功";
	}
	if(value=='3'){
		ret = "回访不成功";
	}
	return ret;
}

function sourceRender(record,value){
	return getCustomerOrderSource(value);
}

function optRender(record){
	var ret = "<button type='button'  class='btn btn-default' onclick='detail(\""+ record.customerId +"\");'>查看详细记录并回访</button>&nbsp;";
	
	return ret;
}

//function nameRender(record, value){
//	var url = detailUrl+"?customerId="+record.id;
//	var tags = '';
//	if(record.systemresource1Orderid!=''&&record.systemresource1Orderid!=null&&record.systemresource1Orderid!='null'&&record.systemresource1Orderid!=undefined){
//		tags += '<span class="msg-tag-red poshytooltip" title="客服分配客户需要半小时内跟进">急</span>&nbsp;';		
//	}
//	if(record.reverseLookNumber!=''&&record.reverseLookNumber!=null&&record.reverseLookNumber!='null'&&record.reverseLookNumber!=undefined){	
//		tags += '<a onclick=window.open("'+url+'") class="msg-tag-green poshytooltip" title="该客户需要三日内完成预约带看">看('+record.reverseLookNumber+')</a>&nbsp;';
//	}
//	
//	var ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a><br/>" + tags ;
//	return ret;
//}

//function budgetRender(record, value){
//	return record.orderPriceBegin +'-'+ record.orderPriceEnd +'(元/平/天)<br/>' + record.orderPriceMonthBegin+'-'+ record.orderPriceMonthEnd + '(元/月)';
//}

function convertCloseDate(record,date){
	if(!(!parseInt(date))){
		var showDate = parseInt(date);
		return dateHMZToDateTime(showDate*1000);
	}else if(!(!parseInt(record.systemresourceAt))){
		var showDate = parseInt(record.systemresourceAt);
		return dateHMZToDateTime(showDate*1000);
	}else{
		return "";
	}
}

function convertDate(date){
	if(!date){
		return '';
	}else{
		return dateHMZToDateTime(date*1000);	
	}
}

function initFollow(id){
	var url = detailUrl+"?customerId="+id;
	window.open(url);
}

function detail(customerId){
	var url = detailUrl+"?customerId="+customerId;
	window.open(url);
}
function openAddCustomerPage(){
	var initAddUrl = base+"/customer/customerAddpage"; 
	window.open(initAddUrl);
}


$(function () {
	
	 $('#check_all').click(function(ev){
		 checkAll(this);
         $('input[iscontrol=true]').attr('checked',$('#check_all').prop('checked'));
    });

    $('input[iscontrol=true]').click(function(ev){
    	if($(this).attr("name")=='reason'){
    		checkReason(this);
    	}
    	if($(this).attr("name")=='findOffice'){
    		checkFindOffice(this);
    	}
    	if($(this).attr("name")=='serviceReason'){
    		checkServiceReason(this);
    	}
        $('#check_all').attr('checked',
            $('input[iscontrol=true]:checked').length == $('input[iscontrol=true]').length);
    });
	
	var data = [];
    var cityName = '';
    var cityIds = '';
    var cityArray = cityId.split(',');
    for (var i=0; i<cityArray.length; i++){
        cityName = getCityName(cityArray[i]);
        if (cityName != ''){
            cityIds += cityArray[i] + ",";
            data.push({'id': cityArray[i], 'name': cityName});
        }
    }
    cityIds = cityIds.substring(0, cityIds.length-1);
    if (cityIds != ''){
        // 拼接函数(索引位置, 要删除元素的数量, 元素)
        data.splice(0, 0, {'id': cityIds, 'name': '全部'})
    }

    /**
     * 生成城市-分布-商圈公共控件
     */
    initCityDistrictBusinessCircle(data, "city_combox_order", "district_combox_order", "businesscircle_combox_order");

    $('[name=created_at_begin]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('[name=created_at_end]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });
    
    $('[name=callback_at_begin]').datepicker({
    	format : 'yyyy-mm-dd',
    	todayHighlight:true,
    	todayBtn:'linked'
    });
    
    $('[name=callback_at_end]').datepicker({
    	format : 'yyyy-mm-dd',
    	todayHighlight:true,
    	todayBtn:'linked'
    });

//    $('[name=begin_time]').datepicker({
//        format : 'yyyy-mm-dd',
//        todayHighlight:true,
//        todayBtn:'linked'
//    });
//
//    $('[name=end_time]').datepicker({
//        format : 'yyyy-mm-dd',
//        todayHighlight:true,
//        todayBtn:'linked'
//    });

    



    /**
     * 生成房源列表
     * @type {dataGrid}
     */
    $.fn[grid_id] = new dataGrid();

    clearSearchValue();

//    setDefaultSearchByUserName();

    $("#"+grid_id)[grid_id].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth : gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        isOverWriteThclick: true,
        params: getListGridParams(),
        order : gridOptions.params.order,
        onload:function(){
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        tBodyTrDblclickCallBack: function (record) {
//            var url = detailUrl + "?customerId=" + record["id"];
//            window.open(url, record["id"]);
        },
        _handleTbodyTrClick: function(record){
            //var url = base + "/houseController/houseModify?id=" + record["id"];
            //window.open(url, record["id"]);
        },
        thClickCallback: function(orderField){
        	order = orderField;
            //联表查询排序，判断排序字段
            if (order == 'id'){
                order = 'c.id';
            }else if (order == 'customerName'){
                order = 'c.customerName';
            }else if (order == 'phoneNum'){
                order = 'c.phoneNum';
            }else if (order == 'accendantName'){
                order = 'c.accendantName';
            }else if (order == 'orderSource'){
                order = 'c.orderSource';
            }else if (order == 'customerCreateAt'){
                order = 'c.createAt';
            }else if (order == 'budget'){
                order = 'c.orderPriceBegin';
            }else if (order == 'lastFollowTime'){
                order = 'c.lastfollow_at';
            }else if (order == 'donelookCount'){
                order = 'c.donelook_count';
            }else if (order == 'followCount'){
                order = 'c.follow_count';
            }else if (order == 'opt'){
            	return;
            }

            $("#"+grid_id)[grid_id].reload({
                params: getListGridParams()
            });
        }
    });

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();
});


/**
 * 点击更多按钮，显示更多搜索项
 */
var searchMoreBtnClick = function(){
    var display = $("#moreSearchConditionsDiv").css("display");
    if (display == 'none'){
        $("#moreSearchConditionsDiv").css("display", 'block');
        $("#more_caret").removeClass("caret");
        $("#more_caret").addClass("caret-open");
    }else{
        $("#moreSearchConditionsDiv").css("display", 'none');
        $("#more_caret").removeClass("caret-open");
        $("#more_caret").addClass("caret");
    }
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
	$("#searchForm")[0].reset();
	findOffice = null;
	reasons.length = 0;
	serviceReasons.length = 0;
	$('#check_all').attr("checked",false);
	$('input[iscontrol=true]').attr("checked",false);
    $("#departmentCombox").combobox("setValues", []);
    $("#departmentUserComboxTree").combotree("setValues",'');
    $('#departmentUserComboxTree').combotree("loadData","");

    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
        if(conditions[i].id == 'condition_customerCreateAt'){
            $('#created_at_begin').val('');
            $('#created_at_end').val('');
        }else if(conditions[i].id == 'condition_callBackAt'){
            $('#callback_at_begin').val('');
            $('#callback_at_end').val('');
        }else if (conditions[i].id == 'condition_personName'){
            $('#personName').combobox('setValue', '');
            personName_combobox_id = null;
            personName_combobox_name = null;
            personId = null;
        }else if (conditions[i].id == 'condition_departmentCombox'){
            $("#departmentCombox").combobox("setValues", []);
            $("#departmentUserComboxTree").combotree("setValues",'');
            $('#departmentUserComboxTree').combotree("loadData","");
        }if (conditions[i].id == 'condition_city_combox_order'){
            $('#city_combox_order').val('');
            $('#district_combox_order').val('');
            $("#district_combox_order").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
            $('#businesscircle_combox_order').val('');
            $("#businesscircle_combox_order").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        }else if (conditions[i].id == 'condition_district_combox_order'){
            $('#district_combox_order').val('');
            $('#businesscircle_combox_order').val('');
            $("#businesscircle_combox_order").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        }else{
            $("#" + conditions[i].id.substring(10, conditions[i].id.length)).val('');
        }
    }

    cleanSearchConditionsValue();

    //setDefaultSearchByUserName();

    reloadCustomerGridAfterCleanSearchConditions();
}

var departmentComboxOnLoad =  function(){
    $('#departmentCombox').combobox('setValues', -1);
    departmentComboxChange();
}

/**
 * 搜索
 */
var reloadCustomerGrid = function(){


    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();


    $("#"+grid_id)[grid_id].options.checkedRecords = [];

    $("#"+grid_id)[grid_id].reload({
        params: getListGridParams()
    });
};

/**
 * 获取列表刷新时的参数
 */
var getListGridParams = function(){
    
	var status = $("#status").val();
	var statuses = "";
	if(status==''||status==null||status==undefined){
		statuses = default_statuses;
	}else{
		statuses = status;
	}
	

    var createAtBegin =  $('#created_at_begin').val();
    if (createAtBegin != null && createAtBegin !=''){
        var begin = new Date(createAtBegin.replace(/-/g, ','));
        createAtBegin = parseInt(begin.getTime()/1000);
    }

    var createAtEnd =  $('#created_at_end').val();
    if (createAtEnd != null && createAtEnd !=''){
        var end = new Date(createAtEnd.replace(/-/g, ','));
        createAtEnd = parseInt((end.getTime() + 24*3600*1000)/1000);
    }
    var callback_at_begin = $("#callback_at_begin").val();
    if (callback_at_begin != null && callback_at_begin !=''){
    	var begin = new Date(callback_at_begin.replace(/-/g, ','));
    	callback_at_begin = parseInt(begin.getTime()/1000);
    }
    var callback_at_end = $("#callback_at_end").val();
    if (callback_at_end != null && callback_at_end !=''){
    	var end = new Date(callback_at_end.replace(/-/g, ','));
    	callback_at_end = parseInt((end.getTime() + 24*3600*1000)/1000);
    }
    
    var purpose = $("#purpose").val();

    var personName = '';
    /*var personNameId = $('#personName').combobox('getValue');
    var pesonNameText = $('#personName').combobox('getText');
    if (personNameId != null && pesonNameText != '' && pesonNameText != null && pesonNameText != ''){
        if (personNameId == personName_combobox_id && pesonNameText == personName_combobox_name){
            searchUserIds = personNameId;
        }else{
            personName = personNameId;
        }
    }*/
    
    if (personId != null){
        searchUserIds = personId;
    }else{
        personName = $('#personName').combobox('getText');
    }

    var create_mode = $("#create_mode").val();


    var params = {
    		'id':$("#id").val(),
            //'status':status,
            'statuses':statuses,
            'create_mode':create_mode,
            'customerName':$("#customerName").val(),
            'phoneNum':$("#phoneNum").val(),
            //'lastFollowTime':lastFollowTime,
            'callback_at_begin':callback_at_begin,
            'callback_at_end':callback_at_end,
            'createAtBegin': createAtBegin,
            'createAtEnd': createAtEnd,
            'issuccess':$("#issuccess").val(),
            'countType':$("#countType").val(),
            'purpose':purpose,
            'personName': personName.trim(),
            'createAtBegin': createAtBegin,
            'createAtEnd': createAtEnd,
//            'searchDepIds': searchDepIds,
            'searchUserIds': searchUserIds,
            'orderSources':$("#orderSource").val(),
            'doneLookCountStart':doneLookCountStart,
            'cityIds' :  $('#city_combox_order').val(),
            'orderDistrictId':  $('#district_combox_order').val(),
            'orderBusinesscircleId': $('#businesscircle_combox_order').val(),
            'findOffice':findOffice,
            'reasons':reasons.join(","),
            'serviceReasons':serviceReasons.join(","),
            'systemresourceReason1':$("#systemresourceReason1").val(),
            "sort" : $('#'+grid_id)[grid_id].options.sort,
            "order": order
    }

    return params;
}

var personNameSelect = function(record){
    personName_combobox_id = record.userId;
    personName_combobox_name = record.fullname;

    personId = personName_combobox_id;
}


/**
 * 清空搜索条件后加载列表
 */
var reloadCustomerGridAfterCleanSearchConditions = function(){

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();

    order = 'c.id';

    //$("#grid_id")['grid_id'].options.sort_class = '';
    $("#"+grid_id)[grid_id].options.tBoolCheckbox = false;
    $("#"+grid_id)[grid_id].options.checkedRecords = [];

    $("#"+grid_id)[grid_id].reload({
        params: getListGridParams()
    });
};


/**
 * 组织架构change时，重新加载组织架构人员
 */
var departmentComboxChange = function(){
    departmentComboxData = $('#departmentCombox').combobox('getData');
    var departmentIdArray = $('#departmentCombox').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0){
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");
        return;

       /* var data = departmentComboxData;

        if (data != null && data.length > 0){
            for (var i=0; i<data.length; i++){
                if (data[i]["deptId"] != -1){
                    departmentIds += data[i]["deptId"]+',';
                }
            }
            departmentIds = departmentIds.substring(0, departmentIds.length-1)
        }*/
    }else if (departmentIdArray.length > 1){
        for (var i=0; i<departmentIdArray.length; i++){
            if (departmentIdArray[i] != -1){
                departmentIds += departmentIdArray[i]+',';
            }
        }
        departmentIds = departmentIds.substring(0, departmentIds.length-1)
    }else{
        if (departmentIdArray[0] == -1){
            //var data = $('#departmentCombox').combobox('getData');
            var data = departmentComboxData;

            if (data != null && data.length > 0){
                for (var i=0; i<data.length; i++){
                    if (data[i]["deptId"] != -1){
                        departmentIds += data[i]["deptId"]+',';
                    }
                }
                departmentIds = departmentIds.substring(0, departmentIds.length-1)
            }
        }else{
            departmentIds = departmentIdArray[0];
        }
    }

    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];

    if (departmentIds == ''){
        return;
    }

    $('#departmentUserComboxTree').combotree({
        queryParams:{
            departmentIds : departmentIds,
            loop: true,
            inTheSelectDepartments:inTheSelectDepartments
        },
        url:base+'/departmentController/loadDepartmentUserTreeNodes',
        method:'post',
        panelHeight: '400px',
    });

    //$('#departmentUserComboxTree').combotree('tree').tree('getChecked')

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes?departmentIds='+departmentIds);

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes');

}





/**
 * 清空搜索条件框值
 */
var cleanSearchConditionsValue = function(){
    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
        $('#' + conditions[i].id).css('display', 'none');
        $('#' + conditions[i].id).html('');
    }

    $('#searchConditonsDiv').css('display', 'none');
}

/**
 * 默认展示归属在当前登录用户下的房源
 */
//var setDefaultSearchByUserName = function () {
//
//    personName_combobox_id = $('#userId').val();
//    personName_combobox_name = $('#useName').val();
//    personId = personName_combobox_id;
//
//    //$('#personName').combobox("setValue", personName_combobox_id);
//    $('#personName').combobox("setValue", personName_combobox_name);
//    $('#personName').combobox("setText", personName_combobox_name);
//}

/**
 * 设置搜索条件框值
 */
var setSearchConditionsValue = function(){
    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
        if (conditions[i].id == 'condition_customerCreateAt'){
            var created_at_begin = $('#created_at_begin').val();
            var created_at_end = $('#created_at_end').val();
            var value = '';
            if (created_at_begin != null && created_at_begin != '' && created_at_end != null && created_at_end != '') {
                value = '创建时间：' +created_at_begin + '至' + created_at_end;
            } else if (created_at_begin != null && created_at_begin != '' && (created_at_end == null || created_at_end == '')) {
                value = '创建时间：开始于' + created_at_begin;
            } else if (created_at_end != null && created_at_end != '' && (created_at_begin == null || created_at_begin == '')) {
                value = '创建时间：截止于' + created_at_end;
            }

            if (value != ''){
                $('#condition_customerCreateAt').css('display', 'inline');
                $('#condition_customerCreateAt').html(value);
            }else{
                $('#condition_customerCreateAt').css('display', 'none');
                $('#condition_customerCreateAt').html('');
            }
        }else if (conditions[i].id == 'condition_callBackAt'){
            var callback_at_begin = $('#callback_at_begin').val();
            var callback_at_end = $('#callback_at_end').val();
            var value = '';
            if (callback_at_begin != null && callback_at_begin != '' && callback_at_end != null && callback_at_end != '') {
                value = '最后回访时间：' +callback_at_begin + '至' + callback_at_end;
            } else if (callback_at_begin != null && callback_at_begin != '' && (callback_at_end == null || callback_at_end == '')) {
                value = '最后回访时间：开始于' + callback_at_begin;
            } else if (callback_at_end != null && callback_at_end != '' && (callback_at_begin == null || callback_at_begin == '')) {
                value = '最后回访时间：截止于' + callback_at_end;
            }

            if (value != ''){
                $('#condition_callBackAt').css('display', 'inline');
                $('#condition_callBackAt').html(value);
            }else{
                $('#condition_callBackAt').css('display', 'none');
                $('#condition_callBackAt').html('');
            }
        }else if (conditions[i].id == 'condition_departmentCombox'){
            var value = '';
            var checkedNodes = $('#departmentUserComboxTree').combotree('tree').tree('getChecked');
            if (checkedNodes != null && checkedNodes.length != 0){
                var depIds = '';
                var depNames = '';
                var userIds = '';
                var userNames = '';
                for (var j=0; j<checkedNodes.length; j++){
                    if (checkedNodes[j].userNode){
                        userIds += checkedNodes[j].id+',';
                        userNames += checkedNodes[j].text+',';
                    }else{
                        depIds += checkedNodes[j].id+',';
                        depNames += checkedNodes[j].text+',';
                    }
                }
                if (userIds != ''){
                    userIds = userIds.substring(0, userIds.length-1);
                    userNames = userNames.substring(0, userNames.length-1);
                }
                if (depIds != ''){
                    depIds = depIds.substring(0, depIds.length-1);
                    depNames = depNames.substring(0, depNames.length-1);
                }

                searchDepIds = depIds;
                searchUserIds = userIds;

                if (userIds != '' && depIds == ''){
                    var length = userNames.length;
                    if (length > 15){
                        userNames = userNames.substring(0,15) + '...';
                    }
                    value = "组织/人员：" + userNames;
                }else if (userIds != '' && depIds != ''){
                    var length = depNames.length;
                    if (length > 15){
                        depNames = depNames.substring(0,15) + '...';
                    }
                    length = userNames.length;
                    if (length > 15){
                        userNames = userNames.substring(0,15) + '...';
                    }
                    value = "组织/人员：" + depNames + userNames;
                }else if (userIds == '' && depIds != ''){
                    var length = depNames.length;
                    if (length > 15){
                        depNames = depNames.substring(0,15) + '...';
                    }
                    value = "组织/人员：" + depNames;
                }
            }else{
                var depIds = '';
                var depNames = '';
                var departments = $('#departmentCombox').combobox('getValues');
                if (departments != null && departments.length != 0){
                    for (var j=0; j<departments.length; j++){
                        if (departments[j] != -1){
                            depIds += departments[j]+',';
                        }
                    }
                    if (depIds != ''){
                        depIds = depIds.substring(0, depIds.length-1);
                        depNames = $('#departmentCombox').combobox('getText');
                    }
                }
                searchDepIds = depIds;
                searchUserIds = '';

                if (depIds != ''){
                    value = "组织/人员：" + depNames;
                }
            }
            if (value != ''){
                $('#condition_departmentCombox').css('display', 'inline');
                $('#condition_departmentCombox').html(value);
            }else{
                $('#condition_departmentCombox').css('display', 'none');
                $('#condition_departmentCombox').html('');
            }
        }else if (conditions[i].id == 'condition_personName'){
            var value = $('#personName').combobox('getText');
            if (value != null && value != ''){
                $('#condition_personName').css('display', 'inline');
                $('#condition_personName').html("人员：" + value)
            }else{
                $('#condition_personName').css('display', 'none');
                $('#condition_personName').html('');
            }
        }else if(conditions[i].id =='condition_id'){
        	var value = $("#id").val();
        	if (value != null && value != ''){
                $('#condition_id').css('display', 'inline');
                $('#condition_id').html("客户编号：" + value)
            }else{
                $('#condition_id').css('display', 'none');
                $('#condition_id').html('');
            }
        	
        }else if(conditions[i].id =='condition_status'){
        	var value = $("#status").val();
        	var value_text = $("#status option:selected").text();
        	if (value != null && value != ''){
                $('#condition_status').css('display', 'inline');
                $('#condition_status').html("客户状态：" + value_text)
            }else{
                $('#condition_status').css('display', 'none');
                $('#condition_status').html('');
            }
        	
        }else if(conditions[i].id =='condition_customer_level'){
        	var value = $("#customer_level").val();
        	var value_text = $("#customer_level option:selected").text();
        	if (value != null && value != ''){
                $('#condition_customer_level').css('display', 'inline');
                $('#condition_customer_level').html("客户等级：" + value_text)
            }else{
                $('#condition_customer_level').css('display', 'none');
                $('#condition_customer_level').html('');
            }
        }else if(conditions[i].id =='condition_customerName'){
        	var value = $("#customerName").val();
        	if (value != null && value != ''){
                $('#condition_customerName').css('display', 'inline');
                $('#condition_customerName').html("客户姓名：" + value)
            }else{
                $('#condition_customerName').css('display', 'none');
                $('#condition_customerName').html('');
            }
        }else if(conditions[i].id =='condition_phoneNum'){
        	var value = $("#phoneNum").val();
        	if (value != null && value != ''){
                $('#condition_phoneNum').css('display', 'inline');
                $('#condition_phoneNum').html("手机号：" + value)
            }else{
                $('#condition_phoneNum').css('display', 'none');
                $('#condition_phoneNum').html('');
            }
        }else if(conditions[i].id =='condition_issuccess'){
        	var value = $("#issuccess").val();
        	var value_text = $("#issuccess option:selected").text();
        	if (value != null && value != ''){
                $('#condition_issuccess').css('display', 'inline');
                $('#condition_issuccess').html("上次回访状态：" + value_text)
            }else{
                $('#condition_issuccess').css('display', 'none');
                $('#condition_issuccess').html('');
            }
        }else if(conditions[i].id =='condition_countType'){
        	var value = $("#countType").val();
        	var value_text = $("#countType option:selected").text();
        	if (value != null && value != ''){
                $('#condition_countType').css('display', 'inline');
                $('#condition_countType').html("客源状态：" + value_text)
            }else{
                $('#condition_countType').css('display', 'none');
                $('#condition_countType').html('');
            }
        }else if(conditions[i].id =='condition_purpose'){
        	var value = $("#purpose").val();
        	var value_text = $("#purpose option:selected").text();
        	if (value != null && value != ''){
                $('#condition_purpose').css('display', 'inline');
                $('#condition_purpose').html("预约带看：" + value_text)
            }else{
                $('#condition_purpose').css('display', 'none');
                $('#condition_purpose').html('');
            }
        }else if(conditions[i].id =='condition_orderSource'){
        	var value = $("#orderSource").val();
        	var value_text = $("#orderSource option:selected").text();
        	if (value != null && value != ''){
                $('#condition_orderSource').css('display', 'inline');
                $('#condition_orderSource').html("来源：" + value_text)
            }else{
                $('#condition_orderSource').css('display', 'none');
                $('#condition_orderSource').html('');
            }
        }else if(conditions[i].id =='condition_create_mode'){
        	var value = $("#create_mode").val();
        	var value_text = $("#create_mode option:selected").text();
        	if (value != null && value != ''){
                $('#condition_create_mode').css('display', 'inline');
                $('#condition_create_mode').html("客户创建方式：" + value_text)
            }else{
                $('#condition_create_mode').css('display', 'none');
                $('#condition_create_mode').html('');
            }
        }else if(conditions[i].id =='condition_systemresourceReason1'){
        	var value = $("#systemresourceReason1").val();
        	var value_text = $("#systemresourceReason1 option:selected").text();
        	if (value != null && value != ''){
                $('#condition_systemresourceReason1').css('display', 'inline');
                $('#condition_systemresourceReason1').html("来源：" + value_text)
            }else{
                $('#condition_systemresourceReason1').css('display', 'none');
                $('#condition_systemresourceReason1').html('');
            }
        }else{
            var value = $("#" + conditions[i].id.substring(10, conditions[i].id.length)).val();
            if (value != null && value != ''){
                $('#' + conditions[i].id).css('display', 'inline');
                var id = conditions[i].id.substring(10, conditions[i].id.length);
                $('#' + conditions[i].id).html($("#"+id)[0].options[$("#"+id)[0].selectedIndex].text);
            }else{
                $('#' + conditions[i].id).css('display', 'none');
                $('#' + conditions[i].id).html('');
            }
        }
    }
}

/**
 * 设置当前已选择的搜索条件框是否显示
 */
var setSearchConditionsStatus = function(){
    var searchConditonsDiv_show = false;
    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
        if (conditions[i].style.display == 'inline'){
            searchConditonsDiv_show = true;
            break;
        }
    }
    if (searchConditonsDiv_show){
        $('#searchConditonsDiv').css('display', 'block');
    }else{
        $('#searchConditonsDiv').css('display', 'none');
    }
}

/**
 * 已选择搜索条件-取消事件
 * @param obj
 */
var deSelectSearchConditons = function(obj){
    if(obj.id == 'condition_customerCreateAt'){
        $('#created_at_begin').val('');
        $('#created_at_end').val('');
    }else if(obj.id == 'condition_callBackAt'){
        $('#callback_at_begin').val('');
        $('#callback_at_end').val('');
    }else if (obj.id == 'condition_departmentCombox'){
        $("#departmentCombox").combobox("setValues", []);
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");
    }else if (obj.id == 'condition_personName'){
    	$("#showSelf").attr("checked", false); 
        $('#personName').combobox('setValue', '');
        personName_combobox_id = null;
        personName_combobox_name = null;
        personId = null;
    }else if(obj.id == 'condition_id'){
    	$("#id").val('');
    }else if(obj.id == 'condition_status'){
    	$("#status").val('');
    }else if(obj.id == 'condition_customer_level'){
    	$("#customer_level").val('');
    }else if(obj.id == 'condition_customerName'){
    	$("#customerName").val('');
    }else if(obj.id == 'condition_phoneNum'){
    	$("#phoneNum").val('');
    }else if(obj.id == 'condition_issuccess'){
    	$("#issuccess").val('');
    }else if(obj.id == 'condition_countType'){
    	$("#countType").val('');
    }else if(obj.id == 'condition_purpose'){
    	$("#purpose").val('');
    }else if(obj.id == 'condition_orderSource'){
    	$("#orderSource").val('');
    }else if(obj.id == 'condition_create_mode'){
    	$("#create_mode").val('');
    }else if (obj.id == 'condition_city_combox_order'){
        $('#city_combox_order').val('');
        $('#district_combox_order').val('');
        $("#district_combox_order").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
        $('#businesscircle_combox_order').val('');
        $("#businesscircle_combox_order").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    }else if (obj.id == 'condition_district_combox_order'){
        $('#district_combox_order').val('');
        $('#businesscircle_combox_order').val('');
        $("#businesscircle_combox_order").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    }else{
        $("#" + obj.id.substring(10, obj.id.length)).val('');
    }

    //重新搜索房源列表
    reloadCustomerGrid();
}



/**
 * 批量调整房源归属
 */
var changeAccendantPerson = function(){
    var checkedRecords = $("#"+grid_id)[grid_id].options.checkedRecords;

    if (checkedRecords == null || checkedRecords.length == 0){
        alert('您还没有选择任何可分配房源')
    }else{
        $('#housecheck_number').text(checkedRecords.length);
    }
}


/**
 * 组织架构change时，重新加载组织架构人员
 */
var departmentComboxChange_changeAccendantPerson = function(){
    departmentComboxData = $('#departmentCombox_changeAccendantPerson').combobox('getData');
    var departmentIdArray = $('#departmentCombox_changeAccendantPerson').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0){
        $("#departmentUserComboxTree_changeAccendantPerson").combotree("setValues",'');
        $('#departmentUserComboxTree_changeAccendantPerson').combotree("loadData","");
        return;
    }else if (departmentIdArray.length > 1){
        for (var i=0; i<departmentIdArray.length; i++){
            if (departmentIdArray[i] != -1){
                departmentIds += departmentIdArray[i]+',';
            }
        }
        departmentIds = departmentIds.substring(0, departmentIds.length-1)
    }else{
        if (departmentIdArray[0] == -1){
            //var data = $('#departmentCombox').combobox('getData');
            var data = departmentComboxData;

            if (data != null && data.length > 0){
                for (var i=0; i<data.length; i++){
                    if (data[i]["deptId"] != -1){
                        departmentIds += data[i]["deptId"]+',';
                    }
                }
                departmentIds = departmentIds.substring(0, departmentIds.length-1)
            }
        }else{
            departmentIds = departmentIdArray[0];
        }
    }

    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];

    if (departmentIds == ''){
        return;
    }

    $('#departmentUserComboxTree_changeAccendantPerson').combotree({
        queryParams:{
            departmentIds : departmentIds,
            loop: false,
            inTheSelectDepartments:inTheSelectDepartments
        },
        url:base+'/departmentController/loadDepartmentUserTreeNodes',
        method:'post',
        panelHeight: '400px',
    });
}

var combo_changeAccendantPersonLoadSuccess = function(){
    $('#departmentCombox_changeAccendantPerson').combobox('setValue', -1);
}

var personNameLoadSuccess = function(){
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0){
        for (var i=0; i<data.length; i++){
            if (data[i].fullname == value.trim()){
                $('#personName').combobox('setValue', data[i].fullname);
                //$('#personName').combobox('setText', value);
                personName_combobox_id = data[i].userId;
                personName_combobox_name = value;
                personId = personName_combobox_id;
                return;
            }
        }
    }

    personId = null;
}

/**
 * 刷新带看列表
 */
var refreshCustomerList = function(){
	$("#"+grid_id)[grid_id].reload({
        params: getListGridParams()
    });
}


