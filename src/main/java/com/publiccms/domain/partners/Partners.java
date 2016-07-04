package com.publiccms.domain.partners;

import com.publiccms.mybatis.domain.BaseDomain;

public class Partners extends BaseDomain{  

    private static final long serialVersionUID = 1L;
    /**
     * 主键
     */
    private Integer id; 
    /**
     * 合作伙伴名称
     */
    private String name; 
    /**
     * 合作伙伴地址
     */
    private String link; 
    /**
     * 状态0不显示,1显示
     */
    private Integer status; 
    /**
     * 是否删除
     */
    private Integer isdelete; 


    public Integer getId() {  
        return id;  
    }  
  
    public void setId(Integer id) {  
        this.id = id;  
    }  

    public String getName() {  
        return name;  
    }  
  
    public void setName(String name) {  
        this.name = name;  
    }  

    public String getLink() {  
        return link;  
    }  
  
    public void setLink(String link) {  
        this.link = link;  
    }  

    public Integer getStatus() {  
        return status;  
    }  
  
    public void setStatus(Integer status) {  
        this.status = status;  
    }  

    public Integer getIsdelete() {  
        return isdelete;  
    }  
  
    public void setIsdelete(Integer isdelete) {  
        this.isdelete = isdelete;  
    }  

}  
