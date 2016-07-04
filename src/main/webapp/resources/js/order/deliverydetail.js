var cityId = $('#cityId').val();

$.fn.combox = new combox();
$(function () {
    var curCityId = $('#cityId').val();
    var isModify = false;
    var cityName = '';

    if (curCityId != null && curCityId != ''){
        isModify = true;
    }


    var data = [];

    var firstCityId = null;
    var firstCityName = "";

    var cityArray = cityId.split(',');
    for (var i=0; i<cityArray.length; i++){
        cityName = getCityName(cityArray[i]);

        if (cityName != ''){
            if (!isModify && firstCityName == ''){
                firstCityName = cityName;
                firstCityId = parseInt(cityArray[i]);
                $('#cityId').val(firstCityId);
                $('#cityName').val(firstCityName);
            }
            data.push({'id': parseInt(cityArray[i]), 'name': cityName});
        }
    }

    $("#city_combox_detail").combox.init({
        lable : '',
        id : 'city_combox_detail',
        showAll : false,
        width: ' 140px !important',
        //url: base + "/officeController/getCity",
        value : 'id',
        text : 'name',
        name:'cityId',
        data : data,
        onchange: 'cityComboxChangeOfDetail()'
    });

    if (curCityId != null && curCityId != ''){
        $('#city_combox_detail').val($('#cityId').val());
        //$("#city_combox_detail").val(parseInt(curCityId));
    }
});

var cityComboxChangeOfDetail = function(){
    $("#district_combox_detail").combox1.reload({
        params : {
            'cityId': $("#city_combox_detail").val()
        }
    });

    //$("#businesscircle_combox_detail").combox2.clear();

    $("#businesscircle_combox_detail").combox2.reload({
        params : {
            'districtId': $("#district_combox_detail").val()
        }
    });


    $('#cityId').val($("#city_combox_detail").val());
    $('#cityName').val($("#city_combox_detail")[0].options[$("#city_combox_detail")[0].selectedIndex].text);


    $('#districtId').val($("#district_combox_detail").val());
    if ($("#district_combox_detail")[0].options.length != 0){
        $('#districtName').val($("#district_combox_detail")[0].options[$("#district_combox_detail")[0].selectedIndex].text);
    }else{
        $('#districtName').val("");
    }

    $('#businesscircleId').val($("#businesscircle_combox_detail").val());
    if ($("#businesscircle_combox_detail")[0].options.length != 0){
        $('#businesscircleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
    }else{
        $('#businesscircleName').val("");
    }
};

$.fn.combox1 = new combox();
$(function () {
    $("#district_combox_detail").combox1.init({
        lable : '',
        width: ' 140px !important',
        showAll : false,
        name:'cityId',
        id : 'district_combox_detail',
        url: base + "/districtController/getDistrict",
        value : 'districtId',
        text : 'districtName',
        params : {
            'cityId' : $("#city_combox_detail").val()
        },
        onchange: 'districtComboxChangeOfDetail()'
    });

    var districtId = $('#districtId').val();
    if (districtId != null && districtId !='' ){
        $('#district_combox_detail').val(districtId);
    }else{
        $('#districtId').val($("#district_combox_detail").val());
        if ($("#district_combox_detail")[0].options.length != 0){
            $('#districtName').val($("#district_combox_detail")[0].options[$("#district_combox_detail")[0].selectedIndex].text);
        }else{
            $('#districtName').val("");
        }
    }
});

$.fn.combox2 = new combox();
$(function () {

    $("#businesscircle_combox_detail").combox2.init({
        lable : '',
        width: ' 140px !important',
        showAll : false,
        id : 'businesscircle_combox_detail',
        url: base + "/businesscircleController/getBusinessCircle",
        value : 'businessCircleId',
        text : 'businessCircleName',
        params : {
            'districtId': $("#district_combox_detail").val()
        },
        onchange: 'businesscircleComboxChangeOfDetail()'
    });

    var businesscircleId = $('#businesscircleId').val();
    if (businesscircleId != null && businesscircleId !='' ){
        $('#businesscircle_combox_detail').val(businesscircleId);
    }else{
        $('#businesscircleId').val($("#businesscircle_combox_detail").val());

        if ($("#businesscircle_combox_detail")[0].options.length != 0){
            $('#businesscircleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
        }else{
            $('#businesscircleName').val("");
        }
    }
});

var districtComboxChangeOfDetail = function(){
    $('#districtId').val($("#district_combox_detail").val());

    if ($("#district_combox_detail")[0].options.length != 0){
        $('#districtName').val($("#district_combox_detail")[0].options[$("#district_combox_detail")[0].selectedIndex].text);
    }else{
        $('#districtName').val("");
    }

    $("#businesscircle_combox_detail").combox2.reload({
        params : {
            'districtId': $("#district_combox_detail").val()
        }
    });

    $('#businesscircleId').val($("#businesscircle_combox_detail").val());
    if ($("#businesscircle_combox_detail")[0].options.length != 0){
        $('#businesscircleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
    }else{
        $('#businesscircleName').val("");
    }
};

var businesscircleComboxChangeOfDetail = function(){
    $('#businesscircleId').val($("#businesscircle_combox_detail").val());
    if ($("#businesscircle_combox_detail")[0].options.length != 0){
        $('#businesscircleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
    }else{
        $('#businesscircleName').val("");
    }
};
