package com.publiccms.annotation;

import java.lang.annotation.*;

/**
 * 是否忽略权限验证
 * User: zhanglin
 * Date: 2015/12/4
 * Time: 12:28
 */
@Documented
@Inherited
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface IgnoreAuth {
    boolean validate() default true;
}
