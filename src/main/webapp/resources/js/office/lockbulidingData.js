var cityId = $('#cityId').val();

$(function () {
    /**
     *
     * @type {dataGrid}
     */
    $.fn['building_grid'] = new dataGrid();
    var gridOptions = getDataGridOptions("building_grid");

    $("#building_grid")['building_grid'].init({
        id: gridOptions.id,
        searchButtonId: gridOptions.searchButtonId,
        searchParams: gridOptions.searchParams,
        url: gridOptions.url,
        tHeadCols: gridOptions.tHeadCols,
        trTdentity: gridOptions.trTdentity,
        tableWidth : gridOptions.width,
        tBoolCheckbox: true,
        pageSize: gridOptions.pageSize,
        params: gridOptions.params,
        order : gridOptions.params.order,
        _handleTbodyTrClick: function(record){
        }
    });
});
