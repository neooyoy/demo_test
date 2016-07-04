var grid_id = "grid_id";
var cityId = $('#cityIds').val();
/**
 * 默认状态条件(公海)
 */
var default_statuses = "6,7";
var queryUrl = base+'/customer/querySeaCustomer';
var addUrl = base+'';
var modifyUrl = base+'';
var deleteUrl = base+'';
var detailUrl = base+'/customer/customerdetail';
/**
 * 离职标识
 */
var accendant_quit = "customer_resign_accendant";

var isShowAll = false;
var firstChoose = true;

var order = 'c.id desc,c.status';

var departmentComboxData = [];

var searchDepIds = '';
var searchUserIds = '';


var personId = null;

var searchParams = [];

var columns = [
               { field: 'id', title: '客户编号', width: 150, align: 'center', sortable: true },
               { field: 'customerName', title: '客户姓名', width: 150, align: 'center', sortable: true,render:nameRender},
               { field: 'orderSource', title: '来源', width: 150, align: 'center', sortable: true ,render:sourceRender},
               { field: 'createAt', title: '录入时间', width: 150, align: 'center', sortable: true,convert: convertDate },
               { field: 'department', title: '公海位置', width: 150, align: 'center', sortable: true,render: positionRender },
               { field: 'orderDistrictName', title: '区域', width: 150, align: 'center', sortable: true},
               { field: 'orderBusinesscircleName', title: '商圈', width: 150, align: 'center', sortable: true},
               { field: 'order_area', title: '面积', width: 150, align: 'center', sortable: true,render:areaRender},
               { field: 'budget', title: '预算', width: 150, align: 'center', sortable: true,render:budgetRender },
               { field: 'opt', title: '操作', width: 150, align: 'center', sortable: false ,render:optRender}
           ];


var gridOptions = {
        id: grid_id,
        pageSize: 20,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'asc'
        },
        trTdentity: 'id',
        url: queryUrl,
        tHeadCols:columns
     };


function positionRender(record,value){
	var key = "key"+value;
	var dept = deptjson[key];
	var ret = "";
	if(dept[1]!=''){
		var parentDept = deptjson["key"+dept[1]];
		ret = parentDept[0]+"＞"+dept[0];
	}else{
		ret = dept[0];
	}
	var tags = "";
	if(record.systemresource.indexOf(accendant_quit)!=-1){
		tags += '&nbsp;<span class="msg-tag-red poshytooltip" title="因归属人离职至客户公海">离职</span>&nbsp;';	
	}
	return ret+tags;
}

function sourceRender(record,value){
	return getCustomerOrderSource(value);
}

function optRender(record){
	var ret = "<button type='button'  class='btn btn-default' onclick='receiveCustomer(\""+ record.id +"\",\""+ record.status +"\");'>领取</button>";

	return ret;
}

function receiveCustomer(id,status){
	$.post(base + '/customer/receiveCustomer',
            {
                id: id,
                status:status
            },
            function (result) {
                if (result.success) {
                    $('#myModal-customer').modal('hide');

                    alert(result.message);

                    reloadCustomerGrid();
                } else {
                    alert(result.message);
                }
            })
}

function nameRender(record,value){
	if(record.isPerfection=='1'){
		return value+"(未维护)";
	}else if(!value){
		
		return "信息未完善";
	}else{
		
		return value;
	}
//	var url = detailUrl + "?customerId="+record.id;
//	return "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+value+"</font></a>"

}

function budgetRender(record, value){
	return record.orderPriceBegin +'-'+ record.orderPriceEnd +'(元/平/天)<br/>' + record.orderPriceMonthBegin+'-'+ record.orderPriceMonthEnd + '(元/月)';
}

function areaRender(record, value){
	return record.orderAreaBegin + '-' + record.orderAreaEnd + '平米';
}

function convertDate(date){
	if(!date){
		return '';
	}else{
		return dateHMZToDateTime(date*1000);	
	}
}

function openAddCustomerPage(){
	var initAddUrl = base+"/customer/customerAddpage"; 
	window.open(initAddUrl);
}

$(function () {
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
        data.splice(0, 0, {'id': '', 'name': '全部'})
    }

    /**
     * 生成城市-分布-商圈公共控件
     */
    initCityDistrictBusinessCircle(data, "city_combox_customer", "district_combox_customer", "businesscircle_combox_customer");

    

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
        sort:"asc",
        onload:function(){
            $('.poshytooltip').poshytip({
            	alignX: 'right',
                alignY: 'right'
                
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
            }else if (order == 'createAt'){
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
 * 清空搜索条件
 */
var clearSearchValue = function () {
	$("#searchForm")[0].reset();
    $("#departmentCombox").combobox("setValues", []);
    $("#departmentUserComboxTree").combotree("setValues",'');
    $('#departmentUserComboxTree').combotree("loadData","");

    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
    	if (conditions[i].id == 'condition_city_combox_customer'){
            $('#city_combox_customer').val('');
            $('#district_combox_customer').val('');
            $("#district_combox_customer").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
            $('#businesscircle_combox_customer').val('');
            $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        }else if (conditions[i].id == 'condition_district_combox_customer'){
            $('#district_combox_customer').val('');
            $('#businesscircle_combox_customer').val('');
            $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        }else{
        	$("#" + conditions[i].id.substring(10, conditions[i].id.length)).val('');
        }
    }

    cleanSearchConditionsValue();


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
    
	var statuses = $("#statuses").val();
	if(statuses==''||statuses==null||statuses==undefined){
		statuses = default_statuses;
	}
    var reserveLook = $("#reserveLook").val();
    if(reserveLook=='1'){
    	var currDate = new Date();
    	reserveLook = parseInt((currDate.getTime()+3*24*3600*1000)/1000);
    }else if(reserveLook=='2'){
    	var currDate = new Date();
    	reserveLook = parseInt(currDate.getTime()/1000);
    }
    
    var orderPriceBegin = null;
    var orderPriceEnd = null;
    var orderPriceMonthBegin = null;
    var orderPriceMonthEnd = null;
    var moneytype = $("#moneytype").val();
    if(moneytype == '1'){
    	orderPriceBegin = $("#begin_money").val();
    	orderPriceEnd = $("#end_money").val();
    }else{
    	orderPriceMonthBegin = $("#begin_money").val();
    	orderPriceMonthEnd = $("#end_money").val();
    }
    
    var orderAreaBegin = $("#begin_area").val();
    var orderAreaEnd = $("#end_area").val();



    var params = {
    		'isShowAll':isShowAll,
    		'id':$("#id").val(),
            'status':status,
            'statuses':statuses,
            'customerName':$("#customerName").val(),
            'phoneNum':$("#phoneNum").val(),
            'hasFollowRecord':$("#hasFollowRecord").val(),
            'emergency':$("#emergency").val(),
            'reserveLook':reserveLook,
//            'searchDepIds': searchDepIds,
            'searchUserIds': searchUserIds,
            'orderPriceBegin':orderPriceBegin,
            'orderPriceEnd':orderPriceEnd,
            'orderPriceMonthBegin':orderPriceMonthBegin,
            'orderPriceMonthEnd':orderPriceMonthEnd,
            'orderAreaBegin':orderAreaBegin,
            'orderAreaEnd':orderAreaEnd,
            'cityIds' :  $('#city_combox_customer').val(),
            'orderDistrictId':  $('#district_combox_customer').val(),
            'orderBusinesscircleId': $('#businesscircle_combox_customer').val(),
            'orderSources':$("#orderSource").val(),
            "sort" : $('#'+grid_id)[grid_id].options.sort,
            "order": order
    }

    return params;
}



/**
 * 清空搜索条件后加载列表
 */
var reloadCustomerGridAfterCleanSearchConditions = function(){

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();

    order = 'c.status';

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
 * 设置搜索条件框值
 */
var setSearchConditionsValue = function(){
    var conditions = $('[name=searchCondition]');
    for (var i=0; i<conditions.length; i++){
    	if (conditions[i].id == 'condition_money') {
            var begin_money = $('#begin_money').val();
            var end_money = $('#end_money').val();
            var value = '';
            if (begin_money != null && begin_money != '' && end_money != null && end_money != '') {
                value = '预算：' +begin_money + '-' + end_money;
            } else if (begin_money != null && begin_money != '' && (end_money == null || end_money == '')) {
                value = '预算：不小于' + begin_money;
            } else if (end_money != null && end_money != '' && (begin_money == null || begin_money == '')) {
                value = '预算：不大于' + end_money;
            }

            if (value != ''){
                $('#condition_money').css('display', 'inline');
                $('#condition_money').html(value + "(" + $("#moneytype")[0].options[$("#moneytype")[0].selectedIndex].text + ")");
            }else{
                $('#condition_money').css('display', 'none');
                $('#condition_money').html('');
            }
        }
        else if (conditions[i].id == 'condition_area'){
            var begin_area = $('#begin_area').val();
            var end_area = $('#end_area').val();
            var value = '';
            if (begin_area != null && begin_area != '' && end_area != null && end_area != '') {
                value = '面积：' +begin_area + '-' + end_area;
            } else if (begin_area != null && begin_area != '' && (end_area == null || end_area == '')) {
                value = '面积：不小于' + begin_area;
            } else if (end_area != null && end_area != '' && (begin_area == null || begin_area == '')) {
                value = '面积：不大于' + end_area;
            }

            if (value != ''){
                $('#condition_area').css('display', 'inline');
                $('#condition_area').html(value);
            }else{
                $('#condition_area').css('display', 'none');
                $('#condition_area').html('');
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
        	var value = $("#statuses").val();
        	var value_text = $("#statuses option:selected").text();
        	if (value != null && value != ''){
                $('#condition_status').css('display', 'inline');
                $('#condition_status').html("公海类型：" + value_text)
            }else{
                $('#condition_status').css('display', 'none');
                $('#condition_status').html('');
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
        }else if(conditions[i].id =='condition_lastFollowTime'){
            var lastFollowBegin = $('#lastFollowBegin').val();
            var lastFollowEnd = $('#lastFollowEnd').val();
            var value = '';
            if (lastFollowBegin != null && lastFollowBegin != '' && lastFollowEnd != null && lastFollowEnd != '') {
                value = '最后跟进时间：' +lastFollowBegin + '至' + lastFollowEnd;
            } else if (lastFollowBegin != null && lastFollowBegin != '' && (lastFollowEnd == null || lastFollowEnd == '')) {
                value = '最后跟进时间：开始于' + lastFollowBegin;
            } else if (lastFollowEnd != null && lastFollowEnd != '' && (lastFollowBegin == null || lastFollowBegin == '')) {
                value = '最后跟进时间：截止于' + lastFollowEnd;
            }

            if (value != ''){
                $('#condition_lastFollowTime').css('display', 'inline');
                $('#condition_lastFollowTime').html(value);
            }else{
                $('#condition_lastFollowTime').css('display', 'none');
                $('#condition_lastFollowTime').html('');
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
	if (obj.id == 'condition_money'){
        $('#begin_money').val(null);
        $('#end_money').val(null);
    }else if (obj.id == 'condition_area'){
        $('#begin_area').val(null);
        $('#end_area').val(null);
    }else if(obj.id == 'condition_id'){
    	$("#id").val('');
    }else if(obj.id == 'condition_status'){
    	$("#status").val('');
    }else if(obj.id == 'condition_customerName'){
    	$("#customerName").val('');
    }else if(obj.id == 'condition_phoneNum'){
    	$("#phoneNum").val('');
    }else if(obj.id == 'condition_lastFollowTime'){
    	$("#lastFollowBegin").val('');
    	$("#lastFollowEnd").val('');
    }else if(obj.id == 'condition_hasFollowRecord'){
    	$("#hasFollowRecord").val('');
    }else if(obj.id == 'condition_emergency'){
    	$("#emergency").val('');
    }else if(obj.id == 'condition_orderSource'){
    	$("#orderSource").val('');
    }else if (obj.id == 'condition_city_combox_customer'){
        $('#city_combox_customer').val('');
        $('#district_combox_customer').val('');
        $("#district_combox_customer").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
        $('#businesscircle_combox_customer').val('');
        $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    }else if (obj.id == 'condition_district_combox_customer'){
        $('#district_combox_customer').val('');
        $('#businesscircle_combox_customer').val('');
        $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
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



