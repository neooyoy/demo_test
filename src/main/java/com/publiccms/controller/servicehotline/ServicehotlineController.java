package com.publiccms.controller.servicehotline;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.BusinessLog;
import com.publiccms.crmenum.ModifyActionEnum;
import com.publiccms.domain.servicehotline.Servicehotline;
import com.publiccms.service.servicehotline.ServicehotlineService;

@Controller 
@RequestMapping("/servicehotlineController")
public class ServicehotlineController {
	@Autowired
	private ServicehotlineService servicehotlineService;
	@RequestMapping(value="servicehotline/servicehotlinecreate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject serviceHotLineCreate(Servicehotline servicehotline)
	{
		JSONObject jObject=new JSONObject();
		servicehotline.setType(1);
		Integer a=servicehotlineService.insert(servicehotline);
		if(a>0)
		{
			jObject.put("success","ok");
		}
		return jObject;
	}
	
	@RequestMapping(value="servicehotline/servicehotlineupdate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject serviceHotLineUpdate(Servicehotline servicehotline)
	{
		JSONObject jsonObject=new  JSONObject();
		Integer a=servicehotlineService.updateById(servicehotline);
		if (a>0)
		{
			jsonObject.put("success","ok");
		}
		return jsonObject;
	}
	
	@RequestMapping(value="servicehotline/serviceaddresscreate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject serviceAddressCreate(Servicehotline servicehotline)
	{
		JSONObject jObject=new JSONObject();
		servicehotline.setType(2);
		Integer a=servicehotlineService.insert(servicehotline);
		if(a>0)
		{
			jObject.put("success","ok");
		}
		return jObject;
	}
	
	@RequestMapping(value="servicehotline/serviceaddressupdate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject serviceAddressUpdate(Servicehotline servicehotline)
	{
		JSONObject jsonObject=new  JSONObject();
		Integer a=servicehotlineService.updateById(servicehotline);
		if (a>0)
		{
			jsonObject.put("success","ok");
		}
		return jsonObject;
	}
}

