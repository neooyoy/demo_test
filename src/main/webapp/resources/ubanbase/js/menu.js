/**
 * Created by Administrator on 2015/11/27.
 */

var menu = $("#menu");
var zNodes = [];
var IDMark_A = "_a";

var setting = {
    data: {
        simpleData: {
            enable: true
        }
    },
    view: {
        addDiyDom: addDiyDom,
        dblClickExpand: false
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false,
        drag: {
            isCopy: false,
            isMove: true,
            prev: false,
            next: false,
            inner: true,
        }
    },
    callback: {
        onClick: onClick,
        beforeDrop: beforeDrop,
        onDrop: onDrop
    }
};

/******************** ztree方法自定义实现 ********************/
function onDrop(event, treeId, treeNodes, targetNode, moveType) {
    $.ajax({
        url: base + '/system/menu/move',
        type: 'post',
        data: {'id': treeNodes[0].id, 'parentid': targetNode.id},
        dataType: "json",
        success: function (result) {
            BootstrapDialog.alert({
                title: '移动结果',
                message: result.msg,
                type: result.code == 0 ? BootstrapDialog.TYPE_SUCCESS : BootstrapDialog.TYPE_DANGER,
                buttons: [{
                    label: '确认',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        }
    });
};

function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    var curType = treeNodes[0].type,
        targetType = targetNode.type,
        flag;
    if (targetType == 0) {
        flag = (curType < 2);
    } else if (targetType == 1) {
        flag = (curType == 2);
    } else {
        flag = false;
    }
    return flag && confirm('确定要将【' + treeNodes[0].name + '】移动到【' + targetNode.name + '】吗？');
}

// 点击节点
function onClick(event, treeId, treeNode, clickFlag) {
    document.getElementById("menu").reset();
    $.getJSON(base + '/system/menu/search', {"id": treeNode.id}, function (md) {
        $(menu).find("#parentid").val(md.parentid);
        $(menu).find("#parentMenuName").text(md.parentName ? md.parentName + "(" + md.parentUrlCode + ")" : '');
        $(menu).find("#curId").val(md.id);
        $(menu).find("#oldName").val(md.menuName);
        $(menu).find("#menuName").val(md.menuName);
        $(menu).find("#type").val(md.type).prop('disabled', true).css("cursor", "not-allowed");
        $(menu).find("#urlCode").val(md.urlCode);
        $(menu).find("#code").val(md.code);
        $(menu).find("#isOldSystem").val(md.isOldSystem);
        $(menu).find("#isOldSystem").prop("checked", md.isOldSystem == 1 ? true : false);
        $(menu).find("#isvisible").prop("checked", md.isvisible == 1 ? true : false);
        $(menu).find("#menuOrder").val(md.menuOrder);
        $(menu).find("#userNum").html("<a style='color:blue' href="+base+"/system/user.html?menuId="+treeNode.id+">" + md.userNum + "</a>");
        $(menu).find("#roles").html(md.roles);
        
        $("#save_menu").attr("type", "edit");
    });
}

function addDiyDom(treeId, treeNode) {
    var aObj = $("#" + treeNode.tId + IDMark_A);
    if (treeNode.id != 1) {
        var delStr = "<span class='suffixIcon' title='删除[" + treeNode.name + "]' onfocus='this.blur();'><span class='button del' data-treeId='" + treeNode.id + "'></span></span>";
        aObj.append(delStr);
    }
    if (treeNode.type < 2) { // 权限
        var addStr = "<span class='suffixIcon' title='新增子[" + (treeNode.type == 0 ? "目录/菜单" : "操作") + "]' onfocus='this.blur();'><span class='button add' data-treeId='" + treeNode.id + "'></span></span>";
        aObj.append(addStr);
    }

}

$(document).ready(function () {
    // 初始化权限树形
    var node;
    for (i in menus) {
        node = {
            id: menus[i].id,
            pId: menus[i].parentid,
            name: menus[i].menuName+"(" + menus[i].code + ")",
            type: menus[i].type,
            icon: menus[i].type == 0 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/1_open.png" :
                (menus[i].type == 1 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/m1.png" : jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/3.png"),
            iconOpen: menus[i].type == 0 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/1_open.png" :
                (menus[i].type == 1 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/m1.png" : jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/3.png"),
            iconClose: menus[i].type == 0 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/1_close.png" :
                (menus[i].type == 1 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/m2.png" : jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/3.png"),
        };
        zNodes.push(node);
        node = null;
    }
    $.fn.zTree.init($("#tree"), setting, zNodes).expandAll(true);

    var zTree = $.fn.zTree.getZTreeObj("tree");

//    var nodes = zTree.getNodes();
//    zTree.expandNode(nodes[0]);

    $(".suffixIcon").on("click", function (e) {
        var target = e.target;
        var treeId = $(target).attr("data-treeId");
        var targetNode = zTree.getNodesByParam("id", treeId)[0];
        zTree.selectNode(targetNode);

        if ($(target).hasClass("add")) { // 新增
            menu[0].reset();
            $("#save_menu").attr("type", "add");
            $.getJSON(base + "/system/menu/search", {"id": treeId}, function (menu) {
                $("#menu").find("#parentMenuName").text(menu.menuName + "(" + menu.urlCode + ")");
                $("#menu").find("#parentid").val(menu.id);
                if (menu.type == 0) {
                    $("#menu").find("#type").removeAttr("disabled").css("cursor", "default");
                    $("#menu").find("#type option").eq(2).prop('disabled', true).siblings().removeAttr('disabled');
                } else if (menu.type == 1) {
                    $("#menu").find("#type").removeAttr("disabled").css("cursor", "default").val(2);
                    $("#menu").find("#type option").eq(2).removeAttr('disabled').siblings().prop('disabled', true);
                }
            })
        } else if ($(target).hasClass("del")) {
            BootstrapDialog.show({
                type: BootstrapDialog.TYPE_WARNING,
                title: '权限控制',
                message: '确定要删除【' + targetNode.name + '】吗?',
                buttons: [{
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: '确定',
                    cssClass: 'btn-warning',
                    action: function (dialog) {
                        dialog.close();
                        $.ajax({
                            url: base + '/system/menu/delete',
                            data: {"id": targetNode.id},
                            type: 'post',
                            dataType: "json",
                            success: function (result) {
                                BootstrapDialog.show({
                                    title: '删除结果', message: result.msg,
                                    buttons: [{
                                        label: 'OK',
                                        action: function (dialog) {
                                            dialog.close();
                                        }
                                    }]
                                });
                                if (result.code == 0) {
                                    zTree.removeNode(targetNode);
                                }
                            }
                        });
                    }
                }]
            });
        }
        e.stopPropagation();
    });

    // jquery.validate
    menu.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            menuName: {
                minlength: 2,
                required: true
            },
            urlCode: {
                minlength: 1,
                required: true
            },
            menuOrder: {
                integer: 0,
                required: true
            }
        },
        highlight: function (element) { // hightlight error inputs
            $(element).closest('.help-inline').removeClass('ok'); // display OK icon
            $(element).closest('.control-group').removeClass('success').addClass('error'); // set error class to the control group
        },

        unhighlight: function (element) { // revert the change dony by hightlight
            $(element).closest('.control-group').removeClass('error'); // set error class to the control group
        },
        success: function (label) {
            label.addClass('valid').addClass('help-inline ok') // mark the current input as valid and display OK icon
                .closest('.control-group').removeClass('error').addClass('success'); // set success class to the control group
        },
        submitHandler: function (form) {
            // TODO 验证通过执行的方法
        }
    });

    // 保存
    $("#save_menu").on("click", function () {
        var curId = $("#curId").val();
        if (curId == 1) {
            alert("不允许修改根节点");
            return false;
        }

        var type = $(this).attr("type");
        if (type == "add") {
            $("#curId").val('');
        }

        if (menu.valid()) {
            BootstrapDialog.show({
                title: '权限控制',
                message: '确定要' + (type == 'add' ? '新增权限【' + $('#menuName').val() : '修改权限【' + $('#oldName').val()) + '】吗？',
                buttons: [{
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                        $.ajax({
                            url: base + '/system/menu/save',
                            type: 'post',
                            data: $(menu).serialize(),
                            dataType: "json",
                            success: function (result) {
                                BootstrapDialog.show({
                                    title: '修改结果', message: result.msg,
                                    buttons: [{
                                        label: 'OK',
                                        action: function (dialog) {
                                            dialog.close();
                                        }
                                    }]
                                });
                                if (result.code == 0) {
                                    // 新增-异步添加节点，修改-刷新节点
                                    var menu = result.menu;

                                    if (type == "add") {
                                        var parentNode = zTree.getNodesByParam("id", $("#parentid").val(), null);
                                        var newNode = {
                                            id: menu.id,
                                            pId: menu.parentid,
                                            name: menu.menuName,
                                            type: menu.type,
                                            icon: menu.type == 0 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/1_open.png" :
                                                (menu.type == 1 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/m1.png" : jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/3.png"),
                                            iconOpen: menu.type == 0 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/1_open.png" :
                                                (menu.type == 1 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/m1.png" : jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/3.png"),
                                            iconClose: menu.type == 0 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/1_close.png" :
                                                (menu.type == 1 ? jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/m2.png" : jspath + "/resources/vendors/ztree/css/zTreeStyle/img/diy/3.png"),
                                        };
                                        zTree.addNodes(parentNode[0], newNode);
                                    } else {
                                        var targetNode = zTree.getNodesByParam("id", menu.id, null)[0];
                                        targetNode.name = menu.menuName;
                                        zTree.updateNode(targetNode);
                                    }
                                }
                            }
                        });
                    }
                }]
            });
        }
    });

    // 重置
    $("#reset_menu").on("click", function () {
        $("#menu")[0].reset();
        $("#type").val($("#type option:not(:disabled)").eq(0).val());
    });
});