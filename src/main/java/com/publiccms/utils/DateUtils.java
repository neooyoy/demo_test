/**
 * 
 */
package com.publiccms.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;

/**
 * @since Feb 20, 2012
 */
public class DateUtils extends org.apache.commons.lang3.time.DateUtils {
	public static final String YYYY = "yyyy";
	public static final String YYYY_MM = "yyyy-MM";
	public static final String YYYYMMDD = "yyyyMMdd";
	public static final String YYYY_MM_DD = "yyyy-MM-dd";
	public static final String YYYY_MM_DD_HH_MM = "yyyy-MM-dd HH:mm";
	public static final String YYYY_MM_DD_HH_MM_SS = "yyyy-MM-dd HH:mm:ss";
	public static final String EEE_MMM_DD_HH_MM_SS_ZZZ_YYYY = "EEE MMM dd HH:mm:ss zzz yyyy";
	private StringBuffer buffer = new StringBuffer();
	private static String ZERO = "0";
	private static DateUtils date;
	public static SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
	public static SimpleDateFormat format1 = new SimpleDateFormat(
			"yyyyMMdd HH:mm:ss");

	public static Date parse(String dateStr) {
		if (StringUtils.isBlank(dateStr)) {
			return null;
		}
		dateStr = dateStr.trim();
		Date date = null;
		if (dateStr.length() == YYYY.length()) {
			date = parse(dateStr, YYYY);
		} else if (dateStr.length() == YYYY_MM.length()) {
			date = parse(dateStr, YYYY_MM);
		} else if (dateStr.length() == YYYY_MM_DD.length()) {
			date = parse(dateStr, YYYY_MM_DD);
		} else if (dateStr.length() == YYYY_MM_DD_HH_MM.length()) {
			date = parse(dateStr, YYYY_MM_DD_HH_MM);
		} else if (dateStr.length() == YYYY_MM_DD_HH_MM_SS.length()) {
			date = parse(dateStr, YYYY_MM_DD_HH_MM_SS);
		} else {
			date = parseCST(dateStr);
		}
		return date;
	}

	public static Date parseCST(String dateStr) {
		SimpleDateFormat sdf = new SimpleDateFormat(
				EEE_MMM_DD_HH_MM_SS_ZZZ_YYYY, Locale.US);
		try {
			return sdf.parse(dateStr);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			return parse(dateStr, YYYY_MM_DD_HH_MM_SS);
		}
	}

	public static Date parse(String dateStr, String pattern) {
		if(dateStr == null)
			return null;
		SimpleDateFormat fmt = new SimpleDateFormat();
		Date date = null;
		try {
			fmt.applyPattern(pattern);
			date = fmt.parse(dateStr);
		} catch (ParseException e) {
			try {
				fmt.applyPattern(YYYY_MM_DD_HH_MM);
				date = fmt.parse(dateStr);
			} catch (ParseException e1) {
				fmt.applyPattern(YYYY_MM_DD);
				try {
					date = fmt.parse(dateStr);
				} catch (ParseException e2) {
					e2.printStackTrace();
				}
			}
		}
		return date;
	}

	public static String format(Long test){
	    
        return ZERO;
	    
	}
	
	public static String formatTime(Date date) {
		return format(date, "HH:mm:ss");
	}

	public static String formatTear(Date date) {
		return format(date, YYYY);
	}

	public static String formatDate(Date date) {
		return format(date, YYYY_MM_DD);
	}

	public static String formatDateTime(Date date) {
		return format(date, YYYY_MM_DD_HH_MM_SS);
	}

	public static String format(String pattern) {
		return format(new Date(), pattern);
	}

	public static String format(Date date, String pattern) {
		if(date == null)
			return null;
		SimpleDateFormat fmt = new SimpleDateFormat();
		fmt.applyPattern(pattern);
		return fmt.format(date);
	}

	public static Long parseLong() {
		return parseLong(new Date());
	}

	public static Long parseLong(Date date) {
		return date.getTime();
	}

	public static DateUtils getDateInstance() {
		if (date == null) {
			date = new DateUtils();
		}
		return date;
	}

	private static Calendar getCalendar() {
		return Calendar.getInstance();
	}

	/**
	 * 得到指定日期的一天的的最后时刻23:59:59
	 * 
	 * @param date
	 * @return
	 */
	public static Date getFinallyDate(Date date) {
		if (date != null) {
			String temp = format.format(date);
			temp += " 23:59:59";

			try {
				return format1.parse(temp);
			} catch (ParseException e) {
				return null;
			}
		}
		return null;

	}

	/**
	 * 得到指定日期的一天的开始时刻00:00:00
	 * 
	 * @param date
	 * @return
	 */
	public static Date getStartDate(Date date) {
		if (date != null) {
			String temp = format.format(date);
			temp += " 00:00:00";

			try {
				return format1.parse(temp);
			} catch (Exception e) {
				return null;
			}
		}
		return null;

	}

	/**
	 * 得到当前日期 格式为 八位例如：20130510
	 * 
	 * @return
	 */
	public String getNowDate() {
		Calendar calendar = getCalendar();
		buffer.delete(0, buffer.capacity());
		buffer.append(calendar.get(Calendar.YEAR));
		int monday = calendar.get(Calendar.MONDAY) + 1;
		if (monday < 10) {
			buffer.append(ZERO);
		}
		buffer.append(monday);
		int day = calendar.get(Calendar.DATE);
		if (day < 10) {
			buffer.append(ZERO);
		}
		buffer.append(day);

		return buffer.toString();
	}

	/**
	 * 根据输入的日期字符串 和 提前天数 ， 获得 指定日期提前几天的日期对象
	 * 
	 * @param dateString
	 *            日期对象 ，格式如 1-31-1900
	 * @param lazyDays
	 *            倒推的天数
	 * @return 指定日期倒推指定天数后的日期对象
	 * @throws ParseException
	 */
	public static Date getDate(Date date, int beforeDays)
			throws ParseException {
		Calendar theCa = Calendar.getInstance();
		theCa.setTime(new Date());
		theCa.add(Calendar.DATE, beforeDays*-1);
		return theCa.getTime();
	}
	
	//毫秒值转为年月日格式的时间
    public static String UnixTime2ToDate(int timestamp){
        Long time=timestamp*1000L;
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        return  sdf.format(new Date(time));
    }
    
	public static void main(String[] args) {
		Date nowDate = new Date();
		String date = DateUtils.formatDate(nowDate);
		int year = Integer.parseInt(DateUtils.formatTear(nowDate).toString()) - 18;
		System.out.println(year + date.substring(4));
	}
	  /**  
	   * 计算两个日期之间相差的天数  
	   * @param smdate 较小的时间 
	   * @param bdate  较大的时间 
	   * @return 相差天数 
	   * @throws ParseException  
	   */    
	  public static int daysBetween(Date smdate,Date bdate) throws ParseException    
	  {    
	      SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	      smdate=sdf.parse(sdf.format(smdate));  
	      bdate=sdf.parse(sdf.format(bdate));  
	      Calendar cal = Calendar.getInstance();    
	      cal.setTime(smdate);    
	      long time1 = cal.getTimeInMillis();                 
	      cal.setTime(bdate);    
	      long time2 = cal.getTimeInMillis();         
	      long between_days=(time2-time1)/(1000*3600*24);  
	          
	     return Integer.parseInt(String.valueOf(between_days));           
	  }
	  /** 
	  *字符串的日期格式的计算 
	  */  
	    public static int daysBetween(String smdate,String bdate) throws ParseException{  
	        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	        Calendar cal = Calendar.getInstance();    
	        cal.setTime(sdf.parse(smdate));    
	        long time1 = cal.getTimeInMillis();                 
	        cal.setTime(sdf.parse(bdate));    
	        long time2 = cal.getTimeInMillis();         
	        long between_days=(time2-time1)/(1000*3600*24);  
	            
	       return Integer.parseInt(String.valueOf(between_days));     
	    } 
		//毫秒值转为年月日 时分秒格式的时间
	    public static String UnixTime2ToDateTime(int timestamp){
	        Long time=timestamp*1000L;
	        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	        return  sdf.format(new Date(time));
	    }
	
}
