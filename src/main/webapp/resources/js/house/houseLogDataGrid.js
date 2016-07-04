$(function () {

    /**
     * 生成列表
     * @type {dataGrid}
     */
	  $.fn['logicLog_building_grid'] = new dataGrid();
	    var gridOptions = getDataGridOptions("logicLog_building_grid");
	    
	    $("#logicLog_building_grid")['logicLog_building_grid'].init({
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
	    	tBodyTrDblclickCallBack: function (record) {
	    	},
	    	_handleTbodyTrClick: function(record){
	    	}
	    });
	
	 $.fn['log_building_grid'] = new dataGrid();
	    var gridOptions = getDataGridOptions("log_building_grid");

	    $("#log_building_grid")['log_building_grid'].init({
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
	        tBodyTrDblclickCallBack: function (record) {
	        },
	        _handleTbodyTrClick: function(record){
	        }
	    });
});
