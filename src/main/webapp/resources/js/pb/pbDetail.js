$(function () {
    var customerSource = $('#customerSource').val();
    if (customerSource == '-1') {
        $('#customerSource_span').html("<em class='red'>已隐藏</em>");
    } else {
        $('#customerSource_span').html(getCustomerOrderSource(customerSource));
    }

    $('#signAt_span').html(dateMinuteToDay($('#signAt').val()));
    $('#starRentAt_span').html(dateMinuteToDay($('#starRentAt').val()));
    $('#endRentAt_span').html(dateMinuteToDay($('#endRentAt').val()));
    $('#expecteRentAt_span').html(dateMinuteToDay($('#expecteRentAt').val()));

    if ($('#nocommissiontimeUnit').val() == 0){
        $('#nocommissiontimeUnit_span').html('天');
    }else if ($('#nocommissiontimeUnit').val() == 1){
        $('#nocommissiontimeUnit_span').html('月');
    }

    if ($('#nocommissiontimeType').val() == 0){
        $('#nocommissiontimeType_span').html('期内免租');
    }else if ($('#nocommissiontimeType').val() == 1){
        $('#nocommissiontimeType_span').html('期外免租');
    }

    $('#getContractAt_input').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    $('#accendantMonth_input').datepicker({
        format: 'yyyy-mm',
        todayHighlight: true,
        startView: 2,
        maxViewMode: 1,
        minViewMode:1,
        todayBtn: 'linked'
    });

    $('#price_at').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked'
    });

    //$('#nocommissiontimeUnit_Select').val($('#nocommissiontimeUnit').val());
    //$('#nocommissiontimeUnit_Select').val($('#nocommissiontimeType').val());

    if ($('#iscooperate').val() == 0) {
        $('#iscooperate_span').html('否');
    } else {
        $('#iscooperate_span').html('是');
        $('#showFanYong').css('display', '');
    }


    var operateContractCheck = $('[name=operate_contract]');
    if ($('#isGetContract').val() == 0) {
        $('#isGetContract_span').html('否');
        $(operateContractCheck[0]).attr("checked", true);
        $('#contract_label0').addClass("checked");
    } else {
        $(operateContractCheck[0]).attr("checked", true);
        $('#isGetContract_span').html('是');
        $('#contract_label1').addClass("checked");
    }
    $('#getContractAt_span').html(dateMinuteToDay($('#getContractAt').val()));
    $('#accendantMonth_span').html($('#accendantMonth').val());

    $('.demo-tip-yellowsimple').poshytip({
        className: 'tip-yellowsimple',
        showTimeout: 1,
        alignTo: 'target',
        alignX: 'center',
        offsetY: 5,
        allowTipHover: true
    });
});

var openJudge = function () {
    var operateCheck = $('[name=operate]');
    $(operateCheck[0]).attr("checked", true);
    $('#unvalidreason').val('');
    $('#reason_div').css('display', "none");
    if ($('#status').val() == 10) {
        $('#title_judge').html('运营审核');
    } else if ($('#status').val() == 20) {
        $('#title_judge').html('合同审核');
    }
    $('#myModal-yunyingJudge').modal('show');
}

var openZuofei = function () {
    $('#abolishreason').val('');
    $('#myModal-zuofei').modal('show');
}

var jujue_operate = function (show) {
    if (show) {
        $('#reason_div').css('display', "");
    } else {
        $('#reason_div').css('display', "none");
    }
}

var yunyingJudge = function () {
    var operateCheck = $('[name=operate]');
    var url = '';
    var params = {};
    var status = $('#status').val();
    if (status == 10) {//运营审核
        if (operateCheck[0].checked) {
            url = base + '/pborderController/yunyingJudgeTongguo';
            params = {
                'id': $('#pbOrderId').val()
            };
        } else {
            if ($('#unvalidreason').val().trim() == '') {
                alert('请填写拒绝通过原因！');
                return false;
            }

            if ($('#unvalidreason').val().length > 200) {
                alert('拒绝通过原因长度不能超过200！');
                return false;
            }
            url = base + '/pborderController/yunyingJudgeJujue';
            params = {
                'id': $('#pbOrderId').val(),
                'unvalidreason': $('#unvalidreason').val().trim()
            };
        }
    } else if (status == 20) {//合同审核
        if (operateCheck[0].checked) {
            url = base + '/pborderController/hetongJudgeTongguo';
            params = {
                'id': $('#pbOrderId').val()
            };
        } else {
            if ($('#unvalidreason').val().trim() == '') {
                alert('请填写拒绝通过原因！');
                return false;
            }

            if ($('#unvalidreason').val().length > 200) {
                alert('拒绝通过原因长度不能超过200！');
                return false;
            }
            url = base + '/pborderController/hetongJudgeJujue';
            params = {
                'id': $('#pbOrderId').val(),
                'unvalidreason': $('#unvalidreason').val().trim()
            };
        }
    }

    $('#btnOK').attr('disabled', true);

    $.post(url, params,
        function (result) {
            if (result.success) {
                $('#myModal-yunyingJudge').modal('hide');

                alert(result.message);

                $('#btnOK').attr('disabled', false);

                //刷新页面
                window.location.reload();
            } else {
                $('#btnOK').attr('disabled', false);
                alert(result.message);
            }
        });
}

var zuofei = function () {
    if ($('#abolishreason').val().trim() == '') {
        alert('请填写无效原因！');
        return false;
    }

    if ($('#abolishreason').val().length > 200) {
        alert('无效原因长度不能超过200！');
        return false;
    }

    var url = base + '/pborderController/pbOrderZuofei';
    var params = {
        'id': $('#pbOrderId').val(),
        'abolishreason': $('#abolishreason').val().trim()
    };
/*    var status = $('#status').val();
    if (status == 10) {//运营作废
        params = {
            'id': $('#pbOrderId').val(),
            'abolishreason': $('#abolishreason').val().trim()
        };
    } else if (status == 20) {//合同作废
        params = {
            'id': $('#pbOrderId').val(),
            'abolishreason': $('#abolishreason').val().trim()
        };
    } else if (status == 20) {//合同作废
        params = {
            'id': $('#pbOrderId').val(),
            'abolishreason': $('#abolishreason').val().trim()
        };
    } else if (status == 20) {//合同作废
        params = {
            'id': $('#pbOrderId').val(),
            'abolishreason': $('#abolishreason').val().trim()
        };
    }*/

    $('#btnOK_zuofei').attr('disabled', true);

    $.post(url, params,
        function (result) {
            if (result.success) {
                $('#myModal-zuofei').modal('hide');

                alert(result.message);

                $('#btnOK_zuofei').attr('disabled', false);

                //刷新页面
                window.location.reload();
            } else {
                $('#btnOK_zuofei').attr('disabled', false);
                alert(result.message);
            }
        });
}

var openModifyContract = function () {
    $('#contractId_input').val($('#contractId').val());
    $('#getContractAt_input').val(dateMinuteToDay($('#getContractAt').val()));

    $('#accendantMonth_input').val($('#accendantMonth').val());

    $('#myModal-modifyContract').modal('show');
}

var modifyContract = function () {
    if ($('#contractId_input').val().length > 50) {
        alert('合同编号长度不能超过50！');
        return false;
    }

    var getContractAt = 0;
    var date = $('#getContractAt_input').val();
    if (date != null && date.trim() != '') {
        date= new Date(Date.parse(date.replace(/-/g,   "/")));
        if (isNaN(parseInt(date.getTime() / 1000))) {
            alert('获得合同日期格式有误，请输入正确的日期！');
            return false;
        }else{
            getContractAt = parseInt(date.getTime() / 1000);
        }
    }

    var isGetContract = 0;
    var operateCheck = $('[name=operate_contract]');
    if (operateCheck[1].checked) {
        isGetContract = 1;
    }

    $('#btnOK_contract').attr('disabled', true);

    var url = base + '/pborderController/modifyContractInfo';
    var params = {
        'bdorderId': $('#bdorderId').val(),
        'id': $('#pbOrderId').val(),
        'contractId': $('#contractId_input').val(),
        'isGetContract': isGetContract,
        'getContractAt': getContractAt,
        'accendantMonth': $('#accendantMonth_input').val(),
    };

    $.post(url, params,
        function (result) {
            if (result.success) {
                $('#myModal-modifyContract').modal('hide');

                alert(result.message);

                $('#btnOK_contract').attr('disabled', false);

                //刷新页面
                window.location.reload();
            } else {
                $('#btnOK_contract').attr('disabled', false);
                alert(result.message);
            }
        });
}

var openDaKuan = function () {
    $('#dakuanqueren').modal('show');
}

var dakuanSubmit = function () {
    if ($("#this_price").val().trim() == '') {
        alert('本次打款金额不能为空或格式有误，请重新填写！');
        return false;
    }

    if ($("#price_at").val() == '') {
        alert('打款日期不能为空，请填写！');
        return false;
    }

    if (isNaN(parseFloat($("#this_price").val().trim()))){
        alert('打款金额格式有误！');
        return false;
    }

    if (parseFloat($("#this_price").val().trim()) == 0){
        alert('打款金额不能为0！');
        return false;
    }

    var totalPrice = parseFloat($('#mo_total_price').val());
    var thisPrice = parseFloat($("#this_price").val().trim());
    var remainingPrice= parseFloat($('#remainingPrice').val());

    var cumulativePrice = totalPrice - remainingPrice + thisPrice;
    remainingPrice = (totalPrice >= cumulativePrice) ? (totalPrice-cumulativePrice) : 0;

    var priceAt = 0;
    var date = $('#price_at').val();
    if (date != null && date.trim() != '') {
        date= new Date(Date.parse(date.replace(/-/g,   "/")));
        if (isNaN(parseInt(date.getTime() / 1000))) {
            alert('打款日期格式有误，请输入正确的日期！');
            return false;
        }else{
            priceAt = parseInt(date.getTime() / 1000);
        }
    }

    var url = base + "/pborderController/dakuan";
    var params = {
        'bdorderId': $('#bdorderId').val(),
        'id': $('#pbOrderId').val(),
        'totalPrice': totalPrice,
        'thisPrice': thisPrice,
        'cumulativePrice': cumulativePrice,
        'remainingPrice': remainingPrice,
        'priceAt': priceAt,
        'priceCount': $('#priceCount').val() + 1
    };

    $('#dakuansubmit').attr('disabled', true);

    $.post(url, params,
        function (result) {
            if (result.success) {
                //刷新打款明细
                var tr = '';
                tr += '<tr>';
                tr += '<td>' + $('#price_at').val() + '</td>';
                tr += '<td>' + $("#this_price").val() + '</td>';
                tr += '<td>' + cumulativePrice + '</td>';
                tr += '<td>' + remainingPrice + '</td>';
                tr += '<td>' + (cumulativePrice*100.0/totalPrice).toFixed(2) + '%</td>';
                tr += '</tr>';

                $('#dakuan_tbody').append(tr);

                //部分打款
                if (thisPrice == cumulativePrice && thisPrice < totalPrice){
                    $('#dakuansubmit').attr('disabled', false);
                    $('#status_span').html('(已打款但未完成)');
                    $("#this_price").val('');
                    $("#price_at").val('');
                    $('#priceCount').val( parseInt($('#priceCount').val()) + 1);
                    $('#remainingPrice').val(remainingPrice);
                }else if (totalPrice <= cumulativePrice){ //打款完成
                    $("#this_price").val('');
                    $("#price_at").val('');
                    $('#divdakuan').css('display', 'none');
                    $('#status_span').html('(已完成打款)');
                }else{
                    $('#dakuansubmit').attr('disabled', false);
                    $("#this_price").val('');
                    $("#price_at").val('');
                    $('#priceCount').val( parseInt($('#priceCount').val()) + 1);
                    $('#remainingPrice').val(remainingPrice);
                }

                alert(result.message);
            } else {
                $('#dakuansubmit').attr('disabled', false);
                alert(result.message);
            }
        });
}

var downLoadPbFile = function (id) {
    window.open(base + "/pborderController/pbFileDownLoad?id=" + id, '_self');
}