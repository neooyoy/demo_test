var cityId = $("#cityIds").val();
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
        data.splice(0, 0, {'id': "", 'name': '全部'})
    }

    /**
     * 生成城市-分布-商圈公共控件
     */
    initCityDistrictBusinessCircle(data, "city_combox_fangyuan", "district_combox_fangyuan", "businesscircle_combox_fangyuan");
    
    
    var orderCityId = $("#orderCityId").val();
	var orderDistrictId = $("#orderDistrictId").val();
	var orderBusinesscircleId = $("#orderBusinesscircleId").val();
	if (orderCityId != null){
		$('#city_combox_fangyuan').val(orderCityId);
		$("#district_combox_fangyuan")['district_combox_fangyuan'].reload({
		    params : {
		        'cityId': orderCityId
		    }
		});
	}
	if (orderDistrictId != null){
	    $('#district_combox_fangyuan').val(orderDistrictId);
	    $("#businesscircle_combox_fangyuan")['businesscircle_combox_fangyuan'].reload({
	        params : {
	            'districtId': orderDistrictId
	        }
	    });
	}
	if (orderBusinesscircleId != null){
	    $('#businesscircle_combox_fangyuan').val(orderBusinesscircleId);
	}
    
   /* var cho;
    $(".radio-box label.checked").click(function(){
        var radioId = $(this).attr("name");
        cho = !cho;
        if(cho){
            $(this).addClass("checked");
            $(this).parent().find("input[type='checkbox']").attr("checked","checked");
        }else{
            $(this).removeClass("checked");
            $(this).parent().find("input[type='checkbox']").removeAttr("checked");
        }
    });

    $(".radio-box label").click(function(){
        var radioId = $(this).attr("name");
        $(this).parent().siblings().find("label").removeAttr("class") && $(this).attr("class","checked");
        $(this).parent().siblings().find("input[type='radio']").removeAttr("checked") && $(this).parent().find("input[type='radio']").attr("checked","checked");
    })*/

   

    $("#rent-money").change(function(){
        if($(this).find(":checked").val()=="0")
        {
            $("#price").show();
            $("#month").hide();
        }
        else
        {
            $("#price").hide();
            $("#month").show();
        }
    })
    $("#orderPriceBegin").blur(function () {
        $("#orderPriceMonthBegin").val(caculateMonth($(this)));
    });
    $("#orderPriceMonthBegin").blur(function () {
        $("#orderPriceBegin").val(caculateDay($(this)));
    });
    $("#orderPriceMonthEnd").blur(function () {
        $("#orderPriceEnd").val(caculateDay($(this)));
    });
    $("#orderPriceEnd").blur(function () {
        $("#orderPriceMonthEnd").val(caculateMonth($(this)));
    });
    $("#orderAreaBegin").blur(function () {
        $("#orderPriceMonthBegin").val(caculateMonth($(this)));
    });
    $("#orderAreaEnd").blur(function () {
        $("#orderPriceMonthEnd").val(caculateMonth($(this)));
    });
    $('[name=orderHouseDateStr]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked',
        keydown:'true'
    });

});

function caculateMonth(obj){
	var month = parseFloat(parseFloat(obj.val()) * parseFloat($("#orderAreaEnd").val()) * 30).toFixed(2);
	if(month.toString().length > 12){
		alert("输入金额/面积不合理");
	}
	return month;
}

function caculateDay(obj){
	var day = parseFloat(obj.val()) / 30 / parseFloat($("#orderAreaBegin").val()).toFixed(2);
	if(day.toString().length > 12){
		alert("输入金额/面积不合理");
	}
	return day;
}











