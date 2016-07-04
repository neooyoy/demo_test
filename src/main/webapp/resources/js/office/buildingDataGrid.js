var cityId = '12,13';

var order = "priority desc, modifyAt";

$(function () {
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
        data.splice(0, 0, {'id': cityIds, 'name': '全部'})
    }

    /**
     * 生成城市-分布-商圈公共控件
     */
    initCityDistrictBusinessCircle(data, "city_combox", "district_combox", "businesscircle_combox");

    /**
     * 锁盘状态combox
     * @type {combox}
     */
/*    $.fn.lockdiskCombox = new combox();
    var options = getComboxOptions("lockdisk_combox");

    $("#lockdisk_combox").lockdiskCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        lable : options.lable,
        id : options.id,
        value : options.value,
        text : options.text,
        data : options.data
    });*/

    /**
     * 业主类型combox
     * @type {combox}
     */
    $.fn.investorTypeCombox = new combox();
    var options = getComboxOptions("investorType_combox");

    $("#investorType_combox").investorTypeCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        lable : options.lable,
        id : options.id,
        value : options.value,
        text : options.text,
        data : options.data
    });

    /**
     * 发布状态combox
     * @type {combox}
     */
    $.fn.statusCombox = new combox();
    var options = getComboxOptions("status_combox");

    $("#status_combox").statusCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        lable : options.lable,
        id : options.id,
        value : options.value,
        text : options.text,
        data : options.data
    });

    /**
     * 物业等级combox
     * @type {combox}
     */
    $.fn.managementLevelCombox = new combox();
    var options = getComboxOptions("managementLevel_combox");

    $("#managementLevel_combox").managementLevelCombox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        lable : options.lable,
        id : options.id,
        value : options.value,
        text : options.text,
        data : options.data
    });


    /**
     * 生成楼盘列表
     * @type {dataGrid}
     */
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
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order : order,
        onload: function () {
            $('.poshytooltip').poshytip({
                alignY: 'bottom'
            });
        },
        tBodyTrDblclickCallBack: function (record) {
            var url = base + "/officeController/insertOrUpdateOffice?id=" + record["id"];
            window.open(url);
        },
        _handleTbodyTrClick: function(record){
        }
    });

    $("input").bind('keypress',function(event){
        if(event.keyCode == "13")
        {
            reloadOfficeGrid();
        }
    });

    $('select').bind('change',function(){
        reloadOfficeGrid();
    });
});

/**
 * 创建新楼盘按钮弹出新建楼盘页面
 * @author chenjun 20160307
 */
var openAddBuildingPage = function(){
    window.open(base + "/officeController/insertOrUpdateOffice")
};


var clearSearchValue = function () {
    $("#officeForm")[0].reset();
    reloadOfficeGrid();
};

var reloadOfficeGrid = function () {
    $("#building_grid")['building_grid'].options.params.order = order;
    $("#building_grid")['building_grid'].reload();
};

function renderOfPriority(record){
    var priority0 = record.priority;
    var id = record.id;
    return '<input name="priority" onblur="changePriority(this,' + id + ',' + priority0 + ')" style="width\: 25px;" type="text" value=' + priority0 + '>';
}


var changePriority = function(obj, id, priority0){
    //debugger;
    var reg = /\s/g;
    var priority = $(obj).val().replace(reg, "");
    var re = /^[0-9]*$/;
    var num = 0;
    if(priority != priority0){
        if(!re.test(priority)){
            alert("显示顺序不合法");
            location.reload();
        } else {
            $.ajax({
                url: base + '/officeController/changePriority',
                type:"post",
                async:false,
                data:{
                    id: id,
                    priority:priority
                },
                success: function (data) {
                    if(data == "success"){
                        num += 1
                    }
                }
            })
        }
        if(num == 0){
            alert("显示顺序不合法");
            location.reload();
        }
    }
};
