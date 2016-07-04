package com.publiccms.interceptor.system;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.annotation.IgnoreAuth;
import com.publiccms.utils.Logger;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.util.List;

/**
 * 权限验证
 * User: zhanglin
 * Date: 2015/12/7
 * Time: 9:46
 */

public class AuthHandlerInterceptor extends HandlerInterceptorAdapter {

    protected Logger logger = Logger.getLogger(this.getClass());

    @SuppressWarnings("unchecked")
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        boolean flag = false;
        if (handler.getClass().isAssignableFrom(HandlerMethod.class)) {
            // 验证权限
            IgnoreAuth auth = ((HandlerMethod) handler).getMethodAnnotation(IgnoreAuth.class);
            if (auth != null && auth.validate()) {
                flag = true;
            }
        }

        if (!flag) {
            response.sendRedirect(request.getContextPath() + "/loginxiezilou");

            // 转发
//            request.setAttribute("msg", "没有权限");
//            request.getRequestDispatcher("login").forward(request, response);
        }
        return flag;
    }
}
