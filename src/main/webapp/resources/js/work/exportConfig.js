var reg = /\s/g;
var num = 0;
var codeVar;
function checkFun(data, tdParam){
    $.ajax({
        url: base + '/exportconfigController/checkClass',
        type:"get",
        async:false,
        data: data,
        success:function(data) {
            if(data == "error"){
                $("#" + tdParam).show();
                num += 1
            }
            else {
                $("#" + tdParam).hide();
            }
        }
    });
}

var checkCode = function(){
    Code = $("#Code").val().replace(reg, "");
    if(Code == '' || isNaN(Code)){
        $("#tdCode").show();
        num += 1
    }else {
        $("#tdCode").hide();
    }
};

var checkPath = function(){
    requestClassPath = $("#requestClassPath").val().replace(reg, "");
    if(requestClassPath == ''){
        $("#tdRequestClassPath").show();
        num += 1
    }else {
        data = {
            classPath: requestClassPath
        };
        tdParam = "tdRequestClassPath";
        checkFun(data, tdParam);
    }
};

var checkClass = function(){
    parameterClass = $("#parameterClass").val().replace(reg, "");
    if(parameterClass == ''){
        $("#tdParameterClass").show();
        num += 1
    }else {
        data = {
            classPath: parameterClass
        };
        tdParam = "tdParameterClass";
        checkFun(data, tdParam);
    }
};

var checkMethod = function(){
    requestMethod = $("#requestMethod").val().replace(reg, "");
    if(requestClassPath == "" || requestMethod == ''){
        $("#tdRequestMethod").show();
        num += 1
    }else {
        data = {
            classPath: requestClassPath,
            method: requestMethod
        };
        tdParam = "tdRequestMethod";
        checkFun(data, tdParam);
    }
};

var checkName = function(){
    reportName = $("#reportName").val().replace(reg, "");
    if(reportName == ''){
        $("#tdReportName").show();
        num += 1
    }else {
        $("#tdReportName").hide();
    }
};

var checkTime = function(){
    timeInterval = $("#timeInterval").val().replace(reg, "");
    if(timeInterval == '' || isNaN(timeInterval)){
        $("#tdTimeInterval").show();
        num += 1
    }else {
        $("#tdTimeInterval").hide();
    }
};

function addReportConfig() {
    checkCode();
    checkPath();
    checkClass();
    checkMethod();
    checkName();
    checkTime();
    if (num > 0){
        num = 0;
        return false;
    }
    $.ajax({
        url: base + '/exportconfigController/insertExportConfig',
        type:"post",
        async:false,
        data: {
            code: Code,
            requestClassPath: requestClassPath,
            requestMethod: requestMethod,
            parameterClass: parameterClass,
            reportName: reportName,
            timeInterval: timeInterval
        },
        success:function(data) {
            if(data == "ok"){
                alert("提交成功");
            }
        }
    });
}


var checkCode1 = function(code1){
    $.ajax({
        url: base + '/exportconfigController/selectClassParames',
        type:"get",
        async:false,
        data: {
            code: code1
        },
        success:function(re) {
            if(re.success == false){
                $("#tdCode1").show();
                num += 1;
            }
            else {
                $("#tdCode1").hide();
                var paramMap = re.data;
                for(var key in paramMap){
                	var value = paramMap[key];
                    divId = 'parames' + key;
                    $("#parames").append('<div class="form-group" id="' + divId + '"></div>');
                    if(value != null){
                    	$("#"+divId).append('<input name="checking" style="width:20px" type="checkbox" checked value="' + key + '"/>');
                    	$("#"+divId).append('<label class="text-left" style="width: 200px">' + key + '</label>');
                    	$("#"+divId).append('<input id="' + key + '" class="form-control" type="text" value=' + value + '>');
                    }else{
                    	$("#"+divId).append('<input name="checking" style="width:20px" type="checkbox" value="' + key + '"/>');
                    	$("#"+divId).append('<label class="text-left" style="width: 200px">' + key + '</label>');
                    	$("#"+divId).append('<input id="' + key + '" class="form-control" type="text">');
                    }
                }
            }
        }
    });
};

var cleanVal = function(){
    $("#addReportColumnConfig").modal("hide");
    $("#parames").empty();
};
var cancel = function(){
	$("#modifyExportConfig").modal("hide");
	$("#mparames").empty();
};


function addReportColumnConfig(code1) {
	codeVar = code1;
    cleanVal();
    checkCode1(code1);
    if(num > 0){
        num = 0;
        return false;
    }
    $("#addReportColumnConfig").modal("show");
}


var submitAll = function(){
    obj = document.getElementsByName("checking");
    paramsArray = [];
    for(i in obj) {
        if (obj[i].checked) {
            input = $("#" + obj[i].value);
            paramsArray.push({"property": obj[i].value.replace(reg,""), "title": input.val().replace(reg,"")});
            if (input.val() == "") {
                return false;
            }
        }
    }
    paramsArray = JSON.stringify(paramsArray);
    $.ajax({
        url: base + '/exportconfigController/insertExportColumnConfig',
        type:"post",
        async:false,
        data: {
            code: codeVar,
            paramsArray: paramsArray
        },
        success:function(data) {
            if(data == "error"){
                alert("提交失败");
                return false;
            }
            else {
                alert("提交成功");
            }
        }
    });
    cleanVal();
};

function modifyExportConfig(id) {
	cancel();
    modifyRecord(id);
}

var modifyRecord = function(id){
	var record = $('#export_cfg_grid')['export_cfg_grid'].getCurSelectRecord(id);
    $("#mparames").append('<div class="form-group" id="mparamescode" style="width: 100%"><label class="text-left" style="width: 100px">导出编码</label></div>');
    $("#mparamescode").append('<input id="codeid" class="form-control" style="width:70% !important" type="text" value="'+record.code+'">');
	$("#mparames").append('<div class="form-group" id="mparamesrequestClassPath" style="width: 100%"><label class="text-left" style="width: 100px">调用类全路径</label></div>');
	$("#mparamesrequestClassPath").append('<input id="requestClassPathid" style="width:70% !important" class="form-control" type="text" value="'+record.requestClassPath+'">');
	$("#mparames").append('<div class="form-group" id="mparamesrequestMethod" style="width: 100%"><label class="text-left" style="width: 100px">调用方法</label></div>');
	$("#mparamesrequestMethod").append('<input id="requestMethodid" class="form-control" style="width:70% !important" type="text" value="'+record.requestMethod+'">');
	$("#mparames").append('<div class="form-group" id="mparamesparameterClass" style="width: 100%"><label class="text-left" style="width: 100px">参数类</label></div>');
	$("#mparamesparameterClass").append('<input id="parameterClassid" class="form-control" style="width:70% !important" type="text" value="'+record.parameterClass+'">');
	$("#mparames").append('<div class="form-group" id="mparamesreportName" style="width: 100%"><label class="text-left" style="width: 100px">报表名称</label></div>');
	$("#mparamesreportName").append('<input id="reportNameid" class="form-control" style="width:70% !important" type="text" value="'+record.reportName+'">');
	$("#mparames").append('<div class="form-group" id="mparamestimeInterval" style="width: 100%"><label class="text-left" style="width: 100px">导出时间间隔 </label></div>');
	$("#mparamestimeInterval").append('<input id="timeIntervalid" class="form-control" style="width:70% !important" type="text" value="'+record.timeInterval+'">');
	$("#modifyExportConfig").modal("show");
};

var modify = function(){
	$.ajax({
		url: base + '/exportconfigController/updateexportconfig',
		type:"post",
		async:false,
		data: {
			code: $("#codeid").val(),
			requestClassPath: $("#requestClassPathid").val(),
			requestMethod: $("#requestMethodid").val(),
			parameterClass: $("#parameterClassid").val(),
			reportName: $("#reportNameid").val(),
			timeInterval: $("#timeIntervalid").val(),
		},
		success:function(data) {
			if(data == "ok"){
				alert("修改成功");
			}else {
				alert("修改失败");
				return false;
			}
		}
	});
	search();
	cancel();
};


// -------------------列表-------------------------
var grid_id = "export_cfg_grid";
var queryUrl = base + '/exportconfigController/exportconfiglist';
var order = 'code';

var columns = [
	{field: 'id', hidden:true},
    {field: 'code', title: '导出编码', width: 100, align: 'center', sortable: false},
    {field: 'requestClassPath', title: '调用类全路径', width: 250, align: 'center', sortable: false},
    {field: 'requestMethod', title: '调用方法', width: 150, align: 'center', sortable: false},
    {field: 'parameterClass', title: '参数类', width: 250, align: 'center', sortable: false},
    {field: 'reportName', title: '报表名称', width: 150, align: 'center', sortable: false},
    {field: 'timeInterval', title: '导出时间间隔', width: 150, align: 'center', sortable: false},
    {field: '', title: '操作', width: 150, align: 'center', sortable: false, render: renderOfOperate},
    {field: '', title: '配置export_column_config表', width: 150, align: 'center', sortable: false, render: renderOfConfig}
];
/**
 * 操作
 */
function renderOfOperate(record, value) {
	var a = 1;
    return "<button type='button' class='btn btn-blue' style='margin:0 auto' onclick='modifyExportConfig(\"" + record.id + "\")'>修改</button>";
}
/**
 * 配置
 */
function renderOfConfig(record, value) {
	return "<button type='button' class='btn btn-blue' style='margin:0 auto' onclick='addReportColumnConfig(\"" + record.code + "\")'>配置</button>";
}
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

function convertDate(date) {
    if (!date) {
        return '';
    } else {
        return dateHMZToDateTime(date * 1000);
    }
}

//刷新列表
var search = function () {
    $("#" + grid_id)[grid_id].reload();
}
$(function () {
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
        order: order,
        lineLenth:70,
        thClickCallback: function (orderField) {
            if (orderField == '') {
                return;
            }
            $("#" + grid_id)[grid_id].reload();
        }
    });
});