package com.publiccms.controller.infrastructure;

import com.alibaba.fastjson.JSONArray;
import com.publiccms.annotation.IgnoreAuth;
import com.publiccms.domain.infrastructure.BusinessCircle;
import com.publiccms.service.infrastructure.BusinessCircleService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller 
@RequestMapping("/businesscircleController")
public class BusinessCircleController {
    @Resource
    private BusinessCircleService businessCircleService;

    @RequestMapping("/getBusinessCircle")
    @ResponseBody
    @IgnoreAuth
    public JSONArray getBusinessCircle(Integer districtId) throws Exception{
        List<BusinessCircle> businessCircleList = this.businessCircleService.loadBusinessCircleList(districtId);
        JSONArray jsonArray = new JSONArray();
        jsonArray.add(businessCircleList);
        return jsonArray;
    }
}

