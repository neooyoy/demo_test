package com.publiccms.utils;

import com.alibaba.fastjson.JSONObject;

import java.io.InputStream;
import java.net.URLDecoder;
import java.util.Properties;

/**
 * 读取ubanconst.properties的配置
 */
public class ConfigProperties {

    public static String speed;

    /**
     * 获取项目所在根路径
     * 
     * @return
     */
    public static String getRealPath() {
        String realPath = ConfigProperties.class.getResource("").toString();
        try {
            // 取根路径，去掉WEB-INF后面的部分。
            int index = realPath.indexOf("/WEB-INF");
            realPath = realPath.substring(0, index);
            if (realPath.startsWith("zip")) {
                // 当class文件war中时，返回“zip:D:/...”这样的路径。
                realPath = realPath.substring(4);
            } else if (realPath.startsWith("file")) {
                // 当class文件war中时，返回“file:/D:/...”这样的路径。
                realPath = realPath.substring(6);
            } else if (realPath.startsWith("jar")) {
                // 当class文件war中时，返回“jar:file:/D:/...”这样的路径。
                realPath = realPath.substring(10);
            }

            // 替换%20为空格和其它特殊字符。
            realPath = URLDecoder.decode(realPath, "UTF-8");
        } catch (Exception e) {
            realPath = "";
        }

        realPath = "/" + realPath;

        return realPath;
    }

    static {
        try {
            Properties properties = new Properties();

            // String path =
            // ConfigProperties.class.getClassLoader().getResource("config.properties").getPath();
            // System.out.println(path);
            // InputStream inputStream = new FileInputStream(path);

            InputStream resourceAsStream = ConfigProperties.class.getResourceAsStream("/config.properties");

            try {
                properties.load(resourceAsStream);

                speed = properties.getProperty("speed");

            } finally {
                resourceAsStream.close();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        // 获取/WEB-INF目录下文件
        /*
         * try { Properties properties = new Properties(); InputStream
         * inputStream = new FileInputStream("/" + getRealPath() +
         * "/WEB-INF/jdbc.properties");
         * 
         * try { properties.load(inputStream); } catch (IOException e) {
         * e.printStackTrace(); } } catch (FileNotFoundException e) {
         * e.printStackTrace(); }
         */
    }

}