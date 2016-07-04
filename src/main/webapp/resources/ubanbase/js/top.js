/**
 * 导航栏
 * Created by Administrator on 2015/11/25.
 */

function ShowMenu(code) {
    $("a[data-hide='codehide']").css('display', 'none');
    $("a[data-class='codeclass']").attr('class', '');
    $("a[data-code='" + code + "']").css('display', 'block');
    $("#menusdown").css('display', 'block');
    $("#menusdown").css('overflow-y', 'auto');
};


function HideMenu() {
    var datadown = $('.active').attr('data-down');
    if (datadown == '0') {
        var onlycode = $('#showmenuflag').val();
        var upcode = $('.active').attr('data-upcode');
        if (onlycode == upcode) {

        } else {
            $("a[data-code='" + upcode + "']").css('display', 'none');
            $("a[data-upcode='" + upcode + "']").attr('class', '');
            var downcode = $('.active_bor').attr('data-code');
            $("a[data-code='" + downcode + "']").css('display', 'block');
            $("a[data-upcode='" + downcode + "']").attr('class', 'active');
        }
    }
};





$(function(){
    // 初始化展示
    var l =  window.location;
    var subUrl = l.href.substring(l.href.indexOf(l.host)+l.host.length);
    var targetA = $(".nav-son a[href='"+subUrl+"']");
    $('#showmenuflag').val($(targetA).attr("data-code"));

    var parentCode = $('#showmenuflag').val();

    // 父级关联显示
    $("a[data-upcode]").removeClass("active");
    $("a[data-upcode='" + parentCode + "']").addClass("active");

    // 兄弟元素关联显示
    $("a[data-code='" + parentCode + "']").css('display', 'block');

    // 当前权限
    $(targetA).addClass("active_bor");


});
