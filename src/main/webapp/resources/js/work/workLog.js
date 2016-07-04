var order = 'createAt';

var allSubDeptIds = '';
var searchType = 0;
var searchTimeType = 1;
var workDateOfCycle = 0;

var first = true;

var parentId = '';

var boolSearchDepts = null;

var workDateBegin = null;
var workDateEnd = null;
var wordDayCount = null;

var time = '今日';
var type = '统计周期合计';
var searchForm = '默认';
var showFields = '';
var searchFields = '';

var function_name_json = {
    name: '部门/人员',
    personsCount: '人数',
    resultNewHouse: '新增房源',
    resultCloseHouse: '流出房源',
    resultInvestigate: '新增实勘',
    resultUbanHouse: '优办房源',
    resultNewHouseImgs: '新增房源图片',
    resultNewCustomer: '有效上户',
    resultUbancustomer: '优办客源',
    resultVirtualCustomer: '虚拟号客户',
    resultCustomerFollow: '跟进客户（人数）',
    resultCustomerFollowTotal: '跟进客户（次数）',
    resultHouseFollow: '跟进房源（套数）',
    resultHouseFollowTotal: '跟进房源（次数）',
    resultCustomerLook: '带看客户（次数）',
    resultCustomerLookHouse: '带看客户（房源数）',
    resultTransactionDeciaration: '成交单数',
    resultRollbackdeciaration: '退单数',
    resultTransactionPrice: '成单佣金',
    resultRollbackPrice: '退单佣金',
    resultHouseLookNum: '房源被带看（次数）',
    resultNewCustomerAll: '新增上户',
    resultInvalidCustomer: '无效客户',
    resultHouselookOfCycle: '房源被带看（套数）',
    resultCustomerLookOfCycle: '带看客户（人数）',
    resultLookpercentOfCycle: '带看转化率',
    resultDealpercentOfCycle: '成交转化率'
}

var function_default_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 1,
    resultCloseHouse: 0,
    resultInvestigate: 1,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 1,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 1,
    resultCustomerFollowTotal: 1,
    resultHouseFollow: 1,
    resultHouseFollowTotal: 1,
    resultCustomerLook: 1,
    resultCustomerLookHouse: 1,
    resultTransactionDeciaration: 1,
    resultRollbackdeciaration: 1,
    resultTransactionPrice: 1,
    resultRollbackPrice: 1,
    resultHouseLookNum: 1,
    resultNewCustomerAll: 1,
    resultInvalidCustomer: 1,
    resultHouselookOfCycle: 1,
    resultCustomerLookOfCycle: 1,
    resultLookpercentOfCycle: 1,
    resultDealpercentOfCycle: 1
}

var curFunctinoJson = function_default_json;

//盯客户
var function_customer_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 0,
    resultCloseHouse: 0,
    resultInvestigate: 0,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 1,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 0,
    resultCustomerFollowTotal: 0,
    resultHouseFollow: 0,
    resultHouseFollowTotal: 0,
    resultCustomerLook: 1,
    resultCustomerLookHouse: 1,
    resultTransactionDeciaration: 0,
    resultRollbackdeciaration: 0,
    resultTransactionPrice: 0,
    resultRollbackPrice: 0,
    resultHouseLookNum: 0,
    resultNewCustomerAll: 1,
    resultInvalidCustomer: 1,
    resultHouselookOfCycle: 0,
    resultCustomerLookOfCycle: 1,
    resultLookpercentOfCycle: 1,
    resultDealpercentOfCycle: 0
}

//盯成交
var function_deal_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 0,
    resultCloseHouse: 0,
    resultInvestigate: 0,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 0,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 0,
    resultCustomerFollowTotal: 0,
    resultHouseFollow: 0,
    resultHouseFollowTotal: 0,
    resultCustomerLook: 1,
    resultCustomerLookHouse: 1,
    resultTransactionDeciaration: 1,
    resultRollbackdeciaration: 1,
    resultTransactionPrice: 1,
    resultRollbackPrice: 1,
    resultHouseLookNum: 0,
    resultNewCustomerAll: 0,
    resultInvalidCustomer: 0,
    resultHouselookOfCycle: 0,
    resultCustomerLookOfCycle: 0,
    resultLookpercentOfCycle: 0,
    resultDealpercentOfCycle: 0
}

//盯转化
var function_transfer_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 0,
    resultCloseHouse: 0,
    resultInvestigate: 0,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 1,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 0,
    resultCustomerFollowTotal: 0,
    resultHouseFollow: 0,
    resultHouseFollowTotal: 0,
    resultCustomerLook: 0,
    resultCustomerLookHouse: 0,
    resultTransactionDeciaration: 1,
    resultRollbackdeciaration: 0,
    resultTransactionPrice: 1,
    resultRollbackPrice: 0,
    resultHouseLookNum: 0,
    resultNewCustomerAll: 0,
    resultInvalidCustomer: 0,
    resultHouselookOfCycle: 0,
    resultCustomerLookOfCycle: 1,
    resultLookpercentOfCycle: 1,
    resultDealpercentOfCycle: 1
}

//盯房源
var function_house_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 1,
    resultCloseHouse: 1,
    resultInvestigate: 0,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 0,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 0,
    resultCustomerFollowTotal: 0,
    resultHouseFollow: 1,
    resultHouseFollowTotal: 1,
    resultCustomerLook: 0,
    resultCustomerLookHouse: 0,
    resultTransactionDeciaration: 0,
    resultRollbackdeciaration: 0,
    resultTransactionPrice: 0,
    resultRollbackPrice: 0,
    resultHouseLookNum: 1,
    resultNewCustomerAll: 0,
    resultInvalidCustomer: 0,
    resultHouselookOfCycle: 1,
    resultCustomerLookOfCycle: 0,
    resultLookpercentOfCycle: 0,
    resultDealpercentOfCycle: 0
}

//房客资源视图
var function_houseResouce_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 1,
    resultCloseHouse: 1,
    resultInvestigate: 0,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 1,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 0,
    resultCustomerFollowTotal: 0,
    resultHouseFollow: 0,
    resultHouseFollowTotal: 0,
    resultCustomerLook: 0,
    resultCustomerLookHouse: 0,
    resultTransactionDeciaration: 0,
    resultRollbackdeciaration: 0,
    resultTransactionPrice: 0,
    resultRollbackPrice: 0,
    resultHouseLookNum: 0,
    resultNewCustomerAll: 1,
    resultInvalidCustomer: 0,
    resultHouselookOfCycle: 0,
    resultCustomerLookOfCycle: 0,
    resultLookpercentOfCycle: 0,
    resultDealpercentOfCycle: 0
}


var function_selfDefine_json = {
    name: 1,
    personsCount: 1,
    resultNewHouse: 1,
    resultCloseHouse: 0,
    resultInvestigate: 1,
    resultUbanHouse: 0,
    resultNewHouseImgs: 0,
    resultNewCustomer: 1,
    resultUbancustomer: 0,
    resultVirtualCustomer: 0,
    resultCustomerFollow: 1,
    resultCustomerFollowTotal: 1,
    resultHouseFollow: 1,
    resultHouseFollowTotal: 1,
    resultCustomerLook: 1,
    resultCustomerLookHouse: 1,
    resultTransactionDeciaration: 1,
    resultRollbackdeciaration: 1,
    resultTransactionPrice: 1,
    resultRollbackPrice: 1,
    resultHouseLookNum: 1,
    resultNewCustomerAll: 1,
    resultInvalidCustomer: 1,
    resultHouselookOfCycle: 1,
    resultCustomerLookOfCycle: 1,
    resultLookpercentOfCycle: 1,
    resultDealpercentOfCycle: 1
}

var gridOptions = {
    id: 'workLog_grid',
    /*params: {
     'sort': 'desc',
     'order': 'createAt'
     },*/
    trTdentity: 'showId',
    url: base + '/workLogController/selectWorkLogList',
    tHeadCols: [
        {field: 'name', title: '部门/人员', width: 150, align: 'center', sortable: false, render: renderOfName},
        {field: 'personsCount', title: '人数', width: 150, align: 'center', sortable: false},
        {
            field: 'resultNewHouse',
            title: '新增房源 <a class="demo-tip-yellowsimple" title="某一时间段内，创建、激活的大业主房源+小业主房源" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        /*{
         field: 'resultCloseHouse',
         title: '流出房源 <a class="demo-tip-yellowsimple" title="统计周期人均" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
         width: 150,
         align: 'center',
         sortable: false
         },*/
        {
            field: 'resultInvestigate',
            title: '新增实勘 <a class="demo-tip-yellowsimple" title="某一时间段内，新增的实勘房源数量（不区分实勘房源状态）" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultHouseFollow',
            title: '跟进房源（套数） <a class="demo-tip-yellowsimple" title="某一时间段内，跟进房源的数量" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultHouseFollowTotal',
            title: '跟进房源（次数） <a class="demo-tip-yellowsimple" title="某一时间段内，跟进房源的次数" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },

        {
            field: 'resultHouselookOfCycle',
            title: '房源被带看（套数） <a class="demo-tip-yellowsimple" title="某一时间段内，自己拥有的房源被带看的套数" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultHouseLookNum',
            title: '房源被带看（次数） <a class="demo-tip-yellowsimple" title="某一时间段内，自己拥有的房源被带看的次数" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        /* {
         field: 'resultUbanHouse',
         title: '优办房源 <a class="demo-tip-yellowsimple" title="统计周期人均" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
         width: 150,
         align: 'center',
         sortable: false
         },*/
        /* {
         field: 'resultNewHouseImgs',
         title: '新增房源图片 <a class="demo-tip-yellowsimple" title="统计周期人均" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
         width: 150,
         align: 'center',
         sortable: false,
         hidden: true
         },*/
        {
            field: 'resultNewCustomerAll',
            title: '新增上户 <a class="demo-tip-yellowsimple" title="某一时间段内，400客户（被客服分配）+虚拟号+手动创建的客户总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultNewCustomer',
            title: '有效上户 <a class="demo-tip-yellowsimple" title="某一时间段内，400客户（被跟进的客户）+虚拟号（顾问标记为有效）+手动创建的客户总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultInvalidCustomer',
            title: '无效客户 <a class="demo-tip-yellowsimple" title="某一时间段内，虚拟号（顾问直接置为无效+标记有效后置为无效）+手动创建（标记为无效）+400客户（被顾问标记无效）的客户总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultCustomerLookOfCycle',
            title: '带看客户（人数） <a class="demo-tip-yellowsimple" title="某一时间段内，至少一次带看的客户数量" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        /* {
         field: 'resultUbancustomer',
         title: '优办客源 <a class="demo-tip-yellowsimple" title="统计周期人均" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
         width: 150,
         align: 'center',
         sortable: false
         },
         {
         field: 'resultVirtualCustomer',
         title: '虚拟号客户 <a class="demo-tip-yellowsimple" title="统计周期人均" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
         width: 150,
         align: 'center',
         sortable: false
         },*/

        {
            field: 'resultCustomerLook',
            title: '带看客户（次数） <a class="demo-tip-yellowsimple" title="某一时间段内，客户被带看的次数，一天多次对同一客户进行带看只计算一次，按天去重。" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultCustomerLookHouse',
            title: '带看客户（房源数） <a class="demo-tip-yellowsimple" title="某一时间段内，客户看过的房源数量的总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },

        {
            field: 'resultCustomerFollow',
            title: '跟进客户（人数） <a class="demo-tip-yellowsimple" title="某一时间段内，跟进客户的数量" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultCustomerFollowTotal',
            title: '跟进客户（次数） <a class="demo-tip-yellowsimple" title="某一时间段内，跟进客户的次数" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultLookpercentOfCycle',
            title: '<span style="color:red;">带看转化率</span> <a class="demo-tip-yellowsimple" title="某一时间段内，带看客户（人数）/有效上户（注：部门的带看转化率因带看客户未去重，可能会偏高）" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
            //convert: convertOfPercent
        },

        {
            field: 'resultTransactionDeciaration',
            title: '成交单数 <a class="demo-tip-yellowsimple" title="某一时间段内，店面运营审核通过的单数" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultTransactionPrice',
            title: '成单佣金 <a class="demo-tip-yellowsimple" title="某一时间段内，店面运营审核通过的优办净租金总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultRollbackdeciaration',
            title: '退单数 <a class="demo-tip-yellowsimple" title="某一时间段内，被退单的单数总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultRollbackPrice',
            title: '退单佣金 <a class="demo-tip-yellowsimple" title="某一时间段内，被退单的优办净租金总和" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
        },
        {
            field: 'resultDealpercentOfCycle',
            title: '<span style="color:red;">成交转化率</span> <a class="demo-tip-yellowsimple" title="某一时间段内，成交客户/有效上户" style="margin-left: 4px;"><img alt="tips" src="' + jspath + '/resources/images/tips-icon-blue.png"></a>',
            width: 150,
            align: 'center',
            sortable: false
            //convert: convertOfPercent
        }
    ]
};

$(function () {
    /*  var operateCheck = $('[name=operate]');
     $(operateCheck[0]).attr("checked", true);*/

    /*$('#applyDate_begin').val('');
     $('#applyDate_end').val('');

     var today = new Date();
     today = new Date(today.getTime() - 24 * 3600 * 1000);

     $('[name=applyDate_begin]').datepicker({
     format: 'yyyy-mm-dd',
     todayHighlight: true,
     todayBtn: 'linked'
     });

     $('[name=applyDate_end]').datepicker({
     format: 'yyyy-mm-dd',
     todayHighlight: true,
     todayBtn: 'linked'
     });

     $("#applyDate_begin").attr("placeholder", today.format('yyyy-MM-dd'));
     $("#applyDate_end").attr("placeholder", today.format('yyyy-MM-dd'));*/

    /* var searchTypes = $('[name="searchType"]');
     $(searchTypes[0]).attr("checked", true);*/

    var today = new Date();
    workDateEnd = parseInt(today.getTime() / 1000);

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    workDateBegin = today.getTime() / 1000;
    wordDayCount = 1;

    workDateOfCycle = today.getTime() / 1000;

    $('.demo-tip-yellowsimple').poshytip({
        className: 'tip-yellowsimple',
        showTimeout: 1,
        alignTo: 'target',
        alignX: 'center',
        offsetY: 5,
        allowTipHover: true
    });

  /*  for (item in function_default_json) {
        if (function_default_json[item] == 0) {
            $('[name="' + item + '"]').css('display', 'none');
        } else {
            $('[name="' + item + '"]').css('display', '');
            showFields += function_name_json[item] + ',';
            searchFields += item + ',';
        }
    }
    if (showFields != '') {
        showFields = showFields.substr(0, showFields.length - 1);
        searchFields = searchFields.substr(0, searchFields.length - 1);
    }*/

});

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
            loop: false,
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        editable: false,
        panelHeight: '400px',
        onClick: function (node) {
            if (node.state == 'closed') {
                $('#departmentUserComboxTree').combotree('tree').tree('expand', node.target);
            } else {
                search();
            }
        },
        onExpand: function (node) {
            if (first) {
                var selectNode = $('#departmentUserComboxTree').combotree('tree').tree('getSelected');
                if (selectNode == null) {
                    var rootNode = $('#departmentUserComboxTree').combotree('tree').tree('getRoot');
                    $('#departmentUserComboxTree').combotree('setValue', rootNode.id);

                    $.fn['workLog_grid'] = new dataGrid();
                    $("#workLog_grid")['workLog_grid'].init({
                        id: gridOptions.id,
                        url: gridOptions.url,
                        tHeadCols: gridOptions.tHeadCols,
                        trTdentity: gridOptions.trTdentity,
                        params: getGridParams(),
                        beforeload: function () {
                            if (boolSearchDepts != null) {
                                if (boolSearchDepts) {

                                    function_default_json.personsCount = 1;

                                    $("#workLog_grid")['workLog_grid'].options.tHeadCols[0] = {
                                        field: 'name',
                                        title: '部门/人员',
                                        //title: '部门/人员 <a id="show_return" title="返回上一级" onclick="returnParent()" style="cursor:pointer;' + (show_return ? '' : 'display: none') + '"><img src='+ base +'"/resources/images/return.png" style="width:20px; height: 20px;"></a>',
                                        width: 150,
                                        align: 'center',
                                        sortable: false,
                                        render: renderOfName
                                    };
                                } else {
                                    function_default_json.personsCount = 0;

                                    $("#workLog_grid")['workLog_grid'].options.tHeadCols[0] = {
                                        field: 'name',
                                        title: '部门/人员',
                                        //title: '部门/人员 <a id="show_return" title="返回上一级" onclick="returnParent()" style="cursor:pointer;' + (show_return ? '' : 'display: none') + '"><img src='+ base +'"/resources/images/return.png" style="width:20px; height: 20px;"></a>',
                                        width: 150,
                                        align: 'center',
                                        sortable: false
                                    };
                                }
                            }
                        },
                        onload: function () {
                            $('.demo-tip-yellowsimple').poshytip({
                                className: 'tip-yellowsimple',
                                showTimeout: 1,
                                alignTo: 'target',
                                alignX: 'center',
                                offsetY: 5,
                                allowTipHover: true
                            });

                            setFieldDisplay(false);
                        }
                    });
                }
                first = false;
            } else {
                $('#departmentUserComboxTree').combotree('tree').tree('select', node.target);
                $('#departmentUserComboxTree').combotree('setValue', node.id);
                search();
            }
        },
        onLoadSuccess: function (node, data) {
            var rootNode = $('#departmentUserComboxTree').combotree('tree').tree('getRoot');
            //$('#departmentUserComboxTree').combotree('setValue', rootNode.id);
            $('#departmentUserComboxTree').combotree('tree').tree('expand', rootNode.target);
        }
    });
}

var departmentComboxOnLoad = function () {
    $('#departmentCombox').combobox('setValue', -1);
}

/**
 * 获取查询参数
 */
var getGridParams = function () {
    /*var applyDate_begin = $('#applyDate_begin').val();
     if (applyDate_begin == '') {
     applyDate_begin = $('#applyDate_begin')[0].placeholder;
     }
     var applyDate_end = $('#applyDate_end').val();
     if (applyDate_end == '') {
     applyDate_end = $('#applyDate_end')[0].placeholder;
     }
     if (applyDate_begin > applyDate_end) {
     alert("交付日期顺序错误");
     return false;
     }

     if (applyDate_begin != null && applyDate_begin != '') {
     var begin = new Date(applyDate_begin.replace(/-/g, ','));
     applyDate_begin = parseInt(begin.getTime() / 1000);
     }

     if (applyDate_end != null && applyDate_end != '') {
     var end = new Date(applyDate_end.replace(/-/g, ','));
     applyDate_end = parseInt(end.getTime() / 1000);
     }*/

    /*var workDateBegin = '' + applyDate_begin;
     var workDateEnd = '' + applyDate_end;*/

    var tempSubDeptIds = '';
    boolSearchDepts = null;

    var userId = null;
    var userName = '';
    var department = null;
    var departmentName = '';
    //var searchDepIds = '';
    var groupDeptIds = '';
    allSubDeptIds = '';

    if ($('#departmentUserComboxTree').combotree('tree') != null) {
        var selectNode = $('#departmentUserComboxTree').combotree('tree').tree('getSelected');
        if (selectNode == null) {
            selectNode = $('#departmentUserComboxTree').combotree('tree').tree('getRoot');
        }

        if (!selectNode.userNode) {
            var searchDepIds = '';
            var searchDepNames = '';
            //var children = $('#departmentUserComboxTree').combotree('tree').tree('getChildren', selectNode.target);
            var children = selectNode.children;
            if (children != null) {
                for (var i = 0; i < children.length; i++) {
                    if (!children[i].userNode) {
                        searchDepIds += ',' + children[i].id;
                        searchDepNames += ',' + children[i].text;
                    }
                }
            }

            department = selectNode.id;
            departmentName = selectNode.text;

            //有子部门
            if (searchDepIds != '') {
                searchDepIds = searchDepIds.substring(1);
                searchDepNames = searchDepNames.substring(1);
                boolSearchDepts = true;
            } else {
                if (searchType == 1) {
                    searchType = 2;
                } else if (searchType == 3) {
                    searchType = 4;
                }
                boolSearchDepts = false;
            }
        } else {
            if (searchType == 1) {
                searchType = 2;
            } else if (searchType == 3) {
                searchType = 4;
            }
            userId = selectNode.id;
            userName = selectNode.text;
            boolSearchDepts = false;
        }
    }

    var params = {
        'workDateBegin': workDateBegin,
        'workDateEnd': workDateEnd,
        'wordDayCount': wordDayCount,
        'userId': userId,
        'userName': userName,
        'department': department,
        'departmentName': departmentName,
        'searchDepIds': searchDepIds,
        'searchDepNames': searchDepNames,
        'boolSearchDepts': boolSearchDepts,
        'searchType': searchType,
        'workDateOfCycle': workDateOfCycle,
        'searchTimeType': searchTimeType,
        'time': time,
        'type': type,
        'searchForm': searchForm,
        'showFields': showFields,
        'propertyStr': searchFields
    }

    return params;
}

/*var getAllSubDeptIds = function (node) {
 var children = $('#departmentUserComboxTree').combotree('tree').tree('getChildren', node.target);
 if (children != null) {
 for (var i = 0; i < children.length; i++) {
 if (!children[i].userNode) {
 allSubDeptIds += ',' + children[i].id;
 getAllSubDeptIds(children[i]);
 }
 }
 }
 }*/

//刷新列表
var search = function () {
    var params = getGridParams();
    if (params == false) {
        return;
    }

    $("#workLog_grid")['workLog_grid'].reload({
        params: getGridParams()
    });
}

var setSearchType = function (curSearchType) {
    searchType = curSearchType;
    search();
}

function renderOfName(record, value) {
    return "<a onclick='setDepartmentUserComboxTreeValue(\"" + record.showId + "\")' class='unline' style='cursor:pointer;' >" + " <font color='#28a4c9'>" + record.name + "</font></a>"
}

function convertOfPercent(value) {
    return value + '%';
}


var setDepartmentUserComboxTreeValue = function (value) {
    $('#departmentUserComboxTree').combotree('setValue', value);
    var selectNode = $('#departmentUserComboxTree').combotree('tree').tree('getSelected');

    if (selectNode.state == 'closed') {
        if (selectNode.parentId != '') {
            parentId = selectNode.parentId;
            $('#show_return').css("display", "inline")
        } else {
            $('#show_return').css("display", "none")
        }

        $('#departmentUserComboxTree').combotree('tree').tree('expand', selectNode.target);

    } else {
        if (selectNode.parentId != '') {
            parentId = selectNode.parentId;
            $('#show_return').css("display", "inline")
        } else {
            $('#show_return').css("display", "none")
        }

        search();
    }
}

var timeAClick = function (obj, timeType) {
    $('[name="time_a"]').css('color', '');
    $(obj).css('color', '#28a4c9');

    if (timeType == 0) {
        var today = new Date();
        workDateEnd = parseInt(today.getTime() / 1000);

        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        workDateBegin = today.getTime() / 1000;
        wordDayCount = 1;

        time = '今日';

        workDateOfCycle = workDateBegin;
        searchTimeType = 1;
    } else if (timeType == 1) {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        workDateBegin = today.getTime() / 1000 - 24 * 3600;
        workDateEnd = today.getTime() / 1000;
        wordDayCount = 1;

        time = '昨日';

        workDateOfCycle = workDateBegin;

        //昨日和今日类型一样
        searchTimeType = 1;
    } else if (timeType == 2) {
        var today = new Date();
        workDateEnd = parseInt(today.getTime() / 1000);

        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var day = today.getDay();
        if (day == 0) {
            day = 7;
        }
        workDateBegin = today.getTime() / 1000 - (day - 1) * 24 * 3600;
        wordDayCount = day;

        time = '本周';

        workDateOfCycle = workDateBegin;
        searchTimeType = 2;
    } else if (timeType == 3) {
        var today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        var day = today.getDay();
        if (day == 0) {
            day = 7;
        }
        workDateBegin = today.getTime() / 1000 - (day - 1 + 7) * 24 * 3600;
        workDateEnd = today.getTime() / 1000 - (day - 1) * 24 * 3600;
        wordDayCount = 7;

        time = '上周';

        workDateOfCycle = workDateBegin;
        searchTimeType = 3;
    } else if (timeType == 4) {
        var today = new Date();
        today.setDate(1);
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        workDateEnd = today.getTime() / 1000;

        var curMonth = today.getMonth();
        if (curMonth == 0) {
            today.setMonth(11);
            today.setYear(today.getFullYear() - 1);
        } else {
            today.setMonth(today.getMonth() - 1);
        }
        workDateBegin = today.getTime() / 1000;
        wordDayCount = (workDateEnd - workDateBegin) / (24 * 3600);

        time = '上月';

        workDateOfCycle = workDateBegin;
        searchTimeType = 4;
    }

    search();
}

var calculteAClick = function (obj, curSearchType) {
    $('[name="calculte_a"]').css('color', '');
    $(obj).css('color', '#28a4c9');

    if (curSearchType == 0) {
        type = '统计周期合计';
    } else if (curSearchType == 1) {
        type = '统计周期人均';
    } else if (curSearchType == 3) {
        type = '统计周期日均';
    }

    searchType = curSearchType;
    search();
}

var recommendAClick = function (obj, isCaret, curSearchForm) {
    $('[name="recommend_a"]').css('color', '');
    $(obj).css('color', '#28a4c9');

    if (isCaret != null) {
        if ($('#more_caret').hasClass('caret')) {
            $("#more_caret").removeClass("caret");
            $("#more_caret").addClass("caret-open");

            $('#self_define_div').css("display", '')
        } else {
            $("#more_caret").removeClass("caret-open");
            $("#more_caret").addClass("caret");

            $('#self_define_div').css("display", 'none')
        }
        $("#more_caret").css("color", '#28a4c9');
    } else {
        $("#more_caret").css("color", '');

        if ($('#more_caret').hasClass('caret-open')) {
            $("#more_caret").removeClass("caret-open");
            $("#more_caret").addClass("caret");

            $('#self_define_div').css("display", 'none')
        }
    }

    searchForm = curSearchForm;

    if (searchForm == '默认') {
        curFunctinoJson = function_default_json;
    } else if (searchForm == '盯客源') {
        curFunctinoJson = function_customer_json;
    } else if (searchForm == '盯转化') {
        curFunctinoJson = function_transfer_json;
    } else if (searchForm == '盯成交') {
        curFunctinoJson = function_deal_json;
    } else if (searchForm == '盯房源') {
        curFunctinoJson = function_house_json;
    } else if (searchForm == '房客资源视图') {
        curFunctinoJson = function_houseResouce_json;
    } else if (searchForm == '自定义指标') {
        curFunctinoJson = function_selfDefine_json;
    }
    setFieldDisplay(true);
}

var setFieldDisplay = function (search) {
    showFields = '';
    searchFields = '';

    if (!boolSearchDepts) {
        curFunctinoJson.personsCount = 0;
    } else {
        curFunctinoJson.personsCount = 1;
    }

    for (item in curFunctinoJson) {
        if (curFunctinoJson[item] == 0) {
            $('[name="' + item + '"]').css('display', 'none');
        } else {
            $('[name="' + item + '"]').css('display', '');
            showFields += function_name_json[item] + ',';
            searchFields += item + ',';
        }
    }

    if (showFields != '') {
        showFields = showFields.substr(0, showFields.length - 1);
        searchFields = searchFields.substr(0, searchFields.length - 1);

        if (search) {
            var params = getGridParams();
            params.realSearch = false;
            $.get(base + '/workLogController/selectWorkLogList', params,
                function (result) {
                })
        }
    }
}

var functionChange = function (obj, field) {
    if ($(obj).hasClass("checked")) {
        function_selfDefine_json[field] = 0;
    } else {
        function_selfDefine_json[field] = 1;
    }

    setFieldDisplay(true);
}

var returnParent = function () {
    setDepartmentUserComboxTreeValue(parentId);
}

var exportOfWorkLog = function () {
    var params = getGridParams();
    var paramStr = '';
    for (item in params) {
        paramStr += item + '=' + (params[item] != null ? params[item] : '') + "&";
    }
    window.open(base + "/exportReportController/systemExportReport/080202?" + encodeURI(paramStr.substring(0, paramStr.length - 1)), "_self");
}