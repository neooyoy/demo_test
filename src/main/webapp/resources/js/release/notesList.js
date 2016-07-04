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
        tBoolCheckbox: false,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order : gridOptions.params.order,
        _handleTbodyTrClick: function(record){
        }
    });

    /**
     * 生成分类列表
     * @type {dataGrid}
     */
    $.fn['grid_id2'] = new dataGrid();
    var gridOptions2 = getDataGridOptions("grid_id2");

    $("#grid_id2")['grid_id2'].init({
        id: gridOptions2.id,
        searchButtonId: gridOptions2.searchButtonId,
        searchParams: gridOptions2.searchParams,
        url: gridOptions2.url,
        tHeadCols: gridOptions2.tHeadCols,
        trTdentity: gridOptions2.trTdentity,
        tableWidth : gridOptions2.width,
        tBoolCheckbox: false,
        tBoolPage:false,
        params: gridOptions2.params,
        order : gridOptions2.params.order,
        _handleTbodyTrClick: function(record){
        }
    });


    $('#addParentUrlBtn').click(function(){
        $('#parentId').val(null);
        $('#parentName').val(null);
        $('#parentName').attr('placeholder', null);
        $('#addUrlModal').modal('show');
    })

    $('#addParentUrl').click(function(){
        var parentId = $('#parentId').val();
        var parentName = $('#parentName').val();
        if(parentName){
            $.ajax({
                url: base+'/release/addReleaseUrl',
                type: 'post',
                data: {"id":parentId, "name":parentName},
                success: function (releaseUrl) {
                    $('#addUrlModal').modal('hide');
                    if (releaseUrl.id) {
                        var option = $('#urlId_combox option[value='+releaseUrl.id+']');
                        if(option){
                            option.text(releaseUrl.name);
                        }else{
                            $('#urlId_combox').append('<option value="'+releaseUrl.id+'">'+releaseUrl.name+'</option>');
                        }
                        $('#btn_search2').click();
                        $('#btn_search1').click();
                    }else{
                        $('#msgModal p').text('操作失败').css('color', 'red');
                        $('#msgModal').modal('show');
                        setTimeout(function () {
                            $('#msgModal').modal('hide');
                        }, 1000);
                    }
                }
            })
        }else{
            $('#msgModal p').text('填写名称').css('color', 'red');
            $('#msgModal').modal('show');
            setTimeout(function () {
                $('#msgModal').modal('hide');
            }, 1000);
        }
    })

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
                html+='<span style="display:block">'+record[i].urlCode+'&nbsp;&nbsp;'+record[i].name+'</span>';
            }else if(i==9){
                html+='<a onclick="$(this).parents(\'tr\').find(\'.btn-dialog\').click();" href="javascript:void(0)" style="display:block">查看更多</a>';
            }
        }
    }
    return html;
}

/**
 * 删除版本说明
 */
function deleteReleaseNotes(id){
    $('#deleteModal p').parent().hide();
    $('#deleteModal').modal('show');
    $('#deleteModal').on('hide.bs.modal', function () {
        $("#deleteBtn").unbind("click")
    })
    $('#deleteBtn').click(function(){
        $.ajax({
            url: base+'/release/deleteReleaseNotes',
            type: 'post',
            data: {"id":id},
            success: function (data) {
                $('#deleteModal').modal('hide');
                if (data=='ok'){
                    $('#msgModal p').text('删除成功').css('color', 'green');
                    $('#msgModal').modal('show');
                    setTimeout(function () {
                        $('#msgModal').modal('hide');
                        $('#btn_search').click();
                    }, 1000);
                }
                $("#deleteBtn").unbind("click")
            }
        })
    });
}

/**
 * 删除版本说明
 */
function deleteParentUrl(id){

    $('#deleteModal p').text('删除后分类下的页面记录与版本说明记录都将被删除');
    $('#deleteModal p').parent().show();
    $('#deleteModal').modal('show');
    $('#deleteModal').on('hide.bs.modal', function () {
        $("#deleteBtn").unbind("click")
    })
    $('#deleteBtn').click(function(){
        $.ajax({
            url: base+'/release/deleteParentUrl',
            type: 'post',
            data: {"id":id},
            success: function (data) {
                $('#deleteModal').modal('hide');
                if (data=='ok'){
                    $('#msgModal p').text('删除成功').css('color', 'green');
                    $('#msgModal').modal('show');
                    setTimeout(function () {
                        $('#msgModal').modal('hide')
                        $('#btn_search2').click();
                    }, 1000);
                }
                $("#deleteBtn").unbind("click")
            }
        })
    });
}


function editParentUrl(id, name){
    $('#parentId').val(id);
    $('#parentName').val(name);
    $('#parentName').attr('placeholder', name);
    $('#addUrlModal').modal('show');
}

$(function () {

// 为table绑定click事件
    $("table.smart").on("click", function (e) {
        var td = e.target;
        var tr = $(td).parents("tr");
        tr.children("td").css("background-color", "#08C").css("color", "white");
        tr.siblings("tr").each(function () {
            $(this).children("td").css("background-color", "").css("color", "");
        });
    });

    // 初始化权限列表 begin
    var menu = $("#menu");
    var zNodes = [];
    var nodes;
    var node;
    var zTree;
    var nodeJson;
    var urlParentid;

    var setting = {
        check: {
            enable: true,
            chkDisabledInherit: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        view: {},
        callback: {
            onClick: onClick,
            onCheck: onCheck
        }
    };

    function onClick(event, treeId, treeNode) {
        zTree.checkNode(treeNode, null, true, false);
        onCheck(event, treeId, treeNode);
    }

    function onCheck(event, treeId, treeNode) {
        // console.log("urlParentid:"+urlParentid);
    }
    for (i in menus) {
        node = {
            id: menus[i].id,
            pId: menus[i].parentid,
            name: menus[i].menuName,
            urlCode: menus[i].urlCode,
            // iconSkin: menus[i].parent ? 'pIcon01' : 'icon01',
            icon: menus[i].type == 0 ? jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/1_open.png" :
                (menus[i].type == 1 ? jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/m1.png" : jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/3.png"),
            iconOpen: menus[i].type == 0 ? jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/1_open.png" :
                (menus[i].type == 1 ? jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/m1.png" : jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/3.png"),
            iconClose: menus[i].type == 0 ? jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/1_close.png" :
                (menus[i].type == 1 ? jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/m2.png" : jspath + "/resources/plugins/ztree/css/zTreeStyle/img/diy/3.png"),
            nocheck: menus[i].id == 1 ? true : false
        };
        zNodes.push(node);
        node = null;
    }
    $.fn.zTree.init($("#tree"), setting, zNodes).expandAll(true);
    zTree = $.fn.zTree.getZTreeObj("tree");
    nodes = zTree.getNodes();
    nodeJson = zTree.transformToArray(nodes);
    // 初始化权限列表 end

    $(".btn-dialog").on("click", function () {
        zTree.checkAllNodes(false);
        urlParentid = $(this).attr("data-id");
        $.ajax({
            url: base + '/release/urlListByParentId',
            data: {"parentid": urlParentid},
            type: 'get',
            dataType: "json",
            success: function (jsonObject) {
                var releaseUrlList = jsonObject.rows;
                for (x in releaseUrlList) {
                    for (y in nodeJson) {
                        if (nodeJson[y].id == releaseUrlList[x].menuId) {
                            zTree.checkNode(nodeJson[y], true, false);
                        }
                    }
                }
                $("#tree-modal").modal();
            }
        });
        // 阻止继续冒泡，但不能阻止元素默认事件
        // event.stopPropagation();
    });

    // 保存树形菜单
    $("#btn-save-url-menu").on("click", function () {
        var cNodes = zTree.getCheckedNodes();
        var releaseUrlList = [];
        for (i in cNodes) {
            if(cNodes[i].urlCode!=''&&cNodes[i].urlCode!='#'){
                var releaseUrl = new Object();
                releaseUrl.menuId = cNodes[i].id;
                releaseUrl.name = cNodes[i].name;
                releaseUrl.urlCode = cNodes[i].urlCode;
                releaseUrl.parentid = urlParentid;
                releaseUrlList.push(releaseUrl);
            }
        }
        $.ajax({
            url: base + '/release/saveUrlListByParentid',
            type: 'post',
            data: {"parentid": urlParentid, "releaseUrlList": JSON.stringify(releaseUrlList)},
            success: function (res) {
                BootstrapDialog.show({
                    title: '保存页面',
                    message: res.msg,
                    buttons: [{
                        label: 'OK',
                        action: function (dialog) {
                            dialog.close();
                            if (res.code == 0) {
                                window.location.reload();
                            }
                        }
                    }]
                });
            }
        });
    });

});

