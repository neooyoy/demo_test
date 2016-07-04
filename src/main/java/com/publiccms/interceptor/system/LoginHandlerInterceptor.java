package com.publiccms.interceptor.system;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.BusinessLog;
import com.publiccms.annotation.IgnoreAuth;
import com.publiccms.constant.Constant;
import com.publiccms.dao.system.UserDao;
import com.publiccms.dao.system.UserRoleDao;
import com.publiccms.domain.system.User;
import com.publiccms.domain.system.UserRole;
import com.publiccms.utils.*;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

/**
 * 登录验证 User: zhanglin Date: 2015/12/4 Time: 11:14
 */
public class LoginHandlerInterceptor extends HandlerInterceptorAdapter {
    public static final int MENU_TYPE = 1;
    public static final int FUNCTION_TYPE = 2;

    protected Logger logger = Logger.getLogger(this.getClass());

    @Value("#{config['sso.login.url.root']}")
    private String sso_login_url_root;

    @Value("#{config['sso.login.url.login']}")
    private String sso_login_url_login;

    @Value("#{config['sso.login.cookie.name']}")
    private String sso_login_cookie_name;

    @Value("#{config['sso.login.sys.key']}")
    private String sso_login_sys_key;

    @Value("#{config['sso.login.sys.token']}")
    private String sso_login_sys_token;

    @Value("#{config['cookieName']}")
    private String cookieName;


    @Autowired
    private UserDao userDao;

    @Autowired
    private UserRoleDao userRoleDao;

    /**
     * 登录验证
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        BusinessLog businessLog = ((HandlerMethod) handler).getMethodAnnotation(BusinessLog.class);
        if (businessLog != null) {
            ModifyActionidUtil.modifyActionid(businessLog.value(), request);
        }

        User u = null;

        /**访问网站前台不需要验证*/
        if (request.getServletPath().equals("/") || request.getServletPath().startsWith("/foreGround/") || request.getServletPath().startsWith("/loginxiezilou")
                || request.getServletPath().startsWith("/logoutxiezilou") || request.getServletPath().startsWith("/kaptcha")) {
            return true;
        }

        boolean authFlag = false;
        String url = "";
        String base = request.getContextPath();

        if (handler.getClass().isAssignableFrom(HandlerMethod.class)) {

            //不需要验证权限
            IgnoreAuth auth = ((HandlerMethod) handler).getMethodAnnotation(IgnoreAuth.class);
            if (auth != null && auth.validate()) {
                return true;
            }

            // 读取session
            HttpSession session = request.getSession(false);
            if (session != null && session.getAttribute("user") != null) {//验证session是否存在
                u = (User) session.getAttribute("user");

                /**普通用户只能访问楼盘管理相关页面*/
                if (!request.getServletPath().startsWith("/officeController/") && !request.getServletPath().startsWith("/officeimgsController")
                        && u.getRoleId().equals(Constant.COMMON_ROLE_ID)) {
                    url = base + "/officeController/officelist";
                    authFlag = true;
                }

            } else {
                url = base + "/loginxiezilou";
                authFlag = true;
            }
        }



        if (authFlag) {
            response.sendRedirect(url);
        }

        return true;
    }

    /**
     * 初始化 session的用户信息
     *
     * @param userid
     * @return
     * @throws Exception
     */
 /*   private User initUserInfo(int userid) throws Exception {
        User u = this.userDao.selectByUserId(userid);
        if (u != null) {
            UserRole userRole = userRoleDao.selectByUserId(u.getId());
            if (userRole != null) {
                u.setRoleId(userRole.getRoleId());
            }
        }
        return u;
    }*/
}
