var grid_id = "complaintDetail_grid";
var queryUrl = base + '/accendantevaluateController/selectComplaintDetail';
var order = '';

var columns = [
    { field: 'userPhone', title: '用户手机号', width: 150, align: 'center', sortable: false },
    { field: 'createAt1', title: '带看日期', width: 150, align: 'center', sortable: false },
    { field: 'evaluateTimeStr', title: '评价日期', width: 150, align: 'center', sortable: false },
    { field: 'description', title: '投诉内容', width: 150, align: 'center', sortable: false }
];

var gridOptions = {
    id: grid_id,
    pageSize: 20,  //每页显示个数
    width: '100%',
    trTdentity: 'id',
    url: queryUrl,
    tHeadCols: columns
};


$(function () {
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
     * 生成顾问投诉详情列表
     * @type {dataGrid}
     */
    $.fn[grid_id] = new dataGrid();
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
var complaintDetailSearch = function(){
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