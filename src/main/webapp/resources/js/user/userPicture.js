var grid_id = "grid_id";
var queryUrl = base + "/userpictureController/queryUserPicture";
var uploadUrl = base+"/userpictureController/uploadUserPicture";
var logicDelete = base + "/userpictureController/logicDelete";

var departmentComboxData = [];
var searchDepIds = '';
var searchUserIds = '';

var pic_real_width = 0;
var pic_real_height = 0;


var searchParams = [];

var columns = [
               { field: 'deptId', title: '组织结构', width: 150, align: 'center', sortable: false ,render:deptRender},
               { field: 'fullname', title: '姓名', width: 150, align: 'center', sortable: false },
               { field: 'userId', title: '照片', width: 150, align: 'center', sortable: false,render:imgRender },
//               { field: 'phoneNum', title: '客户手机', width: 150, align: 'center', sortable: false },
               { field: 'userId', title: '操作', width: 150, align: 'center', sortable: false,render:optRender }
           ];



$(function () {
//	$('#mymodal').modal({backdrop: 'static'});
	createListTable(grid_id,queryUrl);
	createRangePic();
	

});

function loaderRunning(){
	$(".wrapper .load-bar .load-bar-inner").css("animation-play-state","running");
	$(".wrapper .load-bar .load-bar-inner").css("-moz-animation-play-state","running");
	$(".wrapper .load-bar .load-bar-inner").css("-o-animation-play-state","running");
	$(".wrapper .load-bar .load-bar-inner").css("-webkit-animation-play-state","running");
	$(".wrapper .load-bar #counter").css("animation-play-state","running");
	$(".wrapper .load-bar #counter").css("-moz-animation-play-state","running");
	$(".wrapper .load-bar #counter").css("-o-animation-play-state","running");
	$(".wrapper .load-bar #counter").css("-webkit-animation-play-state","running");
}

function loaderPaused(){
	$(".wrapper .load-bar .load-bar-inner").css("animation-play-state","paused");
	$(".wrapper .load-bar .load-bar-inner").css("-moz-animation-play-state","paused");
	$(".wrapper .load-bar .load-bar-inner").css("-o-animation-play-state","paused");
	$(".wrapper .load-bar .load-bar-inner").css("-webkit-animation-play-state","paused");
	$(".wrapper .load-bar #counter").css("animation-play-state","paused");
	$(".wrapper .load-bar #counter").css("-moz-animation-play-state","paused");
	$(".wrapper .load-bar #counter").css("-o-animation-play-state","paused");
	$(".wrapper .load-bar #counter").css("-webkit-animation-play-state","paused");
}

var boundx,boundy;
var jcrop_api;
var $preview = $('#preview-pane');
/**
 * 截取变化框创建
 */
function createRangePic(){

	// Grab some information about the preview pane
	var $pcnt = $('#preview-pane .preview-container'),
	$pimg = $('#preview-pane .preview-container img'),
	xsize = $pcnt.width(),
	ysize = $pcnt.height();
	$('#pic_target').Jcrop({
	    minSize: [150,225],
	    onChange: updatePreview,
	    onSelect: updatePreview,
	    aspectRatio: xsize / ysize
	},function(){
	    // Use the API to get the real image size
	    var bounds = this.getBounds();
	    boundx = bounds[0];
	    boundy = bounds[1];
	    // Store the API in the jcrop_api variable
	    jcrop_api = this;
	
	    // Move the preview into the jcrop container for css positioning
	    $preview.appendTo(jcrop_api.ui.holder);
	});
	function updatePreview(c)
	{
		var maxLeft = parseInt($(".jcrop-holder").width())-parseInt($("#myCutDiv").width());
		if(parseInt($("#myCutDiv").css("left"))>maxLeft){
			$("#myCutDiv").css("left",maxLeft);
		}
		var reverse_maxLeft = -maxLeft;
		if(parseInt($("#myCutDiv").find("img").css("left"))<reverse_maxLeft){
			$("#myCutDiv").find("img").css("left",reverse_maxLeft);
			
		}

	    if (parseInt(c.w) > 0)
	    {	
	    	var aaa = c.w;
	        var rx = xsize / c.w;
	        var ry = ysize / c.h;
	        var cx = c.x;
	        if(c.x>maxLeft){
	        	cx = maxLeft;
	        }
	        $pimg.css({
	            width: Math.round(rx * boundx) + 'px',
	            height: Math.round(ry * boundy) + 'px',
	            marginLeft: '-' + Math.round(rx * cx) + 'px',
	            marginTop: '-' + Math.round(ry * c.y) + 'px'
	        });
	    }
	    $('#xpoint').val(cx);
	    $('#ypoint').val(c.y);
	    $('#cut_width').val(c.w);
	    $('#cut_height').val(c.h);
	    $('#virtual_width').val($("#pic_target").width());
	    $('#virtual_height').val($("#pic_target").height());
		//alert(c.x+":"+c.y+":"+c.w+":"+c.h);
	};
	
	$(".jcrop-keymgr").hide();
	var wrapWid = $(".jcrop-holder").width()-parseInt($("#preview-pane").css("right"))+'px'
	$(".cut-pic-wrap").width(wrapWid)
	                  .css("margin","0 auto");
}

function deptRender(record,value){
	var key = "key"+value;
	var dept = deptjson[key];
	var ret = "";
	if(dept[1]!=''&&deptjson["key"+dept[1]]!=undefined){
		var parentDept = deptjson["key"+dept[1]];
		ret = parentDept[0]+"/"+dept[0];
	}else{
		ret = dept[0];
	}
	if(record.cityId=='12'){
		ret = "北京/"+ret;
	}else{
		ret = "上海/"+ret;
	}
	
	return ret;
}

function imgRender(record,value){
	var key = "key"+value;
	var imgUrl = "";
	if(userPicJson[key]!=undefined){
		imgUrl = "http://img2.static.uban.com/"+userPicJson[key];
	}else{
		imgUrl = base + "/resources/easyui/themes/default/images/boy.png";
	}
	var ret = '<img id="'+value+'" src="'+imgUrl+'" alt="pic" width="60" />';
	return ret;
}

function optRender(record,value){
	var key = "key"+value;
	var history_imgpath = "";
	if(userPicJson[key]!=undefined){
		history_imgpath = userPicJson[key];
	}
	var ret = "";
	ret += '<button type="button" value="上传" data-toggle="modal" data-target="#mymodal" onclick=initUpload("'+value+'","'+history_imgpath+'")  class="btn btn-default">上传</button>&nbsp;&nbsp;';
	ret += '<button type="button" value="查看" data-toggle="modal" data-target="#imgmodal" onclick=showHistoryImg("'+history_imgpath+'")  class="btn btn-default">查看</button>&nbsp;&nbsp;';
	ret += '<button type="button" value="删除" class="btn btn-default" onclick=doLogicDelete("'+history_imgpath+'")>删除</button>';
	
	return ret;
	
}

var intervalImg = null;
function initUpload(userId,history_imgpath){ 
	$("#userId").val(userId);
	$("#history_imgpath").val(history_imgpath);
	var imgUrl = base + "/resources/easyui/themes/default/images/boy.png";
	$(".cut-pic-wrap").find("img").attr("src",imgUrl);
}

function showHistoryImg(history_imgpath){
	var imgUrl = "";
	if(history_imgpath!=""){
		imgUrl = "http://img2.static.uban.com/"+history_imgpath;
	}else{
		imgUrl = base + "/resources/easyui/themes/default/images/boy.png";
	}
	var img = new Image();
	img.src = imgUrl;
	$(img).load(function(){
		var real_width = img.width;
		var real_height = img.height;
		var showHeight = 400;
		var showWidth = (parseFloat(showHeight)/parseFloat(real_height))*real_width;
		$("#pic_show").css("margin-left","250px")
		$("#pic_show").attr("src",imgUrl).width(showWidth).height(showHeight);

	})
}

function doLogicDelete(history_imgpath){
	$.ajax({
		url:logicDelete,
		type:"post",
		data:{'history_imgpath':history_imgpath},
		dataType:"json",
		success:function(result){
			BootstrapDialog.show({
    			title: '操作结果', 
    			message: result.msg,
    			buttons: [{
    				label: 'OK',
    				action: function (dialog) {
    					dialog.close();
    				}
    			}]
    		});
    		if(result.code=='0'){
    			userPicJson = eval('(' + result.userPicMap + ')');
    			reloadList();
    		}
		}
		
	});
}

var isLoad = false;
function changeImg(obj){
	var file_name = $("#pic_btn").val();
	if(file_name.toLowerCase().indexOf("jpg")==-1&&file_name.toLowerCase().indexOf("png")==-1
			&&file_name.toLowerCase().indexOf("jpeg")==-1&&file_name.toLowerCase().indexOf("bmp")==-1
			&&file_name.toLowerCase().indexOf("gif")==-1){
		alert("图片类型不正确,只能是jpg, jpeg, bmp, png, gif类型!");
		return;
	}
	var img = new Image();
	showImg(obj,img);
	$(img).load(function(){
		var real_width = img.width;
		var real_height = img.height;
		var showHeight = 400;
		var showWidth = (parseFloat(showHeight)/parseFloat(real_height))*real_width;
		boundx = showWidth;
		boundy = showHeight;
//		var imgOptions = {
//				boxWidth:showWidth,
//				boxHeight:showHeight
//		};
//		jcrop_api.setOptions(imgOptions);
//		$preview.appendTo(jcrop_api.ui.holder);
		$("[alt='previewImg']").width(showWidth).height(showHeight);
		$(".jcrop-holder").width(showWidth).height(showHeight);
		$(".jcrop-holder").find("img").width(showWidth).height(showHeight);
		$(".jcrop-tracker").width(showWidth+4).height(showHeight+4);
		var wrapWid = $(".jcrop-holder").width()-parseInt($("#preview-pane").css("right"))+'px'
		$(".cut-pic-wrap").width(wrapWid)
		                  .css("margin","0 auto");
	});
	$("#loaderDiv").show();
	$('#counter').html('50%');   
	isLoad = true;
	showImg(obj,$(".cut-pic-wrap").find("img")); 
	var imgNum=$("[alt='previewImg']").length;
	$("[alt='previewImg']").load(function(){
		if(!--imgNum){
			isLoad =false;
			$('#counter').html('100%');
			$("#loaderDiv").hide();
	    }
	});
}

var upload_tag = false;
function uploadImg(){
	if(parseInt($('#xpoint').val())<0){
		$('#xpoint').val(0);
	}
	var file_name = $("#pic_btn").val();
	if(file_name.toLowerCase().indexOf("jpg")==-1&&file_name.toLowerCase().indexOf("png")==-1
			&&file_name.toLowerCase().indexOf("jpeg")==-1&&file_name.toLowerCase().indexOf("bmp")==-1
			&&file_name.toLowerCase().indexOf("gif")==-1){
		alert("图片类型不正确,只能是jpg, jpeg, bmp, png, gif类型!");
		return;
	}
	var fileInput = $("#pic_btn")[0];
	var byteSize = fileInput.files[0].size;
	if(byteSize>1024*1024*10){
		alert("图片大小不能超过10M");
		return;
	}
	if($('#xpoint').val()==null||$('#xpoint').val()==""){
		alert("请在页面剪裁图片");
		return;
	}
	$('#loadmodal').modal('show');
	loaderRunning();
	var interval = setInterval(increment,100);  
	var current = 50;  
	function increment(){  
		current++;  
	    $('#loadCounter').html(current+'%');   
	    if(current == 99) { 
	    	clearInterval(interval);
	    }  
	}  

	var formData = new FormData($("#uploadForm")[0]);
	$.ajax({
		url:uploadUrl,
		type:"post",
		data:formData,
		contentType: false,  
        processData: false, 
		dataType:"json",
		success:function(result){
			loaderPaused();
			$('#loadCounter').html('100%');
			$('#loadmodal').modal('hide');
			BootstrapDialog.show({
    			title: '操作结果', 
    			message: result.msg,
    			buttons: [{
    				label: 'OK',
    				action: function (dialog) {
    					dialog.close();
    				}
    			}]
    		});
    		if(result.code=='0'){
    			upload_tag = true;
    			userPicJson = eval('(' + result.userPicMap + ')');
    			reloadList();
    		}
		}
		
	});
	$('#mymodal').modal('hide');
	
	
}





function showImg(objfile,showImg){
	var count = 0;
	if("undefined" != typeof FileReader){
		var reader = new FileReader();
		reader.onload = function ( event ) { 
			var txt = event.target.result;
			$(showImg).attr("src",txt);
		};
		reader.readAsDataURL(objfile.files[0]);
	}else{
		$(showImg).attr("src",$(objfile).val());
	}
}


function createListTable(grid_id,queryUrl){
	
	var param = createSearchParam();
	
	var gridOptions = {
			id: grid_id,
			pageSize: 20,  //每页显示个数
			width: '100%',
			params:{
				'sort' : 'desc'
			},
			trTdentity: 'id',
			url: queryUrl,
			tHeadCols:columns
	};
	
	/**
	 * 生成列表
	 * @type {dataGrid}
	 */
	$.fn[gridOptions.id] = new dataGrid();
	
	$("#"+gridOptions.id)[gridOptions.id].init({
		id: gridOptions.id,
		searchButtonId: gridOptions.searchButtonId,
		searchParams: gridOptions.searchParams,
		url: gridOptions.url,
		tHeadCols: gridOptions.tHeadCols,
		trTdentity: gridOptions.trTdentity,
		tableWidth : gridOptions.width,
		tBoolCheckbox: false,
		pageSize: gridOptions.pageSize,
		isOverWriteThclick: true,
		params: param,
		order : gridOptions.params.order,
		onload:function(){
			$('.poshytooltip').poshytip({
				alignY: 'bottom'
			});
		},
		tBodyTrDblclickCallBack: function (record) {
			
		},
		_handleTbodyTrClick: function(record){
			
		},
		thClickCallback: function(orderField){
			
		}
	});
}

/**
 * 清空搜索条件
 */
var clearSearchValue = function () {
	$("#searchForm")[0].reset();
    $("#departmentCombox").combobox("setValues", []);
    $("#departmentUserComboxTree").combotree("setValues",'');
    $('#departmentUserComboxTree').combotree("loadData","");
    reloadCustomerGridAfterCleanSearchConditions(grid_id);

}




function reloadList(){
	$("#"+grid_id)[grid_id].reload({
        params: createSearchParam()
    });
}


/**
 * 清空搜索条件后加载列表
 */
function reloadCustomerGridAfterCleanSearchConditions(){

    $("#"+grid_id)[grid_id].reload({
        params: createSearchParam()
    });
};

/**
 * 组织架构change时，重新加载组织架构人员
 */
var departmentComboxChange = function(){
    departmentComboxData = $('#departmentCombox').combobox('getData');
    var departmentIdArray = $('#departmentCombox').combobox('getValues');
    var departmentIds = '';

    var inTheSelectDepartments = false;

    if (departmentIdArray == null || departmentIdArray.length == 0){
        $("#departmentUserComboxTree").combotree("setValues",'');
        $('#departmentUserComboxTree').combotree("loadData","");
        return;

       /* var data = departmentComboxData;

        if (data != null && data.length > 0){
            for (var i=0; i<data.length; i++){
                if (data[i]["deptId"] != -1){
                    departmentIds += data[i]["deptId"]+',';
                }
            }
            departmentIds = departmentIds.substring(0, departmentIds.length-1)
        }*/
    }else if (departmentIdArray.length > 1){
        for (var i=0; i<departmentIdArray.length; i++){
            if (departmentIdArray[i] != -1){
                departmentIds += departmentIdArray[i]+',';
            }
        }
        departmentIds = departmentIds.substring(0, departmentIds.length-1)
    }else{
        if (departmentIdArray[0] == -1){
            //var data = $('#departmentCombox').combobox('getData');
            var data = departmentComboxData;

            if (data != null && data.length > 0){
                for (var i=0; i<data.length; i++){
                    if (data[i]["deptId"] != -1){
                        departmentIds += data[i]["deptId"]+',';
                    }
                }
                departmentIds = departmentIds.substring(0, departmentIds.length-1)
            }
        }else{
            departmentIds = departmentIdArray[0];
        }
    }

    inTheSelectDepartments = departmentComboxData[0]['inTheSelectDepartments'];

    if (departmentIds == ''){
        return;
    }
    $('#departmentUserComboxTree').combotree({
        queryParams:{
            departmentIds : departmentIds,
            loop: true,
            inTheSelectDepartments:false
        },
        url:base+'/departmentController/loadDepartmentUserTreeNodes',
        method:'post',
//        onLoadSuccess:userHistory,
        panelHeight: '400px',
    });

    //$('#departmentUserComboxTree').combotree('tree').tree('getChecked')

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes?departmentIds='+departmentIds);

    //$('#departmentUserComboxTree').combotree('reload', base+'/departmentController/loadDepartmentUserTreeNodes');

}


/**
 * 获取列表刷新时的参数
 */
var createSearchParam = function(){


    
    var value = '';
    var checkedNodes = $('#departmentUserComboxTree').combotree('tree').tree('getChecked');
    if (checkedNodes != null && checkedNodes.length != 0){
        var depIds = '';
        var depNames = '';
        var userIds = '';
        var userNames = '';
        for (var j=0; j<checkedNodes.length; j++){
            if (checkedNodes[j].userNode){
                userIds += checkedNodes[j].id+',';
                userNames += checkedNodes[j].text+',';
            }else{
                depIds += checkedNodes[j].id+',';
                depNames += checkedNodes[j].text+',';
            }
        }
        if (userIds != ''){
            userIds = userIds.substring(0, userIds.length-1);
            userNames = userNames.substring(0, userNames.length-1);
        }
        if (depIds != ''){
            depIds = depIds.substring(0, depIds.length-1);
            depNames = depNames.substring(0, depNames.length-1);
        }

        searchDepIds = depIds;
        searchUserIds = userIds;

        if (userIds != '' && depIds == ''){
            var length = userNames.length;
            if (length > 15){
                userNames = userNames.substring(0,15) + '...';
            }
            value = "组织/人员：" + userNames;
        }else if (userIds != '' && depIds != ''){
            var length = depNames.length;
            if (length > 15){
                depNames = depNames.substring(0,15) + '...';
            }
            length = userNames.length;
            if (length > 15){
                userNames = userNames.substring(0,15) + '...';
            }
            value = "组织/人员：" + depNames + userNames;
        }else if (userIds == '' && depIds != ''){
            var length = depNames.length;
            if (length > 15){
                depNames = depNames.substring(0,15) + '...';
            }
            value = "组织/人员：" + depNames;
        }
    }else{
        var depIds = '';
        var depNames = '';
        var departments = $('#departmentCombox').combobox('getValues');
        if (departments != null && departments.length != 0){
            for (var j=0; j<departments.length; j++){
                if (departments[j] != -1){
                    depIds += departments[j]+',';
                }
            }
            if (depIds != ''){
                depIds = depIds.substring(0, depIds.length-1);
                depNames = $('#departmentCombox').combobox('getText');
            }
        }
        searchDepIds = depIds;
        searchUserIds = '';

        if (depIds != ''){
            value = "组织/人员：" + depNames;
        }
    }
    
    


    var params = {
    		'id':$("#id").val(),
    		'duty_status':$("#duty_status").val(),
            'searchUserIds': searchUserIds

    }

    return params;
}







