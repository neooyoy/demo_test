var dataGrid = function () {
    //参数定义
    this.defaultParams = {
        //参数定义
        id: "",
        data: null,
        url: null,
        tableWidth: '100%',
        //tableHeight : '100%',
        tHeadColor: "",
        tHeadBgColor: "",
        tHeadBgImgUrl: "",
        //tHeadHeight: 50,
        tHeadStyle: "",
        tHeadCols: null,
        params: {},
        total: 0,
        sort: "desc",
        order: "",
        lineLenth: 20,
        checkedRecords: [],
        searchButtonId: '',
        searchParams: [{
            nodeId: '',
            paramName: ''
        }],
        attributes: null,
        sort_class: 'table_sort_desc',
        tHeadDataParams: {  //表格头部数据参数
            field: "",
            title: "",
            width: "",
            align: "",
            sortable: "",
            type: "",
            style: "",
            hidden: false, //是否显示
            render: function (record, value) {
                return value;
            },
            convert: function (value) {
                return value;
            },
            mustache: ''   //引入javascript版本的mustache模版，解决js中夹杂着html的代码
        },
        tBodyColor: "",
        tBodyBgColor: "",
        //tBodyHeight: 50,
        tBodyOddTrBgcolor: "", //基数行颜色
        tBodyEvenTrBgcolor: "", //偶数行颜色
        tBodyMouserOverBgcolor: "", //鼠标经过颜色
        tBodyMouserOutBgcolor: "",  //鼠标移出颜色
        tBodyTrSelectedBgColor: "yellow",  //被选中行颜色
        tFootColor: "",     //底部文字颜色
        tFootBgColor: "",   //底部背景
        tFootPosition: "right", //底部对其方式
        tBoolPage: true,    //是否分页
        tBoolCheckbox: false,    //是否显示check box
        pageCount: 0, //总页数
        pageSize: 20, //每页显示个数
        changePageSize: false,
        pageSizeComm: '每页 20 条',
        currentPage: 1, //当前页
        trTdentity: null,   //行标识
        tEnumDataGridSkin: $.enumDdataGrid.enumSkin.defalut,  //选择皮肤风格，默认风格
        rowNumberTitel: '序号',
        rowNumber: false,      //是否显示行号
        rowNumberWidth: 20,
        tBodyTrDblclickCallBack: $.noop, //双击行 的回到函数
        _handleTbodyTrClick: $.noop,
        //isOverWriteThclick:false,
        onload: function () {
            return;
        },
        beforeload: function () {
            return;
        },
        thClickCallback: null
    };
    this.options = {};
};

/**
 * 列表跳转到下一页
 * @param datagridId
 * @param index
 */
var goToIndexPage = function (datagridId, index) {
    var gridData = $("#" + datagridId)[datagridId];
    var options = gridData.options;
    options.currentPage = index;
    gridData.init(options);
}

/**
 * 修改列表每页条数
 * @param datagridId
 * @param index
 * @author cj 20160623
 */
var changePageSize = function (datagridId, pageSizeComm, pageSize) {
    $('[name="dropdown-menu"]').css('display', 'none');
    var gridData = $("#" + datagridId)[datagridId];
    var options = gridData.options;
    options.currentPage = 1;
    options.pageSize = pageSize;
    options.pageSizeComm = pageSizeComm;
    gridData.init(options);
}

/**
 * 搜索按钮刷新列表
 */
var buttonSearchOfReload = function (datagridId) {
    var gridData = $("#" + datagridId)[datagridId];
    var options = gridData.options;
    options.currentPage = 1;
    gridData.init(options);
}

dataGrid.prototype = {
    constructor: dataGrid,
    init: function (params) {
        this.options = $.coverObject(this.defaultParams, params);
        this._init();
    },
    /*reload: function(params){
     this.options.currentPage = 1;
     if (params != null) {
     this.options.params = params.params;
     }
     this._init();
     },*/
    reload: function (params) {
        this.options.currentPage = 1;

        if (params != null) {
            this.options.params = params.params;
        }

        this._init();
    },
    addData: function (data) {
        if (this.options.data != null) {
            if (data != null && data.length > 0) {
                this.addTableData(data);

                var start = 0;
                if (this.options.data != null) {
                    start = this.options.data.length;
                }
                this.addRowNumbersOfAddData(start);

                for (var i = 0; i < data.length; i++) {
                    this.options.data.push(data[i]);
                }
            }
        } else {
            this.options.data = data;

            this._init();
        }
    },
    getCurSelectRecord: function (id) {
        var curRecord = null;
        var data = this.options.data;
        if (data != null && data.length > 0)
            for (var i = 0; i < data.length; i++) {
                if (data[i][this.options.trTdentity] == id) {
                    return data[i];
                }
            }
        return curRecord;
    },
    _init: function () {
        //初始化皮肤
        this.tInitializeSelectPSkin();

        //初始化元素
        this.tInitializeElement();

        //初始化数据
        this.tInitializeGetData();

        //是否有加载前的beforeload事件
        if (typeof this.options.beforeload == 'function') {
            this.options.beforeload();
        }

        //创建table head
        this.createTableHead();

        //创建table body
        this.createTableBody();

        //选择是否分页
        if (this.options.tBoolPage) {
            this.createTableFoot();
        }

        //选择是否显示多选按钮
        if (this.options.tBoolCheckbox) {
            this.addCheckbox();
        }

        //是否显示行号
        if (this.options.rowNumber) {
            this.addRowNumbers();
        }

        //是否有加载后的onload事件
        if (typeof this.options.onload == 'function') {
            this.options.onload();
        }


        //设置属性和样式
        //this.setTableAttribute();

        //注册事件
        this._registerTableFootGoTo();
        this._registerTableFootFirstPage();
        this._registerTableFootLastPage();
        this._registerTableFootUpPage();
        this._registerTableFootNextPage();
        this._registerTbodyTrMouseover();
        this._registerTbodyTrMouseout();
        this._registerTbodyTrDblclick();
        this._registerTbodyTrCheckbox();
        this._registerTbodyTrClick();
        this._registerPageNumberKeyup();
        this._registerPageNumberPaste();
        this._registerPageNumberFocus();
        this._registerCheckboxCheckAll();
        this._registerTbodyThClick();
        //this._registerThClick();
    },

    ///说明：
    ///     初始化选择皮肤
    tInitializeSelectPSkin: function () {
        switch (this.options.tEnumDataGridSkin) {
            case $.enumDdataGrid.enumSkin.defalut:
                //this.options.tableWidth = "100%";
                this.options.tHeadColor = "black";
                this.options.tHeadBgColor = "#e1e1e1";
                //this.options.tHeadHeight = 32;
                this.options.tHeadBgImgUrl = "";
                //this.options.tHeadStyle = "table table-hover table-striped table-bordered table-advanced tablesorter";
                //this.options.tBodyHeight = 35;
                this.options.tBodyOddTrBgcolor = "white";
                this.options.tBodyEvenTrBgcolor = "white";
                this.options.tBodyMouserOverBgcolor = "silver";
                this.options.tBodyTrSelectedBgColor = "yellow",
                    this.options.tColNumber = 2;
                this.options.tColStyle = "lieStyle";
                break;
            case $.enumDdataGrid.enumSkin.classic:
                this.options.tableWidth = 1000;
                this.options.tHeadColor = "black";
                this.options.tHeadBgColor = "#e1e1e1";
                this.options.tHeadHeight = 32;
                this.options.tHeadBgImgUrl = "";
                this.options.tHeadStyle = "theadStyle";
                this.options.tBodyHeight = 35;
                this.options.tBodyOddTrBgcolor = "white";
                this.options.tBodyEvenTrBgcolor = "white";
                this.options.tBodyMouserOverBgcolor = "silver";
                this.options.tBodyTrSelectedBgColor = "yellow",
                    this.options.tColNumber = 2;
                this.options.tColStyle = "lieStyle";
                break;
            case $.enumDdataGrid.enumSkin.traditional:
                this.options.tableWidth = 1000;
                this.options.tHeadColor = "black";
                this.options.tHeadHeight = 32;
                //this.options.tHeadBgImgUrl = "url(../Images/TableImg/tableHeadBg.jpg)";

                //this.options.tHeadBgImgUrl = "url(../resources/images/building/buildingsBackgroud.jpg)";

                this.options.tHeadStyle = "theadStyle";
                this.options.tBodyHeight = 35;
                this.options.tBodyOddTrBgcolor = "white";
                this.options.tBodyEvenTrBgcolor = "#e1e1e1";
                this.options.tBodyMouserOverBgcolor = "silver";
                this.options.tBodyTrSelectedBgColor = "yellow",
                    this.options.tColNumber = 2;
                this.options.tColStyle = "lieStyle";
                break;
            case $.enumDdataGrid.enumSkin.gorgeous:
                this.options.tableWidth = 1000;
                this.options.tHeadColor = "black";
                this.options.tHeadHeight = 32;
                //this.options.tHeadBgImgUrl = "url(../Images/TableImg/tableHeadBg.jpg)";

                this.options.tHeadBgImgUrl = "url(../resources/images/building/buildingsBackgroud.jpg)";

                this.options.tHeadStyle = "theadStyle";
                this.options.tBodyHeight = 35;
                this.options.tBodyOddTrBgcolor = "pink";
                this.options.tBodyEvenTrBgcolor = "#e1e1e1";
                this.options.tBodyMouserOverBgcolor = "silver";
                this.options.tBodyTrSelectedBgColor = "yellow",
                    this.options.tColNumber = 2;
                this.options.tColStyle = "lieStyle";
                break;
            default:
                break;
        }
    },
    ///说明：
    ///     初始化元素
    tInitializeElement: function () {
        var id = this.options.id;

        $("#" + id).attr({
            "class": 'table table-hover table-striped table-bordered table-advanced tablesorter',
            "cellpadding": 1,
            "cellspacing": 0,
            "align": "center",
            "bordercolor": "#D4DBE1"
        });
        $("#" + id).css("border-collapse", "collapse");
        $("#" + id).css("width", this.options.tableWidth);
        //$("#" + id).css("height", this.options.tableHeight);

        //给设置了关联搜索的button动态添加onlick事件
        if (this.options.searchButtonId != null && this.options.searchButtonId != '') {
            var obj = document.getElementById(this.options.searchButtonId);
            obj.setAttribute("onclick", "buttonSearchOfReload(\"" + this.options.id + "\")");
        }

        //添加区域
        var headArea = "<thead gdThead=''></thead>";
        var bodyArea = "<tbody gdTbody=''></tbody>";
        //var footArea = "<tfoot gdTfoot=''><tr><td></td></tr></tfoot>";
        var area = headArea + bodyArea;
        $("#" + id).html(area);
        //设置自定义属性标识
        $("#" + id).attr("datagrid", id);
        $("table[datagrid $='" + id + "'] thead").attr("gdThead", id);
        $("table[datagrid $='" + id + "'] tbody").attr("gdTbody", id);
        //$("table[datagrid $='" + id + "'] tfoot").attr("gdTfoot", id);
        //判断是不是存在checkAll
        if ($("input:checkbox[name='chk_All_" + id + "']").length > 0) {
            $("table[datagrid $='" + id + "'] thead tr").find("td:first").remove();
        }
        $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "']").empty();
    },

    ///说明：
    ///     获取数据源
    tInitializeGetData: function () {
        if (this.options.url != null && this.options.url != '') {
            var optionsData = null;
            var pageCount = 0;
            var total = 0;
            var paramsData = {};
            var attributes = null;

            if (this.options.params != null) {
                paramsData = this.options.params;
            }

            if (this.options.sort != null && this.options.sort != '' && (this.options.params['sort'] == null || this.options.params['sort'] == '')) {
                paramsData["sort"] = this.options.sort;
            }
            if (this.options.order != null && this.options.order != '' && (this.options.params['order'] == null || this.options.params['order'] == '')) {
                paramsData["order"] = this.options.order;
            }

            if (this.options.sort == 'asc') {
                this.options.sort_class = 'table_sort_asc';
            }

            var searchParams = this.options.searchParams;
            if (this.options.searchParams != null && this.options.searchParams.length > 0) {
                for (var i = 0; i < this.options.searchParams.length; i++) {
                    if (this.options.searchParams[i].nodeId != null && this.options.searchParams[i].nodeId != '') {
                        if (this.options.searchParams[i].paramName != null && this.options.searchParams[i].paramName != '') {
                            paramsData[this.options.searchParams[i].paramName] = $('#' + this.options.searchParams[i].nodeId).val();
                        } else {
                            paramsData[this.options.searchParams[i].paramName] = $('#' + this.options.searchParams[i].nodeId).val();
                        }
                    }
                }
            }

            //对是否分页做处理，当不分页的时候，需要在后台做判断的。
            if (this.options.tBoolPage) {
                paramsData["currentPage"] = this.options.currentPage;
                paramsData["maxResults"] = this.options.pageSize;
            } else {
                paramsData["isPage"] = false;
            }

            $.ajax({
                type: "post",
                url: this.options.url,
                data: paramsData,
                dataType: "json",
                async: false,
                success: function (result) {
                    optionsData = result.rows;
                    pageCount = result.pageSize;
                    total = result.total;
                    if (result.attributes != null) {
                        attributes = result.attributes;
                    }
                }
            });
            this.options.total = total;
            this.options.data = optionsData;
            this.options.pageCount = pageCount;
            this.options.attributes = attributes;
        }
    },

    ///说明：
    ///     创建 table head
    createTableHead: function () {
        var id = this.options.id;
        if (this.options.tHeadCols != null) {
            var cols = this.options.tHeadCols;
            var colsLen = cols.length;
            if (colsLen > 0) {
                var htmlHead = "";
                htmlHead += "<tr>";

                //选择是否显示序号
                if (this.options.rowNumber) {
                    htmlHead += "<th id='" + this.options.tHeadDataParams.field + "'>";
                    htmlHead += this.options.rowNumberTitel;
                    htmlHead += "</th>";
                }

                //选择是否显示多选按钮
                if (this.options.tBoolCheckbox) {
                    htmlHead += "<th align='center' width='30'><input type='checkbox' name='chk_All_" + this.options.id + "' value='checkbox'> </th>";
                }

                for (var i = 0; i < colsLen; i++) {
                    if (cols[i].hidden == null) {
                        cols[i].hidden = false;
                        this.options.tHeadCols[i].hidden = false;
                    }
                    this.options.tHeadDataParams = $.coverObject(this.options.tHeadDataParams, cols[i]);

                    //当前列可排序
                    if (this.options.tHeadDataParams.sortable) {
                        if (this.options.tHeadDataParams.hidden) {
                            htmlHead += "<th id='" + this.options.tHeadDataParams.field + "' name='" + this.options.tHeadDataParams.field + "' style='display: none'>";
                        } else {
                            htmlHead += "<th id='" + this.options.tHeadDataParams.field + "' name='" + this.options.tHeadDataParams.field + "' >";
                        }

                    } else {
                        if (this.options.tHeadDataParams.hidden) {
                            htmlHead += "<th name='" + this.options.tHeadDataParams.field + "' style='display: none'>";
                        } else {
                            htmlHead += "<th name='" + this.options.tHeadDataParams.field + "' >";
                        }
                    }

                    htmlHead += '<span style="width: 70%;">';
                    htmlHead += this.options.tHeadDataParams.title;
                    htmlHead += '</span>';

                    /* if (this.options.order != null && this.options.order !='' && this.options.sort_class != '' && this.options.tHeadDataParams.field == this.options.order){
                     htmlHead += '<span class="pull-right"><a name="table_sort" id="sort_' + this.options.tHeadDataParams.field + '" class="' + this.options.sort_class + '"></a></span>';
                     }*/

                    if (this.options.tHeadDataParams.sortable) {
                        htmlHead += '<span class="pull-right"><a name="table_sort" title="点击排序" id="sort_' + this.options.tHeadDataParams.field + '" class="' + this.options.sort_class + '"></a></span>';
                    }

                    htmlHead += "</th>";

                }


                htmlHead += "</tr>";
                $("table[datagrid $='" + id + "'] thead[gdThead $='" + id + "']").html(htmlHead);
            }
        }
    },

    ///说明：
    ///     创建 table body
    createTableBody: function () {
        if (this.options.data == null) {
            return;
        }
        var options = this.options;
        //var tHeadCols = options.tHeadCols;
        var headColArray = options.tHeadCols;
        var headFieldArray = [];
        for (var i = 0; i < headColArray.length; i++) {
            headFieldArray.push(headColArray[i].field);
        }

        var id = options.id;
        var data = options.data;
        if ($("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "']").length <= 0) {
            return;
        }
        var htmlBody = "";
        var colLen = $("table[datagrid $='" + id + "'] thead tr td").length;

        /*
         * 拼接表格数据
         * @author cj 20160229
         */
        $.each(data, function (i, ob) {

            htmlBody += "<tr id='" + ob[options.trTdentity] + "' trRowNumber='" + (i + 1) + "' style='background-color:";

            if ((i + 1) % 2 == 0) {
                htmlBody += options.tBodyEvenTrBgcolor + "'>";
            } else {
                htmlBody += options.tBodyOddTrBgcolor + "' >";
            }
            var realityCount = 0;
            for (var indexFiled = 0; indexFiled < headFieldArray.length; indexFiled++) {
                var curField = headFieldArray[indexFiled];
                realityCount += 1;
                var renderString = '';

                var value = ob[curField];
                if (typeof value == 'string' && value.length > 0) {
                    var newValue = value[0];
                    for (var index = 1; index < value.length; index++) {
                        if (index % options.lineLenth == 0) {
                            newValue += '</br>' + value[index];
                        } else {
                            newValue += value[index];
                        }
                    }
                    value = newValue;
                }

                if (typeof headColArray[indexFiled].convert == 'function') {
                    value = headColArray[indexFiled].convert(value);
                }

                if (typeof headColArray[indexFiled].render == 'function') {
                    renderString = headColArray[indexFiled].render(ob, value);
                } else {
                    renderString = value;
                }

                //Mustache格式化
                if (headColArray[indexFiled].mustache != null && headColArray[indexFiled].mustache != '') {
                    renderString = Mustache.render(headColArray[indexFiled].mustache, ob);
                }

                if (headColArray[indexFiled].hidden) {
                    htmlBody += "   <td name='" + headFieldArray[indexFiled] + "' style='display: none;'>" + renderString + "</td>";
                } else {
                    htmlBody += "   <td name='" + headFieldArray[indexFiled] + "'>" + renderString + "</td>";
                }
            }

            //判断数据源中的数据列数是否 小于 table头部的列数
            if (realityCount < colLen) {
                var difference = colLen - realityCount;
                for (var j = 0; j < difference; j++) {
                    htmlBody += "   <td></td>";
                }
            }
            htmlBody += "</tr>";
        });


        $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "']").html(htmlBody);
        //$("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "'] tr").attr("height", options.tBodyHeight); //设置行高

    },

    /**
     * 说明：手动添加数据行
     * @param data
     * @author cj 20160421
     */
    addTableData: function (data) {
        if (data == null || data.length == null || data.length == 0) {
            return;
        }
        var options = this.options;
        var headColArray = options.tHeadCols;
        var headFieldArray = [];
        for (var i = 0; i < headColArray.length; i++) {
            headFieldArray.push(headColArray[i].field);
        }

        var id = options.id;
        if ($("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "']").length <= 0) {
            return;
        }

        var htmlBody = "";
        var colLen = $("table[datagrid $='" + id + "'] thead tr td").length;

        /*
         * 拼接表格数据
         * @author cj 20160229
         */
        $.each(data, function (i, ob) {

            htmlBody += "<tr id='" + ob[options.trTdentity] + "' trRowNumber='" + (i + 1) + "' style='background-color:";

            if ((i + 1) % 2 == 0) {
                htmlBody += options.tBodyEvenTrBgcolor + "'>";
            } else {
                htmlBody += options.tBodyOddTrBgcolor + "' >";
            }
            var realityCount = 0;
            for (var indexFiled = 0; indexFiled < headFieldArray.length; indexFiled++) {
                var curField = headFieldArray[indexFiled];
                realityCount += 1;
                var renderString = '';

                var value = ob[curField];
                if (typeof value == 'string' && value.length > 0) {
                    var newValue = value[0];
                    for (var index = 1; index < value.length; index++) {
                        if (index % options.lineLenth == 0) {
                            newValue += '</br>' + value[index];
                        } else {
                            newValue += value[index];
                        }
                    }
                    value = newValue;
                }

                if (typeof headColArray[indexFiled].convert == 'function') {
                    value = headColArray[indexFiled].convert(value);
                }

                if (typeof headColArray[indexFiled].render == 'function') {
                    renderString = headColArray[indexFiled].render(ob, value);
                } else {
                    renderString = value;
                }

                //Mustache格式化
                if (headColArray[indexFiled].mustache != null && headColArray[indexFiled].mustache != '') {
                    renderString = Mustache.render(headColArray[indexFiled].mustache, ob);
                }

                if (headColArray[indexFiled].hidden) {
                    htmlBody += "   <td name='" + headFieldArray[indexFiled] + "' style='display: none;'>" + renderString + "</td>";
                } else {
                    htmlBody += "   <td name='" + headFieldArray[indexFiled] + "'>" + renderString + "</td>";
                }
            }

            //判断数据源中的数据列数是否 小于 table头部的列数
            if (realityCount < colLen) {
                var difference = colLen - realityCount;
                for (var j = 0; j < difference; j++) {
                    htmlBody += "   <td></td>";
                }
            }
            htmlBody += "</tr>";
        });

        $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "']").append(htmlBody);
    },

    ///说明：
    ///     创建 table foot
    createTableFoot: function () {
        var id = this.options.id;
        /*if ($("table[datagrid $='" + id + "']").length <= 0) {
         return;
         }*/

        var tableFootHtml = "";

        if (this.options.data != null && this.options.data.length > 0) {
            var currentPage = this.options.currentPage;
            var endNumber = (currentPage) * this.options.pageSize;
            if (currentPage == this.options.pageCount) {
                endNumber = this.options.total;
            }


            tableFootHtml += "<div id='tableFoot_paging' class='text-center'>";
            tableFootHtml += "<ul class='pagination'>";

            if (((currentPage - 1) * this.options.pageSize + 1) != this.options.total) {
                tableFootHtml += "<li><a href='#'>第 " + ((currentPage - 1) * this.options.pageSize + 1) + "-"
                    + endNumber + " 条 / 共 " + this.options.total + " 条</a></li>";
            } else {
                tableFootHtml += "<li><a href='#'>第 " + endNumber + " 条 / 共 " + this.options.total + " 条</a></li>";
            }

            tableFootHtml += "<li><a href='#' id='tableFootFirstPage_" + id + "'>首页</a></li>";

            var leftCount = 1;
            if (parseInt(currentPage) > 3) {
                leftCount = parseInt(currentPage) - 2;
                if (parseInt(this.options.pageCount) - leftCount + 1 < 5) {
                    leftCount = parseInt(this.options.pageCount) > 5 ? parseInt(this.options.pageCount) - 4 : 1;
                }
            }
            var rightCount = leftCount + 4;
            if (parseInt(this.options.pageCount) < rightCount) {
                rightCount = parseInt(this.options.pageCount);
            }
            for (var i = leftCount; i <= rightCount; i++) {
                if (i == parseInt(currentPage)) {
                    tableFootHtml += "<li class='active'><a href='#'>" + i + "</a></li>";
                } else {
                    tableFootHtml += "<li><a href='#' onclick='goToIndexPage(\"" + id + "\",\"" + i + "\")'>"
                        + i + "</a></li>";
                }
            }
            if (rightCount != currentPage) {
                /*if (rightCount != parseInt(this.options.pageCount)){
                 tableFootHtml += "<li class='disabled'><a href='#'>···</a></li>";
                 }*/
                tableFootHtml += "<li><a href='#' id='tableFootNextPage_" + id + "'>下一页 &gt;</a></li>";
                tableFootHtml += "<li><a href='#' id='tableFootLastPage_" + id + "'>末页 &gt;&gt;</a></li>";

                //tableFootHtml += "<li style='margin-bottom: 10px;'><input id='tableFootPageSize' style='display: inline;margin-bottom: 10px' placeholder='每页条数' value='20'></li>";

              /*  "<li><a href='#'>其他</a></li><li class='divider'></li>" +
                "<li><a href='#'>分离的链接</a></li></ul></div></li>";*/

            }

            if (this.options.changePageSize){
                tableFootHtml += "<li style='height: 28px;'>" +
                    "<div style='font-size: 14px; min-width: 160px; color: rgb(40, 164, 201); height: 30px; float: left;' class='btn-group'> " +
                    "<button style='min-width: 127px;' class='btn btn-white' type='button' style='padding:3px 12px'>" + this.options.pageSizeComm + "</button>" +
                    "<button class='btn btn-white dropdown-toggle' type='button' data-toggle='dropdown' style='padding:3px 12px'>" +
                    "<span style='border-right: 5px solid transparent; border-left: 5px solid transparent; border-top: 6px solid rgb(40, 164, 201) ! important;' class='caret'>" +
                    "</span> <span class='sr-only'>每页条数</span></button>" +
                    "<ul name='dropdown-menu' class='dropdown-menu' role='menu' style='top: -750%'>" +
                    "<li><a href='#' onclick='changePageSize(\"" + id + "\",\"" + '每页 20 条' + "\",\"" + 20 + "\")'>20</a></li>" +
                    "<li><a href='#' onclick='changePageSize(\"" + id + "\",\"" + '每页 50 条' + "\",\"" + 50 + "\")'>50</a></li>" +
                    "<li><a href='#' onclick='changePageSize(\"" + id + "\",\"" + '每页 100 条' + "\",\"" + 100 + "\")'>100</a></li>" +
                    "<li><a href='#' onclick='changePageSize(\"" + id + "\",\"" + '每页 200 条' + "\",\"" + 200 + "\")'>200</a></li>" +
                    "</ul></div></li>";
            }

            tableFootHtml += "</ul>";
            tableFootHtml += "</div>";
        }

        var hasCreate_tableFoot_paging_node = null;
        var childNodes = $("table[datagrid $='" + id + "']")[0].parentNode.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].id == 'tableFoot_paging') {
                hasCreate_tableFoot_paging_node = childNodes[i];
                break;
            }
        }
        if (hasCreate_tableFoot_paging_node != null) {
            hasCreate_tableFoot_paging_node.innerHTML = tableFootHtml;
        } else {
            $("table[datagrid $='" + id + "']")[0].parentNode.innerHTML += tableFootHtml;
        }
    },

    ///说明：
    ///     添加多选框
    addCheckbox: function () {
        var id = this.options.id;
        $("table[datagrid $='" + id + "'] thead tr").find("td:first").each(function (i) {
            $(this).before("<td align='center' width='30'><input type='checkbox' name='chk_All_" + id + "' value='checkbox'> </td>");
        });
        $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "'] tr").find("td:first").each(function (i) {
            $(this).before("<td align='center'><input type='checkbox' name='chk_" + i + "' chkNumber='" + (i + 1) + "' value='checkbox'> </td>");
        });
    },

    ///说明：
    ///     添加行号
    addRowNumbers: function () {
        var id = this.options.id;
        $("table[datagrid $='" + id + "'] thead tr").find("td:first").each(function (i) {
            $(this).before("<td align='center' style='background-color:#bababa' width='" + this.options.rowNumberWidth + "'>&nbsp;</td>");
        });
        $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "'] tr").find("td:first").each(function (i) {
            $(this).before("<td align='center' style='background-color:#bababa;'>" + (i + 1) + "</td>");
        });
    },

    ///说明：
    ///     添加行号，在当前数据行基础上，再增加数据时
    addRowNumbersOfAddData: function (start) {
        var id = this.options.id;
        var tds = $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "'] tr").find("td:first");
        for (var i = start; i < tds.length; i++) {
            $(tds[i]).before("<td align='center' style='background-color:#bababa;'>" + (i + 1) + "</td>");
        }
    },

    ///说明：
    ///     设置属性、样式
    setTableAttribute: function () {
        var id = this.options.id;
        if ($("table[datagrid $='" + id + "']").length <= 0) {
            return;
        }
        $("table[datagrid $='" + id + "']").attr("width", this.options.tableWidth);
        //$("table[datagrid $='" + id + "']").attr("height", this.options.tableHeight);

        $("table[datagrid $='" + id + "'] thead").css("background", this.options.tHeadBgColor);
        $("table[datagrid $='" + id + "'] thead").css("color", this.options.tHeadColor);
        $("table[datagrid $='" + id + "'] thead").css("background-image", this.options.tHeadBgImgUrl);
        //$("table[datagrid $='" + id + "'] thead").css("height", this.options.tHeadHeight);
        $("table[datagrid $='" + id + "'] thead").addClass(this.options.tHeadStyle);
        //$("table[datagrid $='" + id + "'] thead tr").css("height", this.options.tHeadHeight);
        $("table[datagrid $='" + id + "'] tbody").css("background", this.options.tBodyBgColor);
        $("table[datagrid $='" + id + "'] tbody").css("color", this.options.tBodyColor);
        $("table[datagrid $='" + id + "'] tbody").addClass("tableBodyCur");
        if ($("table[datagrid $='" + id + "']").length <= 0) {
            return;
        }
        $("table[datagrid $='" + id + "']").attr("width", this.options.tableWidth);
        //$("table[datagrid $='" + id + "']").attr("height", this.options.tableHeight);

        $("table[datagrid $='" + id + "'] tfoot").css("background", this.options.tFootBgColor);
        $("table[datagrid $='" + id + "'] tfoot").css("color", this.options.tFootColor);

        //设置列样式
        if (this.options.tColStyle != "") {
            var options = this.options;
            var colLen = $("table[datagrid $='" + id + "'] thead tr td").length;
            $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "']").find("td").each(function (i) {
                if ((i + 1) % colLen == options.tColNumber) {
                    $(this).addClass(options.tColStyle); //给区间加上特定样式
                }
            });
        }
        var colLens = $("table[datagrid $='" + id + "'] thead tr td").length;
        $("table[datagrid $='" + id + "'] tfoot tr td").attr("colspan", colLens);
    },
    /// 说明:
    ///     跳转到首页
    firstPage: function () {
        var options = this.options;
        options.currentPage = 1;
        $("#txtPageNumber_" + options.id).val(options.currentPage);
        this.jumpPage();
    },
    /// 说明:
    ///     跳转到上一页
    lastPage: function () {
        var options = this.options;
        if (options.currentPage === 1) {
            alert("已经到第一页了！");
            return;
        }
        options.currentPage = parseInt(options.currentPage) - 1;
        $("#txtPageNumber_" + options.id).val(options.currentPage);
        this.jumpPage();
    },
    /// 说明:
    ///     跳转到下一页
    nextPage: function () {
        var options = this.options;
        if (options.currentPage >= options.pageCount) {
            alert("超出了最大页数！");
            return;
        }
        options.currentPage = parseInt(options.currentPage) + 1;
        $("#txtPageNumber_" + options.id).val(options.currentPage);
        this.jumpPage();
    },
    /// 说明:
    ///     跳转到末页
    finalPage: function () {
        var options = this.options;
        options.currentPage = options.pageCount;
        $("#txtPageNumber_" + options.id).val(options.currentPage);
        this.jumpPage();
    },
    /// 说明:
    ///     跳转到跳到某一页
    jumpPage: function () {
        var options;
        if ($.getParam(arguments[0]) != "") {
            options = arguments[0];//这里特殊，判断是不是从PageNumber Keyup过来的
        } else {
            options = this.options;
        }
        var id = options.id;

        $("#" + id)[id].init(options);
    },
    /******************************(注册事件 begin)******************************/

    /// 说明:
    ///     Go To
    _registerTableFootGoTo: function () {
        var handleEvent = $.delegate(this._handleTableFootGoTo, this);
        $("#tableFootGoTo_" + this.options.id).click(handleEvent);
    },

    /// 说明:
    ///     First Page
    _registerTableFootFirstPage: function () {
        var handleEvent = $.delegate(this._handleTableFootFirstPage, this);
        $("#tableFootFirstPage_" + this.options.id).click(handleEvent);
    },
    /// 说明:
    ///     Last Page
    _registerTableFootLastPage: function () {
        var handleEvent = $.delegate(this._handleTableFootLastPage, this);
        $("#tableFootLastPage_" + this.options.id).click(handleEvent);
    },
    /// 说明:
    ///     Up Page
    _registerTableFootUpPage: function () {
        var handleEvent = $.delegate(this._handleTableFootUpPage, this);
        $("#tableFootUpPage_" + this.options.id).click(handleEvent);
    },
    /// 说明:
    ///     Next Page
    _registerTableFootNextPage: function () {
        var handleEvent = $.delegate(this._handleTableFootNextPage, this);
        $("#tableFootNextPage_" + this.options.id).click(handleEvent);
    },
    /// 说明:
    ///     Tr Mouseover
    _registerTbodyTrMouseover: function () {
        var options = this.options;
        $("table[datagrid $='" + this.options.id + "'] tbody tr").each(function () {
            var handleEvent = $.delegate(dataGrid.prototype._handleTbodyTrMouseover, this, [{options: options}]);
            $(this).mouseover(handleEvent);
        });
    },
    /// 说明:
    ///     Tr Mouseout
    _registerTbodyTrMouseout: function () {
        var options = this.options;
        $("table[datagrid $='" + options.id + "'] tbody tr").each(function () {
            var handleEvent = $.delegate(dataGrid.prototype._handleTbodyTrMouseout, this, [{options: options}]);
            $(this).mouseout(handleEvent);
        });
    },
    /// 说明:
    ///     Tr Dblclick
    /*_registerTbodyTrDblclick: function () {
     var options = this.options;
     $("table[datagrid $='" + options.id + "'] tbody tr").each(function () {
     var handleEvent = $.delegate(dataGrid.prototype._handleTbodyTrDblclick, this, [{ options: options }]);
     var itemDblclickCallBack = $.delegate(options.tBodyTrDblclickCallBack, this, [{ id: $(this).attr("id") }]);//回调事件
     $(this).dblclick(handleEvent);
     $(this).dblclick(itemDblclickCallBack);
     });
     },*/
    /// 说明:
    ///     Tr Checkbox
    _registerTbodyTrCheckbox: function () {
        var options = this.options;
        //点击checkbox时候屏蔽tr的click事件，以防和tr的click事件重复
        var objCheckAll = $("table[datagrid $='" + options.id + "'] tbody[gdTbody ='" + options.id + "'] tr").find("input:checkbox");
        objCheckAll.each(function () {
            var handleEvent = $.delegate(dataGrid.prototype._handleTbodyTrCheckbox, this, [{
                options: options,
                objCheckAll: objCheckAll
            }]);
            $(this).click(function (event) {
                event.stopPropagation();
                handleEvent();
            });
        });
    },
    /// 说明:
    ///     Tr Click
    /* _registerTbodyTrClick: function () {
     var options = this.options;
     $("table[datagrid $='" + options.id + "'] tbody tr").each(function () {
     //var handleEvent = $.delegate(dataGrid.prototype._handleTbodyTrClick, this, [{ options: options }]);
     var handleEvent = $.delegate(options._handleTbodyTrClick, this, [{ id: $(this).attr("id") }]);
     $(this).click(handleEvent);
     });
     },*/

    /// 说明:
    ///     Tr Dblclick
    _registerTbodyTrDblclick: function () {
        var options = this.options;
        $("table[datagrid $='" + options.id + "'] tbody tr").each(function () {

            var curThData = $(this).attr("id");
            if (options.trTdentity != null && options.trTdentity != '') {
                if (options.data != null && options.data.length != 0) {
                    for (var i = 0; i < options.data.length; i++) {
                        if (options.data[i][options.trTdentity] == curThData) {
                            curThData = options.data[i];
                            break;
                        }
                    }
                }
            }

            var handleEvent = $.delegate(dataGrid.prototype._handleTbodyTrDblclick, this, [{options: options}]);
            var itemDblclickCallBack = $.delegate(options.tBodyTrDblclickCallBack, this, [curThData]);//回调事件
            $(this).dblclick(handleEvent);
            $(this).dblclick(itemDblclickCallBack);
        });
    },

    _registerTbodyTrClick: function () {
        var options = this.options;
        $("table[datagrid $='" + options.id + "'] tbody tr").each(function () {

            var curThData = $(this).attr("id");
            if (options.trTdentity != null && options.trTdentity != '') {
                if (options.data != null && options.data.length != 0) {
                    for (var i = 0; i < options.data.length; i++) {
                        if (options.data[i][options.trTdentity] == curThData) {
                            curThData = options.data[i];
                            break;
                        }
                    }
                }
            }

            var handleEvent = $.delegate(options._handleTbodyTrClick, this, [curThData]);
            $(this).click(handleEvent);
        });
    },

    /// 说明:
    ///     Th Click 改变排序方式 asc 或者 desc
    /*_registerThClick: function () {
     var options = this.options;
     $("table[datagrid $='" + options.id + "'] thead tr th").each(function () {
     var handleEvent = $.delegate(dataGrid.prototype._handleThClick, this, [{ options: options }]);
     $(this).click(handleEvent);
     });
     },*/

    /// 说明:
    ///     Th Click
    _registerTbodyThClick: function () {
        var options = this.options;
        $("table[datagrid $='" + options.id + "'] thead tr th").each(function () {
            var defaylthandleEvent = $.delegate(dataGrid.prototype._handleTbodyThClick, this, [{
                options: options,
                order: $(this).attr("id")
            }]);

            $(this).click(defaylthandleEvent);

            //var handleEvent = $.delegate(options._handleOverWriteThClick, this, [{ 'order': $(this).attr("id") }]);
            /*if (!options.isOverWriteThclick){
             handleEvent = $.delegate(dataGrid.prototype._handleTbodyThClick, this, [{ options: options, order: $(this).attr("id") }]);
             }else{
             handleEvent = $.delegate(options._handleOverWriteThClick, this, [{ 'order': $(this).attr("id") }]);
             }*/
            //$(this).click(handleEvent);
        });
    },

    /// 说明:
    ///     PageNumber Keyup
    _registerPageNumberKeyup: function () {
        var options = this.options;
        $("#txtPageNumber_" + options.id).bind('keyup', function (e) {
            dataGrid.prototype._handlePageNumberKeyup(e, options);
        });
    },
    /// 说明:
    ///     PageNumber paste
    _registerPageNumberPaste: function () {
        var options = this.options;
        $("#txtPageNumber_" + options.id).bind("paste", function () { //CTR+V事件处理
            dataGrid.prototype._handlePageNumberPaste(options);
        });
    },
    /// 说明:
    ///     PageNumber Focus
    _registerPageNumberFocus: function () {
        var options = this.options;
        $("#txtPageNumber_" + options.id).focus();
    },
    /// 说明:
    ///     Checkbox CheckAll
    _registerCheckboxCheckAll: function () {
        var options = this.options;
        var handleEvent = $.delegate(this._handleCheckboxCheckAll, this);
        $("input:checkbox[name='chk_All_" + options.id + "']").change(handleEvent);
    },
    /******************************(注册事件 end)******************************/
    /******************************(事件句柄 begin)******************************/
    /// 说明:
    ///     Go To
    _handleTableFootGoTo: function () {
        var options = this.options;
        var pageNumber = $("#txtPageNumber_" + options.id).val();
        alert(pageNumber)
        if ($.IsNull(pageNumber)) {
            $("#txtPageNumber_" + options.id).val(options.currentPage);
            alert("输入的页数必须是数字且不能为空！");
            return;
        }
        var cuPage = parseInt($("#txtPageNumber_" + options.id).val());
        if (cuPage > options.pageCount) {
            alert("超出了最大页数！");
            $("#txtPageNumber_" + options.id).val(options.currentPage);
            return;
        }
        options.currentPage = cuPage;
        this.jumpPage();
    },

    /// 说明:
    ///     First Page
    _handleTableFootFirstPage: function () {
        this.firstPage();
    },
    /// 说明:
    ///     Last Page
    _handleTableFootLastPage: function () {
        this.finalPage();
    },
    /// 说明:
    ///     Up Page
    _handleTableFootUpPage: function () {
        this.lastPage();
    },
    /// 说明:
    ///     Next Page
    _handleTableFootNextPage: function () {
        this.nextPage();
    },
    /// 说明:
    ///     Tr Mouseover
    _handleTbodyTrMouseover: function (params) {
        var options = params.options;
        var obj = $(this).find("td input:checkbox");
        if (obj.attr("checked")) {
            options.tBodyMouserOutBgcolor = options.tBodyTrSelectedBgColor;
        }
        $(this).css("background-color", options.tBodyMouserOverBgcolor);
    },
    /// 说明:
    ///     Tr Mouseout
    _handleTbodyTrMouseout: function (params) {
        var options = params.options;
        var obj = $(this).find("td input:checkbox");
        if (obj.attr("checked")) {
            $(this).css("background-color", options.tBodyTrSelectedBgColor);
        } else {
            var trRowNumber = parseInt($(this).attr("trRowNumber"));
            if (trRowNumber % 2 == 1) {
                $(this).css("background-color", options.tBodyOddTrBgcolor);
            } else {
                $(this).css("background-color", options.tBodyEvenTrBgcolor);
            }
        }
        if (obj.attr("checked")) {
            options.tBodyMouserOutBgcolor = options.tBodyTrSelectedBgColor;
            $(this).css("background-color", options.tBodyMouserOutBgcolor);
        }
    },

    /// 说明:
    ///     Tr Dblclick
    _handleTbodyTrDblclick: function (params) {
        var options = params.options;
        var obj = $(this).find("td input:checkbox");
        obj.attr("checked", true);
        $(this).css("background-color", options.tBodyTrSelectedBgColor);
    },

    /// 说明:
    ///     Tr Checkbox
    _handleTbodyTrCheckbox: function (params) {
        var checkedRecords = [];
        var options = params.options;
        var objCheckAll = params.objCheckAll;
        var chkAll = true;
        objCheckAll.each(function (i, trCheck) {
            if (!trCheck.checked) {
                $("input:checkbox[name='chk_All_" + options.id + "']").attr("checked", false);
                chkAll = false;
            } else {
                if (options.data != null && options.data.length != 0) {
                    checkedRecords.push(options.data[i]);
                }
            }
        });
        if (chkAll) {
            $("input:checkbox[name='chk_All_" + options.id + "']").attr("checked", true);
        }

        options.checkedRecords = checkedRecords;

        var objCheck = $(this);
        var chkNumber = objCheck.attr("chkNumber");
        var objTr = $("table[datagrid $='" + options.id + "'] tbody[gdTbody ='" + options.id + "'] tr[trRowNumber='" + chkNumber + "']");
        dataGrid.prototype.setSelectedRowStyle(objCheck, objTr, options);
    },
    /// 说明:
    ///     Tr Click
    _handleTbodyTrClick: function (params) {
        var options = params.options;
        var objCheck = $(this).find("td input:checkbox");
        objCheck.attr("checked", !objCheck.attr("checked"));
        var objTr = $(this);
        dataGrid.prototype.setSelectedRowStyle(objCheck, objTr, options);
        var chkAll = true;
        $("table[datagrid $='" + options.id + "'] tbody[gdTbody ='" + options.id + "'] tr").find("input:checkbox").each(function (i, trCheck) {
            if (!trCheck.checked) {
                $("input:checkbox[name='chk_All_" + options.id + "']").attr("checked", false);
                chkAll = false;
            }
        });
        if (chkAll) {
            $("input:checkbox[name='chk_All_" + options.id + "']").attr("checked", true);
        }
    },


    /*_handleThClick: function(params){
     var options = params.options;
     if (options.sort == 'asc'){
     options.sort = 'desc';
     }else{
     options.sort = 'asc';
     }

     },*/

    _handleTbodyThClick: function (params) {
        var options = params.options;

        if (params.order != null && params.order != '') {
            options.order = params.order;

            if (options.sort == 'asc') {
                options.sort_class = 'table_sort_desc';
                options.params['sort'] = 'desc';
                options.sort = 'desc';
            } else {
                options.sort_class = 'table_sort_asc';
                options.sort = 'asc';
                options.params['sort'] = 'asc';
            }

            if (options.thClickCallback != null && typeof options.thClickCallback == 'function') {
                options.thClickCallback(params.order);
            } else {
                options.params['order'] = params.order;
                var gridData = $("#" + options.id)[options.id];
                gridData.init(options);
            }
        }
    },

    /// 说明:
    ///     PageNumber Keyup
    _handlePageNumberKeyup: function (e, options) {
        var curKey = e.which;
        if (curKey == 13) {
            $("#txtPageNumber_" + options.id).blur(); //失去焦点，目的为了增强火狐的用户体验
            var pageNumber = $("#txtPageNumber_" + options.id).val();
            if ($.IsNull(pageNumber)) {
                $("#txtPageNumber_" + options.id).val(options.currentPage);
                alert("输入的页数必须是数字且不能为空！");
                return;
            }
            var cuPage = parseInt(pageNumber);
            if (cuPage > options.pageCount) {
                alert("超出了最大页数！");
                $("#txtPageNumber_" + options.id).val(options.currentPage);
                return;
            }
            options.currentPage = cuPage;
            dataGrid.prototype.jumpPage(options);
        }
        var objThis = $("#txtPageNumber_" + options.id);
        objTmenus / searchhis.val(objThis.val().replace(/\D|^0/g, ''));
    },

    /// 说明:
    ///     PageNumber paste
    _handlePageNumberPaste: function (options) {
        var objThis = $("#txtPageNumber_" + options.id);
        objThis.val(objThis.val().replace(/\D|^0/g, ''));
    },

    /// 说明:
    ///     Checkbox CheckAll
    _handleCheckboxCheckAll: function () {
        //var checkedRecords = [];

        var options = this.options;
        var objThis = $("input:checkbox[name='chk_All_" + options.id + "']");
        var objCheck = $("table[datagrid $='" + options.id + "'] tbody[gdTbody ='" + options.id + "'] tr").find("input:checkbox");
        if (objThis.attr("checked")) {
            objCheck.each(function () {
                $(this).attr("checked", true);
            });
            this.options.checkedRecords = this.options.data;
            $("table[datagrid $='" + options.id + "'] tbody tr").css("background-color", options.tBodyTrSelectedBgColor);
            return;
        }
        objCheck.each(function () {
            $(this).attr("checked", false);
            var trRowNumber = parseInt($(this).attr("chkNumber"));
            var objTr = $("table[datagrid $='" + options.id + "'] tbody tr[trRowNumber='" + trRowNumber + "']");
            if (trRowNumber % 2 == 1) {
                objTr.css("background-color", options.tBodyOddTrBgcolor);
            } else {
                objTr.css("background-color", options.tBodyEvenTrBgcolor);
            }
        });
        this.options.checkedRecords = null;
    },
    /******************************(事件句柄 end)******************************/
    //设置选中行的样式
    //  objCheck:选中行中的checkbox
    //  objTr:选中行
    //  options:参数
    setSelectedRowStyle: function (objCheck, objTr, options) {
        if (objCheck.attr("checked")) {
            objTr.css("background-color", options.tBodyTrSelectedBgColor);
        } else {
            var trRowNumber = parseInt(objTr.attr("trRowNumber"));
            if (trRowNumber % 2 == 1) {
                objTr.css("background-color", options.tBodyOddTrBgcolor);
            } else {
                objTr.css("background-color", options.tBodyEvenTrBgcolor);
            }
        }
    }
};