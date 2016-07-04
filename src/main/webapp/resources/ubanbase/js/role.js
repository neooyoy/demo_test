/**
 * Created by Administrator on 2015/11/27.
 */


$(function () {
    // 初始化权限列表 begin
    var menu = $("#menu");
    var zNodes = [];
    var nodes;
    var node;
    var zTree;
    var nodeJson;
    var targetRoleId;

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
        // console.log("targetRoleId:"+targetRoleId);
    }
    for (i in menus) {
        node = {
            id: menus[i].id,
            pId: menus[i].parentid,
            name: menus[i].menuName,
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
        targetRoleId = $(this).attr("data-roleId");
        $.ajax({
            url: base + '/system/role/menus/search',
            data: {"roleId": targetRoleId},
            type: 'get',
            dataType: "json",
            success: function (roleMenus) {
                for (x in roleMenus) {
                    for (y in nodeJson) {
                        if (nodeJson[y].id == roleMenus[x].menuId) {
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
    $("#btn-save-role-menu").on("click", function () {
        var cNodes = zTree.getCheckedNodes();
        var menuIds = [];
        for (i in cNodes) {
            menuIds[i] = cNodes[i].id;
        }
        $.ajax({
            url: base + '/system/role/menus/save',
            type: 'post',
            dataType: "json",
            data: {"roleId": targetRoleId, "menuIds": menuIds},
            success: function (res) {
                BootstrapDialog.show({
                    title: '角色权限',
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

    var role = $("#role");

    // 获取角色详情
    $(".tr-roles").on("click", function (e) {
        var tId = $(this).find(".roleId").val();
        if (tId) {
            $.getJSON(base + '/system/role/search', {"id": tId}, function (r) {
                $(role).find("#id").val(r.id);
                $(role).find("#oldName").val(r.roleName);
                $(role).find("#roleName").val(r.roleName);
                $(role).find("#roleCode").val(r.roleCode);
            });
        }
    });

    // role验证
    role.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-inline', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            roleName: {
                minlength: 2,
                required: true
            },
            roleCode: {
                minlength: 2,
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
            // 验证通过执行的方法
        }
    });

    // 新增角色
    $("#new_role").on("click", function () {
        if ($("#id").val().length == 0 && role.valid()) {
            $(role).find("#id").val('');
            BootstrapDialog.show({
                title: '角色控制',
                message: '确定要新增角色【' + $("#roleName").val() + '】吗？',
                buttons: [{
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: '确定',
                    action: function (dialog) {
                        $.ajax({
                            url: base + '/system/role/save',
                            type: 'post',
                            data: $(role).serialize(),
                            dataType: "json",
                            success: function (result) {
                                dialog.setMessage(result.msg);
                                if (result.code == 0) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                }]
            });
        }
    });

    // 修改角色
    $("#edit_role").on("click", function () {
        if ($("#id").val().length > 0 && role.valid()) {
            BootstrapDialog.show({
                title: '角色控制',
                message: '确定要修改角色【' + $("#oldName").val() + '】吗？',
                buttons: [{
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: '确定',
                    action: function (dialog) {
                        $.ajax({
                            url: base + '/system/role/save',
                            type: 'post',
                            data: $(role).serialize(),
                            dataType: "json",
                            success: function (result) {
                                dialog.setMessage(result.msg);
                                if (result.code == 0) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                }]
            });
        }
    });

    // 删除
    $("#del_role").on("click", function () {
        var id = $("#id").val();
        if (id) {
            BootstrapDialog.show({
                title: '角色控制',
                message: '确定要删除角色【' + $("#roleName").val() + '】吗？',
                type: BootstrapDialog.TYPE_WARNING, closable: true, draggable: true,
                buttons: [{
                    label: '取消',
                    action: function (dialog) {
                        dialog.close();
                    }
                }, {
                    label: '确定',
                    action: function (dialog) {
                        $.ajax({
                            url: base + '/system/role/delete',
                            data: {"id": id},
                            type: 'post',
                            dataType: 'json',
                            success: function (result) {
                                dialog.setMessage(result.msg);
                                if (result.code == 0) {
                                    window.location.reload();
                                }
                            }
                        });
                    }
                }]
            });
        }
    });
});

