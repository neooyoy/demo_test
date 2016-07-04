var cityId = $('#cityIds').val();
var firstChoose = true;

var order = 'po.id desc';

var departmentComboxData = [];

var searchDepIds = '';
var searchUserIds = '';

var personName_combobox_id = null;
var personName_combobox_name = null;

var officeName_combobox_id = null;
var officeName_combobox_name = null;

var personId = null;
var firstCity = null;

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
        fields: {
            begin_money:{
                validators:{
                    between:{
                        max:999999999,
                        min:0,
                        message: '请输入正确项'
                    }
                }
            },
            end_money:{
                validators: {
                    between: {
                        max: 999999999,
                        min: 0,
                        message: '请输入正确项'
                    }
                }
            },
            begin_area:{
                validators: {
                    between:{
                        max:999999999,
                        min:0,
                        message: '请输入正确项'
                    }
                }
            },
            end_area:{
                validators: {
                    between:{
                        max:999999999,
                        min:0,
                        message: '请输入正确项'
                    }
                }
            }
        }
    });
});

$(function () {

    $('[name=startTime]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('[name=endTime]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });
    /**
     * 生成房源列表
     * @type {dataGrid}
     */
    $.fn['house_grid'] = new dataGrid();
    var gridOptions = getDataGridOptions("house_grid");

    //clearSearchValue();

    //setDefaultSearchByUserName();

    $("#house_grid")['house_grid'].init({
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
        params: getHouseGridParams(),
        order : gridOptions.params.order,
        onload:function(){
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        tBodyTrDblclickCallBack: function (record) {
        	 var url = base + "/pborderController/pbDetail?bdorderId=" + record["bdorderId"];
            window.open(url, record["id"]);
        },
        _handleTbodyTrClick: function(record){
            //var url = base + "/houseController/houseModify?id=" + record["id"];
            //window.open(url, record["id"]);
        },
        thClickCallback: function(orderField){
            order = orderField;
            //联表查询排序，判断排序字段
//            if (order == 'officeName'){
//                order = 'o.name';
//            }else if (order == 'id'){
//                order = 'h.id';
//            }else if (order == 'buildingNo'){
//                order = 'h.building_no';
//            }else if (order == 'floorNo'){
//                order = 'h.floor_no';
//            }else if (order == 'houseNo'){
//                order = 'h.house_no';
//            }else if (order == 'circleName'){
//                order = 'o.circle_name';
//            }else if (order == 'houseArea'){
//                order = 'h.house_area';
//            }else if (order == 'houseNo'){
//                order = 'h.house_no';
//            }else if (order == 'price'){
//                order = 'h.price';
//            }else if (order == 'createAt'){
//                order = 'h.create_at';
//            }else if (order == 'followCount'){
//                order = 'h.follow_count';
//            }else if (order == 'donelookCount'){
//                order = 'h.donelook_count';
//            }else if (order == 'unlookCount'){
//                order = 'h.unlook_count';
//            }

            $("#house_grid")['house_grid'].reload({
                params: getHouseGridParams()
            });
        }
    });

    $("input").bind('keypress',function(event){
        if(event.keyCode == "13")
        {
            reloadHouseGrid();
        }
    });

    $('select').bind('change',function(){
        reloadHouseGrid();
    });

    //设置搜索条件框值
    //setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    //setSearchConditionsStatus();
});

/**
 * 打开已关闭房源页面
 */
var openClosedHouseManagePage = function(){
    window.open(base + "/houseController/closedfangyuanlist")
}

/**
 * 打开录入房源页面
 */
var openAddHousePage=function(){
    window.open(base+ "/houseController/houseAddPage");
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
            $('#startTime').val(null);
            $('#endTime').val(null);
            $('#bdorderId').val(null);
            $('#customerCompany').val(null);
            $('#customerName').val(null);
            $('#accendantName').val(null);
            $('#agencyFeesBegin').val(null);
            $('#agencyFeesEnd').val(null);
            $("#departmentCombox").combobox("setValues", []);
            $("#departmentUserComboxTree").combotree("setValues",'');
            $('#departmentUserComboxTree').combotree("loadData","");
    //cleanSearchConditionsValue();

    //setDefaultSearchByUserName();

    reloadHouseGridAfterCleanSearchConditions();
}

var departmentComboxOnLoad =  function(){
    $('#departmentCombox').combobox('setValues', -1);
    departmentComboxChange();
}

/**
 * 搜索
 */
var reloadHouseGrid = function(){

//    if (($('#begin_area').val() != '' && isNaN(parseFloat($('#begin_area').val()))) || ($('#end_area').val() != '' && isNaN(parseFloat($('#end_area').val())))
//        || ($('#begin_money').val() != '' && isNaN(parseFloat($('#begin_money').val())))|| ($('#end_money').val() != '' && isNaN(parseFloat($('#end_money').val())))){
//        alert("请输入正确查询项！");
//        return false;
//    }

    //var validate = $('#searchForm').data('formValidation').isValid();

//    if (validate != null && !validate){
//        alert("请输入正确查询项！");
//        return false;
//    }

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
   //setSearchConditionsStatus();

//    if ($('#searchChangeAccendantPerson') != null && $('#searchChangeAccendantPerson')[0] != null && $('#searchChangeAccendantPerson')[0].checked){
//        $("#house_grid")['house_grid'].options.tBoolCheckbox = true;
//    }else{
//        $("#house_grid")['house_grid'].options.tBoolCheckbox = false;
//    }

    $("#house_grid")['house_grid'].options.checkedRecords = [];

    $("#house_grid")['house_grid'].reload({
        params: getHouseGridParams()
    });
};

/**
 * 获取房源列表刷新时的参数
 */
var getHouseGridParams = function(){
    var params = {
            'startTime' : $('#startTime').val().trim(),
            'endTime' : $('#endTime').val().trim(),
            'bdorderId' : $('#bdorderId').val().trim(),
            'customerCompany' : $('#customerCompany').val(),
            'customerName' : $('#customerName').val(),
            'agencyFeesEnd':$('#agencyFeesEnd').val(),
            'agencyFeesBegin':$('#agencyFeesBegin').val(),
            'accendantName':$('#accendantName').val(),
            'searchDepIds':searchDepIds,
            'searchUserIds':searchUserIds,
            "sort" : $('#house_grid')['house_grid'].options.sort,
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
 * 清空搜索条件后加载房源列表
 */
var reloadHouseGridAfterCleanSearchConditions = function(){

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    //setSearchConditionsStatus();

    order = 'po.id desc';

    //$("#house_grid")['house_grid'].options.sort_class = '';
    $("#house_grid")['house_grid'].options.tBoolCheckbox = false;
    $("#house_grid")['house_grid'].options.checkedRecords = [];

    $("#house_grid")['house_grid'].reload({
        params: getHouseGridParams()
    });
};

/*var fangyuanComboxSelect = function(record){
    var oldOfficeName = $('#officeNameCombox').combobox('getValues');
    if (oldOfficeName.indexOf(',') == -1 && firstChoose){
        firstChoose = false;
        $('#officeNameCombox').combobox('setValues', record.name)
    }
}*/

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

//       /* var data = departmentComboxData;
//
//        if (data != null && data.length > 0){
//            for (var i=0; i<data.length; i++){
//                if (data[i]["deptId"] != -1){
//                    departmentIds += data[i]["deptId"]+',';
//                }
//            }
//            departmentIds = departmentIds.substring(0, departmentIds.length-1)
//        }*/
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


//var departmentUserComboxTreeChange = function (record) {
//}


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

var datatypeSelect = function(obj){
    if (obj.value == '3'){
        $("#jiaofuTime").removeClass("form-group inline-ms hide");
        $("#jiaofuTime").addClass("form-group inline-ms");
    }else{
        $("#jiaofuTime").removeClass("form-group inline-ms");
        $("#jiaofuTime").addClass("form-group inline-ms hide");
        $("#begin_time").val('');
        $("#end_time").val('');
    }
}

var searchpeopletypeCheck = function (type) {
    $('#searchpeopletype').val(type);

    if (type == 1){
        $("#searchpeople").removeClass("form-group inline-ms hide");
        $("#searchpeople").addClass("form-group inline-ms");

        $("#departmentCombox").combobox("setValues", []);
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");

        $("#searchpeopleOfDepartment").removeClass("form-group inline-ms");
        $("#searchpeopleOfDepartment").addClass("form-group inline-ms hide");

    }else if (type == 2){
        $("#searchpeopleOfDepartment").removeClass("form-group inline-ms hide");
        $("#searchpeopleOfDepartment").addClass("form-group inline-ms");

        $('#personName').combobox('setValue', '');
        personName_combobox_id = null;
        personName_combobox_name = null;
        personId = null;

        $("#searchpeople").removeClass("form-group inline-ms");
        $("#searchpeople").addClass("form-group inline-ms hide");
    }
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
var setDefaultSearchByUserName = function () {

    if (firstCity != null){
        $('#city_combox_fangyuan').val(firstCity);

        $("#district_combox_fangyuan")['district_combox_fangyuan'].reload({
            params: {
                'cityId': firstCity
            }
        });
    }

    var searchByOfficeName = false;
    var search = window.location.search;
    if (search != ''){
        search = search.substring(1, search.length);
        var searchArray = search.split(',');
        for (var i=0; i<searchArray.length; i++){
            if (searchArray[i].indexOf("officeId") != -1){
                var array = searchArray[i].split('=');
                officeName_combobox_id = array[1];
            }
            if (searchArray[i].indexOf("officeName") != -1){
                var array = searchArray[i].split('=');
                officeName_combobox_name = decodeURI(array[1]);
            }
        }

        if (officeName_combobox_id != null && officeName_combobox_id != ''
            && officeName_combobox_name != null && officeName_combobox_name != ''){
            $('#officeNameCombox').combobox("setValue", officeName_combobox_name);
            $('#officeNameCombox').combobox("setText", officeName_combobox_name);
            searchByOfficeName = true;
        }

    }

    if (!searchByOfficeName){
        $('#identity').val(2);

        personName_combobox_id = $('#userId').val();
        personName_combobox_name = $('#useName').val();
        personId = personName_combobox_id;

        //$('#personName').combobox("setValue", personName_combobox_id);
        $('#personName').combobox("setValue", personName_combobox_name);
        $('#personName').combobox("setText", personName_combobox_name);
    }
}

/**
 * 设置搜索条件框值
 */
var setSearchConditionsValue = function(){
 
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


var officeNameComboxOnLoad = function(){
    //$('#officeNameCombox').trigger("click");


    //$("#officeNameCombox").click(function(){
    //    alert("这是触发事件的第一种方式")
    //});
//$("#officeNameCombox").trigger("focus");
}

//onLoadSuccess:departmentComboxOnLoad,

var showAccendantPerson = function(){
    var checked = false;
    if ($('#searchChangeAccendantPerson') != null && $('#searchChangeAccendantPerson')[0] != null && $('#searchChangeAccendantPerson')[0].checked){
        checked = true;

        $('#btn_changeAccendantPerson').css('display', 'inline');
        $('#condition_searchChangeAccendantPerson').css('display', 'inline');
        $('#condition_searchChangeAccendantPerson').html("可调整归属人");
    }else{
        $('#btn_changeAccendantPerson').css('display', 'none');
        $('#condition_searchChangeAccendantPerson').css('display', 'none');
        $('#condition_searchChangeAccendantPerson').html('');
    }

    //重新搜索房源列表
    reloadHouseGrid();
}

/**
 * 批量调整房源归属
 */
var changeAccendantPerson = function(){
    var checkedRecords = $("#house_grid")['house_grid'].options.checkedRecords;

    if (checkedRecords == null || checkedRecords.length == 0){
        alert('您还没有选择任何可分配房源')
    }else{
        $('#housecheck_number').text(checkedRecords.length);
        $('#model_house_distribute').modal('show');
    }
}

var submitAccendantPerson = function(){
    var userId = '';
    var userName = '';
    var checkedNodes = $('#departmentUserComboxTree_changeAccendantPerson').combotree('tree').tree('getSelected');
    if (checkedNodes != null && checkedNodes.userNode){
        userId = checkedNodes.id;
        userName = checkedNodes.text;
    }
    if (userId != ''){
        var checkedRecords = $("#house_grid")['house_grid'].options.checkedRecords;
        var houseIds = '';
        for (var i=0; i<checkedRecords.length; i++){
            houseIds += checkedRecords[i].id + ',';
        }
        houseIds = houseIds.substring(0, houseIds.length-1);

        $('#model_house_distribute').modal('show');
        $.post(base+'/houseController/changeHousesAccendantPerson',
            {
                houseIds: houseIds,
                accendantId: userId,
                accendantName: userName
            },
            function (success) {
                if (success) {
                    $('#model_house_distribute').modal('hide');
                    alert('分配成功');

                    //重新搜索房源列表
                    reloadHouseGrid();
                }
            })
    }else{
        alert('请选择需要分配的下属人员');
    }
}

//function checkAll(){
//	
//	alert(444);
////	 function  cli(Obj) 
////	 { 
////	 var collid = document.getElementByIdx_x("all") 
////	 var coll = document.getElementsByName(Obj) 
////	 if (collid.checked){ 
////	   for(var i = 0; i < coll.length; i++) 
////	    coll[i].checked = true; 
////	 }else{ 
////	   for(var i = 0; i < coll.length; i++) 
////	    coll[i].checked = false; 
////	 } 
////	 } 
//var qx=document.getElementById("qx");
//var status=document.getElementsByName("status");
//if(qx.checked){
//	alert(33);
//}
//	
//	
//}



var checkAll = function(){
	var qx=document.getElementById("qx");
	var status=document.getElementsByName("status");
	if(qx.checked){
		  for(var i = 0; i < status.length; i++) 
			  status[i].checked = true; 
	}
	else{ 
	   for(var i = 0; i < status.length; i++) 
		   status[i].checked = false; 
	 } 
};

/**
 * 进入报单详情显示
 * @param record
 * @param value
 * @returns {*}
 */
function pbDetail(record, value){
	 var url = base + "/pborderController/pbDetail?bdorderId=" + record["bdorderId"];
    return  "<a onclick='window.open(\"" +url +"\")' class='unline' style='cursor:pointer;'>" + " <font color='#28a4c9'>"+ value + "</font></a>" ;
}



var reloadNone = function () {
    return;
}
