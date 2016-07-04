/**
 * 组织架构控件
 * @param type
 */
var peratePerson_combobox_id = null;
var peratePerson_combobox_name = null;
var personId = null;
var searchUserIds = null;

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
            inTheSelectDepartments: false
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px',
    });
};



$(function () {
    /**
     * 时间控件
     */
    $('#begin_time').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('#end_time').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('#datetime').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
        endDate: "today",
    });

    /**
     * 生成员工日报列表
     * @type {dataGrid}
     */
    $.fn['checkLog_grid'] = new dataGrid();
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




var grid_id = "checkLog_grid";
var queryUrl = base + '/gwworklogController/selectWorkLogListPage';
var order = 'createAt';

var columns = [
    { field: 'accendantName', title: '日报创建人', width: 150, align: 'center', sortable: false },
    { field: 'datetime', title: '日报时间', width: 150, align: 'center', sortable: false, convert: convertDate},
    { field: 'content', title: '员工日报', width: 150, align: 'center', sortable: false },
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

function renderOfPortMarkOperate(record) {
    return '<button id="btn_port_' + record.id + '" type="button" value="修改" class="btn btn-blue" style="margin:0 auto" ' +
        'onclick="updateWorklogModel(' + record.id + ')">修改</button>';
};

var updateWorklogModel = function (id) {
    $("#savedata").val(id);
    $.ajax({
        url: base + '/gwworklogController/selectworklogbyid',
        type: 'post',
        data: {id: id},
        success: function (data) {
            if (data.success == 'ok') {
                var datetime = dateHaoMiaoZToDate(data.datetime * 1000);
                $("#accendantname_modal").text(data.accendantName);
                $("#datetime_modal").text(datetime);
                $("#content_modal").val(data.content);
                $("#updateModal").modal('show');
            }
        }
    });
};
var UpdateWorkLog = function () {
    var id = $("#savedata").val();
    var content = $("#content_modal").val();
    $.ajax({
        url: base + '/gwworklogController/updateworklogbyid',
        type: 'post',
        data: {id: id, content: content},
        success: function (data) {
            if (data.success == 'ok') {
                alert('修改成功！');
                workLogSearch();
                $("#updateModal").modal('hide');
            }
        }
    });
};

var CreateWorkLog = function () {
    var datetime = $("#datetime").val();
    if (datetime != null && datetime !=''){
        var time = new Date(datetime.replace(/-/g, ','));
        datetime = parseInt(time.getTime()/1000);
    }else{
        alert('请选择日报时间！');
        return false;
    }
    var content = $("#content_createmodal").val();
    if (content == null || content ==''){
        alert('日报内容不能为空！');
        return false;
    }
    $.ajax({
        url: base + '/gwworklogController/createworklogbyid',
        type: 'post',
        data: {content: content, datetime: datetime},
        success: function (data) {
            if (data.success == 'ok') {
                alert('提交成功！');
                workLogSearch();
                $("#createModal").modal('hide');
            }
        }
    });
};

var createWorkLogModel = function () {
    $("#datetime").val("");
    $("#createModal").modal('show');
};

/**
 * 刷新列表
 */
var workLogSearch = function () {
    $("#checkLog_grid")['checkLog_grid'].reload({
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
    checkLogSearch();
};


/**
 * 获取查询参数
 */
var getGridParams = function () {
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
    var begin = $('#begin_time').val();
    if (begin != null && begin !=''){
        var begintime = new Date(begin.replace(/-/g, ','));
        begin = parseInt(begintime.getTime()/1000);
    }
    var end = $('#end_time').val();
    if (end != null && end !=''){
        var endtime = new Date(end.replace(/-/g, ','));
        end = parseInt(endtime.getTime()/1000) + 86400;
    }
    var params = {
        'sort' : 'desc',
        'order': 'datetime',
        'begin': begin,
        'end': end,
        'searchUserIds': searchUserIds,
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
        }
    ];
    return searchParams;
};

function convertDate(date) {
    if (!date) {
        return '';
    } else {
        return dateHaoMiaoZToDate(date * 1000);
    }
}

var CloseModal = function () {
    $('#updateModal').modal('hide');
}

var createCloseModal = function () {
    $('#createModal').modal('hide');
}