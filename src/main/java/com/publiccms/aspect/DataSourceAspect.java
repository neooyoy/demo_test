package com.publiccms.aspect;

import com.publiccms.annotation.DataSource;
import com.publiccms.constant.DataSourceConstant;
import com.publiccms.constant.UbanConstant;
import com.publiccms.domain.system.User;
import com.publiccms.mybatis.domain.BaseDomain;
import com.publiccms.utils.DynamicDataSourceHolder;
import com.publiccms.utils.RandomCharAndNumUtil;
import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.lang.reflect.Method;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.List;

/**
 * 动态数据源AOP
 *
 * @author zhaolm
 *
 */

public class DataSourceAspect {
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private HttpSession session;

    public void before(JoinPoint point) throws NoSuchMethodException, SecurityException {
        boolean dataSourceFlag = false;
        Object[] args = point.getArgs();
        Object target = point.getTarget();
        String method = point.getSignature().getName();
        Class<?>[] classz = target.getClass().getInterfaces();
        Class<?>[] parameterTypes = ((MethodSignature) point.getSignature()).getMethod().getParameterTypes();
        Method m = classz[0].getMethod(method, parameterTypes);
        if (m != null && m.isAnnotationPresent(DataSource.class)) {
            DataSource data = m.getAnnotation(DataSource.class);
            DynamicDataSourceHolder.putDataSource(data.value());
            if( DataSourceConstant.MASTERDATASOURCE.equals(data.value())){
                dataSourceFlag = true;
            }
        } else {
            DynamicDataSourceHolder.putDataSource(DataSourceConstant.SLAVEDATASOURCE);
        }
        if (dataSourceFlag) {
            if (request.getAttribute("modifyActionid")!=null && StringUtils.isNotEmpty((String) request.getAttribute("modifyActionid"))) {
                String modifyActionid = (String) request.getAttribute("modifyActionid");
                int timestamp = (int) (new Date().getTime() / 1000);
                User user = (User) session.getAttribute("user");
                if (user != null && args != null && args.length != 0) {
                    for (Object object : args) {
                        if (object instanceof BaseDomain) {
                            BaseDomain baseDomain = (BaseDomain) object;
                            this.setupBaseDomain(baseDomain, user, timestamp, modifyActionid, method.toLowerCase());
                        } else if (object instanceof List) {
                            List<Object> list = (List) object;
                            for (Object obj : list) {
                                BaseDomain baseDomain = (BaseDomain) obj;
                                this.setupBaseDomain(baseDomain, user, timestamp, modifyActionid, method.toLowerCase());
                            }
                        }
                    }
                }
            }
        }
    }

    public void after(JoinPoint point) throws NoSuchMethodException, SecurityException {
        //切数据源为从数据源
        DynamicDataSourceHolder.putDataSource(DataSourceConstant.SLAVEDATASOURCE);

        Object[] args = point.getArgs();
        Object target = point.getTarget();
        String method = point.getSignature().getName();
        Class<?>[] classz = target.getClass().getInterfaces();
        Class<?>[] parameterTypes = ((MethodSignature) point.getSignature()).getMethod().getParameterTypes();
        Method m = classz[0].getMethod(method, parameterTypes);

        if (m != null && m.isAnnotationPresent(DataSource.class)) {
            DataSource data = m.getAnnotation(DataSource.class);
            if (!DataSourceConstant.MASTERDATASOURCE.equals(data.value())) {
                return;
            }
        }
    }

    private void setupBaseDomain(BaseDomain baseDomain, User user, int timestamp, String modifyActionid, String method) {
        baseDomain.setModifyId(user.getId());
        baseDomain.setModifyName(user.getFullname());
        baseDomain.setModifyAt(timestamp);
        if (baseDomain.isTriggerFlag() && StringUtils.isNotEmpty(baseDomain.getModifyActionid())) {
            modifyActionid = baseDomain.getModifyActionid();
            modifyActionid = RandomCharAndNumUtil.getRandomCharAndNumr() + "_" + modifyActionid;
        }else{
            modifyActionid = "@" + modifyActionid;
        }
        baseDomain.setModifyActionid(null);
        baseDomain.setModifyActionid(modifyActionid);
        if (method.contains("insert")) {
            baseDomain.setCreateId(user.getId());
            baseDomain.setCreateName(user.getFullname());
            baseDomain.setCreateAt(timestamp);
        }
    }

    private void setupBaseDomain(BaseDomain bd, BaseDomain baseDomain, String method) {
        String modifyActionid = bd.getModifyActionid();
        if (baseDomain.isTriggerFlag() && StringUtils.isNotEmpty(baseDomain.getModifyActionid())) {
            String oldServiceId = modifyActionid.substring(modifyActionid.indexOf("_") + 1);
            modifyActionid = baseDomain.getModifyActionid();
            if(oldServiceId.equals(modifyActionid)){
                throw new RuntimeException("异常描述：业务日志标识与日志中的业务日志标识一致，形成环。");
            }
            modifyActionid = RandomCharAndNumUtil.getRandomCharAndNumr() + "_" + modifyActionid;
        }else{
            modifyActionid = "@" + modifyActionid;
        }
        baseDomain.setModifyId(bd.getModifyId());
        baseDomain.setModifyName(bd.getModifyName());
        baseDomain.setModifyAt(bd.getModifyAt());
        baseDomain.setModifyActionid(modifyActionid);
        if (method.contains("insert")) {
            baseDomain.setCreateId(bd.getModifyId());
            baseDomain.setCreateName(bd.getModifyName());
            baseDomain.setCreateAt(bd.getModifyAt());
        }
    }
}
