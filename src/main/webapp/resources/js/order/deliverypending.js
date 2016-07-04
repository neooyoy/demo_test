var cityId = $('#cityIds').val();

$(function () {

    dateWidgetLimit("start_tags","end_tags",null);

    $("#btn_reset").on("click", function () {
        $("#queryForm")[0].reset();
    });

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

    data.push({'id': 0, 'name': '无'});

    cityIds = cityIds.substring(0, cityIds.length-1);
    if (cityIds != ''){
        // 拼接函数(索引位置, 要删除元素的数量, 元素)
        data.splice(0, 0, {'id': cityIds + ',0', 'name': '全部'})
    }

    /**
     * 城市combox
     * @type {combox}
     */
    $.fn.city_combox = new combox();
    var options = getComboxOptions("city_combox");

    $("#city_combox").city_combox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        id : options.id,
        showAll: options.showAll,
        value : options.value,
        text : options.text,
        data : data
    });

    /**
     * 订单状态combox
     * @type {combox}
     */
    $.fn.orderToufangState_combox = new combox();
    var options = getComboxOptions("orderToufangState_combox");

    $("#orderToufangState_combox").orderToufangState_combox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        lable : options.lable,
        id : options.id,
        value : options.value,
        text : options.text,
        data : options.data
    });

    $('#orderToufangState_combox').val(0);

    /**
     * 生成订单列表
     * @type {dataGrid}
     */
    $.fn['grid_id'] = new dataGrid();
    var gridOptions = getDataGridOptions("grid_id");

    $("#grid_id")['grid_id'].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth : gridOptions.width,
        tBoolCheckbox: false,
        sort: 'asc',
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order : gridOptions.params.order,
        _handleTbodyTrClick: function(record){
        }
    });



});



/**
 * 订单类型-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfToufangType(record, value){
    //
    if (value>0){
        return '<span style="color:green;">私有订单</span>';
    }
    return '<span style="color:red;">公共订单</span>';
}

/**
 * 订单状态-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfToufangStatus(record, value){
    //
    if (value==0){
        return '待处理';
    } else if (value == 1){
        return '已处理';
    } else if (value == 2){
        return '无效';
    }
    return '';
}

/**
 * 订单状态-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfToufangBtn(record, value){
    //
    if (value==0 && record.accendantId==userId){
        return '<a class="btn btn-blue btn-default" href="'+base+'/order/deliverydetail?orderid='+record.orderid+'">处理</a>';
    }else if (value==0 && record.accendantId!=userId){
        return '<a class="btn btn-default" href="'+base+'/order/deliverydetail?orderid='+record.orderid+'">查看</a>';
    }else if (value==1){
        return '<a class="btn btn-default" href="'+base+'/order/deliverydetail?orderid='+record.orderid+'">查看</a>';
    }else if (value==2){
        return '<a class="btn btn-default" href="'+base+'/order/deliverydetail?orderid='+record.orderid+'">查看</a>';
    }
    return '';

}
