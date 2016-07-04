package com.publiccms.domain.system;

import com.publiccms.mybatis.domain.BaseDomain;

public class UserRole extends BaseDomain {

    private static final long serialVersionUID = 5561146894131582994L;

    /**
     * 用户角色ID.
     */
    private Integer id;

    /**
     * 用户id.
     */
    private Integer userId;

    /**
     * 角色id.
     */
    private Integer roleId;

    /**
     * 录入人.
     */
    private Integer creator;

    /**
     * 录入人.
     */
    private String creatorName;

    /**
     * 录入时间.
     */
    private Integer createdAt;
    /**
     * 角色名
     */
    private String roleName;

    //私有属性
    private Long personCount;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public Integer getCreator() {
        return creator;
    }

    public void setCreator(Integer creator) {
        this.creator = creator;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Integer getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Integer createdAt) {
        this.createdAt = createdAt;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public Long getPersonCount() {
        return personCount;
    }

    public void setPersonCount(Long personCount) {
        this.personCount = personCount;
    }
}