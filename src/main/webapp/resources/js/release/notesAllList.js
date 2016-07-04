var options = getComboxOptions("urlId_combox");

$(function(){

    $("#btn_reset").on("click", function () {
        $("#queryForm")[0].reset();
    });

    /**
     * 版本说明分类combox
     * @type {combox}
     */
    $.fn.urlId_combox = new combox();
    $("#urlId_combox").urlId_combox.init({
        hidenDisabledValue: options.hidenDisabledValue,
        lable : options.lable,
        id : options.id,
        value : options.value,
        text : options.text,
        data : options.data
    });


    /**
     * 生成说明列表
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
        tBodyMouserOverBgcolor:gridOptions.tBodyMouserOverBgcolor,
        tBodyMouserOutBgcolor:gridOptions.tBodyMouserOutBgcolor,
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order : gridOptions.params.order,
        _handleTbodyTrClick: function(record){
        }
    });

})

/**
 * 日志内容-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfNotesText(record, value){
    if(value.length>20){
        return value.substr(0,20)+'...';
    }
    return value;
}

/**
 * 日志内容-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfAllNotesText(record, value){
    var html='<div class="span12" style="width: 60%;margin-left: 15%;"><h3 class="text-center">'+record.name+'</h3>' +
        '<p style="line-height: 28px;font-size: 15px;" class="text-right">'+ renderOfUrlId(null, record.urlId) +'&nbsp;&nbsp;&nbsp;&nbsp;</p>';

    var notesList=new Array()
    notesList = record.notes.split("\n");
    for(i in notesList){
        html+='<p style="line-height: 28px;font-size: 15px;text-indent: 2em;">'+notesList[i]+'</p>';
    }
    html+='<p style="line-height: 28px;font-size: 15px;" class="text-right">发布时间：'+dateMinuteToZHDate(record.createAt)+'&nbsp;&nbsp;&nbsp;&nbsp;</p></div>';

    return html;
}

/**
 * 版本分类-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfUrlId(record, value){
    for(var i=0;i<options.data.length;i++){
        if(value==options.data[i].id){
            return options.data[i].name;
        }
    }
    return '';
}

/**
 * 说明操作-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfNotesBtn(record, value){
    //
    if (value!=null && value>0){
        return '<a class="btn btn-red btn-default" onclick="deleteReleaseNotes('+value+')" href="javascript:void(0)">删除</a>';
    }
    return '';
}

/**
 * 说明名称-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfNotesName(record, value){
    return '<a style="color: blue" href="'+base+'/release/releaseNotesDetail?id='+record.id+'" >'+value+'</a>';
}

/**
 * 分类操作-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfUrlBtn(record, value){
    //
    if (value!=null && value>0){
        return '<a class="btn btn-red btn-default" onclick="deleteParentUrl('+value+')" href="javascript:void(0)">删除</a>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<a class="btn btn-blue btn-default" onclick="editParentUrl('+value+', \''+ record.name +'\')" href="javascript:void(0)">修改</a>&nbsp;&nbsp;&nbsp;&nbsp;' +
            '<a class="btn btn-blue btn-default btn-dialog" data-id="'+record.id+'" href="javascript:void(0)">选择页面</a>';
    }
    return '';
}

/**
 * 包含页面-重新渲染
 * @param record
 * @param value
 * @returns {*}
 * @author chenjun 20160307
 */
function renderOfUrlList(record, value){
    var html='';
    if (record!=null && record.length>0){
        for(var i=0;i<record.length;i++){
            if(i<9){
                html+='<span style="display:block">'+record[i].urlCode+'</span>';
            }else if(i==9){
                html+='<a onclick="$(this).parents(\'tr\').find(\'.btn-dialog\').click();" href="javascript:void(0)" style="display:block">查看更多</a>';
            }
        }
    }
    return html;
}




