var grid_id = "order_grid";
var queryUrl = base + '/orderyuyueController/orderyuyueunhlist';
var order = 'create_at';

var searchParams = [
    {
        nodeId: 'startTime',
        paramName: 'startTime'
    },
    {
        nodeId: 'endTime',
        paramName: 'endTime'
    }
];

var columns = [
    {field: 'id', title: '订单编号', width: 150, align: 'center', sortable: true},
    {field: 'createAt', title: '订单发起时间', width: 150, align: 'center', sortable: true, convert: convertDate},
    {field: 'phoneNum', title: '手机号', width: 150, align: 'center', sortable: false},
    {field: 'source', title: '订单来源', width: 150, align: 'center', sortable: true, convert: getCustomerOrderSource},
    {field: 'intention', title: '意向', width: 150, align: 'center', sortable: false, render: renderOfIntention},
    {field: 'createAt', title: '创建日期', width: 150, align: 'center', sortable: true, convert: convertDate},
    {field: '', title: '订单类型', width: 150, align: 'center', sortable: false, render: renderOfType},
    {field: '', title: '操作', width: 150, align: 'center', sortable: false, render: renderOfOrderOperate}
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
 * 处理
 */
function operate(phoneNum, orderYuyueId) {
    $.post(base + '/orderyuyueController/orderprehandle',
        {
    	phoneNum: phoneNum
        },
        function (result) {
            if (result.success) {

                alert(result.message);

                openOrderDetailPage(orderYuyueId);

                //刷新列表
                search();
            } else {
                alert(result.message);
            }
        })
}

function openOrderDetailPage(orderYuyueId) {
    window.open(base + "/orderyuyueController/orderyuyuedetailpage?id=" + orderYuyueId);
}

/**
 * 操作
 */
function renderOfOrderOperate(record, value) {
    if ($('#userId').val() == record.accendantId) {
        return '<button type="button" value="处理" class="btn btn-blue" style="margin:0 auto" onclick="openOrderDetailPage(' + record.id + ')">处理</button>';
    } else {
        return '<button type="button" value="处理" class="btn btn-blue" style="margin:0 auto" onclick="operate(\'' + record.phoneNum + '\',\''+ record.id  +'\')">处理</button>';
    }
}

function renderOfType(record, value) {
    return record.accendantId == 0 ? '<font color="red">公共订单</font>' : '<font color="green">私有订单</font>';
}

function typeRender(record, type) {
    return "<button type='button' class='close' aria-hidden='true' onclick='handle(this)'>处理</button>";
}

function handle(obj) {
    alert(obj.getParent());
}

function convertDate(date) {
    if (!date) {
        return '';
    } else {
        return dateHMZToDateTime(date * 1000);
    }
}

function optArray(obj, array) {
    if ($.inArray(obj, array) > -1) {
        array.splice($.inArray(obj, array), 1);
    } else {
        array.push(obj)
    }
}

function renderOfPhone(record, value) {
    var needJson = eval('(' + record.needJson + ')');
    if (needJson.phoneNum != null) {
        return needJson.phoneNum;
    }
    return '';
}

function renderOfIntention(record, value) {
    var needJson = eval('(' + record.needJson + ')');
    var value = '';
    if (needJson.orderBusinesscircleName != null && needJson.orderBusinesscircleName != '') {
        value += '商圈：' + needJson.orderBusinesscircleName + '; ';
    }
    if (needJson.orderAreaEnd != null) {
        value += '面积：' + needJson.orderAreaEnd + '; ';
    }
    if (needJson.orderPriceEnd != null) {
        value += '价格：' + needJson.orderPriceEnd;
    }
    return value;
}

//刷新列表
var search = function () {
    $("#" + grid_id)[grid_id].reload({
        params: getGridParams()
    });
}

/**
 * 获取查询参数
 */
var getGridParams = function () {
    var applyDate_begin = $('#startTime').val();
    if (applyDate_begin != null && applyDate_begin != '') {
        var begin = new Date(applyDate_begin.replace(/-/g, ','));
        applyDate_begin = parseInt(begin.getTime() / 1000);
    }

    var applyDate_end = $('#endTime').val();
    if (applyDate_end != null && applyDate_end != '') {
        var end = new Date(applyDate_end.replace(/-/g, ','));
        applyDate_end = parseInt((end.getTime() + 24 * 3600 * 1000) / 1000);
    }

    var params = {
        'startTime': applyDate_begin,
        'endTime': applyDate_end,
        "sort": $('#' + grid_id)[grid_id].options.sort,
        "order": order
    }

    return params;
}

$(function () {
    $('[name=startTime]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',

    });
    $('[name=endTime]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',

    });

//	dateWidget("start_tags",grid_id);
//	dateWidget("end_tags",grid_id);

    dateWidgetLimit("start_tags", "end_tags", grid_id);

    $("#btn_reset").on("click", function () {
        $("#queryForm")[0].reset();
        search();
    });

    /**
     * 生成列表
     * @type {dataGrid}
     */
    $.fn[grid_id] = new dataGrid();

    $("#" + grid_id)[grid_id].init({
        id: gridOptions.id,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        pageSize: gridOptions.pageSize,
        params: getGridParams(),
        order: order,
        thClickCallback: function (orderField) {
            if (orderField == '') {
                return;
            }

            order = orderField;

            $("#" + grid_id)[grid_id].reload({
                params: getGridParams()
            });
        }
    });
});


