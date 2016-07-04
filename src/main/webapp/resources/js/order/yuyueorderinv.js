var grid_id = "order_grid";
var queryUrl = base + '/orderyuyueController/orderyuyueinvlist';
var order = 'oy.create_at';

var peratePerson_combobox_id = null;
var peratePerson_combobox_name = null;

var columns = [
    {field: 'id', title: '订单编号', width: 150, align: 'center', sortable: true},
    {field: 'customerName', title: '客户姓名', width: 150, align: 'center', sortable: false, render: renderOfCustomerName},
    {field: 'phoneNum', title: '手机号', width: 150, align: 'center', sortable: false},
    {field: 'createAt', title: '订单发起时间', width: 150, align: 'center', sortable: true, convert: convertDate},
    {field: 'systemresourceReason1', title: '无效类别', width: 150, align: 'center', sortable: true},
    {field: 'systemresourceReason2', title: '无效原因', width: 150, align: 'center', sortable: false},
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

function openOrderDetailPage(orderYuyueId) {
    window.open(base + "/orderyuyueController/orderyuyuedetailpage?id=" + orderYuyueId);
}

/**
 * 操作
 */
function renderOfOrderOperate(record, value) {
    return '<button type="button" value="查看" class="btn btn-blue" style="margin:0 auto" onclick="openOrderDetailPage(' + record.id + ')">查看</button>';
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

function renderOfCustomerName(record, value) {
    var needJson = eval('(' + record.needJson + ')');
    if (needJson.customerName != null) {
        return needJson.customerName;
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

    var modifyId = null;
    var operatePersonValue = $('#operatePerson').combobox('getValue');
    if (peratePerson_combobox_id != null && peratePerson_combobox_id == operatePersonValue) {
        modifyId = peratePerson_combobox_id;
    } else {
        $('#operatePerson').combobox('setValue', '');
    }

    var params = {
        'phoneNum': $('#phoneNum').val(),
        'modifyId': modifyId,
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

    dateWidgetLimit("start_tags", "end_tags", grid_id);

    $("#btn_reset").on("click", function () {
        $("#queryForm")[0].reset();
        peratePerson_combobox_id = null;
        orderPerson_combobox_id = null;
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

            if (orderField = 'id') {
                order = 'oy.id'
            } else if (orderField = 'customerName') {
                order = 'c.customerName'
            } else if (orderField = 'createAt') {
                order = 'oy.createAt'
            } else if (orderField = 'customerSystemresourceAt') {
                order = 'c.systemresource_at'
            } else if (orderField = 'source') {
                order = 'oy.source'
            } else if (orderField = 'customerAccendantName') {
                order = 'c.accendant_name'
            } else {
                return;
            }

            $("#" + grid_id)[grid_id].reload({
                params: getGridParams()
            });
        }
    });
});


var operatePersonSelect = function (record) {
    peratePerson_combobox_id = record.userId;
    peratePerson_combobox_name = record.fullname;
}

var operatePersonLoadSuccess = function () {
    var data = $('#operatePerson').combobox('getData');
    var value = $('#operatePerson').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#operatePerson').combobox('setValue', data[i].userId);
                peratePerson_combobox_id = data[i].userId;
                peratePerson_combobox_name = value;
                return;
            }
        }
    }
}
