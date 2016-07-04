var grid_id = "evaluateDetail_grid";
var queryUrl = base + '/accendantevaluateController/selectEvaluateDetail';
var order = '';

var columns = [
    { field: 'userPhone', title: '用户手机号', width: 150, align: 'center', sortable: false },
    { field: 'createAt1', title: '带看日期', width: 150, align: 'center', sortable: false },
    { field: 'evaluateTimeStr', title: '评价日期', width: 150, align: 'center', sortable: false },
    { field: 'countScore', title: '总平均分', width: 150, align: 'center', sortable: false },
    { field: 'matchingScore', title: '房源匹配度评分', width: 150, align: 'center', sortable: false },
    { field: 'serviceAttitudeScore', title: '服务态度评分', width: 150, align: 'center', sortable: false },
    { field: 'professionScore', title: '专业程度评分', width: 150, align: 'center', sortable: false },
    { field: '', title: '标签选择', width: 150, align: 'center', sortable: false, render:renderOfMark },
    { field: 'description', title: '文字输入', width: 150, align: 'center', sortable: false }
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
 * @param record
 * @returns {string}
 */
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

$(function () {
    /**
     * 房源匹配度combox
     * @type {combox}
     */
    $.fn.matchingBegCombox = new combox();
    var options = getComboxOptions("matching_beg_combox");
    $("#matching_beg_combox").matchingBegCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });
    $.fn.matchingEndCombox = new combox();
    var options = getComboxOptions("matching_end_combox");
    $("#matching_end_combox").matchingEndCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });

    /**
     * 服务态度combox
     * @type {combox}
     */
    $.fn.serviceBegCombex = new combox();
    var options = getComboxOptions("service_beg_combex");
    $("#service_beg_combex").serviceBegCombex.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });
    $.fn.serviceEndCombex = new combox();
    var options = getComboxOptions("service_end_combex");
    $("#service_end_combex").serviceEndCombex.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });

    /**
     * 专业程度combox
     * @type {combox}
     */
    $.fn.professionBegCombex = new combox();
    var options = getComboxOptions("profession_beg_combex");
    $("#profession_beg_combex").professionBegCombex.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });
    $.fn.professionEndCombex = new combox();
    var options = getComboxOptions("profession_end_combex");
    $("#profession_end_combex").professionEndCombex.init({
        hidenDisabledValue: options.hidenDisabledValue,
        //lable: options.lable,
        id: options.id,
        value: options.value,
        text: options.text,
        data: options.data
    });

    /**
     * 时间控件
     */
    $('[name=create_at_beg]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('[name=create_at_end]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('[name=evaluate_time_beg]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });
    $('[name=evaluate_time_end]').datepicker({
        format: 'yyyy-mm-dd',
        todayHighlight: true,
        todayBtn: 'linked',
    });

    /**
     * 生成顾问评价详情列表
     * @type {dataGrid}
     */
    $.fn["evaluateDetail_grid"] = new dataGrid();
    $("#" + grid_id)[grid_id].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        params: getGridParams(),
        searchParams: getGridSearchParams(),
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
                params: getGridParams(),
                searchParams: getGridSearchParams()
            })
        }
    });
});


/**
 * 刷新列表
 */
var evaluateDetailSearch = function(){
    $("#" + grid_id)[grid_id].reload({
        params: getGridParams(),
        searchParams: getGridSearchParams()
    });
};

/**
 * 获取查询参数
 */
var accendant_id = $("#accendant_id").val();
var getGridParams = function () {
    var params = {
        'accendantIds': accendant_id
    };
    return params;
};

var getGridSearchParams = function () {
    var searchParams = [
        {
            nodeId:'matching_beg_combox',
            paramName:'matchingBeg'
        },{
            nodeId:'matching_end_combox',
            paramName:'matchingEnd'
        },{
            nodeId:'service_beg_combex',
            paramName:'serviceBeg'
        },{
            nodeId:'service_end_combex',
            paramName:'serviceEnd'
        },{
            nodeId:'profession_beg_combex',
            paramName:'professionBeg'
        },{
            nodeId:'profession_end_combex',
            paramName:'professionEnd'
        },{
            nodeId:'phone',
            paramName:'userPhone'
        },{
            nodeId:'create_at_beg',
            paramName:'createAtBegStr'
        },{
            nodeId:'create_at_end',
            paramName:'createAtEndStr'
        },{
            nodeId:'evaluate_time_beg',
            paramName:'evaluateBegStr'
        },{
            nodeId:'evaluate_time_end',
            paramName:'evaluateEndStr'
        }
    ];
    return searchParams;
};
