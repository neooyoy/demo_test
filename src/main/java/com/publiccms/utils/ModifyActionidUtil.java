package com.publiccms.utils;

import com.publiccms.constant.UbanConstant;
import com.publiccms.crmenum.ModifyActionEnum;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 修改业务标识工具类
 * @author zhaolm
 *
 */
public class ModifyActionidUtil {
    /**
     * 更新业务标识-废弃
     * @param modifyActionEnum
     * @param request
     */
    public static void modifyActionid(ModifyActionEnum modifyActionEnum, HttpServletRequest request) {
        String token = RandomCharAndNumUtil.getRandomCharAndNumr() + "_" + modifyActionEnum;
        if(!UbanConstant.BUSINESSLOGROUTERFLAG){
            InetAddress localHost;
            try {
                localHost = InetAddress.getLocalHost();
                String ip = localHost.getHostAddress();
                token = ip + "^" + token.substring(ip.length() + 1);
            } catch (UnknownHostException e1) {
                e1.printStackTrace();
            }
        }
        request.setAttribute("modifyActionid", token);
//        request.setAttribute("pretables", new HashMap<String,String>());
    }
}
