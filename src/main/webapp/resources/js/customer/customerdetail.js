var curCustomerLookId = null;
var curSubscribeId = null;
var customerLookWaitListCount = 0;
var curCustomerLookHouseId = null;

var first = 0;

$(function () {
    $('#cooperateTime_begin').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('#cooperateTime_end').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    var today = new Date();

    $('#orderAt').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        startDate: today
    });

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    $('#lookDateTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        language: 'zh-CN',
        startDate: today,
        endDate: new Date()
    });

    $("#Sel-invalid").val("");
    $("#invalid_remark").val('');
    $("#agencyName").val('');
    $("#cooperateTime_begin").val('');
    $("#cooperateTime_end").val('');
    $("#lookRemark").val('');

    var cho;
    $(".radio-box label.checkbox").click(function () {
        var radioId = $(this).attr("name");
        cho = !cho;
        if (cho) {
            $(this).addClass("checked");
            $(this).parent().find("input[type='checkbox']").attr("checked", "checked");
        } else {
            $(this).removeClass("checked");
            $(this).parent().find("input[type='checkbox']").removeAttr("checked");
        }
    });

    $(".radio-box label").click(function () {
        var radioId = $(this).attr("name");
        $(this).parent().siblings().find("label").removeAttr("class") && $(this).attr("class", "checked");
        $(this).parent().siblings().find("input[type='radio']").removeAttr("checked") && $(this).parent().find("input[type='radio']").attr("checked", "checked");
    })

    /**
     * 带看列表
     * @type {dataGrid}
     */
    $.fn['customerLookWaitList'] = new dataGrid();
    var gridOptions = getDataGridOptions("customerLookWaitList");

    $("#customerLookWaitList")['customerLookWaitList'].init({
        id: gridOptions.id,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order: gridOptions.params.order,
        onload:function(){

            var data = $("#customerLookWaitList")['customerLookWaitList'].options.data;
            if (data == null || data.length == 0){
                if ($('#yuyue_li').css('display') != 'none'){
                    $('#yuyue_li').css('display', 'none');
                    $('#tab1').css('display', 'none');
                    if ($('#yuyue_li').hasClass('active')){
                        $('#genjing_li').addClass('active');
                        $('#tab2').addClass('active');
                    }
                    first = 1;
                }

                if (first == 0){
                    $('#genjing_li').addClass('active');
                    $('#tab2').addClass('active');
                }
            }

            var attributes = $("#customerLookWaitList")['customerLookWaitList'].options.attributes;
            if (attributes != null && attributes.customerLookWaitListCount != null){
                if (attributes.customerLookWaitListCount != 0){
                    $('#customerLookWaitListCount').html('（' + attributes.customerLookWaitListCount + '）');
                }else{
                    $('#customerLookWaitListCount').html('');
                }
                customerLookWaitListCount = attributes.customerLookWaitListCount;
            }

            var show_comm = '';
            if (data != null && data.length != 0){
                show_comm = '该客户为优办主站预约看房客户，请及时处理预约看房带看！';
            }
            if ($('#systemresource1Orderid').val() != ''){
                var createAt = $('#createAt').val();
                var nowDate = new Date();
                //在30分钟内创建的客户提示“跟进客户”

                if (nowDate.getTime()/1000 - createAt < 30*60){
                    show_comm = '请在30分钟内跟进客户，否则客户将流转至公客池供其他顾问跟进！&nbsp;&nbsp;' + show_comm;
                }
            }

            $('#show_comm').html(show_comm);
        }
    });

    $.fn['customerLooList'] = new dataGrid();
    var gridOptions = getDataGridOptions("customerLooList");

    $("#customerLooList")['customerLooList'].init({
        id: gridOptions.id,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order: gridOptions.params.order,
        onload: function () {
            var show_comm = '';
            if ($('#yuyue_li').css('display') != 'none'){
                show_comm = '该客户为优办主站预约看房客户，请及时处理预约看房带看！';
            }
            if ($('#systemresource1Orderid').val() != ''){
                var createAt = $('#createAt').val();
                var nowDate = new Date();
                //在30分钟内创建的客户提示“跟进客户”

                if (nowDate.getTime()/1000 - createAt < 30*60){
                    show_comm = '请在30分钟内跟进客户，否则客户将流转至公客池供其他顾问跟进！&nbsp;&nbsp;' + show_comm;
                }
            }
            $('#show_comm').html(show_comm);
        }
    });


    //跟进列表
    $.fn['customerFollowList'] = new dataGrid();
    var gridOptions = getDataGridOptions("customerFollowList");

    $("#customerFollowList")['customerFollowList'].init({
        id: gridOptions.id,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order: gridOptions.params.order,
        onload:function(){
            //var orderSource = $('#orderSource').val();
            var show_comm = '';
            if ($('#yuyue_li').css('display') != 'none'){
                show_comm = '该客户为优办主站预约看房客户，请及时处理预约看房带看！';
            }
            if ($('#systemresource1Orderid').val() != ''){
                var createAt = $('#createAt').val();
                var nowDate = new Date();
                //在30分钟内创建的客户提示“跟进客户”

                if (nowDate.getTime()/1000 - createAt < 30*60){
                    show_comm = '请在30分钟内跟进客户，否则客户将流转至公客池供其他顾问跟进！&nbsp;&nbsp;' + show_comm;
                }
            }

            /*var data = $("#customerFollowList")['customerFollowList'].options.data;
            if (data == null || data.length == 0){
                var createAt = $('#createAt').val();
                var nowDate = new Date();
                //在30分钟内创建的客户提示“跟进客户”

                if (nowDate.getTime()/1000 - createAt < 30*60){
                    show_comm = '请在30分钟内跟进客户，否则客户将流转至公客池供其他顾问跟进！&nbsp;&nbsp;' + show_comm;
                }
            }*/

            $('#show_comm').html(show_comm);
        }
    });


    /**
     * 操作日记列表
     * @type {dataGrid}
     */
    $.fn['customerOperateLogList'] = new dataGrid();
    var gridOptions = getDataGridOptions("customerOperateLogList");

    $("#customerOperateLogList")['customerOperateLogList'].init({
        id: gridOptions.id,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        rowNumberWidth: 30,
        lineLenth:40,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order: gridOptions.params.order
    });

    if ($('#tab_checklog')[0] != null){
        /**
         * 访问日记列表
         * @type {dataGrid}
         */
        $.fn['customerCheckLogList'] = new dataGrid();
        var gridOptions = getDataGridOptions("customerCheckLogList");

        $("#customerCheckLogList")['customerCheckLogList'].init({
            id: gridOptions.id,
            searchParams: gridOptions.searchParams,
            url: gridOptions.url,
            tHeadCols: gridOptions.tHeadCols,
            trTdentity: gridOptions.trTdentity
        });
    }

})

var combo_changeAccendantPersonLoadSuccess = function () {
    $('#departmentCombox_moidfyCustomerAccendantUser').combobox('setValue', -1);
}

/**
 * 组织架构change时，重新加载组织架构人员
 */
var departmentComboxChange_changeAccendantPerson = function () {
    var departmentComboxData = $('#departmentCombox_moidfyCustomerAccendantUser').combobox('getData');
    var departmentIdArray = $('#departmentCombox_moidfyCustomerAccendantUser').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0) {
        $("#departmentCombox_moidfyCustomerAccendantUser").combotree("setValues", '');
        $('#departmentCombox_moidfyCustomerAccendantUser').combotree("loadData", "");
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

    $('#departmentUserComboxTree_moidfyCustomerAccendantUser').combotree({
        queryParams: {
            departmentIds: departmentIds,
            loop: false,
            showLoginName: false,
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px'
    });
}

var moidfyCustomerAccendantUser = function () {
    var userId = '';
    var userName = '';

    var checkedNodes = $('#departmentUserComboxTree_moidfyCustomerAccendantUser').combotree('tree').tree('getSelected');
    if (checkedNodes != null && checkedNodes.userNode) {
        userId = checkedNodes.id;
        userName = checkedNodes.text;
    }
    if (userId != '') {
        $('#change_AccendantUser_btn').css("display","none")
        $.post(base + '/customer/moidfyCustomerAccendantUser',
            {
                id: $('#customerId').val(),
                accendantId: userId,
                accendantName: userName
            },
            function (result) {
                if (result.success) {
                    $('#myModal-customer').modal('hide');

                    $('#change_AccendantUser_btn').css("display","block")

                    alert(result.message);

                    //刷新页面
                    window.location.reload();
                } else {
                    alert(result.message);
                }
            })
    } else {
        $('#change_AccendantUser_btn').css("display","block")
        alert('请选择人员');
    }
}

/**
 * 滴滴预约
 * @returns {boolean}
 */
var orderDidi = function(){
    if ($('#orderAt').val() == '') {
        alert('用车时间不能为空');
        return false;
    }
    if ($('#startPoint').val() == '') {
        alert('请输入起点');
        return false;
    }
    if ($('#endPoint').val() == '') {
        alert('请输入终点');
        return false;
    }
    if ($('#startPoint').val().length > 50) {
        alert('起点长度不能超过50');
        return false;
    }
    if ($('#endPoint').val().length > 50) {
        alert('终点长度不能超过50');
        return false;
    }

    var orderAt =  $('#orderAt').val();
    if (orderAt != null && orderAt !=''){
        var begin = new Date(orderAt.replace(/-/g, ','));
        orderAt = parseInt(begin.getTime()/1000);
    }


    $('#orderDidi_btn').css('display', 'none');

    $.post(base + '/orderdidiController/orderDidi',
        {
            customerId: $('#customerId').val(),
            customerName: $('#customerName').val(),
            phoneNum: $('#phoneNum').val(),
            orderAt: orderAt,
            startPoint: $('#startPoint').val(),
            endPoint: $('#endPoint').val()
        },
        function (result) {
            if (result.success) {
                $('#myModal-didi').modal('hide');

                $('#orderAt').val('');
                $('#startPoint').val('');
                $('#endPoint').val('');

                $('#orderDidi_btn').css('display', 'inline');
                alert(result.message);

                //刷新日志列表
                $("#customerOperateLogList")['customerOperateLogList'].reload();
            } else {
                alert(result.message);
            }
        })
}

//设为客户为无效
var setInvalid = function () {
    var invalidStatus = $("#Sel-invalid").val();
    var status = null;
    var invalid_remark = $("#invalid_remark").val();
    var agencyName = $("#agencyName").val();
    var cooperateTime_begin = $("#cooperateTime_begin").val();
    var cooperateTime_end = $("#cooperateTime_end").val();
    if (invalidStatus == '') {
        alert('请选择无效原因');
        return false;
    }
    if (invalid_remark == '') {
        alert('请填写必填项');
        return false;
    }

    var followRemark = "";

    //已和其他公司合作
    if (invalidStatus == '已和其他公司合作') {
        if (agencyName == '') {
            alert('请填写公司名称');
            return false;
        }
        if (cooperateTime_begin == '' || cooperateTime_end == '') {
            alert('请填写合作时间');
            return false;
        }
        status = 4;
        followRemark += "【合作公司名称】" + agencyName + "【合作时间】" + cooperateTime_begin + "【至】" + cooperateTime_end + "【备注】" + invalid_remark;

        var begin = new Date(cooperateTime_begin.replace(/-/g, ','));
        cooperateTime_begin = parseInt(begin.getTime()/1000);

        var end = new Date(cooperateTime_end.replace(/-/g, ','));
        cooperateTime_end = parseInt(end.getTime()/1000);

    } else {
        status = 3;
        //followRemark += "【无效原因】" + invalidStatus + "【备注】" + invalid_remark;
        followRemark = invalid_remark;
    }

    var apply = false;
    //申请无效
    if ($('#userlevel').val() == 0 && $('#isPerfection').val() == 0){
        apply = true;
    }

    $.get(base + '/customer/moidfyCustomerToInvalid',
        {
            id: $('#customerId').val(),
            status: status,
            systemresourceReason1: invalidStatus,
            systemresourceReason2: followRemark,
            status5CompleteTime: cooperateTime_begin,
            status5StopTime: cooperateTime_end,
            followRemark: followRemark,
            apply: apply
        },
        function (result) {
            if (result.success) {
                $('#myModal-invalid').modal('hide');

                alert(result.message);

                //刷新页面
                window.location.reload();
            } else {
                alert(result.message);
            }
        })
}

function moreInvalid() {
    console.log($('#Sel-invalid option:selected').text());
    if ($('#Sel-invalid option:selected').text() == '已和其他公司合作') {
        $(".moreInvalidDiv").toggleClass('hide');
    } else {
        $(".moreInvalidDiv").addClass('hide');
    }
}

var checkCustomerToInvalid = function () {
    if (customerLookWaitListCount > 0){
        alert('该客户尚有预约带看未处理，请先处理！');
    }else{
        $('#myModal-invalid').modal('show');
    }
    /*$.post(base + '/customerlookController/checkCustomerToInvalid',
        {
            'customerId': $('#customerId').val()
        }, function (data) {
            if (data.success) {
                $('#myModal-invalid').modal('show');
                return true;
            }
            else {
                alert(data.message);
                return false;
            }
        })*/
}

//完成带看
var modifyCustomerLookStatus = function(status){
    var params = {};
    var lookRemark = '';

    var url = base;
    if (status == 2){
        url += '/customerlookController/finishCustomerLook';
        if ($('#lookDateTime').val() == '') {
            alert('请填写带看时间');
            return false;
        }
        if ($('#lookRemark').val() == '') {
            alert('请填写带看记录');
            return false;
        }
        if ($('#lookRemark').val().length > 1000) {
            alert('带看记录长度不能超过1000');
            return false;
        }

        var lookDate =  $('#lookDateTime').val();
        if (lookDate != null && lookDate !=''){
            var begin = new Date(Date.parse(lookDate.replace(/-/g,   "/")));
            lookDate = parseInt(begin.getTime()/1000);
        }

        params = {
            'remark': $('#lookRemark').val(),
            'customerId': $('#customerId').val(),
            'lookDate': lookDate,
            'status': status,
            'subscribeId': curSubscribeId,
            'id': curCustomerLookId,
            'houseId': curCustomerLookHouseId
        };
    }else if (status == 3){
        url += '/customerlookController/closeCustomerLook';
        if ($('#colseReason').val() == '') {
            alert('请填写关闭原因');
            return false;
        }
        params = {
            'remark': $('#colseReason').val(),
            'customerId': $('#customerId').val(),
            'status': status,
            'subscribeId': curSubscribeId,
            'id': curCustomerLookId,
            'houseId': curCustomerLookHouseId
        };
    }



    $.post(url,
        params,
        function (result) {
            if (result.success) {
                $('#myModal-successSee').modal('hide');
                $('#myModal-closeSee').modal('hide');

                alert(result.message);

                //刷新列表
                $("#customerLookWaitList")['customerLookWaitList'].reload();
                $("#customerLooList")['customerLooList'].reload();
                $("#customerOperateLogList")['customerOperateLogList'].reload();
            } else {
                alert(result.message);
            }
        })
}

var setCustomerLookId = function(customerLookId, subscribeId, houseId){
    curCustomerLookId = customerLookId;
    curSubscribeId = subscribeId;
    curCustomerLookHouseId = houseId;

    $('#colseReason').val('');
    $('#lookDateTime').val('');
    $('#lookRemark').val('');
}

/**
 * 客户带看列表操作：完成带看、关闭带看
 */
var renderOfOperateCustomerLook = function(record, value){
    if (record.status == 1){
        return '<a href="#myModal-successSee" data-toggle="modal" class="btn btn-default" onclick="setCustomerLookId(\''+ record.id + '\',\'' + record.subscribeId + '\',\'' + record.houseId +'\')">完成带看</a>' +
            '&nbsp&nbsp;<a href="#myModal-closeSee" class="btn btn-default" data-toggle="modal" onclick="setCustomerLookId(\''+ record.id + '\',\'' + record.subscribeId + '\',\'' + record.houseId +'\')">关闭带看</a>';
    }
    return "";
}

/**
 * 打开为客户选择房源页面
 */
var openSearchFangyuanList = function(){
    //不完善
    if ($('#isPerfection').val() == 1){
        alert('请先完善客户信息');
        return false;
    }

    var search = base + '/customerlookController/fangyuanlist?customerId='+ $('#customerId').val();
    if ($('#customerName').val() != null){
        search += "&customerName=" + encodeURI($('#customerName').val());
    }
    if ($('#phoneNum').val() != null){
        search += "&phoneNum=" + $('#phoneNum').val();
    }
    if ($('#orderPriceBegin').val() != null){
        search += "&orderPriceBegin=" + $('#orderPriceBegin').val();
    }
    if ($('#orderPriceEnd').val() != null){
        search += "&orderPriceEnd=" + $('#orderPriceEnd').val();
    }
    if ($('#orderAreaBegin').val() != null){
        search += "&orderAreaBegin=" + $('#orderAreaBegin').val();
    }
    if ($('#orderAreaEnd').val() != null){
        search += "&orderAreaEnd=" + $('#orderAreaEnd').val();
    }
    if ($('#orderCityId').val() != null){
        search += "&orderCityId=" + $('#orderCityId').val();
    }
    if ($('#orderDistrictId').val() != null){
        search += "&orderDistrictId=" + $('#orderDistrictId').val();
    }
    if ($('#orderBusinesscircleId').val() != null){
        search += "&orderBusinesscircleId=" + $('#orderBusinesscircleId').val();
    }
    window.open(search);
}

/**
 * 刷新带看列表
 */
var refreshCustomerLooList = function(){
    $("#customerLookWaitList")['customerLookWaitList'].reload();
    $("#customerLooList")['customerLooList'].reload();
}

/**
 * 申请报单
 */
var openBaodan = function(){
    //不完善
    if ($('#isPerfection').val() == 1){
        alert('请先完善客户信息');
        return false;
    }

    if ($('#accendantUserLevel').val() > 0){
        alert('您所选的客户归属不在组员上，不能申请报单。请先调整客户归属');
        return false;
    }
    window.open(base+"/pborderController/pbAddPage?customer=" + $('#customerId').val());
}


/*var beforeAddFollow = function () {
    $('#gj_record').val('');
}*/

var beforeDidi = function () {
    //不完善
    if ($('#isPerfection').val() == 1){
        alert('请先完善客户信息');
        return false;
    }else{
        $('#myModal-didi').modal('show');
    }
}

var beforeAddFollow = function () {
    //不完善
    if ($('#isPerfection').val() == 1){
        alert('请先完善客户信息');
        return false;
    }else{
        $('#followup').modal('show');
    }
}

var approvelApplyInvalid = function () {
    if ($("[name=approveConfirm]:checked") == null){
        alert('请确认客户状态！');
        return false;
    }

    if ($('#approveRemarks').val().trim() == ''){
        alert('审批备注不能为空！');
        return false;
    }

    var systemresourceReason1 = '';
    var oldStatus = $('#status').val();
    var status = null;
    var approveConfirms = $('[name="approveConfirm"]');
    if (approveConfirms[0].checked){//确认无效
        if (oldStatus == 8){
            status = 3;
        }else if (oldStatus == 9){
            status = 4;
        }
        systemresourceReason1 = '回访后，确认客户无效（流失）';
    } else if (approveConfirms[2].checked){//确认无效
        if (oldStatus == 8){
            status = 3;
        }else if (oldStatus == 9){
            status = 4;
        }
        systemresourceReason1 = '未回访，确认客户无效（流失）';
    } else if (approveConfirms[1].checked){//确认有效
        status = 2;
        systemresourceReason1 = '回访后，确认客户有效';
    }

    $.get(base + '/customer/approvelApplyInvalid',
        {
            'id': $('#customerId').val(),
            'status': status,
            'systemresourceReason1': systemresourceReason1,
            'systemresourceReason2': $('#approveRemarks').val().trim()
        },
        function (result) {
            if (result.success) {
                $('#myModal-approvel').modal('hide');

                alert(result.message);

                //刷新页面
                window.location.reload();
            } else {
                alert(result.message);
            }
        })
}

