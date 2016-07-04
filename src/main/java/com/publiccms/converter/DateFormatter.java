package com.publiccms.converter;

import com.publiccms.utils.DateUtils;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Date;
import java.util.Locale;

/**
 * 用于Springmvc中request和response的日期格式转换
 * 
 * @since 2013年7月15日
 */
public class DateFormatter implements Formatter<Date> {

    @Override
    public String print(Date object, Locale locale) {
        return DateUtils.formatDateTime(object);
    }

    @Override
    public Date parse(String text, Locale locale) throws ParseException {
        return DateUtils.parse(text);
    }

}
