package com.publiccms.domain.servicehotline;  

import com.publiccms.mybatis.domain.BaseDomain;




public class Servicehotline extends BaseDomain{  

    private static final long serialVersionUID = 1L;
    
    private Integer id; 
    /**
     * 电话
     */
    private String phone; 
    /**
     * 联系人姓名
     */
    private String name; 
    
    private Integer type;


    public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getId() {  
        return id;  
    }  
  
    public void setId(Integer id) {  
        this.id = id;  
    }  

    public String getPhone() {  
        return phone;  
    }  
  
    public void setPhone(String phone) {  
        this.phone = phone;  
    }  

    public String getName() {  
        return name;  
    }  
  
    public void setName(String name) {  
        this.name = name;  
    }  

}  
