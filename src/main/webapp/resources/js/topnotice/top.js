//消息总数
var total_count = 0;
// 此处ajax不用同步,防止定时调用多假死影响性能,
// 而此参数防止异步修改total_count的线程同步问题
var is_changing = false;
// 是否执行Getnewmessage方法标识
var doGetnewmessage = false;
// 显示消息总数
function showTotalCount() {
	if (total_count > 0){
		$("#notice_count").css("display", '');
		$("#notice_count").text(total_count);
	}else{
		$("#notice_count").css("display", 'none');
	}

	$("#today_notice").text("今天已记录了"+total_count+"条短消息");
	total_count = 0;
}
// 客服滴滴提示消息
function Getnewmessage() {
	$.ajax({
		url : base + "/orderdidiController/kefuDidiNotice",
		type : 'post',
//		data : {
//			kefuflag : 1
//		},
//		async: false,
		success : function(data) {
			if (data.kefuflag == 1) {
				var not_adited_count = data.not_adited_count;
				var near_count = data.near_count;
				total_count += not_adited_count + near_count;
				$("#notaditedcount").text(countText(not_adited_count));
				$("#nearcount").text(countText(near_count));
				$("#didinotice").show();
			} else {
				$("#didinotice").hide();
			}
		}
	});
};

// 短信数量
function smsCount() {
	$.ajax({
		url : base + "/smsController/queryLogCount",
		type : "post",
		dataType : "json",
		async: false,
		success : function(result) {
			total_count += result.count;
			$("#smscount").text(countText(result.count));
		}
	});
}
// 微信数量
function wechartCount() {
	$.ajax({
		url : base + "/weChartController/queryLogCount",
		type : "post",
		dataType : "json",
		async: false,
		success : function(result) {
			total_count += result.count;
			$("#wechartcount").text(countText(result.count));
		}
	});
}

// 定时调用的方法
function excute_interval_method() {
	//smsCount();
	//wechartCount();
	Getnewmessage();
	showTotalCount();
}

function countText(paramcount){
	return "("+ paramcount +")"
}

$(function() {
	// $.ajax({
	// url:base+"/smsController/queryLogCount",
	// type:"post",
	// dataType:"json",
	// success:function(result){
	// $("#today_notice").text("今天已记录了"+result.count+"条短消息");
	// $("#today_notice").val(result.count);
	// $("#notice_count").text(result.count);
	// }
	// });
	
	//smsCount();
	//wechartCount();
	//Getnewmessage();
	//showTotalCount();
	//setInterval(excute_interval_method, 10000);
	
//	$.ajax({
//		url : base + "/orderdidiController/kefuDidiNotice",
//		type : "post",
//		dataType : "json",
//		data : {
//			"kefuflag" : 0
//		},
//		success : function(result) {
//			if (result.kefuflag == 1) {
//				Getnewmessage();
//				$("#didinotice").show();
//				setInterval(Getnewmessage, 10000);
//			} else {
//				$("#didinotice").hide();
//			}
//		}
//	});
})