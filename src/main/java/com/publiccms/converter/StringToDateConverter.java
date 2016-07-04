package com.publiccms.converter;

import com.publiccms.utils.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.convert.converter.Converter;
import org.springframework.util.StringUtils;

import java.util.Date;

/**
 * 2013年08月05日 10:38:55
 * 
 */
public class StringToDateConverter implements Converter<String, Date> {
	private static final Logger logger	= LoggerFactory.getLogger(StringToDateConverter.class);

	@Override
	public Date convert(String source) {
		if (!StringUtils.isEmpty(source))
			try {
				return DateUtils.parse(source);
			}
			catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
		return null;
	}

}
