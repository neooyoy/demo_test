var order = 'createAt';
$(function () {
    var operateCheck = $('[name=operate]');
    $(operateCheck[0]).attr("checked", true);

    $('#status').val('');
    $('#create_begin').val('');
    $('#create_end').val('');

    $('[name=create_begin]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('[name=create_end]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('#status').val(0);

    /**
     * 滴滴预约审核列表
     */
    $.fn['calllog_grid'] = new dataGrid();
    var gridOptions = getDataGridOptions("calllog_grid");
    $("#calllog_grid")['calllog_grid'].init({
        id: gridOptions.id,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        params: getGridParams(),
        order: gridOptions.params.order,
        thClickCallback: function (orderField) {
            if (orderField == '') {
                return;
            }

            order = orderField;

            $("#calllog_grid")['calllog_grid'].reload({
                params: getGridParams()
            });
        }
    });

    $("input").bind('keypress', function (event) {
        if (event.keyCode == "13") {
            search();
        }
    });

    $('select[id!="invalidType"]').bind('change', function () {
        search();
    });

});


/**
 * 获取查询参数
 */
var getGridParams = function () {
    var create_begin = $('#create_begin').val();
    if (create_begin != null && create_begin != '') {
        var begin = new Date(Date.parse(create_begin.replace(/-/g, "/")));
        create_begin = parseInt(begin.getTime() / 1000);
    }

    var create_end = $('#create_end').val();
    if (create_end != null && create_end != '') {
        var end = new Date(Date.parse(create_end.replace(/-/g, "/")));
        create_end = parseInt((end.getTime() + 24 * 3600 * 1000) / 1000);
    }

    var params = {
        'createAtBegin': create_begin,
        'createAtEnd': create_end,
        'ani': $('#ani').val().trim(),
        'status': $('#status').val(),
        'orderGo': $('#orderGo').val(),
        'bigCode': $('#bigCode').val(),
        "sort": $('#calllog_grid')['calllog_grid'].options.sort,
        "order": order
    }

    return params;
}

/**
 * 滴滴预约审批状态
 */
var renderOfCalllogStatus = function (record, value) {
    var value = "";
    if (record.status == 0) {
        value = "<font color='orange'>待处理</font>";
    } else if (record.status == 1) {
        value = "<font color='green'>已处理</font>";
    } else if (record.status == 2) {
        value = "<font color='red'>作废</font>";
    }
    return value;
}

var semSource = function (record, value) {
    if (record.bigCode == '4008106698') {
        return '自有流量';
    } else if (record.bigCode == '4008108287') {
        return '百度';
    } else if (record.bigCode == '4008107960') {
        return '360';
    } else if (record.bigCode == '4008107968') {
        return '搜狗';
    } else if (record.bigCode == '4008107970') {
        return '神马';
    }
    return '';
}

/**
 * 操作
 */
var renderOfCalllogOperate = function (record) {
    if (record.status == 0) {//待处理
        return '<button id="go_btn_calllog_' + record.id + '" type="button" value="转为订单" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openDingdanModal(\'' + record.id + '\',\'' + record.ani + '\',\'' + record.bigCode + '\')">转为订单</button> &nbsp;&nbsp;&nbsp;' +
            '<button id="invalid_btn_calllog_' + record.id + '" type="button" value="无效化" class="btn btn-red" style="margin:0 auto" ' +
            'onclick="openInvalidModal(' + record.id + ')">无效化</button>';
    } else if (record.status == 1) {//已处理
        if (record.orderGo == 1) {
            return '<button id="look_btn_calllog_' + record.id + '" type="button" value="查看" class="btn btn-default" style="margin:0 auto" ' +
                'onclick="openOrderYuYue(' + record.orderid + ')">查看预约看房订单</button>';
        } else if (record.orderGo == 2) {
            return '<button id="look_btn_calllog_' + record.id + '" type="button" value="查看" class="btn btn-default" style="margin:0 auto" ' +
                'onclick="openOrderWeiTuo(' + record.orderid + ')">查看业主委托订单</button>';
        }
    } else if (record.status == 2) {//作废
        return '<button id="look_btn_calllog_' + record.id + '" type="button" value="查看原因" class="btn btn-default" style="margin:0 auto" ' +
            'onclick="openReason(' + record.id + ')">查看原因</button>';
    }

    return '';
}

var openOrderYuYue = function (orderid) {
    window.open(base + "/orderyuyueController/orderyuyuedetailpage?id=" + orderid);
}

var openOrderWeiTuo = function (orderid) {
    window.open(base + "/order/deliverydetail?orderid=" + orderid);
}

var openDingdanModal = function (id, phone, bigCode) {
    $('#phone_span').html(phone);
    $('#phoneNum').val(phone);
    $('#customerName').val(phone);
    $('#searchengine').val(getSearchengine(bigCode));

    $('#calllogId').val(id);
    $('#myModal-dingdan').modal('show');
}

var calllogToUnhandle = function () {
    $('#myModal-reason').modal('hide');
    var curRecord = $('#calllog_grid')['calllog_grid'].getCurSelectRecord($('#calllogId').val());

    $('#phone_span').html(curRecord.ani);
    $('#phoneNum').val(curRecord.ani);
    $('#customerName').val(curRecord.ani);
    $('#searchengine').val(getSearchengine(curRecord.bigCode));

    $('#calllogId').val(curRecord.id);
    $('#myModal-dingdan').modal('show');
}

var getSearchengine = function (bigCode) {
    if (bigCode == '4008106698') {
        return '';
    } else if (bigCode == '4008108287') {
        return 'bd';
    } else if (bigCode == '4008107960') {
        return 'qh';
    } else if (bigCode == '4008107968') {
        return 'sg';
    } else if (bigCode == '4008107970') {
        return 'sm';
    }
    return '';
}

var openInvalidModal = function (id) {
    $('#calllogId').val(id);
    $('#invalidType').val('');
    $('#remarks').val('');
    $('#myModal-invalid').modal('show');
}

var openReason = function (id) {
    var curRecord = $('#calllog_grid')['calllog_grid'].getCurSelectRecord(id);
    if (curRecord != null) {
        $('#calllogId').val(curRecord.id);
        $('#reason_span').html(curRecord.invalidType);
        $('#remarks_span').html(curRecord.remarks);
        $('#myModal-reason').modal('show');
    }
}

var goYuYueDingdan = function () {
    var operateCheck = $('[name=operate]');
    var orderGo = null;
    //转为预约看房订单
    if (operateCheck[0].checked) {
        $.post(base + '/orderyuyueController/calllogGoOrderYuYue',
            {
                calllogId: $('#calllogId').val(),
                browser: $('#searchengine').val(),
                phoneNum: $('#phoneNum').val(),
                source:2,
                customerName: $('#customerName').val()
            },
            function (result) {
                if (result.success) {
                    $('#myModal-dingdan').modal('hide');

                    //刷新列表
                    search();

                    window.open(base + "/orderyuyueController/orderyuyuedetailpage?id=" + result.id);
                } else {
                    alert("转为预约看房订单失败");
                }
            })
    } else if (operateCheck[1].checked) {//转为业主委托看房订单
        $.post(base + '/order/calllogGoOrdeToufan',
            {
                calllogId: $('#calllogId').val(),
                searchengine: $('#searchengine').val(),
                customerPhone: $('#phoneNum').val(),
                customerName: $('#customerName').val()
            },
            function (result) {
                if (result.success) {
                    $('#myModal-dingdan').modal('hide');

                    //刷新列表
                    search();

                    //window.open(base + "/order/deliverydetail?orderid=" + result.id);
                } else {
                    alert("转为业主委托看房订单失败");
                }
            })
    }
}

var calllogInvalid = function () {
    if ($('#invalidType').val() == ''){
        alert("无效类型不能为空！");
        return false;
    }
    $.post(base + '/orderCalllogController/calllogToInvalid',
        {
            id: $('#calllogId').val(),
            invalidType: $('#invalidType').val(),
            remarks: $('#remarks').val()
        },
        function (result) {
            if (result.success) {
                $('#myModal-invalid').modal('hide');

                //刷新列表
                search();
            } else {
                alert("无效化失败！");
            }
        })
}

//刷新列表
var search = function () {
    $("#calllog_grid")['calllog_grid'].reload({
        params: getGridParams()
    });
}

var clearSearchValue = function () {
    $("#form")[0].reset();
    search();
}