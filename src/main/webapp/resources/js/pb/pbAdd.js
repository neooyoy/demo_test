
var defaultOfficeid = null;
var defaultBuildingNo = null;
var defaultFloorName = null;
var defaultHouseName = null;
var first = 0;
var departmentComboxChange = function(){
    departmentComboxData = $('#departmentCombox').combobox('getData');
    var departmentIdArray = $('#departmentCombox').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0){
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");
        return;


    }else if (departmentIdArray.length > 1){
        for (var i=0; i<departmentIdArray.length; i++){
            if (departmentIdArray[i] != -1){
                departmentIds += departmentIdArray[i]+',';
            }
        }
        departmentIds = departmentIds.substring(0, departmentIds.length-1)
    }else{
        if (departmentIdArray[0] == -1){
            //var data = $('#departmentCombox').combobox('getData');
            var data = departmentComboxData;

            if (data != null && data.length > 0){
                for (var i=0; i<data.length; i++){
                    if (data[i]["deptId"] != -1){
                        departmentIds += data[i]["deptId"]+',';
                    }
                }
                departmentIds = departmentIds.substring(0, departmentIds.length-1)
            }
        }else{
            departmentIds = departmentIdArray[0];
        }
    }

    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];

    if (departmentIds == ''){
        return;
    }

    $('#departmentUserComboxTree').combotree({
        queryParams:{
            departmentIds : departmentIds,
            loop: true,
            inTheSelectDepartments:false
        },
        url:base+'/departmentController/loadDepartmentUserTreeNodes',
        method:'post',
        panelHeight: '400px',
    });

}
var personNameSelect = function(record){
    personName_combobox_id = record.userId;
    personName_combobox_name = record.fullname;

    personId = personName_combobox_id;
}
var personNameLoadSuccess = function(){
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0){
        for (var i=0; i<data.length; i++){
            if (data[i].fullname == value.trim()){
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

function customerLookData(id)
{
 $("#houseType").val(id)
    var temparray=[];
    $('#fangyuan').modal('show');
    $.ajax({
        url:base+'/pborderController/customerLookData',
        type:"get",
        data:{customer:$("#customer").val()},
        success:function(data){
            var info={"data":data};
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

    if (first == 0 && defaultOfficeid != null && !isNaN(defaultOfficeid)){
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

$(function () {
    var cityId = $("#cityIds").val();
    var data = [];
    var cityName = '';
    var cityIds = '';
    var cityArray = cityId.split(',');
    for (var i=0; i<cityArray.length; i++){
        cityName = getCityName(cityArray[i]);
        if (cityName != ''){
            cityIds += cityArray[i] + ",";
            data.push({'id': cityArray[i], 'name': cityName});
        }
    }
    cityIds = cityIds.substring(0, cityIds.length-1);
    if (cityIds != ''){
        // 拼接函数(索引位置, 要删除元素的数量, 元素)
        data.splice(0, 0, {'id': "", 'name': '全部'})
    }

    /**
     * 生成城市-分布-商圈公共控件
     */
    initCityDistrictBusinessCircle(data, "city_combox_fangyuan", "district_combox_fangyuan", "businesscircle_combox_fangyuan");


    $.fn['building_grid'] = new dataGrid();
    var gridOptions = getDataGridOptions("building_grid");
    $("#building_grid")['building_grid'].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth : gridOptions.width,
        tBoolCheckbox: true,
        pageSize: gridOptions.pageSize,
        isOverWriteThclick: true,
        params: getHouseGridParams1(),
        onload:function(){
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        tBodyTrDblclickCallBack: function (record) {
            var url = base + "/houseController/houseModify?id=" + record["id"];
            window.open(url, record["id"]);
        },
        _handleTbodyTrClick: function(record){
        },
        thClickCallback: function(orderField){
            order = orderField;
            $("#building_grid")['building_grid'].reload({
                params: getHouseGridParams1()
            });
        }
    });

});



var houseArryList=[];
var chuangYe=[];
var changyeCount=1;
var dudobgCount=1;
var duDong=[];
var dishangCount=1;
var diShang=[];
var ids="";
var xieZiLou="";
var gcount = 0;
$('[name="file"]').fileupload({
    dataType: 'json',
    done: function (e, data) {
        if (data.result.success == 'ok') {
            var trstr = '<tr id=tr_' + data.result.pbFiles.id + '><td>' + data.result.pbFiles.createName +
                '</td><td>' + data.result.pbFiles.filename +
                '</td><td>' + data.result.createAt + '</td>' +
                "<td><span style='color: red'>*</span><input style='width: 200px' class='remark' placeholder='附件备注：如合同' type='text' required  class='investorsource' id='"+data.result.pbFiles.id +"'/></td>" +
                '<td><button class="btn btn-danger bdorder deletefile" type="button" deleteid="' +
                data.result.pbFiles.id + '">删除</button></td></tr>';
            $('#file_table').append(trstr);
            gcount--;
            if (gcount == 0) {
                $(".deletefile").click(function () {
                    var deleteid = $(this).attr("deleteid");
                    $('#tr_' + deleteid).remove()
                });
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
function addHouse() {
    var houseArry=[];
    var houseQ=[]
    $("#ventureoffice").attr("disabled","disabled");
    $("#house_alone").attr("disabled","disabled");
    $("#dishang_alone").attr("disabled","disabled");
    $("input:checkbox").each(function (i, v) {
        if ($(v).is(":checked") == true) {
            houseArry.push($(v).parent().next().text());

        }

    })

    for (var i = 0; i <= houseArry.length; i++) {
        if (houseQ.indexOf(houseArry[i]) == -1 && houseArry[i] != "房源编号" && houseArry[i] != undefined) {
            houseQ.push(houseArry[i])
        }
    }
    if(houseQ.length==0)
    {
        alert("没有选择房源");
        return false;
    }
    var houseType = $("#houseType").val();
    $.ajax({
        url: base + "/pborderController/dealPbHouse",
        type: "get",
        datatype: "json",
        data: {"houseQ": houseQ, "houseType": houseType},
        success: function (data) {
            if (data.success == "ok" && data.houseType == 1) {
                if ($("#xzl").html() == undefined) {
                    $("#xiezilou").append("<thead>" + "<tr>" + " <th>房源编号</th>"
                        + "<th>房源类型</th>" +
                        "<th>大楼名称</th>" +
                        "<th>面积</th>" +
                        "<th>价格（单价/总价）</th>" +
                        "<th>业主来源</th>" +
                        "<th>业主类型</th>" +
                        "<th>房源详情</th>" +
                        "<th>删除</th>" +
                        "</tr>" + "</thead>" +
                        "<tbody id='xzl'>" +
                        "</tbody>"
                    )
                }

                for (var i = 0 in data.data) {
                    if(data.data[i].investorType==1) {
                        $("#xzl").append("<tr id=tr_" + data.data[i].id + ">" +
                            "<td><input type='hidden' value=" + data.data[i].id + " class='hidbaodanhouseid'>" + data.data[i].id + "</td>" +
                            "<td>写字楼</td>" +
                            "<td>" + data.data[i].officeName + "</td>" +
                            "<td>" + data.data[i].houseArea + "</td>" +
                            "<td>" + data.data[i].price + "/" + data.data[i].monthPrice + "</td>" +
                            "<td><span style='color: red'>*</span><input style='width: 200px' placeholder='报单房源的业主来源“如：朋友推荐' type='text' required  class='investorsource' houseid=" + data.data[i].id + "  name='investorsource_" + data.data[i].id + " id='investorsource_" + data.data[i].id + "/></td>" +
                            "<td>大业主</td>" +
                            " <td><a target='_blank' class='btn btn-default' href='/crm/houseController/houseModify?id=" + data.data[i].id + "'>房源详情</a></td>" +
                            "<td><input type='button' value='删除' id='delxiezilou'   onclick='removeAttr("+data.data[i].id+")';  class='btn btn-default'></td>" +
                            "</tr>"
                        )
                    }
                        else
                        {
                            $("#xzl").append("<tr id=tr_" + data.data[i].id + ">" +
                                "<td><input type='hidden' value=" + data.data[i].id + " class='hidbaodanhouseid'>" + data.data[i].id + "</td>" +
                                "<td>写字楼</td>" +
                                "<td>" + data.data[i].officeName + "</td>" +
                                "<td>" + data.data[i].houseArea + "</td>" +
                                "<td>" + data.data[i].price + "/" + data.data[i].monthPrice + "</td>" +
                                "<td><input placeholder='报单房源的业主来源“如：朋友推荐' type='text' required  class='investorsource' houseid=" + data.data[i].id + "  name='investorsource_" + data.data[i].id + " id='investorsource_" + data.data[i].id + "/></td>" +
                                "<td>小业主</td>" +
                                " <td><a target='_blank' class='btn btn-default' href='/crm/houseController/houseModify?id=" + data.data[i].id + "'>房源详情</a></td>" +
                                "<td><input type='button' value='删除' id='delxiezilou'  onclick='removeAttr("+data.data[i].id+")'; class='btn btn-default'></td>" +
                                "</tr>"
                            )
                        }
                    }
                }
            $("#fangyuan").modal("hide");
        }


    })

}

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



function chuangYe_House()
{   if($("#chuangyeofficeName").val()=="" || $("#chuangyeadress").val()=="" || $("#chuangyefixturePrice").val()=="" || $("#changyefixtureGeshu").val()=="" ||  $("#changyeinvestorsource").val()==""  )
     {
        alert("注意字段带*的为必填");
        return false;
     }
    $("#chuangyebangogn").modal('hide');
    $("#btnfangyuan").attr("disabled","disabled");
    $("#house_alone").attr("disabled","disabled");
    $("#dishang_alone").attr("disabled","disabled");
    if ($("#xzl").html() == undefined) {
        $("#xiezilou").append("<thead>"+"<tr>"+
        "<th>房源类型</th>" +
            "<th>大楼名称</th>" +
            "<th>地址</th>" +
            "<th>成交面积</th>" +
            "<th>成交单价</th>" +
            "<th>业主来源</th>" +
            "<th>具体描述</th>" +
            "<th>删除</th>" +
            "</tr>" + "</thead>" +
            "<tbody id='xzl'>" +
            "</tbody>"
        )
    }
    $("#xzl").append("<tr id=c_" +changyeCount+ ">" +
        "<td> 创业办公</td>" +
        "<td>" + $('#chuangyeofficeName').val()+ "</td>" +
        "<td>" + $('#chuangyeadress').val() + "</td>" +
        "<td>"+ $('#chuangyefixturePrice').val()+"</td>" +
        "<td>"+ $('#changyefixtureGeshu').val()+"</td>" +
        "<td>"+ $("#changyeinvestorsource").val()+"</td>" +
        "<td>"+ $('#changyedescribe').val()+"</td>" +
        "<td><input type='button' value='删除' id='delxiezilou'  onclick='removeCy("+changyeCount+")'  class='btn btn-default'></td>" +
        "</tr>"
    )
    chuangYe.push("c_"+changyeCount,",", $('#chuangyeofficeName').val(),",",$('#chuangyeadress').val(),",",$('#chuangyefixturePrice').val(),",",$('#changyefixtureGeshu').val(),",",$("#changyeinvestorsource").val(),",",$('#changyedescribe').val(),";");
    changyeCount+=1;


}

function dudong_House()
{
    if($("#dudongofficeName").val()=="" || $("#dudonglocation").val()=="" || $("#dudongarea").val()=="" || $("#dudongprice").val()=="" ||  $("#dudonginvestorsource").val()==""  )
    {
        alert("注意字段带*的为必填");
        return false;
    }

    $('#dudongfangyuan').modal('hide');
    $("#btnfangyuan").attr("disabled","disabled");
    $("#ventureoffice").attr("disabled","disabled");
    $("#dishang_alone").attr("disabled","disabled");
    if ($("#xzl").html() == undefined) {
        $("#xiezilou").append("<thead>"+"<tr>"+
            "<th>房源类型</th>" +
            "<th>大楼名称</th>" +
            "<th>地址</th>" +
            "<th>成交面积</th>" +
            "<th>成交单价</th>" +
            "<th>业主来源</th>" +
            "<th>具体描述</th>" +
            "<th>删除</th>" +
            "</tr>" + "</thead>" +
            "<tbody id='xzl'>" +
            "</tbody>"
        )
    }
    $("#xzl").append("<tr id=d_" +dudobgCount+ ">" +
        "<td> 独栋</td>" +
        "<td>" + $('#dudongofficeName').val()+ "</td>" +
        "<td>" + $('#dudonglocation').val() + "</td>" +
        "<td>"+ $('#dudongarea').val()+"</td>" +
        "<td>"+ $('#dudongprice').val()+"</td>" +
        "<td>"+ $('#dudonginvestorsource').val()+"</td>" +
        "<td>"+ $('#dudongdescription').val()+"</td>" +
        "<td><input type='button' value='删除' id='delxiezilou'  onclick='removeDd("+dudobgCount+")'  class='btn btn-default'></td>" +
        "</tr>"
    )
    duDong.push("d_"+dudobgCount,",",$('#dudongofficeName').val(),",",$('#dudonglocation').val(),",",$('#dudongarea').val(),",", $('#dudongprice').val(),",",$('#dudonginvestorsource').val(),",",$('#dudongdescription').val(),";");
    dudobgCount++;
}

function dishang_House()
{
    if($("#dishangofficeName").val()=="" || $("#dishanglocation").val()=="" || $("#dishangarea").val()=="" || $("#dishangprice").val()=="" ||  $("#dishanginvestorsource").val()==""  )
    {
        alert("注意字段带*的为必填");
        return false;
    }
    $('#dishangfangyuan').modal('hide');
    $("#btnfangyuan").attr("disabled","disabled");
    $("#ventureoffice").attr("disabled","disabled");
    $("#house_alone").attr("disabled","disabled");
    if ($("#xzl").html() == undefined) {
        $("#xiezilou").append("<thead>"+"<tr>"+
            "<th>房源类型</th>" +
            "<th>大楼名称</th>" +
            "<th>地址</th>" +
            "<th>成交面积</th>" +
            "<th>成交单价</th>" +
            "<th>业主来源</th>" +
            "<th>具体描述</th>" +
            "<th>删除</th>" +
            "</tr>" + "</thead>" +
            "<tbody id='xzl'>" +
            "</tbody>"
        )
    }
    $("#xzl").append("<tr id=ds_" +dishangCount+ ">" +
        "<td> 底商，商铺</td>" +
        "<td>" + $('#dishangofficeName').val()+ "</td>" +
        "<td>" + $('#dishanglocation').val() + "</td>" +
        "<td>"+ $('#dishangarea').val()+"</td>" +
        "<td>"+ $('#dishangprice').val()+"</td>" +
        "<td>"+ $('#dishanginvestorsource').val()+"</td>" +
        "<td>"+ $('#dishangdescription').val()+"</td>" +
        "<td><input type='button' value='删除' id='delxiezilou'  onclick='removeDs("+dishangCount+")'  class='btn btn-default'></td>" +
        "</tr>"
    )
    diShang.push("ds_"+dishangCount,",",$('#dishangofficeName').val(),",",$('#dishanglocation').val(),",",$('#dishangarea').val(),",", $('#dishangprice').val(),",",$('#dishanginvestorsource').val(),",",$('#dishangdescription').val(),";");
    dishangCount++;
}


$(function () {
    $("#coo_blank").hide();
    $("#iscooperate").change(function(){
        if($("#iscooperate").val()=="0")
        {
            $("#coo_blank").hide();
        }
        else
        {
            $("#coo_blank").show();
        }
    })

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

    $("#ventureoffice").click(function(){

        $("#houseType").val($(this).attr("rd"));
    })

    $("#house_alone").click(function(){
        $("#houseType").val($(this).attr("rd"));
    })
    $("#dishang_alone").click(function(){
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
                            max: 100,
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
        var isSubmit = true;
        var isfileSumit=true;
        dataStrToUnix($("#signAt"),$("[name=signAt]"));
        dataStrToUnix($("#starRentAt"),$("[name=starRentAt]"));
        dataStrToUnix($("#endRentAt"),$("[name=endRentAt]"));
        if($("#expecteRentAt").val()!=="")
        {
            dataStrToUnix($("#expecteRentAt"),$("[name=expecteRentAt]"));
        }

        if($("#xiezilou").html()==undefined || $("#xiezilou").html().trim()=="")
        {
            alert("没有选择房源");
            return false;
        }
        $("#chuangYe").val(chuangYe.join(""));
        $("#duDong").val(duDong.join(""));
        $("#diShang").val(diShang.join(""));
        $("#fenYongRen").val(objJson);
        $(".investorsource").each(function(i,v){
            if($(v).val()=="" || $(v).val()==undefined)
            {
                alert("写字楼业主来源必须填");
                $('#sub').removeClass("disabled");
                $('#sub').removeAttr("disabled");
                isSubmit = false;
                return false;
            }
            else
            {
                xieZiLou+=$(v).attr("houseid")+","+$(v).val()+";"
            }
        });
        $("#xieZiLouStr").val(xieZiLou);
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
        if($("#customerCompany").val()==null || $("#customerCompany").val()=="" )
        {
            alert("客户公司必须填写");
            $('#sub').removeClass("disabled")
            $('#sub').removeAttr("disabled")
            return false;
        }
        else
        {
            $("#customerCompanyV").val($("#customerCompany").val());
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

        if (isSubmit != true)
        {
            return false;
        }


        objJson.push({"fenyong":$(".fenyong1").val(),"fenyongren":{"id": peratePerson_combobox_id1,name:peratePerson_combobox_name1}})
        objJson.push({"fenyong":$(".fenyong2").val(),"fenyongren":{"id": peratePerson_combobox_id2,name:peratePerson_combobox_name2}})
        objJson.push({"fenyong":$(".fenyong3").val(),"fenyongren":{"id": peratePerson_combobox_id3,name:peratePerson_combobox_name3}})
        objJson.push({"fenyong":$(".fenyong4").val(),"fenyongren":{"id": peratePerson_combobox_id4,name:peratePerson_combobox_name4}})
        objJson.push({"fenyong":$(".fenyong5").val(),"fenyongren":{"id": peratePerson_combobox_id5,name:peratePerson_combobox_name5}})
         $("#fenYongRen").val(JSON.stringify(objJson));
        $(".remark").each(function(i,v){
            if($(v).val()=="" || $(v).val()==undefined )
            {
                alert("文件附件备注必须填写")
                $('#sub').removeClass("disabled")
                $('#sub').removeAttr("disabled")
                isfileSumit=false;
                return false;
            }
            else
            {
                ids+=$(v).attr("id")+","+$(v).val()+";"
            }
        });
        if(isfileSumit!=true)
        {
            return false;
        }
        $("#idString").val(ids);
        $.ajax({
            type:"post",
            url:base+"/pborderController/createPb",
            data:$("#pbFrom").serialize(),
            success:function(data)
            {
                if (data.success=="ok")
                {
                    alert("申请成功");
                    $('#sub').addClass("disabled")
                    $('#sub').attr("disabled","disabled");
                    window.location.href=base+"/pborderController/pbAccendantOrderPage"
                }
            }
        })
    });

});

function  dataStrToUnix(a,b)
{
    var newstr = a.val().replace(/-/g,'/');
    var date =  new Date(newstr);
    var time_str = date.getTime().toString();
    b.val(time_str.substr(0, 10))

}

function  removeAttr(id)
{
    $("#tr_"+id).remove();
}

function  removeCy(id)
{
    $("#c_"+id).remove();
    var a=chuangYe.indexOf("c_"+id);
    var b=0
    for(var i=a;i<=chuangYe.length;i++)
    {
        if(chuangYe[i]==";")
        {
            b=i;
        }
    }
    chuangYe.splice(a,b-a+1);

}

function  removeDd(id)
{
    $("#d_"+id).remove();
    var a=duDong.indexOf("d_"+id);
    var b=0
    for(var i=a;i<=duDong.length;i++)
    {
        if(duDong[i]==";")
        {
            b=i;
        }
    }
    duDong.splice(a,b-a+1);

}

function removeDs(id) {
    $("#ds_" + id).remove();
    var a = diShang.indexOf("ds_"+id);
    var b = 0
    for (var i = a; i <= diShang.length; i++) {
        if (diShang[i] == ";") {
            b = i;
        }
    }
    diShang.splice(a, b - a + 1);
}


$(function(){
    if($("#fixtureType").val()=="1")
    {
        $("#danwei_1").show();
        $("#danwei_2").hide();
    }
    if($("#fixtureType").val()==2)
    {
        $("#danwei_1").hide();
        $("#danwei_2").show();
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