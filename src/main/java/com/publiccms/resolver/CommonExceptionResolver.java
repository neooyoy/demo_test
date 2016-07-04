package com.publiccms.resolver;

import com.alibaba.fastjson.JSONObject;
import com.publiccms.domain.system.User;
import com.publiccms.utils.Logger;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * 统一异常处理 User: zhanglin Date: 2015/12/17 Time: 11:04
 */
@Component
public class CommonExceptionResolver implements HandlerExceptionResolver {

    protected Logger logger = Logger.getLogger(CommonExceptionResolver.class);

    // @Value("#{config['log.level']}")
    // private String log4j_level;
    // @Resource(name = "mailMessage")
    // private SimpleMailMessage mailMessage;
    //
    // @Resource(name = "mailSender")
    // private MailSender mailSender;

    public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        String logMsg = "异常路径:" + request.getRemoteHost() + request.getServletPath();

        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            if (user != null) {
                logMsg += "\n【操作人】--" + user.getId() + "," + user.getFullname();
            }
        }
        String exMsg = printStackTraceToString(ex);
        logMsg += "\n【异常信息】--" + exMsg;

        logger.debug(logMsg);
        // if (!"debug".equalsIgnoreCase(log4j_level)) {
        logger.error("\n\n");
        logger.error(logMsg);
        // }

        try {
            String accept = request.getHeader("Accept");
            if (StringUtils.isNotEmpty(accept) && accept.contains("application/json")) {
                // 返回json
                response.setContentType("application/json;charset=utf-8");
                PrintWriter writer = response.getWriter();
                JSONObject res = new JSONObject();
                res.put("code", -1);
                res.put("msg", "【异常信息】--" + exMsg);
                writer.print(res.toJSONString());
                writer.flush();
            } else {
                // 转发
                // request.setAttribute("msg", "【异常信息】--" + exMsg);
                // request.getRequestDispatcher("/WEB-INF/404.jsp").forward(request,
                // response);
                ModelAndView view = new ModelAndView();
                view.setViewName("errorpage/404");
                view.addObject("msg", ex.getMessage());
                return view;
            }
        } catch (Exception e) {
        }
        return null;
    }

    /**
     * 输出异常堆栈信息到字符串
     */
    private String printStackTraceToString(Throwable t) {
        StringWriter sw = new StringWriter();
        t.printStackTrace(new PrintWriter(sw, true));
        return sw.getBuffer().toString();
    }
}
