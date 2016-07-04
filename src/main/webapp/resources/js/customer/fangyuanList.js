var cityId = $('#cityIds').val();
var firstChoose = true;

var order = 'h.force_flag desc, h.create_at';

var departmentComboxData = [];

var searchDepIds = '';
var searchUserIds = '';

var personName_combobox_id = null;
var personName_combobox_name = null;

var officeName_combobox_id = null;
var officeName_combobox_name = null;

var personId = null;

var customerId = null;
var phoneNum = '';

var choosedHouseIds = '';
var choosedOfficeIds = '';
var choosedOfficeIdHouseIdMapJson = {};
var wait = 60;

$(document).ready(function () {
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
            begin_money: {
                validators: {
                    between: {
                        max: 999999999,
                        min: 0,
                        message: '请输入正确项'
                    }
                }
            },
            end_money: {
                validators: {
                    between: {
                        max: 999999999,
                        min: 0,
                        message: '请输入正确项'
                    }
                }
            },
            begin_area: {
                validators: {
                    between: {
                        max: 999999999,
                        min: 0,
                        message: '请输入正确项'
                    }
                }
            },
            end_area: {
                validators: {
                    between: {
                        max: 999999999,
                        min: 0,
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
    for (var i = 0; i < cityArray.length; i++) {
        cityName = getCityName(cityArray[i]);
        if (cityName != '') {
            cityIds += cityArray[i] + ",";
            data.push({'id': cityArray[i], 'name': cityName});
        }
    }
    cityIds = cityIds.substring(0, cityIds.length - 1);
    if (cityIds != '') {
        // 拼接函数(索引位置, 要删除元素的数量, 元素)
        data.splice(0, 0, {'id': '', 'name': '全部'})
    }

    /**
     * 生成城市-分布-商圈公共控件
     */
    initCityDistrictBusinessCircle(data, "city_combox_customer", "district_combox_customer", "businesscircle_combox_customer");

    $('[name=created_at_begin]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('[name=created_at_end]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('[name=begin_time]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('[name=end_time]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('#order_house_date').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        startDate: new Date()
    });

    datatypeSelect($("#datatype")[0]);

    searchpeopletypeCheck($("#searchpeopletype").val());

    /**
     * 生成房源列表
     * @type {dataGrid}
     */
    $.fn['house_grid'] = new dataGrid();
    var gridOptions = getDataGridOptions("house_grid");

    clearSearchValue();

    setDefaultSearchByUserName();

    $('#btn_push').attr('disabled', false);

    $("#house_grid")['house_grid'].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        isOverWriteThclick: true,
        params: getHouseGridParams(),
        order: gridOptions.params.order,
        onload: function () {
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        tBodyTrDblclickCallBack: function (record) {
            var url = base + "/houseController/houseModify?id=" + record["id"];
            window.open(url, record["id"]);
        },
        _handleTbodyTrClick: function (record) {
            //var url = base + "/houseController/houseModify?id=" + record["id"];
            //window.open(url, record["id"]);
        },
        thClickCallback: function (orderField) {
            order = orderField;
            //联表查询排序，判断排序字段
            if (order == 'officeName') {
                order = 'o.name';
            } else if (order == 'id') {
                order = 'h.id';
            } else if (order == 'buildingNo') {
                order = 'h.building_no';
            } else if (order == 'floorNo') {
                order = 'h.floor_no';
            } else if (order == 'houseNo') {
                order = 'h.house_no';
            } else if (order == 'circleName') {
                order = 'o.circle_name';
            } else if (order == 'houseArea') {
                order = 'h.house_area';
            } else if (order == 'houseNo') {
                order = 'h.house_no';
            } else if (order == 'price') {
                order = 'h.price';
            } else if (order == 'createAt') {
                order = 'h.create_at';
            } else if (order == 'followCount') {
                order = 'h.follow_count';
            }else if (order == 'donelookCount'){
                order = 'h.donelook_count';
            }else if (order == 'unlookCount'){
                order = 'h.unlook_count';
            }

            $("#house_grid")['house_grid'].reload({
                params: getHouseGridParams()
            });
        }
    });

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();


    /**
     * 已选择房源列表
     * @type {dataGrid}
     */
    $.fn['house_grid_choosed'] = new dataGrid();
    var gridOptions = getDataGridOptions("house_grid_choosed");
    $("#house_grid_choosed")['house_grid_choosed'].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        tBoolPage: false,
        order: gridOptions.params.order,
        onload: function () {
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        tBodyTrDblclickCallBack: function (record) {
            var url = base + "/houseController/houseModify?id=" + record["id"];
            window.open(url, record["id"]);
        }
    });
});

/**
 * 打开已关闭房源页面
 */
var openClosedHouseManagePage = function () {
    window.open(base + "/houseController/closedfangyuanlist")
}

/**
 * 打开录入房源页面
 */
var openAddHousePage = function () {
    window.open(base + "/houseController/houseAddPage");
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
    var searchpeopletype = $('[name=searchpeopletype]');
    $(searchpeopletype[0]).attr("checked", true);

    searchpeopletypeCheck(1);

    var conditions = $('[name=searchCondition]');
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i].id == 'condition_money') {
            $('#begin_money').val(null);
            $('#end_money').val(null);
        }
        else if (conditions[i].id == 'condition_area') {
            $('#begin_area').val(null);
            $('#end_area').val(null);
        } else if (conditions[i].id == 'condition_creatTime') {
            $('#created_at_begin').val('');
            $('#created_at_end').val('');
        } else if (conditions[i].id == 'condition_datatype') {
            $("#datatype").val('');
            $("#jiaofuTime").removeClass("form-group inline-ms");
            $("#jiaofuTime").addClass("form-group inline-ms hide");
            $("#begin_time").val('');
            $("#end_time").val('');
        } else if (conditions[i].id == 'condition_officeNameCombox') {
            $('#officeNameCombox').combobox('setValue', '');
        } else if (conditions[i].id == 'condition_personName') {
            $('#personName').combobox('setValue', '');
            personName_combobox_id = null;
            personName_combobox_name = null;
            personId = null;
        } else if (conditions[i].id == 'condition_departmentCombox') {
            $("#departmentCombox").combobox("setValues", []);
            $("#departmentUserComboxTree").combotree("setValues", '');
            $('#departmentUserComboxTree').combotree("loadData", "");
        } else if (conditions[i].id == 'condition_city_combox_customer') {
            $('#city_combox_customer').val('');
            $('#district_combox_customer').val('');
            $("#district_combox_customer").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
            $('#businesscircle_combox_customer').val('');
            $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        } else if (conditions[i].id == 'condition_district_combox_customer') {
            $('#district_combox_customer').val('');
            $('#businesscircle_combox_customer').val('');
            $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
        } else if (conditions[i].id == 'condition_searchChangeAccendantPerson') {
            $('#searchChangeAccendantPerson').attr("checked", false);
            $('#btn_changeAccendantPerson').css('display', 'none');
        } else {
            $("#" + conditions[i].id.substring(10, conditions[i].id.length)).val('');
        }
    }

    cleanSearchConditionsValue();

    //setDefaultSearchByUserName();

    reloadHouseGridAfterCleanSearchConditions();
}

var departmentComboxOnLoad = function () {
    $('#departmentCombox').combobox('setValues', -1);
    departmentComboxChange();
}

/**
 * 搜索
 */
var reloadHouseGrid = function () {
    /*$('#searchForm').data('formValidation').validateField($('#begin_money'));*/

    if (($('#begin_area').val() != '' && isNaN(parseFloat($('#begin_area').val()))) || ($('#end_area').val() != '' && isNaN(parseFloat($('#end_area').val())))
        || ($('#begin_money').val() != '' && isNaN(parseFloat($('#begin_money').val()))) || ($('#end_money').val() != '' && isNaN(parseFloat($('#end_money').val())))) {
        alert("请输入正确查询项！");
        return false;
    }

    var validate = $('#searchForm').data('formValidation').isValid();

    if (validate != null && !validate) {
        alert("请输入正确查询项！");
        return false;
    }

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();

    if ($('#searchChangeAccendantPerson') != null && $('#searchChangeAccendantPerson')[0] != null && $('#searchChangeAccendantPerson')[0].checked) {
        $("#house_grid")['house_grid'].options.tBoolCheckbox = true;
    } else {
        $("#house_grid")['house_grid'].options.tBoolCheckbox = false;
    }

    $("#house_grid")['house_grid'].options.checkedRecords = [];

    $("#house_grid")['house_grid'].reload({
        params: getHouseGridParams()
    });
};

/**
 * 获取房源列表刷新时的参数
 */
var getHouseGridParams = function () {
    var datatype = $('#datatype').val();
    var deliverDateBegin = null;
    var deliverDateEnd = null;
    var curDate = new Date();
    if (datatype == 1) { //15天内
        var begin = new Date();
        var day = begin.format('yyyy-MM-dd');
        begin = new Date(day.replace(/-/g, ','));
        //deliverDateBegin = parseInt(begin.getTime()/1000);
        //begin = new Date(begin.setMonth((new Date().getDay()-15)));
        deliverDateBegin = parseInt((begin.getTime() - 15 * 24 * 3600 * 1000) / 1000);
    } else if (datatype == 2) { //一个月内
        var begin = new Date();
        var day = begin.format('yyyy-MM-dd');
        begin = new Date(day.replace(/-/g, ','));
        begin = new Date(begin.setMonth((new Date().getMonth() - 1)));
        deliverDateBegin = parseInt(begin.getTime() / 1000);
    } else if (datatype == 3) { //自定义
        if ($('#begin_time').val() != null && $('#begin_time').val() != "") {
            var begin = new Date($('#begin_time').val().replace(/-/g, ','));
            deliverDateBegin = parseInt(begin.getTime() / 1000);
        }
        if ($('#end_time').val() != null && $('#end_time').val() != "") {
            var end = new Date($('#end_time').val().replace(/-/g, ','));
            //end = new Date(end.setd((new Date().getDay()+1)));
            deliverDateEnd = parseInt((end.getTime() + 24 * 3600 * 1000) / 1000);
        }
    }

    var createAtBegin = $('#created_at_begin').val();
    if (createAtBegin != null && createAtBegin != '') {
        var begin = new Date(createAtBegin.replace(/-/g, ','));
        createAtBegin = parseInt(begin.getTime() / 1000);
    }

    var createAtEnd = $('#created_at_end').val();
    if (createAtEnd != null && createAtEnd != '') {
        var end = new Date(createAtEnd.replace(/-/g, ','));
        createAtEnd = parseInt((end.getTime() + 24 * 3600 * 1000) / 1000);
    }

    var issearchCreatePerson = false;
    var issearchAccendantPerson = false;
    var issearchInvestigatorPerson = false;

    var identity = $('#identity').val();
    if (identity == 1) {
        issearchCreatePerson = true;
    } else if (identity == 2) {
        issearchAccendantPerson = true;
    } else if (identity == 3) {
        issearchInvestigatorPerson = true;
    }

    var searchHasPricture = null;
    var pictureCombo = $('#pictureCombo').val();
    if (pictureCombo == 1) {
        searchHasPricture = true;
    } else if (pictureCombo == 2) {
        searchHasPricture = false;
    }

    var searchIsinvestigate = null;
    var isinvestigate = $('#isinvestigate').val();
    if (isinvestigate == 1) {
        searchIsinvestigate = true;
    } else if (isinvestigate == 2) {
        searchIsinvestigate = false;
    }

    var issearchCanChangeAccendantPerson = false;
    //查询可调整归属人房源
    if ($('#searchChangeAccendantPerson') != null && $('#searchChangeAccendantPerson')[0] != null && $('#searchChangeAccendantPerson')[0].checked) {
        issearchCanChangeAccendantPerson = true;
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

    if (personId != null) {
        searchUserIds = personId;
    } else {
        personName = $('#personName').combobox('getText');
    }


    var officeId = '';
    var officeName = '';
    var officeNameComboxId = $('#officeNameCombox').combobox('getValue');
    var officeNameComboxText = $('#officeNameCombox').combobox('getText');
    if (officeNameComboxId != null && officeNameComboxText != '' && officeNameComboxText != null && officeNameComboxText != '') {
        if (officeNameComboxId == officeName_combobox_id && officeNameComboxText == officeName_combobox_name) {
            officeId = officeNameComboxId;
        } else {
            officeName = officeNameComboxText;
        }
    }

    var params = {
        'houseIdStr': $('#houseid').val().replace(/^\s+|\s+$/g, ''),
        'officeName': officeName.trim(),
        'officeId': officeId,
        'buildingNo': $('#buildingno').val().trim(),
        'floorNo': $('#floorno').val().trim(),
        'houseNo': $('#houseno').val().trim(),
        'beginMoney': $('#begin_money').val(),
        'endMoney': $('#end_money').val(),
        'moneytype': $('#moneytype').val(),
        'beginArea': $('#begin_area').val(),
        'endArea': $('#end_area').val(),
        'cityIds': $('#city_combox_customer').val(),
        'districtId': $('#district_combox_customer').val(),
        'circleId': $('#businesscircle_combox_customer').val(),
        'investorContactphone': $('#investorContactPhone').val().trim(),
        'createAtBegin': createAtBegin,
        'createAtEnd': createAtEnd,
        'deliverDateBegin': deliverDateBegin,
        'deliverDateEnd': deliverDateEnd,
        'issearchCreatePerson': issearchCreatePerson,
        'issearchAccendantPerson': issearchAccendantPerson,
        'issearchInvestigatorPerson': issearchInvestigatorPerson,
        'personName': personName.trim(),
        'searchDepIds': searchDepIds,
        'searchUserIds': searchUserIds,
        'deliverStandard': $('#deliverstandard').val(),
        'deliverStyle': $('#decorationstyle').val(),
        'lock': $('#islocked').val(),
        'searchHasPricture': searchHasPricture,
        'searchIsinvestigate': searchIsinvestigate,
        'investorType': $('#investorType').val(),
        'verify': $('#verify').val(),
        'issearchCanChangeAccendantPerson': issearchCanChangeAccendantPerson,
        "sort": $('#house_grid')['house_grid'].options.sort,
        "order": order
    }

    return params;
}

var personNameSelect = function (record) {
    personName_combobox_id = record.userId;
    personName_combobox_name = record.fullname;

    personId = personName_combobox_id;
}

/**
 * 清空搜索条件后加载房源列表
 */
var reloadHouseGridAfterCleanSearchConditions = function () {

    //设置搜索条件框值
    setSearchConditionsValue();

    //设置当前已选择的搜索条件框是否显示
    setSearchConditionsStatus();

    order = 'h.force_flag desc, h.create_at';

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
var departmentComboxChange = function () {
    departmentComboxData = $('#departmentCombox').combobox('getData');
    var departmentIdArray = $('#departmentCombox').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0) {
        $("#departmentUserComboxTree").combotree("setValues", '');
        $('#departmentUserComboxTree').combotree("loadData", "");
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
    } else if (departmentIdArray.length > 1) {
        for (var i = 0; i < departmentIdArray.length; i++) {
            if (departmentIdArray[i] != -1) {
                departmentIds += departmentIdArray[i] + ',';
            }
        }
        departmentIds = departmentIds.substring(0, departmentIds.length - 1)
    } else {
        if (departmentIdArray[0] == -1) {
            //var data = $('#departmentCombox').combobox('getData');
            var data = departmentComboxData;

            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i]["deptId"] != -1) {
                        departmentIds += data[i]["deptId"] + ',';
                    }
                }
                departmentIds = departmentIds.substring(0, departmentIds.length - 1)
            }
        } else {
            departmentIds = departmentIdArray[0];
        }
    }

    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];

    if (departmentIds == '') {
        return;
    }

    $('#departmentUserComboxTree').combotree({
        queryParams: {
            departmentIds: departmentIds,
            loop: true,
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
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
var searchMoreBtnClick = function () {
    var display = $("#moreSearchConditionsDiv").css("display");
    if (display == 'none') {
        $("#moreSearchConditionsDiv").css("display", 'block');
        $("#more_caret").removeClass("caret");
        $("#more_caret").addClass("caret-open");
    } else {
        $("#moreSearchConditionsDiv").css("display", 'none');
        $("#more_caret").removeClass("caret-open");
        $("#more_caret").addClass("caret");
    }
}

var datatypeSelect = function (obj) {
    if (obj.value == '3') {
        $("#jiaofuTime").removeClass("form-group inline-ms hide");
        $("#jiaofuTime").addClass("form-group inline-ms");
    } else {
        $("#jiaofuTime").removeClass("form-group inline-ms");
        $("#jiaofuTime").addClass("form-group inline-ms hide");
        $("#begin_time").val('');
        $("#end_time").val('');
    }
}

var searchpeopletypeCheck = function (type) {
    $('#searchpeopletype').val(type);

    if (type == 1) {
        $("#searchpeople").removeClass("form-group inline-ms hide");
        $("#searchpeople").addClass("form-group inline-ms");

        $("#departmentCombox").combobox("setValues", []);
        $("#departmentUserComboxTree").combotree("setValues", '');
        $('#departmentUserComboxTree').combotree("loadData", "");

        $("#searchpeopleOfDepartment").removeClass("form-group inline-ms");
        $("#searchpeopleOfDepartment").addClass("form-group inline-ms hide");

    } else if (type == 2) {
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
var cleanSearchConditionsValue = function () {
    var conditions = $('[name=searchCondition]');
    for (var i = 0; i < conditions.length; i++) {
        $('#' + conditions[i].id).css('display', 'none');
        $('#' + conditions[i].id).html('');
    }

    $('#searchConditonsDiv').css('display', 'none');
}

/**
 * 默认展示归属在当前登录用户下的房源
 */
var setDefaultSearchByUserName = function () {
    var search = window.location.search;
    if (search != '') {
        var params = parseUrlParametersToJson(search.substring(1, search.length));
        customerId = params.customerId;
        var customerName = params.customerName;
        phoneNum = params.phoneNum;
        var orderPriceBegin = params.orderPriceBegin;
        var orderPriceEnd = params.orderPriceEnd;
        var orderAreaBegin = params.orderAreaBegin;
        var orderAreaEnd = params.orderAreaEnd;
        var orderCityId = params.orderCityId;
        var orderDistrictId = params.orderDistrictId;
        var orderBusinesscircleId = params.orderBusinesscircleId;

        var customerInfo = '';
        if (customerName != null && customerName != '') {
            customerInfo += '客户姓名：' + decodeURI(customerName);
        }
        if (phoneNum != null && phoneNum != '') {
            customerInfo += '，客户电话：' + phoneNum;
        }
        if (customerInfo != '') {
            customerInfo = '(' + customerInfo + ')';
        }
        $('#customerInfoDiv').html('请选择房源' + ' <font color="#28a4c9">' + customerInfo + '</font>');

        if (orderPriceBegin != null) {
            $('#begin_money').val(orderPriceBegin);
        }
        if (orderPriceEnd != null) {
            $('#end_money').val(orderPriceEnd);
        }

        if (orderAreaBegin != null) {
            $('#begin_area').val(orderAreaBegin);
        }
        if (orderAreaEnd != null) {
            $('#end_area').val(orderAreaEnd);
        }

        if (orderCityId != null) {
            var setOrderCityId = false;
            var data = $("#city_combox_customer")['city_combox_customer'].options.data;
            for (var k = 0; k < data.length; k++) {
                if (data[k].id == orderCityId) {
                    setOrderCityId = true;
                    break;
                }
            }

            if (setOrderCityId) {
                $('#city_combox_customer').val(orderCityId);

                $("#district_combox_customer")['district_combox_customer'].reload({
                    params: {
                        'cityId': orderCityId
                    }
                });

                if (orderDistrictId != null) {
                    $('#district_combox_customer').val(orderDistrictId);

                    $("#businesscircle_combox_customer")['businesscircle_combox_customer'].reload({
                        params: {
                            'districtId': orderDistrictId
                        }
                    });

                    if (orderBusinesscircleId != null) {
                        $('#businesscircle_combox_customer').val(orderBusinesscircleId);
                    }
                }
            }
        }
    }
}

/**
 * 设置搜索条件框值
 */
var setSearchConditionsValue = function () {
    var conditions = $('[name=searchCondition]');
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i].id == 'condition_money') {
            var begin_money = $('#begin_money').val();
            var end_money = $('#end_money').val();
            var value = '';
            if (begin_money != null && begin_money != '' && end_money != null && end_money != '') {
                value = '租金：' + begin_money + '-' + end_money;
            } else if (begin_money != null && begin_money != '' && (end_money == null || end_money == '')) {
                value = '租金：不小于' + begin_money;
            } else if (end_money != null && end_money != '' && (begin_money == null || begin_money == '')) {
                value = '租金：不大于' + end_money;
            }

            if (value != '') {
                $('#condition_money').css('display', 'inline');
                $('#condition_money').html(value + "(" + $("#moneytype")[0].options[$("#moneytype")[0].selectedIndex].text + ")");
            } else {
                $('#condition_money').css('display', 'none');
                $('#condition_money').html('');
            }
        }
        else if (conditions[i].id == 'condition_area') {
            var begin_area = $('#begin_area').val();
            var end_area = $('#end_area').val();
            var value = '';
            if (begin_area != null && begin_area != '' && end_area != null && end_area != '') {
                value = '面积：' + begin_area + '-' + end_area;
            } else if (begin_area != null && begin_area != '' && (end_area == null || end_area == '')) {
                value = '面积：不小于' + begin_area;
            } else if (end_area != null && end_area != '' && (begin_area == null || begin_area == '')) {
                value = '面积：不大于' + end_area;
            }

            if (value != '') {
                $('#condition_area').css('display', 'inline');
                $('#condition_area').html(value);
            } else {
                $('#condition_area').css('display', 'none');
                $('#condition_area').html('');
            }
        } else if (conditions[i].id == 'condition_creatTime') {
            var created_at_begin = $('#created_at_begin').val();
            var created_at_end = $('#created_at_end').val();
            var value = '';
            if (created_at_begin != null && created_at_begin != '' && created_at_end != null && created_at_end != '') {
                value = '创建时间：' + created_at_begin + '至' + created_at_end;
            } else if (created_at_begin != null && created_at_begin != '' && (created_at_end == null || created_at_end == '')) {
                value = '创建时间：开始于' + created_at_begin;
            } else if (created_at_end != null && created_at_end != '' && (created_at_begin == null || created_at_begin == '')) {
                value = '创建时间：截止于' + created_at_end;
            }

            if (value != '') {
                $('#condition_creatTime').css('display', 'inline');
                $('#condition_creatTime').html(value);
            } else {
                $('#condition_creatTime').css('display', 'none');
                $('#condition_creatTime').html('');
            }
        } else if (conditions[i].id == 'condition_datatype') {
            var datatype = $('#datatype').val();
            var value = '';
            if (datatype == 1) {
                value = '交付日期：15天内';
            } else if (datatype == 2) {
                value = '交付日期：一个月内';
            } else if (datatype == 3) {
                var begin_time = $('#begin_time').val();
                var end_time = $('#end_time').val();
                if (begin_time != null && begin_time != '' && end_time != null && end_time != '') {
                    value = '交付时间：' + begin_time + '至' + end_time;
                } else if (begin_time != null && begin_time != '' && (end_time == null || end_time == '')) {
                    value = '交付时间：开始于' + begin_time;
                } else if (end_time != null && end_time != '' && (begin_time == null || begin_time == '')) {
                    value = '交付时间：截止于' + end_time;
                }
            }

            if (value != '') {
                $('#condition_datatype').css('display', 'inline');
                $('#condition_datatype').html(value);
            } else {
                $('#condition_datatype').css('display', 'none');
                $('#condition_datatype').html('');
            }
        } else if (conditions[i].id == 'condition_departmentCombox') {
            var value = '';
            var checkedNodes = $('#departmentUserComboxTree').combotree('tree').tree('getChecked');
            if (checkedNodes != null && checkedNodes.length != 0) {
                var depIds = '';
                var depNames = '';
                var userIds = '';
                var userNames = '';
                for (var j = 0; j < checkedNodes.length; j++) {
                    if (checkedNodes[j].userNode) {
                        userIds += checkedNodes[j].id + ',';
                        userNames += checkedNodes[j].text + ',';
                    } else {
                        depIds += checkedNodes[j].id + ',';
                        depNames += checkedNodes[j].text + ',';
                    }
                }
                if (userIds != '') {
                    userIds = userIds.substring(0, userIds.length - 1);
                    userNames = userNames.substring(0, userNames.length - 1);
                }
                if (depIds != '') {
                    depIds = depIds.substring(0, depIds.length - 1);
                    depNames = depNames.substring(0, depNames.length - 1);
                }

                searchDepIds = depIds;
                searchUserIds = userIds;

                if (userIds != '' && depIds == '') {
                    var length = userNames.length;
                    if (length > 15) {
                        userNames = userNames.substring(0, 15) + '...';
                    }
                    value = "组织/人员：" + userNames;
                } else if (userIds != '' && depIds != '') {
                    var length = depNames.length;
                    if (length > 15) {
                        depNames = depNames.substring(0, 15) + '...';
                    }
                    length = userNames.length;
                    if (length > 15) {
                        userNames = userNames.substring(0, 15) + '...';
                    }
                    value = "组织/人员：" + depNames + userNames;
                } else if (userIds == '' && depIds != '') {
                    var length = depNames.length;
                    if (length > 15) {
                        depNames = depNames.substring(0, 15) + '...';
                    }
                    value = "组织/人员：" + depNames;
                }
            } else {
                var depIds = '';
                var depNames = '';
                var departments = $('#departmentCombox').combobox('getValues');
                if (departments != null && departments.length != 0) {
                    for (var j = 0; j < departments.length; j++) {
                        if (departments[j] != -1) {
                            depIds += departments[j] + ',';
                        }
                    }
                    if (depIds != '') {
                        depIds = depIds.substring(0, depIds.length - 1);
                        depNames = $('#departmentCombox').combobox('getText');
                    }
                }
                searchDepIds = depIds;
                searchUserIds = '';

                if (depIds != '') {
                    value = "组织/人员：" + depNames;
                }
            }
            if (value != '') {
                $('#condition_departmentCombox').css('display', 'inline');
                $('#condition_departmentCombox').html(value);
            } else {
                $('#condition_departmentCombox').css('display', 'none');
                $('#condition_departmentCombox').html('');
            }
        } else if (conditions[i].id == 'condition_officeNameCombox') {
            var officeName = $('#officeNameCombox').combobox('getText');
            if (officeName != '') {
                $('#condition_officeNameCombox').css('display', 'inline');
                $('#condition_officeNameCombox').html("写字楼：" + officeName);
            } else {
                $('#condition_officeNameCombox').css('display', 'none');
                $('#condition_officeNameCombox').html('');
            }
        } else if (conditions[i].id == 'condition_houseid') {
            var value = $('#houseid').val();
            if (value != null && value != '') {
                $('#condition_houseid').css('display', 'inline');
                $('#condition_houseid').html("房源编号：" + value);
            } else {
                $('#condition_houseid').css('display', 'none');
                $('#condition_houseid').html('');
            }
        } else if (conditions[i].id == 'condition_buildingno') {
            var value = $('#buildingno').val();
            if (value != null && value != '') {
                $('#condition_buildingno').css('display', 'inline');
                $('#condition_buildingno').html("楼号：" + value);
            } else {
                $('#condition_buildingno').css('display', 'none');
                $('#condition_buildingno').html('');
            }
        } else if (conditions[i].id == 'condition_floorno') {
            var value = $('#floorno').val();
            if (value != null && value != '') {
                $('#condition_floorno').css('display', 'inline');
                $('#condition_floorno').html("楼层：" + value);
            } else {
                $('#condition_floorno').css('display', 'none');
                $('#condition_floorno').html('');
            }
        } else if (conditions[i].id == 'condition_houseno') {
            var value = $('#houseno').val();
            if (value != null && value != '') {
                $('#condition_houseno').css('display', 'inline');
                $('#condition_houseno').html("房间号：" + value)
            } else {
                $('#condition_houseno').css('display', 'none');
                $('#condition_houseno').html('');
            }
        } else if (conditions[i].id == 'condition_investorContactPhone') {
            var value = $('#investorContactPhone').val();
            if (value != null && value != '') {
                $('#condition_investorContactPhone').css('display', 'inline');
                $('#condition_investorContactPhone').html("业主联系方式：" + value)
            } else {
                $('#condition_investorContactPhone').css('display', 'none');
                $('#condition_investorContactPhone').html('');
            }
        } else if (conditions[i].id == 'condition_personName') {
            var value = $('#personName').combobox('getText');
            if (value != null && value != '') {
                $('#condition_personName').css('display', 'inline');
                $('#condition_personName').html("人员：" + value)
            } else {
                $('#condition_personName').css('display', 'none');
                $('#condition_personName').html('');
            }
        } else if (conditions[i].id == 'condition_searchChangeAccendantPerson') {
            if ($('#searchChangeAccendantPerson') != null && $('#searchChangeAccendantPerson')[0] != null) {
                if ($('#searchChangeAccendantPerson')[0].checked) {
                    $('#condition_searchChangeAccendantPerson').css('display', 'inline');
                    $('#condition_searchChangeAccendantPerson').html("可调整归属人");
                } else {
                    $('#condition_searchChangeAccendantPerson').css('display', 'none');
                    $('#condition_searchChangeAccendantPerson').html('');
                }
            }
        } else {
            var value = $("#" + conditions[i].id.substring(10, conditions[i].id.length)).val();
            if (value != null && value != '') {
                $('#' + conditions[i].id).css('display', 'inline');
                var id = conditions[i].id.substring(10, conditions[i].id.length);
                $('#' + conditions[i].id).html($("#" + id)[0].options[$("#" + id)[0].selectedIndex].text);
            } else {
                $('#' + conditions[i].id).css('display', 'none');
                $('#' + conditions[i].id).html('');
            }
        }
    }
}

/**
 * 设置当前已选择的搜索条件框是否显示
 */
var setSearchConditionsStatus = function () {
    var searchConditonsDiv_show = false;
    var conditions = $('[name=searchCondition]');
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i].style.display == 'inline') {
            searchConditonsDiv_show = true;
            break;
        }
    }
    if (searchConditonsDiv_show) {
        $('#searchConditonsDiv').css('display', 'block');
    } else {
        $('#searchConditonsDiv').css('display', 'none');
    }
}

/**
 * 已选择搜索条件-取消事件
 * @param obj
 */
var deSelectSearchConditons = function (obj) {
    if (obj.id == 'condition_money') {
        $('#begin_money').val(null);
        $('#end_money').val(null);
    } else if (obj.id == 'condition_area') {
        $('#begin_area').val(null);
        $('#end_area').val(null);
    } else if (obj.id == 'condition_creatTime') {
        $('#created_at_begin').val('');
        $('#created_at_end').val('');
    } else if (obj.id == 'condition_datatype') {
        $("#datatype").val('');
        $("#jiaofuTime").removeClass("form-group inline-ms");
        $("#jiaofuTime").addClass("form-group inline-ms hide");
        $("#begin_time").val('');
        $("#end_time").val('');
    } else if (obj.id == 'condition_departmentCombox') {
        $("#departmentCombox").combobox("setValues", []);
        $("#departmentUserComboxTree").combotree("setValues", '');
        $('#departmentUserComboxTree').combotree("loadData", "");
    } else if (obj.id == 'condition_officeNameCombox') {
        $('#officeNameCombox').combobox('setValue', '');
    } else if (obj.id == 'condition_personName') {
        $('#personName').combobox('setValue', '');
        personName_combobox_id = null;
        personName_combobox_name = null;
        personId = null;
    } else if (obj.id == 'condition_city_combox_customer') {
        $('#city_combox_customer').val('');
        $('#district_combox_customer').val('');
        $("#district_combox_customer").html("<option class='hide' disabled selected value=''>区域</option><option value=''>全部</option>");
        $('#businesscircle_combox_customer').val('');
        $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    } else if (obj.id == 'condition_district_combox_customer') {
        $('#district_combox_customer').val('');
        $('#businesscircle_combox_customer').val('');
        $("#businesscircle_combox_customer").html("<option class='hide' disabled selected value=''>商圈</option><option value=''>全部</option>");
    } else if (obj.id == 'condition_searchChangeAccendantPerson') {
        $('#searchChangeAccendantPerson').attr("checked", false);
        $('#btn_changeAccendantPerson').css('display', 'none');
    } else {
        $("#" + obj.id.substring(10, obj.id.length)).val('');
    }

    //重新搜索房源列表
    reloadHouseGrid();
}

var personNameLoadSuccess = function () {
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
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

var officeNameComboxSelect = function (record) {
    officeName_combobox_id = record.id;
    officeName_combobox_name = record.name;
}

var officeNameComboxLoadSuccess = function () {
    var data = $('#officeNameCombox').combobox('getData');
    var value = $('#officeNameCombox').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == value.trim()) {
                $('#officeNameCombox').combobox('setValue', data[i].id);
                $('#officeNameCombox').combobox('setText', value);
                officeName_combobox_id = data[i].id;
                officeName_combobox_name = data[i].name;
                return;
            }
        }
    }
}

/**
 * 选择房源
 */
var chooseHouse = function (record) {
    if (choosedHouseIds.indexOf((',' + record.id + ',')) != -1) {
        return '<span style="color:red;" id="btn_house_' + record.id + '">&nbsp;&nbsp;已加入看房单</span>';
    } else {
        /*var recordStr = "{ ";
        for (var item in record) {
            recordStr += "'" + item + "':'" + record[item] + "',";
        }
        recordStr = recordStr.substring(0, recordStr.length - 1);
        recordStr += "}";*/
        return '<button id="btn_house_' + record.id + '" type="button" value="加入看房单" class="btn btn-default" style="margin:0 auto" onclick="reloadSearchAndChoosedHouseGrid(' + record.id + ', 1' + ')">加入看房单</button>';
    }
}

/**
 * 取消选择房源
 */
var deleteChooseHouse = function (record) {
    //var recordStr = "{ ";
    //for (var item in record) {
    //    recordStr += "'" + item + "':'" + record[item] + "',";
    //}
    //recordStr = recordStr.substring(0, recordStr.length - 1);
    //recordStr += "}";
    return '<button type="button" value="删除" class="btn btn-default" style="margin:0 auto" onclick="reloadSearchAndChoosedHouseGrid(' + record.id + ', 0' + ')">删除</button>';
}

/**
 * 重新加载查询房源列表和已选择房源列表
 */
var reloadSearchAndChoosedHouseGrid = function (id, addOrDelete) {
    var record = null;
    if (addOrDelete == 1) {
        record = $('#house_grid')['house_grid'].getCurSelectRecord(id);
        if (record == null) {
            return false;
        }
        var btn_house_id = "btn_house_" + record.id;

        if (choosedHouseIds.length > 2 && choosedHouseIds.substring(1, choosedHouseIds.length - 1).split(',').length >= 5) {
            alert('最多只能选择五套房源');
            return false;
        }

        if (choosedHouseIds == '') {
            choosedHouseIds = ',' + record.id + ',';
        } else {
            choosedHouseIds += record.id + ',';
        }

        if (choosedOfficeIds == '') {
            choosedOfficeIds = ',' + record.officeId + ',';
        } else {
            choosedOfficeIds += record.officeId + ',';
        }

        $('#' + btn_house_id)[0].outerHTML = '<span style="color:red;" id="btn_house_' + record.id + '">&nbsp;&nbsp;已加入看房单</span>';

        var data = $("#house_grid_choosed")['house_grid_choosed'].options.data;
        if (data == null) {
            data = [];
            data.push(record);
        } else {
            data.push(record);
        }

        choosedOfficeIds = '';
        for (var i=0; i<data.length; i++){
            if (choosedOfficeIds == '') {
                choosedOfficeIds = ',' + data[i].officeId + ',';
                choosedOfficeIdHouseIdMapJson[data[i].officeId] = data[i].id;
            } else {
                if (choosedOfficeIds.indexOf(',' + data[i].officeId + ',') == -1){
                    choosedOfficeIds += data[i].officeId + ',';
                    choosedOfficeIdHouseIdMapJson[data[i].officeId] = data[i].id;
                }else{
                    choosedOfficeIdHouseIdMapJson[data[i].officeId] += ',' + data[i].id;
                }
            }
        }

        $("#house_grid_choosed")['house_grid_choosed'].options.data = data;
        $("#house_grid_choosed")['house_grid_choosed'].reload();
    } else {
        record = $('#house_grid_choosed')['house_grid_choosed'].getCurSelectRecord(id);
        if (record == null) {
            return false;
        }
        var btn_house_id = "btn_house_" + record.id;

        var reg = new RegExp(',' + record.id, "g")
        choosedHouseIds = choosedHouseIds.replace(reg, '');
        if (choosedHouseIds == ',') {
            choosedHouseIds = '';
        }
        var newData = [];
        var data = $("#house_grid_choosed")['house_grid_choosed'].options.data;
        for (var i = 0; i < data.length; i++) {
            if (data[i].id != record.id) {
                newData.push(data[i]);
            }
        }

        choosedOfficeIds = '';
        for (var i=0; i<newData.length; i++){
            if (choosedOfficeIds == '') {
                choosedOfficeIds = ',' + newData[i].officeId + ',';
                choosedOfficeIdHouseIdMapJson[newData[i].officeId] = newData[i].id;
            } else {
                if (choosedOfficeIds.indexOf(',' + newData[i].officeId + ',') == -1){
                    choosedOfficeIds += newData[i].officeId + ',';
                    choosedOfficeIdHouseIdMapJson[newData[i].officeId] = newData[i].id;
                }else{
                    choosedOfficeIdHouseIdMapJson[newData[i].officeId] += ',' + newData[i].id;
                }
            }
        }

        $("#house_grid_choosed")['house_grid_choosed'].options.data = newData;
        $("#house_grid_choosed")['house_grid_choosed'].reload();

        if ($('#' + btn_house_id) != null && $('#' + btn_house_id)[0] != null){
            $('#' + btn_house_id)[0].outerHTML = '<button id="btn_house_' + record.id + '" type="button" value="加入看房单" class="btn btn-default" style="margin:0 auto" onclick="reloadSearchAndChoosedHouseGrid(' + record.id + ', 1' + ')">加入看房单</button>';
        }
    }
}

/**
 * 返回客户详情
 */
var returnCustomerDetail = function () {
    if (window.opener && window.opener.refreshCustomerLooList) {
        window.opener.refreshCustomerLooList();
    }

    if (window.opener && window.opener.refreshCustomerList) {
        window.opener.refreshCustomerList();
    }
}

var partnerComboxSelect = function (record) {
    $('#partner_id').val(record.userId);
    $('#partner_name').val(record.fullname);
}

var partnerComboxLoadSuccess = function () {
    var data = $('#partnerCombox').combobox('getData');
    var value = $('#partnerCombox').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName').combobox('setValue', data[i].fullname);
                return;
            }
        }
    }
}


var openAddLookModal = function () {
    if (choosedHouseIds == '') {
        alert("请选择房源");
    } else {
        $('#myModal-addLook').modal('show');
    }
}

function time(o) {
    if (wait == 0) {
        o.attr('disabled', false);
        o.html('一键推送');
        wait = 60;
    }
    else {
        o.attr('disabled', true);
        o.html('已推送(' + wait + ')');
        wait--;
        setTimeout(function () {
                time(o)
            },
            1000)
    }
}

/**
 * 一键推送
 */
var onekeyPush = function () {
    if (choosedHouseIds == '') {
        alert("请选择房源");
    } else {
        time($('#btn_push'));
        var choosedOfficeIdHouseIdMapJsonStr = "";
        for (var item in choosedOfficeIdHouseIdMapJson) {
            choosedOfficeIdHouseIdMapJsonStr += item + ":" + choosedOfficeIdHouseIdMapJson[item] + ";";
        }
        choosedOfficeIdHouseIdMapJsonStr = choosedOfficeIdHouseIdMapJsonStr.substring(0, choosedOfficeIdHouseIdMapJsonStr.length - 1);

        var houseinfoCount = 0;
        var officeBuildingCount = 0;
        if (choosedHouseIds != ''){
            houseinfoCount = choosedHouseIds.substring(1, choosedHouseIds.length-1).split(',').length;
            officeBuildingCount = choosedOfficeIds.substring(1, choosedOfficeIds.length-1).split(',').length;
        }

        $.post(base + '/customerlookController/onekeyPush',
            {
                customerId: customerId,
                phoneNum: phoneNum,
                choosedHouseIds: choosedHouseIds.substring(1, choosedHouseIds.length - 1),
                houseinfoCount: houseinfoCount,
                officeBuildingCount: officeBuildingCount,
                choosedOfficeIdHouseIdMapJsonStr: choosedOfficeIdHouseIdMapJsonStr
            },
            function (result) {
                if (result.success) {

                    $('#message').html(result.message);
                    $('#messagemodal').modal('show');

                } else {
                    alert(result.message);
                }
            })
    }
}

/**
 * 添加带看
 * @returns
 */
var addCustomerLook = function () {
    if ($('#order_house_date').val() == '') {
        alert('带看日期不能为空"');
        return false;
    }

    /*if ($('#partner_id').val() != $('#partnerCombox').combobox('getValue')){
     alert("合作带看人不能为空");
     return false;
     }*/

    if ($('#followlook_record').val() == '') {
        alert('带看记录（意向）不能为空');
        return false;
    }
    if ($('#followlook_record').val().length > 1000) {
        alert('带看记录（意向）长度不能超过1000');
        return false;
    }

    var date = $('#order_house_date').val();
    if (date != null && date != '') {
        //var begin = new Date(date.replace(/-/g, ','));
        var begin= new Date(Date.parse(date.replace(/-/g,   "/")));
        date = parseInt(begin.getTime() / 1000);
    }

    if ($('#partnerCombox').combobox('getValue') != '' && $('#partnerCombox').combobox('getValue') != $('#partner_id').val()) {
        alert("合作带看人不可选择本人或合作带看人不存在");
        return false;
    }

    var choosedOfficeIdHouseIdMapJsonStr = "";
    for (var item in choosedOfficeIdHouseIdMapJson) {
        choosedOfficeIdHouseIdMapJsonStr += item + ":" + choosedOfficeIdHouseIdMapJson[item] + ";";
    }
    choosedOfficeIdHouseIdMapJsonStr = choosedOfficeIdHouseIdMapJsonStr.substring(0, choosedOfficeIdHouseIdMapJsonStr.length - 1);

    var houseinfoCount = 0;
    var officeBuildingCount = 0;
    if (choosedHouseIds != ''){
        houseinfoCount = choosedHouseIds.substring(1, choosedHouseIds.length-1).split(',').length;
        officeBuildingCount = choosedOfficeIds.substring(1, choosedOfficeIds.length-1).split(',').length;
    }

    $("#accessbtn").css('display', 'none');
    $("#access_cancle_btn").css('display', 'none');

    $.post(base + '/customerlookController/addCustomerLook',
        {
            customerId: customerId,
            subscribeDate: date,
            remark: $('#followlook_record').val(),
            choosedHouseIds: choosedHouseIds.substring(1, choosedHouseIds.length - 1),
            lookIdSlave: $('#partner_id').val() != null && $('#partner_id').val() != '' ? $('#partner_id').val() : 0,
            lookNameSlave: $('#partner_name').val() != null && $('#partner_name').val() != '' ? $('#partner_name').val() : '',
            houseinfoCount: houseinfoCount,
            officeBuildingCount: officeBuildingCount,
            choosedOfficeIdHouseIdMapJsonStr: choosedOfficeIdHouseIdMapJsonStr
        },
        function (result) {
            if (result.success) {
                $('#myModal-addLook').modal('hide');
                $("#accessbtn").css('display', 'inline');
                $("#access_cancle_btn").css('display', 'inline');

                $('#order_house_date').val('')
                $('#followlook_record').val('')
                $('#partnerCombox').combobox('setValue', '')

                alert(result.message);

                //刷新客户详情页列表
                returnCustomerDetail()
            } else {
                alert(result.message);
            }
        })
}

//返回客户详情页
var returnDetail = function () {
    if (window.opener && window.opener.refreshCustomerList) {
        window.location.href = base+'/customer/customerdetail?customerId=' + customerId;
    }

    //从详情页跳过
    if (window.opener && window.opener.refreshCustomerLooList) {
        //window.location.href = base+'/customer/customerdetail?customerId=' + customerId;
        window.close();
    }
}
