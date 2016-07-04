package com.publiccms.domain.office;


import com.publiccms.mybatis.domain.BaseDomain;

public class OfficeImgs extends BaseDomain {

    private static final long serialVersionUID = 1L;
    /**
     * 图片标识
     */
    private Integer id;
    /**
     * 从属楼盘标识
     */
    private Integer officeId;
    private String name;
    private Double price;
    public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	/**
     * 图片格式
     */
    private String imgformat;
    /**
     * 图片路径,注意图片路径是相对路径，其实是一个虚拟路径，路径并不真实存在，只是文件服务器的一种标识
     */
    private String imgpath;
    /**
     * 图片种类,1，外形图、2，标准平面图、3，地理位置图、4，大厅图、5，办公区域图
     */
    private Integer imgtype;
    /**
     * 是否是全景图图
     */
    private Integer is3d;
    /**
     * 是否已删除,0(默认)未删除，1已删除
     */
    private Integer isdelete;
    /**
     * 图片描述
     */
    private String imgDesc;

    //私有属性
    private Integer waixingtuNum;
    private Integer allNum;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getOfficeId() {
        return officeId;
    }

    public void setOfficeId(Integer officeId) {
        this.officeId = officeId;
    }

    public String getImgformat() {
        return imgformat;
    }

    public void setImgformat(String imgformat) {
        this.imgformat = imgformat;
    }

    public String getImgpath() {
        return imgpath;
    }

    public void setImgpath(String imgpath) {
        this.imgpath = imgpath;
    }

    public Integer getImgtype() {
        return imgtype;
    }

    public void setImgtype(Integer imgtype) {
        this.imgtype = imgtype;
    }

    public Integer getIs3d() {
        return is3d;
    }

    public void setIs3d(Integer is3d) {
        this.is3d = is3d;
    }

    public Integer getIsdelete() {
        return isdelete;
    }

    public void setIsdelete(Integer isdelete) {
        this.isdelete = isdelete;
    }

    public String getImgDesc() {
        return imgDesc;
    }

    public void setImgDesc(String imgDesc) {
        this.imgDesc = imgDesc;
    }

    public Integer getWaixingtuNum() {
        return waixingtuNum;
    }

    public void setWaixingtuNum(Integer waixingtuNum) {
        this.waixingtuNum = waixingtuNum;
    }

    public Integer getAllNum() {
        return allNum;
    }

    public void setAllNum(Integer allNum) {
        this.allNum = allNum;
    }
}
