package com.publiccms.vo;

import java.util.List;

public class JsonObject {
    /*
     * 分页总数
     */
    private Long pageSize;

    /*
     * 查询结果总数
     */
    private Long total;

    /*
     * 查询结果列表
     */
    private List rows;

    public Long getPageSize() {
        return pageSize;
    }

    public void setPageSize(Long pageSize) {
        this.pageSize = pageSize;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }
}