package com.publiccms.utils;

import java.sql.*;

public class JDBConnection {
    private final static String url = "jdbc:mysql://192.168.0.154:3306/demo?user=root&password=123456&characterEncoding=UTF8";
    private final static String dbDriver = "com.mysql.jdbc.Driver";
    private static Connection con = null;

    // 通过构造方法加载数据库驱动
    static {
        try {
            Class.forName(dbDriver).newInstance();
        } catch (Exception ex) {
            System.out.println("数据库加载失败");
        }
    }

    // 创建数据库连接
    public static boolean creatConnection() {
        try {
            con = DriverManager.getConnection(url);
            con.setAutoCommit(true);

        } catch (SQLException e) {
            System.out.println(e.getMessage());
            System.out.println("creatConnectionError!");
        }
        return true;
    }

    // 对数据库的增加、修改和删除的操作
    public boolean executeUpdate(String sql) {
        if (con == null) {
            creatConnection();
        }
        try {
            Statement stmt = con.createStatement();
            int iCount = stmt.executeUpdate(sql);
            System.out.println("操作成功，所影响的记录数为" + String.valueOf(iCount));
            return true;
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    // 对数据库的查询操作
    public static ResultSet executeQuery(String sql) {
        ResultSet rs;
        try {
            if (con == null) {
                creatConnection();
            }
            Statement stmt = con.createStatement();
            try {
                rs = stmt.executeQuery(sql);
            } catch (SQLException e) {
                System.out.println(e.getMessage());
                return null;
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
            System.out.println("executeQueryError!");
            return null;
        }
        return rs;
    }

    public static void main(String[] args) {
        String sql = "select * from user";
        try {
            ResultSet resultSet = executeQuery(sql);
            if (resultSet != null) {
                while(resultSet.next()){ //调试可知，rs1.closed=true，此时执行next()返回false
                    System.out.println(resultSet.getString("fullname"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}