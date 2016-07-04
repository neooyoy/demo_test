var grid_id = "evaluate_grid";
var queryUrl = base + '/accendantevaluateController/selectEvaluateListPage';
var order = '';

var columns = [
    { field: 'accendantName', title: '顾问姓名', width: 150, align: 'center', sortable: false },
    { field: 'matchingScoreAvg', title: '房源匹配度评分', width: 150, align: 'center', sortable: false },
    { field: 'serviceAttitudeScoreAvg', title: '服务态度评分', width: 150, align: 'center', sortable: false },
    { field: 'professionScoreAvg', title: '专业程度评分', width: 150, align: 'center', sortable: false },
    { field: '', title: '标签选择', width: 150, align: 'center', sortable: false, render:renderOfMark },
    { field: 'ping', title: '评价次数', width: 150, align: 'center', sortable: false },
    { field: 'pingAll', title: '评价次数与未评价次数', width: 150, align: 'center', sortable: false },
    { field: '', title: '详情', width: 150, align: 'center', sortable: false, render:renderOfDetail },
    { field: 'touSu', title: '投诉次数', width: 150, align: 'center', sortable: false },
    { field: '', title: '投诉详情', width: 150, align: 'center', sortable: false, render:renderOfComplain }
];

var gridOptions = {
    id: grid_id,
    pageSize: 20,  //每页显示个数
    width: '100%',
    trTdentity: 'id',
    url: queryUrl,
    tHeadCols: columns
};

/**
 * 操作
 */
function renderOfDetail(record){
    if(record.ping != '') {
        return '<button onclick="details(' + record.accendantId + ')" class="btn btn-default" type="button">详情</button>'
    }
   return '';
}
var details = function (id){
    window.open(base + "/accendantevaluateController/evaluateDetail?id=" + id)
};

function renderOfComplain(record){
    if(record.touSu != '') {
        return '<button onclick="complain(' + record.accendantId + ')" class="btn btn-default" type="button">投诉详情</button>'
    }
    return '';
}
var complain = function (id){
    window.open(base + "/accendantevaluateController/complaintDetail?id=" + id)
};
function renderOfMark(record){
    var fuwu = 0;  // 服务态度好
    var xijie = 0;  // 细节满分
    var zhuanye = 0;  // 非常专业
    var guwen = 0;  // 完美顾问
    var tiyan = 0;  // 完美体验id
    var qizhi = 0;  // 形象气质
    var impression = record.impression;
    impressionArray = impression.split(',');
    for(var i=0;i<impressionArray.length;i++){
        if (impressionArray[i] == '服务态度好'){
            fuwu +=1
        }
        if (impressionArray[i] == '细节满分'){
            xijie +=1
        }
        if (impressionArray[i] == '非常专业'){
            zhuanye +=1
        }
        if (impressionArray[i] == '完美顾问'){
            guwen +=1
        }
        if (impressionArray[i] == '完美体验'){
            tiyan +=1
        }
        if (impressionArray[i] == '形象气质佳'){
            qizhi +=1
        }
    }
    return '服务态度好:'+fuwu+'次'+"<br>"+'细节满分:'+xijie+'次'+"<br>"+'非常专业:'+zhuanye+'次'+"<br>"+'完美顾问:'+guwen+'次'+"<br>"+'完美体验:'+tiyan+'次'+"<br>"+'形象气质佳:'+qizhi+'次';
}

/**
 * 刷新列表
 */
var evaluateSearch = function(){
    $("#" + grid_id)[grid_id].reload({
        params: getGridParams()
    });
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
        'sort' : 'desc',
        'order': '',
        'accendantIds': userIds
    };
    return params;
};


$(function(){
    /**
     * 生成顾问评价列表
     * @type {dataGrid}
     */
    $.fn["evaluate_grid"] = new dataGrid();
    $("#" + grid_id)[grid_id].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        params: getGridParams(),
        //searchParams: null,
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
                params: getGridParams()
            })
        }
    });
});


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
            inTheSelectDepartments: inTheSelectDepartments
        },
        url: base + '/departmentController/loadDepartmentUserTreeNodes',
        method: 'post',
        panelHeight: '400px',
    });
};