package com.publiccms.controller.infrastructure;

import com.alibaba.fastjson.JSONArray;
import com.publiccms.annotation.IgnoreAuth;
import com.publiccms.domain.infrastructure.District;
import com.publiccms.service.infrastructure.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller 
@RequestMapping("/districtController")
public class DistrictController {

    @Autowired
    private DistrictService districtService;

    @RequestMapping("/getDistrict")
    @ResponseBody
    @IgnoreAuth
    public JSONArray getDistrict(Integer cityId) throws Exception{
        List<District> districtList = this.districtService.loadDistrictList(cityId);
        JSONArray jsonArray = new JSONArray();
        jsonArray.add(districtList);
        return jsonArray;
    }
}

