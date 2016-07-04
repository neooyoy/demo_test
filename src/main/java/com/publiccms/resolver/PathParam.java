package com.publiccms.resolver;

import java.lang.annotation.*;

/**
 * @since 2013-3-7
 * @description
 * @TODO
 */
@Target(value = ElementType.PARAMETER)
@Retention(value = RetentionPolicy.RUNTIME)
@Documented
public @interface PathParam {
    boolean required() default true;

    String defaultValue() default "";
}
