var grid_id = "virtuallist";
var queryUrl = base + '/virtualphoneController/virtualphonelist';
var order = 'operateat';

var peratePerson_combobox_id = null;
var peratePerson_combobox_name = null;
var newperatePerson_combobox_id = null;
var newperatePerson_combobox_name = null;
var myreg = /^1\d{10}$/g;

var columns = [
    {field: 'sourceName', title: '员工姓名', width: 150, align: 'center', sortable: false},
    {field: 'deptlist', title: '组别', width: 150, align: 'center', sortable: false},
    {field: 'jobfunction', title: '岗位职责', width: 150, align: 'center', sortable: false},
    {field: 'sourcePhone', title: '绑定手机号', width: 150, align: 'center', sortable: false},
    {field: 'virCode', title: '虚拟号', width: 150, align: 'center', sortable: false},
    {field: 'city', title: '城市', width: 150, align: 'center', sortable: false},
    {field: 'using', title: '虚拟号用途', width: 150, align: 'center', sortable: false},
    {field: 'operateAtStr', title: '绑定时间', width: 150, align: 'center', sortable: false},
    {field: 'operator', title: '绑定人', width: 150, align: 'center', sortable: false},
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
 * 操作
 */
function renderOfOrderOperate(record, value) {
    var ret = '<button type="button" value="修改手机" class="btn btn-blue" style="margin:0 auto" onclick=ChangeSourcePhone("' + record.sourceName + '","' + record.using + '","' + record.virCode + '","' + record.sourcePhone + '","' + record.id + '","' + record.deptlist + '")>修改手机</button>&nbsp;';
    ret += '<button type="button" value="解除绑定" class="btn btn-blue" style="margin:0 auto" onclick=RemoveVirCode("' + record.id + '","' + record.virCode +'")>解除绑定</button>';
    return ret;
}

function handle(obj) {
    alert(obj.getParent());
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
    var city = $('#city').val();
    var sourcePhone = $('#userphone').val();
    var virCode = $('#virtualphone').val();
    var usring = $('#usring').val();
    var userstatus = $('#userstatus').val();

    var sourceId = null;
    var sourceName = '';
    if (peratePerson_combobox_id == $('#personName').combobox('getValue')) {
        sourceId = peratePerson_combobox_id;
    } else {
        sourceName = $('#personName').combobox('getText')
    }

    var params = {
        'city': city,
        'sourcePhone': sourcePhone,
        'virCode': virCode,
        'using': usring,
        "sourceName": sourceName,
        "sourceId": sourceId,
        "userstatus": userstatus
    }

    return params;
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
    peratePerson_combobox_id = null;
    peratePerson_combobox_name = null;
    orderPerson_combobox_id = null;
    sourceId = null;
    $('#city').val(null);
    $('#userphone').val(null);
    $('#virtualphone').val(null);
    $('#usring').val(null);
    $('#personName').val(null);
    $('#userstatus').val(null);
    $('#personName').combobox('setValue', '');
    $("#sourceId").val(null);
    $("#sourceName").val(null);
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
var createGwVircode = function () {
    newperatePerson_combobox_id = null;
    newperatePerson_combobox_name = null;
    $('#personName_modal').combobox('setValue', '');
    $("#new_userphone_modal").val('');
    $("#new_usercity_modal").val('');
    $("#new_deptlist_modal").text('');
    $('#creategwvircodemodal').modal('show');
}

var UpdatesourcePhone = function () {
    var id = parseInt($("#savedata").val());
    var sourcephone = parseInt($("#userphone_modal").val());
    var using = $("#using_modal").text();
    var vircode = $("#vircode_modal").text();
    if(sourcephone == vircode){
        alert("修改的手机号不能与虚拟号相同！");
        return false;
    }
    if(!(/^1\d{10}$/g.test(sourcephone)))
    {
        alert('请输入有效的手机号码！');
        return false;
    }
    $.ajax({
        url: base + '/virtualphoneController/updatesourcephone',
        type: 'post',
        data: {id: id, sourcePhone: sourcephone, using: using},
        success: function (data) {
            if (data.success == 'repeat') {
                alert('该手机号已绑定其他虚拟号用途！')
            } else {
                alert('修改成功！');
                $('#changesourcephonemodal').modal('hide');
                $("#" + grid_id)[grid_id].reload({
                    params: getGridParams()
                });
            }

        }
    });
}

var RemoveVirCode = function (id, vircode) {
    if(confirm("确定要解除绑定吗？")){
        $.ajax({
            url: base + '/virtualphoneController/removevircode',
            type: 'post',
            data: {id: id, virCode: vircode},
            success: function (data) {
                if (data.success == 'repeat') {
                    alert('该手机号已绑定其他虚拟号用途！')
                } else {
                    alert('解绑成功！');
                    $("#" + grid_id)[grid_id].reload({
                        params: getGridParams()
                    });
                }

            }
        });
    }
}

var CreateGwVircode = function () {
    if(newperatePerson_combobox_id=='' || newperatePerson_combobox_id==null){
        alert('顾问人员请通过控件选择获取！');
        return false;
    }
    if(!(/^1\d{10}$/g.test($("#new_userphone_modal").val())))
    {
        alert('请输入有效的手机号码！');
        return false;
    }
    if($("#new_usring").val()=='' || $("#new_usring").val()==null){
        alert('请选择虚拟号用途！');
        return false;
    }
    if(confirm("确定要给该用户分配虚拟号吗？")){
        $.ajax({
            url: base + '/virtualphoneController/creategwvircode',
            type: 'post',
            data: {
                sourcePhone: $("#new_userphone_modal").val(),
                using: $("#new_usring").val(),
                sourceName: newperatePerson_combobox_name,
                sourceId: newperatePerson_combobox_id,
                city: $("#new_usercity_modal").val()
            },
            success: function (data) {
                if (data.success == 'repeat') {
                    alert('该手机号已绑定其他虚拟号用途！')
                } else {
                    alert('自动匹配虚拟号成功！');
                    newperatePerson_combobox_id = null;
                    newperatePerson_combobox_name = null;
                    $('#personName_modal').combobox('setValue', '');
                    $("#new_userphone_modal").val('');
                    $("#new_usercity_modal").val('');
                    $("#new_deptlist_modal").text('');
                    $('#creategwvircodemodal').modal('hide');
                    $("#" + grid_id)[grid_id].reload({
                        params: getGridParams()
                    });
                    //window.location.reload();
                }

            }
        });
    }
}

var CloseModal = function () {
    $('#changesourcephonemodal').modal('hide');
}

var NewCloseModal = function () {
    $('#creategwvircodemodal').modal('hide');
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
        order: 'operateat',
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

var personNameSelect = function (record) {
    peratePerson_combobox_id = record.userId;
    $("#sourceId").val(record.userId);
    peratePerson_combobox_name = record.fullname;
    $("#sourceName").val(record.fullname);
}

var personNameLoadSuccess = function () {
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id = data[i].userId;
                $("#sourceId").val(data[i].userId);
                $("#sourceName").val(data[i].fullname);
                peratePerson_combobox_name = value;
                return;
            }
        }
    }
    else {
        $("#sourceId").val(null);
        $("#sourceName").val(null);
    }
}

var newpersonNameLoadSuccess = function () {
    var data = $('#personName_modal').combobox('getData');
    var value = $('#personName_modal').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $.ajax({
                    url: base + '/virtualphoneController/selecuserdeptlist',
                    type: 'post',
                    data: {userId: data[i].userId},
                    success: function (data) {
                        if (data.success == 'ok') {
                            $("#new_userphone_modal").val(data.cellphone);
                            $("#new_usercity_modal").val(data.cityname);
                            $("#new_deptlist_modal").text(data.deptlistname);
                        }
                    }
                });
                $('#personName_modal').combobox('setValue', data[i].fullname);
                newperatePerson_combobox_id = data[i].userId;
                newperatePerson_combobox_name = value;
                return;
            }
        }
    }
};

function formatItemOfPersonName(row){
    if(row.status == 2){
        return row.fullname;
    }else{
        return row.fullname+'<span style="color:#ff0000">(无效) </span>';
    }
}

function formatItemOfPersonName1(row){
    return row.fullname;
}
