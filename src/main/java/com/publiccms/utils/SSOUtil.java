package com.publiccms.utils;

import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * User: zhanglin
 * Date: 2015/12/4
 * Time: 15:50
 */
public class SSOUtil {

    public static String loginUrl = null;

    public static String renameLoginUrl(HttpServletRequest request, String ssoLoginUrl) {
        if (StringUtils.isEmpty(loginUrl)) {
            StringBuffer url = request.getRequestURL();
            String domain = url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();
            loginUrl = ssoLoginUrl.replace("#domain#", domain);
        }
        return loginUrl;
    }
}
