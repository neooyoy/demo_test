var grid_id = "port_apply_grid";
var queryUrl = base + '/businessportController/selectListPage';
var order = 'createAt';

var columns = [
    { field: 'accendantName', title: '员工姓名', width: 150, align: 'center', sortable: false },
    { field: 'depart', title: '组别', width: 150, align: 'center', sortable: false },
    { field: 'phone', title: '手机号', width: 150, align: 'center', sortable: false },
    { field: 'target', title: '端口用途', width: 150, align: 'center', sortable: false },
    { field: '', title: '申请类型', width: 150, align: 'center', sortable: false,render: renderOfPortTypeOperate  },
    { field: 'targetUsername', title: '申请端口账号', width: 150, align: 'center', sortable: false },
    { field: 'openTargetUsername', title: '审核开通账号', width: 150, align: 'center', sortable: false },
    { field: 'priceStr', title: '申请充值金额', width: 150, align: 'center', sortable: false },
    { field: 'actualAmountStr', title: '实际充值金额', width: 150, align: 'center', sortable: false },
    { field: 'createDate', title: '申请时间', width: 150, align: 'center', sortable: true },
    { field: 'systemresourceDate', title: '审核时间', width: 150, align: 'center', sortable: true },
    { field: '', title: '审核结果', width: 150, align: 'center', sortable: false,render: renderOfPortStatusOperate },
    { field: '', title: '操作', width: 150, align: 'center', sortable: false, render: renderOfPortMarkOperate }
];

var gridOptions = {
    id: grid_id,
    pageSize: 20,  //每页显示个数
    width: '100%',
    params: {
        'sort': 'desc'
    },
    trTdentity: 'id',
    url: queryUrl,
    tHeadCols: columns
};




/**
 * 操作
 */
function renderOfPortMarkOperate(record) {
    if (record.status == 1) {
        return '<button id="btn_port_' + record.id + '" type="button" value="备注" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openRemarkModel(' + "'" + record.systemresourceReason1 + "'" + ')">备注</button>';
    } else if (record.status == 2){
        return '<button id="btn_port_' + record.id + '" type="button" value="原因" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openReasonModel(' + "'" + record.systemresourceReason1 + "'" + ')">原因</button>';
    } else if (record.status == 3){
        return '<button id="btn_port_' + record.id + '" type="button" value="原因" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openReasonModel1(' + "'" + record.systemresourceReason1 + "'" + ')">原因</button>';
    }
    return '';
};

var openRemarkModel = function (reason1) {
    $("#remarkModel").modal('show');
    $("#remark").html(reason1);
};

var openReasonModel = function (reason1) {
    $("#reasonModel").modal('show');
    $("#reason").html(reason1);
};

var openReasonModel1 = function (reason1) {
    $("#reasonModel1").modal('show');
    $("#reason1").html(reason1);
};

function renderOfPortStatusOperate(record){
    if (record.status == 0) {
        value = "<font color='orange'>待审核</font>";
    } else if (record.status == 1) {
        value = "<font color='green'>通过</font>";
    } else if (record.status == 2) {
        value = "<font color='red'>不通过</font>";
    } else if (record.status == 3) {
        value = "<font color='blue'>待确认</font>";
    }
    return value;
}

function renderOfPortTypeOperate(record) {
    if(record.type == 1) {
        return '开通端口'
    } else if(record.type == 2) {
        return '端口充值'
    }
}


/**
 * 刷新列表
 */
var portSearch = function () {
    $("#port_apply_grid")['port_apply_grid'].reload({
        params: getGridParams(),
        searchParams: getGridSearchParams()
    });
};
/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
    $("#portForm")[0].reset();
    $('#departmentUserComboxTree').combotree("setValues",'');
    portSearch();
};


/**
 * 获取查询参数
 */
var getGridParams = function () {
    /**
     * 通过组织架构控件选择的人员
     * @type {string}
     */
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
    }

    var params = {
        'sort' : 'desc',
        'order': 'createAt',
        'accendantIds': userIds
    };
    return params;
};

var getGridSearchParams = function () {
    var searchParams = [
        {
            nodeId:'begin_time',
            paramName:'beginTime'
        },{
            nodeId:'end_time',
            paramName:'endTime'
        },{
            nodeId:'target_combox',
            paramName:'target'
        },{
            nodeId:'status_combox',
            paramName:'status'
        }
    ];
    return searchParams;
};




$(function () {
    /**
     * 时间控件
     */
    $('[name=begin_time]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('[name=end_time]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });


    /**
     * 端口用途combox
     * @type {combox}
     */
    $.fn.targetCombox = new combox();
    var options = getComboxOptions("target_combox");
    $("#target_combox").targetCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });


    /**
     * 审核状态combox
     * @type {combox}
     */
    $.fn.statusCombox = new combox();
    var options = getComboxOptions("status_combox");
    $("#status_combox").statusCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });


    /**
     * 生成顾问端口管理列表
     * @type {dataGrid}
     */
    $.fn['port_apply_grid'] = new dataGrid();
    $("#" + grid_id)[grid_id].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        params: getGridParams(),
        searchParams: getGridSearchParams(),
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,

        onload: function () {
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        thClickCallback: function(){
            $("#" + grid_id)[grid_id].reload({
                params: getGridParams(),
                searchParams: getGridSearchParams()
            })
        }
    });
});





/**
 * 组织架构控件
 * @param type
 */
var peratePerson_combobox_id = null;
var peratePerson_combobox_name = null;
var personId = null;

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
};



var portApply = function(){
    if($("#limit").val() != "ok"){
        alert("您没有申请开通端口/端口充值的权限，请联系您的组长或区长替您申请！");
        return false;
    }
    window.open(base + "/businessportController/portApply")
};