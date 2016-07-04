var count = 20;
var totalPage = 0;
var currentPage = 1;
var totalResult = 0;

$(function () {
    loadNewsList(1);
});

var loadNewsList = function (currentPageIndex) {
    $.post(base + '/kpiworklogController/loadCmsNewList',
        {
            'count': count,
            'currentPage': currentPageIndex
        },
        function (result) {
            $('#tbody').html('');
            if (result != null && result.list != null && result.list.length != 0){
                totalPage = result.totalPage;
                currentPage = result.currentPage;
                totalResult = result.totalResult;
                for (var i = 0; i < result.list.length; i++){
                    var trStr = '<tr><td><span class="right-margin">[&nbsp;' + result.list[i].typeDesc +
                        '&nbsp;]</span>&nbsp;<a target="_blank" href="' + base + '/kpiworklogController/news?newsId=' + result.list[i].id + '" class="unline" style="cursor:pointer;">' + result.list[i].title + '</a></td>' +
                        '<td class="name">' + result.list[i].author + '</td>\<td class="date">' + dateHaoMiaoZToDate(result.list[i].releaseDate) + '</td></tr>';
                    $('#tbody').append(trStr);
                }

                createTableFoot();
            }
        });
}

///创建 table foot
var createTableFoot = function () {
    var id = "news_table";
    var tableFootHtml = "";

    if (totalPage > 0){

        //var currentPage = currentPage;
        var endNumber = (currentPage)*count;
        if (currentPage == totalPage){
            endNumber = totalResult;
        }

        tableFootHtml += "<div id='tableFoot_paging' class='text-center'>";
        tableFootHtml += "<ul class='pagination'>";

        if (((currentPage-1)*count+1) != totalResult){
            tableFootHtml += "<li><a href='#'>第 "+ ((currentPage-1)*count+1) +"-"
                + endNumber +" 条 / 共 " + totalResult + " 条</a></li>";
        }else{
            tableFootHtml += "<li><a href='#'>第 "+ endNumber +" 条 / 共 " + totalResult + " 条</a></li>";
        }

        tableFootHtml += "<li><a href='#' onclick='loadNewsList(0)' id='tableFootFirstPage_" + id + "'>首页</a></li>";

        var leftCount = 1;
        if (parseInt(currentPage) > 3){
            leftCount = parseInt(currentPage) -2;
            if (parseInt(totalPage) - leftCount + 1 < 5){
                leftCount = parseInt(totalPage) > 5 ? parseInt(totalPage) - 4 : 1;
            }
        }
        var rightCount = leftCount + 4;
        if (parseInt(totalPage) < rightCount){
            rightCount = parseInt(totalPage);
        }
        for (var i=leftCount; i<=rightCount; i++){
            if (i==parseInt(currentPage)){
                tableFootHtml += "<li class='active'><a href='#'>" + i + "</a></li>";
            }else {
                tableFootHtml += "<li><a href='#' onclick='loadNewsList(\"" + i +"\")'>"
                    + i + "</a></li>";
            }
        }
        if (rightCount != currentPage){
            tableFootHtml += "<li><a href='#' onclick='loadNewsList(\"" + (currentPage+1) +"\")' id='tableFootNextPage_" + id + "'>下一页 &gt;</a></li>";
            tableFootHtml += "<li><a href='#' onclick='loadNewsList(\"" + totalPage +"\")' id='tableFootLastPage_" + id + "'>末页 &gt;&gt;</a></li>";
        }

        tableFootHtml += "</ul></div>";
    }

    var hasCreate_tableFoot_paging_node = null;
    var childNodes = $("#news_table")[0].parentNode.childNodes;
    for (var i=0; i<childNodes.length; i++){
        if (childNodes[i].id == 'tableFoot_paging'){
            hasCreate_tableFoot_paging_node = childNodes[i];
            break;
        }
    }
    if (hasCreate_tableFoot_paging_node != null){
        hasCreate_tableFoot_paging_node.innerHTML = tableFootHtml;
    }else{
        $("#news_table")[0].parentNode.innerHTML +=tableFootHtml;
    }
}
