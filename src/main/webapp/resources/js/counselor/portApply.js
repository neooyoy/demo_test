/**
 * 组织架构控件
 * @param type
 */
var peratePerson_combobox_id = null;
var peratePerson_combobox_name = null;
var personId = null;

/**
 * 组织架构change时，重新加载组织架构人员
 */
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
            showLoginName: false,
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px',
    });
};




/**
 * 端口版本号显示/隐藏
 */
$(document).ready(function () {
    $("#target").bind("change",function(){
        if ($(this).val() == 1) {
            $("#target_version").empty();
            $("#target_version").append("<option value='0'>商用300</option>");
            $("#target_version").append("<option value='0'>商用600</option>");
        }else if($(this).val() == 2) {
            $("#target_version").empty();
            $("#target_version").append("<option value='0'>标准版</option>");
        }else if($(this).val() == 3) {
            $("#target_version").empty();
            $("#target_version").append("<option value='0'>50版</option>");
            $("#target_version").append("<option value='0'>80版</option>");
        }
    });
    $("[name=hasorno]").change(function(){
        var val = $("[name=hasorno]:checked").val();
        if(val == 1) {
            $("#hasAccount").show();
        }else {
            $("#hasAccount").hide();
            $("#userNum").val("");
        }
    })
});


var getNameStr = function (e) {
    /**
     * 通过组织架构控件选择的人员
     * @type {string}
     */
    var userId = null;
    var userName = '';
    if ($('#departmentUserComboxTree').combotree('tree') != null) {
        var selectNode = $('#departmentUserComboxTree').combotree('tree').tree('getSelected');
        if (selectNode == null) {
            selectNode = $('#departmentUserComboxTree').combotree('tree').tree('getRoot');
        }
        if (selectNode.userNode) {
            userId = selectNode.id;
            userName = selectNode.text;
        }
    }
    if(e == 1){
        return userId;
    }else if(e == 2){
        return userName;
    }
};


var reg = /\s/g;
var countNum = 0;
function createRow(e){
    var table = document.getElementById("portApplyList");
    function createCell(arg){
        var cell = row.insertCell();//创建一个单元
        cell.innerHTML = arg;
    }

    var tdId = getNameStr(1);
    var tdName = getNameStr(2).replace(reg, "");
    if (tdName == null || tdName == '') {
        $("[name=nameStr]").show();
    }else {
        $("[name=nameStr]").hide();
    }
    if(e == 0){
        var tdType = '开通端口';
        var tdTypeNum = 1;
        var tdTarget = $("#target option:selected").text();
        var tdVersion = $("#target_version option:selected").text();
        var tdNum = $("#userNum").val().replace(reg, "");
        var tdPrice = '';
        if(tdTarget == '--请选择--'){
            $("[name=tdTarget]").show();
        }else {
            $("[name=tdTarget]").hide();
        }
        if(tdVersion == '--请选择--'){
            $("[name=tdVersion]").show();
        } else {
            $("[name=tdVersion]").hide();
        }
        if($("input[type=radio]:checked").attr("id") == 'hasUser' && tdNum == ''){
            $("[name=tdNum]").show();
            return false;
        } else {
            $("[name=tdNum]").hide();
        }
    }else {
        var tdType = '端口充值';
        var tdTypeNum = 2;
        var tdTarget = $("#target1 option:selected").text();
        var tdVersion = '';
        var tdNum = $("#userNum1").val().replace(reg, "");
        var tdPrice = $("#price").val().replace(reg, "");
        if(tdTarget == '--请选择--'){
            $("[name=tdTarget1]").show();
        } else {
            $("[name=tdTarget1]").hide();
        }
        if(tdPrice == '' || isNaN(tdPrice)){
            $("[name=tdPrice]").show();
            return false;
        } else {
            $("[name=tdPrice]").hide();
        }
    }

    if(tdVersion == '--请选择--' || tdTarget == '--请选择--' || tdName == null || tdName == ''){
        return false;
    }else {
        var row = table.insertRow();//创建一行
        countNum += 1;
        var newClass = 'row'+ countNum;//每一行的className
        row.className = newClass;

        var tdOption = "<input type='button' onclick='removeRow(" + '"' + '.' + newClass + '"' + ")' name='tdBtn' value='删除'>";

        createCell(tdName);
        createCell(tdType);
        createCell(tdTarget);
        createCell(tdVersion);
        createCell(tdNum);
        createCell(tdPrice);
        createCell(tdOption);

        //生成input
        var valStr =
            tdId + ';' +
            tdName  + ';' +
            tdTypeNum  + ';' +
            tdTarget + ';' +
            tdVersion + ';' +
            tdPrice + ';' +
            tdNum;
        input = document.createElement("input");
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', "hidInput");
        input.setAttribute('id', newClass);
        input.setAttribute('value', valStr);
        input.setAttribute('calss', newClass);
        document.getElementsByTagName('body')[0].appendChild(input);
    }


    if(e == 0){
        $("#applyOpen").modal("hide");
    }else {
        $("#applyRecharge").modal("hide");
    }
}
/**
 * 删除行
 * @param e
 */
var removeRow = function(e) {
    
    var classstr=e.substring(e.indexOf('.')+1);
    $(e).remove();
    $('#'+classstr).remove();
   
};


/**
 * 获取查询参数
 */
var getParams = function () {
    var hidInput = $("[name=hidInput]");
    var paramArray = new Array();
    for(i=0;i<hidInput.length;i++){
        param = hidInput[i].getAttribute("value");
        paramArray.push(param);
    }
    return paramArray;
};

var batchSubmit = function(){
    var params = getParams();
    if(params.length == 0){
        return false;
    }
    $.ajax({
        url: base + '/businessportController/batchApply',
        type:"post",
        data:{params:params},
        success:function(data) {
            if (data == "ok") {
                alert("提交成功");
                window.location.reload();
            }
        }
    })
};

var backPortManage = function(){
    window.open(base + "/businessportController/portManage")
};