/**
 * 列表表头
 */
var headers = null;

var gcount = 0;

var temId = 0;

//形式：'北京-海淀-xxx' : '123'
var cityDistrictOffceName_officeIdMap = {};

var deliverStandardStr = ',毛坯,简装,精装,';
var howpayStr = ',押一付一,押一付三,押一付六,押二付三,押二付六,押三付一,押三付三,押三付六,押三付年,';

/**
 * 列表数据
 */
var totalData = null;

var curRepeatCount = 0;

//已经交验完条数
var hasJudgedCount = 0;

//已经完成导入条数
var hasImportCount = 0;

var houseUrl = base + "/houseController/houseModify?id=";

//excel表格对应的bean属性
var excelHeaderMapBean = {
    '生成房源id': 'houseId',
    '导入房源结果': 'importResult',
    '校验结果': 'judgeResult',
    '校验是否通过': 'judgeSuccess',
    '城市id': 'cityId',
    '区域id': 'districtId',
    '大楼id': 'officeId',
    '业主类型': 'investorType',
    '城市': 'cityName',
    '区域': 'districtName',
    '大楼名称': 'officeName',
    '第一联系人': 'investorContact',
    '联系电话1': 'investorContactphone',
    '第二联系人': 'conduitContact',
    '联系电话2': 'conduitContactphone',
    '楼座号': 'buildingNo',
    '楼层': 'floorNo',
    '房间号': 'houseNo',
    '建筑面积': 'houseArea',
    '租金（元/平/天）': 'price',
    '每月价格': 'monthPrice',
    '物业费': 'managementMoney',
    '是否包含物业费': 'includePropertymanagement',
    '装修标准': 'deliverStandard',
    '交付日期': 'deliverDate',
    '付款方式': 'howpay',
    '房源描述': 'description',
    '特殊备注': 'remarks'
}

$(function () {
    $('#btn_clean').attr('disabled', false);
    $('#importFile_btn').attr('disabled', false);
    $('#importFile_a').attr('disabled', false);
    $('#btn_judge').attr('disabled', false);
    $('#btn_import').attr('disabled', false);

    $('[name="file"]').fileupload({
        dataType: "json",
        done: function (e, data) {
            if (data.result.success) {
                if (headers == null) {
                    headers = data.result.data.headers;
                }

                curRepeatCount = 0;
                var rows = data.result.data.rows;
                injectData(rows);

                if (curRepeatCount > 0) {
                    if ($('#importMsg').html() == '') {
                        $('#importMsg').append('注：');
                    }
                    $('#importMsg').append('<font color="red">' + data.files[0].name + '有' + curRepeatCount + '条重复数据未导入!</font>' + '<br/>');
                }


            } else {
                if ($('#importMsg').html() == '') {
                    $('#importMsg').append('注：');
                }
                $('#importMsg').append('<font color="red">' + data.result.message + '<br/>');
            }

            gcount--;
            if (gcount == 0) {
                setTimeout(function () {
                    $('#importMsg').html('');
                    $('#uploadprocess').modal('hide');
                }, 2000)
            }
        },
        progressall: function (e, data) {
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if (progress <= 99) {
                $('#processbar').css('width', progress + '%');
                $('#processbartxt').text(progress + '%');
            } else {
                $('#processbar').css('width', '99%');
                $('#processbartxt').text('99%');
            }
        },
        add: function (e, data) {
            for (var f in data.originalFiles) {
                if (data.originalFiles[f]['size'] > 1024 * 1024 * 40) {
                    alert(data.originalFiles[f]['name'] + '文件太大无法上传！');
                    return;
                }
            }
            if ($('#uploadprocess').css('display') == 'none') {
                $('#uploadprocess').modal('show');
                //50秒强制关闭模态框
                setTimeout(function () {
                    if ($('#uploadprocess').css('display') != 'none') {
                        $('#uploadprocess').modal('hide');
                    }
                }, 5000);
            }
            gcount++;
            data.submit();
        }
    });

    //城市	区域	大楼名称	第一联系人	联系电话	第二联系人	联系电话	楼座号	楼层	房间号	建筑面积	租金（元/平/天）	物业费	是否包含物业费	装修标准	交付日期	付款方式	房源描述	特殊备注

    /**
     * 已上传房源列表
     * @type {dataGrid}
     */
    $.fn['house_grid'] = new dataGrid();
    $("#house_grid")['house_grid'].init({
        id: 'house_grid',
        tHeadCols: [
            {field: 'houseId', title: '生成房源id', width: 150, align: 'center', sortable: false, hidden: true},
            {field: 'importResult', title: '导入房源结果', width: 150, align: 'center', sortable: false, hidden: true},
            {field: 'judgeResult', title: '校验结果', width: 150, align: 'center', sortable: false, hidden: true},
            {field: 'judgeSuccess', title: '校验是否通过', width: 150, align: 'center', sortable: false, hidden: true},

            {field: 'cityName', title: '城市', width: 150, align: 'center', sortable: false},
            {field: 'districtName', title: '区域', width: 150, align: 'center', sortable: false},
            {field: 'officeName', title: '大楼名称', width: 150, align: 'center', sortable: false},
            {field: 'investorContact', title: '第一联系人', width: 150, align: 'center', sortable: false},
            {field: 'investorContactphone', title: '联系电话1', width: 150, align: 'center', sortable: false},
            {field: 'conduitContact', title: '第二联系人', width: 150, align: 'center', sortable: false},
            {field: 'conduitContactphone', title: '联系电话2', width: 150, align: 'center', sortable: false},
            {field: 'buildingNo', title: '楼座号', width: 150, align: 'center', sortable: false},
            {field: 'floorNo', title: '楼层', width: 150, align: 'center', sortable: false},
            {field: 'houseNo', title: '房间号', width: 150, align: 'center', sortable: false},
            {field: 'houseArea', title: '建筑面积', width: 150, align: 'center', sortable: false},
            {field: 'price', title: '租金（元/平/天）', width: 150, align: 'center', sortable: false},
            {field: 'managementMoney', title: '物业费', width: 150, align: 'center', sortable: false},
            {field: 'includePropertymanagement', title: '是否包含物业费', width: 150, align: 'center', sortable: false},
            {field: 'deliverStandard', title: '装修标准', width: 150, align: 'center', sortable: false},
            {field: 'deliverDate', title: '交付日期', width: 150, align: 'center', sortable: false},
            {field: 'howpay', title: '付款方式', width: 150, align: 'center', sortable: false},
            {field: 'description', title: '房源描述', width: 150, align: 'center', sortable: false},
            {field: 'remarks', title: '特殊备注', width: 150, align: 'center', sortable: false}
        ],
        trTdentity: 'temId',
        rowNumber: true,
        tBoolPage: false,
        onload: function () {

        }
    });

});

//注入数据
var injectData = function (rows) {
    var datas = getRowsData(rows);
    if (datas.length > 0) {
        if ($("#house_grid")['house_grid'].options.data == null || $("#house_grid")['house_grid'].options.data.length == 0) {
            $("#house_grid")['house_grid'].options.data = datas;
            $("#house_grid")['house_grid'].reload();
        } else {
            $("#house_grid")['house_grid'].addData(datas);
        }
    }
}

var getRowsData = function (rows) {
    var returnData = [];
    if (rows == null || rows.length == 0) {
        return returnData;
    }
    rows = getNoRepeatOfTotalData(rows);

    for (var i = 0; i < rows.length; i++) {
        //数据bean
        var dataBean = {
            'temId': 0,
            'verify': 0,
            'isMasterStationShow': 1,
            'houseId': '',
            'accendantId': $('#accendantId').val(),
            'accendantName': $('#accendantName').val(),
            'status': 1,
            'lockflag': 0,
            'hadImported': false,
            'importResult': '',
            'hadJudged': false,
            'judgeResult': '',
            'dectId': 0,
            'judgeSuccess': '',
            'cityId': '',
            'districtId': '',
            'officeId': '',
            'investorType': '1',
            'cityName': '',
            'districtName': '',
            'officeName': '',
            'investorContact': '',
            'investorContactphone': '',
            'investorTelephone': '',
            'conduitContact': '',
            'conduitContactphone': '',
            'conduitTelephone': '',
            'buildingNo': '',
            'floorNo': '',
            'houseNo': '',
            'houseArea': '',
            'price': '',
            'monthPrice': '',
            'managementMoney': '',
            'includePropertymanagement': '',
            'deliverStandard': '',
            'houseDeliverDate': '',
            'deliverDate': '',
            'howpay': '',
            'description': '',
            'remarks': ''
        }

        //var phoneFirst = true;
        for (var item in rows[i]) {
            /*if (item == '联系电话'){
             if (phoneFirst){
             var dataProperty = excelHeaderMapBean['联系电话1'];
             dataBean[dataProperty] = rows[i][item];
             phoneFirst = false;
             }else{
             var dataProperty = excelHeaderMapBean['联系电话2'];
             dataBean[dataProperty] = rows[i][item];
             phoneFirst = false;
             }
             }else{
             var dataProperty = excelHeaderMapBean[item];
             dataBean[dataProperty] = rows[i][item];
             }*/
            var dataProperty = excelHeaderMapBean[item];
            dataBean[dataProperty] = rows[i][item];
        }
        dataBean.temId = temId++;
        returnData.push(dataBean);
    }
    return returnData;
}

//判断当前上传的某一个excel中的数据集是否有重复数据: 根据城市，区域，大楼名称，楼座号，楼层，房间号
//返回非重复数据
var getNoRepeatOfCurrentData = function (rows) {
    var noRepeatRows = [];
    var repeatIndexStr = '';
    if (rows != null && rows.length > 0) {
        for (var r = 0; r < rows.length; r++) {
            if (repeatIndexStr.indexOf(',' + r + ',') == -1) {
                noRepeatRows.push(rows[r]);
            } else {
                continue;
            }
            for (var i = 0; i < rows.length; i++) {
                if (r != i && rows[r]['城市'] == rows[i]['城市'] && rows[r]['区域'] == rows[i]['区域'] && rows[r]['大楼名称'] == rows[i]['大楼名称']
                    && rows[r]['楼座号'] == rows[i]['楼座号'] && rows[r]['楼层'] == rows[i]['楼层'] && rows[r]['房间号'] == rows[i]['房间号']) {
                    if (repeatIndexStr == '') {
                        repeatIndexStr = ',' + i + ',';
                    } else {
                        repeatIndexStr += i + ',';
                    }
                    curRepeatCount++;
                }
            }
        }
    }
    return noRepeatRows;
}

//判断所有上传的excel中是否有重复数据: 根据城市，区域，大楼名称，楼座号，楼层，房间号
//返回非重复数据
var getNoRepeatOfTotalData = function (rows) {
    rows = getNoRepeatOfCurrentData(rows);

    var noRepeatRows = [];
    if (rows.length > 0 && totalData != null && totalData.length > 0) {
        for (var r = 0; r < rows.length; r++) {
            var hasRepeat = false;
            for (var i = 0; i < totalData.length; i++) {
                if (rows[r]['城市'] == totalData[i]['城市'] && rows[r]['区域'] == totalData[i]['区域'] && rows[r]['大楼名称'] == totalData[i]['大楼名称']
                    && rows[r]['楼座号'] == totalData[i]['楼座号'] && rows[r]['楼层'] == totalData[i]['楼层'] && rows[r]['房间号'] == totalData[i]['房间号']) {
                    hasRepeat = true;
                    curRepeatCount++;
                }
            }
            if (!hasRepeat) {
                noRepeatRows.push(rows[r]);
                totalData.push(rows[r]);
            }
        }
        /*if (noRepeatRows.length > 0) {
         totalData.push(noRepeatRows);
         }*/
    } else {
        totalData = rows;
        return rows;
    }
    return noRepeatRows;
}

/**
 * 清空已上传房源列表
 */
var clearTableData = function () {
    totalData = null;
    curRepeatCount = 0;
    hasJudgedCount = 0;
    hasImportCount = 0;
    temId = 0;
    gcount = 0;
    $("#house_grid")['house_grid'].options.tHeadCols[0].hidden = true;
    $("#house_grid")['house_grid'].options.tHeadCols[1].hidden = true;
    $("#house_grid")['house_grid'].options.tHeadCols[2].hidden = true;
    $("#house_grid")['house_grid'].options.tHeadCols[3].hidden = true;
    $("#house_grid")['house_grid'].options.data = [];
    $("#house_grid")['house_grid'].reload();
}

/**
 * 导入房源前进行校验
 */
var judgeData = function () {

    if (totalData == null || totalData.length == 0) {
        alert('请先上传文件');
        return false;
    }

    timeJudge();

    $("#house_grid")['house_grid'].options.tHeadCols[2].hidden = false;
    $("#house_grid")['house_grid'].options.tHeadCols[3].hidden = false;

    $("th[name='judgeResult']").css('display', '');
    $("th[name='judgeSuccess']").css('display', '');
    $("td[name='judgeResult']").css('display', '');
    $("td[name='judgeSuccess']").css('display', '');
    var data = $("#house_grid")['house_grid'].options.data;

    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            if (data[i].hadJudged) {
                continue;
            }

            $("#house_grid")['house_grid'].options.data[i].judgeSuccess = true;
            $("#house_grid")['house_grid'].options.data[i].judgeResult = '校验成功';

            judge_info(data[i], i);

            getOfficeAddData(data[i], i);

            //是否已校验
            $("#house_grid")['house_grid'].options.data[i].hadJudged = true;
        }
    }
}

//校验联系电话、建筑面积、租金、是否包含物业、交付如期
var judge_info = function (dataBean, index) {
    var bool_judge_info = true;
    var msg = '';
    var judgeResult = '';

    if (dataBean.investorContact == null || dataBean.investorContact == '') {
        msg += '● 第一联系人不能为空</br>';
        judgeResult += '第一联系人不能为空;';
        bool_judge_info = false;
    }
    if (dataBean.investorContactphone == null || dataBean.investorContactphone == '') {
        msg += '● 第一联系人联系电话不能为空</br>';
        judgeResult += '第一联系人联系电话不能为空';
        bool_judge_info = false;
    } else {
        var re = new RegExp(/^1\d{10}$/);
        var rdPhone = new RegExp(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/);
        //不是是手机号，也不是座机号
        if (!re.test(dataBean.investorContactphone) && !rdPhone.test(dataBean.investorContactphone)) {
            msg += '● 第一联系人联系电话格式错误</br>';
            judgeResult += '第一联系人联系电话格式错误';
            bool_judge_info = false;
        } else if (rdPhone.test(dataBean.investorContactphone)) {
            $("#house_grid")['house_grid'].options.data[index].investorTelephone = dataBean.investorContactphone;
            $("#house_grid")['house_grid'].options.data[index].investorContactphone = '';
        }

        /* //不是是手机号，则是座机号
         if (!re.test(dataBean.investorContactphone)) {
         $("#house_grid")['house_grid'].options.data[index].investorTelephone = dataBean.investorContactphone;
         $("#house_grid")['house_grid'].options.data[index].investorContactphone = '';
         }*/
    }

    if (dataBean.conduitContactphone != null && dataBean.conduitContactphone != '') {
        var re = new RegExp(/^1\d{10}$/);
        var rdPhone = new RegExp(/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/);

        //不是是手机号，也不是座机号
        if (!re.test(dataBean.conduitContactphone) && !rdPhone.test(dataBean.conduitContactphone)) {
            msg += '● 第二联系人联系电话格式错误</br>';
            judgeResult += '第二联系人联系电话格式错误';
            bool_judge_info = false;
        } else if (rdPhone.test(dataBean.conduitContactphone)) {
            $("#house_grid")['house_grid'].options.data[index].conduitTelephone = dataBean.conduitContactphone;
            $("#house_grid")['house_grid'].options.data[index].investorContactphone = '';
        }
    }

    if (dataBean.houseArea == null || dataBean.houseArea == '') {
        msg += '● 建筑面积不能为空</br>';
        judgeResult += '建筑面积不能为空';
        bool_judge_info = false;
    } else {
        if (isNaN(parseFloat(dataBean.houseArea))) {
            msg += '● 建筑面积格式错误</br>';
            bool_judge_info = false;
            judgeResult += '建筑面积格式错误';
        } else {
            if (parseFloat(dataBean.houseArea).toFixed(0).length > 10) {
                msg += '● 建筑面积长度超过10位</br>';
                bool_judge_info = false;
                judgeResult += '建筑面积长度超过10位';
            } else if (parseFloat(dataBean.houseArea).toFixed(0) < 0) {
                msg += '● 建筑面积不能小于0</br>';
                bool_judge_info = false;
                judgeResult += '建筑面积不能小于0';
            } else {
                $("tr[id='" + index + "'] td[name='houseArea']").html(parseFloat(dataBean.houseArea).toFixed(2));
                $("#house_grid")['house_grid'].options.data[index].houseArea = parseFloat(dataBean.houseArea).toFixed(2);
            }

        }
    }

    if (dataBean.price == null || dataBean.price == '') {
        msg += '● 租金不能为空</br>';
        judgeResult += '租金不能为空';
        bool_judge_info = false;
    } else {
        if (isNaN(parseFloat(dataBean.price))) {
            msg += '● 租金格式错误</br>';
            judgeResult += '租金格式错误';
            bool_judge_info = false;
        } else {
            if (parseFloat(dataBean.price).toFixed(0).length > 10) {
                msg += '● 租金长度超过10位</br>';
                bool_judge_info = false;
                judgeResult += '租金长度超过10位';
            } else if (parseFloat(dataBean.price).toFixed(0) < 2) {
                msg += '● 租金应该不小2</br>';
                bool_judge_info = false;
                judgeResult += '租金应该不小2';
            } else {
                $("tr[id='" + index + "'] td[name='price']").html(parseFloat(dataBean.price).toFixed(2));
                $("#house_grid")['house_grid'].options.data[index].price = parseFloat(dataBean.price).toFixed(2);

                if (dataBean.houseArea != null || dataBean.houseArea != '') {
                    $("#house_grid")['house_grid'].options.data[index].monthPrice = (parseFloat(dataBean.price)) * 30 * (parseFloat(dataBean.houseArea));
                }
            }
        }
    }

    if (dataBean.includePropertymanagement != null || dataBean.includePropertymanagement != '') {
        if (dataBean.includePropertymanagement == '包含') {
            $("#house_grid")['house_grid'].options.data[index].includePropertymanagement = 1;
        } else {
            $("#house_grid")['house_grid'].options.data[index].includePropertymanagement = 0;
        }
    }

    if (dataBean.deliverDate == null || dataBean.deliverDate == '') {
        $("#house_grid")['house_grid'].options.data[index].deliverDate = 0;
    } else {
        if (dataBean.deliverDate == '即时') {
            $("#house_grid")['house_grid'].options.data[index].deliverDate = 0;
        } else {

            $("#house_grid")['house_grid'].options.data[index].houseDeliverDate = dataBean.deliverDate;

            var str = '';
            for (var k = 0; k < dataBean.deliverDate.length; k++) {
                if (dataBean.deliverDate[k] != '.') {
                    str += dataBean.deliverDate[k];
                } else {
                    str += ',';
                }
            }
            dataBean.deliverDate = str;

            var date = new Date(dataBean.deliverDate);
            if (date == null) {
                date = new Date(Date.parse(dataBean.deliverDate.replace(/-/g,   "/")));
            }

            if (date == null) {
                msg += '● 交付日期格式错误</br>';
                bool_judge_info = false;
                judgeResult += '交付日期格式错误';
            } else {
                if (isNaN(parseInt(date.getTime() / 1000))) {
                    msg += '● 交付日期格式错误</br>';
                    bool_judge_info = false;
                    judgeResult += '交付日期格式错误';
                } else {
                    $("#house_grid")['house_grid'].options.data[index].deliverDate = parseInt(date.getTime() / 1000);
                }
            }


        }
    }

    //校验付款方式
    if (howpayStr.indexOf(',' + dataBean.howpay + ',') == -1) {
        msg += '● 付款方式取值有误</br>';
        judgeResult += '付款方式取值有误';
        bool_judge_info = false;
    }

    //校验装修标准
    if (deliverStandardStr.indexOf(',' + dataBean.deliverStandard + ',') == -1) {
        msg += '● 装修标准取值有误</br>';
        judgeResult += '装修标准取值有误';
        bool_judge_info = false;
    }

    //基本信息校验失败
    if (!bool_judge_info) {
        $("#house_grid")['house_grid'].options.data[index].judgeSuccess = false;
        $("#house_grid")['house_grid'].options.data[index].judgeResult += judgeResult;

        $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="red">校验失败</font>');
        $("tr[id='" + index + "'] td[name='judgeResult']").html('<font color="red">' + msg + '</font>');
    }
}

//校验大楼
var getOfficeAddData = function (dataBean, index) {
    var cityId = null;

    var bool_searchOffice = true;
    var msg = '';

    if (dataBean.cityName == null || dataBean.cityName == '') {
        msg += '● 城市不能为空</br>';
        bool_searchOffice = false;
    } else {
        if (dataBean.cityName.trim() == '北京' || dataBean.cityName.trim() == '北京市') {
            cityId = 12;
        }
        else if (dataBean.cityName.trim() == '上海' || dataBean.cityName.trim() == '上海市') {
            cityId = 13;
        } else {
            msg += '● 城市错误</br>';
            bool_searchOffice = false;
        }
    }
    if (dataBean.districtName == null || dataBean.districtName == '') {
        msg += '● 区域不能为空</br>';
        bool_searchOffice = false;
    }
    if (dataBean.officeName == null || dataBean.officeName == '') {
        msg += '● 大楼名称不能为空</br>';
        bool_searchOffice = false;
    }

    //大楼基本信息校验失败
    if (!bool_searchOffice) {
        $("#house_grid")['house_grid'].options.data[index].judgeSuccess = false;
        $("#house_grid")['house_grid'].options.data[index].judgeResult = msg;

        $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="red">校验失败</font>');
        $("tr[id='" + index + "'] td[name='judgeResult']").append('<font color="red">' + msg + '</font>');
        hasJudgedCount++;
    } else {
        //查询大楼
        $.post(base + '/officeController/getOfficeAddData',
            {
                'name': dataBean.officeName.trim(),
                'cityId': cityId,
                'districtName': dataBean.districtName.trim()
            },
            function (result) {
                if (result.success) {
                    $("#house_grid")['house_grid'].options.data[index].lockflag = result.lockflag;
                    $("#house_grid")['house_grid'].options.data[index].officeId = result.officeId;

                    if ($("#house_grid")['house_grid'].options.data[index].judgeSuccess) {
                        $("#house_grid")['house_grid'].options.data[index].judgeSuccess = true;
                        $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="#28a4c9">校验通过</font>');
                    }

                    if (result.lockflag == 1) {//锁盘
                        judge_houseDict(dataBean, index, result.officeId);
                    } else {
                        hasJudgedCount++;
                    }

                } else {
                    msg = result.message + '<br/>';
                    $("#house_grid")['house_grid'].options.data[index].judgeSuccess = false;
                    $("#house_grid")['house_grid'].options.data[index].judgeResult += msg;

                    $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="red">校验失败</font>');
                    $("tr[id='" + index + "'] td[name='judgeResult']").append('<font color="red">' + msg + '</font>');

                    hasJudgedCount++;
                }
            })
    }
}

//校验房源字典
var judge_houseDict = function (dataBean, index, officeId) {
    var bool_searchHouseDict = true;
    var msg = '';

    if (dataBean.buildingNo == null || dataBean.buildingNo == '') {
        msg += '● 楼座号不能为空</br>';
        bool_searchHouseDict = false;
    }
    if (dataBean.floorNo == null || dataBean.floorNo == '') {
        msg += '● 楼层不能为空</br>';
        bool_searchHouseDict = false;
    }
    if (dataBean.houseNo == null || dataBean.houseNo == '') {
        msg += '● 房间号不能为空</br>';
        bool_searchHouseDict = false;
    }

    //房源字典信息校验失败
    if (!bool_searchHouseDict) {
        $("#house_grid")['house_grid'].options.data[index].judgeSuccess = false;
        $("#house_grid")['house_grid'].options.data[index].judgeResult = msg;

        $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="red">校验失败</font>');
        $("tr[id='" + index + "'] td[name='judgeResult']").append('<font color="red">' + msg + '</font>');
    } else {
        //查询房源字典
        $.post(base + '/houseController/selectHouseDictId',
            {
                'officeId': officeId,
                'buildingNo': dataBean.buildingNo.trim(),
                'floorName': dataBean.floorNo.trim(),
                'houseName': dataBean.houseNo.trim()
            },
            function (result) {
                hasJudgedCount++;

                if (result.success) {
                    $("#house_grid")['house_grid'].options.data[index].dectId = result.dectId;
                    if ($("#house_grid")['house_grid'].options.data[index].judgeSuccess) {
                        $("#house_grid")['house_grid'].options.data[index].judgeSuccess = true;
                        $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="#28a4c9">校验通过</font>');
                    }
                } else {
                    msg = result.message + '<br/>';
                    $("#house_grid")['house_grid'].options.data[index].judgeSuccess = false;
                    $("#house_grid")['house_grid'].options.data[index].judgeResult += msg;

                    $("tr[id='" + index + "'] td[name='judgeSuccess']").html('<font color="red">校验失败</font>');
                    $("tr[id='" + index + "'] td[name='judgeResult']").append('<font color="red">' + msg + '</font>');
                }
            })
    }
}


function timeJudge() {
    if (totalData.length == hasJudgedCount) {
        $('#btn_clean').attr('disabled', false);
        $('#importFile_btn').attr('disabled', false);
        $('#importFile_a').attr('disabled', false);
        $('#btn_judge').attr('disabled', false);

        alert("校验完成");

        $('#btn_import').css('display', '');
    }
    else {
        $('#btn_clean').attr('disabled', true);
        $('#importFile_btn').attr('disabled', true);
        $('#importFile_a').attr('disabled', true);
        $('#btn_judge').attr('disabled', true);
        setTimeout(function () {
                timeJudge()
            },
            2000)
    }
}

var beforeImportExcel = function () {
    $('#btn_import').css('display', 'none');
}

function timeImport() {
    if (totalData.length == hasImportCount) {
        $('#btn_clean').attr('disabled', false);
        $('#importFile_btn').attr('disabled', false);
        $('#importFile_a').attr('disabled', false);
        $('#btn_judge').attr('disabled', false);

        $('#btn_import').attr('disabled', false);
        $('#btn_import').css('display', 'none');


        $('#importProcessbar').css('width', '99%');
        $('#importProcessbartxt').text('100%');
        $('#importResultMsg').html('操作完成');

        setTimeout(function () {
                $('#importprocess').modal('hide');
            },
            2000)
        //alert("操作完成");
    }
    else {
        $('#btn_clean').attr('disabled', true);
        $('#importFile_btn').attr('disabled', true);
        $('#importFile_a').attr('disabled', true);
        $('#btn_judge').attr('disabled', true);

        $('#btn_import').attr('disabled', true);
        setTimeout(function () {
                timeImport()
            },
            2000)
    }
}

var updateaProgress = function () {
    var progress = parseInt(hasImportCount / totalData.length * 100, 10);
    if (progress <= 99) {
        $('#importProcessbar').css('width', progress + '%');
        $('#importProcessbartxt').text(progress + '%');
    } else {
        $('#importProcessbar').css('width', '99%');
        $('#importProcessbartxt').text('99%');
    }
}

//导入房源
var importData = function () {
    $('#importprocess').modal('show');

    hasImportCount = 0;
    timeImport();
    $("#house_grid")['house_grid'].options.tHeadCols[0].hidden = false;
    $("#house_grid")['house_grid'].options.tHeadCols[1].hidden = false;

    $("th[name='houseId']").css('display', '');
    $("th[name='importResult']").css('display', '');
    $("td[name='houseId']").css('display', '');
    $("td[name='importResult']").css('display', '');

    var data = $("#house_grid")['house_grid'].options.data;
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {

            if (data[i].hadImported) {
                hasImportCount++;
                updateaProgress();
                continue;
            }

            if (!data[i].judgeSuccess) {
                hasImportCount++;
                updateaProgress();
                continue;
            }

            ajax_import(data[i], i);

            //是否已进行导入房源
            $("#house_grid")['house_grid'].options.data[i].hadImported = true;
        }
    }
}

//导房源ajax请求
var ajax_import = function (dataBean, index) {
    var msg = '';

    $.post(base + '/houseController/addHouse',
        dataBean,
        function (result) {
            hasImportCount++;
            updateaProgress();

            //重复
            if (result.success == 're') {
                var houses = result.houses;
                var url = houseUrl + houses[0].id;

                msg = "房源重复：房源id为" + houses[0].id;
                if (houses[0].status == 31 || houses[0].status == 32 || houses[0].status == 33) {
                    msg += ", 状态为已关闭";
                    $("tr[id='" + index + "'] td[name='importResult']").html("<font color='red'>导入失败: 房源重复, 状态为已关闭, 房源id为 " + "<a onclick='window.open(\"" + url + "\")' class='unline' style='cursor:pointer;'>" + houses[0].id + "</a>" + "</font>");
                } else {
                    $("tr[id='" + index + "'] td[name='importResult']").html("<font color='red'>导入失败: 房源重复, 房源id为 " + "<a onclick='window.open(\"" + url + "\")' class='unline' style='cursor:pointer;'>" + houses[0].id + "</a>" + "</font>");
                }

                $("#house_grid")['house_grid'].options.data[index].importResult = msg;
            } else if (result.success == 'ok') {
                $("#house_grid")['house_grid'].options.data[index].houseId = result.house_id;
                $("#house_grid")['house_grid'].options.data[index].importResult = '导入成功';
                var url = houseUrl + result.house_id;
                $("tr[id='" + index + "'] td[name='houseId']").html("<a onclick='window.open(\"" + url + "\")' class='unline' style='cursor:pointer;'><font color='#28a4c9'>" + result.house_id + "</font></a>");
                $("tr[id='" + index + "'] td[name='importResult']").html('<font color="#28a4c9">导入成功</font>');
            } else {
                msg = "导入失败";
                $("#house_grid")['house_grid'].options.data[index].importResult = msg;
                $("tr[id='" + index + "'] td[name='importResult']").html("<font color='red'>导入失败</font>");
            }
        })
}

//导出
var exportData = function () {
    if (totalData == null) {
        alert("没有可导出项");
        return false;
    }
    if (totalData.length != hasJudgedCount) {
        alert("请先校验");
        return false;
    }
    if (headers == null) {
        alert("没有可导出项");
        return false;
    }
    var data = $("#house_grid")['house_grid'].options.data;
    if (data != null && data.length > 0) {
        var excelHeaders = '';
        excelHeaders += '生成房源id' + '@@@@' + '导入房源结果' + '@@@@' + '校验结果' + '@@@@' + '校验是否通过';
        for (var i = 0; i < headers.length; i++) {
            excelHeaders += '@@@@' + headers[i];
        }
        //excelHeaders.unshift('生成房源id', '导入房源结果', '校验结果', '校验是否通过');

        var exportBeanListStr = '';
        for (var i = 0; i < data.length; i++) {
            var dataBean = '';
            var exportBean = {
                'houseId': '',
                'importResult': '',
                'judgeResult': '',
                'judgeSuccess': '',
                'cityName': '',
                'districtName': '',
                'officeName': '',
                'investorContact': '',
                'investorContactphone': '',
                'conduitContact': '',
                'conduitContactphone': '',
                'buildingNo': '',
                'floorNo': '',
                'houseNo': '',
                'houseArea': '',
                'price': '',
                'managementMoney': '',
                'includePropertymanagement': '',
                'deliverStandard': '',
                'deliverDate': '',
                'howpay': '',
                'description': '',
                'remarks': ''
            };
            for (var item in exportBean) {
                exportBean[item] = data[i][item];
                if (item == 'judgeSuccess') {
                    if (exportBean[item]) {
                        exportBean[item] = '校验通过';
                    }
                    else {
                        exportBean[item] = '校验失败';
                    }

                }
                dataBean += exportBean[item] + "@@@@";
            }
            dataBean = dataBean.substring(0, dataBean.length - 4)
            exportBeanListStr += dataBean + "@#@#";
        }

        $('#headers').val(excelHeaders);
        $('#listStr').val(exportBeanListStr.substring(0, exportBeanListStr.length - 4));

        $('#exportForm').submit();
    } else {
        alert("没有可导出的数据");
        return false;
    }
}
