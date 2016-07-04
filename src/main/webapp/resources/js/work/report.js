function systemExportReport(menuCode){
    var Parames = '';
    Parames += menuCode;
    var endTimeNum = 86400;
    var create_atBegin = $('#create_atBegin').val();
    var create_atEnd = $('#create_atEnd').val();
    if (create_atBegin != null && create_atBegin !=''){
        var begintime = new Date(create_atBegin.replace(/-/g, ','));
        create_atBegin = parseInt(begintime.getTime()/1000);
        Parames += "?begin=" + create_atBegin;
    }
    else
    {
        alert("请选择开始日期");
        return;
    }
    if (create_atEnd != null && create_atEnd !=''){
        var endtime = new Date(create_atEnd.replace(/-/g, ','));
        create_atEnd = parseInt(endtime.getTime()/1000) + endTimeNum;
        if(Parames == ''){
            Parames += "?end=" + create_atEnd;
        }else {
            Parames += "&end=" + create_atEnd;
        }
    }
    else {
        if(menuCode != '080309') {
            alert("请选择结束日期");
            return;
        }
    }
    $('#exportForm').attr("action", base + "/exportReportController/systemExportReport/" + Parames);
    $('#exportForm').submit();
}


$(function() {
    $('[name=create_atBegin]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });

    $('[name=create_atEnd]').datepicker({
        format : 'yyyy-mm-dd',
        todayHighlight:true,
        todayBtn:'linked'
    });
});

var runBtn = function(){
    $("#table2").hide();
    $("#table3").hide();
    $("#table4").hide();
    $("#table1").show();
};

var serviceBtn = function(){
    $("#table1").hide();
    $("#table3").hide();
    $("#table4").hide();
    $("#table2").show();
};

var officeBtn = function(){
    $("#table2").hide();
    $("#table1").hide();
    $("#table4").hide();
    $("#table3").show();
};

var dataBtn = function(){
    $("#table2").hide();
    $("#table3").hide();
    $("#table1").hide();
    $("#table4").show();
};