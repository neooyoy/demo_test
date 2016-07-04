package com.publiccms.controller.system;

import com.publiccms.constant.Constant;
import com.publiccms.controller.base.BaseController;
import com.publiccms.domain.system.User;
import com.publiccms.domain.system.UserRole;
import com.publiccms.service.system.SystemService;
import com.publiccms.utils.AES_DE;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 登录入口
 * User: chenjun
 * Date: 2016/06/29
 * Time: 17:19
 */
@Controller
public class LoginController extends BaseController {

    @Resource
    public SystemService systemService;

    @Value("#{config['sso.login.sys.token']}")
    private String sso_login_sys_token;


    private void setWrongCount(User user, Model model) throws Exception {
        if (user.getWrongCount() == null) {
            model.addAttribute("wrongCount", 1);
        } else {
            if (user.getWrongCount() > 3) {
                model.addAttribute("showVerifycode", 1);
                model.addAttribute("wrongCount", user.getWrongCount() + 1);
            } else {
                model.addAttribute("wrongCount", user.getWrongCount() + 1);
            }
        }
    }

    /**
     * 用户登录
     *
     * @param user
     * @return
     * @author chenjun 20160629
     */
    @RequestMapping("/loginxiezilou")
    public String login(User user, Model model, HttpServletRequest request) {
        String url = "";
        try {
            if (StringUtils.isBlank(user.getLoginname()) && StringUtils.isBlank(user.getPassword())) {
                setWrongCount(user, model);
                return "system/login";
            }

            if (StringUtils.isBlank(user.getLoginname()) || StringUtils.isBlank(user.getPassword())) {
                setWrongCount(user, model);
                model.addAttribute("message", "请输入登录名和密码");
                model.addAttribute("loginname", user.getLoginname());
                return "system/login";
            }

            if (StringUtils.isNotBlank(user.getImgcode()) &&
                    !((String) request.getSession().getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY)).equals(user.getImgcode())) {
                model.addAttribute("message", "验证码不正确");
                model.addAttribute("loginname", user.getLoginname());
                model.addAttribute("showVerifycode", 1);
                return "system/login";
            }

            User curUser = systemService.selectByLoginname(user.getLoginname());
            if (curUser == null) {
                model.addAttribute("message", "登录名或密码错误");
                model.addAttribute("loginname", user.getLoginname());
                model.addAttribute("password", user.getPassword());
                setWrongCount(user, model);
                return "system/login";
            }

            if (curUser.getForbidden().equals(1)) {
                Integer curMinute = (int) (System.currentTimeMillis() / 1000);
                if ((curUser.getLastLoginAt() + 15 * 60) > curMinute) {
                    model.addAttribute("message", "请" + ((15 * 60 - (curMinute - curUser.getLastLoginAt())) / 60) + "分钟后再登录");
                    model.addAttribute("loginname", user.getLoginname());
                    return "system/login";
                } else {
                    curUser.setWrongCount(0);
                    curUser.setForbidden(0);
                }
            }

            if (!AES_DE.encrypt2(user.getPassword() + user.getLoginname(), sso_login_sys_token).toLowerCase().equals(curUser.getPassword())) {
                if (curUser.getWrongCount() < 3) {
                    User modifyUser = new User();
                    modifyUser.setId(curUser.getId());
                    modifyUser.setWrongCount(curUser.getWrongCount() + 1);
                    modifyUser.setForbidden(0);
                    systemService.modifyUser(modifyUser);

                    model.addAttribute("message", "登录名或密码错误");
                    model.addAttribute("loginname", user.getLoginname());
                    model.addAttribute("password", user.getPassword());
                    return "system/login";
                } else if (curUser.getWrongCount() >= 3 && curUser.getWrongCount() < 5) { //需要输入验证码
                    User modifyUser = new User();
                    modifyUser.setId(curUser.getId());
                    modifyUser.setWrongCount(curUser.getWrongCount() + 1);
                    systemService.modifyUser(modifyUser);

                    model.addAttribute("message", "登录名或密码错误, 您还有" + (5 - curUser.getWrongCount()) + "次尝试机会");
                    model.addAttribute("loginname", user.getLoginname());
                    model.addAttribute("password", user.getPassword());
                    model.addAttribute("showVerifycode", 1);
                    return "system/login";
                } else { //登录错误次数等于6次，15分钟后才可以再次登录
                    User modifyUser = new User();
                    modifyUser.setId(curUser.getId());
                    modifyUser.setWrongCount(curUser.getWrongCount() + 1);
                    modifyUser.setForbidden(1);
                    modifyUser.setLastLoginAt((int) (System.currentTimeMillis() / 1000));
                    systemService.modifyUser(modifyUser);

                    model.addAttribute("message", "登录名或密码错误, 请15分钟后再登录");
                    model.addAttribute("loginname", user.getLoginname());
                    model.addAttribute("password", user.getPassword());
                    return "system/login";
                }
            }

            User modifyUser = new User();
            modifyUser.setId(curUser.getId());
            modifyUser.setWrongCount(0);
            modifyUser.setForbidden(0);
            modifyUser.setLastLoginAt((int) (System.currentTimeMillis() / 1000));
            systemService.modifyUser(modifyUser);


            UserRole userRole = systemService.selectByUserId(curUser.getId());
            if (userRole != null) {
                curUser.setRoleId(userRole.getRoleId());
            }

            curUser.setPassword(null);

            //保存session
            HttpSession session = request.getSession(true);
            session.setAttribute("user", curUser);

            if (curUser.getRoleId().equals(Constant.COMMON_ROLE_ID)) {
                url = "redirect:/officeController/officelist";
            } else {
                url = "redirect:/system/user";
            }
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e);
            model.addAttribute("message", "登录名或密码错误");
            return "system/login";
        }

        return url;
    }

    /**
     * 登录页
     *
     * @return
     * @author chenjun 20160629
     */
  /*  @RequestMapping("/login")
    public String login(Model model) {
        return "system/login";
    }*/
    @RequestMapping(value = "logoutxiezilou", method = RequestMethod.GET)
    public String logout(HttpSession session) throws IOException {
        session.invalidate();
        return "system/login";
    }

    /**
     * 系统首页
     */
    @RequestMapping("/")
    public String index() throws Exception {
        return "foreground/index";
    }

  /*  @RequestMapping(value = "logout", method = RequestMethod.GET)
    public RedirectView signout(HttpServletResponse response, HttpSession session) throws IOException {
        RedirectView view = new RedirectView();
        session.invalidate();

        view.setUrl(sso_login_url_root + "/logout");
        return view;
    }*/

/*    @RequestMapping(value = "stat")
    public void state(HttpServletResponse response) throws IOException {
        PrintWriter writer = response.getWriter();
        writer.write("ok");
        writer.flush();
        writer.close();
    }


    @RequestMapping("test")
    public String test() {
        System.out.println(1 / 0);
        return "index";
    }*/

}