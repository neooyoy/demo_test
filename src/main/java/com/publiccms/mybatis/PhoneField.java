package com.publiccms.mybatis;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * Created by zhangjinglei on 2016/3/21.
 */
@MappedJdbcTypes(JdbcType.VARCHAR)
public class PhoneField extends BaseTypeHandler<String> {
    private static Map<String,String> encode_seeks = new HashMap<String,String>(){{
        put("00","84");
        put("01","76");
        put("02","55");
        put("03","69");
        put("04","03");
        put("05","86");
        put("06","85");
        put("07","24");
        put("08","54");
        put("09","72");
        put("10","65");
        put("11","67");
        put("12","07");
        put("13","33");
        put("14","04");
        put("15","14");
        put("16","61");
        put("17","45");
        put("18","80");
        put("19","57");
        put("20","98");
        put("21","64");
        put("22","41");
        put("23","44");
        put("24","30");
        put("25","09");
        put("26","27");
        put("27","18");
        put("28","26");
        put("29","17");
        put("30","96");
        put("31","48");
        put("32","74");
        put("33","51");
        put("34","88");
        put("35","02");
        put("36","13");
        put("37","81");
        put("38","37");
        put("39","25");
        put("40","21");
        put("41","90");
        put("42","77");
        put("43","29");
        put("44","56");
        put("45","46");
        put("46","20");
        put("47","01");
        put("48","42");
        put("49","92");
        put("50","78");
        put("51","12");
        put("52","73");
        put("53","19");
        put("54","28");
        put("55","35");
        put("56","10");
        put("57","63");
        put("58","52");
        put("59","23");
        put("60","08");
        put("61","16");
        put("62","89");
        put("63","49");
        put("64","82");
        put("65","38");
        put("66","91");
        put("67","22");
        put("68","00");
        put("69","47");
        put("70","58");
        put("71","15");
        put("72","06");
        put("73","43");
        put("74","34");
        put("75","68");
        put("76","62");
        put("77","99");
        put("78","75");
        put("79","05");
        put("80","53");
        put("81","97");
        put("82","93");
        put("83","59");
        put("84","50");
        put("85","60");
        put("86","39");
        put("87","94");
        put("88","11");
        put("89","95");
        put("90","32");
        put("91","70");
        put("92","83");
        put("93","40");
        put("94","79");
        put("95","36");
        put("96","87");
        put("97","31");
        put("98","71");
        put("99","66");

    }};
    private static Map<String,String> decode_seeks = new HashMap<String,String>() {{
        put("30","24");
        put("09","25");
        put("27","26");
        put("18","27");
        put("98","20");
        put("64","21");
        put("41","22");
        put("44","23");
        put("26","28");
        put("17","29");
        put("23","59");
        put("52","58");
        put("35","55");
        put("28","54");
        put("63","57");
        put("10","56");
        put("12","51");
        put("78","50");
        put("19","53");
        put("73","52");
        put("11","88");
        put("95","89");
        put("93","82");
        put("59","83");
        put("53","80");
        put("97","81");
        put("39","86");
        put("94","87");
        put("50","84");
        put("60","85");
        put("55","02");
        put("69","03");
        put("84","00");
        put("76","01");
        put("85","06");
        put("24","07");
        put("03","04");
        put("86","05");
        put("54","08");
        put("72","09");
        put("25","39");
        put("37","38");
        put("51","33");
        put("74","32");
        put("48","31");
        put("96","30");
        put("81","37");
        put("13","36");
        put("02","35");
        put("88","34");
        put("08","60");
        put("16","61");
        put("89","62");
        put("49","63");
        put("82","64");
        put("38","65");
        put("91","66");
        put("22","67");
        put("00","68");
        put("47","69");
        put("66","99");
        put("71","98");
        put("70","91");
        put("32","90");
        put("40","93");
        put("83","92");
        put("36","95");
        put("79","94");
        put("31","97");
        put("87","96");
        put("67","11");
        put("65","10");
        put("33","13");
        put("07","12");
        put("14","15");
        put("04","14");
        put("45","17");
        put("61","16");
        put("57","19");
        put("80","18");
        put("42","48");
        put("92","49");
        put("20","46");
        put("01","47");
        put("56","44");
        put("46","45");
        put("77","42");
        put("29","43");
        put("21","40");
        put("90","41");
        put("99","77");
        put("62","76");
        put("68","75");
        put("34","74");
        put("43","73");
        put("06","72");
        put("15","71");
        put("58","70");
        put("05","79");
        put("75","78");

    }};
    private static List<String> splitby2(String value){
        List<String> temp=new ArrayList<String>();
        while (value.length()>2){
            temp.add(value.substring(0,2));
            value = value.substring(2);
        }
        if(value.length()>0){
            temp.add(value);
        }
        return temp;
    }
    public static String encode(String phone){
        if(phone!=null) {
            String result = "";
            phone = StringUtils.strip(phone);
            phone = StringUtils.stripStart(phone, "U_");
            List<String> seeds = splitby2(phone);
            for (String seed : seeds) {
                String ma = encode_seeks.get(seed);
                if (ma != null) {
                    result = result + ma;
                } else {
                    result = result + seed;
                }
            }

            return "U_" + result;
        }
        return null;
    }

    public static String decode(String phone){
        if(phone!=null) {
            int index = 0;
            String result = "";
            phone = StringUtils.strip(phone);

            if (!phone.startsWith("U_")) {
                return phone;
            }
            phone = StringUtils.stripStart(phone, "U_");
            List<String> seeds = splitby2(phone);
            for (String seed : seeds) {
                String ma = decode_seeks.get(seed);
                if (ma != null) {
                    result = result + ma;
                } else {
                    result = result + seed;
                }
            }

            return result;
        }
        return null;
    }

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, String s, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i, encode(s));
    }

    @Override
    public String getNullableResult(ResultSet rs, String columnName) throws SQLException {
        return decode(rs.getString(columnName));
    }

    @Override
    public String getNullableResult(ResultSet rs, int i) throws SQLException {
        return decode(rs.getString(i));
    }

    @Override
    public String getNullableResult(CallableStatement cs, int i) throws SQLException {
        return decode(cs.getString(i));
    }
}