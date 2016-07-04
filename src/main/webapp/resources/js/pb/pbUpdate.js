var defaultOfficeid = null;
var defaultBuildingNo = null;
var defaultFloorName = null;
var defaultHouseName = null;
var first = 0;
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
            inTheSelectDepartments: false
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px',
    });

}
var personNameSelect = function (record) {
    personName_combobox_id = record.userId;
    personName_combobox_name = record.fullname;

    personId = personName_combobox_id;
}
var personNameLoadSuccess = function () {
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName').combobox('setValue', data[i].fullname);
                //$('#personName').combobox('setText', value);
                personName_combobox_id = data[i].userId;
                personName_combobox_name = value;
                personId = personName_combobox_id;
                return;
            }
        }
    }

    personId = null;
}

function customerLookData(id) {
    $("#houseType").val(id)
    var temparray = [];
    $('#fangyuan').modal('show');
    $.ajax({
        url: base + '/pborderController/customerLookData',
        type: "get",
        data: {customer: $("#customer").val()},
        success: function (data) {
            var info = {"data": data};
            info.data.forEach(function (e) {
                if ($.inArray(String(e.houseid), temparray) >= 0) {
                    e.ischeck = true;
                } else {
                    e.ischeck = false;
                }
            });
            $("#tbfollowlookhouse").html(Mustache.render($("#tablelookhousetemplate").html(), info));

        }

    })

}
var officeLoadSuccess = function () {
    var data = $('#officeNameCombox').combobox('getData');
    var value = $('#officeNameCombox').combobox('getValue');

    if (first == 0 && defaultOfficeid != null && !isNaN(defaultOfficeid)) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].id == defaultOfficeid) {
                $('#officeNameCombox').combobox('setValue', data[i].id);
                select(data[i]);
                break;
            }
        }
    }

    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].name == value.trim()) {
                $('#officeNameCombox').combobox('setValue', data[i].id);
                select(data[i]);
                break;
            }
        }
    }
}

var fenYongRen="";
$('[name="file"]').fileupload({
    dataType: 'json',
    done: function (e, data) {
        if (data.result.success == 'ok') {
            var trstr = '<tr id=tr_' + data.result.pbFiles.id + '><td>' + data.result.pbFiles.createName +
                '</td><td>' + data.result.pbFiles.filename +
                '</td><td>' + data.result.createAt + '</td>' +
                "<td><span style='color: red'>*</span><input placeholder='报单文件：如合同' type='text'  class='remark' id=" +data.result.pbFiles.id+ "/></td>" +
                '<td><button class="btn btn-danger bdorder deletefile" type="button" deleteid="' +
                data.result.pbFiles.id + '">删除</button></td></tr>';
            $('#file_table').append(trstr);
            deletePbFile();
            gcount--;
            if (gcount == 0) {
                $('#uploadprocess').modal('hide');

            }
            $('#uploadprocess').modal('hide');

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
            }, 50000);
        }
        gcount++;
        console.log(data);
        data.submit();
    }
});


$("#fixtureType").change(function () {
    if ($(this).val() == '1') {

        $("#danwei_2").hide();
        $("#danwei_1").show();
        $("#geshu_1").show();
        $("#geshu_2").hide();
    }
    else {
        $("#danwei_1").hide();
        $("#danwei_2").show();
        $("#geshu_1").hide();
        $("#geshu_2").show();
    }
});
$(function () {
    $("#coo_blank").hide();
    $("#iscooperate").change(function () {
        if ($("#iscooperate").val() == "0") {
            $("#coo_blank").hide();
        }
        else {
            $("#coo_blank").show();
        }
    })

})
$('#netRental').blur(function () {
    yongjin();
});

$('#agencyFees').blur(function () {
    yongjin();
    connect_yongjin();
});

$('#cooRentPrice').blur(function () {
    connect_yongjin()
});

$('#cooWithubanPrice').blur(function () {
    coo_yongjin();
    connect_yongjin()
});
$('#cooWithoutubanPrice').blur(function () {
    coo_yongjin();
    connect_yongjin()
});
var objJson = [];
var ids=""
$(function () {
    $("#signAt").datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',

    });
    $("#starRentAt").datepicker({
        format: 'yyyy-mm-dd',
        //todayHighlight: true,
        //todayBtn: 'linked',

    }).on("changeDate", function (e) {
        $("#endRentAt").datepicker('setStartDate', $('#starRentAt').datepicker('getDate'));
    });
    $("#endRentAt").datepicker({
        format: 'yyyy-mm-dd',
        //todayHighlight: true,
        //todayBtn: 'linked',

    }).on("changeDate", function (e) {
        $('#starRentAt').datepicker('setEndDate', $('#endRentAt').datepicker('getDate'));
    });

    $("#expecteRentAt").datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',

    });

    $("#ventureoffice").click(function () {

        $("#houseType").val($(this).attr("rd"));
    })

    $("#house_alone").click(function () {
        $("#houseType").val($(this).attr("rd"));
    })
    $("#dishang_alone").click(function () {
        $("#houseType").val($(this).attr("rd"));
    })

    $('#pbFrom')
        .formValidation({
            err: {
                container: 'tooltip'
            },
            icon: {
                valid: 'glyphicon',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            fields: {
                nocommissiontime: {
                    validators: {
                        notEmpty: {
                            message: '免租期不能为空'
                        },
                        between: {
                            max: 50,
                            min: 0,
                            message: '请输入正确项'
                        }
                    }
                },
                rentMonths: {
                    validators: {
                        notEmpty: {
                            message: '租期不能空'
                        },
                        between: {
                            max: 999,
                            min: 1,
                            message: '请输入正确项'
                        }
                    }
                },
                netRental: {
                    validators: {
                        notEmpty: {
                            message: '净租金不能为空'
                        },
                        between: {
                            max: 9999999,
                            min: 1,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }
                    }
                },
                cooWithubanPrice: {
                    validators: {
                        between: {
                            max: 9999999,
                            min: 0,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }

                    }
                },
                cooWithoutubanPrice: {
                    validators: {
                        between: {
                            max: 9999999,
                            min: 0,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }

                    }
                },
                contractPrice: {
                    validators: {
                        notEmpty: {
                            message: '合同租金不能为空'
                        },
                        between: {
                            max: 999999,
                            min: 1,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }
                    }
                },
                contractPrice: {
                    validators: {
                        notEmpty: {
                            message: '合同租金不能为空'
                        },
                        between: {
                            max: 999999,
                            min: 1,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }
                    }
                },
                managementFee: {
                    validators: {
                        notEmpty: {
                            message: '管理费(物业费等)不能为空'
                        },
                        between: {
                            max: 999999,
                            min: 0,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }
                    }
                },
                totalPrice: {
                    validators: {
                        notEmpty: {
                            message: '交易总额不能为空'
                        },
                        between: {
                            max: 999999999,
                            min: 1,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }
                    }
                },
                agencyFees: {
                    validators: {
                        notEmpty: {
                            message: '佣金不能为空'
                        },
                        between: {
                            max: 999999,
                            min: 1,
                            message: '请输入正确项'
                        },
                        regexp : {
                            regexp : /^[0-9]+(.[0-9]{1,2})?$/,
                            message : '保留两位小数'
                        }
                    }
                },
                fenyong: {
                    validators: {
                        between: {
                            max: 999999,
                            min: 0,
                            message: '请输入正确项'
                        }
                    }
                },
                draweeName: {
                    validators: {
                        notEmpty: {
                            message: '付款人不能为空'
                        },
                    }
                },

            }
        }).on('success.form.fv', function (e) {
        // Prevent form submission
        e.preventDefault();
        var fileSumit=true
        $(".fileMark").each(function(i,v){
            if($(v).val()=="" || $(v).val()==undefined )
            {
                alert("文件附件备注必须填写");
                $('#sub').removeClass("disabled")
                $('#sub').removeAttr("disabled")
                fileSumit=false;
                return false;
            }
            else
            {
                ids+=$(v).attr("id")+","+$(v).val()+";"
            }
        })
        dataStrToUnix($("#signAt"), $("[name=signAt]"));
        dataStrToUnix($("#starRentAt"), $("[name=starRentAt]"));
        dataStrToUnix($("#endRentAt"), $("[name=endRentAt]"));
        if($("#expecteRentAt").val()!="" || $("#expecteRentAt").val()!=undefined)
        {
            dataStrToUnix($("#expecteRentAt"), $("[name=expecteRentAt]"));
        }

        if($(".fenyong1").val()!="" &&　peratePerson_combobox_id1==null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong2").val()!="" && peratePerson_combobox_id2==null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong3").val()!="" &&　peratePerson_combobox_id3==null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong4").val()!="" &&　peratePerson_combobox_id4==null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong5").val()!="" &&　peratePerson_combobox_id5==null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong1").val()=="" &&　　peratePerson_combobox_id1!=null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong2").val()=="" &&　peratePerson_combobox_id2!=null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong3").val()=="" &&　peratePerson_combobox_id3!=null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong4").val()=="" &&　peratePerson_combobox_id4!=null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        if($(".fenyong5").val()=="" &&　peratePerson_combobox_id5!=null　)
        {
            alert("分佣人和分佣比例必须一一对应");
            return false;
        }
        objJson.push({"fenyong":$(".fenyong1").val(),"fenyongren":{"id": peratePerson_combobox_id1,name:peratePerson_combobox_name1}})
        objJson.push({"fenyong":$(".fenyong2").val(),"fenyongren":{"id": peratePerson_combobox_id2,name:peratePerson_combobox_name2}})
        objJson.push({"fenyong":$(".fenyong3").val(),"fenyongren":{"id": peratePerson_combobox_id3,name:peratePerson_combobox_name3}})
        objJson.push({"fenyong":$(".fenyong4").val(),"fenyongren":{"id": peratePerson_combobox_id4,name:peratePerson_combobox_name4}})
        objJson.push({"fenyong":$(".fenyong5").val(),"fenyongren":{"id": peratePerson_combobox_id5,name:peratePerson_combobox_name5}})
        $("#fenYongRen").val(JSON.stringify(objJson));
        if($("#signAt").val()==null || $("#signAt").val()=="" )
        {
            alert("签约日期必须填");
            $('#sub').removeClass("disabled")
            $('#sub').removeAttr("disabled")
            return false;
        }
        if($("#starRentAt").val()==null || $("#starRentAt").val()=="" )
        {
            alert("起租日期必须填");
            $('#sub').removeClass("disabled")
            $('#sub').removeAttr("disabled")
            return false
        }
        if($("#endRentAt").val()==null || $("#endRentAt").val()=="" )
        {
            alert("终租日期不能为空");
            $('#sub').removeClass("disabled")
            $('#sub').removeAttr("disabled")
            return false;
        }

        $("#idString").val(ids);
        if(fileSumit!=true)
        {
            return true;
        }
        $.ajax({
            type: "post",
            url: base + "/pborderController/pbUpdateFunction",
            data: $("#pbFrom").serialize(),
            success: function (data) {
                if (data.success == "ok") {
                    alert("修改成功");
                    $('#sub').addClass("disabled")
                    $('#sub').attr("disabled","disabled");
                    window.location.href=base+"/pborderController/pbAccendantOrderPage"
                }
            }
        })
    });

});

function dataStrToUnix(a, b) {
    var newstr = a.val().replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    b.val(time_str.substr(0, 10))

}

function deletePbFile() {
    $(".deletefile").click(function () {
        var id = $(this).attr("deleteid");
        $.ajax({
            type: "post",
            url: base + "/pborderController/pbFileDel",
            data: {id: id},
            success: function (data) {
                if (data.success == "ok") {
                    $("#tr_" + id).remove();
                }
            }

        })
    })

}
$(function(){
    deletePbFile();
})

function yongjin() {
    net_rental = $('#netRental').val();
    agency_fees = $('#agencyFees').val();
    if (agency_fees == '') {
        $('#ratio').val('');
    }
    else {
        var ratio = (agency_fees / net_rental * 100).toFixed(2);
        $('#ratio').val(ratio);
    }
}
function coo_yongjin() {
    coo_withuban_price = $('#cooWithubanPrice').val();
    coo_withoutuban_price = $('#cooWithoutubanPrice').val();
    if (coo_withuban_price != '' && coo_withoutuban_price != '') {
        var coo_rent_price = parseFloat(coo_withuban_price) + parseFloat(coo_withoutuban_price);
        $('#cooRentPrice').val(coo_rent_price);
    }
    else if (coo_withuban_price == '' && coo_withoutuban_price != '') {
        var coo_rent_price = coo_withoutuban_price;
        $('#cooRentPrice').val(coo_rent_price);
    }
    else if (coo_withoutuban_price == '' && coo_withuban_price != '') {
        var coo_rent_price = coo_withuban_price;
        $('#cooRentPrice').val(coo_rent_price);
    }
    else {
        $('#cooRentPrice').val('');
        $('#cooRatio').val('');
        $("#ubanRentPrice").val("");
    }
}
function connect_yongjin() {
    agency_fees = $('#agencyFees').val();
    coo_rent_price = $('#cooRentPrice').val();
    if (agency_fees != '') {
        if (coo_rent_price == '') {
            var uban_rent_price = agency_fees;
            $('#ubanRentPrice').val(uban_rent_price)
        }
        else {
            var uban_rent_price = agency_fees - coo_rent_price;
            $('#ubanRentPrice').val(uban_rent_price);
            var coo_ratio = ( coo_rent_price / agency_fees * 100).toFixed(2);
            $('#cooRatio').val(coo_ratio);
        }
    }
}

$(function () {
        if($("#iscooperate").val()=="0")
        {
            $("#coo_blank").hide();
        }
        else
        {
            $("#coo_blank").show();
        }

})

var peratePerson_combobox_id1=null;
var peratePerson_combobox_name1=null;
var peratePerson_combobox_id2=null;
var peratePerson_combobox_name2=null;
var peratePerson_combobox_id3=null;
var peratePerson_combobox_name3=null;
var peratePerson_combobox_id4=null;
var peratePerson_combobox_name4=null;
var peratePerson_combobox_id5=null;
var peratePerson_combobox_name5=null;
var personNameLoadSuccess1 = function () {
    var data = $('#personName1').combobox('getData');
    var value = $('#personName1').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName1').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id1 = data[i].userId;
                peratePerson_combobox_name1 = value;
                return;
            }
        }
    }
}
var personNameLoadSuccess2 = function () {
    var data = $('#personName2').combobox('getData');
    var value = $('#personName2').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName2').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id2 = data[i].userId;
                peratePerson_combobox_name2 = value;
                return;
            }
        }
    }
}
var personNameLoadSuccess3= function () {
    var data = $('#personName3').combobox('getData');
    var value = $('#personName3').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName3').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id3 = data[i].userId;
                peratePerson_combobox_name3 = value;
                return;
            }
        }
    }
}

var personNameLoadSuccess4= function () {
    var data = $('#personName4').combobox('getData');
    var value = $('#personName4').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName4').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id4 = data[i].userId;
                peratePerson_combobox_name4 = value;
                return;
            }
        }
    }
}

var personNameLoadSuccess5= function () {
    var data = $('#personName5').combobox('getData');
    var value = $('#personName5').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName5').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id5 = data[i].userId;
                peratePerson_combobox_name5 = value;
                return;
            }
        }
    }
}

//
//function formatItemOfPersonName(row){
//    if(row.status == 2){
//        return row.fullname;
//    }else{
//        return row.fullname+'<span style="color:#ff0000">(无效) </span>';
//    }
//
//}

var personNameSelect1 = function (record) {
    peratePerson_combobox_id1 = record.userId;
    peratePerson_combobox_name1 = record.fullname;
}

var personNameSelect2 = function (record) {
    peratePerson_combobox_id2= record.userId;
    peratePerson_combobox_name2 = record.fullname;
}

var personNameSelect3 = function (record) {
    peratePerson_combobox_id3= record.userId;
    peratePerson_combobox_name3 = record.fullname;
}
var personNameSelect4 = function (record) {
    peratePerson_combobox_id4= record.userId;
    peratePerson_combobox_name4 = record.fullname;
}

var personNameSelect5 = function (record) {
    peratePerson_combobox_id5= record.userId;
    peratePerson_combobox_name5 = record.fullname;
}


$(function(){
    $('.demo-tip-yellowsimple').poshytip({
        className: 'tip-yellowsimple',
        showTimeout: 1,
        alignTo: 'target',
        alignX: 'center',
        offsetY: 5,
        allowTipHover: true
    });

})