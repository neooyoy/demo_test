package com.publiccms.controller.system;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.publiccms.constant.Constant;
import com.publiccms.controller.base.BaseController;
import com.publiccms.domain.system.*;
import com.publiccms.mybatis.Paging;
import com.publiccms.service.system.SystemService;
//import com.publiccms.service.system.UserDetailService;
import com.publiccms.utils.AES_DE;
import com.publiccms.utils.PageJsonUtil;
import com.publiccms.vo.JsonObject;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

/**
 * 系统管理.
 * User: zhanglin
 * Date: 2015/11/23
 * Time: 17:41
 */
@Controller()
@RequestMapping(value = "system")
public class SystemController extends BaseController {

    @Resource
    public SystemService systemService;


//    @Resource
//    public UserDetailService userDetailService;


    @Value("#{config['sso.login.url.root']}")
    private String sso_login_url_root;

    @Value("#{config['sso.login.sys.key']}")
    private String sso_login_sys_key;

    @Value("#{config['sso.login.sys.token']}")
    private String sso_login_sys_token;

    @Value("#{config['sso.user.signin.url']}")
    private String sso_user_signin_url;

    /**
     * 角色列表页
     *
     * @param model
     * @return
     * @throws Exception
     * @author chenjun 20160628
     */
    @RequestMapping("/role")
    public String roleList(Model model) throws Exception {
        List<UserRole> userRoleList = new ArrayList<UserRole>();
        UserRole commonRole = new UserRole();
        commonRole.setRoleId(Constant.COMMON_ROLE_ID);
        commonRole.setRoleName(Constant.COMMON_ROLE_NAME);
        commonRole.setPersonCount(systemService.getRolePersonCount(commonRole.getRoleId()));
        userRoleList.add(commonRole);

        UserRole managerRole = new UserRole();
        managerRole.setRoleId(Constant.MANAGER_ROLE_ID);
        managerRole.setRoleName(Constant.MANAGER_ROLE_NAME);
        managerRole.setPersonCount(systemService.getRolePersonCount(managerRole.getRoleId()));
        userRoleList.add(managerRole);

        model.addAttribute("roles", userRoleList);

        model.addAttribute("active", "role");
        model.addAttribute("currentMenu_type", 1);
        model.addAttribute("currentMenu_parentName", "系统管理");
        model.addAttribute("currentMenu_menuName", "角色控制");
        return "system/role";
    }


    /**
     * 用户管理页面
     *
     * @param model
     * @param roleId
     * @return
     * @throws Exception
     * @author chenjun 20160628
     */
    @RequestMapping("/user")
    public String userList(Model model, Integer roleId) throws Exception {
        model.addAttribute("roleId", roleId);

        model.addAttribute("active", "user");
        model.addAttribute("currentMenu_type", 1);
        model.addAttribute("currentMenu_parentName", "系统管理");
        model.addAttribute("currentMenu_menuName", "用户控制");
        return "system/user";
    }

    /**
     * 查询人员列表
     *
     * @param user
     * @param page
     * @return
     */
    @RequestMapping("getUserList")
    @ResponseBody
    public JsonObject getUserList(User user, Paging page) {
        JsonObject jsonObject = new JsonObject();
        try {
            List<User> userList = systemService.getUserList(user, page);
            jsonObject = PageJsonUtil.toPageJson(page, userList);
        } catch (Exception e) {
            logger.error(e);
            e.printStackTrace();
            return jsonObject;
        }
        return jsonObject;
    }


    /**
     * 新建用户
     *
     * @param user
     * @return
     * @author chenjun 20160629
     */
    @RequestMapping("addUser")
    @ResponseBody
    public JSONObject addUser(User user, HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        try {
            User operateUser = (User) request.getSession().getAttribute("user");

            //判断用户是否存在
            if (systemService.countUserByLoginname(user.getLoginname()) > 0) {
                jsonObject.put("success", false);
                jsonObject.put("message", "用户已存在");
                return jsonObject;
            }

            user.setPassword(AES_DE.encrypt2(user.getPassword() + user.getLoginname(), sso_login_sys_token).toLowerCase());

            systemService.insertUser(user);
            UserRole userRole = new UserRole();
            userRole.setUserId(user.getId());
            userRole.setRoleId(user.getRoleId());
            userRole.setRoleName(user.getRoleId().equals(Constant.COMMON_ROLE_ID) ? Constant.COMMON_ROLE_NAME : Constant.MANAGER_ROLE_NAME);
            userRole.setCreatedAt((int) (System.currentTimeMillis() / 1000));
            userRole.setCreator(operateUser.getId());
            userRole.setCreatorName(operateUser.getFullname());
            systemService.insertUserRoleByUserId(userRole);

            jsonObject.put("success", true);
            jsonObject.put("message", "新增用户成功");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            jsonObject.put("success", false);
            jsonObject.put("message", "新增用户失败");
            return jsonObject;
        }

        return jsonObject;
    }

    /**
     * 修改用户
     *
     * @param user
     * @return
     * @author chenjun 20160629
     */
    @RequestMapping("/modifyUser")
    @ResponseBody
    public JSONObject modifyUser(User user, HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();

        if (user.getLoginname().equals("admin") && user.getRoleId() != null && user.getRoleId().equals(0)) {
            jsonObject.put("success", false);
            jsonObject.put("message", "无法修改管理员用户角色");
            return jsonObject;
        }

        try {
            //修改密码
            if (StringUtils.isNotBlank(user.getPassword())) {
                user.setPassword(AES_DE.encrypt2(user.getPassword() + user.getLoginname(), sso_login_sys_token).toLowerCase());
                systemService.modifyUser(user);
            } else {
                user.setPassword(null);
                systemService.modifyUser(user);
            }

            if (user.getRoleId() != null) {
                UserRole userRole = new UserRole();
                userRole.setUserId(user.getId());
                userRole.setRoleId(user.getRoleId());
                systemService.updateUserRoleByUserId(userRole);
            }

            User operateUser = (User) request.getSession().getAttribute("user");
            //重新设置session
            if (operateUser.getId().equals(user.getId())) {
                operateUser.setCellPhone(user.getCellPhone());
                operateUser.setFullname(user.getFullname());
                operateUser.setEmail(user.getEmail());
                
                HttpSession session = request.getSession(true);
                session.setAttribute("user", operateUser);
            }

            jsonObject.put("success", true);
            jsonObject.put("message", "修改用户成功");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            jsonObject.put("success", false);
            jsonObject.put("message", "修改用户失败");
            return jsonObject;
        }
        return jsonObject;
    }

    /**
     * 删除用户
     *
     * @param userId
     * @return
     * @author chenjun 20160629
     */
    @RequestMapping("/deleteUser")
    @ResponseBody
    public JSONObject deleteUser(Integer userId) {
        JSONObject jsonObject = new JSONObject();
        try {

            User curUser = systemService.selectUserById(userId);
            if (curUser.getLoginname().equals("admin")) {
                jsonObject.put("success", false);
                jsonObject.put("message", "无法删除用户");
                return jsonObject;
            }

            if (userId == null) {
                jsonObject.put("success", true);
                jsonObject.put("message", "删除用户成功");
            }
            User user = new User();
            user.setId(userId);
            user.setIsdelete(1);
            systemService.modifyUser(user);

            jsonObject.put("success", true);
            jsonObject.put("message", "删除用户成功");
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            jsonObject.put("success", false);
            jsonObject.put("message", "删除用户失败");
            return jsonObject;
        }
        return jsonObject;
    }
}
