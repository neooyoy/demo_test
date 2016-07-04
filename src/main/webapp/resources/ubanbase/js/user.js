/**
 * Created by Administrator on 2015/12/7.
 */

$(function () {
    // 修改用户角色
    $(".edit-user-role").on("click", function () {
        var targetUserId = $(this).attr("data-user-id");
        $("#targetUser").val(targetUserId);
        $("#targetName").val($(this).parents("td").siblings(".fullname").text());
        $.ajax({
            url: base + '/system/user/role/search',
            data: {"userId": targetUserId},
            type: 'get',
            dataType: "json",
            success: function (ids) {
                $(":checkbox[name='roleids']").removeAttr("checked");
                for (i in ids) {
                    $(":checkbox[name='roleids'][value='" + ids[i] + "']").prop("checked", true);
                }
                $("#user-role-modal").modal();
            }
        });

    });

    // 保存修改
    $("#btn-save-user-role").on("click", function () {
        var userId = $("#targetUser").val();
        var name = $("#targetName").val();
        var ids = [];
        $("input[name='roleids']:checked").each(function (i) {
            ids.push($(this).val());
        });

        BootstrapDialog.show({
            title: '用户角色',
            message: '确定要修改用户【' + name + '】角色吗？',
            type: BootstrapDialog.TYPE_WARNING, closable: true, draggable: true,
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
                        url: base + '/system/user/role/save',
                        type: 'post',
                        data: {'userId': userId, 'roleIds': ids},
                        dataType: "json",
                        success: function (result) {
                            BootstrapDialog.alert(result.msg);
                            $("#user-role-modal").modal('hide');
                        }
                    });
                }
            }]
        });
    });

    // 删除用户
    $(".del-user-role").on("click", function () {
        var targetUserId = $(this).attr("data-user-id");
        var targetName = $(this).parents("td").siblings(".fullname").text();

        BootstrapDialog.show({
            title: '用户角色',
            message: '确定要删除用户【' + targetName + '】吗？',
            type: BootstrapDialog.TYPE_WARNING, closable: true, draggable: true,
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
                        url: base + '/system/user/delete',
                        data: {"userId": targetUserId},
                        type: 'post',
                        dataType: "json",
                        success: function (result) {
                            BootstrapDialog.show({
                                title: "删除结果",
                                message: result.msg,
                                buttons: [{
                                    label: '确定',
                                    action: function (dialog) {
                                        window.location.reload();
                                    }
                                }]
                            });
                        }
                    });
                }
            }]
        });
    });

    // 新增用户按钮
    $("#btn-associate").on("click", function () {
        $("#associate-modal").modal();
    });

    // 关联查询
    $("#btn-associate-search").on("click", function () {
        var search = $("#search").val();
        if (search.length != 0) {
            $.ajax({
                url: base + '/system/user/search',//encodeURI()
                data: {"fullname": search},
                type: 'get',
                dataType: "json",
                success: function (result) {
                    $("#tbd-associate").empty();
                    if (result.code == 0 && result.size > 0) {
                        var users = result.users;
                        for (i in users) {
                            var tr = $("<tr></tr>");
                            tr.append($("<td></td>").append($("<input type='checkbox' name='userids'>").val(users[i].userId)))
                                .append($("<td></td>").append(users[i].userId))
                                .append($("<td></td>").append(users[i].fullname))
                                .append($("<td></td>").append(users[i].loginname))
                                .append($("<td></td>").append(users[i].email))
                                .append($("<td></td>").append(users[i].cellphone));
                            $("#tbd-associate").append(tr);
                        }
                    }
                }
            });
        }
    });

    // 添加保存
    $("#btn-associate-save").on("click", function () {
        var userids = [];
        $(":checked[name='userids']").each(function () {
            userids.push($(this).val());
        });
        if (userids.length > 0) {
            BootstrapDialog.show({
                title: '用户角色',
                message: '确定要添加用户吗？',
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
                            url: base + '/system/user/save',
                            type: 'post',
                            data: {"userIds": userids},
                            dataType: "json",
                            success: function (result) {
                                if (result.code == 0) {
                                    window.location.reload();
                                } else {
                                    BootstrapDialog.show({
                                        title: "删除结果",
                                        message: result.msg,
                                        buttons: [{
                                            label: '确定',
                                            action: function (dialog) {
                                                dialog.close();
                                            }
                                        }]
                                    });
                                }
                            }
                        });
                    }
                }]
            });
        } else {
            BootstrapDialog.show({
                title: "关联用户",
                message: '请先选择用户',
                buttons: [{
                    label: '确定',
                    action: function (dialog) {
                        dialog.close();
                    }
                }]
            });
        }

    });

    //用户权限
    $(".user-permission").on("click", function () {
        var targetUserId = $(this).attr("data-user-id");
        $.ajax({
            url: base + '/system/user/permission/search',
            data: {"userId": targetUserId},
            type: 'get',
            dataType: "json",
            success: function (menus) {
                var menus = eval(menus);
                // 初始化权限列表 begin
                //var menu = $("#menu");
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
                    //callback: {
                    //    onClick: onClick,
                    //    onCheck: onCheck
                    //}
                };

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
                $("#tree-modal").modal();
            }
        });

    });
})