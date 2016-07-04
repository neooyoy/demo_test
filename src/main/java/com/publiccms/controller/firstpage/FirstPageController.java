package com.publiccms.controller.firstpage;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.publiccms.domain.banner.Banner;
import com.publiccms.domain.partners.Partners;
import com.publiccms.domain.servicehotline.Servicehotline;
import com.publiccms.service.banner.BannerService;
import com.publiccms.service.partners.PartnersService;
import com.publiccms.service.servicehotline.ServicehotlineService;

@Controller 
@RequestMapping("/firtPageController")
public class FirstPageController {
	@Autowired
	private BannerService  bannerService;
	@Autowired
	private PartnersService partnersService;
	@Autowired
	private ServicehotlineService servicehotlineService;
	private static final Integer hotline=1;
	private  static  final Integer address=2; 
	@RequestMapping("/firstPage")
	public String firstPage(Model model)
	{   
		List<Banner> banners=bannerService.listAll();
	     if(banners.size()>0)
	     {
	    	 model.addAttribute("banners",banners);
	     }
	    List<Partners> partners=partnersService.listAll();
	    if(partners.size()>0)
	    {
	    	model.addAttribute("partners",partners);
	    }
	    List<Servicehotline> servicehotlines=servicehotlineService.selectHotline(hotline);
		if(servicehotlines.size()>0)
		{
			model.addAttribute("servicehotlines",servicehotlines.get(0));
		}
	    List<Servicehotline> serviceadderss=servicehotlineService.selectHotline(address);
	    if(serviceadderss.size()>0)
	    {
	    	model.addAttribute("serviceadderss",serviceadderss.get(0));
	    }
		model.addAttribute("active", "firstPage");
		model.addAttribute("currentMenu_type", 1);
		model.addAttribute("currentMenu_parentName", "系统管理");
		model.addAttribute("currentMenu_menuName", "首页管理");
		return"firstPage/firstPage";
	}

}
