package com.publiccms.utils;

import com.publiccms.mybatis.Paging;
import com.publiccms.vo.JsonObject;

import java.util.List;

public class PageJsonUtil {

    public static JsonObject toPageJson(Paging page, List list) {
        JsonObject jo = new JsonObject();
        if (list != null && list.size() > 0) {
            jo.setRows(list);
            Double pageSize = Math.ceil(page.getTotalResults() * 1.0 / page.getMaxResults());
            jo.setPageSize(page.getMaxResults() != 0 ? pageSize.longValue() : 0);
            jo.setTotal(page.getTotalResults());
        }
        return jo;
    }

}
