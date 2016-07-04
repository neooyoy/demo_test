//var cityId = $('#cityId').val();

var cityId = $('#user_cityIds').val();

var check = new Array(15);

function saveOfficeTagData(){
	var tag = '';
	for (var i=3; i<=14; i++){
		if (check[i] == 1){
			tag += i + ",";
		}
	}
	$('#tags').val(tag);
}

$(function () {

    $('[name=completeTime]').datepicker({
        format : 'yyyy-mm-dd',
		todayHighlight:true,
		todayBtn:'linked'
		
    });
    
    $('[name=accendantTime]').datepicker({
        format : 'yyyy-mm-dd',
    	todayHighlight:true,
		todayBtn:'linked'
    });

	var array = [];
	for (var i=0; i<15; i++){
		array[i] = 0; 
	}
    var tags = $('#tags').val();
	var split = tags.split(",");
	
	for (var i=0; i<split.length; i++){
		array[parseInt(split[i])] = 1;
	}
	for (var i=3; i<array.length; i++){
		var check_input_id = "check" + i + "_input";
		if (array[i] == 1){
			$('#'+check_input_id)[0].checked = true;
            check[i] = 1;
		}else{
		     $('#'+check_input_id)[0].checked = false;
            check[i] = 0;
		}
	}
});

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
        width: ' 172px !important',
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

    $('#circleId').val($("#businesscircle_combox_detail").val());
    if ($("#businesscircle_combox_detail")[0].options.length != 0){
        $('#circleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
    }else{
        $('#circleName').val("");
    }
};

$.fn.combox1 = new combox();
$(function () {
    $("#district_combox_detail").combox1.init({
        lable : '',
        width: ' 172px !important',
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
        width: ' 172px !important',
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

    var circleId = $('#circleId').val();
    if (circleId != null && circleId !='' ){
    	$('#businesscircle_combox_detail').val(circleId);
    }else{
        $('#circleId').val($("#businesscircle_combox_detail").val());

        if ($("#businesscircle_combox_detail")[0].options.length != 0){
            $('#circleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
        }else{
            $('#circleName').val("");
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

    $('#circleId').val($("#businesscircle_combox_detail").val());
    if ($("#businesscircle_combox_detail")[0].options.length != 0){
        $('#circleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
    }else{
        $('#circleName').val("");
    }
};

var businesscircleComboxChangeOfDetail = function(){
    $('#circleId').val($("#businesscircle_combox_detail").val());
    if ($("#businesscircle_combox_detail")[0].options.length != 0){
        $('#circleName').val($("#businesscircle_combox_detail")[0].options[$("#businesscircle_combox_detail")[0].selectedIndex].text);
    }else{
        $('#circleName').val("");
    }
};

function checkInputClick(obj){
    var check_input_id = obj;
    var checkArrayIndex = parseInt(check_input_id.substring(5, check_input_id.length-6));
    
    if (!$('#'+check_input_id)[0].checked){
        check[checkArrayIndex] = 0;
    }else{
        check[checkArrayIndex] = 1;
    }
};
$(function() {
	$('#personName').combobox({
        delay:1000,
        keyHandler:$.extend({},$.fn.combobox.defaults.keyHandler,{
            query: function(e){
                var oldPersonName = $('#personName').combobox('getValues');
                var personName = e;
                $('#personName').combobox({
                    onBeforeLoad: function(param){
                        param.personName = personName;
                    }
                })

                $('#personName').combobox('reload', base+'/mgmtUserController/getPersonNameList');


                if (oldPersonName.indexOf(',') == -1){
                    oldPersonName = personName;
                }else {
                    var index = oldPersonName.lastIndexOf(',');
                    oldPersonName = oldPersonName.substring(0, index) + officeName;
                }

                $('#personName').combobox().next('span').find('input').focus();
                $('#personName').combobox('setValues', oldPersonName);
            },
            enter: function(e){
                var oldPersonName = $('#personName').combobox('getValues');
                var personName = e.target.value;
                $('#personName').combobox({
                    onBeforeLoad: function(param){
                        param.personName = personName;
                    }
                })

                $('#personName').combobox('reload', base+'/mgmtUserController/getPersonNameList');


                if (oldPersonName.indexOf(',') == -1){
                    oldPersonName = personName;
                }else {
                    var index = oldPersonName.lastIndexOf(',');
                    oldPersonName = oldPersonName.substring(0, index) + officeName;
                }

                $('#personName').combobox().next('span').find('input').focus();
                $('#personName').combobox('setValues', oldPersonName);
            }
        })
    });
	
	if ($('#accendantId').val() != null){
		$('#personName').combobox('setValue', $('#accendantId').val());
		$('#personName').combobox('setText', $('#accendantName').val());
	}
})

var personSelect = function(record){
	$('#accendantId').val(record.userId);
	$('#accendantName').val(record.fullname);
}

/**
 * 人员名称下拉框显示名称格式化
 * @returns {*}
 * @author chenjun 20160322
 */
function formatItemOfPersonName(row){
    var deptName = '&nbsp;&nbsp;<span style="color:#888">' + "部门: " + row.deptName + '</span>';
    if (row.title != null && row.title != ''){
        deptName += '<span style="color:#888">' + ", 职位: " + row.title + '</span>';
    }
    var s = '<span style="font-weight:bold">' + row.fullname + '</span>' + deptName;
    return s;
}