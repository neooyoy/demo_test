
package com.publiccms.controller.office;


import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.BusinessLog;
import com.publiccms.crmenum.ModifyActionEnum;
import com.publiccms.domain.office.OfficeImgs;
import com.publiccms.service.office.OfficeImgsService;
import com.publiccms.utils.QiniuClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;

@Controller
@RequestMapping("/officeimgsController")
public class OfficeImgsController {
    @Autowired
    private OfficeImgsService officeImgsService;


    @Resource
    QiniuClient qiniuClient;

    /**
     * 新建修改空间图片
     */
    @RequestMapping(value = "addImgs", method = {RequestMethod.POST})
    @ResponseBody
    @BusinessLog(ModifyActionEnum.office_imgs_tupian)
    public JSONObject addImgs(@RequestParam("file") MultipartFile img, OfficeImgs officeImgs) throws Exception {
        String filepath = qiniuClient.uuidName(img.getOriginalFilename());
        qiniuClient.put(img, filepath);
        officeImgs.setImgformat(filepath.substring(filepath.lastIndexOf(".")));
        officeImgs.setImgpath(filepath);
        officeImgs.setIsdelete(0);
        officeImgsService.insert(officeImgs);
        JSONObject json = new JSONObject();
        json.put("path", filepath);
        json.put("type", officeImgs.getImgtype());
        json.put("imgid", officeImgs.getId());
        json.put("is3d", officeImgs.getIs3d());
        json.put("success", "ok");
        return json;

    }

    @RequestMapping("/deleteBuildingImages")
    @ResponseBody
    public JSONObject deteleBuildingImags(OfficeImgs officeImgs) throws Exception {
        officeImgs.setIsdelete(1);
        officeImgsService.updateById(officeImgs);
        JSONObject json = new JSONObject();
        json.put("success", "ok");
        json.put("imgid", officeImgs.getId());
        return json;
    }

    @RequestMapping("/saveImagesDescription")
    @ResponseBody
    public JSONObject saveImagesDescription(OfficeImgs officeImgs) throws Exception {
        officeImgs.getId();
        officeImgsService.adddes(officeImgs);
        JSONObject json = new JSONObject();
        json.put("success", "ok");
        json.put("imgDesc", officeImgs.getImgDesc());
        return json;
    }


}


