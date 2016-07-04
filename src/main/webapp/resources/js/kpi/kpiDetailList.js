var grid_house_add = "grid_house_add";
var grid_house_prospect = "grid_house_prospect";
var grid_house_follow = "grid_house_follow";
var grid_customer_add = "grid_customer_add";
var grid_customer_follow = "grid_customer_follow";
var grid_customer_donelook = "grid_customer_donelook";
var grid_work_summary = "grid_work_summary";

var queryHouseUrl = base+'/kpinewhousedetailsController/queryList';
var detailHouseUrl = base + '/houseController/houseModify';

var queryCustomerUrl = base+'/kpinewcustomerdetailsController/queryList';
var detaiCustomerlUrl = base+'/customer/customerdetail';

var querySumaryUrl = base+'/kpinewhousedetailsController/queryWorkLoadSummary';


var actionEnum_1_1 = "house_lurufangyuan";
var actionEnum_1_2 = "house_jihuofangyuan";
var actionEnum_2 = "house_shikan";
var actionEnum_3 = "housefollow_lurufangyuangenjin";
var actionEnum_4_1 = "customer_customerAdd";
var actionEnum_4_2 = "customer_customerAddVirtual";
var actionEnum_5 = "customer_tianjiangenjin";
var actionEnum_6 = "customer_finishCustomerLook";

//页面类型默认1
var page_type = 1;

if(defaultPageType!=null&&defaultPageType!=0&&defaultPageType!=''){
	page_type = defaultPageType;
}

//新增房源
var page_house_add = 1
//实勘房源
var page_house_prospect = 2;
//跟进房源
var page_house_follow = 3;
//新增客户
var page_customer_add = 4;
//跟进客户
var page_customer_follow = 5;
//带看客户
var page_customer_donelook = 6;
//工作量汇总
var page_work_sumary = 7;

var order = 'id';

var departmentComboxData = [];
var actionEnum = "house_lurufangyuan";
var actionEnumExtra = "house_jihuofangyuan";
var searchDepIds = '';
var searchUserIds = '';



var searchParams = [];

var columns_house = [
               { field: 'modifyName', title: '姓名', width: 150, align: 'center', sortable: false },
               { field: 'workDate', title: '绩效时间', width: 150, align: 'center', sortable: false ,convert:convertDateDay},
               { field: 'modifyAt', title: '时间', width: 150, align: 'center', sortable: false,convert:convertDate },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
               { field: 'content', title: '操作', width: 150, align: 'center', sortable: false,render:contentRender },
               { field: 'houseId', title: '房源编号', width: 150, align: 'center', sortable: false,render:jumpHouseRender }
           ];

var columns_customer = [
               { field: 'modifyName', title: '姓名', width: 150, align: 'center', sortable: false },
               { field: 'workDate', title: '绩效时间', width: 150, align: 'center', sortable: false ,convert:convertDateDay},
               { field: 'modifyAt', title: '时间', width: 150, align: 'center', sortable: false,convert:convertDate },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
               { field: 'content', title: '操作', width: 150, align: 'center', sortable: false,render:contentRender },
               { field: 'customerId', title: '客户编号', width: 150, align: 'center', sortable: false,render:jumpCustomerRender }
           ];

var sumary_columns = [
               { field: 'modifyName', title: '姓名', width: 150, align: 'center', sortable: false },
               { field: 'workDate', title: '绩效时间', width: 150, align: 'center', sortable: false ,convert:convertDateDay},
               { field: 'modifyAt', title: '时间', width: 150, align: 'center', sortable: false,convert:convertDate },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
               { field: 'content', title: '操作', width: 150, align: 'center', sortable: false,render:contentRender },
               { field: 'show_id', title: '编号', width: 150, align: 'center', sortable: false,render:jumpSumaryRender }
           ];


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
    
    openSelectPage(page_type);
//    var grid_id = getGrid_id(page_type);
//	var url = getQueryUrl(page_type);
//    createListTable(grid_id,url,page_type);
    

});


function contentRender(record,value){
	var ret = "";
	if(record.actionEnum==actionEnum_1_1){
		ret = "创建房源:"+value
	}else if(record.actionEnum==actionEnum_1_2){
		ret = "激活房源:"+value
	}else if(record.actionEnum==actionEnum_2){
		ret = "房源实勘:"+value
	}else if(record.actionEnum==actionEnum_3){
		ret = "房源跟进:"+value
	}else if(record.actionEnum==actionEnum_4_1){
		ret = "创建客户:"+value
	}else if(record.actionEnum==actionEnum_4_2){
		ret = "虚拟号创建客户:"+value
	}else if(record.actionEnum==actionEnum_5){
		ret = "客户跟进:"+value
	}else if(record.actionEnum==actionEnum_6){
		ret = "客户带看:"+value
	}else{
        return value;
    }
	return ret;
}


function jumpHouseRender(record,value){
	var url = detailHouseUrl+"?id="+record.houseId;
	var ret = "";
	ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a><br/>" ;
	return ret;
}


function jumpCustomerRender(record,value){
	var url = detaiCustomerlUrl+"?customerId="+record.customerId;
	var ret = "";
	ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a><br/>";
	return ret;
}

function jumpSumaryRender(record,value){
	var url = "";
    if (record.show_id == 0){
        return "";
    }

	if(record.type=='0'){
		url = detaiCustomerlUrl+"?customerId="+record.show_id;
	}else{
		url = detailHouseUrl+"?id="+record.show_id;
	}
	var ret = "";
	ret = "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a><br/>";
	return ret;
}

function convertDate(date){
	if(!date){
		return '';
	}else{
		return dateHMZToDateTime(date*1000);	
	}
}

function convertDateDay(date){
	if(!date){
		return '';
	}else{
		return dateHaoMiaoZToDate(date*1000);
	}
}

function openSelectPage(pageType){
	page_type = pageType;
	var grid_id = getGrid_id(pageType);
	var url = getQueryUrl(pageType);
	$("#"+grid_id).parent().parent().children().hide();
	$("#"+grid_id).parent().show();
	if($("#"+grid_id)[grid_id]!=undefined&&$("#"+grid_id)[grid_id]!=null){
		reloadList();
	}else{
		createListTable(grid_id,url,pageType);
	}
	$("[name='btn_search']").removeClass("btn-yellow");
	$("[name='btn_search']").addClass("btn-blue");
	$("[my_target='"+ grid_id +"']").removeClass("btn-blue");
	$("[my_target='"+ grid_id +"']").addClass("btn-yellow");

}


function getQueryUrl(pageType){
	if(pageType==page_house_add){
		return queryHouseUrl;
	}
	if(pageType==page_house_prospect){
		return queryHouseUrl;
	}
	if(pageType==page_house_follow){
		return queryHouseUrl;
	}
	if(pageType==page_customer_add){
		return queryCustomerUrl;
	}
	if(pageType==page_customer_follow){
		return queryCustomerUrl;
	}
	if(pageType==page_customer_donelook){
		return queryCustomerUrl;
	}
	if(pageType==page_work_sumary){
		return querySumaryUrl;
	}
}


function getColumns(pageType){
	if(pageType==page_house_add){
		return columns_house;
	}
	if(pageType==page_house_prospect){
		return columns_house;
	}
	if(pageType==page_house_follow){
		return columns_house;
	}
	if(pageType==page_customer_add){
		return columns_customer;
	}
	if(pageType==page_customer_follow){
		return columns_customer;
	}
	if(pageType==page_customer_donelook){
		return columns_customer;
	}
	if(pageType==page_work_sumary){
		return sumary_columns;
	}
}

function createListTable(grid_id,queryUrl,pageType){
	
	var param = createSearchParam(pageType);
	
	var gridOptions = {
			id: grid_id,
			pageSize: 20,  //每页显示个数
			width: '100%',
			params:{
				'sort' : 'desc'
			},
			trTdentity: 'id',
			url: queryUrl,
			tHeadCols:getColumns(pageType)
	};
	
	/**
	 * 生成列表
	 * @type {dataGrid}
	 */
	$.fn[gridOptions.id] = new dataGrid();
	
	$("#"+gridOptions.id)[gridOptions.id].init({
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
		params: param,
		order : gridOptions.params.order,
		onload:function(){
			$('.poshytooltip').poshytip({
				alignY: 'bottom'
			});
		},
		tBodyTrDblclickCallBack: function (record) {
			
		},
		_handleTbodyTrClick: function(record){
			
		},
		thClickCallback: function(orderField){
			
		}
	});
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
	$("#searchForm")[0].reset();
    $("#departmentCombox").combobox("setValues", []);
    $("#departmentUserComboxTree").combotree("setValues",'');
    $('#departmentUserComboxTree').combotree("loadData","");
    defaultCreateAtBegin = null;
    $("#modify_at_begin").attr("placeholder","时间");
    var grid_id = getGrid_id(page_type);
    reloadCustomerGridAfterCleanSearchConditions(grid_id,page_type);

}

function getGrid_id(pageType){
	if(pageType==page_house_add){
		return grid_house_add;
	}
	if(pageType==page_house_prospect){
		return grid_house_prospect;
	}
	if(pageType==page_house_follow){
		return grid_house_follow;
	}
	if(pageType==page_customer_add){
		return grid_customer_add;
	}
	if(pageType==page_customer_follow){
		return grid_customer_follow;
	}
	if(pageType==page_customer_donelook){
		return grid_customer_donelook;
	}
	if(pageType==page_work_sumary){
		return grid_work_summary;
	}
}


function reloadList(){
	var grid_id = getGrid_id(page_type);
	$("#"+grid_id)[grid_id].reload({
        params: createSearchParam(page_type)
    });
}


/**
 * 清空搜索条件后加载列表
 */
function reloadCustomerGridAfterCleanSearchConditions(grid_id,pageType){

    $("#"+grid_id)[grid_id].reload({
        params: createSearchParam(pageType)
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
//        onLoadSuccess:userHistory,
        panelHeight: '400px',
    });

    //$('#departmentUserComboxTree').combotree('tree').tree('getChecked')

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes?departmentIds='+departmentIds);

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes');

}


/**
 * 获取列表刷新时的参数
 */
var getCommonGridParam = function(){

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
    
    


    var params = {
    		'id':$("#id").val(),
            //'status':status,
//            'personName': personName.trim(),
            'modify_at_begin': modifyAtBegin,
            'modify_at_end': modifyAtEnd,
//            'searchDepIds': searchDepIds,
            'searchUserIds': searchUserIds,
            'actionEnum':actionEnum,
            'actionEnumExtra':actionEnumExtra,
//            "sort" : $('#'+grid_id)[grid_id].options.sort,
            "order": order
    }

    return params;
}

function createSearchParam(pageType){
	var param = getCommonGridParam();
	if(pageType==page_house_add){
		param['actionEnum'] = actionEnum_1_1;
		param['actionEnumExtra'] = actionEnum_1_2;
	}
	if(pageType==page_house_prospect){
		param['actionEnum'] = actionEnum_2;
		param['actionEnumExtra'] = null;
	}
	if(pageType==page_house_follow){
		param['actionEnum'] = actionEnum_3;
		param['actionEnumExtra'] = null;
	}
	if(pageType==page_customer_add){
		param['actionEnum'] = actionEnum_4_1;
		param['actionEnumExtra'] = actionEnum_4_2;
	}
	if(pageType==page_customer_follow){
		param['actionEnum'] = actionEnum_5;
		param['actionEnumExtra'] = null;
	}
	if(pageType==page_customer_donelook){
		param['actionEnum'] = actionEnum_6;
		param['actionEnumExtra'] = null;
	}
	if(pageType==page_work_sumary){
		param['actionEnum'] = null;
		param['actionEnumExtra'] = null;
	}
	return param;
}







