var order = 'createAt';

var searchUserIds = $('#userId').val();

$(function () {
    var operateCheck = $('[name=operate]');
    $(operateCheck[0]).attr("checked", true);

    $('#status').val('');
    $('#applyDate_begin').val('');
    $('#applyDate_end').val('');
    $('#subscribeDate_begin').val('');
    $('#subscribeDate_end').val('');

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

    $('[name=subscribeDate_begin]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('[name=subscribeDate_end]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    /**
     * 滴滴预约审核列表
     */
    $.fn['orderDidi_grid'] = new dataGrid();
    var gridOptions = getDataGridOptions("orderDidi_grid");
    $("#orderDidi_grid")['orderDidi_grid'].init({
        id: gridOptions.id,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: getGridParams(),
        order: gridOptions.params.order,
        thClickCallback: function (orderField) {
            if (orderField == '') {
                return;
            }

            order = orderField;

            $("#orderDidi_grid")['orderDidi_grid'].reload({
                params: getGridParams()
            });
        }
    });

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
            loop: true,
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px',
        onLoadSuccess: function (node, data) {
            $("#departmentUserComboxTree").combotree("setValues", $('#userId').val());
        }
    });
}

var departmentComboxOnLoad = function () {
    $('#departmentCombox').combobox('setValue', -1);
    //departmentComboxChange();
}

/**
 * 获取查询参数
 */
var getGridParams = function () {
    var applyDate_begin = $('#applyDate_begin').val();
    if (applyDate_begin != null && applyDate_begin != '') {
        var begin = new Date(applyDate_begin.replace(/-/g, ','));
        applyDate_begin = parseInt(begin.getTime() / 1000);
    }

    var applyDate_end = $('#applyDate_end').val();
    if (applyDate_end != null && applyDate_end != '') {
        var end = new Date(applyDate_end.replace(/-/g, ','));
        applyDate_end = parseInt((end.getTime() + 24 * 3600 * 1000) / 1000);
    }

    var subscribeDate_begin = $('#subscribeDate_begin').val();
    if (subscribeDate_begin != null && subscribeDate_begin != '') {
        var begin = new Date(subscribeDate_begin.replace(/-/g, ','));
        subscribeDate_begin = parseInt(begin.getTime() / 1000);
    }

    var subscribeDate_end = $('#subscribeDate_end').val();
    if (subscribeDate_end != null && subscribeDate_end != '') {
        var end = new Date(subscribeDate_end.replace(/-/g, ','));
        subscribeDate_end = parseInt((end.getTime() + 24 * 3600 * 1000) / 1000);
    }

    if ($('#departmentUserComboxTree').combotree('tree') != null) {
        var checkedNodes = $('#departmentUserComboxTree').combotree('tree').tree('getChecked');
        if (checkedNodes != null && checkedNodes.length != 0) {
            var userIds = '';
            for (var j = 0; j < checkedNodes.length; j++) {
                if (checkedNodes[j].userNode) {
                    userIds += checkedNodes[j].id + ',';
                }
            }
            if (userIds != '') {
                userIds = userIds.substring(0, userIds.length - 1);
            }
            searchUserIds = userIds;
        } else {
            searchUserIds = "";
        }
    } else {
        searchUserIds = "";
    }

    var hasLook = $('#hasLook').val();
    var bool_hasLook = null;
    if (hasLook == 2) {
        bool_hasLook = true;
    } else if (hasLook == 1) {
        bool_hasLook = false;
    }

    var params = {
        'createAtBegin': applyDate_begin,
        'createAtEnd': applyDate_end,
        'orderAtBegin': subscribeDate_begin,
        'orderAtEnd': subscribeDate_end,
        'status': $('#status').val(),
        'searchUserIds': searchUserIds,
        'hasLook': bool_hasLook,
        "sort": $('#orderDidi_grid')['orderDidi_grid'].options.sort,
        "order": order
    }

    return params;
}

/**
 * 滴滴预约审批状态
 */
var renderOfOrderDidiStatus = function (record, value) {
    var value = "";
    if (record.status == 10) {
        value = "<font color='orange'>待审核</font>";
    } else if (record.status == 20) {
        value = "<font color='green'>通过</font>";
    } else if (record.status == 30) {
        value = "<font color='red'>未通过</font>";
    }
    return value;
}

//刷新列表
var search = function () {
    $("#orderDidi_grid")['orderDidi_grid'].reload({
        params: getGridParams()
    });
}

var guwenName = function (record, value) {
    return value + ' <font color="#28a4c9">(' + record.guwenDeptName + ')</font>';
}

var renderOfFinishLookNum = function (record, value) {
    //10待审核
    if (record.status == 10 || record.status == 30) {
        return '&nbsp;&nbsp;&nbsp;-';
    } else {
        if (value == 0) {
            return '未带看';
        } else {
            return '已带看';
        }
    }
    return '-';
}

/**
 * 操作
 */
var renderOfOrderDidiOperate = function (record) {
    return '<button id="btn_house_' + record.id + '" type="button" value="查看详情" class="btn btn-blue" style="margin:0 auto" ' +
        'onclick="openJudgeModal(' + record.id + ')">查看详情</button>';
}


/**
 * 操作
 */
var renderOfOrderDidiOperate = function (record) {
    if (record.status == 20) {
        return '<button id="btn_house_' + record.id + '" type="button" value="查看" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openDidiInfo(' + record.id + ')">查看</button>';
    } else if (record.status == 10) {
        return '';
    } else if (record.status == 30) {
        return '<button id="btn_house_' + record.id + '" type="button" value="查看" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openDidiReason(' + record.id + ')">查看</button>';
    }
    return '';
}

//滴滴预约详情
var openDidiInfo = function (orderId){
    var curRecord = $('#orderDidi_grid')['orderDidi_grid'].getCurSelectRecord(orderId);
    if (curRecord != null){
        $('#orderId').val(curRecord.id);
        $('#customerName_span').html(curRecord.customerName);
        $('#phoneNum_span').html(curRecord.phoneNum);
        $('#orderAt_span').html(dateMinuteToDate(curRecord.orderAt));
        $('#startPoint_span').html(curRecord.startPoint);
        $('#endPoint_span').html(curRecord.endPoint);

        $('#info_div').css('display', 'block');
        $('#reason_div').css('display', 'none');

        $('#myModal-didi').modal('show');
    }
}

//滴滴预约审核拒绝原因
var openDidiReason = function (orderId){
    var curRecord = $('#orderDidi_grid')['orderDidi_grid'].getCurSelectRecord(orderId);
    if (curRecord != null){
        $('#orderId').val(curRecord.id);
        $('#customerName_span').html(curRecord.customerName);
        $('#phoneNum_span').html(curRecord.phoneNum);
        $('#orderAt_span').html(dateMinuteToDate(curRecord.orderAt));
        $('#startPoint_span').html(curRecord.startPoint);
        $('#endPoint_span').html(curRecord.endPoint);

        $('#reason_span').html(curRecord.unvalidreason);

        $('#info_div').css('display', 'block');
        $('#reason_div').css('display', 'block');

        $('#myModal-didi').modal('show');
    }
}