package com.publiccms.controller.banner;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.BusinessLog;
import com.publiccms.crmenum.ModifyActionEnum;
import com.publiccms.domain.banner.Banner;
import com.publiccms.service.banner.BannerService;
import com.publiccms.utils.QiniuClient;

@Controller 
@RequestMapping("/bannerController")
public class BannerController {
	@Autowired
	private BannerService bannerService;
	@Resource
	QiniuClient qiniuClient;
	@RequestMapping(value="banner/banneradd",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject  bannerAdd(@RequestParam("file") MultipartFile img, Banner banner) throws Exception
	{
		JSONObject jsonObject=new JSONObject();
		String filepath = qiniuClient.uuidName(img.getOriginalFilename());
		qiniuClient.put(img, filepath);
		banner.setName(img.getOriginalFilename().substring(0,img.getOriginalFilename().lastIndexOf(".")));
		banner.setLink(filepath);
		banner.setIsdelete(0);
		Integer a=bannerService.insert(banner);
		if (a>0)
		{
			jsonObject.put("success","ok");
		}
		else {
			jsonObject.put("success","error");
		}
		return jsonObject;
	}
	
	@RequestMapping(value="banner/bannercreate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject bannerCreate(Banner banner)
	{
		JSONObject jsonObject=new JSONObject();
		Integer aInteger=bannerService.updateById(banner);
		if(aInteger>0)
		{
			jsonObject.put("success","ok");
		}
		return jsonObject;
	}
	
	@RequestMapping(value="banner/bannercanel",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject bannerCanel(Banner banner)
	{
		JSONObject jsonObject=new JSONObject();
		Integer aInteger=bannerService.canelBanner(banner);
		if(aInteger>0)
		{
			jsonObject.put("success","ok");
		}
		return jsonObject;
	}
	
	@RequestMapping(value="banner/bannerupdate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject bannerUpdate(Banner banner)
	{
		JSONObject jsonObject=new JSONObject();
		Integer aInteger=bannerService.bannerUpate(banner);
		if(aInteger>0)
		{
			jsonObject.put("success","ok");
		}
		return jsonObject;
	}
	
	@RequestMapping(value="banner/bannerdelete",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject bannerDelete(Banner banner)
	{
		JSONObject jsonObject=new JSONObject();
		Integer aInteger=bannerService.bannerDelete(banner);
		if(aInteger>0)
		{
			jsonObject.put("success","ok");
		}
		return jsonObject;
	}
 
}

