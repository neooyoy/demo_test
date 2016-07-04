var grid_id = "grid_id";
/**
 * 默认状态条件(成交)
 */
var default_statuses = "5";
var queryUrl = base+'/customer/queryDealCustomer';
var addUrl = base+'';
var modifyUrl = base+'';
var deleteUrl = base+'';
var detailUrl = base+'/customer/customerdetail';

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
               { field: 'id', title: '客户编号', width: 150, align: 'center', sortable: true },
               { field: 'customerName', title: '客户姓名', width: 150, align: 'center', sortable: true,render:nameRender },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: true },
               { field: 'accendantName', title: '客户归属', width: 150, align: 'center', sortable: true },
               { field: 'orderSource', title: '来源', width: 150, align: 'center', sortable: true ,render:sourceRender},
               { field: 'createAt', title: '录入时间', width: 150, align: 'center', sortable: true,convert: convertDate },
               { field: 'budget', title: '预算', width: 150, align: 'center', sortable: true,render:budgetRender },
               { field: 'status5CompleteTime', title: '成单时间', width: 150, align: 'center', sortable: true,convert: convertDate },
               { field: 'followCount', title: '跟进数', width: 150, align: 'center', sortable: true },
               { field: 'donelookCount', title: '完成带看数', width: 150, align: 'center', sortable: true },
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

$(document).ready(function() {
    $('#searchForm').formValidation({
        err: {
            container: 'tooltip'
        },
        icon: {
            valid: 'glyphicon',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {}
    });
});

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

function sourceRender(record,value){
	return getCustomerOrderSource(value);
}

function optRender(record){
	var ret = "<button type='button'  class='btn btn-default' onclick='showDetail(\""+ record.id +"\");'>查看</button>";
	return ret;
}

function nameRender(record,value){
	var url = detailUrl + "?customerId="+record.id;
	var ret = "";
	if(record.isPerfection=='1'){
		ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value +"(未维护)</font></a>";
	}else if(!value){
		ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>信息未完善</font></a>";
	}else{
		ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+value+"</font></a>" ;
	}
	return ret;

}

function budgetRender(record, value){
	return record.orderPriceBegin +'-'+ record.orderPriceEnd +'(元/平/天)<br/>' + record.orderPriceMonthBegin+'-'+ record.orderPriceMonthEnd + '(元/月)';
}

function convertDate(date){
	if(!date){
		return '';
	}else{
		return dateHMZToDateTime(date*1000);	
	}
}

function showDetail(id){
	var url = detailUrl +"?customerId="+id;
	window.open(url);
}

function openAddCustomerPage(){
	var initAddUrl = base+"/customer/customerAddpage"; 
	window.open(initAddUrl);
}


$(function () {
    var data = [];

    /**
     * 生成城市-分布-商圈公共控件
     */
//    initCityDistrictBusinessCircle(data, "city_combox_fangyuan", "district_combox_fangyuan", "businesscircle_combox_fangyuan");

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
    
    $('[name=status5CompleteTimeBegin]').datepicker({
    	format : 'yyyy-mm-dd',
    	todayHighlight:true,
    	todayBtn:'linked'
    });
    
    $('[name=status5CompleteTimeEnd]').datepicker({
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
            var url = detailUrl + "?customerId=" + record["id"];
            window.open(url, record["id"]);
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
            }else if (order == 'createAt'){
                order = 'c.createAt';
            }else if (order == 'budget'){
                order = 'c.orderPriceBegin';
            }else if (order == 'status5CompleteTime'){
                order = 'c.status_5_complete_time';
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
 * 清空搜索条件
 */
var clearSearchValue = function () {
	$("#searchForm")[0].reset();
    $("#departmentCombox").combobox("setValues", []);
    $("#departmentUserComboxTree").combotree("setValues",'');
    $('#departmentUserComboxTree').combotree("loadData","");

    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
        if (conditions[i].id == 'condition_creatTime'){
            $('#created_at_begin').val('');
            $('#created_at_end').val('');
        }else if (conditions[i].id == 'condition_personName'){
            $('#personName').combobox('setValue', '');
            personName_combobox_id = null;
            personName_combobox_name = null;
            personId = null;
        }else if (conditions[i].id == 'condition_departmentCombox'){
            $("#departmentCombox").combobox("setValues", []);
            $("#departmentUserComboxTree").combotree("setValues",'');
            $('#departmentUserComboxTree').combotree("loadData","");
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


    var validate = $('#searchForm').data('formValidation').isValid();

    if (validate != null && !validate){
        alert("请输入正确查询项！");
        return false;
    }

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
    var status5CompleteTimeBegin = $("#status5CompleteTimeBegin").val();
    if (status5CompleteTimeBegin != null && status5CompleteTimeBegin !=''){
    	var begin = new Date(status5CompleteTimeBegin.replace(/-/g, ','));
    	status5CompleteTimeBegin = parseInt(begin.getTime()/1000);
    }
    var status5CompleteTimeEnd = $("#status5CompleteTimeEnd").val();
    if (status5CompleteTimeEnd != null && status5CompleteTimeEnd !=''){
    	var end = new Date(status5CompleteTimeEnd.replace(/-/g, ','));
    	status5CompleteTimeEnd = parseInt((end.getTime() + 24*3600*1000)/1000);
    }
    
    var reserveLook = $("#reserveLook").val();
    if(reserveLook=='1'){
    	var currDate = new Date();
    	reserveLook = parseInt((currDate.getTime()+3*24*3600*1000)/1000);
    }else if(reserveLook=='2'){
    	var currDate = new Date();
    	reserveLook = parseInt(currDate.getTime()/1000);
    }


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




    var params = {
    		'isShowAll':isShowAll,
    		'id':$("#id").val(),
            'status':status,
            'statuses':statuses,
            'customerLevel':$("#customer_level").val(),
            'customerName':$("#customerName").val(),
            'phoneNum':$("#phoneNum").val(),
            //'lastFollowTime':lastFollowTime,
            'status5CompleteTimeBegin':status5CompleteTimeBegin,
            'status5CompleteTimeEnd':status5CompleteTimeEnd,
            'hasFollowRecord':$("#hasFollowRecord").val(),
            'emergency':$("#emergency").val(),
            'reserveLook':reserveLook,
            'personName': personName.trim(),
            'createAtBegin': createAtBegin,
            'createAtEnd': createAtEnd,
//            'searchDepIds': searchDepIds,
            'searchUserIds': searchUserIds,
            'orderSources':$("#orderSource").val(),
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
        if (conditions[i].id == 'condition_creatTime'){
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
                $('#condition_creatTime').css('display', 'inline');
                $('#condition_creatTime').html(value);
            }else{
                $('#condition_creatTime').css('display', 'none');
                $('#condition_creatTime').html('');
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
                $('#condition_status').html("客户筛选：" + value_text)
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
        }else if(conditions[i].id =='condition_status5CompleteTime'){
            var status5CompleteTimeBegin = $('#status5CompleteTimeBegin').val();
            var status5CompleteTimeEnd = $('#status5CompleteTimeEnd').val();
            var value = '';
            if (status5CompleteTimeBegin != null && status5CompleteTimeBegin != '' && status5CompleteTimeEnd != null && status5CompleteTimeEnd != '') {
                value = '成单时间：' +status5CompleteTimeBegin + '至' + status5CompleteTimeEnd;
            } else if (status5CompleteTimeBegin != null && status5CompleteTimeBegin != '' && (status5CompleteTimeEnd == null || status5CompleteTimeEnd == '')) {
                value = '成单时间：开始于' + status5CompleteTimeBegin;
            } else if (status5CompleteTimeEnd != null && status5CompleteTimeEnd != '' && (status5CompleteTimeBegin == null || status5CompleteTimeBegin == '')) {
                value = '成单时间：截止于' + status5CompleteTimeEnd;
            }

            if (value != ''){
                $('#condition_status5CompleteTime').css('display', 'inline');
                $('#condition_status5CompleteTime').html(value);
            }else{
                $('#condition_status5CompleteTime').css('display', 'none');
                $('#condition_status5CompleteTime').html('');
            }
        }else if(conditions[i].id =='condition_hasFollowRecord'){
        	var value = $("#hasFollowRecord").val();
        	var value_text = $("#hasFollowRecord option:selected").text();
        	if (value != null && value != ''){
                $('#condition_hasFollowRecord').css('display', 'inline');
                $('#condition_hasFollowRecord').html("跟进情况：" + value_text)
            }else{
                $('#condition_hasFollowRecord').css('display', 'none');
                $('#condition_hasFollowRecord').html('');
            }
        }else if(conditions[i].id =='condition_emergency'){
        	var value = $("#emergency").val();
        	var value_text = $("#emergency option:selected").text();
        	if (value != null && value != ''){
                $('#condition_emergency').css('display', 'inline');
                $('#condition_emergency').html("客源状态：" + value_text)
            }else{
                $('#condition_emergency').css('display', 'none');
                $('#condition_emergency').html('');
            }
        }else if(conditions[i].id =='condition_reserveLook'){
        	var value = $("#reserveLook").val();
        	var value_text = $("#reserveLook option:selected").text();
        	if (value != null && value != ''){
                $('#condition_reserveLook').css('display', 'inline');
                $('#condition_reserveLook').html("预约带看：" + value_text)
            }else{
                $('#condition_reserveLook').css('display', 'none');
                $('#condition_reserveLook').html('');
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
    if (obj.id == 'condition_creatTime'){
        $('#created_at_begin').val('');
        $('#created_at_end').val('');
    }else if (obj.id == 'condition_departmentCombox'){
        $("#departmentCombox").combobox("setValues", []);
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");
    }else if (obj.id == 'condition_personName'){
        $('#personName').combobox('setValue', '');
        $("#showSelf").attr("checked", false); 
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
    }else if(obj.id == 'condition_status5CompleteTime'){
    	$("#status5CompleteTimeBegin").val('');
    	$("#status5CompleteTimeEnd").val('');
    }else if(obj.id == 'condition_hasFollowRecord'){
    	$("#hasFollowRecord").val('');
    }else if(obj.id == 'condition_emergency'){
    	$("#emergency").val('');
    }else if(obj.id == 'condition_reserveLook'){
    	$("#reserveLook").val('');
    }else if(obj.id == 'condition_orderSource'){
    	$("#orderSource").val('');
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
            loop: true,
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



