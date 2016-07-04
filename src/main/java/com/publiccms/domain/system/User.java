package com.publiccms.domain.system;

import com.publiccms.mybatis.domain.BaseDomain;

import java.util.List;

public class User extends BaseDomain {
    private static final long serialVersionUID = 4773533269922776822L;

    /**
     * 用户id.
     */
    private Integer id;

    /**
     * 登录名.
     */
    private String loginname;

    /**
     * 中文名字.
     */
    private String fullname;

    /**
     * 邮箱.
     */
    private String email;

    /**
     * 手机.
     */
    private String cellPhone;

    /**
     * 密码
     */
    private String password;

    /**
     * 是否删除
     */
    private Integer isdelete;

    /**
     * 是否禁用 0 不禁用， 1禁用
     */
    private Integer forbidden;

    /**
     * 最后一次登陆时间
     */
    private Integer lastLoginAt;

    /**
     * 用户登陆错误次数
     */
    private Integer wrongCount;

    //私有属性
    private Integer roleId;
    private String roleName;
    private String imgcode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLoginname() {
        return loginname;
    }

    public void setLoginname(String loginname) {
        this.loginname = loginname;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCellPhone() {
        return cellPhone;
    }

    public void setCellPhone(String cellPhone) {
        this.cellPhone = cellPhone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Integer getWrongCount() {
        return wrongCount;
    }

    public void setWrongCount(Integer wrongCount) {
        this.wrongCount = wrongCount;
    }

    public String getImgcode() {
        return imgcode;
    }

    public void setImgcode(String imgcode) {
        this.imgcode = imgcode;
    }

    public Integer getForbidden() {
        return forbidden;
    }

    public void setForbidden(Integer forbidden) {
        this.forbidden = forbidden;
    }

    public Integer getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(Integer lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }
}