package com.publiccms.domain.infrastructure;


import com.publiccms.mybatis.domain.BaseDomain;

public class City extends BaseDomain{  

    private static final long serialVersionUID = 1L;
    /**
     * 自动增长
     */
    private Integer cityId;  
    /**
     * 城市全称
     */
    private String cityName;  
    /**
     * 城市简称
     */
    private String shortName;  
    /**
     * 城市拼音全称
     */
    private String pinyin;  
    
    private String standardCode;  
    /**
     * 城市二级域名，例如bj。默认与城市拼音全拼一致
     */
    private String domain;  
    /**
     * 可选的城市二级域名，例如beijing
     */
    private String domainAlias;  
    /**
     * 数据库名称
     */
    private String databaseName;  
    /**
     * 城市所属省份
     */
    private Integer provinceId;  
    /**
     * 配置文件中的数组下标
     */
    private Integer scriptIndex;  
    /**
     * 显示顺序
     */
    private Integer displayOrder;  
    /**
     * 省里的display_order
     */
    private Integer provinceScriptIndex;  
    /**
     * google分析代码
     */
    private String googleAnalyticsCode;  
    /**
     * 添加人用户Id
     */
    private Integer createdBy;  
    /**
     * 添加人用户姓名
     */
    private String createdByName;  
    /**
     * 添加时间
     */
    private Integer createdTime;  
    /**
     * 最后修改人用户Id
     */
    private Integer modifiedBy;  
    /**
     * 最后修改人用户姓名
     */
    private String modifiedByName;  
    /**
     * 最后修改时间
     */
    private Integer modifiedTime;  

    public Integer getCityId() {  
        return cityId;  
    }  
  
    public void setCityId(Integer cityId) {  
        this.cityId = cityId;  
    }  
      
    public String getCityName() {  
        return cityName;  
    }  
  
    public void setCityName(String cityName) {  
        this.cityName = cityName;  
    }  
      
    public String getShortName() {  
        return shortName;  
    }  
  
    public void setShortName(String shortName) {  
        this.shortName = shortName;  
    }  
      
    public String getPinyin() {  
        return pinyin;  
    }  
  
    public void setPinyin(String pinyin) {  
        this.pinyin = pinyin;  
    }  
      
    public String getStandardCode() {  
        return standardCode;  
    }  
  
    public void setStandardCode(String standardCode) {  
        this.standardCode = standardCode;  
    }  
      
    public String getDomain() {  
        return domain;  
    }  
  
    public void setDomain(String domain) {  
        this.domain = domain;  
    }  
      
    public String getDomainAlias() {  
        return domainAlias;  
    }  
  
    public void setDomainAlias(String domainAlias) {  
        this.domainAlias = domainAlias;  
    }  
      
    public String getDatabaseName() {  
        return databaseName;  
    }  
  
    public void setDatabaseName(String databaseName) {  
        this.databaseName = databaseName;  
    }  
      
    public Integer getProvinceId() {  
        return provinceId;  
    }  
  
    public void setProvinceId(Integer provinceId) {  
        this.provinceId = provinceId;  
    }  
      
    public Integer getScriptIndex() {  
        return scriptIndex;  
    }  
  
    public void setScriptIndex(Integer scriptIndex) {  
        this.scriptIndex = scriptIndex;  
    }  
      
    public Integer getDisplayOrder() {  
        return displayOrder;  
    }  
  
    public void setDisplayOrder(Integer displayOrder) {  
        this.displayOrder = displayOrder;  
    }  
      
    public Integer getProvinceScriptIndex() {  
        return provinceScriptIndex;  
    }  
  
    public void setProvinceScriptIndex(Integer provinceScriptIndex) {  
        this.provinceScriptIndex = provinceScriptIndex;  
    }  
      
    public String getGoogleAnalyticsCode() {  
        return googleAnalyticsCode;  
    }  
  
    public void setGoogleAnalyticsCode(String googleAnalyticsCode) {  
        this.googleAnalyticsCode = googleAnalyticsCode;  
    }  
      
    public Integer getCreatedBy() {  
        return createdBy;  
    }  
  
    public void setCreatedBy(Integer createdBy) {  
        this.createdBy = createdBy;  
    }  
      
    public String getCreatedByName() {  
        return createdByName;  
    }  
  
    public void setCreatedByName(String createdByName) {  
        this.createdByName = createdByName;  
    }  
      
    public Integer getCreatedTime() {  
        return createdTime;  
    }  
  
    public void setCreatedTime(Integer createdTime) {  
        this.createdTime = createdTime;  
    }  
      
    public Integer getModifiedBy() {  
        return modifiedBy;  
    }  
  
    public void setModifiedBy(Integer modifiedBy) {  
        this.modifiedBy = modifiedBy;  
    }  
      
    public String getModifiedByName() {  
        return modifiedByName;  
    }  
  
    public void setModifiedByName(String modifiedByName) {  
        this.modifiedByName = modifiedByName;  
    }  
      
    public Integer getModifiedTime() {  
        return modifiedTime;  
    }  
  
    public void setModifiedTime(Integer modifiedTime) {  
        this.modifiedTime = modifiedTime;  
    }  
      
}  
