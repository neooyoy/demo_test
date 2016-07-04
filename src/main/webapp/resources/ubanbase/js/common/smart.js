/**
 * Created by Administrator on 2015/12/1.
 */

// 为table绑定click事件
$("table.smart").on("click", function (e) {
    var td = e.target;
    var tr = $(td).parents("tr");
    tr.children("td").css("background-color", "#08C").css("color", "white");
    tr.siblings("tr").each(function () {
        $(this).children("td").css("background-color", "").css("color", "");
    });
});