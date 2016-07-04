
var customer_gridid = "customer_gridid";
var customer_follow_gridid = "customer_follow_gridid";
var customer_look_gridid = "customer_look_gridid";
var history_questionnaire_gridid = "history_questionnaire_gridid";
var customer_log_gridid = "customer_log_gridid";
var queryCallbackUrl = base+'/callback/queryList?customerPhoneNum='+phoneNum;
var customerDetailUrl = base + "/callback/queryCustomerDetail";
var customerFollowUrl = base + "/callback/queryCustomerFollowList";
var customerLookUrl = base + "/callback/queryCustomerLooKList";
var historyQuestionnaireUrl = base + "/callback/queryQuestionnaireHistoryList";
var customerLogUrl = base + "/callback/customerLogList";
var saveUrl = base+"/callback/save";
var changeToSeaCustomerUrl = base + '/callback/changeToSeaCustomer';
var keyNames = new Array();
var order = 'c.id';
var searchParams = [];

var customer_columns = [
               { field: 'customerId', title: "选择", width: 150, align: 'center', sortable: false,
            	   mustache: "<input id='key_{{customerId}}' name='loadCustomerInformation' type='radio' onclick='loadCustomerInformation({{customerId}})' />"
               },
				{ field: 'customerId', title: '客户编号', width: 150, align: 'center', sortable: false },
				{ field: 'customerName', title: '客户姓名', width: 150, align: 'center', sortable: false,render:nameRender },
//				{ field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
				{ field: 'accendantName', title: '客户归属', width: 150, align: 'center', sortable: false },
				{ field: 'customerCreateAt', title: '创建时间', width: 150, align: 'center', sortable: false,convert: convertDate },
				{ field: 'orderSource', title: '来源', width: 150, align: 'center', sortable: false,render:sourceRender },
				{ field: 'customer_status', title: '状态', width: 150, align: 'center', sortable: false,render:customerStatusRender },
				{ field: 'followCount', title: '跟进数', width: 150, align: 'center', sortable: false },
				{ field: 'donelookCount', title: '完成带看数', width: 150, align: 'center', sortable: false },
				//{ field: 'totalCount', title: '回访次数', width: 150, align: 'center', sortable: false },
				{ field: 'opt', title: '操作', width: 150, align: 'center', sortable: false,render:optRender },
           ];

var customer_follow_columns = [
			{ field: 'customerId', title: '客户编号', width: 150, align: 'center', sortable: false },
			{ field: 'modifyAt', title: '跟进时间', width: 150, align: 'center', sortable: false ,convert: convertDate},
			{ field: 'followName', title: '跟进人', width: 150, align: 'center', sortable: false },
			//{ field: 'accendantName', title: '跟进类型', width: 150, align: 'center', sortable: false },
			{ field: 'remark', title: '跟进记录', width: 150, align: 'center', sortable: false }
		];

var customer_look_columns = [
			{ field: 'customerId', title: '客户编号', width: 150, align: 'center', sortable: false },
			{ field: 'subscribeDate', title: '预约时间', width: 150, align: 'center', sortable: false,convert: convertDate },
			{ field: 'lookDate', title: '带看时间', width: 150, align: 'center', sortable: false,convert: convertDate },
			{ field: 'modifyAt', title: '带看确认时间', width: 150, align: 'center', sortable: false,convert: convertDate },
			{ field: 'status', title: '带看状态', width: 150, align: 'center', sortable: false,render:lookStatus },
			{ field: 'lookName', title: '带看人', width: 150, align: 'center', sortable: false },
			{ field: 'lookNameSlave', title: '合作带看人', width: 150, align: 'center', sortable: false },
			{ field: 'officeName', title: '带看房源', width: 150, align: 'center', sortable: false }
			//{ field: 'customer_status', title: '带看意向', width: 150, align: 'center', sortable: false }
		];

var history_questionnaire_columns = [
			{ field: 'modifyAt', title: '回访时间', width: 150, align: 'center', sortable: false,convert: convertDate },
			{ field: 'modifyName', title: '回访人', width: 150, align: 'center', sortable: false },
			{ field: 'record', title: '回访记录', width: 150, align: 'center', sortable: false,render:recordRender }
		];

var customer_log_columns = [
            { field: 'modifyAt', title: '操作时间', width: 150, align: 'center', sortable: false,convert: convertDate },
            { field: 'modifyName', title: '操作人', width: 150, align: 'center', sortable: false },
            { field: 'content', title: '操作详情', width: 150, align: 'center', sortable: false }
        ];


var customerOptions = {
        id: customer_gridid,
        //searchButtonId:'btn_search',
        searchParams:searchParams,
        pageSize: 5,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'desc',
            'order':order
        },
        trTdentity: 'id',
        url: queryCallbackUrl,
        tHeadCols:customer_columns,
        tBoolCheckbox:false
      };


var customerFollowOptions = {
        id: customer_follow_gridid,
        //searchButtonId:'btn_search',
        searchParams:searchParams,
        pageSize: 5,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'desc',
            'order':'id'
        },
        trTdentity: 'id',
        url: customerFollowUrl,
        tHeadCols:customer_follow_columns,
        tBoolCheckbox:false
      };

var customerLookOptions = {
        id: customer_look_gridid,
        //searchButtonId:'btn_search',
        searchParams:searchParams,
        pageSize: 5,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'asc',
            'order':'subscribe_date'
        },
        trTdentity: 'id',
        url: customerLookUrl,
        tHeadCols:customer_look_columns,
        tBoolCheckbox:false
      };

var historyQuestionnaireOptions = {
        id: history_questionnaire_gridid,
        //searchButtonId:'btn_search',
        searchParams:searchParams,
        pageSize: 5,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'desc',
            'order':order
        },
        trTdentity: 'id',
        url: historyQuestionnaireUrl,
        tHeadCols:history_questionnaire_columns,
        tBoolCheckbox:false
      };

var customerLogOptions = {
        id: customer_log_gridid,
        //searchButtonId:'btn_search',
        searchParams:searchParams,
        pageSize: 5,  //每页显示个数
        width: '100%',
        params:{
            'sort' : 'desc',
            'order':'id'
        },
        trTdentity: 'id',
        url: customerLogUrl,
        tHeadCols:customer_log_columns,
        tBoolCheckbox:false
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

function sourceRender(record,value){
	return getCustomerOrderSource(value);
}

function lookStatus(record,value){
	var ret = "";
	if(value=='1'){
		ret = "预约中";
	}
	if(value=='2'){
		ret = "已带看";
	}
	return ret;
}

function recordRender(record,value){
	var tag = ";";
	var issuccess = "";
	var reason = "";
	var rememberUban = "";
	var status = "";
	var rememberGw = "";
	var gwContact = "";
	var rememberHouse = "";
	var orderDidi = "";
	var maintain = "";
	var findOffice = "";
	var officeRequirement = "";
	var optimizeService = "";
	var serviceReason = "";
	var sendHouse = "";
	var buildFollowlook = "";
	var realityFollow = "";
	var purpose = "";
	var remarks = "";
	if(record.issuccess=="2"){
		issuccess = "回访成功";
	}else if(record.issuccess=="3"){
		issuccess = "回访不成功";
	}
	if(record.reason=="1"){
		reason = tag+"电话号码不正确";
	}else if(record.reason=="2"){
		reason = tag+"客户挂断";
	}else if(record.reason=="3"){
		reason = tag+"客户未接听";
	}
	if(record.rememberUban=="1"){
		rememberUban = tag+"记得优办";
	}else if(record.rememberUban=="2"){
		rememberUban = tag+"不记得优办";
	}
	if(record.status=="1"){
		status = tag+"客户真实有效";
	}else if(record.status=="2"){
		status = tag+"客户无效";
	}
	if(record.rememberGw=="1"){
		rememberGw = tag+"记得顾问";
	}else if(record.rememberGw=="2"){
		rememberGw = tag+"不记得顾问";
	}
	if(record.gwContact=="1"){
		gwContact = tag+"顾问联系及时";
	}else if(record.gwContact=="2"){
		gwContact = tag+"顾问联系不及时";
	}
	if(record.rememberHouse=="1"){
		rememberHouse = tag+"记得带看房源";
	}else if(record.rememberHouse=="2"){
		rememberHouse = tag+"不记得带看房源";
	}
	if(record.orderDidi=="1"){
		orderDidi = tag+"滴滴预约用户";
	}else if(record.orderDidi=="2"){
		orderDidi = tag+"非滴滴预约";
	}
	if(record.maintain=="1"){
		maintain = tag+"顾问不维护客户";
	}else if(record.maintain=="2"){
		maintain = tag+"顾问维护客户";
	}
	if(record.findOffice=="1"){
		findOffice = tag+"找到合适办公地点";
	}else if(record.findOffice=="2"){
		findOffice = tag+"未找到合适办公地点";
	}
	if(record.officeRequirement=="1"){
		officeRequirement = tag+"办公室需求有变化";
	}else if(record.officeRequirement=="2"){
		officeRequirement = tag+"办公室需求没有变化";
	}
	if(record.optimizeService=="1"){
		optimizeService = tag+"需要优办继续提供找房和带看服务";
	}else if(record.optimizeService=="2"){
		optimizeService = tag+"不需要优办继续提供找房和带看服务";
	}
	if(record.serviceReason=="1"){
		serviceReason = tag+"已与其他公司合作";
	}else if(record.serviceReason=="2"){
		serviceReason = tag+"需求延期";
	}else if(record.serviceReason=="3"){
		serviceReason = tag+"其他原因";
	}
	if(record.sendHouse=="1"){
		sendHouse = tag+"匹配了房源";
	}else if(record.sendHouse=="2"){
		sendHouse = tag+"未匹配房源";
	}
	if(record.buildFollowlook=="1"){
		buildFollowlook = tag+"形成了带看";
	}else if(record.buildFollowlook=="2"){
		buildFollowlook = tag+"未形成带看";
	}
	if(record.realityFollow=="1"){
		realityFollow = tag+"跟进记录真实";
	}else if(record.realityFollow=="2"){
		realityFollow = tag+"跟进记录不真实";
	}
	if(record.purpose=="1"){
		purpose = tag+"确定合作";
	}else if(record.purpose=="2"){
		purpose = tag+"意愿很强";
		
	}else if(record.purpose=="3"){
		purpose = tag+"意愿不强";
		
	}else if(record.purpose=="4"){
		purpose = tag+"不合作";
	}
	if(record.remarks!=''){
		remarks = tag+record.remarks;
	}
	var ret = issuccess+reason+rememberUban+status+rememberGw+gwContact
		+rememberHouse+orderDidi+maintain+findOffice+officeRequirement
		+optimizeService+serviceReason+sendHouse+buildFollowlook
		+realityFollow+purpose+remarks;
	
	return ret;
}


function optRender(record){
	var ret = "";
	if(record.customer_status=='3'){
		ret += "<button type='button'  class='btn btn-default' onclick='toSeaCustomer(\""+ record.customerId +"\",\""+record.accendantName+"\");'>客户流至公海池</button>";
	}
	return ret;
}

function toSeaCustomer(customerId,accendantName){
	$("#currAccendantName").find("span").remove();
	$("#currAccendantName").append("<span>"+accendantName+"</span>");
	$("#currCustomerId").val(customerId);
	$('#myModal-customer').modal('show');
}

function changeToSeaCustomer(){
	var currCustomerId = $("#currCustomerId").val();
	var searchDept = getDepartment();

	if(searchDept.isParent||searchDept.deptCode=='/dkhb'){
		alert("只能选择单一组");
		return;
	}
	$.ajax({
		url:changeToSeaCustomerUrl,
		type:"post",
		data:{	department:searchDept.searchDepId,
				id:currCustomerId
			},
		dataType:"json",
		success:function(result){
			alert(result.msg);
			if(result.msgCode=='0'){
				reloadQuestionnaireDetail();
			}else{
				return;
			}
		}
		
	});
}

function getDepartment(){
	var searchDept = {
			'searchDepId':null,
			'searchDeptName':null,
			'isParent':null,
			'deptCode':null
	};
	var searchDepId = "";
	var searchDeptName = "";
	var deptCode = "";
	var isParent = false;
	var checkedNodes = $('#departmentUserComboxTree').combotree('tree').tree('getSelected');
    if (checkedNodes != null){
    	if((checkedNodes.children!=null&&checkedNodes.children.length>0)||checkedNodes.depttype!='1'){
    		isParent = true;
    	}else{
    		
    		deptCode = checkedNodes.deptcode;
    		searchDepId = checkedNodes.id;
    		searchDeptName = checkedNodes.text;
    	}
    }
    searchDept.deptCode = deptCode;
    searchDept.searchDepId = searchDepId;
    searchDept.searchDeptName = searchDeptName;
    searchDept.isParent = isParent;
//    alert(searchDepIds);
//    alert(searchDeptNames);
//    alert(searchDept.searchDepIds);
//	alert(searchDept.searchDeptNames);
    return searchDept;
    
}


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
            inTheSelectDepartments:false,
            showPerson:false
            
        },
        url:base+'/departmentController/loadDepartmentUserTreeNodes',
        method:'post',
        panelHeight: '400px',
        onLoadSuccess:function (node, data) {
            $("#departmentUserComboxTree").combotree("setValue", currDepartment);
            var cnode = $('#departmentUserComboxTree').combotree('tree').tree('getSelected');
        	while (cnode != null) {
	        	cnode = $('#departmentUserComboxTree').combotree('tree').tree('getParent', cnode.target);
	        	if(cnode!=null){
	        		$('#departmentUserComboxTree').combotree('tree').tree('expand', cnode.target);	
	        	}
        	}
        }
    });

    //$('#departmentUserComboxTree').combotree('tree').tree('getChecked')

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes?departmentIds='+departmentIds);

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes');

}


function deptComboxLoadSuccess(){
	var data = $('#departmentCombox').combobox('getData');
//	var value = $('#departmentCombox').combobox('getValue');
        if (data != null && data.length != 0){
            for (var i=0; i<data.length; i++){
                //业务中心
                if (data[i].deptcode == '/gwb'){
                    $('#departmentCombox').combobox('setValue', data[i].deptId);
//                    $('#departmentCombox').combobox('setText', value);
                    break;
                }
            }
        }
        $('#departmentCombox').combobox('disable');
}


function openSelectPage(obj,pageType){
	if(pageType=='1'){
		$("#customerDetail").show();
		$("#customerFollow").hide();
		$("#customerLook").hide();
		$("#historyQuestionnaire").hide();
		$("#customerLog").hide();
	}
	if(pageType=='2'){
		$("#customerDetail").hide();
		$("#customerFollow").show();
		$("#customerLook").hide();
		$("#historyQuestionnaire").hide()
		$("#customerLog").hide()
	}
	if(pageType=='3'){
		$("#customerDetail").hide();
		$("#customerFollow").hide();
		$("#customerLook").show();
		$("#historyQuestionnaire").hide()
		$("#customerLog").hide()
		
	}
	if(pageType=='4'){
		$("#customerDetail").hide();
		$("#customerFollow").hide();
		$("#customerLook").hide();
		$("#historyQuestionnaire").show()
		$("#customerLog").hide()
	}
	if(pageType=='5'){
		$("#customerDetail").hide();
		$("#customerFollow").hide();
		$("#customerLook").hide();
		$("#historyQuestionnaire").hide()
		$("#customerLog").show()
	}
	$("button[tabname='tab']").removeClass("btn-yellow");
	$("button[tabname='tab']").addClass("btn-default");
	$(obj).removeClass("btn-default");
	$(obj).addClass("btn-yellow");
	
}

function customerStatusRender(record,value){
	var ret = "";
	if(value=='1'){
		ret = "未维护";
	}
	if(value=='2'){
		ret = "有效";
	}
	if(value=='3'){
		ret = "无效";
	}
	if(value=='4'){
		ret = "和其他公司合作";
	}
	if(value=='5'){
		ret = "成交";
	}
	if(value=='6'){
		ret = "组公海";
	}
	if(value=='7'){
		ret = "城市公海";
	}
	return ret;
}


function convertDate(date){
	if(!date){
		return '';
	}else{
		return dateHMZToDateTime(date*1000);	
	}
}



function optArray(obj,array){
	if($.inArray(obj,array)>-1){
		array.splice($.inArray(obj,array),1);
	}else{
		array.push(obj)
	}
}

function optkeyNameQuery(obj,array){
	optArray(obj,array);
	$("#"+customer_gridid)[customer_gridid].reload({
        params:{
            "sort" : $("#"+customer_gridid)[customer_gridid].options.sort,
            "contentKeyNames":array.join(",")
        }
    });
}

function doSave(){
	$.ajax({
		url:saveUrl,
		type:"post",
		data:$("#callback_form").serialize(),
		dataType:"json",
		success:function(result){
			alert(result.msg);
			if(result.msgCode=='0'){
				return true;
			}else{
				return false;
			}
		}
	});
}

function doReset(){
	$("#callback_form")[0].reset();
	$("[name='officeRequirement']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	$("[name='optimizeService']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	$("[name='serviceReason']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	$("#success_control").hide();
	$("#fail_control").hide();
	$("[controlname='find_office_control']").hide();
	$("[controlname='optimize_service_control']").hide();
	$(".checked").removeClass("checked");
	$("#remarks").parent().find("i").remove();
//	$("#visitFollow").parent().find("i").remove();
}


function createListTable(options){
	$.fn[options.id] = new dataGrid();
	$("#"+options.id)[options.id].init({
        id: options.id,
        searchButtonId: options.searchButtonId,
        searchParams: options.searchParams,
        url: options.url,
        tHeadCols: options.tHeadCols,
        trTdentity: options.trTdentity,
        tableWidth : options.width,
        tBoolCheckbox: options.tBoolCheckbox,
        pageSize: options.pageSize,
        params: options.params,
        order : options.params.order,
        tBodyTrDblclickCallBack: function (record) {
        	return;
            //var url = base + "/officeController/insertOrUpdateOffice?id=" + record["id"];
            //window.open(url);
        },
        _handleTbodyTrClick: function(record){
        	
        },
        onload:function(){
        	//var datas = $("#"+gridid)[gridid].options.data;
  	
        }
    });
}

function showCustomerDetail(customerId){
	$.ajax({
		url:customerDetailUrl,
		type:"post",
		data:{customerId:customerId},
		dataType:"json",
		success:function(result){
			$("[name='customer_phone']").val(result.phoneNum);
			$("[name='type']").val(result.status);
			$("[name='orderid']").val(result.systemresource1Orderid);
			$("div[textcontrol='true']").find("span").remove();
			$("#customer_id").append("<span>"+result.id+"</span>")
			$("#customer_name").append("<span>"+result.customerName+"</span>")
			var sex = "";
			if(result.customerSex=='0'){
				sex = "男";
			}else{
				sex ="女";
			}
			$("#customerSex").append("<span>"+sex+"</span>");
			$("#customerLevel").append("<span>"+result.customerLevel+"</span>");
			$("#company").append("<span>"+result.company+"</span>");
			$("#industry").append("<span>"+result.industry+"</span>");
			$("#position").append("<span>"+result.position+"</span>");
			var orderBusinesscircleName = result.orderCityName+"&nbsp;"+result.orderDistrictName+"&nbsp;"+result.orderBusinesscircleName;
			$("#orderBusinesscircleName").append("<span>"+orderBusinesscircleName+"</span>");
			$("#location").append("<span>"+result.location+"</span>");
			var orderArea = result.orderAreaBegin+"-"+result.orderAreaEnd+"(平米)";
			$("#orderArea").append("<span>"+orderArea+"</span>");
			var orderPrice = result.orderPriceBegin+"-"+result.orderPriceEnd+"(元/平/天)|"+result.orderPriceMonthBegin+"-"+result.orderPriceMonthEnd+"(元/月)";
			$("#orderPrice").append("<span>"+orderPrice+"</span>");
			var orderHouseDate = convertDate(result.orderHouseDate);
			$("#orderHouseDate").append("<span>"+orderHouseDate+"</span>");
			$("#otherNeed").append("<span>"+result.otherNeed+"</span>");
			$("#otherRemark").append("<span>"+result.otherRemark+"</span>");
		}
		
	});
}

function loadCustomerInformation(customerId){
	showCustomerDetail(customerId);
	customerFollowOptions.url = customerFollowUrl+"?customerId="+customerId;
	customerLookOptions.url = customerLookUrl+"?customerId="+customerId;
	historyQuestionnaireOptions.url = historyQuestionnaireUrl+"?customer_phone="+phoneNum;
	customerLogOptions.url = customerLogUrl+"?customerId="+customerId;
	createListTable(customerFollowOptions);
	createListTable(customerLookOptions);
	createListTable(historyQuestionnaireOptions);
	createListTable(customerLogOptions);
}

function showSuccess(){
	$("#resetButton").click();
	
//	$($("[name='rememberUban']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='status']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='rememberGw']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='gwContact']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='rememberHouse']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='orderDidi']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='maintain']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='findOffice']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='sendHouse']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='buildFollowlook']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='realityFollow']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='purpose']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
	
	
	$("[name='reason']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	$("#success_control").show();
	$("#fail_control").hide();
}

function showFail(){
	$("#resetButton").click();
	$($("[name='reason']")[0])
	.attr("checked",true)
	.parent().find("label").addClass("checked");
	
	$("[name='rememberUban']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='status']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='rememberGw']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='gwContact']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");  
	
	$("[name='rememberHouse']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked"); 
	
	$("[name='orderDidi']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");   
	
	$("[name='maintain']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='findOffice']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='sendHouse']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='buildFollowlook']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='realityFollow']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[name='purpose']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");

	$("[name='officeRequirement']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");

	$("[name='optimizeService']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");

	$("[name='serviceReason']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("#success_control").hide();
	$("[controlname='find_office_control']").hide();
	$("[controlname='optimize_service_control']").hide();
	$("#fail_control").show();
}

function showFindOffice(){
//	$($("[name='officeRequirement']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
//	$($("[name='optimizeService']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
	
	$("[controlname='find_office_control']").show();
}

function hideFindOffice(){
	
	
	$("[name='officeRequirement']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	$("[name='optimizeService']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	$("[name='serviceReason']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[controlname='optimize_service_control']").hide();
	$("[controlname='find_office_control']").hide();
}

function showOptimizeService(){
//	$($("[name='serviceReason']")[0])
//	.attr("checked",true)
//	.parent().find("label").addClass("checked");
	
	$("[controlname='optimize_service_control']").show();
}

function hideOptimizeService(){
	$("[name='serviceReason']")
	.attr("checked",false)
	.parent().find("label").removeClass("checked");
	
	$("[controlname='optimize_service_control']").hide();
}

function reloadQuestionnaireDetail(){
	$("#"+customer_gridid)[customer_gridid].reload();
}

$(function () {

	
//	$('#callback_form').formValidation({
//		err : {
//			container : 'tooltip'
//		},
//		icon : {
//			valid : 'glyphicon glyphicon-ok',
//			invalid : 'glyphicon glyphicon-remove',
//			validating : 'glyphicon glyphicon-refresh'
//		},
//		fields : {
//			issuccess : {
//				validators : {
//					notEmpty : {
//						message : '是否回访成功必选'
//					}
//				}
//			},
//			
//		}
//	})
//	.on('success.form.fv', function(e) {
//		e.preventDefault();
//
//		$.ajax({
//			url:saveUrl,
//			type:"post",
//			data:$("#callback_form").serialize(),
//			dataType:"json",
//			success:function(result){
//				alert(result.msg);
//				if(result.msgCode=='1'){
//					$("#saveButton").removeAttr("disabled");
//					$("#saveButton").removeClass("disabled");
//					return;
//				}else{
//					$("#saveButton").removeClass("disabled");
//					$("#saveButton").removeAttr("disabled");
//					$("#resetButton").click();
//					$("#remarks").parent().find("i").remove();
//					$("#visitFollow").parent().find("i").remove();
//					reloadQuestionnaireDetail();
//				}
//			}
//		});
//	})
	
	
	$("#btn_reset").on("click", function () {
	    $("#queryForm")[0].reset();
	    $("#show_type").children().remove();
	    keyNames.length=0;
	    $("#"+customer_gridid)[customer_gridid].reload({
	        params:{
	            "sort" : $("#"+customer_gridid)[customer_gridid].options.sort,
	            "contentKeyNames":keyNames.join(",")
	        }
	    });
	});

    /**
     * 生成列表
     * @type {dataGrid}
     */
    $.fn[customer_gridid] = new dataGrid();
    

    $("#"+customer_gridid)[customer_gridid].init({
        id: customerOptions.id,
        searchButtonId: customerOptions.searchButtonId,
        searchParams: customerOptions.searchParams,
        url: customerOptions.url,
        tHeadCols: customerOptions.tHeadCols,
        trTdentity: customerOptions.trTdentity,
        tableWidth : customerOptions.width,
        tBoolCheckbox: customerOptions.tBoolCheckbox,
        pageSize: customerOptions.pageSize,
        params: customerOptions.params,
        order : customerOptions.params.order,
        tBodyTrDblclickCallBack: function (record) {
        	return;
            //var url = base + "/officeController/insertOrUpdateOffice?id=" + record["id"];
            //window.open(url);
        },
        _handleTbodyTrClick: function(record){
        	
        },
        onload:function(){
        	var datas = $("#"+customer_gridid)[customer_gridid].options.data;
        	if(datas.length>0){
        		var firstRecord = datas[0];
        		$("#key_"+firstRecord.customerId).attr("checked",true)
        		loadCustomerInformation(firstRecord.customerId);
        		
        	}
  	
        }
    });
    
});

$(document).ready(function(){
	$('#callback_form').formValidation({
		err : {
			container : 'tooltip'
		},
		icon : {
			valid : 'glyphicon glyphicon-ok',
			invalid : 'glyphicon glyphicon-remove',
			validating : 'glyphicon glyphicon-refresh'
		},
		fields : {
			
			
		}
	})
	.on('success.form.fv', function(e) {
		e.preventDefault();
		var issuccess = $("[name='issuccess'][checked='checked']");
		if(issuccess.length==0){
			alert("是否回访成功必选");
			return;
		}
		$.ajax({
			url:saveUrl,
			type:"post",
			data:$("#callback_form").serialize(),
			dataType:"json",
			success:function(result){
				alert(result.msg);
				if(result.msgCode=='1'){
					$("#saveButton").removeAttr("disabled");
					$("#saveButton").removeClass("disabled");
					return;
				}else{
					$("#saveButton").removeClass("disabled");
					$("#saveButton").removeAttr("disabled");
					$("#resetButton").click();
					$("#remarks").parent().find("i").remove();
//					$("#visitFollow").parent().find("i").remove();
					reloadQuestionnaireDetail();
				}
			}
		});
	})
	
	
});

