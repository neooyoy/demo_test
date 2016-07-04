package com.publiccms.converter;

/**
 * 
 */

import com.publiccms.utils.DateUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;

import java.util.Date;

/**
 * @since 2012-7-24
 * @Description
 * @TODO
 */
public class DateConverter implements Converter<String, Date> {

	@Override
    public Date convert(String dateString) {
        if (StringUtils.isNotEmpty(dateString)) {
        	return DateUtils.parse(dateString);
        }
        return new Date();
    }

}
