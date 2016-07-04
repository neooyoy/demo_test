var grid_id = "businessportchecklist";
var queryUrl = base + '/businessportController/businessportchecklist';
var order = 'create_at';
var peratePerson_combobox_id = null;
var peratePerson_combobox_name = null;
var newperatePerson_combobox_id = null;
var newperatePerson_combobox_name = null;
var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;

var columns = [
    {field: 'accendantName', title: '申请人', width: 150, align: 'center', sortable: false},
    {field: 'depart', title: '组别', width: 150, align: 'center', sortable: false},
    {field: 'jobfunction', title: '岗位职责', width: 150, align: 'center', sortable: false},
    {field: 'phone', title: '手机号', width: 150, align: 'center', sortable: false},
    {field: 'target', title: '申请端口', width: 150, align: 'center', sortable: false},
    {field: 'type', title: '申请类型', width: 150, align: 'center', sortable: false, convert: typeCheck},
    {field: 'targetUsername', title: '已有端口账号', width: 150, align: 'center', sortable: false},
    {field: 'priceStr', title: '充值金额', width: 150, align: 'center', sortable: false},
    {field: 'createDate', title: '申请时间', width: 150, align: 'center', sortable: false },
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

var lookReason = function(reason1){
    $("#lookReason").modal('show');
    $("#reason1").html(reason1);
};

/**
 * 操作
 */
function renderOfOrderOperate(record, value) {
    var ret = '<button type="button" value="审核" class="btn btn-blue" style="margin:0 auto" onclick=Check("'
        + record.id + '","'
        + record.accendantName + '","'
        + record.depart + '","'
        + record.jobfunction + '","'
        + record.target + '","'
        + record.targetUsername + '","'
        + record.price + '","'
        + record.targetVersion + '","'
        + record.type + '")>审核</button>';
    if (record.status == 3) {
        var newBtn = '&nbsp;<button type="button" ' +
            'value="查看原因" ' +
            'class="btn btn-blue" ' +
            'style="margin:0px auto" ' +
            'onclick=lookReason(' + "'" + record.systemresourceReason1 + "'" + ')>查看原因</button>';
        return ret + newBtn;
    }
    return ret;
}

function handle(obj) {
    alert(obj.getParent());
}

function typeCheck(type) {
    if (!type) {
        return '';
    } else if(type == 1){
        return "新开端口";
    } else if(type == 2){
        return "端口充值";
    }
}
function statusValue(status) {
    if(status == 0) {
        return '待审核';
    } else if(status == 1) {
        return '通过';
    } else if(status == 2) {
        return '不通过';
    } else if(status == 3) {
        return '待确认';
    }else {
        return '';
    }
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
    var endTimeNum = 86400;
    var target = $('#target').val();
    var phone = $('#phone').val();
    var type = $('#type').val();
    var create_atBegin = $('#create_atBegin').val();
   var create_atEnd=$('#create_atEnd').val();
    
//    alert("create_atBegin=="+create_atBegin);
//    if (create_atBegin != null && create_atBegin !=''){
//        var begintime = new Date(create_atBegin.replace(/-/g, ','));
//        create_atBegin = parseInt(begintime.getTime()/1000);
//    }

//    alert("create_atEnd=="+create_atEnd);
//    if (create_atEnd != null && create_atEnd !=''){
//        var endtime = new Date(create_atEnd.replace(/-/g, ','));
//        create_atEnd = parseInt(endtime.getTime()/1000) + endTimeNum;
//    }
   var personName=$("input[name='personName']").val();
    var accendant_id = null;
    if (peratePerson_combobox_id != null) {
        accendant_id = peratePerson_combobox_id;
    } else {
        $('#personName').combobox('setValue', '');
    }//条件置空
    if(personName==null||personName==''){
 	   accendant_id=null;
 	   $("#accendantId").val(null);
 }
    var params = {
        'target': target,
        'phone': phone,
        'type': type,
        'createAtBegin': create_atBegin,
        'createAtEnd': create_atEnd,
        "accendantId": accendant_id,
        "status":$('#status').val()
    }
    return params;
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
    peratePerson_combobox_id = null;
    peratePerson_combobox_name = null;
    $("#accendantId").val(null);
    create_id = null;
    $('#target').val(null);
    $('#phone').val(null);
    $('#type').val(null);
    $('#create_atBegin').val(null);
    $('#create_atEnd').val(null);
    $('#personName').combobox('setValue', '');
    search();

}

var ChangeSourcePhone = function (sourceName, using, vircode, sourcePhone, id, deptlist) {
    $('#changesourcephonemodal').modal('show');
    $("#username_modal").text(sourceName);
    $("#vircode_modal").text(vircode);
    $("#using_modal").text(using);
    $("#deptlist_modal").text(deptlist);
    $("#userphone_modal").val(sourcePhone);
    $("#savedata").val(id);

}
var Check = function (id, accendantName, depart, jobfunction, target, targetUsername, price , targetVersion, type) {
    $("#id").val(id);
    if (type == 1){
        $('#targetcheckmodal').modal('show');
        $("#username_targetmodal").text(accendantName);
        $("#deptlist_targetmodal").text(depart);
        $("#jobfunction_targetmodal").text(jobfunction);
        $("#target_targetmodal").text(target);
        $("#targetusername_targetmodal").text(targetUsername);
        $("#targetversion_targetmodal").text(targetVersion);

    }else{
        $('#pricecheckmodal').modal('show');
        $("#username_modal").text(accendantName);
        $("#deptlist_modal").text(depart);
        $("#jobfunction_modal").text(jobfunction);
        $("#target_modal").text(target);
        $("#targetusername_modal").text(targetUsername);
        $("#price_modal").text(price);
    }
}
$('input:radio[name="rechargetype"]').change( function(){
    $(".disable").attr("disabled",true);
    $(this).nextAll('input').attr("disabled", false);
});
$('input:radio[name="opentype"]').change( function(){
    $(".disable_target").attr("disabled",true);
    $(this).nextAll('input').attr("disabled", false);
});
$("#twoGroup").change( function(){
    $("#content1").attr("disabled", false);
});

var RechargeCheck = function () {
    var id = parseInt($("#id").val());
    var status = $('input:radio[name="rechargetype"]:checked').val();
    var systemresourcereason1 = $("#text"+status).val();
    var actualAmount=$("#actualAmount").val();
    if(status == 2 || status == 3 ){
        if(systemresourcereason1==null || systemresourcereason1==""){
            alert("请输入原因！")
            return false;
        }
    }
    if(status==1){
    	if(actualAmount==null||actualAmount==""){
    		alert("请输入充值金额！");
    		return false;
    		
    	}
    }
    $.ajax({
        url: base + '/businessportController/pricecheck',
        type: 'post',
        data: {id: id, status: status, systemresourceReason1: systemresourcereason1,actualAmount:actualAmount},
        success: function (data) {
            if (data.success == 'ok') {
                alert('审批成功！');
                $('#pricecheckmodal').modal('hide');
                $("#" + grid_id)[grid_id].reload({
                    params: getGridParams()
                });
                clearModal()
            } else {
                return false;
            }
        }
    });
};

var clearModal = function (){
    $("[name=clearModal]")[0].reset();
}

var TargetCheck = function () {
    var id = parseInt($("#id").val());
    var status = $('input:radio[name="opentype"]:checked').val();
    var systemresourcereason1 = $("#content"+status).val();
    if(status == 1){
        var open_target_username = $("#open_target_username").val();
        if(open_target_username==null || open_target_username==""){
            alert("请输入账号！");
            return false;
        }
    }else{
        if(systemresourcereason1==null || systemresourcereason1==""){
            alert("请输入原因！");
            return false;
        }
        var open_target_username = "";
    }
    $.ajax({
        url: base + '/businessportController/targetcheck',
        type: 'post',
        data: {id: id, status: status, systemresourceReason1: systemresourcereason1, open_target_username: open_target_username},
        success: function (data) {
            if (data.success == 'ok') {
                alert('审批成功！');
                $('#targetcheckmodal').modal('hide');
                $("#" + grid_id)[grid_id].reload({
                    params: getGridParams()
                });
                clearModal()
            } else {
                return false;
            }
        }
    });
};

var targetCloseModal = function () {
    $('#targetcheckmodal').modal('hide');
    clearModal();
}

var CloseModal = function () {
    $('#pricecheckmodal').modal('hide');
    clearModal();
}

$(function () {
    $("input").bind('keypress',function(event){
        if(event.keyCode == "13")
        {
            search();
        }
    });

    $('select').bind('change',function(){
        search();
    });

    $("#btn_clean").on("click", function () {
        $("#form")[0].reset();
        peratePerson_combobox_id = null;
        $("#accendantId").val(null);
        orderPerson_combobox_id = null;
        search();
    });
    $('#create_atBegin').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('#create_atEnd').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
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

            if (orderField = 'operateAt') {
                order = 'operateAt'
            } else if (orderField = 'vircode') {
                order = 'vircode'
            } else {
                return;
            }

            $("#" + grid_id)[grid_id].reload({
                params: getGridParams()
            });
        }
    });
});


var personNameSelect = function (record) {
    peratePerson_combobox_id = record.userId;
    $("#accendantId").val(record.userId);
    peratePerson_combobox_name = record.fullname;
}

var newpersonNameSelect = function (record) {
    $.ajax({
        url: base + '/virtualphoneController/selecuserdeptlist',
        type: 'post',
        data: {userId: record.userId},
        success: function (data) {
            if (data.success == 'ok') {
                $("#new_userphone_modal").val(data.cellphone);
                $("#new_usercity_modal").val(data.cityname);
                $("#new_deptlist_modal").text(data.deptlistname);
            }
        }
    });
    newperatePerson_combobox_id = record.userId;
    newperatePerson_combobox_name = record.fullname;
}

var personNameLoadSuccess = function () {
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id = data[i].userId;
                $("#accendantId").val(data[i].userId);
                peratePerson_combobox_name = value;
                return;
            }
        }
    }
}

var backCheckLog = function(){
    window.open(base + "/businessportController/businessportchecklog")
};
