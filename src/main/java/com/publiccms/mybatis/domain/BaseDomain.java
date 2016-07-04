package com.publiccms.mybatis.domain;

import java.io.Serializable;

import com.alibaba.fastjson.annotation.JSONType;
@JSONType(ignores={
        "sort",
        "order"
 })
public class BaseDomain implements Serializable{

    private static final long serialVersionUID = 1L;
    /**
     * 业务动作标识
     */
    private String modifyActionid;
    /**
     * 创建人id
     */
    private Integer createId;  
    /**
     * 创建人
     */
    private String createName;  
    /**
     * 创建时间
     */
    private Integer createAt;  
    /**
     * 修改人
     */
    private Integer modifyId;  
    /**
     * 修改人姓名
     */
    private String modifyName;  
    /**
     * 修改时间
     */
    private Integer modifyAt; 
    /**
     * 日志消费标识
     */
    private boolean triggerFlag = false;
    /**
     * 排序规则 asc，desc
     */
    private String sort = "desc";

    /**
     * 排序字段
     */
    private String order = "id"; 

    public String getModifyActionid() {
        return modifyActionid;
    }
    
    public void setModifyActionid(String modifyActionid) {
        this.modifyActionid = modifyActionid;
    }

    public Integer getCreateId() {
        return createId;
    }

    public void setCreateId(Integer createId) {
        this.createId = createId;
    }

    public String getCreateName() {
        return createName;
    }

    public void setCreateName(String createName) {
        this.createName = createName;
    }

    public Integer getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Integer createAt) {
        this.createAt = createAt;
    }

    public Integer getModifyId() {
        return modifyId;
    }

    public void setModifyId(Integer modifyId) {
        this.modifyId = modifyId;
    }

    public String getModifyName() {
        return modifyName;
    }

    public void setModifyName(String modifyName) {
        this.modifyName = modifyName;
    }

    public Integer getModifyAt() {
        return modifyAt;
    }

    public void setModifyAt(Integer modifyAt) {
        this.modifyAt = modifyAt;
    }
    public String getOrder() {
        return order;
    }

    public void setOrder(String order) {
        String resultOrder = "";
        for (int i=0; i<order.length(); i++){
            if (order.charAt(i) >= 'A' && order.charAt(i) <='Z'){
                resultOrder += ("_" + order.charAt(i)).toLowerCase();
            }else{
                resultOrder += order.charAt(i);
            }
        }
        this.order = resultOrder;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public boolean isTriggerFlag() {
        return triggerFlag;
    }

    public void setTriggerFlag(boolean triggerFlag) {
        this.triggerFlag = triggerFlag;
    }
}
