var cityId = $('#cityIds').val();

var firstChoose = true;

var order = 'h.modify_at';

var departmentComboxData = [];

var searchDepIds = '';
var searchUserIds = '';

var personName_combobox_id = null;
var personName_combobox_name = null;

var officeName_combobox_id = null;
var officeName_combobox_name = null;
var firstCity = null;

$(document).ready(function() {
    $('#searchFormOfClose').formValidation({
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
    var data = [];
    var cityName = '';
    var cityIds = '';
    var cityArray = cityId.split(',');
    for (var i=0; i<cityArray.length; i++){
        if (firstCity == null){
            firstCity = cityArray[i];
        }
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
    initCityDistrictBusinessCircle(data, "city_combox_fangyuan", "district_combox_fangyuan", "businesscircle_combox_fangyuan");

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

    $('[name=begin_time]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('[name=end_time]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });


    $('[name=rentEndTime_begin]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('[name=rentEndTime_end]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });



    datatypeSelect($("#datatype")[0]);

    searchpeopletypeCheck($("#searchpeopletype").val());

    /*$('#officeNameCombox').combobox({
        delay:1000,
        keyHandler:$.extend({},$.fn.combobox.defaults.keyHandler,{
            enter: function(e){
                var oldOfficeName = $('#officeNameCombox').combobox('getValues');
                var officeName = e.target.value;
                $('#officeNameCombox').combobox({
                    onBeforeLoad: function(param){
                        param.officeName = officeName;
                    }
                })

                $('#officeNameCombox').combobox('reload', base+'/officeController/getComboDataOfOfficeList');

                if (oldOfficeName.indexOf(',') == -1){
                    oldOfficeName = officeName;
                }else {
                    var index = oldOfficeName.lastIndexOf(',');
                    oldOfficeName = oldOfficeName.substring(0, index) + officeName;
                }

                $('#officeNameCombox').combobox().next('span').find('input').focus();
                $('#officeNameCombox').combobox('setValues', oldOfficeName);
            }
        })
    });

    $('#personName').combobox({
        delay:1000,
        keyHandler:$.extend({},$.fn.combobox.defaults.keyHandler,{
            enter: function(e){
                var oldPersonName = $('#personName').combobox('getValues');
                var personName = e.target.value;
                $('#personName').combobox({
                    onBeforeLoad: function(param){
                        param.personName = personName;
                    }
                })

                $('#personName').combobox('reload', base+'/mgmtUserController/getPersonNameList');


                if (oldPersonName.indexOf(',') == -1){
                    oldPersonName = personName;
                }else {
                    var index = oldPersonName.lastIndexOf(',');
                    oldPersonName = oldPersonName.substring(0, index) + officeName;
                }

                $('#personName').combobox().next('span').find('input').focus();
                $('#personName').combobox('setValues', oldPersonName);
            }
        })
    });*/


    /**
     * 生成房源列表
     * @type {dataGrid}
     */
    $.fn['house_grid_closed'] = new dataGrid();
    var gridOptions = getDataGridOptions("house_grid_closed");

    clearSearchValue();

    setDefaultSearchConditions();

    $("#house_grid_closed")['house_grid_closed'].init({
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
        tBodyTrDblclickCallBack: function (record) {
            var url = base + "/houseCloseController/houseCloseDetails?id=" + record["id"];
            window.open(url);
        },
        _handleTbodyTrClick: function(record){
            /*var url = base + "/houseCloseController/houseCloseDetails?id=" + record["id"];
            window.open(url);*/
        },
        thClickCallback: function(orderField){
            order = orderField;

            //联表查询排序，判断排序字段
            if (order == 'officeName'){
                order = 'o.name';
            }else if (order == 'id'){
                order = 'h.id';
            }else if (order == 'buildingNo'){
                order = 'h.building_no';
            }else if (order == 'floorNo'){
                order = 'h.floor_no';
            }else if (order == 'houseNo'){
                order = 'h.house_no';
            }else if (order == 'circleName'){
                order = 'o.circle_name';
            }else if (order == 'houseArea'){
                order = 'h.house_area';
            }else if (order == 'houseNo'){
                order = 'h.house_no';
            }else if (order == 'price'){
                order = 'h.price';
            }else if (order == 'createAt'){
                order = 'h.create_at';
            }else if (order == 'followCount'){
                order = 'h.follow_count';
            }else if (order == 'createName'){
                order = 'h.create_name';
            }else if (order == 'confirmclosename'){
                order = 'h.confirmclosename';
            }else if (order == 'confirmclosetime'){
                order = 'h.confirmclosetime';
            }else if (order == 'closereason'){
                order = 'h.status';
            }

            $("#house_grid_closed")['house_grid_closed'].reload({
                params: getHouseGridParams()
            });
        }
    });

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();
});



/**
 * 打开已关闭房源页面
 */
var openClosedHousePage=function(){
    //window.open(base+ "/officeController/officenolocklist");
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
    var searchpeopletype = $('[name=searchpeopletype]');
    $(searchpeopletype[0]).attr("checked", true);

    searchpeopletypeCheck(1);

    var closeConds = $('[name=searchCondition]');
    for (var i=0; i<closeConds.length; i++){
        if (closeConds[i].id == 'closeCond_money') {
            $('#begin_money').val(null);
            $('#end_money').val(null);
        }
        else if (closeConds[i].id == 'closeCond_area'){
            $('#begin_area').val(null);
            $('#end_area').val(null);
        }else if (closeConds[i].id == 'closeCond_creatTime'){
            $('#created_at_begin').val('');
            $('#created_at_end').val('');
        }else if (closeConds[i].id == 'closeCond_rentEndTime'){
            $('#rentEndTime_begin').val('');
            $('#rentEndTime_end').val('');
        }else if (closeConds[i].id == 'closeCond_datatype'){
            $("#datatype").val('');
            $("#jiaofuTime").removeClass("form-group inline-ms");
            $("#jiaofuTime").addClass("form-group inline-ms hide");
            $("#begin_time").val('');
            $("#end_time").val('');
            $("#status").val(0);
            $('#invalid_type').val(0);
            $("#closed_reason").removeClass("form-group inline-ms");
            $("#closed_reason").addClass("form-group inline-ms hide");
        }else if (closeConds[i].id == 'closeCond_officeNameCombox'){
            $('#officeNameCombox').combobox('setValues', []);
        }else if (closeConds[i].id == 'closeCond_personName'){
            $('#personName').combobox('setValues', []);
            personName_combobox_id = null;
            personName_combobox_name = null;
        }else if (closeConds[i].id == 'closeCond_departmentCombox'){
            $("#departmentCombox").combobox("setValues", []);
            $("#departmentUserComboxTree").combotree("setValues",'');
            $('#departmentUserComboxTree').combotree("loadData","");
        }else if (closeConds[i].id == 'closeCond_city_combox_fangyuan'){
            $('#city_combox_fangyuan').val('');
            $('#district_combox_fangyuan').val('');
            $("#district_combox_fangyuan").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
            $('#businesscircle_combox_fangyuan').val('');
            $("#businesscircle_combox_fangyuan").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        }else if (closeConds[i].id == 'closeCond_district_combox_fangyuan'){
            $('#district_combox_fangyuan').val('');
            $('#businesscircle_combox_fangyuan').val('');
            $("#businesscircle_combox_fangyuan").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        }else{
            $("#" + closeConds[i].id.substring(10, closeConds[i].id.length)).val('');
        }
    }

    cleanSearchConditionsValue();

    reloadHouseGridAfterCleanSearchConditions();
}


/**
 * 默认展示搜索条件
 */
var setDefaultSearchConditions = function () {
    if (firstCity != null){
        $('#city_combox_fangyuan').val(firstCity);

        $("#district_combox_fangyuan")['district_combox_fangyuan'].reload({
            params: {
                'cityId': firstCity
            }
        });
    }
}

var departmentComboxOnLoad =  function(){
    $('#departmentCombox').combobox('setValue', -1);
    departmentComboxChange();
}

/**
 * 搜索
 */
var reloadHouseGrid = function(){
    if (($('#begin_area').val() != '' && isNaN(parseFloat($('#begin_area').val()))) || ($('#end_area').val() != '' && isNaN(parseFloat($('#end_area').val())))
        || ($('#begin_money').val() != '' && isNaN(parseFloat($('#begin_money').val())))|| ($('#end_money').val() != '' && isNaN(parseFloat($('#end_money').val())))){
        alert("请输入正确查询项！");
        return false;
    }

    var validate = $('#searchFormOfClose').data('formValidation').isValid();

    if (validate != null && !validate){
        alert("请输入正确查询项！");
        return false;
    }

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();

    var officeName = $('#officeNameCombox').combobox('getValues');

    $("#house_grid_closed")['house_grid_closed'].reload({
        params: getHouseGridParams()
    });
};

/**
 * 获取房源列表刷新时的参数
 */
var getHouseGridParams = function(){
    var datatype = $('#datatype').val();
    var confirmclosetimeBegin = null;
    var confirmclosetimeEnd = null;
    var issearchClosePerson = null;

    var curDate = new Date();
    if (datatype == 1){ //15天内
        var begin = new Date();
        var day = begin.format('yyyy-MM-dd');
        begin = new Date(day.replace(/-/g, ','));
        confirmclosetimeBegin = parseInt((begin.getTime() - 15*24*3600*1000)/1000);
    }else if (datatype == 2){ //一个月内
        var begin = new Date();
        var day = begin.format('yyyy-MM-dd');
        begin = new Date(day.replace(/-/g, ','));
        begin = new Date(begin.setMonth((new Date().getMonth()-1)));
        confirmclosetimeBegin = parseInt(begin.getTime()/1000);
    }else if (datatype == 3){ //自定义
        if ($('#begin_time').val() != null && $('#begin_time').val() != ""){
            var begin = new Date($('#begin_time').val().replace(/-/g, ','));
            confirmclosetimeBegin = parseInt(begin.getTime()/1000);
        }
        if ($('#end_time').val() != null && $('#end_time').val() != ""){
            var end = new Date($('#end_time').val().replace(/-/g, ','));
            confirmclosetimeEnd = parseInt((end.getTime() + 24*3600*1000)/1000);
        }
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

    var rentEndTimeAtBegin =  $('#rentEndTime_begin').val();
    if (rentEndTimeAtBegin != null && rentEndTimeAtBegin !=''){
        var begin = new Date(rentEndTimeAtBegin.replace(/-/g, ','));
        rentEndTimeAtBegin = parseInt(begin.getTime()/1000);
    }
    var rentEndTimeAtEnd =  $('#rentEndTime_end').val();
    if (rentEndTimeAtEnd != null && rentEndTimeAtEnd !=''){
        var end = new Date(rentEndTimeAtEnd.replace(/-/g, ','));
        rentEndTimeAtEnd = parseInt((end.getTime() + 24*3600*1000)/1000);
    }

    var issearchCreatePerson = false;
    var issearchAccendantPerson = false;
    var issearchInvestigatorPerson = false;

    var identity = $('#identity').val();
    if (identity == 1){
        issearchCreatePerson = true;
    }else if (identity == 2){
        issearchAccendantPerson = true;
    }else if (identity == 3){
        issearchInvestigatorPerson = true;
    }else if (identity == 4){
        issearchClosePerson = true;
    }

    var searchHasPricture = null;
    var pictureCombo = $('#pictureCombo').val();
    if (pictureCombo == 1){
        searchHasPricture = true;
    }else if (pictureCombo == 2){
        searchHasPricture = false;
    }

    var searchIsinvestigate = null;
    var isinvestigate = $('#isinvestigate').val();
    if (isinvestigate == 1){
        searchIsinvestigate = true;
    }else if (isinvestigate == 2){
        searchIsinvestigate = false;
    }

    //var closeReason = $('#status').val();
   /* if (closeReason != null && closeReason != 0){
        closeReason = $("#status")[0].options[$("#status")[0].selectedIndex].text;
    }*/

    var personName = '';

    var personNameComboData = $('#personName').combobox('getData');
    var personNameId = $('#personName').combobox('getValue');
    var pesonNameText = $('#personName').combobox('getText');
    if (personNameId != null && pesonNameText != '' && pesonNameText != null && pesonNameText != ''){
        if (personNameId == personName_combobox_id && pesonNameText == personName_combobox_name){
            searchUserIds = personNameId;
        }else{
            personName = personNameId;
        }
    }

    var officeId = '';
    var officeName = '';
    var officeNameComboxId = $('#officeNameCombox').combobox('getValue');
    var officeNameComboxText = $('#officeNameCombox').combobox('getText');
    if (officeNameComboxId != null && officeNameComboxText != '' && officeNameComboxText != null && officeNameComboxText != ''){
        if (officeNameComboxId == officeName_combobox_id && officeNameComboxText == officeName_combobox_name){
            officeId = officeNameComboxId;
        }else{
            officeName = officeNameComboxText;
        }
    }

    var params = {
        'houseIdStr' : $('#houseid').val().replace(/^\s+|\s+$/g, '').trim(),
        'officeName' : officeName.trim(),
        'officeId' : officeId,
        'buildingNo' : $('#buildingno').val().trim(),
        'floorNo' : $('#floorno').val().trim(),
        'houseNo' : $('#houseno').val().trim(),
        'beginMoney' : $('#begin_money').val(),
        'endMoney' : $('#end_money').val(),
        'moneytype' : $('#moneytype').val(),
        'beginArea' : $('#begin_area').val(),
        'endArea' : $('#end_area').val(),
        'cityIds' :  $('#city_combox_fangyuan').val(),
        'districtId':  $('#district_combox_fangyuan').val(),
        'circleId': $('#businesscircle_combox_fangyuan').val(),
        'investorContactphone': $('#investorContactPhone').val().trim(),
        'createAtBegin': createAtBegin,
        'createAtEnd': createAtEnd,
        'confirmclosetimeBegin': confirmclosetimeBegin,
        'confirmclosetimeEnd': confirmclosetimeEnd,
        'status': $('#status').val(),
        'invalidType': $('#invalid_type').val(),
        'rentEndTimeAtBegin': rentEndTimeAtBegin,
        'rentEndTimeAtEnd': rentEndTimeAtEnd,
        'issearchCreatePerson': issearchCreatePerson,
        'issearchAccendantPerson': issearchAccendantPerson,
        'issearchInvestigatorPerson': issearchInvestigatorPerson,
        'issearchClosePerson': issearchClosePerson,
        'personName': personName.trim(),
        'searchDepIds': searchDepIds,
        'searchUserIds': searchUserIds,
        'deliverStandard': $('#deliverstandard').val(),
        'deliverStyle': $('#decorationstyle').val(),
        'lock': $('#islocked').val(),
        'searchHasPricture': searchHasPricture,
        'searchIsinvestigate': searchIsinvestigate,
        'investorType' : $('#investorType').val(),
        'verify': $('#verify').val(),
        "sort" : $('#house_grid_closed')['house_grid_closed'].options.sort,
        "order": order
    }

    return params;
}

/**
 * 房源关闭状态onchange事件
 */
var statusChange = function(){
    if ($('#status').val() == 31){
        $("#closed_reason").removeClass("form-group inline-ms hide");
        $("#closed_reason").addClass("form-group inline-ms");
    }else{
        $('#invalid_type').val(0);
        $("#closed_reason").removeClass("form-group inline-ms");
        $("#closed_reason").addClass("form-group inline-ms hide");
    }
}



/**
 * 清空搜索条件后加载房源列表
 */
var reloadHouseGridAfterCleanSearchConditions = function(){
    order = 'h.modify_at';

    //$("#house_grid_closed")['house_grid_closed'].options.sort_class = '';

    $("#house_grid_closed")['house_grid_closed'].reload({
        params:getHouseGridParams()
    });
};

var fangyuanComboxSelect = function(record){
    var oldOfficeName = $('#officeNameCombox').combobox('getValues');
    if (oldOfficeName.indexOf(',') == -1 && firstChoose){
        firstChoose = false;
        $('#officeNameCombox').combobox('setValues', record.name)
    }
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

        $("#searchpeople").removeClass("form-group inline-ms");
        $("#searchpeople").addClass("form-group inline-ms hide");
    }
}

/**
 * 清空搜索条件框值
 */
var cleanSearchConditionsValue = function(){
    var closeConds = $('[name=searchCondition]');
    for (var i=0; i<closeConds.length; i++){
        $('#' + closeConds[i].id).css('display', 'none');
        $('#' + closeConds[i].id).html('');
    }

    $('#searchConditonsDiv').css('display', 'none');
}

/**
 * 设置搜索条件框值
 */
var setSearchConditionsValue = function(){
    var closeConds = $('[name=searchCondition]');
    for (var i=0; i<closeConds.length; i++){
        if (closeConds[i].id == 'closeCond_money') {
            var begin_money = $('#begin_money').val();
            var end_money = $('#end_money').val();
            var value = '';
            if (begin_money != null && begin_money != '' && end_money != null && end_money != '') {
                value = '租金：' +begin_money + '-' + end_money;
            } else if (begin_money != null && begin_money != '' && (end_money == null || end_money == '')) {
                value = '租金：不小于' + begin_money;
            } else if (end_money != null && end_money != '' && (begin_money == null || begin_money == '')) {
                value = '租金：不大于' + end_money;
            }

            if (value != ''){
                $('#closeCond_money').css('display', 'inline');
                $('#closeCond_money').html(value + "(" + $("#moneytype")[0].options[$("#moneytype")[0].selectedIndex].text + ")");
            }else{
                $('#closeCond_money').css('display', 'none');
                $('#closeCond_money').html('');
            }
        }
        else if (closeConds[i].id == 'closeCond_area'){
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
                $('#closeCond_area').css('display', 'inline');
                $('#closeCond_area').html(value);
            }else{
                $('#closeCond_area').css('display', 'none');
                $('#closeCond_area').html('');
            }
        }else if (closeConds[i].id == 'closeCond_creatTime'){
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
                $('#closeCond_creatTime').css('display', 'inline');
                $('#closeCond_creatTime').html(value);
            }else{
                $('#closeCond_creatTime').css('display', 'none');
                $('#closeCond_creatTime').html('');
            }
        }else if (closeConds[i].id == 'closeCond_rentEndTime'){
            var created_at_begin = $('#rentEndTime_begin').val();
            var created_at_end = $('#rentEndTime_end').val();
            var value = '';
            if (created_at_begin != null && created_at_begin != '' && created_at_end != null && created_at_end != '') {
                value = '租期到期时间：' +created_at_begin + '至' + created_at_end;
            } else if (created_at_begin != null && created_at_begin != '' && (created_at_end == null || created_at_end == '')) {
                value = '租期到期时间：开始于' + created_at_begin;
            } else if (created_at_end != null && created_at_end != '' && (created_at_begin == null || created_at_begin == '')) {
                value = '租期到期时间：截止于' + created_at_end;
            }

            if (value != ''){
                $('#closeCond_rentEndTime').css('display', 'inline');
                $('#closeCond_rentEndTime').html(value);
            }else{
                $('#closeCond_rentEndTime').css('display', 'none');
                $('#closeCond_rentEndTime').html('');
            }
        }else if (closeConds[i].id == 'closeCond_datatype'){
            var datatype = $('#datatype').val();
            var value = '';
            if (datatype == 1){
                value = '关闭时间：15天内';
            }else if (datatype == 2){
                value = '关闭时间：一个月内';
            }else if (datatype == 3){
                var begin_time = $('#begin_time').val();
                var end_time = $('#end_time').val();
                if (begin_time != null && begin_time != '' && end_time != null && end_time != '') {
                    value = '关闭时间：' +begin_time + '至' + end_time;
                } else if (begin_time != null && begin_time != '' && (end_time == null || end_time == '')) {
                    value = '关闭时间：开始于' + begin_time;
                } else if (end_time != null && end_time != '' && (begin_time == null || begin_time == '')) {
                    value = '关闭时间：截止于' + end_time;
                }
            }

            var closeReason = $('#status').val();
            if (closeReason != null && closeReason != 0){
                value += $("#status")[0].options[$("#status")[0].selectedIndex].text;
            }

            var closeReason_invalid = $('#invalid_type').val();
            if (closeReason_invalid != null && closeReason_invalid != 0){
                value += ", " + $("#invalid_type")[0].options[$("#invalid_type")[0].selectedIndex].text;
            }

            if (value != ''){
                $('#closeCond_datatype').css('display', 'inline');
                $('#closeCond_datatype').html(value);
            }else{
                $('#closeCond_datatype').css('display', 'none');
                $('#closeCond_datatype').html('');
            }
        }else if (closeConds[i].id == 'closeCond_departmentCombox'){
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
                $('#closeCond_departmentCombox').css('display', 'inline');
                $('#closeCond_departmentCombox').html(value);
            }else{
                $('#closeCond_departmentCombox').css('display', 'none');
                $('#closeCond_departmentCombox').html('');
            }
        }else if (closeConds[i].id == 'closeCond_officeNameCombox'){
            var officeName = $('#officeNameCombox').combobox('getText');
            if (officeName != ''){
                $('#closeCond_officeNameCombox').css('display', 'inline');
                $('#closeCond_officeNameCombox').html("写字楼：" + officeName);
            }else{
                $('#closeCond_officeNameCombox').css('display', 'none');
                $('#closeCond_officeNameCombox').html('');
            }
        }else if (closeConds[i].id == 'closeCond_houseid'){
            var value = $('#houseid').val();
            if (value != null && value != ''){
                $('#closeCond_houseid').css('display', 'inline');
                $('#closeCond_houseid').html("房源编号：" + value);
            }else{
                $('#closeCond_houseid').css('display', 'none');
                $('#closeCond_houseid').html('');
            }
        }else if (closeConds[i].id == 'closeCond_buildingno'){
            var value = $('#buildingno').val();
            if (value != null && value != ''){
                $('#closeCond_buildingno').css('display', 'inline');
                $('#closeCond_buildingno').html("楼号：" + value);
            }else{
                $('#closeCond_buildingno').css('display', 'none');
                $('#closeCond_buildingno').html('');
            }
        }else if (closeConds[i].id == 'closeCond_floorno'){
            var value = $('#floorno').val();
            if (value != null && value != ''){
                $('#closeCond_floorno').css('display', 'inline');
                $('#closeCond_floorno').html("楼层：" + value);
            }else{
                $('#closeCond_floorno').css('display', 'none');
                $('#closeCond_floorno').html('');
            }
        }else if (closeConds[i].id == 'closeCond_houseno'){
            var value = $('#houseno').val();
            if (value != null && value != ''){
                $('#closeCond_houseno').css('display', 'inline');
                $('#closeCond_houseno').html("房间号：" + value)
            }else{
                $('#closeCond_houseno').css('display', 'none');
                $('#closeCond_houseno').html('');
            }
        }else if (closeConds[i].id == 'closeCond_investorContactPhone'){
            var value = $('#investorContactPhone').val();
            if (value != null && value != ''){
                $('#closeCond_investorContactPhone').css('display', 'inline');
                $('#closeCond_investorContactPhone').html("业主联系方式：" + value)
            }else{
                $('#closeCond_investorContactPhone').css('display', 'none');
                $('#closeCond_investorContactPhone').html('');
            }
        }else if (closeConds[i].id == 'closeCond_personName'){
            var value = $('#personName').combobox('getText');
            if (value != null && value != ''){
                $('#closeCond_personName').css('display', 'inline');
                $('#closeCond_personName').html("人员：" + value)
            }else{
                $('#closeCond_personName').css('display', 'none');
                $('#closeCond_personName').html('');
            }
        }else{
            var value = $("#" + closeConds[i].id.substring(10, closeConds[i].id.length)).val();
            if (value != null && value != ''){
                $('#' + closeConds[i].id).css('display', 'inline');
                var id = closeConds[i].id.substring(10, closeConds[i].id.length);
                $('#' + closeConds[i].id).html($("#"+id)[0].options[$("#"+id)[0].selectedIndex].text);
            }else{
                $('#' + closeConds[i].id).css('display', 'none');
                $('#' + closeConds[i].id).html('');
            }
        }
    }
}

/**
 * 设置当前已选择的搜索条件框是否显示
 */
var setSearchConditionsStatus = function(){
    var searchConditonsDiv_show = false;
    var closeConds = $('[name=searchCondition]');
    for (var i=0; i<closeConds.length; i++){
        if (closeConds[i].style.display == 'inline'){
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
    if (obj.id == 'closeCond_money'){
        $('#begin_money').val(null);
        $('#end_money').val(null);
    }else if (obj.id == 'closeCond_area'){
        $('#begin_area').val(null);
        $('#end_area').val(null);
    }else if (obj.id == 'closeCond_creatTime'){
        $('#created_at_begin').val('');
        $('#created_at_end').val('');
    }else if (obj.id == 'closeCond_rentEndTime'){
        $('#rentEndTime_begin').val('');
        $('#rentEndTime_end').val('');
    }else if (obj.id == 'closeCond_datatype'){
        $("#datatype").val('');
        $("#jiaofuTime").removeClass("form-group inline-ms");
        $("#jiaofuTime").addClass("form-group inline-ms hide");
        $("#begin_time").val('');
        $("#end_time").val('');
        $("#status").val(0);
        $('#invalid_type').val(0);
        $("#closed_reason").removeClass("form-group inline-ms");
        $("#closed_reason").addClass("form-group inline-ms hide");
    }else if (obj.id == 'closeCond_departmentCombox'){
        $("#departmentCombox").combobox("setValues", []);
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");
    }else if (obj.id == 'closeCond_officeNameCombox'){
        $('#officeNameCombox').combobox('setValues', []);
    }else if (obj.id == 'closeCond_personName'){
        $('#personName').combobox('setValues', []);
        personName_combobox_id = null;
        personName_combobox_name = null;
    }else if (obj.id == 'closeCond_city_combox_fangyuan'){
        $('#city_combox_fangyuan').val('');
        $('#district_combox_fangyuan').val('');
        $("#district_combox_fangyuan").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
        $('#businesscircle_combox_fangyuan').val('');
        $("#businesscircle_combox_fangyuan").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    }else if (obj.id == 'closeCond_district_combox_fangyuan'){
        $('#district_combox_fangyuan').val('');
        $('#businesscircle_combox_fangyuan').val('');
        $("#businesscircle_combox_fangyuan").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    }else{
        $("#" + obj.id.substring(10, obj.id.length)).val('');
    }

    //重新搜索房源列表
    reloadHouseGrid();
}


var officeNameComboxOnLoad = function(){
    //$('#officeNameCombox').trigger("click");


    //$("#officeNameCombox").click(function(){
    //    alert("这是触发事件的第一种方式")
    //});
//$("#officeNameCombox").trigger("focus");
}

//onLoadSuccess:departmentComboxOnLoad,

var personNameSelect_closed = function(record){
    personName_combobox_id = record.userId;
    personName_combobox_name = record.fullname;
}

var personNameLoadSuccess_closed = function(){
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0){
        for (var i=0; i<data.length; i++){
            if (data[i].fullname == value.trim()){
                $('#personName').combobox('setValue', data[i].userId);
                $('#personName').combobox('setText', value);

                personName_combobox_id = data[i].userId;
                personName_combobox_name = value;
                return;
            }
        }
    }
}

var officeNameComboxSelect_closed = function(record){
    officeName_combobox_id = record.id;
    officeName_combobox_name = record.name;
}

var officeNameComboxLoadSuccess_closed = function(){
    var data = $('#officeNameCombox').combobox('getData');
    var value = $('#officeNameCombox').combobox('getValue');
    if (data != null && data.length > 0){
        for (var i=0; i<data.length; i++){
            if (data[i].name == value.trim()){
                $('#officeNameCombox').combobox('setValue', data[i].id);
                $('#officeNameCombox').combobox('setText', value);
                officeName_combobox_id = data[i].id;
                officeName_combobox_name = data[i].name;
                return;
            }
        }
    }
}