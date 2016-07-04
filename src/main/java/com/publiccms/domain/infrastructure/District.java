package com.publiccms.domain.infrastructure;


import com.publiccms.mybatis.domain.BaseDomain;

public class District extends BaseDomain{  

    private static final long serialVersionUID = 1L;
    /**
     * 自动增长
     */
    private Integer districtId;  
    /**
     * 行政区全称
     */
    private String districtName;  
    /**
     * 行政区简称
     */
    private String shortName;  
    /**
     * 行政区拼音全拼
     */
    private String pinyin;  
    /**
     * 地标中心的经纬度
     */
    private String location;  
    /**
     * 行政区所属城市
     */
    private Integer cityId;  
    /**
     * 显示顺序
     */
    private Integer displayOrder;  
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

    public Integer getDistrictId() {  
        return districtId;  
    }  
  
    public void setDistrictId(Integer districtId) {  
        this.districtId = districtId;  
    }  
      
    public String getDistrictName() {  
        return districtName;  
    }  
  
    public void setDistrictName(String districtName) {  
        this.districtName = districtName;  
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
      
    public String getLocation() {  
        return location;  
    }  
  
    public void setLocation(String location) {  
        this.location = location;  
    }  
      
    public Integer getCityId() {  
        return cityId;  
    }  
  
    public void setCityId(Integer cityId) {  
        this.cityId = cityId;  
    }  
      
    public Integer getDisplayOrder() {  
        return displayOrder;  
    }  
  
    public void setDisplayOrder(Integer displayOrder) {  
        this.displayOrder = displayOrder;  
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
