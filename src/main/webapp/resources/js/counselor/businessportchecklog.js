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
//var departmentComboxChange = function () {
//
//    departmentComboxData = $('#departmentCombox').combobox('getData');
//    var departmentIdArray = $('#departmentCombox').combobox('getValues');
//    var departmentIds = '';
//
//    var inTheSelectDepartments = false;
//
//    if (departmentIdArray == null || departmentIdArray.length == 0) {
//        $("#departmentUserComboxTree").combotree("setValues", '');
//        $('#departmentUserComboxTree').combotree("loadData", "");
//        return;
//
//    } else if (departmentIdArray.length > 1) {
//        for (var i = 0; i < departmentIdArray.length; i++) {
//            if (departmentIdArray[i] != -1) {
//                departmentIds += departmentIdArray[i] + ',';
//            }
//        }
//        departmentIds = departmentIds.substring(0, departmentIds.length - 1)
//    } else {
//        if (departmentIdArray[0] == -1) {
//            var data = departmentComboxData;
//
//            if (data != null && data.length > 0) {
//                for (var i = 0; i < data.length; i++) {
//                    if (data[i]["deptId"] != -1) {
//                        departmentIds += data[i]["deptId"] + ',';
//                    }
//                }
//                departmentIds = departmentIds.substring(0, departmentIds.length - 1)
//            }
//        } else {
//            departmentIds = departmentIdArray[0];
//        }
//    }
//
//    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];
//
//    if (departmentIds == '') {
//        return;
//    }
//
//    $('#departmentUserComboxTree').combotree({
//        queryParams: {
//            departmentIds: departmentIds,
//            loop: true,
//            inTheSelectDepartments: false
//        },
//        url: base + '/departmentController/loadDepartmentUserTreeNodes',
//        method: 'post',
//        panelHeight: '400px',
//    });
//};



$(function () {
    /**
     * 端口用途combox
     * @type {combox}
     */
//    $.fn.targetCombox = new combox();
//    var options = getComboxOptions("target_combox");
//    $("#target_combox").targetCombox.init({
//        hidenDisabledValue: options.hidenDisabledValue,
//        //lable: options.lable,
//        id: options.id,
//        value: options.value,
//        text: options.text,
//        data: options.data
//    });

    /**
     * 申请类型combox
     * @type {combox}
     */
//    $.fn.typeCombox = new combox();
//    var options = getComboxOptions("type_combox");
//    $("#type_combox").targetCombox.init({
//        hidenDisabledValue: options.hidenDisabledValue,
//        //lable: options.lable,
//        id: options.id,
//        value: options.value,
//        text: options.text,
//        data: options.data
//    });

    /**
     * 时间控件
     */
    $('#begin_time').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('#end_time').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });

    $('#check_begin').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',

    });
    $('#check_end').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });

    /**
     * 审核结果combox
     * @type {combox}
     */
//    $.fn.statusCombox = new combox();
//    var options = getComboxOptions("status_combox");
//    $("#status_combox").statusCombox.init({
//        hidenDisabledValue: options.hidenDisabledValue,
//        //lable: options.lable,
//        id: options.id,
//        value: options.value,
//        text: options.text,
//        data: options.data
//    });

    /**
     * 生成审核日志列表
     * @type {dataGrid}
     */
    $.fn['checkLog_grid'] = new dataGrid();
    $("#" + grid_id)[grid_id].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
//        params: getGridParams(),
        params: getGridSearchParams(),
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth: gridOptions.width,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,

        onload: function () {
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        thClickCallback: function(){
            $("#" + grid_id)[grid_id].reload({
               // params: getGridParams(),
            	params: getGridSearchParams()
            })
        }
    });
    
    
    
    
    
    
    $('select').bind('change',function(){
    	checkLogSearch();
    });
    
});




var grid_id = "checkLog_grid";
var queryUrl = base + '/businessportController/selectCheckLogListPage';
var order = 'createAt';

var columns = [
    { field: 'accendantName', title: '员工姓名', width: 150, align: 'center', sortable: false },
    { field: 'depart', title: '组别', width: 150, align: 'center', sortable: false },
    {field: 'phone', title: '手机号', width: 150, align: 'center', sortable: false},
    { field: 'target', title: '端口用途', width: 150, align: 'center', sortable: false },
    { field: 'typeStr', title: '申请类型', width: 150, align: 'center', sortable: false },
    { field: 'targetUsername', title: '申请端口账号', width: 150, align: 'center', sortable: false },
    { field: 'openTargetUsername', title: '开通端口账号', width: 150, align: 'center', sortable: false },
    { field: 'priceStr', title: '申请充值金额', width: 150, align: 'center', sortable: false },
    { field: 'actualAmountStr', title: '实际充值金额', width: 150, align: 'center', sortable: false },
    { field: 'systemresourceName', title: '审核人', width: 150, align: 'center', sortable: false },
    { field: 'createDate', title: '申请时间', width: 150, align: 'center', sortable: true },
    { field: 'systemresourceDate', title: '审核时间', width: 150, align: 'center', sortable: true },
    { field: '', title: '审核结果', width: 150, align: 'center', sortable: false,render: renderOfPortStatusOperate },
    { field: '', title: '操作', width: 150, align: 'center', sortable: false, render: renderOfPortMarkOperate }
];

var gridOptions = {
    id: grid_id,
    pageSize: 20,  //每页显示个数
    width: '100%',
    params: {
        //'sort': 'desc'
    },
    trTdentity: 'id',
    url: queryUrl,
    tHeadCols: columns
};

/**
 * 操作
 */
function renderOfPortStatusOperate(record) {
    if (record.status == 1) {
        value = "<font color='green'>通过</font>";
    } else if (record.status == 2) {
        value = "<font color='red'>不通过</font>";
    } else {
        value = '';
    }
    return value;
}

function renderOfPortMarkOperate(record) {
    if (record.status == 1) {
        return '<button id="btn_port_' + record.id + '" type="button" value="备注" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openRemarkModel(' + "'" + record.systemresourceReason1 + "'" + ')">备注</button>';
    } else if (record.status == 2){
        return '<button id="btn_port_' + record.id + '" type="button" value="原因" class="btn btn-blue" style="margin:0 auto" ' +
            'onclick="openReasonModel(' + "'" + record.systemresourceReason1 + "'" + ')">原因</button>';
    }
    return '';
};

var openRemarkModel = function (reason1) {
    $("#remarkModel").modal('show');
    $("#remark").html(reason1);
};

var openReasonModel = function (reason1) {
    $("#reasonModel").modal('show');
    $("#reason").html(reason1);
};



/**
 * 刷新列表
 */
var checkLogSearch = function () {
    $("#checkLog_grid")['checkLog_grid'].reload({
    	params: getGridSearchParams()
    });
};
/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
    $("#portForm")[0].reset();
    //$('#departmentUserComboxTree').combotree("setValues",'');
    peratePerson_combobox_id = null;
    orderPerson_combobox_id = null;
    checkLogSearch();
    $("#accendantId").val(null);
};





/**
 * 获取查询参数
 */
var getGridParams = function () {
    /**
     * 通过组织架构控件选择的人员
     * @type {string}
     */
    var checkedNodes = $('#departmentUserComboxTree').combotree('tree').tree('getChecked');
    if (checkedNodes != null && checkedNodes.length != 0) {
        var userIds = '';
        for (var j = 0; j < checkedNodes.length; j++) {
            if (checkedNodes[j].userNode) {
                userIds += checkedNodes[j].id + ',';
            }
        }
        if (userIds != '') {
            userIds = userIds.substring(0, userIds.length - 1);
        }
    }

    var params = {
        'sort' : 'asc',
        'order': 'createAt',
        'checklog': 'checklog',
        'accendantIds': userIds
    };
    return params;
};

var getGridSearchParams = function () {
	
	 var begin_time = $('#begin_time').val();
	 var end_time = $('#end_time').val();
	 var check_begin = $('#check_begin').val();
	 var check_end = $('#check_end').val();
	 var target_combox=$('#target_combox').val();
	 var type_combox=$('#type_combox').val();
	 var openTargetUsername=$('#openTargetUsername').val();
	 var status_combox=$('#status_combox').val();
	 var sourceId = null;
	  if (peratePerson_combobox_id != null) {
	        sourceId = peratePerson_combobox_id;
	    } else {
	        $('#personName').combobox('setValue', '');
	    }
	//条件置空
	    if(personName==null||personName==''){
	    	sourceId=null;
	 	   $("#accendantId").val(null);
	 }
	    
         var searchParams = {
            'beginTime':begin_time,
            'endTime': end_time,
            'checkBeginStr': check_begin,
            'checkEndStr': check_end,
            'target': target_combox,
            'type':type_combox,
            'openTargetUsername':openTargetUsername,
            'accendantId':sourceId,
            'status':status_combox,
            'checklog': 'checklog'
        }
    
    return searchParams;
};

var backPortCheck = function(){
    window.open(base + "/businessportController/businessportchecksearch")
};



var personNameSelect = function (record) {
    peratePerson_combobox_id = record.userId;
    $("#accendantId").val(record.userId);
    peratePerson_combobox_name = record.fullname;
}


var personNameLoadSuccess = function () {
    var data = $('#personName').combobox('getData');
    var value = $('#personName').combobox('getValue');
    if (data != null && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].fullname == value.trim()) {
                $('#personName').combobox('setValue', data[i].fullname);
                peratePerson_combobox_id = data[i].userId;
                peratePerson_combobox_name = value;
                $("#accendantId").val(data[i].userId);
                return;
            }
        }
    }
}
function formatItemOfPersonName(row){
    if(row.status == 2){
        return row.fullname;
    }else{
        return row.fullname+'<span style="color:#ff0000">(无效) </span>';
    }

}
