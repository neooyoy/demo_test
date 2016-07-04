package com.publiccms.controller.foreground;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.constant.Constant;
import com.publiccms.constant.UbanConstant;
import org.apache.poi.ss.formula.functions.Mode;
import org.apache.xpath.operations.Mod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.publiccms.domain.banner.Banner;
import com.publiccms.domain.office.Office;
import com.publiccms.domain.office.OfficeImgs;
import com.publiccms.domain.partners.Partners;
import com.publiccms.domain.servicehotline.Servicehotline;
import com.publiccms.mybatis.Paging;
import com.publiccms.service.banner.BannerService;
import com.publiccms.service.office.OfficeImgsService;
import com.publiccms.service.office.OfficeService;
import com.publiccms.service.partners.PartnersService;
import com.publiccms.service.servicehotline.ServicehotlineService;
import com.publiccms.utils.Logger;
import com.publiccms.utils.PageJsonUtil;
import com.publiccms.vo.JsonObject;

import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;

/**
* Created by ZDD on 2016/6/28.
		*/
@Controller
@RequestMapping("/foreGround")
public class ForeGroundController {
	@Autowired
	private OfficeService officeService;
	@Autowired
	private BannerService bannerService;
	@Autowired
	private OfficeImgsService officeImgsService;
	@Autowired
	private PartnersService partnersService;
	@Autowired
	private ServicehotlineService servicehotlineService;

	private Logger logger = Logger.getLogger(this.getClass());
	private static final Integer hotline = 1;
	private static final Integer address = 2;

	@RequestMapping("/detail")
	public String foregroundDetail(Integer id, Model model, Paging page) {

		String phone = servicehotlineService.listAll().get(0).getPhone();
		model.addAttribute("phone", phone);

		Office office = officeService.selectById(id);
		if (office != null) {
			model.addAttribute("name", office.getName());
			model.addAttribute("artremark", office.getArtremark());
			model.addAttribute("price", office.getPrice());
			model.addAttribute("circle_name", office.getCircleName());
			model.addAttribute("description", office.getDescription());
			model.addAttribute("investor_contact", office.getInvestorContact());

			if (office.getInvestorContactphone() != null
					&& !office.getInvestorContactphone().equals("")) {
				model.addAttribute("investor_contactphone",
						office.getInvestorContactphone());
			} else {
				model.addAttribute("investor_contactphone", phone);
			}

			Integer investorType = office.getInvestorType();
			String[] investorTypeArray = { "大业主", "大业主", "小业主", "大+小业主" };
			if (investorType >= 0 && investorType < investorTypeArray.length) {
				String investorTypeStr = investorTypeArray[investorType];
				model.addAttribute("investor_type", investorTypeStr);
			}
			if (office.getConstructionRatio() != null
					&& office.getConstructionRatio() != 0) {
				model.addAttribute("construction_ratio",
						office.getConstructionRatio() + "%");
			}
			if (office.getLandAreasize() != null
					&& !office.getLandAreasize().equals("0.00")) {
				model.addAttribute("land_areasize", office.getLandAreasize()
						+ "㎡");
			}
			if (office.getGroundfloor() != null && office.getGroundfloor() != 0) {
				model.addAttribute("groundfloor", office.getGroundfloor() + "层");
			}
			model.addAttribute("management_level", office.getManagementLevel());
			if (office.getFloorHeight() != null
					&& !office.getFloorHeight().equals("0.00")) {
				model.addAttribute("floor_height", office.getFloorHeight()
						+ "m");
			}
			model.addAttribute("management_company",
					office.getManagementCompany());
			if (office.getManagementMoney() != null
					&& !office.getManagementMoney().equals("0.00")) {
				model.addAttribute("management_money",
						office.getManagementMoney() + "元/㎡·月");
			}
			List<OfficeImgs> imgsList = officeImgsService
					.findimgByofficeId(office.getId());
			if (!imgsList.isEmpty()) {
				model.addAttribute("imgpath", imgsList.get(0).getImgpath());
			}

			String officeIds = office.getId() + "";
			Integer circleId = office.getCircleId();
			Integer districtId = office.getDistrictId();
			Integer cityId = office.getCityId();
			Office officeParam = new Office();

			officeParam.setHasImgpath(1);
			officeParam.setCircleId(circleId);
			officeParam.setOfficeIds(officeIds);
			page.setMaxResults(4);
			List<Office> newOfficeList = officeService.selectBuildingsListPage(
					officeParam, page);
			if (newOfficeList.size() < 4) {
				officeParam.setCircleId(null);
				officeParam.setDistrictId(districtId);
				List<String> officeIdList = new ArrayList<>();
				officeIdList.add(officeIds);
				for (int j = 0; j < newOfficeList.size(); j++) {
					Integer officeId = newOfficeList.get(j).getId();
					officeIdList.add(officeId + "");
				}
				officeParam.setOfficeIds(StringUtils.join(officeIdList, ","));
				page.setMaxResults(4 - newOfficeList.size());
				newOfficeList.addAll(officeService.selectBuildingsListPage(
						officeParam, page));
				if (newOfficeList.size() < 4) {
					officeParam.setDistrictId(null);
					officeParam.setCityId(cityId);
					for (int k = 0; k < newOfficeList.size(); k++) {
						Integer officeId = newOfficeList.get(k).getId();
						officeIdList.add(officeId + "");
					}
					officeParam.setOfficeIds(StringUtils
							.join(officeIdList, ","));
					page.setMaxResults(4 - newOfficeList.size());
					newOfficeList.addAll(officeService.selectBuildingsListPage(
							officeParam, page));
				}
			}

			/*for (int i = 0; i < newOfficeList.size(); i++) {
				newOfficeList.get(i).setImgpath(
						"http://" + UbanConstant.PICTURE_URL + "/"
								+ newOfficeList.get(i).getImgpath());
			}*/
			model.addAttribute("newOfficeList", newOfficeList);

			List<Servicehotline> servicehotlines = servicehotlineService
					.selectHotline(hotline);
			if (servicehotlines.size() > 0) {
				model.addAttribute("servicehotlines", servicehotlines.get(0));
			}

			List<Servicehotline> serviceadderss = servicehotlineService
					.selectHotline(address);
			if (serviceadderss.size() > 0) {
				model.addAttribute("serviceadderss", serviceadderss.get(0));
			}
		}
		return "foreground/detail";
	}

	/**
	 * 前台大楼列表
	 *
	 * @return
	 * @author chenjun 20160628
	 */
	@RequestMapping("list")
	public String list(Model model, Office office) {
		List<Servicehotline> serviceadderss = servicehotlineService
				.selectHotline(address);
		if (serviceadderss.size() > 0) {
			model.addAttribute("serviceadderss", serviceadderss.get(0));
		}
		if (StringUtils.isNotBlank(office.getName())){
			model.addAttribute("officeName", office.getName());
		}

		List<Servicehotline> servicehotlines = servicehotlineService
				.selectHotline(hotline);
		if (servicehotlines.size() > 0) {
			model.addAttribute("servicehotlines", servicehotlines.get(0));
		}

		return "foreground/list";
	}

	/**
	 * 前台大楼列表查询
	 *
	 * @return
	 * @author chenjun 20160628
	 */
	@RequestMapping("querylist")
	@ResponseBody
	public JsonObject querylist(Office office, Paging page) {
		JsonObject jsonObject = new JsonObject();
		try {
			office.setStatus(1);
			List<Office> officeList = this.officeService
					.selectBuildingsListPage(office, page);
			jsonObject = PageJsonUtil.toPageJson(page, officeList);
		} catch (Exception e) {
			logger.error(e);
			e.printStackTrace();
		}
		return jsonObject;
	}

	// 首页
	@RequestMapping("index")
	public String indexPage(Model model, OfficeImgs officeImgs) {
		List<Banner> banners = bannerService.listPublishAll();
		if (banners.size() > 0) {
			model.addAttribute("banners", banners);
		}
		List<OfficeImgs> offices = officeImgsService
				.selectOfficeImg(officeImgs);
		if (offices.size() > 0) {
			model.addAttribute("offices", offices);
		}
		List<Partners> partners = partnersService.selectPublishPartners();
		if (partners.size() > 0) {
			model.addAttribute("partners", partners);
		}
		List<Servicehotline> servicehotlines = servicehotlineService
				.selectHotline(hotline);
		if (servicehotlines.size() > 0) {
			model.addAttribute("servicehotlines", servicehotlines.get(0));
		}
		List<Servicehotline> serviceadderss = servicehotlineService
				.selectHotline(address);
		if (serviceadderss.size() > 0) {
			model.addAttribute("serviceadderss", serviceadderss.get(0));
		}
		model.addAttribute("name", officeImgs.getName());
		return "foreground/index";
	}

/*

	@RequestMapping("getIndexInfo")
	@ResponseBody
	public JSONObject getIndexInfo(){
		JSONObject jsonObject = new JSONObject();
		List<Banner> banners = bannerService.listPublishAll();
		if (banners.size() > 0) {
			jsonObject.put("banners", banners);
		}

		OfficeImgs officeImgs = new OfficeImgs();
		List<OfficeImgs> offices = officeImgsService
				.selectOfficeImg(officeImgs);
		if (offices.size() > 0) {
			jsonObject.put("offices", offices);
		}
		List<Partners> partners = partnersService.selectPublishPartners();
		if (partners.size() > 0) {
			jsonObject.put("partners", partners);
		}
		List<Servicehotline> servicehotlines = servicehotlineService
				.selectHotline(hotline);
		if (servicehotlines.size() > 0) {
			jsonObject.put("servicehotlines", servicehotlines.get(0));
		}
		List<Servicehotline> serviceadderss = servicehotlineService
				.selectHotline(address);
		if (serviceadderss.size() > 0) {
			jsonObject.put("serviceadderss", serviceadderss.get(0));
		}
		jsonObject.put("name", officeImgs.getName());
		return jsonObject;
	}
*/

}