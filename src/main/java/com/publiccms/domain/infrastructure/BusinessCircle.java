package com.publiccms.domain.infrastructure;


import com.publiccms.mybatis.domain.BaseDomain;

public class BusinessCircle extends BaseDomain{  

    private static final long serialVersionUID = 1L;
    /**
     * 商圈id
     */
    private Integer businessCircleId;  
    /**
     * 区域id
     */
    private Integer districtId;  
    /**
     * 商圈名字
     */
    private String businessCircleName;  
    /**
     * 1已删除
     */
    private Integer isDelete;  

    public Integer getBusinessCircleId() {  
        return businessCircleId;  
    }  
  
    public void setBusinessCircleId(Integer businessCircleId) {  
        this.businessCircleId = businessCircleId;  
    }  
      
    public Integer getDistrictId() {  
        return districtId;  
    }  
  
    public void setDistrictId(Integer districtId) {  
        this.districtId = districtId;  
    }  
      
    public String getBusinessCircleName() {  
        return businessCircleName;  
    }  
  
    public void setBusinessCircleName(String businessCircleName) {  
        this.businessCircleName = businessCircleName;  
    }  
      
    public Integer getIsDelete() {  
        return isDelete;  
    }  
  
    public void setIsDelete(Integer isDelete) {  
        this.isDelete = isDelete;  
    }  
      
}  
