package com.publiccms.controller.partners;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.BusinessLog;
import com.publiccms.crmenum.ModifyActionEnum;
import com.publiccms.domain.partners.Partners;
import com.publiccms.service.partners.PartnersService;

@Controller 
@RequestMapping("/partnersController")
public class PartnersController {
	@Autowired
	private PartnersService partnersService;
	@RequestMapping(value="/partners/partnerssummit",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject partnersSummit(Partners partners )
	{   
		JSONObject jsonObject =new JSONObject();
		Integer a=partnersService.insert(partners);
			if(a>0)
			{
				jsonObject.put("success","ok");
			}
		
	
		
		return jsonObject;
	}
	
	@RequestMapping(value="/partners/partnerscreate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject partnersCreate(Partners partners )
	{   
		JSONObject jsonObject =new JSONObject();
		Integer a=partnersService.updateById(partners);
			if(a>0)
			{
				jsonObject.put("success","ok");
			}
		
	
		
		return jsonObject;
	}
	@RequestMapping(value="/partners/partnerscanel",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject partnersCanel(Partners partners )
	{   
		JSONObject jsonObject =new JSONObject();
		Integer a=partnersService.partnerscanel(partners);
			if(a>0)
			{
				jsonObject.put("success","ok");
			}
		
	
		
		return jsonObject;
	}
	@RequestMapping(value="/partners/partnersupdate",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject partnersUpdate(Partners partners )
	{   
		JSONObject jsonObject =new JSONObject();
		Integer a=partnersService.partnersupdate(partners);
			if(a>0)
			{
				jsonObject.put("success","ok");
			}
		
	
		
		return jsonObject;
	}
	
	@RequestMapping(value="/partners/partnersdelete",method=RequestMethod.POST)
	@ResponseBody
	@BusinessLog(ModifyActionEnum.house_xiugaiguishuren)
	public JSONObject partnersDelete(Partners partners )
	{   
		JSONObject jsonObject =new JSONObject();
		Integer a=partnersService.partnersdelete(partners);
			if(a>0)
			{
				jsonObject.put("success","ok");
			}
		
	
		
		return jsonObject;
	}
}

