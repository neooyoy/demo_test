var grid_id = "grid_id";

/**
 * 默认条件(没有发生过完成带看)
 */
var doneLookCountStart = "0";
var initUrl = base+'/kpinewhousedetailsController/initList';
var queryUrl = base+'/kpinewhousedetailsController/queryList';
var addUrl = base+'';
var modifyUrl = base+'';
var deleteUrl = base+'';
var detailHouseUrl = base + '/houseController/houseModify';

var findOffice = null;
var reasons = new Array();
var serviceReasons = new Array();
var isShowAll = false;
var firstChoose = true;

var order = 'id';

var departmentComboxData = [];
var actionEnum = "house_lurufangyuan";
var actionEnumExtra = "house_jihuofangyuan";
var searchDepIds = '';
var searchUserIds = '';

var personName_combobox_id = null;
var personName_combobox_name = null;

var officeName_combobox_id = null;
var officeName_combobox_name = null;

var personId = null;

var searchParams = [];

var columns = [
               { field: 'modifyName', title: '姓名', width: 150, align: 'center', sortable: false },
               { field: 'modifyAt', title: '时间', width: 150, align: 'center', sortable: false,convert:convertDate },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
               { field: 'content', title: '操作', width: 150, align: 'center', sortable: false,render:contentRender },
               { field: 'houseId', title: '房源编号', width: 150, align: 'center', sortable: false,render:jumpRender }
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


function jumpRender(record,value){
	var url = detailHouseUrl+"?id="+record.houseId;
	var ret = "";
	ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a><br/>" ;
	return ret;
}

var actionEnum_1_1 = "house_lurufangyuan";
var actionEnum_1_2 = "house_jihuofangyuan";
function contentRender(record,value){
	var ret = "";
	if(record.actionEnum==actionEnum_1_1){
		ret = "创建房源:"+value
	}
	if(record.actionEnum==actionEnum_1_2){
		ret = "激活房源:"+value
	}
	return ret;
}


function openSelectPage(pageType){
	var openUrl = initUrl +"?pageType="+pageType;
	window.location.href = openUrl;
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



function convertDate(date){
	if(!date){
		return '';
	}else{
		return dateHMZToDateTime(date*1000);	
	}
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
	
	

    /**
     * 生成城市-分布-商圈公共控件
     */
//    initCityDistrictBusinessCircle(data, "city_combox_order", "district_combox_order", "businesscircle_combox_order");

    $('[name=modify_at_begin]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('[name=modify_at_end]').datepicker({
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
            }else if (order == 'customerCreateAt'){
                order = 'c.create_at';
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
	$('input[iscontrol=true]').attr("checked",false);
    $("#departmentCombox").combobox("setValues", []);
    $("#departmentUserComboxTree").combotree("setValues",'');
    $('#departmentUserComboxTree').combotree("loadData","");


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

    var modifyAtBegin =  $('#modify_at_begin').val();
    if (modifyAtBegin != null && modifyAtBegin !=''){
        var begin = new Date(modifyAtBegin.replace(/-/g, ','));
        modifyAtBegin = parseInt(begin.getTime()/1000);
    }else{
    	modifyAtBegin = defaultCreateAtBegin;
    }

    var modifyAtEnd =  $('#modify_at_end').val();
    if (modifyAtEnd != null && modifyAtEnd !=''){
        var end = new Date(modifyAtEnd.replace(/-/g, ','));
        modifyAtEnd = parseInt((end.getTime() + 24*3600*1000)/1000);
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
    
    if (personId != null){
        searchUserIds = personId;
    }else{
        personName = $('#personName').combobox('getText');
    }

    var create_mode = $("#create_mode").val();
    
    
    
    


    var params = {
    		'id':$("#id").val(),
            //'status':status,
            'personName': personName.trim(),
            'modify_at_begin': modifyAtBegin,
            'modify_at_end': modifyAtEnd,
//            'searchDepIds': searchDepIds,
            'searchUserIds': searchUserIds,
            'actionEnum':actionEnum,
            'actionEnumExtra':actionEnumExtra,
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


