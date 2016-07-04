package com.publiccms.annotation;

import com.publiccms.crmenum.ModifyActionEnum;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 业务日志处理自定义注解
 * @author zhaolm
 *
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface BusinessLog {
    ModifyActionEnum value();
}
