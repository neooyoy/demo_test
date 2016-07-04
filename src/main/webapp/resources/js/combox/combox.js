var combox = function () {
    //参数定义
    this.defaultParams = {
        //参数定义
        id: "",
        data: [],
        url: null,
        width: '80px',
        value: null,
        text: null,
        lable: '',
        params: {},
        showAll: true,
        lableWidth: '50px',
        checkbox: false,    //是否显示check box
        onchange: '',
        hidenDisabledValue: '',
        //curValue : null,
        //curText : '',
        tBodyTrDblclickCallBack: $.noop //双击行 的回到函数
    };
    this.options = {};
};

combox.prototype = {
    constructor: combox,
    init: function (params) {
        this.options = $.coverObject(this.defaultParams, params);
        this._init();
    },
    reload: function (params) {
        if (params != null) {
            this.options.params = params.params;
        }
        this._init();
    },
    clear: function(){
        this.options.data = [];

        //创建下拉框
        this.createComboxBody();
    },
    _init: function () {
        //获取数据源
        this.tInitializeGetData();

        //创建下拉框
        this.createComboxBody();

        //选择是否显示多选按钮
        /*if (this.options.checkbox) {
         this.addCheckbox();
         }*/

        //注册事件
    },

    ///说明：
    ///获取数据
    tInitializeGetData: function () {
        if (this.options.url != null && this.options.url != '') {
            var optionsData = null;
            var paramsData = {};
            if (this.options.params != null){
                paramsData = this.options.params;
            }

            $.ajax({
                type: "POST",
                url: this.options.url,
                data: paramsData,
                dataType: "json",
                async: false,
                success: function (result) {
                    optionsData = result[0];
                }
            });

            this.options.data = optionsData;
        }
    },

    ///说明：
    ///     创建 table body
    createComboxBody: function () {
        var options = this.options;

        var valueField = options.value;
        var textField = options.text;

        var id = options.id;
        var data = options.data;


        var htmlBody = "<div class='form-group'>";

        if ($("#" + id)[0].parentNode != null && $("#" + id)[0].parentNode.attributes.length>0 && $("#" + id)[0].parentNode.attributes[0].value == "form-group"){
            htmlBody = "";
        }

        if (options.lable != null && options.lable != ''){
            htmlBody += "<label>" + options.lable + "</label>&nbsp;";
        }


        if (this.options.onchange != null && this.options.onchange !=''){
            htmlBody += "<select  id=" + id + " class='form-control' style='width:"+ options.width +"' onchange='"+ this.options.onchange +"'>";
        }else{
            htmlBody += "<select id=" + id + " class='form-control' style='width:"+ options.width +"'>";
        }

        if (options.hidenDisabledValue != null && options.hidenDisabledValue != ''){
            htmlBody += "<option value='' selected disabled class='hide'>" + options.hidenDisabledValue + "</option>";
        }

        if (options.showAll){

            htmlBody += "<option value=''>全部</option>";
        }

        $.each(data, function (i, ob) {
            htmlBody += "<option  value='" + ob[valueField] + "'>" + ob[textField] + "</option>";
        });


        if ($("#" + id)[0].parentNode != null && $("#" + id)[0].parentNode.attributes.length>0 && $("#" + id)[0].parentNode.attributes[0].value == "form-group"){
            htmlBody += "</select>";
            $("#" + id)[0].parentNode.innerHTML = htmlBody;
        }else{
            htmlBody += "</select></div>";
            $("#" + id)[0].outerHTML = htmlBody;
        }
        //$("#" + id)[0].outerHTML = htmlBody;
    },


    ///说明：
    ///     添加多选框
    /* addCheckbox: function () {
     var id = this.options.id;
     $("table[datagrid $='" + id + "'] thead tr").find("td:first").each(function (i) {
     $(this).before("<td align='center' width='30'><input type='checkbox' name='chk_All_" + id + "' value='checkbox'> </td>");
     });
     $("table[datagrid $='" + id + "'] tbody[gdTbody ='" + id + "'] tr").find("td:first").each(function (i) {
     $(this).before("<td align='center'><input type='checkbox' name='chk_" + i + "' chkNumber='" + (i + 1) + "' value='checkbox'> </td>");
     });
     }*/

    /******************************(注册事件 begin)******************************/
    /******************************(注册事件 end)******************************/
    /******************************(事件句柄 begin)******************************/
};