package com.publiccms.controller.office;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.BusinessLog;
import com.publiccms.crmenum.ModifyActionEnum;
import com.publiccms.domain.office.*;
import com.publiccms.service.office.*;
import com.publiccms.utils.ChineseCharToEnUtil;
import com.publiccms.domain.system.User;
import com.publiccms.mybatis.Paging;
import com.publiccms.utils.DateUtils;
import com.publiccms.utils.Logger;
import com.publiccms.utils.StringUtils;
import com.publiccms.vo.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/officeController")
public class OfficeController {
    @Autowired
    private OfficeService officeService;

    @Autowired
    private OfficeImgsService officeImgsService;

    private Logger logger = Logger.getLogger(this.getClass());

    //添加大楼信息
    @RequestMapping(value = "/insertOffice", method = RequestMethod.POST)
    @BusinessLog(ModifyActionEnum.office_chuangjianxinloupan)
    public String insertOffice(Office office, Model model, String completeTime, HttpServletRequest request, String deliverDateStr) {
        Integer time = 0;
        if (deliverDateStr == null || deliverDateStr.equals("")) {
            office.setDeliverDate(0);
        } else {

            try {
                time = new Long(new SimpleDateFormat("yyyy-MM-dd").parse(deliverDateStr).getTime() / 1000)
                        .intValue();

            } catch (ParseException e) {
                e.printStackTrace();
            }
            office.setDeliverDate(time);
        }

        if (office.getIsfullCheckedAt() == null) {
            office.setIsfull(0);
        }
        if (office.getLockChecked() == null) {
            office.setLockChecked(0);
        }

        try {
            String officename = office.getName().replaceAll(" ", "");
            if (StringUtils.isEmpty(officename)) {
                model.addAttribute("msg", "<script language=javascript>window.alert('" + "大楼名称不能为空" + "');</script>");
                return "office/officedetail";
            } else {
                office.setNameSp(ChineseCharToEnUtil.getPinYin(officename));
                office.setNameFl(ChineseCharToEnUtil.getAllFirstLetter(officename));
            }
            office.setName(officename);

            User user = (User) request.getSession().getAttribute("user");

            if (officeService.selectByName(office) == null) {
                officeService.insert(completeTime, office, user);
                model.addAttribute("successful", "<script language=javascript>window.alert('" + "保存成功" + "');</script>");
                this.selectById(office.getId(), model, request);
            } else {
                model.addAttribute("msg", "<script language=javascript>window.alert('" + "该大楼名称已存在" + "');</script>");
                return "office/officedetail";
            }
        } catch (Exception e) {
            logger.error(e);
            model.addAttribute("error", "<script language=javascript>window.alert('" + "保存失败" + "');</script>");
        }
        return "office/officedetail";
    }


    //修改大楼信息
    @RequestMapping(value = "/updateOffice", method = RequestMethod.POST)
    @BusinessLog(ModifyActionEnum.office_updatedalou)
    public String updateOffice(Office office, Model model, String completeTime, String tags, HttpServletRequest request, String deliverDateStr) {
        Integer time = 0;

        /**
         * 自动生成拼音全拼和首字母名称的功能
         * add by cj 20160427
         */
        if (StringUtils.isNotBlank(office.getName())) {
            office.setNameSp(ChineseCharToEnUtil.getPinYin(office.getName()));
            office.setNameFl(ChineseCharToEnUtil.getAllFirstLetter(office.getName()));
        }

        if (deliverDateStr == null || deliverDateStr.equals("")) {
            office.setDeliverDate(0);
        } else {

            try {
                time = new Long(new SimpleDateFormat("yyyy-MM-dd").parse(deliverDateStr).getTime() / 1000)
                        .intValue();

            } catch (ParseException e) {
                e.printStackTrace();
            }
            office.setDeliverDate(time);
        }


        try {
            String officename = office.getName().replaceAll(" ", "");
            if (StringUtils.isEmpty(officename)) {
                model.addAttribute("msg", "<script language=javascript>window.alert('" + "大楼名称不能为空" + "');</script>");
                return "office/officedetail";
            }
            office.setName(officename);
            User user = (User) request.getSession().getAttribute("user");
            if (officeService.selectByName(office) == null) {
                officeService.update(completeTime, office);
                model.addAttribute("successful", "<script language=javascript>window.alert('" + "保存成功" + "');</script>");
            } else {
                model.addAttribute("msg", "<script language=javascript>window.alert('" + "该大楼名称已存在" + "');</script>");
                this.selectById(office.getId(), model, request);
                return "office/officedetail";
            }
        } catch (Exception e) {
            logger.error(e);
            model.addAttribute("error", "<script language=javascript>window.alert('" + "保存失败" + "');</script>");
        }
        this.selectById(office.getId(), model, request);
        return "office/officedetail";
    }

    // 根据id查询大楼详细信息
    @RequestMapping(value = "/insertOrUpdateOffice", method = RequestMethod.GET)
    public String selectById(Integer id, Model model, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        //跳转到添加,修改页面页
        if (StringUtils.isEmpty(id)) {
            String createflag = "create";  //标识为创建大楼无上传图片功能
            model.addAttribute("createflag", createflag);
        } else {
            Office office = officeService.selectById(id);
//            String[] imgArray = {"1,外形图,0", "2,大堂图,0", "4,公共洗手间图,0", "5,电梯空间图,0", "6,标准平面图,0", "7,全景图,1"};

            String[] imgArray = {"1,外形图,0"};

            List<OfficeImgs> acquireimg = officeImgsService.findimgByofficeId(id);
            String createflag = "mod";                   //标识为修改大楼有上传图片功能
            model.addAttribute("createflag", createflag);
            model.addAttribute("imgArry", imgArray);
            model.addAttribute("acquireimg", acquireimg);
            model.addAttribute("office", office);
            String completeTime_back = "";
            String DeliverDate = "";
            if (office.getTimeOfOf() == null || office.getTimeOfOf() == 0) {
                model.addAttribute("completeTime", completeTime_back);
            } else {
                completeTime_back = DateUtils.UnixTime2ToDate(office.getTimeOfOf());
                model.addAttribute("completeTime", completeTime_back);
            }
            if (office.getDeliverDate() == null || office.getDeliverDate() == 0) {
                model.addAttribute("DeliverDate", DeliverDate);
            } else {
                DeliverDate = DateUtils.UnixTime2ToDate(office.getDeliverDate());
                model.addAttribute("DeliverDate", DeliverDate);
            }
        }
        model.addAttribute("active", "office");
        model.addAttribute("currentMenu_type", 1);
        model.addAttribute("currentMenu_parentName", "楼盘管理");
        model.addAttribute("currentMenu_menuName", "楼盘列表");
        return "office/officedetail";
    }

    /**
     * 查询大楼列表
     *
     * @param office
     * @param page
     * @return
     */
    @RequestMapping(value = "findListPage", headers = "Accept=application/json")
    @ResponseBody
    public JsonObject findListPage(Office office, Paging page, HttpServletRequest request) {
        List<Office> officeList = this.officeService.selectBuildingsListPage(office, page);
        JsonObject jsonObject = new JsonObject();
        jsonObject.setRows(officeList);
        Double pageSize = Math.ceil(page.getTotalResults() * 1.0 / page.getMaxResults());
        jsonObject.setPageSize(page.getMaxResults() != 0 ? pageSize.longValue() : 0);
        jsonObject.setTotal(page.getTotalResults());
        return jsonObject;
    }

    @RequestMapping("/officelist")
    public String officelist(Model model) throws Exception {
        model.addAttribute("active", "office");
        model.addAttribute("currentMenu_type", 1);
        model.addAttribute("currentMenu_parentName", "楼盘管理");
        model.addAttribute("currentMenu_menuName", "楼盘列表");
        return "office/officelist";
    }

    @RequestMapping("/changePriority")
    @ResponseBody
    public String changePriority(Office office){
        try{
            this.officeService.updateById(office);
        }catch (Exception e){
            e.printStackTrace();
            logger.error(e);
        }
        return "success";
    }

    /**
     * 发布，
     */
    @RequestMapping("/updateFabu")
    @BusinessLog(ModifyActionEnum.office_fabudalou)
    public String updateFabu(Model model, Integer id, HttpServletRequest request) {
        try {
            //大楼发布时间publish_date
            Integer publishDate = (int) (new Date().getTime() / 1000L);
            Office newOffice = new Office();
            newOffice.setId(id);
            newOffice.setStatus(1);
            newOffice.setPublishDate(publishDate);
            officeService.updateById(newOffice);
            selectById(id, model, request);
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
        }

        return "office/officedetail";
    }

    /**
     * 取消发布
     */
    @RequestMapping("/updateQuXiaoFaBu")
    @BusinessLog(ModifyActionEnum.office_quxiaofabudalou)
    public String updateQuXiaoFaBu(Model model, Integer id, HttpServletRequest request) {
        Office newOffice = new Office();
        newOffice.setId(id);
        newOffice.setStatus(0);
        newOffice.setPublishDate(0);
        officeService.quxiaofabu(newOffice);
        this.selectById(id, model, request);
        return "office/officedetail";
    }

    /**
     * 获取当前登录用户所有城市权限的大楼信息下拉框数据
     *
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "getComboDataOfOfficeList", headers = "Accept=application/json")
    @ResponseBody
    public List getComboDataOfOfficeList(String q, HttpServletRequest request, Integer id) throws Exception {
        String officeName = q;
        HttpSession session = request.getSession(false);
        User user = (User) session.getAttribute("user");
        List<Office> officeList = new ArrayList<Office>();
        List<Integer> officeIdList = new ArrayList<Integer>();

        if (id != null) {
            Office office = new Office();
            office.setId(id);
            officeList = officeService.getComboDataOfOfficeList(office);
            return officeList;
        }

        if (StringUtils.isBlank(officeName)) {
            return officeList;
        } else {
            String[] officeNameArray = officeName.split(",");
            for (int i = 0; i < officeNameArray.length; i++) {
                if (StringUtils.isNotBlank(officeNameArray[i])) {
                    Office office = new Office();
                    office.setName(officeNameArray[i].trim());
                    List<Office> tempOfficeList = officeService.getComboDataOfOfficeList(office);

                    if (!tempOfficeList.isEmpty()) {
                        for (Office tempOffice : tempOfficeList) {
                            if (!officeIdList.contains(tempOffice.getId())) {
                                officeIdList.add(tempOffice.getId());

                                officeList.add(tempOffice);
                            }
                        }
                    }
                }
            }
        }

        return officeList;
    }

    /**
     * @param office
     * @return
     * @author chenjun 20160421
     */
    @RequestMapping("/getOfficeAddData")
    @ResponseBody
    public JSONObject getOfficeAddData(Office office) {
        JSONObject json = new JSONObject();
        try {
            Office returnOffice = officeService.getOfficeAddData(office);
            if (returnOffice != null) {
                json.put("officeId", returnOffice.getId());
                json.put("lockflag", returnOffice.getLockflag());
                json.put("success", true);
                json.put("message", "查询大楼信息成功");
            } else {
                json.put("success", false);
                json.put("message", "大楼不存在");
            }
        } catch (Exception e) {
            logger.error(e);
            e.printStackTrace();
            json.put("success", false);
            json.put("message", "查询大楼信息失败");
            return json;
        }
        return json;
    }

}
